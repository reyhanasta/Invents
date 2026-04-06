import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Asset } from '@/types';
import {
    Atom,
    Box,
    Calendar,
    HeartPulse,
    Info,
    InfoIcon,
    List,
    MapPin,
} from 'lucide-react';
import { conditionConfig } from './AssetIndex';
import { statusConfig } from './AssetQrcodeDetail';

// ============================================================
// AssetInformation — Komponen Informasi Aset
// ============================================================
// Komponen ini dipakai di 2 tempat:
//   1. AssetDetail.tsx (halaman detail — dengan Tabs)
//   2. AssetQrcodeDetail.tsx (halaman publik — via QR scan)
//
// Props opsional:
//   - headerOnly: hanya tampilkan header card (hijau teal)
//   - detailOnly: hanya tampilkan info grid (tanpa header)
//   - tanpa keduanya: tampilkan semua (default)
// ============================================================

// --- Helper: Format tanggal ke Bahasa Indonesia ---
function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

// --- Sub-komponen: Header Card (hijau teal) ---
// Menampilkan nama aset, kode, dan status
function HeaderCard({ asset }: { asset: Asset }) {
    return (
        <Card id="Header" className="bg-primary text-primary-foreground">
            <CardHeader className="flex flex-row items-center">
                <Box
                    size={60}
                    className="rounded-full bg-white/20 p-3 dark:border dark:border-primary-foreground/50"
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
                        <Badge className="border border-white/30 bg-white/20">
                            {asset.asset_code}
                        </Badge>

                        <Badge
                            className={`${
                                statusConfig[asset.status].color
                            } border border-white/30`}
                        >
                            {statusConfig[asset.status].icon}
                            {statusConfig[asset.status].label}
                        </Badge>
                    </CardDescription>
                </div>
            </CardHeader>
        </Card>
    );
}

// --- Sub-komponen: Detail Info Card ---
// Menampilkan grid info aset: serial number, category, location, dll.
function DetailInfoCard({
    asset,
    categoryName,
    locationName,
}: {
    asset: Asset;
    categoryName: string;
    locationName: string;
}) {
    return (
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
                    <div className="grid grid-cols-2 gap-12">
                        <div className="col-span-1 flex flex-row items-center gap-2">
                            <InfoIcon
                                size={35}
                                className="rounded-xl border bg-accent p-2 text-primary"
                            />
                            <div className="flex flex-col gap-1">
                                <CardDescription className="text-xs">
                                    Nomor Seri
                                </CardDescription>
                                <CardTitle className="text-sm">
                                    {asset.serial_number
                                        ? asset.serial_number
                                        : '-'}
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
                                    Kategori
                                </CardDescription>
                                <CardTitle className="text-sm">
                                    {categoryName}
                                </CardTitle>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-12">
                        <div className="col-span-1 flex flex-row items-center gap-2">
                            <MapPin
                                size={35}
                                className="rounded-xl border bg-accent p-2 text-primary"
                            />
                            <div className="flex flex-col gap-1">
                                <CardDescription className="text-xs">
                                    Lokasi
                                </CardDescription>
                                <CardTitle className="text-sm text-wrap">
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
                                    Tanggal Pembelian
                                </CardDescription>
                                <CardTitle className="text-sm">
                                    {formatDate(
                                        asset.acquisition_date ?? '',
                                    )}
                                </CardTitle>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-12">
                        <div className="col-span-1 flex flex-row items-center gap-2">
                            <Atom
                                size={35}
                                className="rounded-xl border bg-accent p-2 text-primary"
                            />
                            <div className="flex flex-col gap-1">
                                <CardDescription className="text-xs">
                                    Merek
                                </CardDescription>
                                <CardTitle className="text-sm">
                                    {asset.brand}
                                </CardTitle>
                            </div>
                        </div>
                        <div className="col-span-1 flex flex-row items-center gap-2">
                            <HeartPulse
                                size={35}
                                className="rounded-xl border bg-accent p-2 text-primary"
                            />
                            <div className="flex flex-col gap-1">
                                <CardDescription className="text-xs">
                                    Kondisi
                                </CardDescription>
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
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// --- Tipe Props ---
type AssetInformationProps = {
    asset: Asset;
    categoryName: string;
    locationName: string;
    headerOnly?: boolean;
    detailOnly?: boolean;
};

// --- Komponen Utama ---
export default function AssetInformation({
    asset,
    categoryName,
    locationName,
    headerOnly = false,
    detailOnly = false,
}: AssetInformationProps) {
    // Jika detailOnly = true, hanya render Card info (tanpa header)
    if (detailOnly) {
        return (
            <DetailInfoCard
                asset={asset}
                categoryName={categoryName}
                locationName={locationName}
            />
        );
    }

    // Jika headerOnly = true, hanya render header card
    if (headerOnly) {
        return <HeaderCard asset={asset} />;
    }

    // Default: render keduanya (backward compatible untuk QrcodeDetail)
    return (
        <div className="space-y-2">
            <HeaderCard asset={asset} />
            <DetailInfoCard
                asset={asset}
                categoryName={categoryName}
                locationName={locationName}
            />
        </div>
    );
}
