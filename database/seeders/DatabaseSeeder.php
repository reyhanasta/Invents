<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            // CompanySeeder::class,
            CategorySeeder::class,
            // LocationSeeder::class,
            // AssetSeeder::class,
            // MaintenanceSeeder::class,
            // DepartmentSeeder::class,
            PrioritySeeder::class,
            TicketCategorySeeder::class,
        ]);

    }
}
