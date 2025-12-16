<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $locations = [
            'Ruang Tunggu',
            'Ruang Pemeriksaan 1',
            'Ruang Pemeriksaan 2',
            'Laboratorium',
            'Apotek',
            'Ruang Administrasi',
            'Ruang Direktur',
            'Gudang',
            // tambahkan 20-30 lokasi sesuai kebutuhan
        ];

        foreach ($locations as $location) {
            \App\Models\Location::create(['location_name' => $location]);
        }
    }
}
