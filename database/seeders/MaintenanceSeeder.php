<?php

namespace Database\Seeders;

use App\Models\Asset;
use App\Models\Maintanance;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MaintenanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure there are some assets to attach maintanances to
        if (Asset::count() === 0) {
            Asset::factory()->count(10)->create();
        }

        // Create maintanances
        Maintanance::factory()->count(30)->create();
    }
}
