<?php

use App\Models\Asset;
use App\Models\Category;
use App\Models\Location;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\assertDatabaseMissing;
use function Pest\Laravel\delete;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\put;

beforeEach(function () {
    $this->user = User::factory()->create();
    actingAs($this->user);
});

describe('Asset Index', function () {
    it('displays the assets index page', function () {
        $response = get(route('assets'));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page->component('Asset/AssetIndex'));
    });

    it('displays all assets on the index page', function () {
        $assets = Asset::factory()->count(5)->create();

        $response = get(route('assets'));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('Asset/AssetIndex')
            ->has('assets.data', 5)
        );
    });

    it('includes category and location relationships in the index', function () {
        $category = Category::factory()->create();
        $location = Location::factory()->create();

        $asset = Asset::factory()->create([
            'category_id' => $category->id,
            'location_id' => $location->id,
        ]);

        $response = get(route('assets'));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('Asset/AssetIndex')
            ->where('assets.data.0.category.id', $category->id)
            ->where('assets.data.0.location.id', $location->id)
        );
    });

    it('paginates assets correctly', function () {
        Asset::factory()->count(20)->create();

        $response = get(route('assets'));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('Asset/AssetIndex')
            ->has('assets.data', 15) // Default per_page is 15
            ->where('assets.total', 20)
        );
    });
});

describe('Asset Create', function () {
    it('displays the create asset page', function () {
        $response = get(route('assets-create'));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('Asset/AssetCreate')
            ->has('categories')
            ->has('locations')
        );
    });

    it('can create a new asset with required fields', function () {
        $category = Category::factory()->create();
        $location = Location::factory()->create();

        $assetData = [
            'asset_name' => 'Dell Laptop XPS 15',
            'category_id' => $category->id,
            'location_id' => $location->id,
            'condition' => 'good',
        ];

        $response = post(route('assets-store'), $assetData);

        $response->assertRedirect(route('assets'));
        assertDatabaseHas('assets', [
            'asset_name' => 'Dell Laptop XPS 15',
            'category_id' => $category->id,
            'location_id' => $location->id,
            'condition' => 'good',
        ]);
    });

    it('generates asset code based on category prefix', function () {
        $category = Category::factory()->create(['prefix_code' => 'LPT']);
        $location = Location::factory()->create();

        $assetData = [
            'asset_name' => 'Test Laptop',
            'category_id' => $category->id,
            'location_id' => $location->id,
            'condition' => 'good',
        ];

        post(route('assets-store'), $assetData);

        assertDatabaseHas('assets', [
            'asset_name' => 'Test Laptop',
            'asset_code' => 'LPT0001',
        ]);
    });

    it('increments asset code for same category', function () {
        $category = Category::factory()->create(['prefix_code' => 'DSK']);
        $location = Location::factory()->create();

        // Create first asset
        post(route('assets-store'), [
            'asset_name' => 'Desktop 1',
            'category_id' => $category->id,
            'location_id' => $location->id,
            'condition' => 'good',
        ]);

        // Create second asset
        post(route('assets-store'), [
            'asset_name' => 'Desktop 2',
            'category_id' => $category->id,
            'location_id' => $location->id,
            'condition' => 'good',
        ]);

        assertDatabaseHas('assets', ['asset_code' => 'DSK0001']);
        assertDatabaseHas('assets', ['asset_code' => 'DSK0002']);
    });

    it('can create asset with all optional fields', function () {
        $category = Category::factory()->create();
        $location = Location::factory()->create();

        $assetData = [
            'asset_name' => 'HP Laptop ProBook',
            'category_id' => $category->id,
            'location_id' => $location->id,
            'brand' => 'HP',
            'serial_number' => 'SN123456789',
            'condition' => 'minor_damage',
            'acquisition_date' => '2024-01-15',
            'description' => 'Company laptop for development team',
        ];

        $response = post(route('assets-store'), $assetData);

        $response->assertRedirect(route('assets'));
        assertDatabaseHas('assets', $assetData);
    });

    it('requires asset_name field', function () {
        $category = Category::factory()->create();
        $location = Location::factory()->create();

        $response = post(route('assets-store'), [
            'category_id' => $category->id,
            'location_id' => $location->id,
            'condition' => 'good',
        ]);

        $response->assertSessionHasErrors('asset_name');
    });

    it('requires category_id field', function () {
        $location = Location::factory()->create();

        $response = post(route('assets-store'), [
            'asset_name' => 'Test Asset',
            'location_id' => $location->id,
            'condition' => 'good',
        ]);

        $response->assertSessionHasErrors('category_id');
    });

    it('requires location_id field', function () {
        $category = Category::factory()->create();

        $response = post(route('assets-store'), [
            'asset_name' => 'Test Asset',
            'category_id' => $category->id,
            'condition' => 'good',
        ]);

        $response->assertSessionHasErrors('location_id');
    });

    it('requires condition field', function () {
        $category = Category::factory()->create();
        $location = Location::factory()->create();

        $response = post(route('assets-store'), [
            'asset_name' => 'Test Asset',
            'category_id' => $category->id,
            'location_id' => $location->id,
        ]);

        $response->assertSessionHasErrors('condition');
    });

    it('validates condition must be one of allowed values', function () {
        $category = Category::factory()->create();
        $location = Location::factory()->create();

        $response = post(route('assets-store'), [
            'asset_name' => 'Test Asset',
            'category_id' => $category->id,
            'location_id' => $location->id,
            'condition' => 'invalid_condition',
        ]);

        $response->assertSessionHasErrors('condition');
    });

    it('validates category_id must exist in categories table', function () {
        $location = Location::factory()->create();

        $response = post(route('assets-store'), [
            'asset_name' => 'Test Asset',
            'category_id' => 99999,
            'location_id' => $location->id,
            'condition' => 'good',
        ]);

        $response->assertSessionHasErrors('category_id');
    });

    it('validates location_id must exist in locations table', function () {
        $category = Category::factory()->create();

        $response = post(route('assets-store'), [
            'asset_name' => 'Test Asset',
            'category_id' => $category->id,
            'location_id' => 99999,
            'condition' => 'good',
        ]);

        $response->assertSessionHasErrors('location_id');
    });

    it('validates acquisition_date must be a valid date', function () {
        $category = Category::factory()->create();
        $location = Location::factory()->create();

        $response = post(route('assets-store'), [
            'asset_name' => 'Test Asset',
            'category_id' => $category->id,
            'location_id' => $location->id,
            'condition' => 'good',
            'acquisition_date' => 'not-a-date',
        ]);

        $response->assertSessionHasErrors('acquisition_date');
    });
});

