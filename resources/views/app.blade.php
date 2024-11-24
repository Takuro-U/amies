<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name') }}</title>
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
    @if (Request::path() === '/')
        <div id="initial-content">
            {!! file_get_contents(resource_path('views/placeholder.html')) !!}
        </div>
    @endif

    @inertia
</body>
</html>