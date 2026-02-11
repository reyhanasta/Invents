import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { helpdeskComment, helpdeskIndex } from '@/routes';
import { BreadcrumbItem, SharedData, Ticket } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    Loader2,
    MessageSquare,
    Send,
} from 'lucide-react';
import { toast } from 'sonner';

interface ShowProps {
    ticket: Ticket;
}

const statusConfig: Record<string, { label: string; color: string }> = {
    open: {
        label: 'Terbuka',
        color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    },
    triaged: {
        label: 'Diterima',
        color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    },
    in_progress: {
        label: 'Diproses',
        color: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    },
    pending: {
        label: 'Menunggu',
        color: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    },
    resolved: {
        label: 'Selesai',
        color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
    },
    closed: {
        label: 'Ditutup',
        color: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
    },
    rejected: {
        label: 'Ditolak',
        color: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    },
};

export default function Show({ ticket }: ShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Pusat Bantuan', href: helpdeskIndex().url },
        { title: ticket.ticket_code, href: '#' },
    ];

    const { auth } = usePage<SharedData>().props;

    const { data, setData, post, processing, reset, errors } = useForm({
        message: '',
    });

    const submitComment = (e: React.FormEvent) => {
        e.preventDefault();
        post(helpdeskComment(ticket.id).url, {
            onStart: () => toast.loading('Mengirim pesan...'),
            onSuccess: () => {
                toast.dismiss();
                reset('message');
            },
            onError: () => {
                toast.dismiss();
                toast.error('Gagal mengirim pesan.', {
                    description: errors.message || 'Terjadi kesalahan.',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Tiket - ${ticket.ticket_code}`} />

            <div className="container mx-auto p-4 md:p-6 lg:p-8">
                <Button variant="ghost" className="mb-4 -ml-4" asChild>
                    <a href={helpdeskIndex().url}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali ke Daftar
                    </a>
                </Button>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                        {/* Main Info */}
                        <Card className="border-none bg-card/50 shadow-sm backdrop-blur-sm">
                            <CardHeader>
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="font-mono font-bold text-primary">
                                        {ticket.ticket_code}
                                    </span>
                                    <Badge
                                        className={
                                            statusConfig[ticket.status]?.color
                                        }
                                        variant="outline"
                                    >
                                        {statusConfig[ticket.status]?.label ||
                                            ticket.status}
                                    </Badge>
                                </div>
                                <CardTitle className="text-2xl">
                                    {ticket.title}
                                </CardTitle>
                                <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />{' '}
                                        {new Date(
                                            ticket.created_at,
                                        ).toLocaleDateString()}
                                    </span>
                                    {ticket.category && (
                                        <span className="border-l pl-4">
                                            Kategori: {ticket.category.name}
                                        </span>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="prose dark:prose-invert max-w-none">
                                <p className="whitespace-pre-wrap text-foreground/80">
                                    {ticket.description}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Conversations */}
                        <Card className="border-none bg-card/50 shadow-sm backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <MessageSquare className="h-5 w-5" />{' '}
                                    Percakapan
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    {ticket.comments?.map((comment) => (
                                        <div
                                            key={comment.id}
                                            className={`flex flex-col ${comment.user_id === auth.user.id ? 'items-end' : 'items-start'}`}
                                        >
                                            <div
                                                className={`max-w-[80%] rounded-2xl p-4 ${comment.user_id === auth.user.id ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                                            >
                                                <p className="text-sm whitespace-pre-wrap">
                                                    {comment.message}
                                                </p>
                                            </div>
                                            <span className="mt-1 px-2 text-[10px] text-muted-foreground">
                                                {comment.user?.name} •{' '}
                                                {new Date(
                                                    comment.created_at,
                                                ).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t pt-4">
                                    <form
                                        onSubmit={submitComment}
                                        className="space-y-3"
                                    >
                                        <Textarea
                                            value={data.message}
                                            onChange={(e) =>
                                                setData(
                                                    'message',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Tulis balasan atau pertanyaan Anda di sini..."
                                            className="min-h-25 bg-background/50"
                                            required
                                            disabled={processing}
                                        />
                                        <div className="flex justify-end">
                                            <Button
                                                type="submit"
                                                disabled={
                                                    processing ||
                                                    !data.message.trim()
                                                }
                                            >
                                                {processing ? (
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Send className="mr-2 h-4 w-4" />
                                                )}
                                                Balas
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        {/* Status/Metadata Card */}
                        <Card className="border-none bg-card/50 shadow-sm backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                    Detail Pendukung
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-1">
                                    <Label className="text-[10px] font-bold text-primary uppercase">
                                        Prioritas
                                    </Label>
                                    <p className="text-sm font-medium">
                                        {ticket.priority?.name || '-'}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-[10px] font-bold text-primary uppercase">
                                        Aset Terkait
                                    </Label>
                                    <p className="text-sm font-medium">
                                        {ticket.asset
                                            ? `${ticket.asset.asset_code} - ${ticket.asset.asset_name}`
                                            : 'Tidak ada aset'}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-[10px] font-bold text-primary uppercase">
                                        Petugas
                                    </Label>
                                    <p className="text-sm font-medium text-muted-foreground italic">
                                        {ticket.assignee?.name ||
                                            'Belum ditugaskan'}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
