<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
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
        $words = $this->faker->words(2);
        $prefix = strtoupper(substr($words[0], 0, 3));
        
        return [
            'category_name' => ucfirst(implode(' ', $words)),
            'prefix_code' => $prefix,
            'serial_number_needed' => $this->faker->boolean(),
        ];
    }
}
