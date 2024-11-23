<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Helpers\InertiaHelper;

Route::get('/', function () {
    return InertiaHelper::renderPage('gourmet', 'main');
})->name('/gourmet');