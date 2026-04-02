import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { assets } from '@/routes';
import { Asset, BreadcrumbItem, Maintenance } from '@/types';
import { router } from '@inertiajs/react';
import { ArrowLeft, Info, Pencil, QrCode } from 'lucide-react';
import AssetInformation from './AssetInformation';
import AssetLabelTab from './AssetLabelTab';
import AssetMaintenance from './AssetMaintenance';

// ============================================================
// AssetDetail — Halaman Detail Aset (Tabbed)
// ============================================================
// Halaman ini menggabungkan 2 fitur yang sebelumnya terpisah:
//   1. Informasi Umum (detail aset + riwayat maintenance)
//   2. QR Code Label (konfigurasi + preview + print label)
//
// Menggunakan ShadcnUI Tabs untuk navigasi antar fitur.
// ============================================================

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Assets',
        href: assets().url,
    },
    {
        title: 'Detail',
        href: '#',
    },
];

// Tipe props yang diterima dari AssetController@show
type AssetDetailProps = {
    asset: Asset;
    categoryName: string;
    locationName: string;
    maintenance: Maintenance[];
    company: string;
};

export default function AssetDetail({
    asset,
    categoryName,
    locationName,
    maintenance,
    company,
}: AssetDetailProps) {
    // Baca query param ?tab=label dari URL
    // Ini dipakai ketika user klik "Cetak Label" dari halaman index
    const urlParams = new URLSearchParams(window.location.search);
    const defaultTab = urlParams.get('tab') === 'label' ? 'label' : 'info';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="container mx-auto space-y-6 p-2 md:p-4 lg:p-6">
                {/* === Header: Back button + action buttons === */}
                <div className="flex items-center justify-between">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 text-sm text-muted-foreground"
                        onClick={() => router.visit(assets().url)}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>

                    <Button
                        onClick={() =>
                            router.visit(`/assets/${asset.id}/edit`)
                        }
                    >
                        <Pencil className="mr-1 h-4 w-4" />
                        Edit Asset
                    </Button>
                </div>

                {/* === Asset Header Card (tetap terlihat di semua tab) === */}
                <AssetInformation
                    asset={asset}
                    categoryName={categoryName}
                    locationName={locationName}
                    headerOnly
                />

                {/* === Tabs: Informasi Umum | QR Code Label === */}
                <Tabs defaultValue={defaultTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-grid">
                        <TabsTrigger
                            value="info"
                            className="gap-2"
                        >
                            <Info className="h-4 w-4" />
                            Informasi Umum
                        </TabsTrigger>
                        <TabsTrigger
                            value="label"
                            className="gap-2"
                        >
                            <QrCode className="h-4 w-4" />
                            QR Code Label
                        </TabsTrigger>
                    </TabsList>

                    {/* --- Tab 1: Informasi Umum + Maintenance --- */}
                    <TabsContent value="info" className="mt-6">
                        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                            {/* Info aset (kolom kiri, 2/3 layar) */}
                            <div className="xl:col-span-2">
                                <AssetInformation
                                    asset={asset}
                                    categoryName={categoryName}
                                    locationName={locationName}
                                    detailOnly
                                />
                            </div>

                            {/* Riwayat Maintenance (kolom kanan, 1/3 layar) */}
                            <div className="xl:col-span-1">
                                <AssetMaintenance
                                    maintenance={maintenance ?? []}
                                />
                            </div>
                        </div>
                    </TabsContent>

                    {/* --- Tab 2: QR Code Label --- */}
                    <TabsContent value="label" className="mt-6">
                        <AssetLabelTab
                            asset={asset}
                            company={company}
                            locationName={locationName}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
