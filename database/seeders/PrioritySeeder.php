<?php

namespace Database\Seeders;

use App\Models\Priority;
use Illuminate\Database\Seeder;

class PrioritySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $priorities = [
            [
                'name' => 'Rendah',
                'level' => 1,
                'response_target_minutes' => 480, // 8 jam
                'resolve_target_minutes' => 1440, // 24 jam
            ],
            [
                'name' => 'Urgent',
                'level' => 2,
                'response_target_minutes' => 30,  // 30 menit
                'resolve_target_minutes' => 120, // 2 jam
            ],
        ];

        foreach ($priorities as $priority) {
            Priority::updateOrCreate(['level' => $priority['level']], $priority);
        }
    }
}
