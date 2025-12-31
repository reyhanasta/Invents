import AppLayout from '@/layouts/app-layout';
import { Maintenance, type BreadcrumbItem } from '@/types';

import { maintenances } from '@/routes';
import { Asset } from '@/types';
import { AlertCircle, CheckCircle2, Clock, Wrench } from 'lucide-react';
import { memo } from 'react';
import AssetInformation from './AssetInformation';
import Assetmaintenance from './AssetMaintenance';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Qr Code Detail',
        href: maintenances().url,
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
    // Di bagian bawah component, sebelum export default
    const MemoizedAssetInformation = memo(AssetInformation);
    const MemoizedAssetMaintenance = memo(Assetmaintenance);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="outer-container space-y-6 p-2 md:p-4 lg:p-6">
                <div className="container grid grid-cols-1 gap-4 sm:mx-auto lg:grid-cols-2">
                    <div id="asset-information" className="col-span-1">
                        <MemoizedAssetInformation
                            asset={asset}
                            categoryName={categoryName}
                            locationName={locationName}
                        />
                    </div>
                    <div className="maintenance">
                        <div className="col-span-1">
                            <MemoizedAssetMaintenance
                                maintenance={maintenance}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
