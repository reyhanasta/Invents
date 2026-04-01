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
    Route::get('categories', [\App\Http\Controllers\CategoryController::class, 'index'])->name('categories')->can('viewAny', \App\Models\Category::class);
    Route::post('categories', [\App\Http\Controllers\CategoryController::class, 'store'])->name('categories-store')->can('create', \App\Models\Category::class);
    Route::put('categories/{category}', [\App\Http\Controllers\CategoryController::class, 'update'])->name('categories-update')->can('update', 'category');
    Route::delete('categories/{category}', [\App\Http\Controllers\CategoryController::class, 'delete'])->name('categories-delete')->can('delete', 'category');

    // Admin & Management Routes
    Route::middleware(['role:admin|management'])->group(function () {
        // Tickets Routes (Admin Management)
        Route::get('tickets', [\App\Http\Controllers\TicketController::class, 'index'])->name('tickets')->can('viewAny', \App\Models\Ticket::class);
        Route::get('tickets/create', [\App\Http\Controllers\TicketController::class, 'create'])->name('tickets-create')->can('create', \App\Models\Ticket::class);
        Route::post('tickets', [\App\Http\Controllers\TicketController::class, 'store'])->name('tickets-store')->can('create', \App\Models\Ticket::class);
        Route::get('tickets/{ticket}', [\App\Http\Controllers\TicketController::class, 'show'])->name('tickets-show')->can('view', 'ticket');
        Route::get('tickets/{ticket}/edit', [\App\Http\Controllers\TicketController::class, 'edit'])->name('tickets-edit')->can('update', 'ticket');
        Route::put('tickets/{ticket}', [\App\Http\Controllers\TicketController::class, 'update'])->name('tickets-update')->can('update', 'ticket');
        Route::delete('tickets/{ticket}', [\App\Http\Controllers\TicketController::class, 'destroy'])->name('tickets-delete')->can('delete', 'ticket');
        Route::post('tickets/{ticket}/assign', [\App\Http\Controllers\TicketController::class, 'assign'])->name('tickets-assign')->can('assign', 'ticket');
        Route::post('tickets/{ticket}/status', [\App\Http\Controllers\TicketController::class, 'changeStatus'])->name('tickets-status')->can('update', 'ticket');
        Route::post('tickets/{ticket}/comment', [\App\Http\Controllers\TicketController::class, 'addComment'])->name('tickets-comment')->can('addComment', 'ticket');

        // Company Routes
        Route::get('company', [\App\Http\Controllers\CompanyController::class, 'index'])->name('company');
        Route::post('company', [\App\Http\Controllers\CompanyController::class, 'store'])->name('company-store');
        Route::put('company/{company}', [\App\Http\Controllers\CompanyController::class, 'update'])->name('company-update');
        Route::delete('company/{company}', [\App\Http\Controllers\CompanyController::class, 'delete'])->name('company-delete');

        // User Management Routes - WRONG PLACE IF NOT ADMIN ONLY
    });

    Route::middleware(['role:admin'])->group(function () {
        Route::resource('users', \App\Http\Controllers\Admin\UserController::class);
    });

    // Asset Routes
    Route::get('assets', [\App\Http\Controllers\AssetController::class, 'index'])->name('assets')->can('viewAny', \App\Models\Asset::class);
    Route::get('assets/create', [\App\Http\Controllers\AssetController::class, 'create'])->name('assets-create')->can('create', \App\Models\Asset::class);
    Route::post('assets', [\App\Http\Controllers\AssetController::class, 'store'])->name('assets-store')->can('create', \App\Models\Asset::class);
    Route::get('assets/{asset}/edit', [\App\Http\Controllers\AssetController::class, 'edit'])->name('assets-edit')->can('update', 'asset');
    Route::put('assets/{asset}', [\App\Http\Controllers\AssetController::class, 'update'])->name('assets-update')->can('update', 'asset');
    Route::delete('assets/{asset}', [\App\Http\Controllers\AssetController::class, 'destroy'])->name('assets-delete')->can('delete', 'asset');
    Route::get('assets/{asset}/show', [\App\Http\Controllers\AssetController::class, 'show'])->name('assets-detail')->can('view', 'asset');
    Route::get('assets/{asset}/print-label', [\App\Http\Controllers\AssetController::class, 'printLabel'])->name('assets-print-label')->can('printLabel', 'asset');

    // Location Routes
    Route::get('locations', [\App\Http\Controllers\LocationController::class, 'index'])->name('locations')->can('viewAny', \App\Models\Location::class);
    Route::post('locations', [\App\Http\Controllers\LocationController::class, 'store'])->name('locations-store')->can('create', \App\Models\Location::class);
    Route::put('locations/{location}', [\App\Http\Controllers\LocationController::class, 'update'])->name('locations-update')->can('update', 'location');
    Route::delete('locations/{location}', [\App\Http\Controllers\LocationController::class, 'delete'])->name('locations-delete')->can('delete', 'location');

    // Maintenance Routes
    Route::get('maintenances', [MaintenanceController::class, 'index'])->name('maintenances')->can('viewAny', \App\Models\Maintenance::class);
    Route::get('maintenances/create', [MaintenanceController::class, 'create'])->name('maintenances-create')->can('create', \App\Models\Maintenance::class);
    Route::post('maintenances', [MaintenanceController::class, 'store'])->name('maintenances-store')->can('create', \App\Models\Maintenance::class);
    Route::get('maintenances/{maintenance}/edit', [MaintenanceController::class, 'edit'])->name('maintenances-edit')->can('update', 'maintenance');
    Route::put('maintenances/{maintenance}', [MaintenanceController::class, 'update'])->name('maintenances-update')->can('update', 'maintenance');
    Route::delete('maintenances/{maintenance}', [MaintenanceController::class, 'destroy'])->name('maintenances-delete')->can('delete', 'maintenance');

    // Helpdesk Routes
    Route::get('helpdesk/tickets', [\App\Http\Controllers\HelpdeskController::class, 'index'])->name('helpdesk-index');
    Route::get('helpdesk/tickets/create', [\App\Http\Controllers\HelpdeskController::class, 'create'])->name('helpdesk-create');
    Route::post('helpdesk/tickets', [\App\Http\Controllers\HelpdeskController::class, 'store'])->name('helpdesk-store');
    Route::get('helpdesk/tickets/{ticket}', [\App\Http\Controllers\HelpdeskController::class, 'show'])->name('helpdesk-show')->can('view', 'ticket');
    Route::post('helpdesk/tickets/{ticket}/comment', [\App\Http\Controllers\HelpdeskController::class, 'addComment'])->name('helpdesk-comment')->can('addComment', 'ticket');
});

Route::get('assets/{asset}/qrcode-detail', [\App\Http\Controllers\AssetController::class, 'qrcodeDetail'])->name('assets-qrcode-detail');

require __DIR__.'/settings.php';
