<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Maatwebsite\Excel\Facades\Excel;

try {
    $path = storage_path('app/private/test-import.xlsx');
    echo 'Path: '.$path.PHP_EOL;
    if (file_exists($path)) {
        $data = Excel::toArray(new stdClass, $path);
        echo 'Headers: '.PHP_EOL;
        print_r($data[0][0]);
        echo 'Example Row: '.PHP_EOL;
        print_r($data[0][1]);
    } else {
        echo 'File not found'.PHP_EOL;
    }
} catch (\Exception $e) {
    echo 'Error: '.$e->getMessage().PHP_EOL;
}
