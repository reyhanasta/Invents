import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { assets } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { router } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowLeft,
    CheckCircle2,
    Clock,
    Package,
    Wrench,
} from 'lucide-react';

import { Asset } from './AssetDetail';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Assets',
        href: assets().url,
    },
];

type AssetQrCodeDetailProps = {
    asset: Asset;
};

const statusConfig = {
    available: {
        label: 'Tersedia',
        variant: 'success' as const,
        icon: CheckCircle2,
    },
    'in-use': {
        label: 'Sedang Digunakan',
        variant: 'info' as const,
        icon: Clock,
    },
    maintenance: {
        label: 'Maintenance',
        variant: 'warning' as const,
        icon: Wrench,
    },
    retired: {
        label: 'Tidak Aktif',
        variant: 'secondary' as const,
        icon: AlertCircle,
    },
};

// const maintenanceTypeConfig = {
//     routine: { label: 'Rutin', color: 'bg-blue-100 text-blue-700' },
//     repair: { label: 'Perbaikan', color: 'bg-red-100 text-red-700' },
//     calibration: { label: 'Kalibrasi', color: 'bg-purple-100 text-purple-700' },
//     inspection: { label: 'Inspeksi', color: 'bg-green-100 text-green-700' },
// };

// const maintenanceStatusConfig = {
//     completed: { label: 'Selesai', color: 'bg-green-100 text-green-700' },
//     scheduled: { label: 'Terjadwal', color: 'bg-blue-100 text-blue-700' },
//     'in-progress': {
//         label: 'Sedang Berjalan',
//         color: 'bg-yellow-100 text-yellow-700',
//     },
// };

export default function AssetQrcodeDetail({ asset }: AssetQrCodeDetailProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="container mx-auto space-y-6 p-2 md:p-4 lg:p-6">
                <div aria-label="header" className="flex justify-between">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="hover:no gap-3 text-sm text-muted-foreground"
                        onClick={() => router.visit(assets().url)}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                </div>
                {/* Header */}
                <header className="bg-primary px-4 py-6 text-primary-foreground shadow-lg">
                    <div className="mx-auto max-w-4xl">
                        <div className="mb-2 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                                <Package className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm text-primary-foreground/80">
                                    Informasi Asset
                                </p>
                                <h1 className="text-xl font-bold">
                                    {asset.asset_name}
                                </h1>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                            <Badge
                                variant="secondary"
                                className="border-0 bg-white/20 text-white"
                            >
                                {asset.id}
                            </Badge>
                            <Badge
                                className={`${
                                    statusConfig[asset.status].variant ===
                                    'success'
                                        ? 'bg-green-500'
                                        : statusConfig[asset.status].variant ===
                                            'info'
                                          ? 'bg-blue-500'
                                          : statusConfig[asset.status]
                                                  .variant === 'warning'
                                            ? 'bg-yellow-500'
                                            : 'bg-gray-500'
                                } border-0 text-white`}
                            >
                                <Clock className="mr-1 h-3 w-3" />
                                {statusConfig[asset.status].label}
                            </Badge>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="mx-auto max-w-4xl space-y-4 p-4 pb-8">
                    {/* Asset Info Card */}
                    <Card className="shadow-sm">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Package className="h-5 w-5 text-primary" />
                                Informasi Umum
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            {asset.description && (
                                <p className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                                    {asset.description}
                                </p>
                            )}

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {/* <InfoItem
                                    icon={<Hash className="h-4 w-4" />}
                                    label="Serial Number"
                                    value={asset.serial_number || '-'}
                                />
                                <InfoItem
                                    icon={<Building2 className="h-4 w-4" />}
                                    label="Manufacturer"
                                    value={asset.location_id || '-'}
                                />
                                <InfoItem
                                    icon={<Package className="h-4 w-4" />}
                                    label="Model"
                                    value={asset.category_id || '-'}
                                />
                                <InfoItem
                                    icon={<MapPin className="h-4 w-4" />}
                                    label="Lokasi"
                                    value={asset.location_id}
                                />
                                <InfoItem
                                    icon={<Calendar className="h-4 w-4" />}
                                    label="Tanggal Pembelian"
                                    value={asset.acquisition_date}
                                />

                                {asset.assignedTo && (
                                    <Info
                                        icon={<User className="h-4 w-4" />}
                                        label="Ditugaskan Kepada"
                                        value={asset.assignedTo}
                                        className="sm:col-span-2"
                                    />
                                )} */}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Maintenance History Card */}
                    <Card className="shadow-sm">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Wrench className="h-5 w-5 text-primary" />
                                Riwayat Maintenance
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4"></div>
                        </CardContent>
                    </Card>

                    {/* Footer */}
                    <div className="pt-4 text-center text-sm text-muted-foreground">
                        <p>© 2024 Clinic Asset Management System</p>
                        <p className="mt-1">
                            Last updated: {new Date().toISOString()}
                        </p>
                    </div>
                </main>
            </div>
        </AppLayout>
    );
}
