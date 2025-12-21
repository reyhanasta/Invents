<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    /** @use HasFactory<\Database\Factories\LocationFactory> */
    use HasFactory;

    protected $fillable = [
        'location_name',
        'location_code',
        'description',
    ];

    public function assets()
    {
        return $this->hasMany(Asset::class);
    }

}
