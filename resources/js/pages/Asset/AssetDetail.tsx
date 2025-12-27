import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

import { assets } from '@/routes';
import { Asset, BreadcrumbItem } from '@/types';
import { router } from '@inertiajs/react';
import { ArrowLeft, Pencil, Printer } from 'lucide-react';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import AssetInformation from './AssetInformation';
import AssetQrCodeLabel from './AssetQrCodeLabel';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Assets Detail',
        href: assets().url,
    },
];

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
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({
        contentRef,
        documentTitle: `${asset.asset_name} - ${asset.asset_code}`,
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
                    className="grid grid-cols-1 gap-2 xl:grid-cols-4"
                >
                    <div
                        id="content-information"
                        className="space-y-2 md:col-span-3"
                    >
                        <AssetInformation
                            asset={asset}
                            categoryName={categoryName}
                            locationName={locationName}
                        />
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
