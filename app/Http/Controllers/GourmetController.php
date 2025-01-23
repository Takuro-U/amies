<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Helpers\UtilHelper;
use App\Models\Gourmet\Restaurant;
use App\Models\Gourmet\RestaurantGenres;
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

    //通常の営業時間
    public function regularData($restaurantList, $dates) {
        $initialData = collect($restaurantList)->mapWithKeys(function ($id) use ($dates) {
            $days = collect($dates)->pluck('day')->mapWithKeys(function ($day) {
                return [
                    $day => [
                        'open' => null,
                        'close' => null,
                        'is_open' => null
                    ]
                ];
            });
            return [
                $id => $days->values()
            ];
        });
        OpeningHours::whereIn('restaurant_id', $restaurantList)->get()
            ->groupBy('restaurant_id')
            ->map(function ($group, $restaurantId) use ($initialData) {
                $group->each(function ($day) use ($initialData, $restaurantId) {
                    $initialData[$restaurantId][$day['day_id']] = [
                        'open' => $day['open'],
                        'close' => $day['close'],
                        'is_open' => $day['is_open']
                    ];
                });
            });
        return $initialData;
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

    public function getRestaurantData(Request $request) {
        $id = $request->input('id');
        $result = Restaurant::where('id', $id)->get()->first();
        $relation = RestaurantGenres::where('restaurant_id', $id)->get();

        return Inertia::render('gourmet/restaurant', [
            'restaurant' => $result,
            'relation' => $relation,
        ]);
    }
}