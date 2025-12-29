<?php

use App\Models\Asset;
use App\Models\Maintenance;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);
});

describe('Maintenance Index', function () {

    it('can display maintenances index page', function () {
        Maintenance::truncate();
        Maintenance::factory()->count(3)->create();

        $response = $this->get(route('maintenances'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Maintenance/MaintenanceIndex')
            ->has('maintenance.data', 3)
        );
    });

    it('displays empty state when no maintenances exist', function () {
        $response = $this->get(route('maintenances'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Maintenance/MaintenanceIndex')
            ->has('maintenance.data', 0)
        );
    });

    it('includes asset relationship data', function () {
        Maintenance::truncate();
        $maintenance = Maintenance::factory()->create();

        $response = $this->get(route('maintenances'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Maintenance/MaintenanceIndex')
            ->has('maintenance.data', 1)
            ->where('maintenance.data.0.asset.asset_name', $maintenance->asset->asset_name)
        );
    });

    it('can search maintenances by technician', function () {
        Maintenance::truncate();
        Maintenance::factory()->create(['technician' => 'John Doe']);
        Maintenance::factory()->create(['technician' => 'Jane Smith']);

        $response = $this->get(route('maintenances', ['search' => 'John']));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Maintenance/MaintenanceIndex')
            ->has('maintenance.data', 1)
            ->where('maintenance.data.0.technician', 'John Doe')
        );
    });

    it('can search maintenances by asset name', function () {
        Maintenance::truncate();
        $asset1 = Asset::factory()->create(['asset_name' => 'Dell Laptop']);
        $asset2 = Asset::factory()->create(['asset_name' => 'HP Desktop']);

        Maintenance::factory()->create(['asset_id' => $asset1->id]);
        Maintenance::factory()->create(['asset_id' => $asset2->id]);

        $response = $this->get(route('maintenances', ['search' => 'Dell']));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Maintenance/MaintenanceIndex')
            ->has('maintenance.data', 1)
            ->where('maintenance.data.0.asset.asset_name', 'Dell Laptop')
        );
    });

    it('can filter by type', function () {
        Maintenance::truncate();
        Maintenance::factory()->create(['type' => 'routine']);
        Maintenance::factory()->create(['type' => 'repair']);

        $response = $this->get(route('maintenances', ['type' => 'routine']));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Maintenance/MaintenanceIndex')
            ->has('maintenance.data', 1)
            ->where('maintenance.data.0.type', 'routine')
        );
    });

    it('can filter by status', function () {
        Maintenance::truncate();
        Maintenance::factory()->create(['status' => 'pending']);
        Maintenance::factory()->create(['status' => 'completed']);

        $response = $this->get(route('maintenances', ['status' => 'pending']));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Maintenance/MaintenanceIndex')
            ->has('maintenance.data', 1)
            ->where('maintenance.data.0.status', 'pending')
        );
    });

    it('paginates maintenances', function () {
        Maintenance::truncate();
        Maintenance::factory()->count(10)->create();

        $response = $this->get(route('maintenances'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Maintenance/MaintenanceIndex')
            ->has('maintenance.data', 8) // per page 8
        );
    });
});

describe('Maintenance Create', function () {
    it('can display create maintenance page', function () {
        Asset::factory()->count(3)->create();

        $response = $this->get(route('maintenances-create'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Maintenance/MaintenanceCreate')
            ->has('assets', 3)
        );
    });
});

describe('Maintenance Edit', function () {
    it('can display edit maintenance page', function () {
        $maintenance = Maintenance::factory()->create();
        Asset::factory()->count(2)->create();

        $response = $this->get(route('maintenances-edit', $maintenance));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Maintenance/MaintenanceEdit')
            ->has('maintenance')
            ->where('maintenance.description', $maintenance->description)
            ->has('assets', 3) // including the maintenance's asset
        );
    });

    it('returns 404 for non-existent maintenance', function () {
        $response = $this->get(route('maintenances-edit', 9999));

        $response->assertNotFound();
    });
});

