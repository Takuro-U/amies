<?php

return [

    'paths' => [
        //'api/*',
        '/',
        '/auth/*',
        '/console/*',
        '/profile/*',
        '/gourmet/*',
        'sanctum/csrf-cookie'
    ],

    'allowed_methods' => [
        'GET', 
        'POST', 
        'PUT',
        'PATCH',
    ],

    'allowed_origins' => [env('APP_URL')],

    'allowed_origins_patterns' => [],

    'allowed_headers' => [
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
        'X-CSRF-TOKEN',
        'X-XSRF-TOKEN',
    ],

    'exposed_headers' => [],

    'max_age' => 3600,

    'supports_credentials' => true,
];
