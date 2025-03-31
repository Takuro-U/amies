<?php

namespace App\Http\Controllers\Console;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Gourmet\Restaurant;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller {

    //飲食店リスト表示処理
    public function showRestaurantList() {
        $restaurants = Restaurant::all();
        $restaurants = $restaurants->map(function ($restaurant) {
            $uid = $restaurant->user_id;
            $user = User::find($uid);
            return [
                'id' => $restaurant->id,
                'name' => $restaurant->name,
                'email' => $user->email,
                'latitude' => $restaurant->latitude,
                'longitude' => $restaurant->longitude,
                'area_id' => $restaurant->area_id,
                'public' => $restaurant->public,
            ];
        });
        return Inertia::render('admin/restaurant_list', ['restaurants' => $restaurants]);
    }

    //飲食店リスト更新処理
    public function updateRestaurants(Request $request) {
        $restaurants = $request->input('restaurants');
        
        foreach ($restaurants as $restaurant) {
            $validator = Validator::make($restaurant, [
                'id' => 'required|integer|exists:restaurants,id', // IDの存在チェックを追加
                'latitude' => 'required|numeric',
                'longitude' => 'required|numeric',
                'area_id' => 'required|integer',
                'public' => 'required|in:0,1',
            ]);
        }

        foreach ($restaurants as $restaurant) {
            $record = Restaurant::find($restaurant['id']);
            $record->latitude = $restaurant['latitude'];
            $record->longitude = $restaurant['longitude'];
            $record->area_id = $restaurant['area_id'];
            $record->public = $restaurant['public'];
            $record->save();
        }
    }
}