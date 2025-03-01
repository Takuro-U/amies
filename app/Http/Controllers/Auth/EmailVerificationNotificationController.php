<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class EmailVerificationNotificationController extends Controller
{
    //メールアドレス認証_メール送信処理
    public function store(Request $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(route('/', absolute: false));
        }

        $request->user()->sendEmailVerificationNotification();

        
        return back()->with('status', 'verification-link-sent');
    }
}
