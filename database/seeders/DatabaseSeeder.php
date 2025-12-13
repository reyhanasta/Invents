<?php

namespace Database\Seeders;

use App\Models\Category;
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

        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        Category::firstOrCreate(
            ['serial_number' => 'CAT-001'],
            ['name' => 'Electronics']
        );
        Category::firstOrCreate(
            ['serial_number' => 'CAT-002'],
            ['name' => 'Furniture']
        );
        Category::firstOrCreate(
            ['serial_number' => 'CAT-003'],
            ['name' => 'Clothing']
        );
    }
}
