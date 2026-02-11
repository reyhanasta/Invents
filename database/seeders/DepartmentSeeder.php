<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [
            ['name' => 'IT Support'],
            ['name' => 'Finance'],
            ['name' => 'Human Resources'],
            ['name' => 'Operations'],
            ['name' => 'Marketing'],
            ['name' => 'Procurement'],
        ];

        foreach ($departments as $dept) {
            Department::updateOrCreate(['name' => $dept['name']], $dept);
        }
    }
}