describe('Maintenance Store', function () {
    it('can create a new maintenance with valid data', function () {
        $asset = Asset::factory()->create();

        $data = [
            'asset_id' => $asset->id,
            'type' => 'repair',
            'maintenance_date' => '2023-01-15',
            'maintenance_done_date' => '2023-01-16',
            'status' => 'completed',
            'description' => 'Fixed keyboard issue',
            'note' => 'Replaced keyboard membrane',
            'technician' => 'John Doe',
            'cost' => 150.50,
        ];

        $response = $this->post(route('maintenances-store'), $data);

        $response->assertRedirect(route('maintenances'));
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('maintenances', [
            'asset_id' => $asset->id,
            'type' => 'repair',
            'maintenance_date' => '2023-01-15',
            'maintenance_done_date' => '2023-01-16',
            'status' => 'completed',
            'description' => 'Fixed keyboard issue',
            'note' => 'Replaced keyboard membrane',
            'technician' => 'John Doe',
            'cost' => 150.50,
        ]);
    });

    it('can create maintenance with minimal data', function () {
        $asset = Asset::factory()->create();

        $data = [
            'asset_id' => $asset->id,
            'type' => 'routine',
            'maintenance_date' => '2023-01-15',
            'description' => 'Monthly checkup',
        ];

        $response = $this->post(route('maintenances-store'), $data);

        $response->assertRedirect(route('maintenances'));

        $this->assertDatabaseHas('maintenances', [
            'asset_id' => $asset->id,
            'type' => 'routine',
            'maintenance_date' => '2023-01-15',
            'status' => 'pending', // default status
            'description' => 'Monthly checkup',
            'maintenance_done_date' => null,
            'note' => null,
            'technician' => null,
            'cost' => null,
        ]);
    });

    it('requires asset_id', function () {
        $data = [
            'type' => 'repair',
            'maintenance_date' => '2023-01-15',
            'description' => 'Test maintenance',
        ];

        $response = $this->post(route('maintenances-store'), $data);

        $response->assertSessionHasErrors('asset_id');
        $this->assertDatabaseCount('maintenances', 0);
    });

    it('requires type', function () {
        $asset = Asset::factory()->create();

        $data = [
            'asset_id' => $asset->id,
            'maintenance_date' => '2023-01-15',
            'description' => 'Test maintenance',
        ];

        $response = $this->post(route('maintenances-store'), $data);

        $response->assertSessionHasErrors('type');
        $this->assertDatabaseCount('maintenances', 0);
    });

    it('requires maintenance_date', function () {
        $asset = Asset::factory()->create();

        $data = [
            'asset_id' => $asset->id,
            'type' => 'repair',
            'description' => 'Test maintenance',
        ];

        $response = $this->post(route('maintenances-store'), $data);

        $response->assertSessionHasErrors('maintenance_date');
        $this->assertDatabaseCount('maintenances', 0);
    });

    it('requires description', function () {
        $asset = Asset::factory()->create();

        $data = [
            'asset_id' => $asset->id,
            'type' => 'repair',
            'maintenance_date' => '2023-01-15',
        ];

        $response = $this->post(route('maintenances-store'), $data);

        $response->assertSessionHasErrors('description');
        $this->assertDatabaseCount('maintenances', 0);
    });

    it('validates type must be valid', function () {
        $asset = Asset::factory()->create();

        $data = [
            'asset_id' => $asset->id,
            'type' => 'invalid_type',
            'maintenance_date' => '2023-01-15',
            'description' => 'Test maintenance',
        ];

        $response = $this->post(route('maintenances-store'), $data);

        $response->assertSessionHasErrors('type');
        $this->assertDatabaseCount('maintenances', 0);
    });

    it('validates status must be valid', function () {
        $asset = Asset::factory()->create();

        $data = [
            'asset_id' => $asset->id,
            'type' => 'repair',
            'maintenance_date' => '2023-01-15',
            'status' => 'invalid_status',
            'description' => 'Test maintenance',
        ];

        $response = $this->post(route('maintenances-store'), $data);

        $response->assertSessionHasErrors('status');
        $this->assertDatabaseCount('maintenances', 0);
    });

    it('validates maintenance_done_date must be after or equal to maintenance_date', function () {
        $asset = Asset::factory()->create();

        $data = [
            'asset_id' => $asset->id,
            'type' => 'repair',
            'maintenance_date' => '2023-01-15',
            'maintenance_done_date' => '2023-01-10', // Before maintenance_date
            'description' => 'Test maintenance',
        ];

        $response = $this->post(route('maintenances-store'), $data);

        $response->assertSessionHasErrors('maintenance_done_date');
        $this->assertDatabaseCount('maintenances', 0);
    });

    it('validates cost must be numeric and non-negative', function () {
        $asset = Asset::factory()->create();

        $data = [
            'asset_id' => $asset->id,
            'type' => 'repair',
            'maintenance_date' => '2023-01-15',
            'cost' => -100,
            'description' => 'Test maintenance',
        ];

        $response = $this->post(route('maintenances-store'), $data);

        $response->assertSessionHasErrors('cost');
        $this->assertDatabaseCount('maintenances', 0);
    });

    it('validates asset_id must exist', function () {
        $data = [
            'asset_id' => 9999,
            'type' => 'repair',
            'maintenance_date' => '2023-01-15',
            'description' => 'Test maintenance',
        ];

        $response = $this->post(route('maintenances-store'), $data);

        $response->assertSessionHasErrors('asset_id');
        $this->assertDatabaseCount('maintenances', 0);
    });
});

