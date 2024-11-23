<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\View;

class AddViewData
{
    public function handle(Request $request, Closure $next)
    {
        $entryPoint = $this->determineEntryPoint($request);
        View::share('entryPoint', $entryPoint);

        return $next($request);
    }

    protected function determineEntryPoint(Request $request)
    {
        if ($request->is('console') || $request->is('console/*')) {
            return 'console';
        } else {
            return 'app';
        }
    }
}