describe('Asset Edit', function () {
    it('displays the edit asset page', function () {
        $asset = Asset::factory()->create();

        $response = get(route('assets-edit', $asset->id));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('Asset/AssetEdit')
            ->has('asset')
            ->has('categories')
            ->has('locations')
            ->where('asset.id', $asset->id)
        );
    });

    it('returns 404 for non-existent asset', function () {
        $response = get(route('assets-edit', 99999));

        $response->assertNotFound();
    });
});

describe('Asset Update', function () {
    it('can update an existing asset', function () {
        $asset = Asset::factory()->create([
            'asset_name' => 'Old Name',
            'condition' => 'good',
        ]);

        $category = Category::factory()->create();
        $location = Location::factory()->create();

        $updateData = [
            'asset_name' => 'Updated Name',
            'category_id' => $category->id,
            'location_id' => $location->id,
            'brand' => 'Updated Brand',
            'condition' => 'minor_damage',
        ];

        $response = put(route('assets-update', $asset->id), $updateData);

        $response->assertRedirect(route('assets'));
        assertDatabaseHas('assets', [
            'id' => $asset->id,
            'asset_name' => 'Updated Name',
            'brand' => 'Updated Brand',
            'condition' => 'minor_damage',
        ]);
    });

    it('can update asset with all fields', function () {
        $asset = Asset::factory()->create();
        $category = Category::factory()->create();
        $location = Location::factory()->create();

        $updateData = [
            'asset_name' => 'Fully Updated Asset',
            'category_id' => $category->id,
            'location_id' => $location->id,
            'brand' => 'New Brand',
            'serial_number' => 'NEW-SN-123',
            'condition' => 'major_damage',
            'acquisition_date' => '2024-12-01',
            'description' => 'Updated description',
        ];

        $response = put(route('assets-update', $asset->id), $updateData);

        $response->assertRedirect(route('assets'));
        assertDatabaseHas('assets', [
            'id' => $asset->id,
            'asset_name' => 'Fully Updated Asset',
            'brand' => 'New Brand',
            'serial_number' => 'NEW-SN-123',
            'condition' => 'major_damage',
            'description' => 'Updated description',
        ]);
    });

    it('requires asset_name when updating', function () {
        $asset = Asset::factory()->create();

        $response = put(route('assets-update', $asset->id), [
            'asset_name' => '',
            'category_id' => $asset->category_id,
            'location_id' => $asset->location_id,
            'condition' => $asset->condition,
        ]);

        $response->assertSessionHasErrors('asset_name');
    });

    it('validates condition when updating', function () {
        $asset = Asset::factory()->create();

        $response = put(route('assets-update', $asset->id), [
            'asset_name' => $asset->asset_name,
            'category_id' => $asset->category_id,
            'location_id' => $asset->location_id,
            'condition' => 'invalid',
        ]);

        $response->assertSessionHasErrors('condition');
    });

    it('returns 404 when updating non-existent asset', function () {
        $category = Category::factory()->create();
        $location = Location::factory()->create();

        $response = put(route('assets-update', 99999), [
            'asset_name' => 'Test',
            'category_id' => $category->id,
            'location_id' => $location->id,
            'condition' => 'good',
        ]);

        $response->assertNotFound();
    });
});

