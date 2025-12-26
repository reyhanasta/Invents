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
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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
    assetsQrcodeDetail,
    maintenances,
    maintenancesCreate,
    maintenancesDelete,
    maintenancesEdit,
} from '@/routes';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import {
    BadgeCheckIcon,
    CircleX,
    Eye,
    Flag,
    Hammer,
    InfoIcon,
    Loader2,
    MoreHorizontalIcon,
    Package,
    Pencil,
    Plus,
    SearchIcon,
    Settings,
    Trash,
    Wrench,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Asset } from '../Asset/AssetDetail';
import MaintenancePagination from './MaintenancePagination';

export type Maintenance = {
    id: number;
    asset: Asset;
    asset_id: number;
    type: 'routine' | 'repair' | 'inspection' | 'calibration';
    description: string;
    maintenance_date: string;
    maintenance_done_date: string;
    technician: string;
    cost?: string;
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
    notes?: string;
};

type PaginationLinkProps = {
    url: string | null;
    label: string;
    active: boolean;
};

export type MaintenancePaginationProps = {
    data: Maintenance[];
    links: PaginationLinkProps[];
    first_page_url: string;
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
};

type MaintenanceIndexProps = {
    maintenance: MaintenancePaginationProps;
    search?: string;
    type?: string;
    status?: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Maintenance',
        href: maintenances().url,
    },
];

// Type configurations
const typeConfig = {
    routine: {
        label: 'Rutin',
        color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        icon: <Settings />,
    },
    repair: { label: 'Perbaikan', color: 'bg-amber-500', icon: <Wrench /> },

    calibration: {
        label: 'Kalibrasi',
        color: 'bg-purple-500 ',
        icon: <Wrench />,
    },

    inspection: { label: 'Inspeksi', color: 'bg-blue-500 ', icon: <Wrench /> },
};

const statusConfig = {
    completed: {
        label: 'Selesai',
        color: 'bg-green-700 ',
        icon: <BadgeCheckIcon />,
    },
    pending: {
        label: 'Pending',
        color: 'bg-blue-500 ',
        icon: <Flag />,
    },
    in_progress: {
        label: 'Sedang Berjalan',
        color: 'bg-yellow-500 ',
        icon: <Hammer />,
    },
    cancelled: {
        label: 'Dibatalkan',
        color: 'bg-red-500 ',
        icon: <CircleX />,
    },
};

