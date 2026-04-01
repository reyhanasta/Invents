<?php

namespace App\Policies;

use App\Models\Location;
use App\Models\User;

class LocationPolicy
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

    public function view(User $user, Location $location): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return $user->hasRole('management');
    }

    public function update(User $user, Location $location): bool
    {
        return $user->hasRole('management');
    }

    public function delete(User $user, Location $location): bool
    {
        return $user->hasRole('management');
    }
}
