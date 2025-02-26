<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\AddViewData;
use App\Helpers\InertiaHelper;

Route::middleware([AddViewData::class])->group(function () {
    Route::get('/', function () {
        return InertiaHelper::renderPage('top', 'main');
    })->name('/');

    Route::get('/dashboard', function () {
        return InertiaHelper::renderPage('common', 'dash_board');
    })->name('dashboard');

    Route::prefix('auth')->group(function () {
        require base_path('routes/web/auth.php');
    });

    Route::prefix('gourmet')->group(function () {
        require base_path('routes/web/gourmet.php');
    });
    
    Route::prefix('console')->group(function () {
        require base_path('routes/web/console.php');
    });

    Route::middleware('auth')->group(function () {
        Route::get('/profile', function (Request $request) {
            return Inertia::render('profile/edit', [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
            ]);
        })->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
});


