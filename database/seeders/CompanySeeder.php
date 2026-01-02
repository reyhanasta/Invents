<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Company::firstOrCreate(
            [
                'complete_company_name' => 'PT. Invents',
                'short_company_name' => 'Invents',
                'address' => 'Jl. Invents No.1',
            ]
        );
    }
}
