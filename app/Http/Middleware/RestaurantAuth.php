<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Helpers\InertiaHelper;

class RestaurantAuth
{
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::guard('restaurant')->check()) {
            return $next($request);
        }
        return Inertia::location(route('/auth/console/restaurant'));
    }
}
