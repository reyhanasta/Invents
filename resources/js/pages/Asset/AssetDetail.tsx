import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';

import { assets } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { router } from '@inertiajs/react';
import {
    ArrowLeft,
    Box,
    Calendar,
    Hash,
    MapPin,
    Pencil,
    Printer,
    Tag,
} from 'lucide-react';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { conditionConfig } from './AssetIndex';
import AssetQrCodeLabel from './AssetQrCodeLabel';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Assets Detail',
        href: assets().url,
    },
];

export type Asset = {
    id: number;
    asset_name: string;
    asset_code: string;
    category_id: number;
    location_id: number;
    brand?: string;
    serial_number?: string;
    condition: string;
    status: 'available' | 'in-use' | 'maintenance' | 'retired';
    acquisition_date?: string;
    description?: string;
};

type AssetsShowProps = {
    asset: Asset;
    categoryName: string;
    locationName: string;
};

export default function AssetDetail({
    asset,
    categoryName,
    locationName,
}: AssetsShowProps) {
    const assetBoxSize = 15;
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({
        contentRef,
        documentTitle: `Asset Label - ${asset.asset_code}`,
        pageStyle: `
            @page {
                size: 60mm 40mm;
                margin: 0;
            }
            @media print {
                body {
                    margin: 0;
                    padding: 0;
                }
                * {
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
            }
        `,
    });
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

                    <div
                        aria-label="buttons"
                        className="flex justify-between gap-2"
                    >
                        <Button
                            variant="outline"
                            className="text-accent-foreground"
                            // onClick={() =>
                            //     router.visit(`/assets/${asset.id}/print-label`)
                            // }
                            onClick={reactToPrintFn}
                        >
                            <Printer />
                            Print Label
                        </Button>
                        <Button
                            variant="outline"
                            className="bg-primary text-primary-foreground"
                            onClick={() =>
                                router.visit(`/assets/${asset.id}/edit`)
                            }
                        >
                            <Pencil />
                            Edit Assets
                        </Button>
                    </div>
                </div>
                <div
                    aria-label="content"
                    className="grid grid-cols-1 gap-2 md:grid-cols-4"
                >
                    <div
                        id="content-information"
                        className="space-y-6 md:col-span-3"
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="border-b-2 pb-4 text-2xl font-bold">
                                    {asset.asset_name} (#{asset.asset_code})
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="mx-2 text-lg">
                                <div
                                    id="information"
                                    className="grid grid-cols-2 justify-between space-y-6"
                                >
                                    <div className="space-y-1">
                                        <div className="asset-information">
                                            <Box size={assetBoxSize} />
                                            <Label className="text-muted-foreground">
                                                Category
                                            </Label>
                                        </div>
                                        <span>{categoryName}</span>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="asset-information">
                                            <MapPin size={assetBoxSize} />
                                            <Label className="text-muted-foreground">
                                                Location
                                            </Label>
                                        </div>
                                        <span>{locationName}</span>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="asset-information">
                                            <Calendar size={assetBoxSize} />
                                            <Label className="text-muted-foreground">
                                                Purchase Date
                                            </Label>
                                        </div>
                                        <span>{asset.acquisition_date}</span>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="asset-information">
                                            <Tag size={assetBoxSize} />
                                            <Label className="text-muted-foreground">
                                                Brand
                                            </Label>
                                        </div>
                                        <span>{asset.brand}</span>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="asset-information">
                                            <Hash size={assetBoxSize} />
                                            <Label className="text-muted-foreground">
                                                Serial Number
                                            </Label>
                                        </div>
                                        <span>{asset.serial_number}</span>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="asset-information">
                                            <Label className="text-muted-foreground">
                                                Status
                                            </Label>
                                        </div>
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
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div id="content-label">
                        <Card>
                            <CardHeader>
                                <CardTitle className="border-b-2 pb-4 text-lg">
                                    Asset Label Preview
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex justify-center">
                                <div ref={contentRef}>
                                    <AssetQrCodeLabel asset={asset} />
                                </div>
                                {/* <AssetLabel
                                    asset={asset}
                                    location={locationName}
                                /> */}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
