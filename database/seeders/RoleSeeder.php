<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

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

        $role = Role::firstOrCreate(['name' => 'management']);
        // Management has same permissions as admin except for user management
        // For now we'll just give it everything and restrict in policies
        $role->givePermissionTo(Permission::all());

        $role = Role::firstOrCreate(['name' => 'client']);
        $role->givePermissionTo('access helpdesk');

        // Roles and permissions are now created.
        // User role assignments are handled in UserSeeder.
    }
}
