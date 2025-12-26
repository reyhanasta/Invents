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
    assets,
    assetsCreate,
    assetsDelete,
    assetsDetail,
    assetsEdit,
} from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import {
    Eye,
    Loader2,
    MoreHorizontalIcon,
    Package,
    Pencil,
    Plus,
    SearchIcon,
    Trash,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { AssetPagination } from './AssetPagination';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Assets',
        href: assets().url,
    },
];

type CategoryProps = {
    id: number;
    category_name: string;
    prefix_code: string;
};

type LocationProps = {
    id: number;
    location_name: string;
};

type Asset = {
    id: number;
    asset_name: string;
    asset_code: string;
    category: CategoryProps;
    location: LocationProps;
    condition: string;
    serial_number?: string;
    acquisition_date?: string;
};

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
    search?: string;
};

export const conditionConfig = {
    good: {
        label: 'Good',
        variant: 'default' as const,
        color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    minor_damage: {
        label: 'Minor Damage',
        variant: 'secondary' as const,
        color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    major_damage: {
        label: 'Major Damage',
        variant: 'destructive' as const,
        color: 'bg-red-50 text-red-700 border-red-200',
    },
};

export default function AssetIndex({ assets, search = '' }: AssetsIndexProps) {
    const [searchQuery, setSearchQuery] = useState(search);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    // const { data, setData } = useForm({ search: search || '' });

    // Debounce search - Inertia best practice
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
                        only: ['assets'],
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
                only: ['assets'],
                // onFinish: () => setIsSearching(false),
            },
        );
    };

    const handleDelete = () => {
        if (!selectedAsset) return;

        router.delete(assetsDelete(selectedAsset.id).url, {
            onSuccess: () => {
                setShowDeleteDialog(false);
                setSelectedAsset(null);
                toast.success('Asset deleted successfully!');
            },
            onError: () => {
                toast.error('Failed to delete asset. Please try again.');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Assets" />
            <div className="container mx-auto space-y-6 p-4 md:p-6 lg:p-8">
                {/* Search */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
                        <InputGroup className="max-w-md flex-1">
                            <InputGroupInput
                                aria-label="search"
                                placeholder="Search by name, code, category, location..."
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
                            <div className="w-lg text-sm text-muted-foreground">
                                Found{' '}
                                <span className="font-medium text-foreground">
                                    {assets.total}
                                </span>{' '}
                                result{assets.total !== 1 ? 's' : ''}
                            </div>
                        )} */}
                    </div>
                    <Button
                        size="lg"
                        className="w-full bg-primary text-white hover:bg-primary/90 sm:w-auto"
                        aria-label="Add Asset"
                    >
                        <Plus className="h-4 w-4" />
                        <Link href={assetsCreate().url}>
                            <span className="ml-2">Tambah Asset</span>
                        </Link>
                    </Button>
                </div>

                {/* Table */}
                {!isSearching && assets.data.length === 0 ? (
                    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                        <div className="mb-4 rounded-full bg-muted p-6">
                            <Package className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold">
                            {searchQuery ? 'No Results Found' : 'No Assets Yet'}
                        </h3>
                        <p className="mb-6 max-w-md text-sm text-muted-foreground">
                            {searchQuery
                                ? `No assets found matching "${searchQuery}". Try a different search term.`
                                : 'Get started by adding your first asset'}
                        </p>
                        {searchQuery ? (
                            <Button
                                variant="outline"
                                onClick={handleClearSearch}
                            >
                                Clear Search
                            </Button>
                        ) : (
                            <Link href={assetsCreate().url}>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add First Asset
                                </Button>
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="rounded-lg border p-3">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Kode Asset</TableHead>
                                    <TableHead>Nama Asset</TableHead>
                                    <TableHead>Kategori</TableHead>
                                    <TableHead>Lokasi</TableHead>
                                    <TableHead>Kondisi</TableHead>
                                    <TableHead>Nomor Seri</TableHead>
                                    <TableHead className="text-right">
                                        Actions
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
                                                      <Skeleton className="h-4 w-20" />
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
                                              <TableCell className="font-mono text-sm text-muted-foreground">
                                                  {asset.serial_number || '-'}
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
                                                                  Detail/Cetak
                                                                  Label
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
                            Are you sure you want to delete this asset?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            You are about to delete{' '}
                            <span className="font-semibold text-foreground">
                                "{selectedAsset?.asset_name}"
                            </span>{' '}
                            ({selectedAsset?.asset_code}). This action cannot be
                            undone and will permanently remove this asset from
                            your inventory.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => setShowDeleteDialog(false)}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-white hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
