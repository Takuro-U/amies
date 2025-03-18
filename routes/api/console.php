<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Helpers\InertiaHelper;
use App\Http\Controllers\CustomAuth\CreateUserController;
use App\Http\Controllers\Console\RestaurantController;

Route::prefix('admin')->middleware(['auth', 'can:admin'])->group(function () {

});

