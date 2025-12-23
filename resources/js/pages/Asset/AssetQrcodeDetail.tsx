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
import {
    AlertCircle,
    Box,
    Calendar,
    CheckCircle2,
    Clock,
    Info,
    InfoIcon,
    List,
    MapPin,
    Wrench,
} from 'lucide-react';
import { Maintenance } from '../Maintenance/MaintenanceIndex';
import { Asset } from './AssetDetail';
import Assetmaintenance from './AssetMaintenance';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Qr Code Detail',
        href: assets().url,
    },
];

type AssetQrCodeDetailProps = {
    asset: Asset;
    categoryName: string;
    locationName: string;
    maintenance: Maintenance[];
};

const statusConfig = {
    available: {
        label: 'Tersedia',
        variant: 'success' as const,
        icon: <CheckCircle2 />,
        color: 'bg-green-600',
    },
    'in-use': {
        label: 'Sedang Digunakan',
        variant: 'info' as const,
        icon: <Clock />,
        color: 'bg-blue-600',
    },
    maintenance: {
        label: 'Maintenance',
        variant: 'warning' as const,
        icon: <Wrench />,
        color: 'bg-yellow-600',
    },
    retired: {
        label: 'Tidak Aktif',
        variant: 'secondary' as const,
        icon: <AlertCircle />,
        color: 'bg-red-600',
    },
};

export default function AssetQrcodeDetail({
    asset,
    categoryName,
    locationName,
    maintenance,
}: AssetQrCodeDetailProps) {
    const StatusIcon = statusConfig[asset.status].icon;
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="container grid grid-cols-1 sm:mx-auto lg:grid-cols-2">
                <div
                    id="asset-information"
                    className="col-span-1 space-y-4 p-2 md:p-4 lg:p-6"
                >
                    <Card id="Header" className="bg-primary text-white">
                        <CardHeader className="flex flex-row items-center">
                            <Box
                                size={60}
                                className="rounded-full bg-white/20 p-3"
                            />
                            <div className="flex flex-col gap-1">
                                <div className="flex flex-col">
                                    <span className="text-xs text-muted">
                                        Informasi Produk
                                    </span>
                                    <CardTitle className="text-lg">
                                        {asset.asset_name}
                                    </CardTitle>
                                </div>

                                <CardDescription className="flex flex-row gap-2">
                                    <Badge className="bg-white/20">
                                        {asset.asset_code}
                                    </Badge>

                                    <Badge
                                        className={`${
                                            statusConfig[asset.status].color
                                        } `}
                                    >
                                        {statusConfig[asset.status].icon}
                                        {statusConfig[asset.status].label}
                                    </Badge>
                                </CardDescription>
                            </div>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center">
                            <Info size={20} className="text-primary" />
                            <CardTitle>Informasi Umum</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-8">
                            <CardDescription className="rounded-2xl border bg-accent p-3 px-5 text-xs text-muted-foreground">
                                {asset.description || 'Tidak ada deskripsi'}
                            </CardDescription>
                            <div className="content flex flex-col gap-6">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="col-span-1 flex flex-row items-center gap-2">
                                        <InfoIcon
                                            size={35}
                                            className="rounded-xl border bg-accent p-2 text-primary"
                                        />
                                        <div className="flex flex-col gap-1">
                                            <CardDescription className="text-xs">
                                                Serial Number
                                            </CardDescription>
                                            <CardTitle className="text-sm">
                                                {asset.serial_number}
                                            </CardTitle>
                                        </div>
                                    </div>
                                    <div className="col-span-1 flex flex-row items-center gap-2">
                                        <List
                                            size={35}
                                            className="rounded-xl border bg-accent p-2 text-primary"
                                        />
                                        <div className="flex flex-col gap-1">
                                            <CardDescription className="text-xs">
                                                Category
                                            </CardDescription>
                                            <CardTitle className="text-sm">
                                                {categoryName}
                                            </CardTitle>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="col-span-1 flex flex-row items-center gap-2">
                                        <MapPin
                                            size={35}
                                            className="rounded-xl border bg-accent p-2 text-primary"
                                        />
                                        <div className="flex flex-col gap-1">
                                            <CardDescription className="text-xs">
                                                Location
                                            </CardDescription>
                                            <CardTitle className="text-sm">
                                                {locationName}
                                            </CardTitle>
                                        </div>
                                    </div>
                                    <div className="col-span-1 flex flex-row items-center gap-2">
                                        <Calendar
                                            size={35}
                                            className="rounded-xl border bg-accent p-2 text-primary"
                                        />
                                        <div className="flex flex-col gap-1">
                                            <CardDescription className="text-xs">
                                                Purchase Date
                                            </CardDescription>
                                            <CardTitle className="text-sm">
                                                {formatDate(
                                                    asset.acquisition_date ??
                                                        '',
                                                )}
                                            </CardTitle>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="maintenance">
                    <div className="col-span-1 space-y-4 md:p-4 lg:p-6">
                        <Assetmaintenance maintenance={maintenance} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
