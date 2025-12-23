<?php

namespace Database\Factories;

use App\Models\Asset;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Maintenance>
 */
class MaintenanceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement(['routine', 'repair', 'calibration','inspection']);

        $maintDate = fake()->dateTimeBetween('-1 years', 'now')->format('Y-m-d');

        return [
            'asset_id' => Asset::inRandomOrder()->first()?->id ?? Asset::factory()->create()->id,
            'type' => $type,
            'maintanance_date' => $maintDate,
            'maintanance_done_date' => fake()->dateTimeBetween('-5 years', 'now')->format('Y-m-d'),
            'status' => fake()->randomElement(['pending', 'in_progress', 'completed', 'cancelled']),
            'description' => fake()->sentence(8),
            'note' => fake()->optional()->paragraph(),
            'technician' => fake()->optional(0.8)->name(),
            'cost' => fake()->optional(0.6)->randomFloat(2, 0, 5000),
        ];
    }
}
