<?php

namespace App\Policies;

use App\Models\Ticket;
use App\Models\User;

class TicketPolicy
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

    public function view(User $user, Ticket $ticket): bool
    {
        if ($user->hasRole('management')) {
            return true;
        }

        return $user->id === $ticket->reporter_id;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Ticket $ticket): bool
    {
        if ($user->hasRole('management')) {
            return true;
        }

        return $user->id === $ticket->reporter_id;
    }

    public function delete(User $user, Ticket $ticket): bool
    {
        return $user->hasRole('management');
    }

    public function assign(User $user, Ticket $ticket): bool
    {
        return $user->hasRole('management');
    }

    public function changeStatus(User $user, Ticket $ticket): bool
    {
        return $user->hasRole('management');
    }

    public function addComment(User $user, Ticket $ticket): bool
    {
        if ($user->hasRole('management')) {
            return true;
        }

        return $user->id === $ticket->reporter_id;
    }
}
