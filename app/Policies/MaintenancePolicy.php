<?php

namespace App\Policies;

use App\Models\Maintenance;
use App\Models\User;

class MaintenancePolicy
{
    public function before(User $user, string $ability): ?bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        return null;
    }

    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Maintenance $maintenance): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return true; // Everyone can create maintenance records (admin, management, client)
    }

    public function update(User $user, Maintenance $maintenance): bool
    {
        return $user->hasRole('management');
    }

    public function delete(User $user, Maintenance $maintenance): bool
    {
        return $user->hasRole('management');
    }
}
