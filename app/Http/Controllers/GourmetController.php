<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Helpers\UtilHelper;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use App\Models\Gourmet\Restaurant;
use App\Models\Gourmet\RestaurantGenres;
use App\Models\Gourmet\Menus;
use App\Models\Gourmet\OpeningHours;
use App\Models\Gourmet\ExceptionalHours;

class GourmetController extends Controller {

    //一週間分の日付と曜日を取得
    public function weeklyData() {
        $today = Carbon::today();
        $result = [];
        for ($i = 0; $i < 7; $i++) {
            $date = $today->copy()->addDays($i);
            $result[] = [
                'date' => $date->toDateString(),
                'day' =>$date->dayOfWeek, 
            ];
        }
        return $result;
    }

    public function quarterlyData() {
        $today = Carbon::today();
        $result = [];
    
        for ($monthOffset = 0; $monthOffset < 3; $monthOffset++) {
            $startOfMonth = $today->copy()->startOfMonth()->addMonths($monthOffset);
            $endOfMonth = $startOfMonth->copy()->endOfMonth();
            
            $monthlyData = [];
            foreach (new \DatePeriod($startOfMonth, \DateInterval::createFromDateString('1 day'), $endOfMonth) as $date) {
                $carbonDate = Carbon::instance($date);
                $monthlyData[] = [
                    'date' => $carbonDate->toDateString(),
                    'day' => $carbonDate->dayOfWeek,
                ];
            }
            
            $result[] = [
                'month' => $startOfMonth->month,
                'dates' => $monthlyData,
            ];
        }
        return $result;
    }

    //通常の営業時間
    public function regularData($restaurantList, $dates) {      
        $regularHours = OpeningHours::whereIn('restaurant_id', $restaurantList)
            ->get()
            ->groupBy('restaurant_id')
            ->map(function ($restaurant) {
                return $restaurant->groupBy('day_id')->map(function ($day) {
                    return $day->first();
                });
            }); 
        $result = collect($restaurantList)->mapWithKeys(function ($restaurantId) use ($dates, $regularHours) {
            
            $restaurantHours = collect($dates)->map(function ($date) use ($restaurantId, $regularHours) {
                
                if (isset($regularHours[$restaurantId]) && isset($regularHours[$restaurantId][$date['day']])) {
                    $record = $regularHours[$restaurantId][$date['day']];
                    return [
                        'open' => $record['open'],
                        'close' => $record['close'],
                        'open2' => $record['open2'],
                        'close2' => $record['close2'],
                        'is_open' => $record['is_open'],
                    ];
                    
                } else {
                    return [
                        'open' => null,
                        'close' => null,
                        'open2' => null,
                        'close2' => null,
                        'is_open' => null
                    ];
                }
            });
            return [$restaurantId => $restaurantHours];
        });

        return $result;
    }

    //例外の営業時間
    public function exceptionalData($restaurantList, $dates) {
        $dateList = array_column($dates, 'date');
        $result = ExceptionalHours::whereIn('restaurant_id', $restaurantList)
                                ->whereIn('date', $dateList)
                                ->get()
                                ->groupBy('restaurant_id');
        return $result;
    }

    //最終的な営業時間
    public function mergedHours($regularData, $exceptionalData, $dates) {
        $result = $regularData->map(function ($regularHours, $restaurantId) use ($exceptionalData, $dates) {
            
            $exceptionalHours = $exceptionalData->get($restaurantId, collect());
          
            return $regularHours->map(function ($hour, $dateIndex) use ($exceptionalHours, $dates) {
                $exception = $exceptionalHours->firstWhere('date', $dates[$dateIndex]['date']);
                $hour['date'] = $dates[$dateIndex]['date'];
                $hour['day_id'] = $dates[$dateIndex]['day'];
                if ($exception) {
                    $hour['open'] = $exception->open;
                    $hour['close'] = $exception->close;
                    $hour['is_open'] = $exception->is_open;
                }
                return $hour;
            });
        });
        return $result;
    }

    //一週間分の営業時間を取得
    public function getWeeklyHours($restaurantList) {
        $dates = $this->weeklyData();
        $regularData = $this->regularData($restaurantList, $dates);
        $exceptionalData = $this->exceptionalData($restaurantList, $dates);
        $result = $this->mergedHours($regularData, $exceptionalData, $dates);
        return $result;
    }

