<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\Maintenance;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class MaintenanceController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $type = $request->input('type');
        $status = $request->input('status');

        $query = Maintenance::query()->with(['asset'])->latest();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('technician', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhereHas('asset', function ($q) use ($search) {
                        $q->where('asset_name', 'like', "%{$search}%");
                    });
            });
        }

        if ($type) {
            $query->where('type', $type);
        }

        if ($status) {
            $query->where('status', $status);
        }

        $maintenance = $query->paginate(8)->withQueryString();

        return Inertia::render('Maintenance/MaintenanceIndex', [
            'maintenance' => $maintenance,
            'search' => $search,
            'type' => $type,
            'status' => $status,
        ]);
    }

    
    // public function index(Request $request)
    // {
    //     // Validate inputs (opsional tapi recommended)
    //     $validated = $request->validate([
    //         'search' => 'nullable|string|max:255',
    //         'type' => 'nullable|in:routine,repair,inspection,calibration',
    //         'status' => 'nullable|in:pending,in_progress,completed,cancelled',
    //     ]);

    //     $query = Maintenance::with('asset')->latest();

    //     // Search
    //     if ($search = $request->input('search')) {
    //         $query->where(function ($q) use ($search) {
    //             $q->where('technician', 'like', "%{$search}%")
    //             ->orWhere('description', 'like', "%{$search}%")
    //             ->orWhereHas('asset', fn($q) => 
    //                 $q->where('asset_name', 'like', "%{$search}%")
    //             );
    //         });
    //     }

    //     // Filters
    //     $query->when($request->input('type'), fn($q, $type) => 
    //         $q->where('type', $type)
    //     );
        
    //     $query->when($request->input('status'), fn($q, $status) => 
    //         $q->where('status', $status)
    //     );

    //     return Inertia::render('Maintenance/MaintenanceIndex', [
    //         'maintenance' => $query->paginate(8)->withQueryString(),
    //         'filters' => $request->only(['search', 'type', 'status']),
    //     ]);
    // }
    
    public function create()
    {
        return Inertia::render('Maintenance/MaintenanceCreate', [
            'assets' => Asset::select('id', 'asset_name', 'asset_code')
                ->orderBy('asset_name')
                ->get(),
        ]);
    }

    public function edit(Maintenance $maintenance)
    {
        return Inertia::render('Maintenance/MaintenanceEdit', [
            'maintenance' => $maintenance->load('asset'),
            'assets' => Asset::select('id', 'asset_name', 'asset_code')
                ->orderBy('asset_name')
                ->get(),
        ]);
    }

    public function show(int $id): \Illuminate\Http\JsonResponse
    {
        $maint = Maintenance::with('asset')->findOrFail($id);

        return response()->json($maint);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'asset_id' => ['required', 'exists:assets,id'],
            'type' => [
                'required',
                Rule::in(['routine', 'repair', 'inspection', 'calibration']),
            ],
            'maintenance_date' => ['required', 'date'],
            'maintenance_done_date' => [
                'nullable',
                'date',
                'after_or_equal:maintenance_date',
            ],
            'status' => [
                'nullable',
                Rule::in([
                    'pending',
                    'in_progress',
                    'completed',
                    'cancelled',
                ]),
            ],
            'description' => ['required', 'string'],
            'note' => ['nullable', 'string'],
            'technician' => ['nullable', 'string'],
            'cost' => ['nullable', 'numeric', 'min:0'],
        ]);

        $maint = Maintenance::create([
            'asset_id' => $data['asset_id'],
            'type' => $data['type'],
            'maintenance_date' => $data['maintenance_date'],
            'maintenance_done_date' => $data['maintenance_done_date'] ?? null,
            'status' => $data['status'] ?? 'pending',
            'description' => $data['description'],
            'note' => $data['note'] ?? null,
            'technician' => $data['technician'] ?? null,
            'cost' => $data['cost'] ?? null,
        ]);

        return to_route('maintenances')->with(
            'success',
            'Maintenance created successfully!',
        );
    }

    public function update(Request $request, Maintenance $maintenance)
    {
        $data = $request->validate([
            'asset_id' => ['required', 'exists:assets,id'],
            'type' => [
                'required',
                Rule::in(['routine', 'repair', 'inspection', 'calibration']),
            ],
            'maintenance_date' => ['required', 'date'],
            'maintenance_done_date' => [
                'nullable',
                'date',
                'after_or_equal:maintenance_date',
            ],
            'status' => [
                'nullable',
                Rule::in([
                    'pending',
                    'in_progress',
                    'completed',
                    'cancelled',
                ]),
            ],
            'description' => ['required', 'string'],
            'note' => ['nullable', 'string'],
            'technician' => ['nullable', 'string'],
            'cost' => ['nullable', 'numeric', 'min:0'],
        ]);

        $maintenance->update([
            'asset_id' => $data['asset_id'],
            'type' => $data['type'],
            'maintenance_date' => $data['maintenance_date'],
            'maintenance_done_date' => $data['maintenance_done_date'] ?? null,
            'status' => $data['status'] ?? 'pending',
            'description' => $data['description'],
            'note' => $data['note'] ?? null,
            'technician' => $data['technician'] ?? null,
            'cost' => $data['cost'] ?? null,
        ]);

        return to_route('maintenances')->with(
            'success',
            'Maintenance updated successfully!',
        );
    }

    public function destroy(Maintenance $maintenance)
    {
        $maintenance->delete();

        return to_route('maintenances')->with(
            'success',
            'Maintenance deleted successfully!',
        );
    }
}
