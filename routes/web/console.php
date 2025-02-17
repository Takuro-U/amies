<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Helpers\InertiaHelper;
use App\Http\Controllers\GourmetController;

Route::middleware(['restaurant.auth'])->get('/restaurant', function () {
    return InertiaHelper::renderPage('console', 'restaurant');
})->name('/console/restaurant');