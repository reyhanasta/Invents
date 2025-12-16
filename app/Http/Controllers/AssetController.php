<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\Category;
use App\Models\Location;
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

        return Inertia::render('Asset/AssetIndex', [
            'assets' => $assets,
            'categories' => Category::all(),
            'locations' => Location::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Asset/AssetCreate', [
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

    public function update(Request $request, $id)
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

        $asset = Asset::findOrFail($id);
        $asset->update($validated);

        return to_route('assets')->with('success', 'Asset updated successfully.');
    }

    public function destroy($id)
    {
        $asset = Asset::findOrFail($id);
        $asset->delete();

        return to_route('assets')->with('success', 'Asset deleted successfully.');
    }
}
