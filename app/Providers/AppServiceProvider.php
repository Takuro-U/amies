<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider {
    public function register(): void {
        //
    }

    public function boot() {
        Inertia::share([
            'auth' => function () {
                return [
                    'user' => Auth::user() ? [
                        'id' => Auth::user()->id,
                        'name' => Auth::user()->name,
                        'nickname' => !empty(Auth::user()->profile?->nickname) ? Auth::user()->profile->nickname : "匿名",
                    ] : null,
                    'check' => Auth::check(),
                ];
            },
        ]);   
    }
}
