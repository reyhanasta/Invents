import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { assets, assetsDetail } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { router } from '@inertiajs/react';
import { ArrowLeft, Printer } from 'lucide-react';
import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Asset } from './AssetDetail';
import AssetQrCodeLabel from './AssetQrCodeLabel';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Assets',
        href: assets().url,
    },
];

type LabelSize = '60x40' | '60x30';

type AssetPrintLabelProps = {
    asset: Asset;
    categoryName: string;
    locationName: string;
};

export default function AssetPrintLabel({
    asset,
    locationName,
}: AssetPrintLabelProps) {
    const [selectedSize, setSelectedSize] = useState<LabelSize>('60x40');

    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({
        contentRef,
        documentTitle: `Asset Label - ${asset.asset_code}`,
        pageStyle: `
        @page {
            size: ${selectedSize === '60x40' ? '60mm 40mm' : '60mm 30mm'};
            margin: 0;
        }
        @media print {
            body {
                margin: 0;
                padding: 0;
            }
            * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
            }
            .print-color {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
            }
            .border-teal-600 {
                border-color: #0d9488 !important;
            }
            .bg-white {
                background-color: white !important;
            }
            .text-primary {
                color: #0f172a !important;
            }
            .text-muted-foreground {
                color: #64748b !important;
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
                        onClick={() => router.visit(assetsDetail(asset.id).url)}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>

                    <div
                        aria-label="buttons"
                        className="flex justify-between gap-2"
                    >
                        <Button
                            variant="default"
                            className="bg-primary text-primary-foreground"
                            onClick={reactToPrintFn}
                        >
                            <Printer className="h-4 w-4" />
                            Print Label
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle>Label Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="size">Label Size (mm)</Label>
                                <Select
                                    value={selectedSize}
                                    onValueChange={(value) =>
                                        setSelectedSize(value as LabelSize)
                                    }
                                >
                                    <SelectTrigger id="size">
                                        <SelectValue placeholder="Select size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="60x40">
                                            60mm x 40mm
                                        </SelectItem>
                                        <SelectItem value="60x30">
                                            60mm x 30mm
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="rounded-lg border bg-muted/50 p-4 text-sm">
                                <div className="space-y-2">
                                    <div>
                                        <strong>Asset Code:</strong>{' '}
                                        {asset.asset_code}
                                    </div>
                                    <div>
                                        <strong>Asset Name:</strong>{' '}
                                        {asset.asset_name}
                                    </div>
                                    <div>
                                        <strong>Location:</strong>{' '}
                                        {locationName}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Preview</CardTitle>
                            </CardHeader>
                            <CardContent className="flex justify-center rounded-lg bg-muted/30 p-8">
                                <div
                                    ref={contentRef}
                                    className="flex items-center justify-center"
                                >
                                    <AssetQrCodeLabel asset={asset} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
