<?php

namespace Database\Factories;

use App\Models\Priority;
use Illuminate\Database\Eloquent\Factories\Factory;

class PriorityFactory extends Factory
{
    protected $model = Priority::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->word(),
            'level' => $this->faker->numberBetween(1, 4),
            'response_target_minutes' => $this->faker->numberBetween(30, 240),
            'resolve_target_minutes' => $this->faker->numberBetween(240, 1440),
        ];
    }
}
