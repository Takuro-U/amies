<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Helpers\InertiaHelper;
use App\Http\Controllers\GourmetController;

Route::get('/', function () {
    return InertiaHelper::renderPage('gourmet', 'main');
})->name('/gourmet');

Route::get('/search', 
    [GourmetController::class, 'searchRestaurant']
)->name('/gourmet/search');