<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestController;

Route::get('/test', function() {
    return response('executed');
});

Route::group(['prefix' => 'console'], function () {
    require base_path('routes/api/adminConsole.php');
});