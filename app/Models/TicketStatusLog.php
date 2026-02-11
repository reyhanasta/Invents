<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TicketStatusLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'ticket_id',
        'from_status',
        'to_status',
        'changed_by',
        'note',
    ];

    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }

    public function changer()
    {
        return $this->belongsTo(User::class, 'changed_by');
    }
}
