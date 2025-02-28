<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Helpers\InertiaHelper;
use App\Http\Controllers\ProfileController;


Route::get('/', function () {
    return InertiaHelper::renderPage('profile', 'main');
});
Route::get('/edit', function (Request $request) {
    return Inertia::render('profile/edit', [
        'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
        'status' => session('status'),
    ]);
})->name('profile.edit');
Route::patch('/edit', [ProfileController::class, 'update'])->name('profile.update');
Route::delete('/edit', [ProfileController::class, 'destroy'])->name('profile.destroy');
