<?php

namespace App\Http\Controllers\CustomAuth;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class RestaurantAuthController extends Controller{

    public function login(Request $request) {
        $id = $request->input('id');
        $password = $request->input('password');

        $user = RestaurantAuth::where('id', $id)->first();

        if (!$user || !Hash::check($password, $user->password_hash)) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }
        return; // routing to the restaurant dashboard
    }

    public function resetPassword(Request $request) {
        $id = $request->input('id');
        $password = $request->input('password');
        $new_password = $request->input('newPassword');

        $user = RestaurantAuth::where('id', $id)->first();

        if (!$user || !Hash::check($password, $user->password_hash)) {
            return response()->json([
                'message' => 'faild to update password'
            ], 401);
        }

        $user->password_hash = Hash::make($new_password);
        $user->save();

        return response()->json([
            'message' => 'Password updated successfully'
        ], 200);
        
    }
}