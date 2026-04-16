import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { reports } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { MapPin, Package, ShieldAlert } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Laporan',
        href: reports().url,
    },
];

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
};

export default function ReportIndex({
    categoryStats,
    locationStats,
    conditionStats,
    usageStats,
}: ReportProps) {
    // Helper to calculate percentage safely
    const getPercentage = (count: number) => {
        const total = usageStats.total || 1;
        return ((count / total) * 100).toFixed(1);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan Aset" />

            <div className="flex-1 space-y-6 p-4 md:p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Laporan Aset</h2>
                        <p className="text-muted-foreground">
                            Analisis mendalam mengenai inventaris aset perusahaan
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
                                <CardTitle>Kepadatan Aset Berdasarkan Kategori</CardTitle>
                                <CardDescription>Jumlah unit aset yang terdaftar pada setiap kategori</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nama Kategori</TableHead>
                                            <TableHead className="text-right">Jumlah Unit</TableHead>
                                            <TableHead className="text-right">Kontribusi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {categoryStats.length > 0 ? (
                                            categoryStats.map((cat) => (
                                                <TableRow key={cat.id}>
                                                    <TableCell className="font-medium">{cat.category_name}</TableCell>
                                                    <TableCell className="text-right">{cat.assets_count}</TableCell>
                                                    <TableCell className="text-right">
                                                        {getPercentage(cat.assets_count)}%
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={3} className="text-center py-10 text-muted-foreground">
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
                                <CardTitle>Sebaran Aset di Setiap Lokasi</CardTitle>
                                <CardDescription>Lokalisasi perangkat berdasarkan ruangan atau gedung</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nama Lokasi</TableHead>
                                            <TableHead className="text-right">Jumlah Unit</TableHead>
                                            <TableHead className="text-right">Kapasitas</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {locationStats.length > 0 ? (
                                            locationStats.map((loc) => (
                                                <TableRow key={loc.id}>
                                                    <TableCell className="font-medium">{loc.location_name}</TableCell>
                                                    <TableCell className="text-right">{loc.assets_count}</TableCell>
                                                    <TableCell className="text-right">
                                                        {getPercentage(loc.assets_count)}%
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={3} className="text-center py-10 text-muted-foreground">
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
                                            <span className="font-medium">{conditionStats.good} ({getPercentage(conditionStats.good)}%)</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-secondary">
                                            <div className="h-full rounded-full bg-green-500" style={{ width: `${getPercentage(conditionStats.good)}%` }} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span>Rusak Ringan</span>
                                            <span className="font-medium">{conditionStats.minor_damage} ({getPercentage(conditionStats.minor_damage)}%)</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-secondary">
                                            <div className="h-full rounded-full bg-yellow-500" style={{ width: `${getPercentage(conditionStats.minor_damage)}%` }} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span>Rusak Berat</span>
                                            <span className="font-medium">{conditionStats.major_damage} ({getPercentage(conditionStats.major_damage)}%)</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-secondary">
                                            <div className="h-full rounded-full bg-red-500" style={{ width: `${getPercentage(conditionStats.major_damage)}%` }} />
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
                                        <svg className="h-full w-full" viewBox="0 0 100 100">
                                            <circle
                                                className="text-secondary stroke-current"
                                                strokeWidth="10"
                                                cx="50"
                                                cy="50"
                                                r="40"
                                                fill="transparent"
                                            ></circle>
                                            <circle
                                                className="text-blue-500 stroke-current"
                                                strokeWidth="10"
                                                strokeDasharray={(usageStats.total > 0 ? (usageStats.in_use / usageStats.total) * 251.2 : 0) + " 251.2"}
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
                                                {usageStats.total > 0 ? ((usageStats.in_use / usageStats.total) * 100).toFixed(0) : 0}%
                                            </span>
                                            <span className="text-[10px] uppercase text-muted-foreground text-center px-2">Digunakan</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-8 text-center w-full">
                                        <div>
                                            <p className="text-2xl font-bold">{usageStats.in_use}</p>
                                            <p className="text-xs text-muted-foreground uppercase">Aktif</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold">{usageStats.available}</p>
                                            <p className="text-xs text-muted-foreground uppercase">Tersedia</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
