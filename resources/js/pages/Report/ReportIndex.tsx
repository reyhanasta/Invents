import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { reports, reportsExport } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import {
    FileText,
    Loader2,
    MapPin,
    Package,
    SearchIcon,
    ShieldAlert,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { conditionConfig, statusConfig } from '../Asset/AssetIndex';
import { AssetPagination } from '../Asset/AssetPagination';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Laporan',
        href: reports().url,
    },
];

type ReportAsset = {
    id: number;
    asset_code: string;
    asset_name: string;
    brand: string | null;
    serial_number: string | null;
    condition: 'good' | 'minor_damage' | 'major_damage';
    status: 'available' | 'in-use' | 'maintenance' | 'retired';
    acquisition_date: string | null;
    category: { id: number; category_name: string } | null;
    location: { id: number; location_name: string } | null;
};

type ReportProps = {
    categoryStats: Array<{
        id: number;
        category_name: string;
        assets_count: number;
    }>;
    locationStats: Array<{
        id: number;
        location_name: string;
        assets_count: number;
    }>;
    conditionStats: {
        good: number;
        minor_damage: number;
        major_damage: number;
    };
    usageStats: {
        total: number;
        in_use: number;
        available: number;
    };
    assets: {
        data: ReportAsset[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    search: string | null;
    filters: {
        category: string | null;
        location: string | null;
        condition: string | null;
        status: string | null;
    };
    categories: Array<{ id: number; category_name: string }>;
    locations: Array<{ id: number; location_name: string }>;
};

function formatDate(dateStr: string | null): string {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export default function ReportIndex({
    categoryStats,
    locationStats,
    conditionStats,
    usageStats,
    assets,
    search: initialSearch,
    filters: initialFilters,
    categories,
    locations,
}: ReportProps) {
    // Helper to calculate percentage safely
    const getPercentage = (count: number) => {
        const total = usageStats.total || 1;
        return ((count / total) * 100).toFixed(1);
    };

    // Filter state for the detail asset listing
    const [searchQuery, setSearchQuery] = useState(initialSearch ?? '');
    const [filterCategory, setFilterCategory] = useState(
        initialFilters?.category || 'all',
    );
    const [filterLocation, setFilterLocation] = useState(
        initialFilters?.location || 'all',
    );
    const [filterCondition, setFilterCondition] = useState(
        initialFilters?.condition || 'all',
    );
    const [filterStatus, setFilterStatus] = useState(
        initialFilters?.status || 'all',
    );
    const [isSearching, setIsSearching] = useState(false);

    // Debounce search — mirrors AssetIndex pattern
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (
                searchQuery !== (initialSearch ?? '') ||
                filterCategory !== (initialFilters?.category || 'all') ||
                filterLocation !== (initialFilters?.location || 'all') ||
                filterCondition !== (initialFilters?.condition || 'all') ||
                filterStatus !== (initialFilters?.status || 'all')
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
                        status:
                            filterStatus !== 'all' ? filterStatus : undefined,
                    },
                    {
                        preserveState: true,
                        preserveScroll: true,
                        replace: true,
                        only: ['assets', 'search', 'filters'],
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
        filterStatus,
        initialSearch,
        initialFilters,
    ]);

    const handleClearFilters = () => {
        setSearchQuery('');
        setFilterCategory('all');
        setFilterLocation('all');
        setFilterCondition('all');
        setFilterStatus('all');
        setIsSearching(true);
        router.get(
            window.location.pathname,
            {},
            {
                preserveState: true,
                only: ['assets', 'search', 'filters'],
                onFinish: () => setIsSearching(false),
            },
        );
    };

    const hasActiveFilters =
        searchQuery ||
        filterCategory !== 'all' ||
        filterLocation !== 'all' ||
        filterCondition !== 'all' ||
        filterStatus !== 'all';

    const handleExportPdf = () => {
        const query: Record<string, string> = {};
        if (searchQuery) query.search = searchQuery;
        if (filterCategory !== 'all') query.category = filterCategory;
        if (filterLocation !== 'all') query.location = filterLocation;
        if (filterCondition !== 'all') query.condition = filterCondition;
        if (filterStatus !== 'all') query.status = filterStatus;

        window.open(reportsExport({ query }).url, '_blank');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan Aset" />

            <div className="flex-1 space-y-6 p-4 md:p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Laporan Aset
                        </h2>
                        <p className="text-muted-foreground">
                            Analisis mendalam mengenai inventaris aset
                            perusahaan
                        </p>
                    </div>
                </div>

                <Tabs defaultValue="category" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="category" className="flex gap-2">
                            <Package className="h-4 w-4" /> Kategori
                        </TabsTrigger>
                        <TabsTrigger value="location" className="flex gap-2">
                            <MapPin className="h-4 w-4" /> Lokasi
                        </TabsTrigger>
                        <TabsTrigger value="condition" className="flex gap-2">
                            <ShieldAlert className="h-4 w-4" /> Kondisi & Status
                        </TabsTrigger>
                    </TabsList>

                    {/* Tab Kategori */}
                    <TabsContent value="category" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Kepadatan Aset Berdasarkan Kategori
                                </CardTitle>
                                <CardDescription>
                                    Jumlah unit aset yang terdaftar pada setiap
                                    kategori
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nama Kategori</TableHead>
                                            <TableHead className="text-right">
                                                Jumlah Unit
                                            </TableHead>
                                            <TableHead className="text-right">
                                                Kontribusi
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {categoryStats.length > 0 ? (
                                            categoryStats.map((cat) => (
                                                <TableRow key={cat.id}>
                                                    <TableCell className="font-medium">
                                                        {cat.category_name}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        {cat.assets_count}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        {getPercentage(
                                                            cat.assets_count,
                                                        )}
                                                        %
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={3}
                                                    className="py-10 text-center text-muted-foreground"
                                                >
                                                    Belum ada data kategori
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Tab Lokasi */}
                    <TabsContent value="location" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Sebaran Aset di Setiap Lokasi
                                </CardTitle>
                                <CardDescription>
                                    Lokalisasi perangkat berdasarkan ruangan
                                    atau gedung
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nama Lokasi</TableHead>
                                            <TableHead className="text-right">
                                                Jumlah Unit
                                            </TableHead>
                                            <TableHead className="text-right">
                                                Kontribusi
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {locationStats.length > 0 ? (
                                            locationStats.map((loc) => (
                                                <TableRow key={loc.id}>
                                                    <TableCell className="font-medium">
                                                        {loc.location_name}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        {loc.assets_count}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        {getPercentage(
                                                            loc.assets_count,
                                                        )}
                                                        %
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={3}
                                                    className="py-10 text-center text-muted-foreground"
                                                >
                                                    Belum ada data lokasi
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Tab Kondisi & Status */}
                    <TabsContent value="condition" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Ringkasan Kondisi</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span>Baik</span>
                                            <span className="font-medium">
                                                {conditionStats.good} (
                                                {getPercentage(
                                                    conditionStats.good,
                                                )}
                                                %)
                                            </span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-secondary">
                                            <div
                                                className="h-full rounded-full bg-green-500"
                                                style={{
                                                    width: `${getPercentage(conditionStats.good)}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span>Rusak Ringan</span>
                                            <span className="font-medium">
                                                {conditionStats.minor_damage} (
                                                {getPercentage(
                                                    conditionStats.minor_damage,
                                                )}
                                                %)
                                            </span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-secondary">
                                            <div
                                                className="h-full rounded-full bg-yellow-500"
                                                style={{
                                                    width: `${getPercentage(conditionStats.minor_damage)}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span>Rusak Berat</span>
                                            <span className="font-medium">
                                                {conditionStats.major_damage} (
                                                {getPercentage(
                                                    conditionStats.major_damage,
                                                )}
                                                %)
                                            </span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-secondary">
                                            <div
                                                className="h-full rounded-full bg-red-500"
                                                style={{
                                                    width: `${getPercentage(conditionStats.major_damage)}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Rasio Penggunaan</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center justify-center space-y-4 py-6">
                                    <div className="relative h-40 w-40">
                                        <svg
                                            className="h-full w-full"
                                            viewBox="0 0 100 100"
                                        >
                                            <circle
                                                className="stroke-current text-secondary"
                                                strokeWidth="10"
                                                cx="50"
                                                cy="50"
                                                r="40"
                                                fill="transparent"
                                            ></circle>
                                            <circle
                                                className="stroke-current text-blue-500"
                                                strokeWidth="10"
                                                strokeDasharray={
                                                    (usageStats.total > 0
                                                        ? (usageStats.in_use /
                                                              usageStats.total) *
                                                          251.2
                                                        : 0) + ' 251.2'
                                                }
                                                strokeLinecap="round"
                                                cx="50"
                                                cy="50"
                                                r="40"
                                                fill="transparent"
                                                transform="rotate(-90 50 50)"
                                            ></circle>
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-3xl font-bold">
                                                {usageStats.total > 0
                                                    ? (
                                                          (usageStats.in_use /
                                                              usageStats.total) *
                                                          100
                                                      ).toFixed(0)
                                                    : 0}
                                                %
                                            </span>
                                            <span className="px-2 text-center text-[10px] text-muted-foreground uppercase">
                                                Digunakan
                                            </span>
                                        </div>
                                    </div>
                                    <div className="grid w-full grid-cols-2 gap-8 text-center">
                                        <div>
                                            <p className="text-2xl font-bold">
                                                {usageStats.in_use}
                                            </p>
                                            <p className="text-xs text-muted-foreground uppercase">
                                                Aktif
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold">
                                                {usageStats.available}
                                            </p>
                                            <p className="text-xs text-muted-foreground uppercase">
                                                Tersedia
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Detail Aset Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold tracking-tight">
                                Detail Aset
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Daftar lengkap aset dengan filter
                            </p>
                        </div>
                        <Button variant="outline" onClick={handleExportPdf}>
                            <FileText className="mr-2 h-4 w-4" />
                            Ekspor PDF
                        </Button>
                    </div>

                    {/* Filter bar */}
                    <div className="flex items-center justify-between">
                        <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <InputGroup className="flex-1 lg:max-w-xs">
                                <InputGroupInput
                                    aria-label="search"
                                    placeholder="Cari aset..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                />
                                <InputGroupAddon align="inline-end">
                                    {isSearching ? (
                                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                    ) : searchQuery ? (
                                        <Button
                                            onClick={handleClearFilters}
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

                            <div className="flex flex-row items-center gap-2">
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
                                    <SelectTrigger className="w-35">
                                        <SelectValue placeholder="Kondisi" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Kondisi</SelectLabel>
                                            <SelectItem value="all">
                                                Semua Kondisi
                                            </SelectItem>
                                            {Object.entries(
                                                conditionConfig,
                                            ).map(([key, config]) => (
                                                <SelectItem
                                                    key={key}
                                                    value={key}
                                                >
                                                    {config.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={filterStatus}
                                    onValueChange={setFilterStatus}
                                >
                                    <SelectTrigger className="w-35">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Status</SelectLabel>
                                            <SelectItem value="all">
                                                Semua Status
                                            </SelectItem>
                                            {Object.entries(statusConfig).map(
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

                                {hasActiveFilters && (
                                    <Button
                                        variant="ghost"
                                        onClick={handleClearFilters}
                                        className="h-9 px-2 lg:px-3"
                                    >
                                        Reset
                                        <X className="ml-2 h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Asset Table */}
                    <div className="overflow-hidden rounded-xl border bg-card/50 p-3 shadow-sm backdrop-blur-sm">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12">No</TableHead>
                                    <TableHead>Kode Aset</TableHead>
                                    <TableHead>Nama Aset</TableHead>
                                    <TableHead>Kategori</TableHead>
                                    <TableHead>Lokasi</TableHead>
                                    <TableHead>Brand</TableHead>
                                    <TableHead>No. Seri</TableHead>
                                    <TableHead>Kondisi</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Tanggal Perolehan</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isSearching ? (
                                    Array.from({ length: 5 }).map(
                                        (_, index) => (
                                            <TableRow key={`skeleton-${index}`}>
                                                <TableCell>
                                                    <div className="h-4 w-6" />
                                                </TableCell>
                                                <TableCell>
                                                    <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                                                </TableCell>
                                                <TableCell>
                                                    <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                                                </TableCell>
                                                <TableCell>
                                                    <div className="h-5 w-20 animate-pulse rounded-full bg-muted" />
                                                </TableCell>
                                                <TableCell>
                                                    <div className="h-4 w-28 animate-pulse rounded bg-muted" />
                                                </TableCell>
                                                <TableCell>
                                                    <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                                                </TableCell>
                                                <TableCell>
                                                    <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                                                </TableCell>
                                                <TableCell>
                                                    <div className="h-5 w-24 animate-pulse rounded-full bg-muted" />
                                                </TableCell>
                                                <TableCell>
                                                    <div className="h-5 w-24 animate-pulse rounded-full bg-muted" />
                                                </TableCell>
                                                <TableCell>
                                                    <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                                                </TableCell>
                                            </TableRow>
                                        ),
                                    )
                                ) : assets.data.length > 0 ? (
                                    assets.data.map((asset, idx) => (
                                        <TableRow key={asset.id}>
                                            <TableCell className="text-muted-foreground">
                                                {(assets.current_page - 1) *
                                                    assets.per_page +
                                                    idx +
                                                    1}
                                            </TableCell>
                                            <TableCell className="font-mono font-medium">
                                                {asset.asset_code}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {asset.asset_name}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    <span className="text-xs">
                                                        {asset.category
                                                            ?.category_name ??
                                                            '-'}
                                                    </span>
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {asset.location
                                                    ?.location_name ?? '-'}
                                            </TableCell>
                                            <TableCell>
                                                {asset.brand ?? '-'}
                                            </TableCell>
                                            <TableCell className="font-mono text-xs">
                                                {asset.serial_number ?? '-'}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        conditionConfig[
                                                            asset.condition
                                                        ]?.variant
                                                    }
                                                >
                                                    {
                                                        conditionConfig[
                                                            asset.condition
                                                        ]?.label
                                                    }
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        statusConfig[
                                                            asset.status
                                                        ]?.variant
                                                    }
                                                    className={
                                                        statusConfig[
                                                            asset.status
                                                        ]?.color
                                                    }
                                                >
                                                    {
                                                        statusConfig[
                                                            asset.status
                                                        ]?.label
                                                    }
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {formatDate(
                                                    asset.acquisition_date,
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={10}
                                            className="py-10 text-center text-muted-foreground"
                                        >
                                            Belum ada data aset
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    {assets.data.length > 0 && (
                        <AssetPagination assets={assets} />
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
