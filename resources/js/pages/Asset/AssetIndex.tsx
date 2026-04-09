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

import EmptySearch from '@/components/empty-search';
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import {
    assets,
    assetsCreate,
    assetsDelete,
    assetsDetail,
    assetsEdit,
} from '@/routes';
import {
    Asset,
    BreadcrumbItem,
    CategoryProps,
    LocationProps,
    SharedData,
} from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Download,
    Eye,
    FileSpreadsheet,
    FileText,
    Loader2,
    MoreHorizontalIcon,
    Pencil,
    Plus,
    Printer,
    SearchIcon,
    Trash,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { AssetPagination } from './AssetPagination';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Aset',
        href: assets().url,
    },
];

interface PaginationLinksProps {
    url: string | null;
    label: string;
    active: boolean;
}

interface AssetPaginationProps {
    data: Asset[];
    links: PaginationLinksProps[];
    first_page_url: string;
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

type AssetsIndexProps = {
    assets: AssetPaginationProps;
    categories: CategoryProps[];
    locations: LocationProps[];
    search?: string;
    filters?: {
        category?: string;
        location?: string;
        condition?: string;
    };
};

export const conditionConfig = {
    good: {
        label: 'Baik' as string,
        variant: 'default' as const,
        color: 'bg-emerald-50 text-emerald-700 border-emerald-200' as string,
    },
    minor_damage: {
        label: 'Rusak Ringan' as string,
        variant: 'secondary' as const,
        color: '' as string,
    },
    major_damage: {
        label: 'Rusak Berat' as string,
        variant: 'destructive' as const,
        color: '' as string,
    },
};

export default function AssetIndex({
    assets,
    categories,
    locations,
    search = '',
    filters,
}: AssetsIndexProps) {
    const { auth } = usePage<SharedData>().props;
    const isStaff = auth.user.role_names?.some((role: string) =>
        ['admin', 'management'].includes(role),
    );

    const [searchQuery, setSearchQuery] = useState(search);
    const [filterCategory, setFilterCategory] = useState(
        filters?.category || 'all',
    );
    const [filterLocation, setFilterLocation] = useState(
        filters?.location || 'all',
    );
    const [filterCondition, setFilterCondition] = useState(
        filters?.condition || 'all',
    );
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    // const { data, setData } = useForm({ search: search || '' });
    console.log(assets.data.length);
    // Debounce search - Inertia best practice
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (
                searchQuery !== search ||
                filterCategory !== (filters?.category || 'all') ||
                filterLocation !== (filters?.location || 'all') ||
                filterCondition !== (filters?.condition || 'all')
            ) {
                setIsSearching(true);
                router.get(
                    window.location.pathname,
                    {
                        search: searchQuery || undefined,
                        category:
                            filterCategory !== 'all'
                                ? filterCategory
                                : undefined,
                        location:
                            filterLocation !== 'all'
                                ? filterLocation
                                : undefined,
                        condition:
                            filterCondition !== 'all'
                                ? filterCondition
                                : undefined,
                    },
                    {
                        preserveState: true,
                        preserveScroll: true,
                        replace: true,
                        only: ['assets'],
                        onFinish: () => setIsSearching(false),
                    },
                );
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [
        searchQuery,
        filterCategory,
        filterLocation,
        filterCondition,
        search,
        filters,
    ]);

    const handleClearSearch = () => {
        setSearchQuery('');
        setFilterCategory('all');
        setFilterLocation('all');
        setFilterCondition('all');
        setIsSearching(true);
        router.get(
            window.location.pathname,
            {},
            {
                preserveState: true,
                only: ['assets'],
                onFinish: () => setIsSearching(false),
            },
        );
    };

    const handleDelete = () => {
        if (!selectedAsset) return;

        router.delete(assetsDelete(selectedAsset.id).url, {
            onStart: () => {
                toast.loading('Menghapus aset...');
            },
            onSuccess: () => {
                setShowDeleteDialog(false);
                setSelectedAsset(null);
                toast.success('Aset berhasil dihapus!');
            },
            onError: () => {
                toast.error('Gagal menghapus aset. Silakan coba lagi.');
            },
            onFinish: () => {
                toast.dismiss();
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Aset" />
            <div className="container mx-auto space-y-6 p-4 md:p-6 lg:p-8">
                {/* Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Aset
                        </h1>
                        <p className="text-muted-foreground">
                            Halaman untuk mengelola data aset
                        </p>
                    </div>
                </div>
                {/* Search */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-center">
                        <InputGroup className="flex-1 lg:max-w-xs">
                            <InputGroupInput
                                aria-label="search"
                                placeholder="Cari aset..."
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
                                        size="icon"
                                        className="h-8 w-8"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                ) : (
                                    <SearchIcon className="h-4 w-4" />
                                )}
                            </InputGroupAddon>
                        </InputGroup>

                        <div className="flex flex-wrap items-center gap-2">
                            <Select
                                value={filterCategory}
                                onValueChange={setFilterCategory}
                            >
                                <SelectTrigger className="w-35">
                                    <SelectValue placeholder="Kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Kategori</SelectLabel>
                                        <SelectItem value="all">
                                            Semua Kategori
                                        </SelectItem>
                                        {categories.map((cat) => (
                                            <SelectItem
                                                key={cat.id}
                                                value={cat.id.toString()}
                                            >
                                                {cat.category_name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Select
                                value={filterLocation}
                                onValueChange={setFilterLocation}
                            >
                                <SelectTrigger className="w-35">
                                    <SelectValue placeholder="Lokasi" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Lokasi</SelectLabel>
                                        <SelectItem value="all">
                                            Semua Lokasi
                                        </SelectItem>
                                        {locations.map((loc) => (
                                            <SelectItem
                                                key={loc.id}
                                                value={loc.id.toString()}
                                            >
                                                {loc.location_name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Select
                                value={filterCondition}
                                onValueChange={setFilterCondition}
                            >
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Kondisi" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Kondisi</SelectLabel>
                                        <SelectItem value="all">
                                            Semua Kondisi
                                        </SelectItem>
                                        {Object.entries(conditionConfig).map(
                                            ([key, config]) => (
                                                <SelectItem
                                                    key={key}
                                                    value={key}
                                                >
                                                    {config.label}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            {(searchQuery ||
                                filterCategory !== 'all' ||
                                filterLocation !== 'all' ||
                                filterCondition !== 'all') && (
                                <Button
                                    variant="ghost"
                                    onClick={handleClearSearch}
                                    className="h-9 px-2 lg:px-3"
                                >
                                    Reset
                                    <X className="ml-2 h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="lg">
                                    <Download className="mr-2 h-4 w-4" />
                                    Ekspor
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    Pilih Format
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() =>
                                        window.open(
                                            '/assets/export?format=excel',
                                        )
                                    }
                                >
                                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                                    Ekspor Excel
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() =>
                                        window.open('/assets/export?format=pdf')
                                    }
                                >
                                    <FileText className="mr-2 h-4 w-4" />
                                    Ekspor PDF
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {isStaff && (
                            <Button
                                size="lg"
                                className="bg-primary hover:bg-primary/90 sm:w-auto"
                                aria-label="Add Asset"
                                asChild
                            >
                                <Link href={assetsCreate().url}>
                                    <Plus className="h-4 w-4" />
                                    <span className="ml-2">Tambah Asset</span>
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>

                {/* Table */}
                {!isSearching && assets.data.length === 0 ? (
                    <EmptySearch
                        searchQuery={searchQuery}
                        params="asset"
                        handleClearSearch={handleClearSearch}
                    />
                ) : (
                    <div className="overflow-hidden rounded-xl border bg-card/50 p-3 shadow-sm backdrop-blur-sm">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Kode Aset</TableHead>
                                    <TableHead>Nama Aset</TableHead>
                                    <TableHead>Kategori</TableHead>
                                    <TableHead>Lokasi</TableHead>
                                    <TableHead>Kondisi</TableHead>
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

                                                  <TableCell className="text-right">
                                                      <Skeleton className="ml-auto h-8 w-8 rounded-md" />
                                                  </TableCell>
                                              </TableRow>
                                          ),
                                      )
                                    : assets.data.map((asset) => (
                                          <TableRow key={asset.id}>
                                              <TableCell className="font-mono font-medium">
                                                  {asset.asset_code}
                                              </TableCell>
                                              <TableCell className="font-medium">
                                                  {asset.asset_name}
                                              </TableCell>
                                              <TableCell>
                                                  <Badge variant="outline">
                                                      <span className="text-xs">
                                                          {
                                                              asset.category
                                                                  .category_name
                                                          }
                                                      </span>
                                                  </Badge>
                                              </TableCell>
                                              <TableCell>
                                                  {asset.location.location_name}
                                              </TableCell>
                                              <TableCell>
                                                  <Badge
                                                      variant={
                                                          conditionConfig[
                                                              asset.condition as keyof typeof conditionConfig
                                                          ]?.variant
                                                      }
                                                  >
                                                      {
                                                          conditionConfig[
                                                              asset.condition as keyof typeof conditionConfig
                                                          ]?.label
                                                      }
                                                  </Badge>
                                              </TableCell>

                                              <TableCell className="text-right">
                                                  <DropdownMenu>
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
                                                              Actions
                                                          </DropdownMenuLabel>
                                                          <DropdownMenuItem
                                                              className="cursor-pointer"
                                                              onSelect={() => {
                                                                  router.visit(
                                                                      assetsDetail(
                                                                          asset.id,
                                                                      ).url,
                                                                  );
                                                              }}
                                                          >
                                                              <Eye className="h-4 w-4" />
                                                              <span>
                                                                  Detail
                                                              </span>
                                                          </DropdownMenuItem>
                                                          <DropdownMenuItem
                                                              className="cursor-pointer"
                                                              onSelect={() => {
                                                                  // Navigasi ke halaman detail
                                                                  // dengan tab QR Label aktif
                                                                  router.visit(
                                                                      assetsDetail(
                                                                          asset.id,
                                                                          {
                                                                              query: {
                                                                                  tab: 'label',
                                                                              },
                                                                          },
                                                                      ).url,
                                                                  );
                                                              }}
                                                          >
                                                              <Printer className="h-4 w-4" />
                                                              <span>
                                                                  Cetak Label
                                                              </span>
                                                          </DropdownMenuItem>
                                                          <DropdownMenuItem
                                                              className="cursor-pointer"
                                                              onSelect={() => {
                                                                  router.visit(
                                                                      assetsEdit(
                                                                          asset.id,
                                                                      ).url,
                                                                  );
                                                              }}
                                                          >
                                                              <Pencil className="h-4 w-4" />
                                                              <span>Ubah</span>
                                                          </DropdownMenuItem>
                                                          <DropdownMenuSeparator />
                                                          <DropdownMenuItem
                                                              className="cursor-pointer"
                                                              onSelect={() => {
                                                                  setSelectedAsset(
                                                                      asset,
                                                                  );
                                                                  setShowDeleteDialog(
                                                                      true,
                                                                  );
                                                              }}
                                                          >
                                                              <Trash className="h-4 w-4" />
                                                              <span>Hapus</span>
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

                {/* Pagination */}

                {assets.data.length > 0 && assets.total > assets.per_page && (
                    <AssetPagination assets={assets} />
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
                            Apakah Anda yakin ingin menghapus aset ini?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Anda akan menghapus{' '}
                            <span className="font-semibold text-foreground">
                                "{selectedAsset?.asset_name}"
                            </span>{' '}
                            ({selectedAsset?.asset_code}). Tindakan ini tidak
                            dapat dibatalkan dan akan menghapus aset ini secara
                            permanen dari inventaris Anda.
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
