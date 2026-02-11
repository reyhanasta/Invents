<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        Permission::firstOrCreate(['name' => 'manage everything']);
        Permission::firstOrCreate(['name' => 'manage tickets']);
        Permission::firstOrCreate(['name' => 'manage company']);
        Permission::firstOrCreate(['name' => 'access helpdesk']);

        // create roles and assign created permissions

        // this can be done as separate statements
        $role = Role::firstOrCreate(['name' => 'admin']);
        $role->givePermissionTo(Permission::all());

        $role = Role::firstOrCreate(['name' => 'client']);
        $role->givePermissionTo('access helpdesk');
        
        // Find existing users and assign roles if needed
        $user = User::find(1);
        if ($user) {
            $user->assignRole('admin');
        }
        
        // Create a test client user if not exists
        if (!User::where('email', 'client@example.com')->exists()) {
            $client = User::factory()->create([
                'name' => 'Test Client',
                'email' => 'client@example.com',
                'password' => bcrypt('password'),
            ]);
            $client->assignRole('client');
        }
    }
}