export default function MaintenanceIndex({
    maintenance,
    search = '',
    type = '',
    status = '',
}: MaintenanceIndexProps) {
    // Ambil status unik dari data
    const uniqueStatuses = [
        ...new Set(maintenance.data.map((item) => item.status)),
    ];
    // Ambil status unik dari data
    const uniqueTypes = [...new Set(maintenance.data.map((item) => item.type))];

    const [searchQuery, setSearchQuery] = useState(search);
    const [selectedType, setSelectedType] = useState(type);
    const [selectedStatus, setSelectedStatus] = useState(status);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedMaintenance, setSelectedMaintenance] =
        useState<Maintenance | null>(null);
    const [isSearching, setIsSearching] = useState(false);

    const handleDelete = () => {
        if (!selectedMaintenance) return;

        router.delete(maintenancesDelete(selectedMaintenance.id).url, {
            onSuccess: () => {
                setShowDeleteDialog(false);
                setSelectedMaintenance(null);
                toast.success('Data maintenance berhasil dihapus!');
            },
            onError: () => {
                toast.error(
                    'Gagal menghapus data maintenance. Silakan coba lagi.',
                );
            },
        });
    };

    // Sync state with props when they change (e.g., browser back/forward)
    useEffect(() => {
        setSearchQuery(search);
        setSelectedType(type);
        setSelectedStatus(status);
    }, [search, type, status]);

    // Debounce search - Inertia best practice
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchQuery !== search) {
                setIsSearching(true);
                router.get(
                    maintenances().url,
                    {
                        search: searchQuery || undefined,
                        type: selectedType || undefined,
                        status: selectedStatus || undefined,
                    },
                    {
                        preserveState: true,
                        preserveScroll: true,
                        replace: true,
                        only: ['maintenance'],
                        onFinish: () => setIsSearching(false),
                    },
                );
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchQuery, search, selectedType, selectedStatus]);

    const handleClearSearch = () => {
        setSearchQuery('');
        setIsSearching(true);
        router.get(
            maintenances().url,
            {
                type: selectedType || undefined,
                status: selectedStatus || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                only: ['maintenance'],
                onFinish: () => setIsSearching(false),
            },
        );
    };

    const handleTypeChange = (value: string) => {
        const newType = value === 'all' ? '' : value;
        setSelectedType(newType);
        setIsSearching(true);
        router.get(
            maintenances().url,
            {
                search: searchQuery || undefined,
                type: newType || undefined,
                status: selectedStatus || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                only: ['maintenance'],
                onFinish: () => setIsSearching(false),
            },
        );
    };

    const handleStatusChange = (value: string) => {
        const newStatus = value === 'all' ? '' : value;
        setSelectedStatus(newStatus);
        setIsSearching(true);
        router.get(
            maintenances().url,
            {
                search: searchQuery || undefined,
                type: selectedType || undefined,
                status: newStatus || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                only: ['maintenance'],
                onFinish: () => setIsSearching(false),
            },
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head />
            <div className="container mx-auto space-y-6 p-4 md:p-6 lg:p-8">
                {/* Header */}

                {/* Search */}
                <div className="flex items-center gap-2">
                    <div className="flex flex-1 flex-row gap-4 sm:flex-row sm:items-center">
                        <InputGroup className="max-w-md flex-1">
                            <InputGroupInput
                                aria-label="search"
                                placeholder="Cari berdasarkan nama, kode, kategori, lokasi..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <InputGroupAddon align="inline-end">
                                {isSearching ? (
                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                ) : searchQuery ? (
                                    <Button
                                        onClick={handleClearSearch}
                                        variant="ghost"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                ) : (
                                    <SearchIcon className="h-4 w-4" />
                                )}
                            </InputGroupAddon>
                        </InputGroup>
                        {/* {searchQuery && (
                            <div className="text-sm text-muted-foreground">
                                Found{' '}
                                <span className="font-medium text-foreground">
                                    {maintenance.total}
                                </span>{' '}
                                result{maintenance.total !== 1 ? 's' : ''}
                            </div>
                        )} */}
                    </div>
                    <div className="flex w-sm flex-row gap-2">
                        <Select
                            value={selectedStatus || 'all'}
                            onValueChange={handleStatusChange}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Semua Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Status</SelectLabel>
                                    <SelectItem value="all">
                                        Semua Status
                                    </SelectItem>
                                    {uniqueStatuses.map((status) => (
                                        <SelectItem key={status} value={status}>
                                            {statusConfig[status]?.label ||
                                                status}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select
                            value={selectedType || 'all'}
                            onValueChange={handleTypeChange}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Semua Tipe" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Type</SelectLabel>
                                    <SelectItem value="all">
                                        Semua Tipe
                                    </SelectItem>
                                    {uniqueTypes.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {typeConfig[type]?.label || type}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button
                        size="lg"
                        className="w-full bg-primary text-white hover:bg-primary/90 sm:w-auto"
                        aria-label="Add Maintenance"
                    >
                        <Plus className="h-4 w-4" />
                        <Link href={maintenancesCreate().url}>
                            <span className="ml-2">Tambah Maintenance</span>
                        </Link>
                    </Button>
                </div>

                {/* Table */}
                {!isSearching && maintenance.data.length === 0 ? (
                    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                        <div className="mb-4 rounded-full bg-muted p-6">
                            <Package className="h-12 w-12 text-muted-foreground" />
                        </div>

                        <h3 className="mb-2 text-xl font-semibold">
                            {searchQuery
                                ? 'Tidak Ada Hasil Ditemukan'
                                : 'Belum Ada Data Maintenance'}
                        </h3>
                        <p className="mb-6 max-w-md text-sm text-muted-foreground">
                            {searchQuery
                                ? `Tidak ada data maintenance yang cocok dengan "${searchQuery}". Coba kata kunci lain.`
                                : 'Mulai dengan menambahkan data maintenance pertama Anda'}
                        </p>
                        {searchQuery ? (
                            <Button
                                variant="outline"
                                onClick={handleClearSearch}
                            >
                                Hapus Pencarian
                            </Button>
                        ) : (
                            <Link href={maintenancesCreate().url}>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Tambah Maintenance Pertama
                                </Button>
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="rounded-lg border p-3 transition-opacity duration-200">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Aset</TableHead>
                                    <TableHead>Tipe</TableHead>
                                    <TableHead>Deskripsi</TableHead>
                                    <TableHead>Tanggal</TableHead>

                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">
                                        Aksi
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isSearching
                                    ? // Skeleton loading rows
                                      Array.from({ length: 5 }).map(
                                          (_, index) => (
                                              <TableRow
                                                  key={`skeleton-${index}`}
                                              >
                                                  <TableCell>
                                                      <Skeleton className="h-4 w-24" />
                                                  </TableCell>
                                                  <TableCell>
                                                      <Skeleton className="h-4 w-32" />
                                                  </TableCell>
                                                  <TableCell>
                                                      <Skeleton className="h-5 w-20 rounded-full" />
                                                  </TableCell>
                                                  <TableCell>
                                                      <Skeleton className="h-4 w-28" />
                                                  </TableCell>

                                                  <TableCell>
                                                      <Skeleton className="h-5 w-24 rounded-full" />
                                                  </TableCell>
                                                  <TableCell>
                                                      <Skeleton className="h-5 w-24 rounded-full" />
                                                  </TableCell>
                                                  <TableCell className="text-right">
                                                      <Skeleton className="ml-auto h-8 w-8 rounded-md" />
                                                  </TableCell>
                                              </TableRow>
                                          ),
                                      )
                                    : maintenance.data.map((maintenance) => (
                                          <TableRow
                                              key={maintenance.id}
                                              className="transition-colors hover:bg-muted/30"
                                          >
                                              <TableCell className="font-xs font-mono">
                                                  {maintenance.id}
                                              </TableCell>
                                              <TableCell className="font-medium text-foreground transition-colors hover:text-primary">
                                                  {maintenance.asset.asset_name}
                                              </TableCell>

                                              <TableCell>
                                                  <Badge
                                                      variant="outline"
                                                      className={`${typeConfig[maintenance.type].color} gap-1 border-0`}
                                                  >
                                                      <InfoIcon className="h-3 w-3" />
                                                      <span className="hidden sm:inline">
                                                          {
                                                              typeConfig[
                                                                  maintenance
                                                                      .type
                                                              ].label
                                                          }
                                                      </span>
                                                  </Badge>
                                              </TableCell>
                                              <TableCell className="hidden max-w-[200px] truncate text-muted-foreground md:table-cell">
                                                  {maintenance.description}
                                              </TableCell>
                                              <TableCell className="text-sm text-muted-foreground">
                                                  {formatDate(
                                                      maintenance.maintenance_date,
                                                  )}
                                              </TableCell>

                                              <TableCell>
                                                  <Badge
                                                      variant="outline"
                                                      className={`${statusConfig[maintenance.status].color} gap-1 border-0 text-amber-50`}
                                                  >
                                                      {
                                                          statusConfig[
                                                              maintenance.status
                                                          ].icon
                                                      }
                                                      <span className="hidden sm:inline">
                                                          {
                                                              statusConfig[
                                                                  maintenance
                                                                      .status
                                                              ].label
                                                          }
                                                      </span>
                                                  </Badge>
                                              </TableCell>

                                              <TableCell className="text-right">
                                                  <DropdownMenu modal={false}>
                                                      <DropdownMenuTrigger
                                                          asChild
                                                      >
                                                          <Button
                                                              variant="ghost"
                                                              size="icon"
                                                              className="h-8 w-8"
                                                          >
                                                              <MoreHorizontalIcon className="h-4 w-4" />
                                                          </Button>
                                                      </DropdownMenuTrigger>
                                                      <DropdownMenuContent align="end">
                                                          <DropdownMenuLabel>
                                                              Aksi
                                                          </DropdownMenuLabel>
                                                          <DropdownMenuItem
                                                              className="cursor-pointer"
                                                              onSelect={() => {
                                                                  router.visit(
                                                                      assetsQrcodeDetail(
                                                                          maintenance.asset_id,
                                                                      ).url,
                                                                  );
                                                              }}
                                                          >
                                                              <Eye className="h-4 w-4" />
                                                              <span>Lihat</span>
                                                          </DropdownMenuItem>
                                                          <DropdownMenuItem
                                                              className="cursor-pointer"
                                                              onSelect={() => {
                                                                  router.visit(
                                                                      maintenancesEdit(
                                                                          maintenance.id,
                                                                      ).url,
                                                                  );
                                                              }}
                                                          >
                                                              <Pencil className="h-4 w-4" />
                                                              <span>Edit</span>
                                                          </DropdownMenuItem>
                                                          <DropdownMenuItem
                                                              className="cursor-pointer"
                                                              onSelect={() => {
                                                                  setSelectedMaintenance(
                                                                      maintenance,
                                                                  );
                                                                  setShowDeleteDialog(
                                                                      true,
                                                                  );
                                                              }}
                                                          >
                                                              <Trash className="h-4 w-4" />
                                                              <span>
                                                                  Hapus
                                                              </span>
                                                          </DropdownMenuItem>
                                                      </DropdownMenuContent>
                                                  </DropdownMenu>
                                              </TableCell>
                                          </TableRow>
                                      ))}
                            </TableBody>
                        </Table>
                    </div>
                )}

                {maintenance.data.length > 0 &&
                    maintenance.total > maintenance.per_page && (
                        <MaintenancePagination maintenance={maintenance} />

                        // <SimplePaginationExample assets={assets} />
                    )}
            </div>
            {/* Delete Confirmation Dialog */}
            <AlertDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Apakah Anda yakin ingin menghapus data maintenance
                            ini?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Anda akan menghapus data maintenance untuk{' '}
                            <span className="font-semibold text-foreground">
                                "{selectedMaintenance?.asset.asset_name}"
                            </span>{' '}
                            (ID: {selectedMaintenance?.id}). Tindakan ini tidak
                            dapat dibatalkan dan akan menghapus data maintenance
                            ini secara permanen dari sistem Anda.
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
                            className="bg-destructive text-white hover:bg-destructive/90"
                        >
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
