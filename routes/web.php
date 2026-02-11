<?php

use App\Http\Controllers\MaintenanceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::redirect('/', '/login');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Category Routes
    Route::get('categories', [\App\Http\Controllers\CategoryController::class, 'index'])->name('categories');
    Route::post('categories', [\App\Http\Controllers\CategoryController::class, 'store'])->name('categories-store');
    Route::put('categories/{category}', [\App\Http\Controllers\CategoryController::class, 'update'])->name('categories-update');
    Route::delete('categories/{category}', [\App\Http\Controllers\CategoryController::class, 'delete'])->name('categories-delete');

    // Admin Only Routes
    Route::middleware(['role:admin'])->group(function () {
        // Tickets Routes (Admin Management)
        Route::get('tickets', [\App\Http\Controllers\TicketController::class, 'index'])->name('tickets');
        Route::get('tickets/create', [\App\Http\Controllers\TicketController::class, 'create'])->name('tickets-create');
        Route::post('tickets', [\App\Http\Controllers\TicketController::class, 'store'])->name('tickets-store');
        Route::get('tickets/{ticket}', [\App\Http\Controllers\TicketController::class, 'show'])->name('tickets-show');
        Route::get('tickets/{ticket}/edit', [\App\Http\Controllers\TicketController::class, 'edit'])->name('tickets-edit');
        Route::put('tickets/{ticket}', [\App\Http\Controllers\TicketController::class, 'update'])->name('tickets-update');
        Route::delete('tickets/{ticket}', [\App\Http\Controllers\TicketController::class, 'destroy'])->name('tickets-delete');
        Route::post('tickets/{ticket}/assign', [\App\Http\Controllers\TicketController::class, 'assign'])->name('tickets-assign');
        Route::post('tickets/{ticket}/status', [\App\Http\Controllers\TicketController::class, 'changeStatus'])->name('tickets-status');
        Route::post('tickets/{ticket}/comment', [\App\Http\Controllers\TicketController::class, 'addComment'])->name('tickets-comment');

        // Company Routes
        Route::get('company', [\App\Http\Controllers\CompanyController::class, 'index'])->name('company');
        Route::post('company', [\App\Http\Controllers\CompanyController::class, 'store'])->name('company-store');
        Route::put('company/{category}', [\App\Http\Controllers\CompanyController::class, 'update'])->name('company-update');
        Route::delete('company/{category}', [\App\Http\Controllers\CompanyController::class, 'delete'])->name('company-delete');
    });

    // Asset Routes
    Route::get('assets', [\App\Http\Controllers\AssetController::class, 'index'])->name('assets');
    Route::get('assets/create', [\App\Http\Controllers\AssetController::class, 'create'])->name('assets-create');
    Route::post('assets', [\App\Http\Controllers\AssetController::class, 'store'])->name('assets-store');
    Route::get('assets/{asset}/edit', [\App\Http\Controllers\AssetController::class, 'edit'])->name('assets-edit');
    Route::put('assets/{asset}', [\App\Http\Controllers\AssetController::class, 'update'])->name('assets-update');
    Route::delete('assets/{asset}', [\App\Http\Controllers\AssetController::class, 'destroy'])->name('assets-delete');
    Route::get('assets/{asset}/show', [\App\Http\Controllers\AssetController::class, 'show'])->name('assets-detail');
    Route::get('assets/{asset}/print-label', [\App\Http\Controllers\AssetController::class, 'printLabel'])->name('assets-print-label');

    // Location Routes
    Route::get('locations', [\App\Http\Controllers\LocationController::class, 'index'])->name('locations');
    Route::post('locations', [\App\Http\Controllers\LocationController::class, 'store'])->name('locations-store');
    Route::put('locations/{location}', [\App\Http\Controllers\LocationController::class, 'update'])->name('locations-update');
    Route::delete('locations/{location}', [\App\Http\Controllers\LocationController::class, 'delete'])->name('locations-delete');

    // Maintenance Routes
    Route::get('maintenances', [MaintenanceController::class, 'index'])->name('maintenances');
    Route::get('maintenances/create', [MaintenanceController::class, 'create'])->name('maintenances-create');
    Route::post('maintenances', [MaintenanceController::class, 'store'])->name('maintenances-store');
    Route::get('maintenances/{maintenance}/edit', [MaintenanceController::class, 'edit'])->name('maintenances-edit');
    Route::put('maintenances/{maintenance}', [MaintenanceController::class, 'update'])->name('maintenances-update');
    Route::delete('maintenances/{maintenance}', [MaintenanceController::class, 'destroy'])->name('maintenances-delete');

    // Helpdesk Routes
    Route::get('helpdesk/tickets', [\App\Http\Controllers\HelpdeskController::class, 'index'])->name('helpdesk-index');
    Route::get('helpdesk/tickets/create', [\App\Http\Controllers\HelpdeskController::class, 'create'])->name('helpdesk-create');
    Route::post('helpdesk/tickets', [\App\Http\Controllers\HelpdeskController::class, 'store'])->name('helpdesk-store');
    Route::get('helpdesk/tickets/{ticket}', [\App\Http\Controllers\HelpdeskController::class, 'show'])->name('helpdesk-show');
    Route::post('helpdesk/tickets/{ticket}/comment', [\App\Http\Controllers\HelpdeskController::class, 'addComment'])->name('helpdesk-comment');
});

Route::get('assets/{asset}/qrcode-detail', [\App\Http\Controllers\AssetController::class, 'qrcodeDetail'])->name('assets-qrcode-detail');

require __DIR__.'/settings.php';
