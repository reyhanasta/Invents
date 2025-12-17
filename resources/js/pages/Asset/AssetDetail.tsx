import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';

import { assets } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { router } from '@inertiajs/react';
import { ArrowLeft, Pencil, Printer, Tag } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Assets Detail',
        href: assets().url,
    },
];

type Asset = {
    id: number;
    asset_name: string;
    asset_code: string;
    category_id: number;
    location_id: number;
    brand?: string;
    serial_number?: string;
    condition: string;
    acquisition_date?: string;
    description?: string;
};

type AssetsShowProps = {
    asset: Asset;
    categories: Array<{
        id: number;
        category_name: string;
        prefix_code: string;
    }>;
    locations: Array<{
        id: number;
        location_name: string;
    }>;
};

export default function AssetDetail({
    asset,
    categories,
    location,
}: AssetsShowProps) {
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
                        className="flex justify-between gap-4"
                    >
                        <Button
                            variant="outline"
                            className="text-accent-foreground"
                            onClick={() => router.visit(assets().url)}
                        >
                            <Printer />
                            Print Label
                        </Button>
                        <Button
                            variant="outline"
                            className="bg-primary text-primary-foreground"
                        >
                            <Pencil />
                            Edit Assets
                        </Button>
                    </div>
                </div>
                <div aria-label="content" className="grid grid-cols-2 gap-4">
                    <div id="content-information">
                        <Card>
                            <CardHeader>
                                <CardTitle className="border-b-2 pb-4">
                                    {asset.asset_name} (#{asset.asset_code})
                                </CardTitle>
                                <CardContent className="mx-2 mt-4">
                                    <div
                                        id="information"
                                        className="grid grid-cols-2 justify-between space-y-6"
                                    >
                                        <div className="space-y-1">
                                            <div className="flex gap-2">
                                                <Tag size={12} />
                                                <Label className="text-muted-foreground">
                                                    Category
                                                </Label>
                                            </div>
                                            <span>{asset.category_id}</span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex gap-2">
                                                <Tag size={12} />
                                                <Label className="text-muted-foreground">
                                                    Location
                                                </Label>
                                            </div>
                                            <span>{asset.location_id}</span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex gap-2">
                                                <Tag size={12} />
                                                <Label className="text-muted-foreground">
                                                    Purchase Date
                                                </Label>
                                            </div>
                                            <span>
                                                {asset.acquisition_date}
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex gap-2">
                                                <Tag size={12} />
                                                <Label className="text-muted-foreground">
                                                    Brand
                                                </Label>
                                            </div>
                                            <span>{asset.brand}</span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex gap-2">
                                                <Tag size={12} />
                                                <Label className="text-muted-foreground">
                                                    Serial Number
                                                </Label>
                                            </div>
                                            <span>{asset.serial_number}</span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex gap-2">
                                                <Tag size={12} />
                                                <Label className="text-muted-foreground">
                                                    Status
                                                </Label>
                                            </div>
                                            <span>{asset.condition}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </CardHeader>
                        </Card>
                    </div>
                    <div id="content-label">
                        <Card>
                            <CardHeader>
                                <CardTitle>Asset Information</CardTitle>
                                <CardContent>
                                    <p>Disini isinya semua cuy</p>
                                </CardContent>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
