<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Maintanance;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class MaintenanceController extends Controller
{
    public function index()
    {
        $maintenance = Maintanance::all();
        return Inertia::render('Maintenance/MaintenanceIndex',[
            'maintenance' => $maintenance
        ]);
    }

    public function show(int $id): \Illuminate\Http\JsonResponse
    {
        $maint = Maintanance::with('asset')->findOrFail($id);
        return response()->json($maint);
    }

    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validate([
            'asset_id' => ['required', 'exists:assets,id'],
            'type' => ['required', Rule::in(['preventive', 'corrective', 'inspection'])],
            'maintanance_date' => ['required', 'date'],
            'maintanance_done_date' => ['nullable', 'date', 'after_or_equal:maintanance_date'],
            'status' => ['nullable', Rule::in(['pending', 'in_progress', 'completed', 'cancelled'])],
            'description' => ['required', 'string'],
            'note' => ['nullable', 'string'],
            'technician' => ['nullable', 'string'],
            'cost' => ['nullable', 'numeric'],
        ]);

        $maint = Maintanance::create(array_merge($data, [
            'status' => $data['status'] ?? 'pending',
        ]));

        return response()->json($maint, 201);
    }
}
