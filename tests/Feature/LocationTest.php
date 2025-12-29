<?php

use App\Models\Location;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);
});

describe('Location Index', function () {
    it('can display locations index page', function () {
        Location::factory()->count(3)->create();

        $response = $this->get(route('locations'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Location/LocationIndex')
            ->has('locations', 3)
        );
    });

    it('displays empty state when no locations exist', function () {
        $response = $this->get(route('locations'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Location/LocationIndex')
            ->has('locations', 0)
        );
    });

    it('includes all necessary location data', function () {
        $location = Location::factory()->create([
            'location_name' => 'Main Office',
            'location_code' => 'MOF',
        ]);

        $response = $this->get(route('locations'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Location/LocationIndex')
            ->has('locations', 1)
            ->where('locations.0.location_name', 'Main Office')
            ->where('locations.0.location_code', 'MOF')
            ->where('locations.0.assets_count', 0)
        );
    });
});

describe('Location Store', function () {
    it('can create a new location with valid data', function () {
        $locationData = [
            'location_name' => 'Branch Office',
            'location_code' => 'BOF',
        ];

        $response = $this->post(route('locations-store'), $locationData);

        $response->assertRedirect(route('locations'));
        $response->assertSessionHas('success', 'Location created successfully.');

        $this->assertDatabaseHas('locations', [
            'location_name' => 'Branch Office',
            'location_code' => 'BOF',
        ]);
    });

    it('requires location name', function () {
        $response = $this->post(route('locations-store'), [
            'location_code' => 'TST',
        ]);

        $response->assertSessionHasErrors('location_name');
        $this->assertDatabaseCount('locations', 0);
    });

    it('requires location code', function () {
        $response = $this->post(route('locations-store'), [
            'location_name' => 'Test Location',
        ]);

        $response->assertSessionHasErrors('location_code');
        $this->assertDatabaseCount('locations', 0);
    });

    it('requires location code to be exactly 3 characters', function () {
        $response = $this->post(route('locations-store'), [
            'location_name' => 'Test Location',
            'location_code' => 'AB',
        ]);

        $response->assertSessionHasErrors('location_code');

        $response = $this->post(route('locations-store'), [
            'location_name' => 'Test Location',
            'location_code' => 'ABCD',
        ]);

        $response->assertSessionHasErrors('location_code');
        $this->assertDatabaseCount('locations', 0);
    });

    it('requires unique location name', function () {
        Location::factory()->create(['location_name' => 'Main Office']);

        $response = $this->post(route('locations-store'), [
            'location_name' => 'Main Office',
            'location_code' => 'TST',
        ]);

        $response->assertSessionHasErrors('location_name');
        $this->assertDatabaseCount('locations', 1);
    });

    it('requires unique location code', function () {
        Location::factory()->create(['location_code' => 'MOF']);

        $response = $this->post(route('locations-store'), [
            'location_name' => 'New Location',
            'location_code' => 'MOF',
        ]);

        $response->assertSessionHasErrors('location_code');
        $this->assertDatabaseCount('locations', 1);
    });

    it('validates location name max length', function () {
        $longName = str_repeat('a', 256);

        $response = $this->post(route('locations-store'), [
            'location_name' => $longName,
            'location_code' => 'TST',
        ]);

        $response->assertSessionHasErrors('location_name');
        $this->assertDatabaseCount('locations', 0);
    });

    it('accepts valid location name at max length', function () {
        $maxName = str_repeat('a', 255);

        $response = $this->post(route('locations-store'), [
            'location_name' => $maxName,
            'location_code' => 'TST',
        ]);

        $response->assertRedirect(route('locations'));
        $this->assertDatabaseHas('locations', [
            'location_name' => $maxName,
        ]);
    });

    it('stores location code in uppercase', function () {
        $response = $this->post(route('locations-store'), [
            'location_name' => 'Test Location',
            'location_code' => 'tst',
        ]);

        $response->assertRedirect(route('locations'));

        $this->assertDatabaseHas('locations', [
            'location_name' => 'Test Location',
            'location_code' => 'TST',
        ]);
    });
});

describe('Location Update', function () {
    it('can update location with valid data', function () {
        $location = Location::factory()->create([
            'location_name' => 'Old Name',
            'location_code' => 'OLD',
        ]);

        $response = $this->put(route('locations-update', $location), [
            'location_name' => 'New Name',
            'location_code' => 'NEW',
        ]);

        $response->assertRedirect(route('locations'));
        $response->assertSessionHas('success', 'Location updated successfully.');

        $this->assertDatabaseHas('locations', [
            'id' => $location->id,
            'location_name' => 'New Name',
            'location_code' => 'NEW',
        ]);
    });

    it('can update location name while keeping same location code', function () {
        $location = Location::factory()->create([
            'location_name' => 'Main Office',
            'location_code' => 'MOF',
        ]);

        $response = $this->put(route('locations-update', $location), [
            'location_name' => 'Head Office',
            'location_code' => 'MOF',
        ]);

        $response->assertRedirect(route('locations'));

        $this->assertDatabaseHas('locations', [
            'id' => $location->id,
            'location_name' => 'Head Office',
            'location_code' => 'MOF',
        ]);
    });

    it('requires unique location name except for current location', function () {
        $location1 = Location::factory()->create(['location_name' => 'Main Office']);
        $location2 = Location::factory()->create(['location_name' => 'Branch Office']);

        $response = $this->put(route('locations-update', $location2), [
            'location_name' => 'Main Office',
            'location_code' => 'BOF',
        ]);

        $response->assertSessionHasErrors('location_name');
    });

    it('requires unique location code except for current location', function () {
        $location1 = Location::factory()->create(['location_code' => 'MOF']);
        $location2 = Location::factory()->create(['location_code' => 'BOF']);

        $response = $this->put(route('locations-update', $location2), [
            'location_name' => 'New Name',
            'location_code' => 'MOF',
        ]);

        $response->assertSessionHasErrors('location_code');
    });

    it('requires all fields when updating', function () {
        $location = Location::factory()->create();

        $response = $this->put(route('locations-update', $location), []);

        $response->assertSessionHasErrors(['location_name', 'location_code']);
    });
});

describe('Location Delete', function () {
    it('can delete a location', function () {
        $location = Location::factory()->create();

        $response = $this->delete(route('locations-delete', $location));

        $response->assertRedirect(route('locations'));
        $response->assertSessionHas('success', 'Location deleted successfully.');

        $this->assertDatabaseMissing('locations', [
            'id' => $location->id,
        ]);
    });

    it('returns error when trying to delete non-existent location', function () {
        $response = $this->delete(route('locations-delete', 9999));

        $response->assertNotFound();
    });

    it('can delete multiple locations', function () {
        $locations = Location::factory()->count(3)->create();

        foreach ($locations as $location) {
            $this->delete(route('locations-delete', $location))
                ->assertRedirect(route('locations'));
        }

        $this->assertDatabaseCount('locations', 0);
    });
});

describe('Location Authorization', function () {
    it('requires authentication to access locations', function () {
        auth()->logout();

        $this->get(route('locations'))->assertRedirect(route('login'));
        $this->post(route('locations-store'), [])->assertRedirect(route('login'));
    });

    it('authenticated user can access all location operations', function () {
        $location = Location::factory()->create();

        $this->actingAs($this->user);

        $this->get(route('locations'))->assertOk();
        $this->post(route('locations-store'), [
            'location_name' => 'New Location',
            'location_code' => 'NEW',
        ])->assertRedirect();
        $this->put(route('locations-update', $location), [
            'location_name' => $location->location_name,
            'location_code' => $location->location_code,
        ])->assertRedirect();
        $this->delete(route('locations-delete', $location))->assertRedirect();
    });
});
