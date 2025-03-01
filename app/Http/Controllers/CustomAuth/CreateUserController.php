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
class CreateUserController extends Controller
{
    //ユーザー発行処理
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
        ]);

        $initialPassword = bin2hex(random_bytes(12));

        $user = User::create([
            'name' => "",
            'email' => $request->email,
            'password' => Hash::make($initialPassword),
        ]);

        event(new Registered($user));

        Mail::html(
            '
            <p>AMie\'sへの仮登録が完了しました。</p>
            <p><strong>初期パスワード:</strong> ' . $initialPassword . '</p>
            <p>このパスワードを使用してログインしてください。</p>
            ', 
            function ($message) use ($request) {
                $message->to($request->email)
                ->subject('AMie\'s仮登録完了のお知らせ');
            }
        );

        return redirect()->back();
    }
}
