<?php

use App\Models\Asset;
use App\Models\Category;
use App\Models\Location;
use App\Models\User;
use Database\Seeders\RoleSeeder;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->user = User::factory()->create()->assignRole('admin');
    actingAs($this->user);
});

describe('Asset Filtering', function () {
    it('can filter assets by category', function () {
        $category1 = Category::factory()->create(['category_name' => 'Laptops']);
        $category2 = Category::factory()->create(['category_name' => 'Furniture']);

        Asset::factory()->create(['category_id' => $category1->id, 'asset_name' => 'MacBook']);
        Asset::factory()->create(['category_id' => $category2->id, 'asset_name' => 'Office Chair']);

        $response = get(route('assets', ['category' => $category1->id]));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('Asset/AssetIndex')
            ->has('assets.data', 1)
            ->where('assets.data.0.asset_name', 'MacBook')
        );
    });

    it('can filter assets by location', function () {
        $location1 = Location::factory()->create(['location_name' => 'Head Office']);
        $location2 = Location::factory()->create(['location_name' => 'Branch Office']);

        Asset::factory()->create(['location_id' => $location1->id, 'asset_name' => 'Server A']);
        Asset::factory()->create(['location_id' => $location2->id, 'asset_name' => 'Server B']);

        $response = get(route('assets', ['location' => $location1->id]));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('Asset/AssetIndex')
            ->has('assets.data', 1)
            ->where('assets.data.0.asset_name', 'Server A')
        );
    });

    it('can filter assets by condition', function () {
        Asset::factory()->create(['condition' => 'good', 'asset_name' => 'Good Asset']);
        Asset::factory()->create(['condition' => 'minor_damage', 'asset_name' => 'Damaged Asset']);

        $response = get(route('assets', ['condition' => 'good']));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('Asset/AssetIndex')
            ->has('assets.data', 1)
            ->where('assets.data.0.asset_name', 'Good Asset')
        );
    });

    it('can combine multiple filters', function () {
        $category = Category::factory()->create();
        $location = Location::factory()->create();
        $otherLocation = Location::factory()->create();

        Asset::factory()->create([
            'category_id' => $category->id,
            'location_id' => $location->id,
            'condition' => 'good',
            'asset_name' => 'Target Asset',
        ]);

        Asset::factory()->create([
            'category_id' => $category->id,
            'location_id' => $location->id,
            'condition' => 'minor_damage',
            'asset_name' => 'Wrong Condition',
        ]);

        Asset::factory()->create([
            'category_id' => $category->id,
            'location_id' => $otherLocation->id,
            'condition' => 'good',
            'asset_name' => 'Wrong Location',
        ]);

        $response = get(route('assets', [
            'category' => $category->id,
            'location' => $location->id,
            'condition' => 'good',
        ]));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('Asset/AssetIndex')
            ->has('assets.data', 1)
            ->where('assets.data.0.asset_name', 'Target Asset')
        );
    });

    it('can filter assets by basis status pakai (is_used)', function () {
        Asset::factory()->create(['is_used' => true, 'asset_name' => 'Used Asset']);
        Asset::factory()->create(['is_used' => false, 'asset_name' => 'Idle Asset']);

        // Filter for used
        $response = get(route('assets', ['is_used' => '1']));
        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('Asset/AssetIndex')
            ->has('assets.data', 1)
            ->where('assets.data.0.asset_name', 'Used Asset')
        );

        // Filter for idle
        $response = get(route('assets', ['is_used' => '0']));
        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('Asset/AssetIndex')
            ->has('assets.data', 1)
            ->where('assets.data.0.asset_name', 'Idle Asset')
        );
    });
});
