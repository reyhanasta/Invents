<?php

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
    $this->actingAs($this->user);
});

describe('Helpdesk Client Experience', function () {
    it('only shows user own tickets', function () {
        Ticket::factory()->create(['reporter_id' => $this->user->id, 'title' => 'My Ticket']);
        Ticket::factory()->create(['reporter_id' => User::factory()->create()->id, 'title' => 'Other Ticket']);

        $response = $this->get(route('helpdesk-index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Helpdesk/Index')
            ->has('tickets.data', 1)
            ->where('tickets.data.0.title', 'My Ticket')
        );
    });

    it('can view create ticket page in helpdesk', function () {
        $response = $this->get(route('helpdesk-create'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Helpdesk/Create')
            ->has('categories')
            ->has('priorities')
            ->has('assets')
        );
    });

    it('can store a new ticket from helpdesk', function () {
        $category = TicketCategory::factory()->create();
        $priority = Priority::factory()->create();

        $data = [
            'title' => 'Helpdesk Ticket',
            'description' => 'Tested helpdesk store',
            'category_id' => $category->id,
            'priority_id' => $priority->id,
        ];

        $response = $this->post(route('helpdesk-store'), $data);

        $ticket = Ticket::where('title', 'Helpdesk Ticket')->first();
        $response->assertRedirect(route('helpdesk-show', $ticket->id));

        $this->assertDatabaseHas('tickets', [
            'title' => 'Helpdesk Ticket',
            'reporter_id' => $this->user->id,
            'source' => 'web_helpdesk',
        ]);
    });

    it('cannot view other user ticket details', function () {
        $otherTicket = Ticket::factory()->create(['reporter_id' => User::factory()->create()->id]);

        $response = $this->get(route('helpdesk-show', $otherTicket->id));

        $response->assertStatus(403);
    });

    it('can add comment to own ticket', function () {
        $ticket = Ticket::factory()->create(['reporter_id' => $this->user->id]);

        $response = $this->post(route('helpdesk-comment', $ticket->id), [
            'message' => 'User comment',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('ticket_comments', [
            'ticket_id' => $ticket->id,
            'message' => 'User comment',
            'is_internal' => false,
        ]);
    });

    it('cannot add comment to other user ticket', function () {
        $otherTicket = Ticket::factory()->create(['reporter_id' => User::factory()->create()->id]);

        $response = $this->post(route('helpdesk-comment', $otherTicket->id), [
            'message' => 'Spy comment',
        ]);

        $response->assertStatus(403);
    });
});
