<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $prefix = strtoupper($this->faker->lexify('???'));
        $words = $this->faker->words(2);

        return [
            'category_name' => ucfirst(implode(' ', $words)),
            'prefix_code' => $prefix,
            'serial_number_needed' => $this->faker->boolean(),
        ];
    }
}
