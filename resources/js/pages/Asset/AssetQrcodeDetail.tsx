import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import { assets } from '@/routes';
import { Asset } from '@/types';
import { AlertCircle, CheckCircle2, Clock, Wrench } from 'lucide-react';
import { Maintenance } from '../Maintenance/MaintenanceIndex';
import AssetInformation from './AssetInformation';
import Assetmaintenance from './AssetMaintenance';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Qr Code Detail',
        href: assets().url,
    },
];

export type AssetQrCodeDetailProps = {
    asset: Asset;
    categoryName: string;
    locationName: string;
    maintenance: Maintenance[];
};

export const statusConfig = {
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
    // const StatusIcon = statusConfig[asset.status].icon;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="container grid grid-cols-1 gap-4 p-4 sm:mx-auto lg:grid-cols-2">
                <div id="asset-information" className="col-span-1">
                    <AssetInformation
                        asset={asset}
                        categoryName={categoryName}
                        locationName={locationName}
                    />
                </div>
                <div className="maintenance">
                    <div className="col-span-1">
                        <Assetmaintenance maintenance={maintenance} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
