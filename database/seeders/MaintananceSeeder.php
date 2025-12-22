<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Maintanance;
use App\Models\Asset;

class MaintananceSeeder extends Seeder
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
