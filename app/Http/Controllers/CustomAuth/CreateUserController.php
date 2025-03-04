<?php

namespace App\Http\Controllers\CustomAuth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Mail;
use App\Mail\InitialPasswordMail;
use Illuminate\Auth\Events\Verified;
use Spatie\Permission\Models\Role;
use Illuminate\Validation\ValidationException;
use App\Models\Gourmet\Restaurant;

class CreateUserController extends Controller
{
    //ユーザー発行処理
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'role' => 'array', 
            'role.*' => 'boolean', 
        ]);

        if (isset($request->role['admin']) && $request->role['admin']) {
            return redirect()->back();
        }

        $initialPassword = bin2hex(random_bytes(12));

        $user = User::create([
            'name' => "",
            'email' => $request->email,
            'password' => Hash::make($initialPassword),
        ]);

        if (isset($request->role['restaurant']) && $request->role['restaurant']) {
            Restaurant::create([
                'user_id' => $user->id,
                'public' => 0,
            ]);
        }

       

        // リクエストのroleオブジェクトからtrueのロールを付与
        foreach ($request->role as $roleName => $hasRole) {
            if ($hasRole) {
                $user->assignRole(Role::where('name', $roleName)->first());
            }
        }
        

        $user->email_verified_at = now();
        $user->save();

        Mail::to($user->email)->send(new InitialPasswordMail($initialPassword));
        

        return redirect()->back();
    }
}
