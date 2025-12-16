<?php

namespace Database\Seeders;

use App\Models\Asset;
use App\Models\Category;
use App\Models\Location;
use Illuminate\Database\Seeder;

class AssetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure we have categories and locations
        if (Category::count() === 0) {
            $this->command->info('No categories found. Creating sample categories...');
            Category::factory()->count(5)->create();
        }

        if (Location::count() === 0) {
            $this->command->info('No locations found. Creating sample locations...');
            Location::factory()->count(10)->create();
        }

        // Generate assets with different conditions
        $this->command->info('Creating assets...');

        // 100 assets in good condition
        Asset::factory()->count(100)->good()->create();

        // 30 assets with minor damage
        Asset::factory()->count(30)->minorDamage()->create();

        // 10 assets with major damage
        Asset::factory()->count(10)->majorDamage()->create();

        // 20 recently acquired assets
        Asset::factory()->count(20)->recent()->create();

        $this->command->info('Successfully created '.Asset::count().' assets!');
    }
}
