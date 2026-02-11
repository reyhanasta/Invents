<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Priority extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'level',
        'response_target_minutes',
        'resolve_target_minutes',
    ];

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }
}
