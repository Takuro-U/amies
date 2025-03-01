<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware {
    protected $rootView = 'app';

    public function version(Request $request): ?string {
        return parent::version($request);
    }

     public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? array_merge(
                    $request->user()->toArray(),
                    [
                        'nickname' => !empty($request->user()->profile?->nickname) ? $request->user()->profile->nickname : "匿名",
                        'icon_path' => $request->user()->profile?->icon_path
                    ]
                ) : null,
                'check' => $request->user() ? $request->user()->hasVerifiedEmail() : false,
            ],
        ];
    }
}
