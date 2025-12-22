<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    /** @use HasFactory<\Database\Factories\AssetFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'asset_name',
        'asset_code',
        'category_id',
        'location_id',
        'brand',
        'serial_number',
        'condition',
        'acquisition_date',
        'description',
    ];

    /**
     * Get the category that owns the asset.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the location that owns the asset.
     */
    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    /**
     * Get the maintanances that own the asset.
     */
    public function maintanances()
    {
        return $this->hasMany(Maintanance::class, 'asset_id');
    }
}
