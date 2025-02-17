<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\AddViewData;
use App\Helpers\InertiaHelper;

Route::middleware([AddViewData::class])->group(function () {
    Route::get('/', function () {
        return InertiaHelper::renderPage('top', 'main');
    })->name('/');
    
    Route::get('/auth', function () {
        return InertiaHelper::renderPage('common', 'auth');
    })->name('/auth');

    Route::get('/user', function () {
        return InertiaHelper::renderPage('common', 'user');
    })->name('/user');

    Route::prefix('auth')->group(function () {
        require base_path('routes/web/auth.php');
    });

    Route::prefix('gourmet')->group(function () {
        require base_path('routes/web/gourmet.php');
    });
    
    Route::prefix('console')->group(function () {
        require base_path('routes/web/console.php');
    });
});


