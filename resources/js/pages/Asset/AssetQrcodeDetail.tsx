import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { assets } from '@/routes';
import { Box, Info, InfoIcon, Verified, Wrench } from 'lucide-react';
import { Asset } from './AssetDetail';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Qr Code Detail',
        href: assets().url,
    },
];

type AssetQrCodeDetailProps = {
    asset: Asset;
};

// const statusConfig = {
//     available: {
//         label: 'Tersedia',
//         variant: 'success' as const,
//         icon: CheckCircle2,
//     },
//     'in-use': {
//         label: 'Sedang Digunakan',
//         variant: 'info' as const,
//         icon: Clock,
//     },
//     maintenance: {
//         label: 'Maintenance',
//         variant: 'warning' as const,
//         icon: Wrench,
//     },
//     retired: {
//         label: 'Tidak Aktif',
//         variant: 'secondary' as const,
//         icon: AlertCircle,
//     },
// };

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
            <div className="container grid grid-cols-1 sm:mx-auto lg:grid-cols-2">
                <div
                    id="asset-information"
                    className="col-span-1 space-y-4 p-2 md:p-4 lg:p-6"
                >
                    <Card id="Header">
                        <CardHeader className="flex flex-row items-center">
                            <Box
                                size={60}
                                className="rounded-full border bg-accent p-3"
                            />
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-muted-foreground">
                                    Informasi Produk
                                </span>
                                <CardTitle className="text-lg">
                                    Patient Monitor
                                </CardTitle>
                                <CardDescription className="flex flex-row gap-2">
                                    <Badge>AST-002</Badge>
                                    <Badge>
                                        <Verified /> Tersedia
                                    </Badge>
                                </CardDescription>
                            </div>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center">
                            <Info size={20} />
                            <CardTitle>Informasi Umum</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-8">
                            <CardDescription className="rounded-2xl border border-primary bg-amber-50 p-3 text-xs text-muted-foreground">
                                Multi-parameter patient monitor for vital signs
                                monitoring
                            </CardDescription>
                            <div className="content flex flex-col gap-8">
                                <div className="grid grid-cols-2">
                                    <div className="col-span-1 flex flex-row items-center gap-2">
                                        <InfoIcon
                                            size={40}
                                            color="oklch(0.6 0.118 184.704)"
                                            className="rounded-xl border bg-accent p-2"
                                        />
                                        <div className="flex flex-col gap-1">
                                            <CardDescription className="text-xs">
                                                Serial Number
                                            </CardDescription>
                                            <CardTitle className="text-sm">
                                                PM-2023-005678
                                            </CardTitle>
                                        </div>
                                    </div>
                                    <div className="col-span-1 flex flex-row items-center gap-2">
                                        <InfoIcon
                                            size={40}
                                            color="oklch(0.6 0.118 184.704)"
                                            className="rounded-xl border bg-accent p-2"
                                        />
                                        <div className="flex flex-col gap-1">
                                            <CardDescription className="text-xs">
                                                Serial Number
                                            </CardDescription>
                                            <CardTitle className="text-sm">
                                                PM-2023-005678
                                            </CardTitle>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="col-span-1 flex flex-row items-center gap-2">
                                        <InfoIcon
                                            size={40}
                                            color="oklch(0.6 0.118 184.704)"
                                            className="rounded-xl border bg-accent p-2"
                                        />
                                        <div className="flex flex-col gap-1">
                                            <CardDescription className="text-xs">
                                                Serial Number
                                            </CardDescription>
                                            <CardTitle className="text-sm">
                                                PM-2023-005678
                                            </CardTitle>
                                        </div>
                                    </div>
                                    <div className="col-span-1 flex flex-row items-center gap-2">
                                        <InfoIcon
                                            size={40}
                                            color="oklch(0.6 0.118 184.704)"
                                            className="rounded-xl border bg-accent p-2"
                                        />
                                        <div className="flex flex-col gap-1">
                                            <CardDescription className="text-xs">
                                                Serial Number
                                            </CardDescription>
                                            <CardTitle className="text-sm">
                                                PM-2023-005678
                                            </CardTitle>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="maintanance">
                    <div className="col-span-1 space-y-4 md:p-4 lg:p-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex flex-row gap-2">
                                    <Wrench size={20} />
                                    Maintanance
                                </CardTitle>
                                <CardDescription>
                                    Riwaya Maintanance ada di sini
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                Ini Isi dari riwayat maintanance ya (berupa
                                tabel)
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
