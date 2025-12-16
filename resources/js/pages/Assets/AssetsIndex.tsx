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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { assets, assetsCreate, assetsDelete, assetsEdit } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import {
    MoreHorizontalIcon,
    Package,
    Pencil,
    Plus,
    SearchIcon,
    Trash,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Assets',
        href: assets().url,
    },
];

type Asset = {
    id: number;
    asset_name: string;
    asset_code: string;
    category: {
        id: number;
        category_name: string;
        prefix_code: string;
    };
    location: {
        id: number;
        location_name: string;
    };
    condition: string;
    serial_number?: string;
    acquisition_date?: string;
};

type AssetsIndexProps = {
    assets: {
        data: Asset[];
        links: any[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    categories: Array<{
        id: number;
        category_name: string;
    }>;
    locations: Array<{
        id: number;
        location_name: string;
    }>;
};

const conditionConfig = {
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

export default function AssetsIndex({ assets }: AssetsIndexProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

    const filteredAssets = assets.data.filter((asset) => {
        const query = searchQuery.toLowerCase();
        return (
            asset.asset_name.toLowerCase().includes(query) ||
            asset.asset_code.toLowerCase().includes(query) ||
            asset.category.category_name.toLowerCase().includes(query) ||
            asset.location.location_name.toLowerCase().includes(query)
        );
    });

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
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Assets
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your inventory assets
                        </p>
                    </div>
                    <Link href={assetsCreate().url}>
                        <Button
                            size="lg"
                            className="w-full bg-primary text-white hover:bg-primary/90 sm:w-auto"
                        >
                            <Plus className="h-4 w-4" />
                            <span className="ml-2">Add Asset</span>
                        </Button>
                    </Link>
                </div>

                {/* Search */}
                <div className="flex items-center gap-4">
                    <InputGroup className="max-w-md flex-1">
                        <InputGroupInput
                            aria-label="search"
                            placeholder="Search by name, code, category..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <InputGroupAddon>
                            <SearchIcon />
                        </InputGroupAddon>
                    </InputGroup>
                    {searchQuery && (
                        <div className="text-sm text-muted-foreground">
                            {filteredAssets.length} of {assets.data.length}{' '}
                            assets
                        </div>
                    )}
                </div>

                {/* Table */}
                {filteredAssets.length === 0 ? (
                    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                        <div className="mb-4 rounded-full bg-muted p-6">
                            <Package className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold">
                            {searchQuery ? 'No Results Found' : 'No Assets Yet'}
                        </h3>
                        <p className="mb-6 max-w-md text-sm text-muted-foreground">
                            {searchQuery
                                ? `No assets match your search for "${searchQuery}"`
                                : 'Get started by adding your first asset'}
                        </p>
                        {searchQuery ? (
                            <Button
                                variant="outline"
                                onClick={() => setSearchQuery('')}
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
                                {filteredAssets.map((asset) => (
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
                                                <DropdownMenuTrigger asChild>
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
                                                    <Link
                                                        href={
                                                            assetsEdit(asset.id)
                                                                .url
                                                        }
                                                    >
                                                        <DropdownMenuItem className="cursor-pointer">
                                                            <Pencil className="h-4 w-4" />
                                                            <span>Edit</span>
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    <DropdownMenuItem
                                                        className="cursor-pointer text-destructive focus:text-destructive"
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
                                                        <span>Delete</span>
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

                {/* Pagination info */}
                {assets.data.length > 0 && (
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div>
                            Showing{' '}
                            {(assets.current_page - 1) * assets.per_page + 1} to{' '}
                            {Math.min(
                                assets.current_page * assets.per_page,
                                assets.total,
                            )}{' '}
                            of {assets.total} assets
                        </div>
                    </div>
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
