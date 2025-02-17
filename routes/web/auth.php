<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Helpers\InertiaHelper;
use App\Http\Controllers\GourmetController;

Route::get('/console/restaurant', function () {
    return InertiaHelper::renderPage('auth', 'console_restaurant');
})->name('/auth/console/restaurant');