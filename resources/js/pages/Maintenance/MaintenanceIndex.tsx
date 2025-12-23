import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
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
import { assets, assetsCreate, maintenancesCreate } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import {
    Banknote,
    Box,
    Calendar,
    Clock,
    Loader2,
    Package,
    Plus,
    SearchIcon,
    X,
} from 'lucide-react';
import { useState } from 'react';

export type Maintenance = {
    id: number;
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

type AssetPaginationProps = {
    data: Maintenance[];
    links: PaginationLinkProps;
    first_page_url: string;
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
};

type MaintenanceIndexProps = {
    maintenance: AssetPaginationProps;
    search?: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Assets',
        href: assets().url,
    },
];

export default function MaintenanceIndex({
    maintenance,
    search,
}: MaintenanceIndexProps) {
    const [searchQuery, setSearchQuery] = useState(search);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState<Maintenance | null>(
        null,
    );
    const [isSearching, setIsSearching] = useState(false);
    const handleClearSearch = () => {
        setSearchQuery('');
        setIsSearching(true);
        router.get(
            window.location.pathname,
            {},
            {
                preserveState: true,
                only: ['maintenances'],
                onFinish: () => setIsSearching(false),
            },
        );
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head />
            <div className="container mx-auto space-y-6 p-4 md:p-6 lg:p-8">
                {/* Header */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="flex flex-row">
                        <div className="item-center flex flex-col pl-4">
                            <Box
                                size={50}
                                className="rounded-2xl bg-accent p-3 text-primary/80"
                            />
                        </div>
                        <div className="flex flex-col self-start">
                            <CardTitle className="text-3xl">6</CardTitle>
                            <CardDescription>Total Records</CardDescription>
                        </div>
                    </Card>
                    <Card className="flex flex-row border-primary/40 bg-primary/20">
                        <div className="item-center flex flex-col pl-4">
                            <Calendar
                                size={50}
                                className="rounded-2xl bg-primary/70 p-3 text-white"
                            />
                        </div>
                        <div className="flex flex-col self-start">
                            <CardTitle className="text-3xl">6</CardTitle>
                            <CardDescription className="">
                                Scheduled
                            </CardDescription>
                        </div>
                    </Card>
                    <Card className="flex flex-row border-amber-200 bg-amber-200/30">
                        <div className="item-center flex flex-col pl-4">
                            <Clock
                                size={50}
                                className="rounded-2xl bg-amber-400 p-3 text-white"
                            />
                        </div>
                        <div className="flex flex-col self-start">
                            <CardTitle className="text-3xl">6</CardTitle>
                            <CardDescription className="">
                                In Progress
                            </CardDescription>
                        </div>
                    </Card>
                    <Card className="flex flex-row border-green-400/50 bg-green-300/70">
                        <div className="item-center flex flex-col pl-4">
                            <Banknote
                                size={50}
                                className="rounded-2xl bg-green-400/80 p-3 text-white"
                            />
                        </div>
                        <div className="flex flex-col self-start">
                            <CardTitle className="text-3xl">6</CardTitle>
                            <CardDescription className="">
                                Total Cost
                            </CardDescription>
                        </div>
                    </Card>
                </div>

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
                            <InputGroupAddon>
                                {isSearching ? (
                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                ) : searchQuery ? (
                                    <Button
                                        onClick={handleClearSearch}
                                        className="rounded p-0.5 hover:bg-accent"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                ) : (
                                    <SearchIcon className="h-4 w-4" />
                                )}
                            </InputGroupAddon>
                        </InputGroup>
                        {searchQuery && (
                            <div className="w-lg text-sm text-muted-foreground">
                                Found{' '}
                                <span className="font-medium text-foreground">
                                    {maintenance.total}
                                </span>{' '}
                                result{maintenance.total !== 1 ? 's' : ''}
                            </div>
                        )}
                    </div>
                    <Button
                        size="lg"
                        className="w-full bg-primary text-white hover:bg-primary/90 sm:w-auto"
                        aria-label="Add Asset"
                    >
                        <Plus className="h-4 w-4" />
                        <Link href={maintenancesCreate().url}>
                            <span className="ml-2">Add Maintenance</span>
                        </Link>
                    </Button>
                </div>

                {/* Table */}
                {maintenance.data.length === 0 ? (
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
                                    <TableHead>Asset Code</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Condition</TableHead>
                                    <TableHead>Serial Number</TableHead>
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
                                    : maintenance.data.map((maintenance) => (
                                          <TableRow key={maintenance.id}>
                                              <TableCell className="font-mono font-medium">
                                                  {maintenance.id}
                                              </TableCell>
                                              <TableCell className="font-medium">
                                                  {maintenance.description}
                                              </TableCell>

                                              <TableCell>
                                                  {maintenance.asset_id}
                                              </TableCell>
                                              <TableCell className="font-mono text-sm text-muted-foreground"></TableCell>
                                          </TableRow>
                                      ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
