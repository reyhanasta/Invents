import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { helpdeskCreate, helpdeskIndex, helpdeskShow } from '@/routes';
import { BreadcrumbItem, Ticket } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Loader2, Plus, SearchIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AssetPagination } from '../Asset/AssetPagination';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pusat Bantuan',
        href: helpdeskIndex().url,
    },
];

interface TicketsPaginationProps {
    data: Ticket[];
    links: { url: string | null; label: string; active: boolean }[];
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from: number;
    to: number;
}

interface IndexProps {
    tickets: TicketsPaginationProps;
    search?: string;
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

export default function Index({ tickets, search = '' }: IndexProps) {
    const [searchQuery, setSearchQuery] = useState(search);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchQuery !== search) {
                setIsSearching(true);
                router.get(
                    window.location.pathname,
                    { search: searchQuery || undefined },
                    {
                        preserveState: true,
                        preserveScroll: true,
                        replace: true,
                        only: ['tickets'],
                        onFinish: () => setIsSearching(false),
                    },
                );
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchQuery, search]);

    const handleClearSearch = () => {
        setSearchQuery('');
        router.get(window.location.pathname, {}, { only: ['tickets'] });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tiket Saya" />
            <div className="container mx-auto space-y-6 p-4 md:p-6 lg:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Tiket Saya
                        </h1>
                        <p className="text-muted-foreground italic">
                            Daftar permintaan bantuan dan laporan Anda
                        </p>
                    </div>
                    <Button asChild size="lg" className="shadow-lg">
                        <Link href={helpdeskCreate().url}>
                            <Plus className="mr-2 h-4 w-4" />
                            Buat Tiket Baru
                        </Link>
                    </Button>
                </div>

                <div className="flex max-w-md">
                    <InputGroup>
                        <InputGroupInput
                            placeholder="Cari Tiket..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <InputGroupAddon align="inline-end">
                            {isSearching ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : searchQuery ? (
                                <Button
                                    onClick={handleClearSearch}
                                    variant="ghost"
                                    size="icon"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            ) : (
                                <SearchIcon className="h-4 w-4 text-muted-foreground" />
                            )}
                        </InputGroupAddon>
                    </InputGroup>
                </div>

                <div className="overflow-hidden rounded-xl border bg-card/50 shadow-sm backdrop-blur-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Kode Tiket</TableHead>
                                <TableHead>Judul</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Tanggal</TableHead>
                                <TableHead className="text-right">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isSearching ? (
                                Array.from({ length: 3 }).map((_, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell>
                                            <Skeleton className="h-4 w-20" />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton className="h-4 w-40" />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton className="h-6 w-20 rounded-full" />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton className="h-4 w-24" />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Skeleton className="ml-auto h-8 w-8" />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : tickets.data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="h-32 text-center text-muted-foreground"
                                    >
                                        Tidak ada tiket ditemukan.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                tickets.data.map((ticket) => (
                                    <TableRow
                                        key={ticket.id}
                                        className="group transition-colors hover:bg-muted/30"
                                    >
                                        <TableCell className="font-mono font-medium text-primary">
                                            {ticket.ticket_code}
                                        </TableCell>
                                        <TableCell className="font-medium transition-colors group-hover:text-primary">
                                            {ticket.title}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={
                                                    statusConfig[ticket.status]
                                                        ?.color
                                                }
                                            >
                                                {statusConfig[ticket.status]
                                                    ?.label || ticket.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-xs text-muted-foreground">
                                            {new Date(
                                                ticket.created_at,
                                            ).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                asChild
                                            >
                                                <Link
                                                    href={
                                                        helpdeskShow(ticket.id)
                                                            .url
                                                    }
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {tickets.total > tickets.per_page && (
                    <AssetPagination assets={tickets} />
                )}
            </div>
        </AppLayout>
    );
}
