<?php

namespace App\Policies;

use App\Models\Company;
use App\Models\User;

class CompanyPolicy
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

    public function view(User $user, Company $company): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return $user->hasRole('management');
    }

    public function update(User $user, Company $company): bool
    {
        return $user->hasRole('management');
    }

    public function delete(User $user, Company $company): bool
    {
        return $user->hasRole('management');
    }
}
