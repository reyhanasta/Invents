<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Location;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Asset>
 */
class AssetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static $counters = [];

        $category = Category::inRandomOrder()->first() ?? Category::factory()->create();

        // Initialize counter for this category if not exists
        if (! isset($counters[$category->id])) {
            $lastAsset = \App\Models\Asset::where('category_id', $category->id)
                ->orderBy('asset_code', 'desc')
                ->first();

            if ($lastAsset && $lastAsset->asset_code) {
                $lastNumber = intval(substr($lastAsset->asset_code, strlen($category->prefix_code)));
                $counters[$category->id] = $lastNumber;
            } else {
                $counters[$category->id] = 0;
            }
        }

        // Increment counter
        $counters[$category->id]++;
        $assetCode = $category->prefix_code.str_pad($counters[$category->id], 4, '0', STR_PAD_LEFT);

        $assetTypes = [
            'Laptop', 'Desktop Computer', 'Monitor', 'Keyboard', 'Mouse',
            'Printer', 'Scanner', 'Projector', 'Webcam', 'Headset',
            'Router', 'Switch', 'Server', 'UPS', 'Hard Drive',
            'SSD', 'RAM', 'CPU', 'GPU', 'Motherboard',
            'Tablet', 'Smartphone', 'Camera', 'Microphone', 'Speaker',
        ];

        $brands = [
            'Dell', 'HP', 'Lenovo', 'Asus', 'Acer',
            'Apple', 'Samsung', 'LG', 'Sony', 'Canon',
            'Epson', 'Logitech', 'Microsoft', 'Intel', 'AMD',
            'Cisco', 'TP-Link', 'Netgear', 'Kingston', 'Corsair',
        ];

        $conditions = ['good', 'minor_damage', 'major_damage'];

        // 70% good, 25% minor damage, 5% major damage
        $condition = fake()->randomElement([
            ...array_fill(0, 70, 'good'),
            ...array_fill(0, 25, 'minor_damage'),
            ...array_fill(0, 5, 'major_damage'),
        ]);

        return [
            'asset_name' => fake()->randomElement($brands).' '.fake()->randomElement($assetTypes).' '.fake()->numberBetween(1000, 9999),
            'asset_code' => $assetCode,
            'category_id' => $category->id,
            'location_id' => Location::inRandomOrder()->first()?->id ?? Location::factory()->create()->id,
            'brand' => fake()->randomElement($brands),
            'serial_number' => strtoupper(fake()->bothify('SN-###???###')),
            'condition' => $condition,
            'acquisition_date' => fake()->dateTimeBetween('-5 years', 'now')->format('Y-m-d'),
            'description' => fake()->optional(0.7)->sentence(),
        ];
    }

    /**
     * Indicate that the asset is in good condition.
     */
    public function good(): static
    {
        return $this->state(fn (array $attributes) => [
            'condition' => 'good',
        ]);
    }

    /**
     * Indicate that the asset has minor damage.
     */
    public function minorDamage(): static
    {
        return $this->state(fn (array $attributes) => [
            'condition' => 'minor_damage',
        ]);
    }

    /**
     * Indicate that the asset has major damage.
     */
    public function majorDamage(): static
    {
        return $this->state(fn (array $attributes) => [
            'condition' => 'major_damage',
        ]);
    }

    /**
     * Indicate that the asset was acquired recently (within last 6 months).
     */
    public function recent(): static
    {
        return $this->state(fn (array $attributes) => [
            'acquisition_date' => fake()->dateTimeBetween('-6 months', 'now')->format('Y-m-d'),
        ]);
    }
}
