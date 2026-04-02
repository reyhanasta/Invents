<?php

namespace Tests\Feature\Admin;

use App\Models\User;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->admin = User::factory()->create();
    $this->admin->assignRole('admin');
});

test('admin can see user management index', function () {
    $response = $this->actingAs($this->admin)->get('/users');
    $response->assertStatus(200);
});

test('admin can see create user page', function () {
    $response = $this->actingAs($this->admin)->get('/users/create');
    $response->assertStatus(200);
});

test('admin can store new user with roles', function () {
    $response = $this->actingAs($this->admin)->post('/users', [
        'name' => 'New User',
        'email' => 'newuser@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
        'role' => 'management'
    ]);

    $response->assertRedirect('/users');
    
    $user = User::where('email', 'newuser@example.com')->first();
    expect($user)->not->toBeNull()
        ->and($user->hasRole('management'))->toBeTrue();
});

test('admin can see edit user page', function () {
    $user = User::factory()->create();
    $response = $this->actingAs($this->admin)->get("/users/{$user->id}/edit");
    $response->assertStatus(200);
});

test('admin can update user and roles', function () {
    $user = User::factory()->create();
    $user->assignRole('client');

    $response = $this->actingAs($this->admin)->put("/users/{$user->id}", [
        'name' => 'Updated Name',
        'email' => $user->email,
        'role' => 'admin'
    ]);

    $response->assertRedirect('/users');
    
    $user->refresh();
    expect($user->name)->toBe('Updated Name')
        ->and($user->hasRole('admin'))->toBeTrue()
        ->and($user->hasRole('client'))->toBeFalse();
});

test('admin can delete user', function () {
    $user = User::factory()->create();
    
    $response = $this->actingAs($this->admin)->delete("/users/{$user->id}");

    $response->assertRedirect('/users');
    expect(User::find($user->id))->toBeNull();
});

test('non-admin cannot access user management', function () {
    $user = User::factory()->create();
    $user->assignRole('management');

    $this->actingAs($user)->get('/users')->assertStatus(403);
    $this->actingAs($user)->post('/users', [])->assertStatus(403);
});
