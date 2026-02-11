import EmptySearch from '@/components/empty-search';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import {
    tickets,
    ticketsCreate,
    ticketsDelete,
    ticketsEdit,
    ticketsShow,
} from '@/routes';
import { BreadcrumbItem, Ticket } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import {
    Calendar,
    Eye,
    Loader2,
    MoreHorizontalIcon,
    Pencil,
    Plus,
    SearchIcon,
    Trash,
    User,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { AssetPagination } from '../Asset/AssetPagination';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tickets',
        href: tickets().url,
    },
];

interface PaginationLinksProps {
    url: string | null;
    label: string;
    active: boolean;
}

interface TicketsPaginationProps {
    data: Ticket[];
    links: PaginationLinksProps[];
    first_page_url: string;
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}
interface TicketsIndexProps {
    tickets: TicketsPaginationProps;
    search?: string;
}

const statusConfig: Record<string, { label: string; color: string }> = {
    open: {
        label: 'Open',
        color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    },
    triaged: {
        label: 'Triaged',
        color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    },
    in_progress: {
        label: 'In Progress',
        color: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    },
    pending: {
        label: 'Pending',
        color: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    },
    resolved: {
        label: 'Resolved',
        color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
    },
    closed: {
        label: 'Closed',
        color: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
    },
    rejected: {
        label: 'Rejected',
        color: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    },
};

const priorityConfig: Record<string, { label: string; color: string }> = {
    High: { label: 'High', color: 'bg-rose-500 text-white' },
    Medium: { label: 'Medium', color: 'bg-amber-500 text-white' },
    Low: { label: 'Low', color: 'bg-blue-500 text-white' },
};

