import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
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
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { assets, assetsCreate, maintenancesCreate } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import {
    BadgeCheckIcon,
    Banknote,
    Box,
    Calendar,
    CircleX,
    Clock,
    Flag,
    Hammer,
    InfoIcon,
    Loader2,
    MoreHorizontalIcon,
    Package,
    Plus,
    SearchIcon,
    Settings,
    Wrench,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Asset } from '../Asset/AssetDetail';

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
        label: 'Cancel',
        color: 'bg-red-500 ',
        icon: <CircleX />,
    },
};

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
    const [showNewDialog, setShowNewDialog] = useState(false);
    const [showShareDialog, setShowShareDialog] = useState(false);
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
                        only: ['maintenances'],
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
                <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-1 flex-row gap-4 sm:flex-row sm:items-center">
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
                    <div className="flex w-sm flex-row gap-2">
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>All Status</SelectLabel>
                                    <SelectItem value="apple">
                                        Completed
                                    </SelectItem>
                                    <SelectItem value="banana">
                                        Scheduled
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="All Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>All Type</SelectLabel>
                                    <SelectItem value="apple">
                                        Routine{' '}
                                    </SelectItem>
                                    <SelectItem value="banana">
                                        Calibration
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
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
                                    <TableHead>ID</TableHead>
                                    <TableHead>Asset</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Technician</TableHead>
                                    <TableHead>Cost</TableHead>
                                    <TableHead>Status</TableHead>
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
                                                  {maintenance.maintenance_date}
                                              </TableCell>
                                              <TableCell className="hidden text-sm text-muted-foreground sm:table-cell">
                                                  {maintenance.technician}
                                              </TableCell>
                                              <TableCell className="hidden text-sm text-muted-foreground sm:table-cell">
                                                  {maintenance.cost}
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

                                              <TableCell className="font-mono text-sm text-muted-foreground">
                                                  <DropdownMenu modal={false}>
                                                      <DropdownMenuTrigger
                                                          asChild
                                                      >
                                                          <Button
                                                              variant="ghost"
                                                              size="icon"
                                                              className="h-8 w-8"
                                                          >
                                                              <MoreHorizontalIcon />
                                                          </Button>
                                                      </DropdownMenuTrigger>
                                                      <DropdownMenuContent
                                                          className="w-40"
                                                          align="end"
                                                      >
                                                          <DropdownMenuLabel>
                                                              File Actions
                                                          </DropdownMenuLabel>
                                                          <DropdownMenuGroup>
                                                              <DropdownMenuItem
                                                                  onSelect={() =>
                                                                      setShowNewDialog(
                                                                          true,
                                                                      )
                                                                  }
                                                              >
                                                                  New File...
                                                              </DropdownMenuItem>
                                                              <DropdownMenuItem
                                                                  onSelect={() =>
                                                                      setShowShareDialog(
                                                                          true,
                                                                      )
                                                                  }
                                                              >
                                                                  Share...
                                                              </DropdownMenuItem>
                                                              <DropdownMenuItem
                                                                  disabled
                                                              >
                                                                  Download
                                                              </DropdownMenuItem>
                                                          </DropdownMenuGroup>
                                                      </DropdownMenuContent>
                                                  </DropdownMenu>
                                                  <Dialog
                                                      open={showNewDialog}
                                                      onOpenChange={
                                                          setShowNewDialog
                                                      }
                                                  >
                                                      <DialogContent className="sm:max-w-[425px]">
                                                          <DialogHeader>
                                                              <DialogTitle>
                                                                  Create New
                                                                  File
                                                              </DialogTitle>
                                                              <DialogDescription>
                                                                  Provide a name
                                                                  for your new
                                                                  file. Click
                                                                  create when
                                                                  you&apos;re
                                                                  done.
                                                              </DialogDescription>
                                                          </DialogHeader>
                                                          <FieldGroup className="pb-3">
                                                              <Field>
                                                                  <FieldLabel htmlFor="filename">
                                                                      File Name
                                                                  </FieldLabel>
                                                                  <Input
                                                                      id="filename"
                                                                      name="filename"
                                                                      placeholder="document.txt"
                                                                  />
                                                              </Field>
                                                          </FieldGroup>
                                                          <DialogFooter>
                                                              <DialogClose
                                                                  asChild
                                                              >
                                                                  <Button variant="outline">
                                                                      Cancel
                                                                  </Button>
                                                              </DialogClose>
                                                              <Button type="submit">
                                                                  Create
                                                              </Button>
                                                          </DialogFooter>
                                                      </DialogContent>
                                                  </Dialog>
                                                  <Dialog
                                                      open={showShareDialog}
                                                      onOpenChange={
                                                          setShowShareDialog
                                                      }
                                                  >
                                                      <DialogContent className="sm:max-w-[425px]">
                                                          <DialogHeader>
                                                              <DialogTitle>
                                                                  Share File
                                                              </DialogTitle>
                                                              <DialogDescription>
                                                                  Anyone with
                                                                  the link will
                                                                  be able to
                                                                  view this
                                                                  file.
                                                              </DialogDescription>
                                                          </DialogHeader>
                                                          <FieldGroup className="py-3">
                                                              <Field>
                                                                  <Label htmlFor="email">
                                                                      Email
                                                                      Address
                                                                  </Label>
                                                                  <Input
                                                                      id="email"
                                                                      name="email"
                                                                      type="email"
                                                                      placeholder="shadcn@vercel.com"
                                                                      autoComplete="off"
                                                                  />
                                                              </Field>
                                                              <Field>
                                                                  <FieldLabel htmlFor="message">
                                                                      Message
                                                                      (Optional)
                                                                  </FieldLabel>
                                                                  <Textarea
                                                                      id="message"
                                                                      name="message"
                                                                      placeholder="Check out this file"
                                                                  />
                                                              </Field>
                                                          </FieldGroup>
                                                          <DialogFooter>
                                                              <DialogClose
                                                                  asChild
                                                              >
                                                                  <Button variant="outline">
                                                                      Cancel
                                                                  </Button>
                                                              </DialogClose>
                                                              <Button type="submit">
                                                                  Send Invite
                                                              </Button>
                                                          </DialogFooter>
                                                      </DialogContent>
                                                  </Dialog>
                                              </TableCell>
                                          </TableRow>
                                      ))}
                            </TableBody>
                        </Table>
                    </div>
                )}

                {/* {maintenance.data.length > 0 &&
                    maintenance.total > maintenance.per_page && (
                        <MaintenancePagination maintenance={maintenance} />

                        // <SimplePaginationExample assets={assets} />
                    )} */}
            </div>
        </AppLayout>
    );
}
