<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HelpdeskController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\MaintenanceController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\TicketController;
use App\Models\Asset;
use App\Models\Category;
use App\Models\Location;
use App\Models\Maintenance;
use App\Models\Ticket;
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
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('reports', [ReportController::class, 'index'])->name('reports');
    Route::get('reports/export', [ReportController::class, 'export'])->name('reports-export');

    // Category Routes
    Route::get('categories', [CategoryController::class, 'index'])->name('categories')->can('viewAny', Category::class);
    Route::post('categories', [CategoryController::class, 'store'])->name('categories-store')->can('create', Category::class);
    Route::put('categories/{category}', [CategoryController::class, 'update'])->name('categories-update')->can('update', 'category');
    Route::delete('categories/{category}', [CategoryController::class, 'delete'])->name('categories-delete')->can('delete', 'category');

    // Admin & Management Routes
    Route::middleware(['role:admin|management'])->group(function () {
        // Tickets Routes (Admin Management)
        Route::get('tickets', [TicketController::class, 'index'])->name('tickets')->can('viewAny', Ticket::class);
        Route::get('tickets/create', [TicketController::class, 'create'])->name('tickets-create')->can('create', Ticket::class);
        Route::post('tickets', [TicketController::class, 'store'])->name('tickets-store')->can('create', Ticket::class);
        Route::get('tickets/{ticket}', [TicketController::class, 'show'])->name('tickets-show')->can('view', 'ticket');
        Route::get('tickets/{ticket}/edit', [TicketController::class, 'edit'])->name('tickets-edit')->can('update', 'ticket');
        Route::put('tickets/{ticket}', [TicketController::class, 'update'])->name('tickets-update')->can('update', 'ticket');
        Route::delete('tickets/{ticket}', [TicketController::class, 'destroy'])->name('tickets-delete')->can('delete', 'ticket');
        Route::post('tickets/{ticket}/assign', [TicketController::class, 'assign'])->name('tickets-assign')->can('assign', 'ticket');
        Route::post('tickets/{ticket}/status', [TicketController::class, 'changeStatus'])->name('tickets-status')->can('update', 'ticket');
        Route::post('tickets/{ticket}/comment', [TicketController::class, 'addComment'])->name('tickets-comment')->can('addComment', 'ticket');

        // Company Routes
        Route::get('company', [CompanyController::class, 'index'])->name('company');
        Route::post('company', [CompanyController::class, 'store'])->name('company-store');
        Route::put('company/{company}', [CompanyController::class, 'update'])->name('company-update');
        Route::delete('company/{company}', [CompanyController::class, 'delete'])->name('company-delete');

        // User Management Routes - WRONG PLACE IF NOT ADMIN ONLY
    });

    Route::middleware(['role:admin'])->group(function () {
        Route::resource('users', UserController::class);
    });

    // Asset Routes
    Route::post('assets/import', [AssetController::class, 'import'])->name('assets-import')->can('create', Asset::class);
    Route::get('assets/export', [AssetController::class, 'export'])->name('assets-export')->can('viewAny', Asset::class);
    Route::get('assets', [AssetController::class, 'index'])->name('assets')->can('viewAny', Asset::class);
    Route::get('assets/create', [AssetController::class, 'create'])->name('assets-create')->can('create', Asset::class);
    Route::post('assets', [AssetController::class, 'store'])->name('assets-store')->can('create', Asset::class);
    Route::get('assets/{asset}/edit', [AssetController::class, 'edit'])->name('assets-edit')->can('update', 'asset');
    Route::put('assets/{asset}', [AssetController::class, 'update'])->name('assets-update')->can('update', 'asset');
    Route::delete('assets/{asset}', [AssetController::class, 'destroy'])->name('assets-delete')->can('delete', 'asset');
    Route::get('assets/{asset}/show', [AssetController::class, 'show'])->name('assets-detail')->can('view', 'asset');

    // Location Routes
    Route::get('locations', [LocationController::class, 'index'])->name('locations')->can('viewAny', Location::class);
    Route::post('locations', [LocationController::class, 'store'])->name('locations-store')->can('create', Location::class);
    Route::put('locations/{location}', [LocationController::class, 'update'])->name('locations-update')->can('update', 'location');
    Route::delete('locations/{location}', [LocationController::class, 'delete'])->name('locations-delete')->can('delete', 'location');

    // Maintenance Routes
    Route::get('maintenances', [MaintenanceController::class, 'index'])->name('maintenances')->can('viewAny', Maintenance::class);
    Route::get('maintenances/create', [MaintenanceController::class, 'create'])->name('maintenances-create')->can('create', Maintenance::class);
    Route::post('maintenances', [MaintenanceController::class, 'store'])->name('maintenances-store')->can('create', Maintenance::class);
    Route::get('maintenances/{maintenance}/edit', [MaintenanceController::class, 'edit'])->name('maintenances-edit')->can('update', 'maintenance');
    Route::put('maintenances/{maintenance}', [MaintenanceController::class, 'update'])->name('maintenances-update')->can('update', 'maintenance');
    Route::delete('maintenances/{maintenance}', [MaintenanceController::class, 'destroy'])->name('maintenances-delete')->can('delete', 'maintenance');

    // Helpdesk Routes
    Route::get('helpdesk/tickets', [HelpdeskController::class, 'index'])->name('helpdesk-index');
    Route::get('helpdesk/tickets/create', [HelpdeskController::class, 'create'])->name('helpdesk-create');
    Route::post('helpdesk/tickets', [HelpdeskController::class, 'store'])->name('helpdesk-store');
    Route::get('helpdesk/tickets/{ticket}', [HelpdeskController::class, 'show'])->name('helpdesk-show')->can('view', 'ticket');
    Route::post('helpdesk/tickets/{ticket}/comment', [HelpdeskController::class, 'addComment'])->name('helpdesk-comment')->can('addComment', 'ticket');
});

Route::get('assets/{asset}/qrcode-detail', [AssetController::class, 'qrcodeDetail'])->name('assets-qrcode-detail');

require __DIR__.'/settings.php';
