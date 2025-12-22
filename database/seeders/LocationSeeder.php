<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $locations = [
            ['location_name' => 'Ruang Pemeriksaan', 'location_code' => 'PRK1' ],
            ['location_name' => 'Ruang Pemeriksaan 1', 'location_code' => 'PRK2' ],
            ['location_name' => 'Ruang Pemeriksaan 2', 'location_code' => 'PRK3'],
            ['location_name' => 'Laboratorium', 'location_code' => 'LAB'],
            ['location_name' => 'Apotek', 'location_code' => 'APT'],
            ['location_name' => 'Ruang Administrasi', 'location_code' => 'ADM'],
            ['location_name' => 'Ruang Direktur', 'location_code' => 'DIR'],
            ['location_name' => 'Gudang', 'location_code' => 'GDN'],
            // tambahkan 20-30 lokasi sesuai kebutuhan
        ];

        foreach ($locations as $location) {
            \App\Models\Location::create($location);
        }
    }
}
