<?php

namespace App\Helpers;

use Inertia\Inertia;

class InertiaHelper
{
    public static function renderPage($app, $page)
    {
        return Inertia::render("{$app}/{$page}");
    }
}