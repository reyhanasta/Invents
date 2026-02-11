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
                'name' => 'Low',
                'level' => 1,
                'response_target_minutes' => 480, // 8 hours
                'resolve_target_minutes' => 1440, // 24 hours
            ],
            [
                'name' => 'Medium',
                'level' => 2,
                'response_target_minutes' => 240, // 4 hours
                'resolve_target_minutes' => 480,  // 8 hours
            ],
            [
                'name' => 'High',
                'level' => 3,
                'response_target_minutes' => 60,  // 1 hour
                'resolve_target_minutes' => 240,  // 4 hours
            ],
            [
                'name' => 'Urgent',
                'level' => 4,
                'response_target_minutes' => 30,  // 30 mins
                'resolve_target_minutes' => 120, // 2 hours
            ],
        ];

        foreach ($priorities as $priority) {
            Priority::updateOrCreate(['name' => $priority['name']], $priority);
        }
    }
}
