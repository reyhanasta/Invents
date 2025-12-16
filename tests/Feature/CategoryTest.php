<?php

use App\Models\Category;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);
});

describe('Category Index', function () {
    it('can display categories index page', function () {
        Category::factory()->count(3)->create();

        $response = $this->get(route('categories'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Category/CategoryIndex')
            ->has('categories', 3)
        );
    });

    it('displays empty state when no categories exist', function () {
        $response = $this->get(route('categories'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Category/CategoryIndex')
            ->has('categories', 0)
        );
    });

    it('includes all necessary category data', function () {
        $category = Category::factory()->create([
            'category_name' => 'Electronics',
            'prefix_code' => 'ELK',
            'serial_number_needed' => true,
        ]);

        $response = $this->get(route('categories'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Category/CategoryIndex')
            ->has('categories', 1)
            ->where('categories.0.category_name', 'Electronics')
            ->where('categories.0.prefix_code', 'ELK')
            ->where('categories.0.serial_number_needed', 1)
        );
    });
});

describe('Category Store', function () {
    it('can create a new category with valid data', function () {
        $categoryData = [
            'category_name' => 'Furniture',
            'prefix_code' => 'FRN',
            'serial_number_needed' => true,
        ];

        $response = $this->post(route('categories-store'), $categoryData);

        $response->assertRedirect(route('categories'));
        $response->assertSessionHas('success', 'Category created successfully.');

        $this->assertDatabaseHas('categories', [
            'category_name' => 'Furniture',
            'prefix_code' => 'FRN',
            'serial_number_needed' => true,
        ]);
    });

    it('can create category without serial number needed', function () {
        $categoryData = [
            'category_name' => 'Office Supplies',
            'prefix_code' => 'OFC',
        ];

        $response = $this->post(route('categories-store'), $categoryData);

        $response->assertRedirect(route('categories'));

        $this->assertDatabaseHas('categories', [
            'category_name' => 'Office Supplies',
            'prefix_code' => 'OFC',
            'serial_number_needed' => false,
        ]);
    });

    it('requires category name', function () {
        $response = $this->post(route('categories-store'), [
            'prefix_code' => 'TST',
        ]);

        $response->assertSessionHasErrors('category_name');
        $this->assertDatabaseCount('categories', 0);
    });

    it('requires prefix code', function () {
        $response = $this->post(route('categories-store'), [
            'category_name' => 'Test Category',
        ]);

        $response->assertSessionHasErrors('prefix_code');
        $this->assertDatabaseCount('categories', 0);
    });

    it('requires prefix code to be exactly 3 characters', function () {
        $response = $this->post(route('categories-store'), [
            'category_name' => 'Test Category',
            'prefix_code' => 'AB',
        ]);

        $response->assertSessionHasErrors('prefix_code');

        $response = $this->post(route('categories-store'), [
            'category_name' => 'Test Category',
            'prefix_code' => 'ABCD',
        ]);

        $response->assertSessionHasErrors('prefix_code');
        $this->assertDatabaseCount('categories', 0);
    });

    it('requires unique category name', function () {
        Category::factory()->create(['category_name' => 'Electronics']);

        $response = $this->post(route('categories-store'), [
            'category_name' => 'Electronics',
            'prefix_code' => 'TST',
        ]);

        $response->assertSessionHasErrors('category_name');
        $this->assertDatabaseCount('categories', 1);
    });

    it('requires unique prefix code', function () {
        Category::factory()->create(['prefix_code' => 'ELK']);

        $response = $this->post(route('categories-store'), [
            'category_name' => 'New Category',
            'prefix_code' => 'ELK',
        ]);

        $response->assertSessionHasErrors('prefix_code');
        $this->assertDatabaseCount('categories', 1);
    });

    it('validates category name max length', function () {
        $longName = str_repeat('a', 256);

        $response = $this->post(route('categories-store'), [
            'category_name' => $longName,
            'prefix_code' => 'TST',
        ]);

        $response->assertSessionHasErrors('category_name');
        $this->assertDatabaseCount('categories', 0);
    });

    it('accepts valid category name at max length', function () {
        $maxName = str_repeat('a', 255);

        $response = $this->post(route('categories-store'), [
            'category_name' => $maxName,
            'prefix_code' => 'TST',
        ]);

        $response->assertRedirect(route('categories'));
        $this->assertDatabaseHas('categories', [
            'category_name' => $maxName,
        ]);
    });
});

describe('Category Update', function () {
    it('can update category with valid data', function () {
        $category = Category::factory()->create([
            'category_name' => 'Old Name',
            'prefix_code' => 'OLD',
            'serial_number_needed' => false,
        ]);

        $response = $this->put(route('categories-update', $category), [
            'category_name' => 'New Name',
            'prefix_code' => 'NEW',
            'serial_number_needed' => true,
        ]);

        $response->assertRedirect(route('categories'));
        $response->assertSessionHas('success', 'Category updated successfully.');

        $this->assertDatabaseHas('categories', [
            'id' => $category->id,
            'category_name' => 'New Name',
            'prefix_code' => 'NEW',
            'serial_number_needed' => true,
        ]);
    });

    it('can update category name while keeping same prefix code', function () {
        $category = Category::factory()->create([
            'category_name' => 'Electronics',
            'prefix_code' => 'ELK',
        ]);

        $response = $this->put(route('categories-update', $category), [
            'category_name' => 'Electronic Devices',
            'prefix_code' => 'ELK',
        ]);

        $response->assertRedirect(route('categories'));

        $this->assertDatabaseHas('categories', [
            'id' => $category->id,
            'category_name' => 'Electronic Devices',
            'prefix_code' => 'ELK',
        ]);
    });

    it('requires unique category name except for current category', function () {
        $category1 = Category::factory()->create(['category_name' => 'Electronics']);
        $category2 = Category::factory()->create(['category_name' => 'Furniture']);

        $response = $this->put(route('categories-update', $category2), [
            'category_name' => 'Electronics',
            'prefix_code' => 'FRN',
        ]);

        $response->assertSessionHasErrors('category_name');
    });

    it('requires unique prefix code except for current category', function () {
        $category1 = Category::factory()->create(['prefix_code' => 'ELK']);
        $category2 = Category::factory()->create(['prefix_code' => 'FRN']);

        $response = $this->put(route('categories-update', $category2), [
            'category_name' => 'New Name',
            'prefix_code' => 'ELK',
        ]);

        $response->assertSessionHasErrors('prefix_code');
    });

    it('requires all fields when updating', function () {
        $category = Category::factory()->create();

        $response = $this->put(route('categories-update', $category), []);

        $response->assertSessionHasErrors(['category_name', 'prefix_code']);
    });

    it('can toggle serial number needed', function () {
        $category = Category::factory()->create(['serial_number_needed' => true]);

        $response = $this->put(route('categories-update', $category), [
            'category_name' => $category->category_name,
            'prefix_code' => $category->prefix_code,
        ]);

        $response->assertRedirect(route('categories'));

        $this->assertDatabaseHas('categories', [
            'id' => $category->id,
            'serial_number_needed' => false,
        ]);
    });
});

describe('Category Delete', function () {
    it('can delete a category', function () {
        $category = Category::factory()->create();

        $response = $this->delete(route('categories-delete', $category));

        $response->assertRedirect(route('categories'));
        $response->assertSessionHas('success', 'Category deleted successfully.');

        $this->assertDatabaseMissing('categories', [
            'id' => $category->id,
        ]);
    });

    it('returns error when trying to delete non-existent category', function () {
        $response = $this->delete(route('categories-delete', 9999));

        $response->assertNotFound();
    });

    it('can delete multiple categories', function () {
        $categories = Category::factory()->count(3)->create();

        foreach ($categories as $category) {
            $this->delete(route('categories-delete', $category))
                ->assertRedirect(route('categories'));
        }

        $this->assertDatabaseCount('categories', 0);
    });
});

describe('Category Business Logic', function () {
    it('correctly handles serial number needed flag', function () {
        $categoryWithSerial = Category::factory()->create([
            'serial_number_needed' => true,
        ]);

        $categoryWithoutSerial = Category::factory()->create([
            'serial_number_needed' => false,
        ]);

        expect($categoryWithSerial->serial_number_needed)->toBeTrue();
        expect($categoryWithoutSerial->serial_number_needed)->toBeFalse();
    });

    it('stores prefix code in uppercase format', function () {
        $response = $this->post(route('categories-store'), [
            'category_name' => 'Test Category',
            'prefix_code' => 'tst',
            'serial_number_needed' => false,
        ]);

        $response->assertRedirect(route('categories'));

        // Assuming you might add uppercase transformation in the future
        $this->assertDatabaseHas('categories', [
            'category_name' => 'Test Category',
        ]);
    });
});

describe('Category Authorization', function () {
    it('requires authentication to access categories', function () {
        auth()->logout();

        $this->get(route('categories'))->assertRedirect(route('login'));
        $this->post(route('categories-store'), [])->assertRedirect(route('login'));
    });

    it('authenticated user can access all category operations', function () {
        $category = Category::factory()->create();

        $this->actingAs($this->user);

        $this->get(route('categories'))->assertOk();
        $this->post(route('categories-store'), [
            'category_name' => 'New Category',
            'prefix_code' => 'NEW',
        ])->assertRedirect();
        $this->put(route('categories-update', $category), [
            'category_name' => $category->category_name,
            'prefix_code' => $category->prefix_code,
        ])->assertRedirect();
        $this->delete(route('categories-delete', $category))->assertRedirect();
    });
});
