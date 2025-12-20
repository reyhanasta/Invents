<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Category Routes
    Route::get('categories', [\App\Http\Controllers\CategoryController::class, 'index'])->name('categories');
    Route::post('categories', [\App\Http\Controllers\CategoryController::class, 'store'])->name('categories-store');
    Route::put('categories/{category}', [\App\Http\Controllers\CategoryController::class, 'update'])->name('categories-update');
    Route::delete('categories/{category}', [\App\Http\Controllers\CategoryController::class, 'delete'])->name('categories-delete');

    // Asset Routes
    Route::get('assets', [\App\Http\Controllers\AssetController::class, 'index'])->name('assets');
    Route::get('assets/create', [\App\Http\Controllers\AssetController::class, 'create'])->name('assets-create');
    Route::post('assets', [\App\Http\Controllers\AssetController::class, 'store'])->name('assets-store');
    Route::get('assets/{asset}/edit', [\App\Http\Controllers\AssetController::class, 'edit'])->name('assets-edit');
    Route::put('assets/{asset}', [\App\Http\Controllers\AssetController::class, 'update'])->name('assets-update');
    Route::delete('assets/{asset}', [\App\Http\Controllers\AssetController::class, 'destroy'])->name('assets-delete');
    Route::get('assets/{asset}/show', [\App\Http\Controllers\AssetController::class, 'show'])->name('assets-detail');
    Route::get('assets/{asset}/qrcode-detail', [\App\Http\Controllers\AssetController::class, 'qrcodeDetail'])->name('assets-qrcode-detail');
    Route::get('assets/{asset}/print-label', [\App\Http\Controllers\AssetController::class, 'printLabel'])->name('assets-print-label');
});

require __DIR__.'/settings.php';
