<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'CroCoach') }} - Events</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:400,600,700" rel="stylesheet">

    <!-- Styles -->
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    @livewireStyles

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.7.3/dist/alpine.js" defer></script>
    {{-- <script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.9.0/moment.min.js"></script> --}}

</head>

<body class="bg-light">
    @include('inc.navbar')

    <!-- Page Content -->
    <main class="">
        {{ $slot }}
    </main>

    @stack('modals')

    <script src="{{ mix('js/app.js') }}"></script>
    @livewireScripts
    <script src="{{ asset('js/events.js') }}"></script>
    @stack('scripts')
</body>

</html>
