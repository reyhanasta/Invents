<?php

namespace App\Services;

use App\Models\Ticket;
use App\Models\TicketComment;
use App\Models\TicketAttachment;
use App\Models\TicketStatusLog;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TicketService
{
    /*
    |--------------------------------------------------------------------------
    | CREATE TICKET
    |--------------------------------------------------------------------------
    */

    public function create(array $data): Ticket
    {
        return DB::transaction(function () use ($data) {

            $ticket = Ticket::create([
                'ticket_code'   => $this->generateTicketCode(),
                'title'         => $data['title'],
                'description'   => $data['description'],
                'reporter_id'   => $data['reporter_id'],
                'category_id'   => $data['category_id'],
                'priority_id'   => $data['priority_id'],
                'department_id' => $data['department_id'] ?? null,
                'asset_id'      => $data['asset_id'] ?? null,
                'status'        => Ticket::STATUS_OPEN,
                'source'        => $data['source'] ?? 'web',
                'due_at'        => $data['due_at'] ?? null,
            ]);

            $this->logStatus(
                ticket: $ticket,
                from: null,
                to: Ticket::STATUS_OPEN,
                userId: $data['reporter_id'],
                note: 'Ticket created'
            );

            return $ticket;
        });
    }

    /*
    |--------------------------------------------------------------------------
    | ASSIGN
    |--------------------------------------------------------------------------
    */

    public function assign(Ticket $ticket, int $assigneeId, int $byUserId): Ticket
    {
        return DB::transaction(function () use ($ticket, $assigneeId, $byUserId) {

            $ticket->update([
                'assigned_to' => $assigneeId,
            ]);

            // auto triaged if still open
            if ($ticket->status === Ticket::STATUS_OPEN) {
                $this->changeStatus(
                    ticket: $ticket,
                    to: Ticket::STATUS_TRIAGED,
                    byUserId: $byUserId,
                    note: 'Auto triaged on assign'
                );
            }

            return $ticket->fresh();
        });
    }

    /*
    |--------------------------------------------------------------------------
    | CHANGE STATUS
    |--------------------------------------------------------------------------
    */

    public function changeStatus(
        Ticket $ticket,
        string $to,
        int $byUserId,
        ?string $note = null
    ): Ticket {
        $from = $ticket->status;

        if (!$this->isValidTransition($from, $to)) {
            throw new \DomainException("Invalid status transition: $from → $to");
        }

        return DB::transaction(function () use ($ticket, $from, $to, $byUserId, $note) {

            $ticket->status = $to;

            if ($to === Ticket::STATUS_RESOLVED) {
                $ticket->resolved_at = now();
            }

            if ($to === Ticket::STATUS_CLOSED) {
                $ticket->closed_at = now();
            }

            $ticket->save();

            $this->logStatus($ticket, $from, $to, $byUserId, $note);

            return $ticket->fresh();
        });
    }

    /*
    |--------------------------------------------------------------------------
    | COMMENT
    |--------------------------------------------------------------------------
    */

    public function addComment(
        Ticket $ticket,
        int $userId,
        string $message,
        bool $internal = false
    ): TicketComment {
        return TicketComment::create([
            'ticket_id'   => $ticket->id,
            'user_id'     => $userId,
            'message'     => $message,
            'is_internal' => $internal,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | ATTACHMENT META (file already stored)
    |--------------------------------------------------------------------------
    */

    public function addAttachment(
        Ticket $ticket,
        int $userId,
        array $fileMeta
    ): TicketAttachment {
        return TicketAttachment::create([
            'ticket_id'   => $ticket->id,
            'uploaded_by' => $userId,
            'file_name'   => $fileMeta['name'],
            'file_path'   => $fileMeta['path'],
            'file_size'   => $fileMeta['size'] ?? null,
            'mime_type'   => $fileMeta['mime'] ?? null,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | STATUS LOG
    |--------------------------------------------------------------------------
    */

    protected function logStatus(
        Ticket $ticket,
        ?string $from,
        string $to,
        int $userId,
        ?string $note
    ): void {
        TicketStatusLog::create([
            'ticket_id'  => $ticket->id,
            'from_status'=> $from,
            'to_status'  => $to,
            'changed_by' => $userId,
            'note'       => $note,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | TICKET CODE
    |--------------------------------------------------------------------------
    */

    protected function generateTicketCode(): string
    {
        $year = now()->year;

        $last = Ticket::whereYear('created_at', $year)
            ->lockForUpdate()
            ->count() + 1;

        return sprintf('TCK-%s-%06d', $year, $last);
    }

    /*
    |--------------------------------------------------------------------------
    | STATUS FLOW RULE (MVP)
    |--------------------------------------------------------------------------
    */

    protected function isValidTransition(string $from, string $to): bool
    {
        $map = [
            Ticket::STATUS_OPEN => [
                Ticket::STATUS_TRIAGED,
                Ticket::STATUS_REJECTED,
            ],

            Ticket::STATUS_TRIAGED => [
                Ticket::STATUS_IN_PROGRESS,
                Ticket::STATUS_PENDING,
            ],

            Ticket::STATUS_IN_PROGRESS => [
                Ticket::STATUS_PENDING,
                Ticket::STATUS_RESOLVED,
            ],

            Ticket::STATUS_PENDING => [
                Ticket::STATUS_IN_PROGRESS,
                Ticket::STATUS_RESOLVED,
            ],

            Ticket::STATUS_RESOLVED => [
                Ticket::STATUS_CLOSED,
            ],
        ];

        return in_array($to, $map[$from] ?? [], true);
    }
}
