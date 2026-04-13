<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Asset extends Model
{
    /** @use HasFactory<\Database\Factories\AssetFactory> */
    use HasFactory, SoftDeletes;

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
        'is_used',
        'acquisition_date',
        'description',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_used' => 'boolean',
            'acquisition_date' => 'date',
        ];
    }

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
    public function maintenances()
    {
        return $this->hasMany(Maintenance::class, 'asset_id');
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'asset_id');
    }
}
