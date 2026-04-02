<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Location;
use App\Models\User;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed(RoleSeeder::class);

    // Setup some basic data
    $this->category = Category::factory()->create();
    $this->location = Location::factory()->create();
});

test('admin can access user management', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $response = $this->actingAs($admin)->get('/users');

    $response->assertStatus(200);
});

test('management cannot access user management', function () {
    $management = User::factory()->create();
    $management->assignRole('management');

    $response = $this->actingAs($management)->get('/users');

    $response->assertStatus(403);
});

test('client cannot access user management', function () {
    $client = User::factory()->create();
    $client->assignRole('client');

    $response = $this->actingAs($client)->get('/users');

    $response->assertStatus(403);
});

test('admin can create assets', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $response = $this->actingAs($admin)->post('/assets', [
        'asset_name' => 'Test Asset',
        'asset_code' => 'TEST001',
        'category_id' => $this->category->id,
        'location_id' => $this->location->id,
        'condition' => 'good',
        'purchase_date' => '2023-01-01',
        'purchase_price' => 1000,
    ]);

    $response->assertRedirect();
});

test('management can create assets', function () {
    $management = User::factory()->create();
    $management->assignRole('management');

    $response = $this->actingAs($management)->post('/assets', [
        'asset_name' => 'Test Asset 2',
        'asset_code' => 'TEST002',
        'category_id' => $this->category->id,
        'location_id' => $this->location->id,
        'condition' => 'good',
        'purchase_date' => '2023-01-01',
        'purchase_price' => 1000,
    ]);

    $response->assertRedirect();
});

test('client cannot create assets', function () {
    $client = User::factory()->create();
    $client->assignRole('client');

    $response = $this->actingAs($client)->post('/assets', [
        'asset_name' => 'Test Asset 3',
        'asset_code' => 'TEST003',
        'category_id' => $this->category->id,
        'location_id' => $this->location->id,
        'condition' => 'good',
        'purchase_date' => '2023-01-01',
        'purchase_price' => 1000,
    ]);

    $response->assertStatus(403);
});

test('admin can access tickets', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $response = $this->actingAs($admin)->get(route('tickets'));

    $response->assertStatus(200);
});

test('management can access tickets', function () {
    $management = User::factory()->create();
    $management->assignRole('management');

    $response = $this->actingAs($management)->get(route('tickets'));

    $response->assertStatus(200);
});

test('client cannot access admin tickets', function () {
    $client = User::factory()->create();
    $client->assignRole('client');

    $response = $this->actingAs($client)->get(route('tickets'));

    $response->assertStatus(403);
});
