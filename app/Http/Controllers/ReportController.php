<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\Category;
use App\Models\Location;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    /**
     * Display the reports page.
     */
    public function index(): Response
    {
        return Inertia::render('Report/ReportIndex', [
            'categoryStats' => Category::withCount('assets')->get(),
            'locationStats' => Location::withCount('assets')->get(),
            'conditionStats' => [
                'good' => Asset::where('condition', 'good')->count(),
                'minor_damage' => Asset::where('condition', 'minor_damage')->count(),
                'major_damage' => Asset::where('condition', 'major_damage')->count(),
            ],
            'usageStats' => [
                'total' => Asset::count(),
                'in_use' => Asset::where('status', 'in-use')->count(),
                'available' => Asset::where('status', 'available')->count(),
            ],
        ]);
    }
}