describe('Asset Delete', function () {
    it('can delete an asset', function () {
        $asset = Asset::factory()->create();

        $response = delete(route('assets-delete', $asset->id));

        $response->assertRedirect(route('assets'));
        assertDatabaseMissing('assets', ['id' => $asset->id]);
    });

    it('returns 404 when deleting non-existent asset', function () {
        $response = delete(route('assets-delete', 99999));

        $response->assertNotFound();
    });

    it('can delete asset without affecting other assets', function () {
        $asset1 = Asset::factory()->create();
        $asset2 = Asset::factory()->create();

        delete(route('assets-delete', $asset1->id));

        assertDatabaseMissing('assets', ['id' => $asset1->id]);
        assertDatabaseHas('assets', ['id' => $asset2->id]);
    });
});

describe('Asset Relationships', function () {
    it('belongs to a category', function () {
        $category = Category::factory()->create();
        $asset = Asset::factory()->create(['category_id' => $category->id]);

        expect($asset->category)->toBeInstanceOf(Category::class);
        expect($asset->category->id)->toBe($category->id);
    });

    it('belongs to a location', function () {
        $location = Location::factory()->create();
        $asset = Asset::factory()->create(['location_id' => $location->id]);

        expect($asset->location)->toBeInstanceOf(Location::class);
        expect($asset->location->id)->toBe($location->id);
    });
});

describe('Asset Factory', function () {
    it('creates asset with valid data', function () {
        $asset = Asset::factory()->create();

        expect($asset)->toBeInstanceOf(Asset::class);
        expect($asset->asset_name)->not->toBeEmpty();
        expect($asset->asset_code)->not->toBeEmpty();
        expect($asset->condition)->toBeIn(['good', 'minor_damage', 'major_damage']);
    });

    it('creates asset with good condition state', function () {
        $asset = Asset::factory()->good()->create();

        expect($asset->condition)->toBe('good');
    });

    it('creates asset with minor damage state', function () {
        $asset = Asset::factory()->minorDamage()->create();

        expect($asset->condition)->toBe('minor_damage');
    });

    it('creates asset with major damage state', function () {
        $asset = Asset::factory()->majorDamage()->create();

        expect($asset->condition)->toBe('major_damage');
    });

    it('creates recent asset with recent state', function () {
        $asset = Asset::factory()->recent()->create();

        $sixMonthsAgo = now()->subMonths(6)->startOfDay();
        $acquisitionDate = \Carbon\Carbon::parse($asset->acquisition_date);

        expect($acquisitionDate->isAfter($sixMonthsAgo))->toBeTrue();
    });

    it('creates multiple assets', function () {
        Asset::factory()->count(10)->create();

        expect(Asset::count())->toBe(10);
    });
});
