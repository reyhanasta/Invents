<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );
        $admin->assignRole('admin');

        $client = User::firstOrCreate(
            ['email' => 'client@example.com'],
            [
                'name' => 'Client User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );
        $client->assignRole('client');
    }
}
