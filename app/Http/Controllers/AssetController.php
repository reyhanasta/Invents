<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\Category;
use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssetController extends Controller
{
    //

    public function index(Request $request)
    {
        $search = $request->input('search');

        $query = Asset::query()->with(['category', 'location'])->latest();
        
        // $query   = Asset::with(['category', 'location'])->latest()->paginate(10);
      

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('asset_name', 'like', "%{$search}%")
                    ->orWhere('asset_code', 'like', "%{$search}%")
                    ->orWhereHas('category', function ($q) use ($search) {
                        $q->where('category_name', 'like', "%{$search}%");
                    })
                    ->orWhereHas('location', function ($q) use ($search) {
                        $q->where('location_name', 'like', "%{$search}%");
                    });
            });
        }
        $assets = $query->paginate(8)->withQueryString();
        return Inertia::render('Asset/AssetIndex', [
            'assets' => $assets,
            'categories' => Category::all(),
            'locations' => Location::all(),
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

    public function show($id)
    {
        $assetList = Asset::findOrFail($id);
        // $categoryName = Category::find($assetList->category_id, 'category_name')->get('category_name');
        $categoryName = Category::where('id', $assetList->category_id)->value('category_name');
        $locationName = Location::where('id', $assetList->location_id)->value('location_name');
      
        return Inertia::render('Asset/AssetDetail', [
            'asset' => $assetList,
            'categoryName' => $categoryName,
            'locationName' => $locationName,
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

    public function qrcodeDetail($id)
    {
        $asset = Asset::findOrFail($id);
        $categoryName = Category::where('id', $asset->category_id)->value('category_name');
        $locationName = Location::where('id', $asset->location_id)->value('location_name');
        return Inertia::render('Asset/AssetQrcodeDetail', [
            'asset' => $asset,
            'categoryName' => $categoryName,
            'locationName' => $locationName,
        ]);
    }

    public function printLabel($id)
    {
        $asset = Asset::findOrFail($id);
        $categoryName = Category::where('id', $asset->category_id)->value('category_name');
        $locationName = Location::where('id', $asset->location_id)->value('location_name');
        
        return Inertia::render('Asset/AssetPrintLabel', [
            'asset' => $asset,
            'categoryName' => $categoryName,
            'locationName' => $locationName,
        ]);
    }
}
