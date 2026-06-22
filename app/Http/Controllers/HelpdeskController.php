<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTicketRequest;
use App\Models\Asset;
use App\Models\Priority;
use App\Models\Ticket;
use App\Models\TicketCategory;
use App\Services\TicketService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HelpdeskController extends Controller
{
    protected $ticketService;

    public function __construct(TicketService $ticketService)
    {
        $this->ticketService = $ticketService;
    }

    public function index(Request $request)
    {
        $tickets = Ticket::query()
            ->where('reporter_id', Auth::id())
            ->with(['reporter', 'assignee', 'category', 'priority'])
            ->when($request->search, function ($query) use ($request) {
                $query->where(function ($q) use ($request) {
                    $q->where('ticket_code', 'like', "%{$request->search}%")
                        ->orWhere('title', 'like', "%{$request->search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Helpdesk/Index', [
            'tickets' => $tickets,
            'search' => $request->input('search'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Helpdesk/Create', [
            'categories' => TicketCategory::where('is_active', true)->get(),
            'priorities' => Priority::orderBy('level')->get(),
            'assets' => Asset::select('id', 'asset_name', 'asset_code')->get(),
        ]);
    }

    public function store(StoreTicketRequest $request)
    {
        $data = $request->validated();
        $data['reporter_id'] = Auth::id();
        $data['source'] = 'web_helpdesk';

        $ticket = $this->ticketService->create($data);

        return to_route('helpdesk-show', $ticket->id)
            ->with('success', 'Tiket Anda berhasil dikirim.');
    }

    public function show(Ticket $ticket)
    {
        // Ensure user can only see their own tickets
        if ($ticket->reporter_id !== Auth::id()) {
            abort(403);
        }

        $ticket->load(['reporter', 'assignee', 'category', 'priority', 'asset', 'comments' => function ($q) {
            $q->where('is_internal', false)->with('user');
        }, 'attachments']);

        return Inertia::render('Helpdesk/Show', [
            'ticket' => $ticket,
        ]);
    }

    public function addComment(Request $request, Ticket $ticket)
    {
        if ($ticket->reporter_id !== Auth::id()) {
            abort(403);
        }

        $request->validate([
            'message' => 'required|string',
        ]);

        $this->ticketService->addComment(
            $ticket,
            Auth::id(),
            $request->message,
            false // Forced non-internal
        );

        return back()->with('success', 'Pesan berhasil dikirim.');
    }
}
