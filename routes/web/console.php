<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Helpers\InertiaHelper;
use App\Http\Controllers\CustomAuth\CreateUserController;

Route::prefix('admin')->middleware(['auth', 'can:admin'])->group(function () {
    Route::get('/', function () {
        return InertiaHelper::renderPage('admin', 'main');
    })->name('/console/admin');

    Route::get('/user-creator', function () {
        return InertiaHelper::renderPage('admin', 'user_creator');
    })->name('/console/admin/user-creator');

    Route::post('/user-creator', [CreateUserController::class, 'store']);
});

Route::prefix('restaurant')->middleware(['auth', 'can:restaurant'])->group(function () {
    Route::get('/', function () {
        return InertiaHelper::renderPage('restaurant', 'main');
    })->name('/console/restaurant');
});

