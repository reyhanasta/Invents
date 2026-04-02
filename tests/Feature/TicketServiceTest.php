<?php

use App\Models\Priority;
use App\Models\Ticket;
use App\Models\TicketCategory;
use App\Models\User;
use App\Services\TicketService;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->service = app(TicketService::class);
    $this->user = User::factory()->create();
});

describe('Ticket Service Logic', function () {
    it('can create a ticket via service', function () {
        $category = TicketCategory::factory()->create();
        $priority = Priority::factory()->create();

        $data = [
            'title' => 'Service Created Ticket',
            'description' => 'Description here',
            'reporter_id' => $this->user->id,
            'category_id' => $category->id,
            'priority_id' => $priority->id,
        ];

        $ticket = $this->service->create($data);

        expect($ticket)->toBeInstanceOf(Ticket::class);
        expect($ticket->ticket_code)->toStartWith('TCK-'.now()->year);
        expect($ticket->status)->toBe(Ticket::STATUS_OPEN);

        $this->assertDatabaseHas('ticket_status_logs', [
            'ticket_id' => $ticket->id,
            'to_status' => Ticket::STATUS_OPEN,
            'note' => 'Ticket created',
        ]);
    });

    it('auto triages when assigned if status is open', function () {
        $ticket = Ticket::factory()->create(['status' => 'open', 'assigned_to' => null]);
        $assignee = User::factory()->create();

        $this->service->assign($ticket, $assignee->id, $this->user->id);

        $ticket->refresh();
        expect($ticket->assigned_to)->toBe($assignee->id);
        expect($ticket->status)->toBe(Ticket::STATUS_TRIAGED);

        $this->assertDatabaseHas('ticket_status_logs', [
            'ticket_id' => $ticket->id,
            'to_status' => Ticket::STATUS_TRIAGED,
            'note' => 'Auto triaged on assign',
        ]);
    });

    it('validates status transitions', function () {
        $ticket = Ticket::factory()->create(['status' => 'open']);

        // Invalid: open -> in_progress
        expect(fn () => $this->service->changeStatus($ticket, 'in_progress', $this->user->id))
            ->toThrow(DomainException::class, 'Invalid status transition: open → in_progress');

        // Valid: open -> triaged
        $this->service->changeStatus($ticket, 'triaged', $this->user->id);
        expect($ticket->fresh()->status)->toBe('triaged');
    });

    it('sets resolved_at when status changes to resolved', function () {
        $ticket = Ticket::factory()->create(['status' => 'in_progress']);

        $this->service->changeStatus($ticket, 'resolved', $this->user->id);

        expect($ticket->fresh()->resolved_at)->not->toBeNull();
    });

    it('sets closed_at when status changes to closed', function () {
        $ticket = Ticket::factory()->create(['status' => 'resolved']);

        $this->service->changeStatus($ticket, 'closed', $this->user->id);

        expect($ticket->fresh()->closed_at)->not->toBeNull();
    });

    it('can add a comment', function () {
        $ticket = Ticket::factory()->create();

        $comment = $this->service->addComment($ticket, $this->user->id, 'Hello world', true);

        expect($comment->message)->toBe('Hello world');
        expect($comment->is_internal)->toBeTrue();
    });
});
