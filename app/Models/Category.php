<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;

    protected $fillable = [
        'category_name',
        'prefix_code',
        'serial_number_needed',
    ];

    public function assets()
    {
        return $this->hasMany(Asset::class, 'category_id');
    }
}
