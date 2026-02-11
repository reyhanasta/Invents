<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Models\Asset;
use App\Models\Department;
use App\Models\Priority;
use App\Models\Ticket;
use App\Models\TicketCategory;
use App\Models\User;
use App\Services\TicketService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TicketController extends Controller
{
    protected $ticketService;

    public function __construct(TicketService $ticketService)
    {
        $this->ticketService = $ticketService;
    }

    public function index(Request $request)
    {
        $tickets = Ticket::query()
            ->with(['reporter', 'assignee', 'category', 'priority'])
            ->when($request->search, function ($query) use ($request) {
                $query->where('ticket_code', 'like', "%{$request->search}%")
                    ->orWhere('title', 'like', "%{$request->search}%")
                    ->orWhere('description', 'like', "%{$request->search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Tickets/Index', [
            'tickets' => $tickets,
            'search' => $request->input('search')
        ]);
    }

    public function create()
    {
        return Inertia::render('Tickets/Create', [
            'categories' => TicketCategory::where('is_active', true)->get(),
            'priorities' => Priority::orderBy('level')->get(),
            'departments' => Department::all(),
            'assets' => Asset::select('id', 'asset_name', 'asset_code')->get(),
        ]);
    }

    public function store(StoreTicketRequest $request)
    {
        $data = $request->validated();
        $data['reporter_id'] = Auth::id();

        $ticket = $this->ticketService->create($data);

        return to_route('tickets-show', $ticket->id)
            ->with('success', 'Ticket created successfully.');
    }

    public function show(Ticket $ticket)
    {
        $ticket->load(['reporter', 'assignee', 'category', 'priority', 'department', 'asset', 'comments.user', 'attachments', 'statusLogs.changer']);

        return Inertia::render('Tickets/Show', [
            'ticket' => $ticket,
            'available_assignees' => User::all(), // You might want to filter this
        ]);
    }

    public function edit(Ticket $ticket)
    {
        return Inertia::render('Tickets/Edit', [
            'ticket' => $ticket,
            'categories' => TicketCategory::where('is_active', true)->get(),
            'priorities' => Priority::orderBy('level')->get(),
            'departments' => Department::all(),
            'assets' => Asset::select('id', 'asset_name', 'asset_code')->get(),
        ]);
    }

    public function update(UpdateTicketRequest $request, Ticket $ticket)
    {
        $ticket->update($request->validated());

        return to_route('tickets-show', $ticket->id)
            ->with('success', 'Ticket updated successfully.');
    }

    public function destroy(Ticket $ticket)
    {
        $ticket->delete();

        return to_route('tickets')
            ->with('success', 'Ticket deleted successfully.');
    }

    // Service-backed actions

    public function assign(Request $request, Ticket $ticket)
    {
        $request->validate([
            'assigned_to' => 'required|exists:users,id',
        ]);

        $this->ticketService->assign($ticket, $request->assigned_to, Auth::id());

        return back()->with('success', 'Ticket assigned successfully.');
    }

    public function changeStatus(Request $request, Ticket $ticket)
    {
        $request->validate([
            'status' => 'required|string',
            'note' => 'nullable|string',
        ]);

        try {
            $this->ticketService->changeStatus($ticket, $request->status, Auth::id(), $request->note);
            return back()->with('success', 'Status changed successfully.');
        } catch (\DomainException $e) {
            return back()->withErrors(['status' => $e->getMessage()]);
        }
    }

    public function addComment(Request $request, Ticket $ticket)
    {
        $request->validate([
            'message' => 'required|string',
            'is_internal' => 'boolean',
        ]);

        $this->ticketService->addComment(
            $ticket,
            Auth::id(),
            $request->message,
            $request->is_internal ?? false
        );

        return back()->with('success', 'Comment added successfully.');
    }
}
