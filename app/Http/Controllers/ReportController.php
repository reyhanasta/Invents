<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\Category;
use App\Models\Location;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    /**
     * Display the reports page.
     */
    public function index(Request $request): Response
    {
        $search = $request->input('search');
        $category = $request->input('category');
        $location = $request->input('location');
        $condition = $request->input('condition');
        $status = $request->query('status');

        $assets = $this->buildFilteredQuery($request)->paginate(8)->withQueryString();

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
            'assets' => $assets,
            'search' => $search,
            'filters' => [
                'category' => $category,
                'location' => $location,
                'condition' => $condition,
                'status' => $status,
            ],
            'categories' => Category::all(),
            'locations' => Location::all(),
        ]);
    }

    /**
     * Export the filtered asset report as a PDF.
     */
    public function export(Request $request)
    {
        $assets = $this->buildFilteredQuery($request)->get();

        $categoryStats = $assets->groupBy('category_id')->map(function ($group) {
            return [
                'id' => $group->first()->category_id,
                'category_name' => $group->first()->category?->category_name ?? 'N/A',
                'assets_count' => $group->count(),
            ];
        })->values();

        $locationStats = $assets->groupBy('location_id')->map(function ($group) {
            return [
                'id' => $group->first()->location_id,
                'location_name' => $group->first()->location?->location_name ?? 'N/A',
                'assets_count' => $group->count(),
            ];
        })->values();

        $conditionStats = [
            'good' => $assets->where('condition', 'good')->count(),
            'minor_damage' => $assets->where('condition', 'minor_damage')->count(),
            'major_damage' => $assets->where('condition', 'major_damage')->count(),
        ];

        $usageStats = [
            'total' => $assets->count(),
            'in_use' => $assets->where('status', 'in-use')->count(),
            'available' => $assets->where('status', 'available')->count(),
        ];

        $pdf = Pdf::loadView('exports.report-pdf', compact('assets', 'categoryStats', 'locationStats', 'conditionStats', 'usageStats'))
            ->setPaper('a4', 'landscape');

        return $pdf->download('laporan-aset-'.date('Ymd').'.pdf');
    }

    /**
     * Build the filtered asset query shared by the index and export methods.
     */
    private function buildFilteredQuery(Request $request)
    {
        $search = $request->input('search');
        $category = $request->input('category');
        $location = $request->input('location');
        $condition = $request->input('condition');

        $query = Asset::query()->with([
            'category:id,category_name',
            'location:id,location_name',
        ])->orderByDesc('created_at');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('asset_name', 'like', "%{$search}%")
                    ->orWhere('asset_code', 'like', "%{$search}%")
                    ->orWhere('serial_number', 'like', "%{$search}%")
                    ->orWhereHas('category', function ($q) use ($search) {
                        $q->where('category_name', 'like', "%{$search}%");
                    });
            });
        }

        if ($category) {
            $query->where('category_id', $category);
        }

        if ($location) {
            $query->where('location_id', $location);
        }

        if ($condition) {
            $query->where('condition', $condition);
        }

        $status = $request->query('status');
        if ($status !== null && $status !== '') {
            $query->where('status', $status);
        }

        return $query;
    }
}