    //三ヶ月分の営業時間を取得
    public function getQuarterlyHours($restaurantId) {
        $pseudoIdList = array($restaurantId);
        $result = collect($this->quarterlyData())->map(function ($monthlyData) use ($pseudoIdList) {
            $dates = $monthlyData['dates'];
            $regularData = $this->regularData($pseudoIdList, $dates);
            $exceptionalData = $this->exceptionalData($pseudoIdList, $dates);
            $monthlyHours = $this->mergedHours($regularData, $exceptionalData, $dates)->first();
            return [
                'month' => $monthlyData['month'], 
                'hours' => $monthlyHours
            ];
        });
        return $result;
    }

    public function getMenus($restaurantId) {
        $result = Menus::where('parent_id', $restaurantId)
            ->get()
            ->groupBy('category_id')
            ->map(function ($group) {
                return $group->map(function ($menu) {
                    return [
                        'name' => $menu['name'],
                        'price' => $menu['price'],
                        'description' => $menu['description'],
                        'img_path' => $menu['img_path'],
                    ];
                });
            });
        return $result;
    }

    //飲食店を検索
    public function searchRestaurant(Request $request) {
        $status = (object) [
            'areas' => $request->input('areas'),
            'genres' => $request->input('genres'),
            'price' => $request->input('price'),
            'customers' => $request->input('customers'),
        ];

        $query = Restaurant::query();

        if (!is_null($status->areas)) {
            $query->whereIn('area_id', $status->areas);
        }
        if (!is_null($status->genres)) {
            $list = RestaurantGenres::whereIn('genre_id', $status->genres)
                                    ->pluck('restaurant_id')
                                    ->unique()
                                    ->toArray();
            $query->whereIn('id', $list);
        }
        if (!is_null($status->price)) {
            if (!is_null($status->price['min'])) {
                $query->where('price_max', '>', $status->price['min']);
            }
            if (!is_null($status->price['max'])) {
                $query->where('price_min', '<', $status->price['max']);
            }
        }
        if (!is_null($status->customers)) {
            $query->where('capacity', '>', $status->customers);
        }

        $result = $query->get();
        $idList = $result->pluck('id')->toArray();

        $chunkedResult = collect([[]])->merge(
            UtilHelper::splitIntoChunks($result, 5)
        );
        $relation = RestaurantGenres::whereIn('restaurant_id', $idList)->get();
        $hours = $this->getWeeklyHours($idList);

        return Inertia::render('gourmet/search', [
            'restaurants' => $chunkedResult,
            'relation' => $relation,
            'hours' => $hours
        ]);
    }

    //
    public function getRestaurantData(Request $request) {
        $id = $request->input('id');
        $result = Restaurant::where('id', $id)->get()->first(); //飲食店情報
        $relation = RestaurantGenres::where('restaurant_id', $id)->get(); //ジャンル情報
        $menus = $this->getMenus($id); //メニューリスト

        $path = public_path("uploaded_images/gourmet/restaurants/{$id}");
        if (File::exists($path)) {
            $result['images'] = count(File::allFiles($path));
        } else {
            $result['images'] = 0;
        }
        
        
        $quarterlyHours = $this->getQuarterlyHours($id);

        $openingHours = OpeningHours::where('restaurant_id', $id)->get();
        $defaultWeek = collect(range(0, 6))->map(function ($dayId) use ($openingHours) {
            $exist = $openingHours->firstWhere('day_id', $dayId);

            return [
                'open' => $exist ? $exist->open : null,
                'close' => $exist ? $exist->close : null,
                'open2' => $exist ? $exist->open2 : null,
                'close2' => $exist ? $exist->close2 : null,
                'is_open' => $exist ? $exist->is_open : null
            ];
        });

        return Inertia::render('gourmet/restaurant', [
            'restaurant' => $result,
            'relation' => $relation,
            'menus' => $menus,
            'hours' => [
                'defaultWeek' => $defaultWeek,
                'quarterlyHours' => $quarterlyHours
            ]
        ]);
    }
}