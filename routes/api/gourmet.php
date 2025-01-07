<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GourmetController;

Route::get('/area', 
    [GourmetController::class, 'getAreaList']
);

Route::get('/genre', 
    [GourmetController::class, 'getGenreList']
);