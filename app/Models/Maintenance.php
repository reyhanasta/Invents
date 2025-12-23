<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Maintenance extends Model
{
    /** @use HasFactory<\Database\Factories\MaintananceFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    public function asset(): BelongsTo{
        return $this->belongsTo(Asset::class);
    }
}
