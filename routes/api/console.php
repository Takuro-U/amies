<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ConsoleController;

Route::get('/thumbnail', 
    [ConsoleController::class, 'getThumbnailLayouts']
);