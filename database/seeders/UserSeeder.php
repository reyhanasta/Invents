<?php

namespace Database\Seeders;

use App\Models\User;
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
            ['email' => 'widya@gmail.com'],
            [
                'name' => 'Widya',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );
        $client->syncRoles(['management']);

        $management = User::updateOrCreate(
            ['email' => 'reyhan@gmail.com'],
            [
                'name' => 'Reyhan Asta',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );
        $management->syncRoles(['admin']);
    }
}
