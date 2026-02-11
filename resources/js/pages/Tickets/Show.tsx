import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import {
    tickets,
    ticketsAssign,
    ticketsComment,
    ticketsEdit,
    ticketsStatus,
} from '@/routes';
import { BreadcrumbItem, SharedData, Ticket, User as UserType } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowLeft,
    Calendar,
    CheckCircle2,
    Clock,
    FileText,
    History,
    MessageSquare,
    MoreVertical,
    Paperclip,
    Pencil,
    Send,
    User,
    UserPlus,
} from 'lucide-react';
import { toast } from 'sonner';

interface TicketShowProps {
    ticket: Ticket;
    available_assignees: UserType[];
}

const breadcrumbs = (ticket: Ticket): BreadcrumbItem[] => [
    {
        title: 'Tickets',
        href: tickets().url,
    },
    {
        title: ticket.ticket_code,
        href: '#',
    },
];

const statusConfig: Record<
    string,
    { label: string; color: string; icon: React.ElementType }
> = {
    open: {
        label: 'Open',
        color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
        icon: AlertCircle,
    },
    triaged: {
        label: 'Triaged',
        color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        icon: Clock,
    },
    in_progress: {
        label: 'In Progress',
        color: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
        icon: Clock,
    },
    pending: {
        label: 'Pending',
        color: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
        icon: Clock,
    },
    resolved: {
        label: 'Resolved',
        color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
        icon: CheckCircle2,
    },
    closed: {
        label: 'Closed',
        color: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
        icon: CheckCircle2,
    },
    rejected: {
        label: 'Rejected',
        color: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
        icon: AlertCircle,
    },
};

const priorityConfig: Record<string, { label: string; color: string }> = {
    Low: { label: 'Low', color: 'bg-blue-500' },
    Medium: { label: 'Medium', color: 'bg-amber-500' },
    High: { label: 'High', color: 'bg-rose-500' },
    Urgent: { label: 'Urgent', color: 'bg-red-600 animate-pulse' },
};

