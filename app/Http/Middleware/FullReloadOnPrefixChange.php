<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FullReloadOnPrefixChange
{
    public function handle(Request $request, Closure $next)
    {
        $currentPrefix = $this->getPrefix($request);
        $previousPrefix = $request->header('X-Previous-Prefix');

        //dd($request);

        $consoleToElse = $currentPrefix === 'console' && $previousPrefix !== 'console';
        $elseToConsole = $currentPrefix !== 'console' && $previousPrefix === 'console';

        if ($consoleToElse || $elseToConsole) {
            if ($request->header('X-Inertia')) {
                return Inertia::location($request->fullUrl());
            }
        }

        return $next($request);
    }

    protected function getPrefix(Request $request)
    {
        if ($request->is('console') || $request->is('console/*')) {
            return 'console';
        }
        return 'app';
    }
} 