<?php

namespace App\Imports;

use App\Models\Asset;
use App\Models\Category;
use App\Models\Location;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class AssetsImport implements ToModel, WithHeadingRow, WithValidation
{
    /**
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        // Temukan atau buat kategori berdasarkan nama
        $category = Category::firstOrCreate(
            ['category_name' => $row['kategori']],
            [
                'prefix_code' => strtoupper(substr($row['kategori'], 0, 3)),
                'serial_number_needed' => false,
            ]
        );

        // Temukan atau buat lokasi berdasarkan nama
        $location = Location::firstOrCreate(
            ['location_name' => $row['lokasi']],
            [
                'location_code' => strtoupper(substr($row['lokasi'], 0, 3)),
                'description' => 'Dibuat secara otomatis dari import',
            ]
        );

        // Map kondisi format lokal ke format database
        $condition = match (strtolower(trim($row['kondisi']))) {
            'baik' => 'good',
            'rusak ringan' => 'minor_damage',
            'rusak berat' => 'major_damage',
            default => 'good',
        };

        // Map status
        $statusValue = strtolower(trim($row['status'] ?? ($row['status_pakai'] ?? '')));
        $status = match ($statusValue) {
            'sedang digunakan', 'in-use', 'in use' => 'in-use',
            'tersedia', 'available', 'tidak digunakan', 'idle' => 'available',
            'dalam perbaikan', 'maintenance', 'perbaikan' => 'maintenance',
            'afkir', 'retired', 'dihapus', 'non-aktif' => 'retired',
            default => 'available',
        };

        $assetCode = $row['kode_aset'] ?? ($category->prefix_code.'-'.strtoupper(Str::random(5)));

        return new Asset([
            'category_id' => $category->id,
            'location_id' => $location->id,
            'asset_code' => $assetCode,
            'asset_name' => $row['nama_aset'],
            'serial_number' => $row['serial_number'] ?? null,
            'condition' => $condition,
            'status' => $status,
        ]);
    }

    public function rules(): array
    {
        return [
            'nama_aset' => 'required',
            'kategori' => 'required',
            'lokasi' => 'required',
            'kondisi' => 'required',
        ];
    }
}
