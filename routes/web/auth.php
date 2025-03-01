<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Helpers\InertiaHelper;

Route::middleware('guest')->group(function () {

    //登録ページ
    Route::get('register', function () {
        return Inertia::render('auth/register');
    })->name('register');

    //登録処理
    Route::post('register', [RegisteredUserController::class, 'store']);

    //ログインページ
    Route::get('login', function () {
        return Inertia::render('auth/login', [
            'status' => session('status'),
            'canResetPassword' => Route::has('password.request'),
        ]);
    })->name('login');

    //ログイン処理
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);

    //パスワードリセットリクエストページ
    Route::get('forgot-password', function () {
        return Inertia::render('auth/forgot_password', [
            'status' => session('status'),
        ]);
    })->name('password.request');

    //パスワードリセットリクエスト処理
    Route::post('forgot-password', 
        [PasswordResetLinkController::class, 'store']
    )->name('password.email');

    //新パスワード設定ページ
    Route::get('reset-password/{token}', function (Request $request) {
        return Inertia::render('auth/reset_password', [
            'email' => $request->email,
            'token' => $request->route('token'),
        ]);
    })->name('password.reset');

    //新パスワード設定処理
    Route::post('reset-password',
        [NewPasswordController::class, 'store']
    )->name('password.store');
});

Route::middleware('auth')->group(function () {
    //認証されていればリダイレクトするようにしたいなあ
    //したでえ
    Route::get('verify-email', function (Request $request) {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect('/profile');
        }
        return Inertia::render('auth/verify_email', [
            'status' => session('status'),
        ]);
    })->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', function () {
        return Inertia::render('auth/confirm_password');
    })->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
