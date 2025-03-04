<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Helpers\InertiaHelper;
use App\Http\Controllers\CustomAuth\CreateUserController;
use App\Http\Controllers\Console\RestaurantController;

Route::prefix('admin')->middleware(['auth', 'can:admin'])->group(function () {

});

Route::prefix('restaurant')->middleware(['auth', 'can:restaurant'])->group(function () {
    Route::post('/edit-menus/images', [RestaurantController::class, 'updateMenusImages'])->name('/console/restaurant/edit-menus/images');
});

