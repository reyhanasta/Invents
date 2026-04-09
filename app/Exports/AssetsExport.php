<?php

namespace App\Exports;

use App\Models\Asset;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class AssetsExport implements FromQuery, ShouldAutoSize, WithHeadings, WithMapping
{
    private $rowNumber = 0;

    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query()
    {
        return Asset::query()->with(['category', 'location']);
    }

    /**
     * @var Asset
     */
    public function map($asset): array
    {
        $this->rowNumber++;

        return [
            $this->rowNumber,
            $asset->asset_code,
            $asset->asset_name,
            $asset->category?->category_name ?? 'N/A',
            $asset->location?->location_name ?? 'N/A',
            match ($asset->condition) {
                'good' => 'Baik',
                'minor_damage' => 'Rusak Ringan',
                'major_damage' => 'Rusak Berat',
                default => $asset->condition,
            },
            $asset->is_used ? 'Sedang Digunakan' : 'Tidak Digunakan',
        ];
    }

    public function headings(): array
    {
        return [
            'No',
            'Kode Aset',
            'Nama Aset',
            'Kategori',
            'Lokasi',
            'Kondisi',
            'Status Pakai',
        ];
    }
}
