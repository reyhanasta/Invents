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
                'name' => 'Jaringan',
                'description' => 'Masalah koneksi internet, Wi-Fi, kabel LAN, dan perangkat jaringan lainnya.',
                'is_active' => true,
            ],
            [
                'name' => 'SIMRS',
                'description' => 'Masalah terkait penggunaan dan kendala pada Sistem Informasi Manajemen Rumah Sakit.',
                'is_active' => true,
            ],
            [
                'name' => 'Software',
                'description' => 'Masalah pada sistem operasi, aplikasi perkantoran, dan perangkat lunak lainnya.',
                'is_active' => true,
            ],
            [
                'name' => 'Hardware',
                'description' => 'Kerusakan atau kendala pada perangkat fisik seperti komputer, printer, monitor, dll.',
                'is_active' => true,
            ],
            [
                'name' => 'Access dan Account',
                'description' => 'Lupa password, permintaan hak akses, atau masalah login akun.',
                'is_active' => true,
            ],
            [
                'name' => 'Lain-lain',
                'description' => 'Kendala umum lainnya yang tidak termasuk dalam kategori di atas.',
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            TicketCategory::updateOrCreate(['name' => $category['name']], $category);
        }
    }
}
