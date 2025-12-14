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
    Route::get('categories/create', [\App\Http\Controllers\CategoryController::class, 'create'])->name('categories-create');
    Route::get('categories/{category}/show', [\App\Http\Controllers\CategoryController::class, 'show'])->name('categories-show');
    Route::post('categories', [\App\Http\Controllers\CategoryController::class, 'store'])->name('categories-store');
    Route::get('categories/{category}/edit', [\App\Http\Controllers\CategoryController::class, 'edit'])->name('categories-edit');
    Route::put('categories/{category}', [\App\Http\Controllers\CategoryController::class, 'update'])->name('categories-update');
    Route::delete('categories/{category}', [\App\Http\Controllers\CategoryController::class, 'delete'])->name('categories-delete');
});

require __DIR__.'/settings.php';
