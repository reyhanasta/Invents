<?php

namespace Database\Seeders;

use App\Models\TicketCategory;
use Illuminate\Database\Seeder;

class TicketCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Hardware',
                'description' => 'Masalah terkait perangkat keras seperti laptop, printer, monitor, dll.',
                'is_active' => true,
            ],
            [
                'name' => 'Software',
                'description' => 'Masalah terkait perangkat lunak, sistem operasi, dan aplikasi.',
                'is_active' => true,
            ],
            [
                'name' => 'Network',
                'description' => 'Masalah terkait koneksi internet, wifi, dan jaringan internal.',
                'is_active' => true,
            ],
            [
                'name' => 'Account & Access',
                'description' => 'Masalah terkait akun pengguna, password, dan hak akses sistem.',
                'is_active' => true,
            ],
            [
                'name' => 'Others',
                'description' => 'Masalah umum lainnya yang tidak termasuk dalam kategori di atas.',
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            TicketCategory::updateOrCreate(['name' => $category['name']], $category);
        }
    }
}
