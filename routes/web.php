<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\AddViewData;
use App\Helpers\InertiaHelper;

Route::middleware([AddViewData::class])->group(function () {

    //認証
    Route::prefix('auth')->group(function () {
        require base_path('routes/web/auth.php');
    });

    //コンソール
    Route::middleware(['auth', 'verified'])->prefix('console')->group(function () {
        require base_path('routes/web/console.php');
    });

    //プロフィール
    Route::middleware(['auth', 'verified'])->prefix('profile')->group(function () {
        require base_path('routes/web/profile.php');
    });

    //トップ
    Route::get('/', function () {
        return InertiaHelper::renderPage('top', 'main');
    })->name('/');

    //グルメ
    Route::prefix('gourmet')->group(function () {
        require base_path('routes/web/gourmet.php');
    });

    

    //本番では要らないやつ
    Route::get('/dashboard', function () {
        return InertiaHelper::renderPage('test', 'dash_board');
    })->name('dashboard');
});


