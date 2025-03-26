<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Helpers\InertiaHelper;
use App\Models\User;
use App\Models\Gourmet\Restaurant;
use App\Http\Controllers\CustomAuth\CreateUserController;
use App\Http\Controllers\Console\RestaurantController;

Route::prefix('admin')->middleware(['auth', 'can:admin'])->group(function () {
    Route::get('/', function () {
        return InertiaHelper::renderPage('admin', 'main');
    })->name('/console/admin');

    Route::get('/user-creator', function () {
        return InertiaHelper::renderPage('admin', 'user_creator');
    })->name('/console/admin/user-creator');

    Route::post('/user-creator', [CreateUserController::class, 'store']);

    Route::get('/restaurant-list', function () {
        $restaurants = Restaurant::all();
        $restaurants = $restaurants->map(function ($restaurant) {
            $uid = $restaurant->user_id;
            $user = User::find($uid);
            $restaurant->email = $user->email;
            return $restaurant;
        });
        return Inertia::render('admin/restaurant_list', ['restaurants' => $restaurants]);
    })->name('/console/admin/restaurant-list');
});

Route::prefix('restaurant')->middleware(['auth', 'can:restaurant'])->group(function () {
    Route::get('/edit', [RestaurantController::class, 'showRestaurantEditor'])->name('/console/restaurant/edit');
    Route::patch('/edit', [RestaurantController::class, 'updateRestaurant'])->name('/console/restaurant/edit');
    Route::get('/edit-menus', [RestaurantController::class, 'showMenusEditor'])->name('/console/restaurant/edit-menus');
    Route::patch('/edit-menus', [RestaurantController::class, 'updateMenus'])->name('/console/restaurant/edit-menus');
});

