<?php

namespace App\Http\Controllers;

use App\Exports\AssetsExport;
use App\Models\Asset;
use App\Models\Category;
use App\Models\Company;
use App\Models\Location;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class AssetController extends Controller
{
    //

    public function index(Request $request)
    {
        $search = $request->input('search');

        $query = Asset::query()->with([
            'category:id,category_name',
            'location:id,location_name',
        ])->orderByDesc('created_at');

        // $query   = Asset::with(['category', 'location'])->latest()->paginate(10);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('asset_name', 'like', "{$search}%")
                    ->orWhere('asset_code', 'like', "{$search}%")
                    ->orWhereHas('category', function ($q) use ($search) {
                        $q->where('category_name', 'like', "{$search}%");
                    });
            });
        }
        $assets = $query->paginate(8)->withQueryString();

        return Inertia::render('Asset/AssetIndex', [
            'assets' => $assets,
            'search' => $search,
        ]);
    }

    public function create()
    {
        return Inertia::render('Asset/AssetCreate', [
            'categories' => Category::all(),
            'locations' => Location::all(),
        ]);
    }

    public function show(Asset $asset)
    {
        // Load semua relasi yang dibutuhkan untuk kedua tab
        // Tab 1 (Info Umum): category, location, maintenances
        // Tab 2 (QR Label): company name
        $asset->load([
            'category:id,category_name',
            'location:id,location_name',
            'maintenances' => function ($q) {
                $q->orderByDesc('maintenance_date')->limit(10);
            },
        ]);

        $company = Company::first()?->complete_company_name ?? 'N/A';

        return Inertia::render('Asset/AssetDetail', [
            'asset' => $asset,
            'categoryName' => $asset->category?->category_name,
            'locationName' => $asset->location?->location_name,
            'maintenance' => $asset->maintenances,
            'company' => $company,
        ]);
    }

    public function edit(Asset $asset)
    {
        return Inertia::render('Asset/AssetEdit', [
            'asset' => $asset,
            'categories' => Category::all(),
            'locations' => Location::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'asset_name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'brand' => 'nullable|string|max:255',
            'serial_number' => 'nullable|string|max:255',
            'location_id' => 'required|exists:locations,id',
            'condition' => 'required|in:good,minor_damage,major_damage',
            'acquisition_date' => 'nullable|date',
            'description' => 'nullable|string',
        ]);

        // Generate asset code based on category prefix
        $category = Category::findOrFail($validated['category_id']);
        $lastAsset = Asset::where('category_id', $validated['category_id'])
            ->orderBy('id', 'desc')
            ->first();

        $nextNumber = $lastAsset ? intval(substr($lastAsset->asset_code, strlen($category->prefix_code))) + 1 : 1;
        $validated['asset_code'] = $category->prefix_code.str_pad($nextNumber, 4, '0', STR_PAD_LEFT);

        Asset::create($validated);

        return to_route('assets')->with('success', 'Asset berhasil ditambahkan!');
    }

    public function update(Request $request, Asset $asset)
    {
        $validated = $request->validate([
            'asset_name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'brand' => 'nullable|string|max:255',
            'serial_number' => 'nullable|string|max:255',
            'location_id' => 'required|exists:locations,id',
            'condition' => 'required|in:good,minor_damage,major_damage',
            'acquisition_date' => 'nullable|date',
            'description' => 'nullable|string',
        ]);

        $asset->update($validated);

        return to_route('assets')->with('success', 'Aset berhasil diperbarui.');
    }

    public function destroy(Asset $asset)
    {
        $asset->delete();

        return to_route('assets')->with('success', 'Aset berhasil dihapus.');
    }

    public function qrcodeDetail(Asset $asset)
    {
        $asset->load([
            'category:id,category_name',
            'location:id,location_name',
            'maintenances' => function ($q) {
                $q->orderByDesc('maintenance_date')->limit(10);
            },
        ]);

        return Inertia::render('Asset/AssetQrcodeDetail', [
            'asset' => $asset,
            'categoryName' => $asset->category?->category_name,
            'locationName' => $asset->location?->location_name,
            'maintenance' => $asset->maintenances,
        ]);
    }

    public function printLabel(Asset $asset)
    {
        $asset->load([
            'category:id,category_name',
            'location:id,location_name',
        ]);

        $company = Company::first()?->complete_company_name ?? 'N/A';

        return Inertia::render('Asset/AssetPrintLabel', [
            'asset' => $asset,
            'categoryName' => $asset->category?->category_name,
            'locationName' => $asset->location?->location_name,
            'company' => $company,
        ]);
    }

    public function export(Request $request)
    {
        $format = $request->query('format');

        if ($format === 'excel') {
            return Excel::download(new AssetsExport, 'assets-export-'.date('Ymd').'.xlsx');
        }

        if ($format === 'pdf') {
            $assets = Asset::with(['category', 'location'])->get();
            $pdf = Pdf::loadView('exports.assets-pdf', compact('assets'))->setPaper('a4', 'landscape');

            return $pdf->download('assets-export-'.date('Ymd').'.pdf');
        }

        return response()->json(['message' => 'Format tidak valid.'], 400);
    }
}
