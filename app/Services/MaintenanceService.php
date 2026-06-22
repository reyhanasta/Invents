<?php

namespace App\Services;

use App\Models\Asset;
use App\Models\Maintenance;
use App\Models\Ticket;
use Illuminate\Support\Facades\DB;

class MaintenanceService
{
    /**
     * Create a new maintenance record.
     */
    public function create(array $data): Maintenance
    {
        return DB::transaction(function () use ($data) {
            $maintenance = Maintenance::create([
                'asset_id' => $data['asset_id'],
                'ticket_id' => $data['ticket_id'] ?? null,
                'type' => $data['type'],
                'maintenance_date' => $data['maintenance_date'],
                'maintenance_done_date' => $data['maintenance_done_date'] ?? null,
                'status' => $data['status'] ?? 'pending',
                'description' => $data['description'],
                'note' => $data['note'] ?? null,
                'technician' => $data['technician'] ?? null,
                'cost' => $data['cost'] ?? null,
            ]);

            if (isset($data['condition'])) {
                Asset::where('id', $data['asset_id'])->update([
                    'condition' => $data['condition'],
                ]);
            }

            return $maintenance;
        });
    }

    /**
     * Create maintenance specifically from a ticket.
     */
    public function createFromTicket(Ticket $ticket, array $data): Maintenance
    {
        $data['ticket_id'] = $ticket->id;
        $data['asset_id'] = $data['asset_id'] ?? $ticket->asset_id;

        return $this->create($data);
    }
}
