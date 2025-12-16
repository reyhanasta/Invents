<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Location>
 */
class LocationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $locations = [
            'Warehouse A', 'Warehouse B', 'Main Office', 'Branch Office',
            'Server Room', 'IT Department', 'HR Department', 'Finance Department',
            'Meeting Room 1', 'Meeting Room 2', 'Storage Room', 'Reception',
            'Workshop', 'Training Center', 'Archive Room',
        ];

        return [
            'location_name' => fake()->unique()->randomElement($locations).' - '.fake()->city(),
        ];
    }
}
