<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\Maintenance;
use App\Models\Ticket;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index(): Response
    {
        return Inertia::render('dashboard', [
            'stats' => [
                'total_assets' => Asset::count(''),
                'in_use' => Asset::where('status', 'in-use')->count(),
                'available' => Asset::where('status', 'available')->count(),
                'condition_stats' => [
                    'good' => Asset::where('condition', 'good')->count(),
                    'minor_damage' => Asset::where('condition', 'minor_damage')->count(),
                    'major_damage' => Asset::where('condition', 'major_damage')->count(),
                ],
                'recent_maintenances' => Maintenance::with('asset')
                    ->latest()
                    ->limit(5)
                    ->get(),
                'pending_tickets' => Ticket::where('status', 'open')->count(),
            ],
        ]);
    }
}
