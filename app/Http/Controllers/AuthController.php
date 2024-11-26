<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller{
    public function login()
    {
        $newAuthStatus = (object) [
            'isAuthenticated' => true,
            'id' => 'hogehoge',
            'username' => 'test-user'
        ];
        return response()->json($newAuthStatus);
    }
}