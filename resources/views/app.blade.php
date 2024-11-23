<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title inertia>{{ config('app.name', 'Laravel') }}</title>
    @viteReactRefresh
    @routes
    @if ($entryPoint === 'console')
        @vite('resources/console.tsx')
    @elseif ($entryPoint === 'app')
        @vite('resources/app.tsx')
    @endif
    @inertiaHead
</head>
<body>
    @inertia
</body>
</html>