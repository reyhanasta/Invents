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
        $admin = User::updateOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );
        $admin->syncRoles(['admin']);

        $client = User::updateOrCreate(
            ['email' => 'client@example.com'],
            [
                'name' => 'Client User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );
        $client->syncRoles(['client']);

        $management = User::updateOrCreate(
            ['email' => 'management@example.com'],
            [
                'name' => 'Management User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );
        $management->syncRoles(['management']);
    }
}
