<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $categories = [
            ['category_name' => 'Elektronik', 'prefix_code' => 'ELK', 'serial_number_needed' => true],
            ['category_name' => 'ATK', 'prefix_code' => 'ATK', 'serial_number_needed' => false],
            ['category_name' => 'Furniture', 'prefix_code' => 'FRN', 'serial_number_needed' => false],
            ['category_name' => 'Kendaraan', 'prefix_code' => 'KDR', 'serial_number_needed' => true],
            ['category_name' => 'Alat Medis', 'prefix_code' => 'MED', 'serial_number_needed' => true],
            ['category_name' => 'Alat Perkakas', 'prefix_code' => 'PRK', 'serial_number_needed' => false],
        ];

        foreach ($categories as $category) {
            \App\Models\Category::create($category);
        }
    }
}
