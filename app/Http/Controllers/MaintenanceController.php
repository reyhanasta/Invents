<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Maintenance;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class MaintenanceController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $query = Maintenance::query()->with(['asset'])->latest();
        if($search){
            $query->where(function ($q) use ($search) {
                $q->where('technician', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhereHas('asset', function ($q) use ($search) {
                        $q->where('asset_name', 'like', "%{$search}%");
                    })
                    ;
            });
        }
        $maintenance = $query->paginate(8)->withQueryString();

        return Inertia::render('Maintenance/MaintenanceIndex',[
            'maintenance' => $maintenance,
            'search' => $search
        ]);
    }

    public function show(int $id): \Illuminate\Http\JsonResponse
    {
        $maint = Maintenance::with('asset')->findOrFail($id);
        return response()->json($maint);
    }

    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validate([
            'asset_id' => ['required', 'exists:assets,id'],
            'type' => ['required', Rule::in(['preventive', 'corrective', 'inspection'])],
            'maintenance_date' => ['required', 'date'],
            'maintenance_done_date' => ['nullable', 'date', 'after_or_equal:maintenance_date'],
            'status' => ['nullable', Rule::in(['pending', 'in_progress', 'completed', 'cancelled'])],
            'description' => ['required', 'string'],
            'note' => ['nullable', 'string'],
            'technician' => ['nullable', 'string'],
            'cost' => ['nullable', 'numeric'],
        ]);

        $maint = Maintenance::create(array_merge($data, [
            'status' => $data['status'] ?? 'pending',
        ]));

        return response()->json($maint, 201);
    }
}