describe('Maintenance Update', function () {
    it('can update maintenance with valid data', function () {
        $maintenance = Maintenance::factory()->create();
        $newAsset = Asset::factory()->create();

        $data = [
            'asset_id' => $newAsset->id,
            'type' => 'calibration',
            'maintenance_date' => '2023-02-15',
            'maintenance_done_date' => '2023-02-16',
            'status' => 'in_progress',
            'description' => 'Updated maintenance',
            'note' => 'Updated note',
            'technician' => 'Jane Smith',
            'cost' => 200.00,
        ];

        $response = $this->put(route('maintenances-update', $maintenance), $data);

        $response->assertRedirect(route('maintenances'));
        $response->assertSessionHas('success');

        $maintenance->refresh();
        expect($maintenance->asset_id)->toBe($newAsset->id);
        expect($maintenance->type)->toBe('calibration');
        expect($maintenance->status)->toBe('in_progress');
        expect($maintenance->description)->toBe('Updated maintenance');
        expect($maintenance->technician)->toBe('Jane Smith');
        expect($maintenance->cost)->toBe(200);
    });

    it('requires all fields when updating', function () {
        $maintenance = Maintenance::factory()->create();

        $response = $this->put(route('maintenances-update', $maintenance), []);

        $response->assertSessionHasErrors(['asset_id', 'type', 'maintenance_date', 'description']);
    });

    it('returns 404 when updating non-existent maintenance', function () {
        $response = $this->put(route('maintenances-update', 9999), []);

        $response->assertNotFound();
    });
});

describe('Maintenance Delete', function () {
    it('can delete a maintenance', function () {
        $maintenance = Maintenance::factory()->create();

        $response = $this->delete(route('maintenances-delete', $maintenance));

        $response->assertRedirect(route('maintenances'));
        $response->assertSessionHas('success');

        $this->assertDatabaseMissing('maintenances', ['id' => $maintenance->id]);
    });

    it('returns 404 when deleting non-existent maintenance', function () {
        $response = $this->delete(route('maintenances-delete', 9999));

        $response->assertNotFound();
    });
});

describe('Maintenance Relationships', function () {
    it('belongs to an asset', function () {
        $asset = Asset::factory()->create();
        $maintenance = Maintenance::factory()->create(['asset_id' => $asset->id]);

        expect($maintenance->asset)->toBeInstanceOf(Asset::class);
        expect($maintenance->asset->id)->toBe($asset->id);
    });
});

describe('Maintenance Authorization', function () {
    it('requires authentication to access maintenances', function () {
        auth()->logout();

        $this->get(route('maintenances'))->assertRedirect(route('login'));
        $this->post(route('maintenances-store'), [])->assertRedirect(route('login'));
    });

    it('authenticated user can access all maintenance operations', function () {
        $maintenance = Maintenance::factory()->create();

        $this->actingAs($this->user);

        $this->get(route('maintenances'))->assertOk();
        $this->get(route('maintenances-create'))->assertOk();
        $this->get(route('maintenances-edit', $maintenance))->assertOk();
    });
});
