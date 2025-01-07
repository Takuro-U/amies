<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Helpers\UtilHelper;
use App\Models\Gourmet\Restaurant;
use App\Models\Gourmet\RestaurantGenres; 

class GourmetController extends Controller {

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
            $idList = RestaurantGenres::whereIn('genre_id', $status->genres)
                                    ->pluck('restaurant_id')
                                    ->unique()
                                    ->toArray();
            $query->whereIn('id', $idList);
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

        $chunkedResult = collect([[]])->merge(
            UtilHelper::splitIntoChunks($result, 3)
        );

        return Inertia::render('gourmet/search', [
            'result' => $chunkedResult
        ]);
    }
}