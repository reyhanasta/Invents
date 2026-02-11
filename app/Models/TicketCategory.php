<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TicketCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'is_active',
    ];

    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'category_id');
    }
}