export default function Index({
    tickets: ticketsData,
    search = '',
}: TicketsIndexProps) {
    const [searchQuery, setSearchQuery] = useState(search);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    // Debounce search
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
        setIsSearching(true);
        router.get(
            window.location.pathname,
            {},
            {
                preserveState: true,
                only: ['tickets'],
                onFinish: () => setIsSearching(false),
            },
        );
    };

    // const handleDelete = (ticket: Ticket) => {
    //     if (confirm('Apakah Anda yakin ingin menghapus tiket ini?')) {
    //         router.delete(ticketsDelete(ticket.id).url, {
    //             onStart: () => toast.loading('Menghapus tiket...'),
    //             onSuccess: () => toast.success('Tiket berhasil dihapus'),
    //             onError: () => toast.error('Gagal menghapus tiket'),
    //             onFinish: () => toast.dismiss(),
    //         });
    //     }
    // };

    const handleDelete = () => {
        if (!selectedTicket) return;

        router.delete(ticketsDelete(selectedTicket.id).url, {
            onStart: () => {
                toast.loading('Deleting ticket...');
            },
            onSuccess: () => {
                setShowDeleteDialog(false);
                setSelectedTicket(null);
                toast.success('Ticket deleted successfully!');
            },
            onError: () => {
                toast.error('Failed to delete ticket. Please try again.');
            },
            onFinish: () => {
                toast.dismiss();
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tiket" />
            <div className="container mx-auto space-y-6 p-4 md:p-6 lg:p-8">
                {/* Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Tiket
                        </h1>
                        <p className="text-muted-foreground">
                            Halaman untuk mengelola data tiket
                        </p>
                    </div>
                </div>

                {/* Search & Actions */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex max-w-md flex-1">
                        <InputGroup>
                            <InputGroupInput
                                aria-label="search"
                                placeholder="Cari kode tiket, judul, atau deskripsi..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                            />
                            <InputGroupAddon align="inline-end">
                                {isSearching ? (
                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                ) : searchQuery ? (
                                    <Button
                                        onClick={handleClearSearch}
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                ) : (
                                    <SearchIcon className="h-4 w-4 text-muted-foreground" />
                                )}
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                    <Button
                        size="lg"
                        className="bg-primary shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] hover:bg-primary/90"
                        asChild
                    >
                        <Link href={ticketsCreate().url}>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Tiket
                        </Link>
                    </Button>
                </div>

                {/* Table Content */}
                {!isSearching && ticketsData.data.length === 0 ? (
                    <EmptySearch
                        searchQuery={searchQuery}
                        params="ticket"
                        handleClearSearch={handleClearSearch}
                        route={ticketsCreate().url}
                    />
                ) : (
                    <div className="overflow-hidden rounded-xl border bg-card/50 p-3 shadow-sm backdrop-blur-sm">
                        <Table>
                            <TableHeader className="bg-muted/50">
                                <TableRow>
                                    <TableHead className="w-35">
                                        Kode Tiket
                                    </TableHead>
                                    <TableHead>Informasi Masalah</TableHead>
                                    <TableHead>Kategori</TableHead>
                                    <TableHead>Prioritas</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Reporter / Dibuat</TableHead>
                                    <TableHead className="text-right">
                                        Aksi
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isSearching
                                    ? Array.from({ length: 5 }).map(
                                          (_, idx) => (
                                              <TableRow key={`skeleton-${idx}`}>
                                                  <TableCell>
                                                      <Skeleton className="h-4 w-24" />
                                                  </TableCell>
                                                  <TableCell>
                                                      <Skeleton className="h-10 w-full" />
                                                  </TableCell>
                                                  <TableCell>
                                                      <Skeleton className="h-4 w-20" />
                                                  </TableCell>
                                                  <TableCell>
                                                      <Skeleton className="h-6 w-16 rounded-full" />
                                                  </TableCell>
                                                  <TableCell>
                                                      <Skeleton className="h-6 w-20 rounded-full" />
                                                  </TableCell>
                                                  <TableCell>
                                                      <Skeleton className="h-10 w-32" />
                                                  </TableCell>
                                                  <TableCell className="text-right">
                                                      <Skeleton className="ml-auto h-8 w-8" />
                                                  </TableCell>
                                              </TableRow>
                                          ),
                                      )
                                    : ticketsData.data.map((ticket) => {
                                          const status = statusConfig[
                                              ticket.status
                                          ] || {
                                              label: ticket.status,
                                              color: '',
                                          };
                                          const priority = priorityConfig[
                                              ticket.priority?.name || ''
                                          ] || {
                                              label:
                                                  ticket.priority?.name || '-',
                                              color: 'bg-slate-500 text-white',
                                          };

                                          return (
                                              <TableRow
                                                  key={ticket.id}
                                                  className="group transition-colors hover:bg-muted/30"
                                              >
                                                  <TableCell className="font-mono font-medium text-primary">
                                                      {ticket.ticket_code}
                                                  </TableCell>
                                                  <TableCell>
                                                      <div className="flex flex-col">
                                                          <span className="line-clamp-1 font-semibold transition-colors group-hover:text-primary">
                                                              {ticket.title}
                                                          </span>
                                                          <span className="line-clamp-1 text-xs text-muted-foreground">
                                                              {
                                                                  ticket.description
                                                              }
                                                          </span>
                                                      </div>
                                                  </TableCell>
                                                  <TableCell>
                                                      <Badge
                                                          variant="outline"
                                                          className="font-normal"
                                                      >
                                                          {ticket.category
                                                              ?.name || '-'}
                                                      </Badge>
                                                  </TableCell>
                                                  <TableCell>
                                                      <Badge
                                                          className={`${priority.color} border-none shadow-sm`}
                                                      >
                                                          {priority.label}
                                                      </Badge>
                                                  </TableCell>
                                                  <TableCell>
                                                      <Badge
                                                          variant="outline"
                                                          className={`${status.color} border px-2 py-0.5 font-medium`}
                                                      >
                                                          {status.label}
                                                      </Badge>
                                                  </TableCell>
                                                  <TableCell>
                                                      <div className="flex flex-col text-xs">
                                                          <span className="flex items-center gap-1 font-medium">
                                                              <User className="h-3 w-3" />
                                                              {ticket.reporter
                                                                  ?.name ||
                                                                  'Unknown'}
                                                          </span>
                                                          <span className="mt-0.5 flex items-center gap-1 text-muted-foreground">
                                                              <Calendar className="h-3 w-3" />
                                                              {new Date(
                                                                  ticket.created_at,
                                                              ).toLocaleDateString()}
                                                          </span>
                                                      </div>
                                                  </TableCell>
                                                  <TableCell className="text-right">
                                                      <DropdownMenu>
                                                          <DropdownMenuTrigger
                                                              asChild
                                                          >
                                                              <Button
                                                                  variant="ghost"
                                                                  size="icon"
                                                                  className="h-8 w-8 transition-opacity"
                                                              >
                                                                  <MoreHorizontalIcon className="h-4 w-4" />
                                                              </Button>
                                                          </DropdownMenuTrigger>
                                                          <DropdownMenuContent
                                                              align="end"
                                                              className="w-40"
                                                          >
                                                              <DropdownMenuLabel>
                                                                  Aksi Tiket
                                                              </DropdownMenuLabel>
                                                              <DropdownMenuItem
                                                                  asChild
                                                              >
                                                                  <Link
                                                                      href={
                                                                          ticketsShow(
                                                                              ticket.id,
                                                                          ).url
                                                                      }
                                                                      className="cursor-pointer"
                                                                  >
                                                                      <Eye className="mr-2 h-4 w-4" />
                                                                      <span>
                                                                          Detail
                                                                      </span>
                                                                  </Link>
                                                              </DropdownMenuItem>
                                                              <DropdownMenuItem
                                                                  asChild
                                                              >
                                                                  <Link
                                                                      href={
                                                                          ticketsEdit(
                                                                              ticket.id,
                                                                          ).url
                                                                      }
                                                                      className="cursor-pointer"
                                                                  >
                                                                      <Pencil className="mr-2 h-4 w-4" />
                                                                      <span>
                                                                          Ubah
                                                                      </span>
                                                                  </Link>
                                                              </DropdownMenuItem>
                                                              <DropdownMenuSeparator />
                                                              <DropdownMenuItem
                                                                  className="cursor-pointer text-destructive focus:text-destructive"
                                                                  onSelect={() => {
                                                                      setSelectedTicket(
                                                                          ticket,
                                                                      );
                                                                      setShowDeleteDialog(
                                                                          true,
                                                                      );
                                                                  }}
                                                              >
                                                                  <Trash className="mr-2 h-4 w-4" />
                                                                  <span>
                                                                      Hapus
                                                                  </span>
                                                              </DropdownMenuItem>
                                                          </DropdownMenuContent>
                                                      </DropdownMenu>
                                                  </TableCell>
                                              </TableRow>
                                          );
                                      })}
                            </TableBody>
                        </Table>
                    </div>
                )}

                {/* Pagination */}
                {ticketsData.data.length > 0 &&
                    ticketsData.total > ticketsData.per_page && (
                        <div className="pt-4">
                            <AssetPagination assets={ticketsData} />
                        </div>
                    )}
            </div>
            <AlertDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Apakah Anda yakin ingin menghapus tiket ini?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Anda akan menghapus tiket{' '}
                            <span className="font-semibold text-foreground">
                                "{selectedTicket?.title}"
                            </span>{' '}
                            ({selectedTicket?.ticket_code}). Tindakan ini tidak
                            dapat dibatalkan dan akan menghapus tiket ini secara
                            permanen.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => setShowDeleteDialog(false)}
                        >
                            Batal
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-white transition-all hover:scale-105 hover:bg-destructive/90"
                        >
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