export default function Show({ ticket, available_assignees }: TicketShowProps) {
    const { auth } = usePage<SharedData>().props;

    const commentForm = useForm({
        message: '',
        is_internal: false,
    });

    const currentStatus = statusConfig[ticket.status] || {
        label: ticket.status,
        color: '',
        icon: AlertCircle,
    };
    const priority = priorityConfig[ticket.priority?.name || ''] || {
        label: ticket.priority?.name || '-',
        color: 'bg-slate-500',
    };

    const formatDate = (date: string | null | undefined) => {
        if (!date) return '-';
        return new Intl.DateTimeFormat('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(date));
    };

    const handleStatusChange = (newStatus: string) => {
        router.post(
            ticketsStatus(ticket.id).url,
            {
                status: newStatus,
                note: `Status manually changed to ${newStatus}`,
            },
            {
                onStart: () => toast.loading('Memperbarui status...'),
                onSuccess: () => {
                    toast.dismiss();
                    toast.success('Status berhasil diperbarui!');
                },
                onError: () => {
                    toast.dismiss();
                    toast.error('Gagal memperbarui status.');
                },
            },
        );
    };

    const handleAssign = (userId: number) => {
        router.post(
            ticketsAssign(ticket.id).url,
            {
                assigned_to: userId,
            },
            {
                onStart: () => toast.loading('Menugaskan petugas...'),
                onSuccess: () => {
                    toast.dismiss();
                    toast.success('Petugas berhasil ditugaskan!');
                },
                onError: () => {
                    toast.dismiss();
                    toast.error('Gagal menugaskan petugas.');
                },
            },
        );
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        commentForm.post(ticketsComment(ticket.id).url, {
            onStart: () => toast.loading('Mengirim komentar...'),
            onSuccess: () => {
                toast.dismiss();
                toast.success('Komentar berhasil dikirim!');
                commentForm.reset('message');
            },
            onError: () => {
                toast.dismiss();
                toast.error('Gagal mengirim komentar.');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs(ticket)}>
            <Head title={`Ticket Detail - ${ticket.ticket_code}`} />

            <div className="container mx-auto space-y-6 p-4 md:p-6 lg:p-8">
                {/* Top Action Bar */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="icon" asChild>
                            <Link href={tickets().url}>
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold">
                                    {ticket.ticket_code}
                                </h1>
                                <Badge
                                    variant="outline"
                                    className={`${currentStatus.color} border px-2 py-0.5`}
                                >
                                    <currentStatus.icon className="mr-1 h-3 w-3" />
                                    {currentStatus.label}
                                </Badge>
                                <Badge
                                    className={`${priority.color} border-none text-white`}
                                >
                                    {priority.label}
                                </Badge>
                            </div>
                            <p className="line-clamp-1 text-muted-foreground">
                                {ticket.title}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" asChild>
                            <Link href={ticketsEdit(ticket.id).url}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Ubah
                            </Link>
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    Status
                                    <MoreVertical className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    Ubah Status
                                </DropdownMenuLabel>
                                {[
                                    'open',
                                    'triaged',
                                    'in_progress',
                                    'pending',
                                    'resolved',
                                    'closed',
                                    'rejected',
                                ].map((s) => (
                                    <DropdownMenuItem
                                        key={s}
                                        disabled={s === ticket.status}
                                        onSelect={() => handleStatusChange(s)}
                                    >
                                        {s
                                            .replace('_', ' ')
                                            .charAt(0)
                                            .toUpperCase() +
                                            s.replace('_', ' ').slice(1)}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left Column: Details & Comments */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Description */}
                        <Card className="border-none bg-card/50 shadow-sm backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Deskripsi Masalah
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                                <p className="leading-relaxed whitespace-pre-wrap text-foreground/90">
                                    {ticket.description}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Comments */}
                        <Card className="border-none bg-card/50 shadow-sm backdrop-blur-sm">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <MessageSquare className="h-5 w-5 text-primary" />
                                    <CardTitle className="text-lg">
                                        Komentar & Diskusi
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Comment List */}
                                <div className="space-y-4">
                                    {!ticket.comments ||
                                    ticket.comments.length === 0 ? (
                                        <div className="rounded-lg border-2 border-dashed py-10 text-center text-muted-foreground">
                                            <MessageSquare className="mx-auto mb-2 h-10 w-10 opacity-20" />
                                            <p>
                                                Belum ada komentar untuk tiket
                                                ini.
                                            </p>
                                        </div>
                                    ) : (
                                        ticket.comments.map((comment) => (
                                            <div
                                                key={comment.id}
                                                className={`flex gap-3 ${comment.user_id === auth.user.id ? 'flex-row-reverse' : ''}`}
                                            >
                                                <div
                                                    className={`flex-1 space-y-1 ${comment.user_id === auth.user.id ? 'text-right' : ''}`}
                                                >
                                                    <div
                                                        className={`mb-1 flex items-center gap-2 ${comment.user_id === auth.user.id ? 'justify-end' : 'justify-start'}`}
                                                    >
                                                        <span className="text-sm font-semibold">
                                                            {comment.user?.name}
                                                        </span>
                                                        <span className="text-[10px] text-muted-foreground">
                                                            {formatDate(
                                                                comment.created_at,
                                                            )}
                                                        </span>
                                                        {comment.is_internal && (
                                                            <Badge
                                                                variant="secondary"
                                                                className="h-4 text-[8px]"
                                                            >
                                                                INTERNAL
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <div
                                                        className={`inline-block rounded-2xl p-3 text-sm ${
                                                            comment.user_id ===
                                                            auth.user.id
                                                                ? 'rounded-tr-none bg-primary text-primary-foreground'
                                                                : 'rounded-tl-none bg-muted'
                                                        }`}
                                                    >
                                                        {comment.message}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <Separator />

                                {/* New Comment Form */}
                                <form
                                    onSubmit={handleCommentSubmit}
                                    className="space-y-3"
                                >
                                    <Textarea
                                        value={commentForm.data.message}
                                        onChange={(e) =>
                                            commentForm.setData(
                                                'message',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Tulis pesan Anda di sini..."
                                        className="min-h-24 resize-none focus:ring-primary/20"
                                        required
                                        disabled={commentForm.processing}
                                    />
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        commentForm.data
                                                            .is_internal
                                                    }
                                                    onChange={(e) =>
                                                        commentForm.setData(
                                                            'is_internal',
                                                            e.target.checked,
                                                        )
                                                    }
                                                    className="rounded border-muted"
                                                />
                                                Pesan Internal
                                            </label>
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={commentForm.processing}
                                        >
                                            <Send className="mr-2 h-4 w-4" />
                                            Kirim Komentar
                                        </Button>
                                    </div>
                                    {commentForm.errors.message && (
                                        <p className="text-xs text-destructive">
                                            {commentForm.errors.message}
                                        </p>
                                    )}
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Metadata & History */}
                    <div className="space-y-4">
                        {/* Info Card */}
                        <Card className="overflow-hidden border-none bg-card/50 shadow-sm backdrop-blur-sm">
                            <CardHeader className="">
                                <CardTitle className="flex flex-row items-center text-sm tracking-wider uppercase">
                                    <FileText className="mr-2 h-4 w-4" /> Detail
                                    Tiket
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-1">
                                    <Label className="text-xs text-primary">
                                        Reporter
                                    </Label>
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                            <User className="h-4 w-4 text-primary" />
                                        </div>
                                        <span className="text-sm font-medium">
                                            {ticket.reporter?.name}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <Label className="text-xs text-primary">
                                        Petugas (Assignee)
                                    </Label>
                                    <div className="flex items-center gap-2">
                                        {ticket.assignee ? (
                                            <>
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10">
                                                    <User className="h-4 w-4 text-blue-500" />
                                                </div>
                                                <span className="text-sm font-medium">
                                                    {ticket.assignee.name}
                                                </span>
                                            </>
                                        ) : (
                                            <span className="flex items-center gap-2 text-sm text-primary italic">
                                                <UserPlus className="h-4 w-4" />
                                                Belum ditugaskan
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-2 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="link"
                                                    size="sm"
                                                    className="h-auto p-0 text-xs text-primary"
                                                >
                                                    Ubah Petugas
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                align="end"
                                                className="w-56"
                                            >
                                                <DropdownMenuLabel>
                                                    Pilih Petugas
                                                </DropdownMenuLabel>
                                                <Separator />
                                                {available_assignees.map(
                                                    (user) => (
                                                        <DropdownMenuItem
                                                            key={user.id}
                                                            onSelect={() =>
                                                                handleAssign(
                                                                    user.id,
                                                                )
                                                            }
                                                        >
                                                            {user.name}
                                                        </DropdownMenuItem>
                                                    ),
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>

                                <Separator />

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <Label className="text-xs text-muted-foreground">
                                            Kategori
                                        </Label>
                                        <p className="text-sm font-medium">
                                            {ticket.category?.name || '-'}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs text-muted-foreground">
                                            Departemen
                                        </Label>
                                        <p className="text-sm font-medium">
                                            {ticket.department?.name || '-'}
                                        </p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="flex items-center gap-1 text-muted-foreground">
                                            <Calendar className="h-3 w-3" />{' '}
                                            Dibuat
                                        </span>
                                        <span className="font-medium">
                                            {formatDate(ticket.created_at)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="flex items-center gap-1 text-muted-foreground">
                                            <Clock className="h-3 w-3" /> Batas
                                            Waktu
                                        </span>
                                        <span className="font-medium">
                                            {formatDate(ticket.due_at)}
                                        </span>
                                    </div>
                                    {ticket.resolved_at && (
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="flex items-center gap-1 text-emerald-500">
                                                <CheckCircle2 className="h-3 w-3" />{' '}
                                                Selesai
                                            </span>
                                            <span className="font-medium">
                                                {formatDate(ticket.resolved_at)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Asset Info Card */}
                        {ticket.asset && (
                            <Card className="border-none bg-card/50 shadow-sm backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                                        <History className="h-4 w-4" />
                                        Asset Terkait
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-bold">
                                                {ticket.asset.asset_name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {ticket.asset.asset_code}
                                            </p>
                                        </div>
                                        <Badge variant="outline">
                                            {ticket.asset.condition}
                                        </Badge>
                                    </div>
                                    <Button
                                        variant="secondary"
                                        className="w-full"
                                        onClick={() =>
                                            router.visit(
                                                `/maintenances/create?ticket_id=${ticket.id}`,
                                            )
                                        }
                                    >
                                        <Calendar className="mr-2 h-4 w-4" />
                                        Jadwalkan Maintenance
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {/* Attachments Card */}
                        <Card className="border-none bg-card/50 shadow-sm backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                                    <Paperclip className="h-4 w-4" />
                                    Lampiran
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {!ticket.attachments ||
                                ticket.attachments.length === 0 ? (
                                    <p className="text-xs text-muted-foreground italic">
                                        Tidak ada lampiran.
                                    </p>
                                ) : (
                                    ticket.attachments.map((file) => (
                                        <div
                                            key={file.id}
                                            className="group flex cursor-pointer items-center justify-between rounded-lg bg-muted/40 p-2 transition-colors hover:bg-muted/60"
                                        >
                                            <div className="flex min-w-0 items-center gap-2">
                                                <Paperclip className="h-3 w-3 shrink-0 text-muted-foreground" />
                                                <span className="truncate text-xs font-medium">
                                                    {file.file_name}
                                                </span>
                                            </div>
                                            <span className="text-[10px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                                                Unduh
                                            </span>
                                        </div>
                                    ))
                                )}
                            </CardContent>
                        </Card>

                        {/* History Log */}
                        <Card className="overflow-hidden border-none bg-card/50 shadow-sm backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                                    <History className="h-4 w-4" />
                                    Riwayat Aktivitas
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="custom-scrollbar max-h-75 space-y-4 overflow-y-auto pr-2">
                                {ticket.status_logs?.map((log) => (
                                    <div
                                        key={log.id}
                                        className="relative border-l-2 border-primary/20 pb-4 pl-4 last:pb-0"
                                    >
                                        <div className="absolute top-0 left-[-5px] h-2 w-2 rounded-full bg-primary" />
                                        <div className="mb-1 text-[10px] text-muted-foreground">
                                            {formatDate(log.created_at)}
                                        </div>
                                        <p className="text-xs leading-normal font-medium">
                                            {log.note ||
                                                `Status berubah ke ${log.to_status}`}
                                        </p>
                                        <p className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                                            <User className="h-2.5 w-2.5" />{' '}
                                            {log.changer?.name}
                                        </p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
