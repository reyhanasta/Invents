<?php

use App\Models\Asset;
use App\Models\Category;
use App\Models\Location;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('can download batch labels', function () {
    // Create authenticated user
    $user = User::factory()->create();
    $this->actingAs($user);

    // Create test data
    $category = Category::factory()->create();
    $location = Location::factory()->create();

    $assets = Asset::factory()->count(3)->create([
        'category_id' => $category->id,
        'location_id' => $location->id,
    ]);

    $assetIds = $assets->pluck('id')->toArray();

    // Make request to batch download endpoint
    $response = $this->post('/assets/batch-download-labels', [
        'asset_ids' => json_encode($assetIds),
        'label_size' => '60x40',
    ]);

    // Assert response
    $response->assertStatus(200);
    $response->assertHeader('Content-Type', 'application/pdf');
});

it('validates required fields', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->post('/assets/batch-download-labels', []);

    $response->assertStatus(302); // Redirect due to validation error
    $response->assertSessionHasErrors(['asset_ids', 'label_size']);
});

it('validates asset ids exist', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->post('/assets/batch-download-labels', [
        'asset_ids' => json_encode([999]),
        'label_size' => '60x40',
    ]);

    $response->assertStatus(400);
    $response->assertJson(['error' => 'Invalid asset ID: 999']);
});

it('validates label size', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    // Create a valid asset first
    $category = Category::factory()->create();
    $location = Location::factory()->create();
    $asset = Asset::factory()->create([
        'category_id' => $category->id,
        'location_id' => $location->id,
    ]);

    $response = $this->post('/assets/batch-download-labels', [
        'asset_ids' => json_encode([$asset->id]),
        'label_size' => 'invalid_size',
    ]);

    $response->assertStatus(302);
    $response->assertSessionHasErrors('label_size');
});
