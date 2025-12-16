<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\Category;
use App\Models\Location;
use Illuminate\Container\Attributes\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class AssetController extends Controller
{
    //

    public function index()
    {
        $assets = QueryBuilder::for(Asset::class)
            ->allowedFilters(['asset_name', 'asset_code', 'category_id', 'location_id'])
            ->with(['category', 'location'])
            ->paginate(15);

        return Inertia::render('Assets/AssetsIndex', [
            'assets' => $assets,
            'categories' => Category::all(),
            'locations' => Location::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Assets/AssetsCreate', [
            'categories' => Category::all(),
            'locations' => Location::all(),
        ]);
    }

    public function show($id)
    {
        $asset = Asset::findOrFail($id);
        return Inertia::render('Asset/AssetShow', [
            'asset' => $asset,
        ]);
    }

    public function edit($id)
    {
        $asset = Asset::findOrFail($id);
        return Inertia::render('Asset/AssetEdit', [
            'asset' => $asset,
        ]);
    }

    public function store(Request $request)
    {
        try {
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
            $asset = Asset::create($validated);
            return to_route('assets', $asset)
            ->with('success', 'Asset berhasil ditambahkan!');
            } catch (\Exception $e) {
                return redirect()->back()
                    ->withErrors(['error' => 'Failed to create asset: ' . $e->getMessage()])
                    ->withInput();
            }
    }

    public function update(Request $request, $id)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'asset_name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'location_id' => 'required|exists:locations,id',
            'serial_number' => 'nullable|string|max:255',
            'purchase_date' => 'nullable|date',
            'status' => 'required|string|in:available,checked_out,under_maintenance,retired',
        ]);

        // Find the asset and update it
        try {
            $asset = Asset::findOrFail($id);
            $asset->update($validatedData);

            // Redirect to the assets index page with a success message
            return to_route('assets')->with('success', 'Asset updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to update asset: ' . $e->getMessage()])->withInput();
        }
    }

    public function delete($id)
    {
        // Find the asset and delete it
        try {
            $asset = Asset::findOrFail($id);
            $asset->delete();

            // Redirect to the assets index page with a success message
            return to_route('assets')->with('success', 'Asset deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to delete asset: ' . $e->getMessage()]);
        }
    }
}
