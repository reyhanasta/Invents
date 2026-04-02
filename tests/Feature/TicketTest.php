<?php

use App\Models\Asset;
use App\Models\Department;
use App\Models\Priority;
use App\Models\Ticket;
use App\Models\TicketCategory;
use App\Models\User;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->user = User::factory()->create();
    $this->user->assignRole('admin');
    $this->actingAs($this->user);
});

describe('Ticket Admin Management', function () {
    it('can view ticket index', function () {
        Ticket::factory()->count(3)->create();

        $response = $this->get(route('tickets'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Tickets/Index')
            ->has('tickets.data', 3)
        );
    });

    it('can search tickets', function () {
        Ticket::factory()->create(['title' => 'Specific Problem', 'ticket_code' => 'TKT-MATCH']);
        Ticket::factory()->create(['title' => 'Other Issue', 'ticket_code' => 'TKT-OTHER']);

        $response = $this->get(route('tickets', ['search' => 'Specific']));

        $response->assertInertia(fn ($page) => $page
            ->component('Tickets/Index')
            ->has('tickets.data', 1)
            ->where('tickets.data.0.title', 'Specific Problem')
        );
    });

    it('can view create ticket page', function () {
        $response = $this->get(route('tickets-create'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Tickets/Create')
            ->has('categories')
            ->has('priorities')
            ->has('departments')
            ->has('assets')
        );
    });

    it('can store a new ticket', function () {
        $category = TicketCategory::factory()->create();
        $priority = Priority::factory()->create();
        $department = Department::factory()->create();
        $asset = Asset::factory()->create();

        $data = [
            'title' => 'New Test Ticket',
            'description' => 'Test Description',
            'category_id' => $category->id,
            'priority_id' => $priority->id,
            'department_id' => $department->id,
            'asset_id' => $asset->id,
        ];

        $response = $this->post(route('tickets-store'), $data);

        $ticket = Ticket::first();
        $response->assertRedirect(route('tickets-show', $ticket->id));

        $this->assertDatabaseHas('tickets', [
            'title' => 'New Test Ticket',
            'description' => 'Test Description',
            'reporter_id' => $this->user->id,
        ]);
    });

    it('can view ticket details', function () {
        $ticket = Ticket::factory()->create();

        $response = $this->get(route('tickets-show', $ticket->id));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Tickets/Show')
            ->where('ticket.id', $ticket->id)
        );
    });

    it('can view ticket edit page', function () {
        $ticket = Ticket::factory()->create();

        $response = $this->get(route('tickets-edit', $ticket->id));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Tickets/Edit')
            ->where('ticket.id', $ticket->id)
        );
    });

    it('can update a ticket', function () {
        $ticket = Ticket::factory()->create();
        $newCategory = TicketCategory::factory()->create();

        $response = $this->put(route('tickets-update', $ticket->id), [
            'title' => 'Updated Title',
            'description' => $ticket->description,
            'category_id' => $newCategory->id,
            'priority_id' => $ticket->priority_id,
        ]);

        $response->assertRedirect(route('tickets-show', $ticket->id));

        $this->assertDatabaseHas('tickets', [
            'id' => $ticket->id,
            'title' => 'Updated Title',
            'category_id' => $newCategory->id,
        ]);
    });

    it('can delete a ticket', function () {
        $ticket = Ticket::factory()->create();

        $response = $this->delete(route('tickets-delete', $ticket->id));

        $response->assertRedirect(route('tickets'));
        $this->assertDatabaseMissing('tickets', ['id' => $ticket->id]);
    });

    it('can assign a ticket', function () {
        $ticket = Ticket::factory()->create();
        $otherUser = User::factory()->create();

        $response = $this->post(route('tickets-assign', $ticket->id), [
            'assigned_to' => $otherUser->id,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('tickets', [
            'id' => $ticket->id,
            'assigned_to' => $otherUser->id,
        ]);
    });

    it('can change ticket status', function () {
        $ticket = Ticket::factory()->create(['status' => 'open']);

        $response = $this->post(route('tickets-status', $ticket->id), [
            'status' => 'triaged',
            'note' => 'Triaging ticket',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('tickets', [
            'id' => $ticket->id,
            'status' => 'triaged',
        ]);

        $this->assertDatabaseHas('ticket_status_logs', [
            'ticket_id' => $ticket->id,
            'to_status' => 'triaged',
            'note' => 'Triaging ticket',
        ]);
    });

    it('can add a comment to a ticket', function () {
        $ticket = Ticket::factory()->create();

        $response = $this->post(route('tickets-comment', $ticket->id), [
            'message' => 'This is a test comment',
            'is_internal' => false,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('ticket_comments', [
            'ticket_id' => $ticket->id,
            'user_id' => $this->user->id,
            'message' => 'This is a test comment',
        ]);
    });
});
