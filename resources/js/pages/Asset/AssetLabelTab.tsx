import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Asset } from '@/types';
import { Printer } from 'lucide-react';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import AssetQrCodeLabel from './AssetQrCodeLabel';

// ============================================================
// AssetLabelTab — Tab "QR Code Label"
// ============================================================
// Komponen ini menampilkan:
// 1. Konfigurasi Label (info ringkas aset)
// 2. Preview Label (QR code + data aset)
// 3. Tombol Print
//
// Ukuran label: 60x40mm (fixed)
// Data yang ditampilkan: Nama, Kode, Lokasi (selalu tampil)
// ============================================================

type AssetLabelTabProps = {
    asset: Asset;
    company: string;
    locationName: string;
};

export default function AssetLabelTab({
    asset,
    company,
    locationName,
}: AssetLabelTabProps) {
    // Ref untuk area yang akan di-print
    const printRef = useRef<HTMLDivElement>(null);

    // Setup react-to-print dengan ukuran label 60x40mm
    const handlePrint = useReactToPrint({
        contentRef: printRef,
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
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                    color-adjust: exact !important;
                }
            }
        `,
    });

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* === Panel Kiri: Konfigurasi Label === */}
            <Card className="lg:col-span-1">
                <CardHeader>
                    <CardTitle>Konfigurasi Label</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Ukuran Label (fixed 60x40mm) */}
                    <div className="space-y-2">
                        <span className="text-sm font-medium">Label Size</span>
                        <div className="flex items-center rounded-md border bg-muted/50 px-3 py-2 text-sm">
                            60mm x 40mm
                        </div>
                    </div>

                    {/* Info ringkas aset yang akan dicetak */}
                    <div className="rounded-lg border bg-muted/50 p-4 text-sm">
                        <div className="space-y-2">
                            <div>
                                <strong>Nama Aset:</strong> {asset.asset_name}
                            </div>
                            <div>
                                <strong>Kode Aset:</strong> {asset.asset_code}
                            </div>
                            <div>
                                <strong>Lokasi:</strong> {locationName}
                            </div>
                        </div>
                    </div>

                    {/* Tombol Print */}
                    <Button className="w-full" onClick={handlePrint}>
                        <Printer className="mr-2 h-4 w-4" />
                        Cetak Label
                    </Button>
                </CardContent>
            </Card>

            {/* === Panel Kanan: Preview Label === */}
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Preview Label</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center overflow-auto rounded-lg bg-muted/30 p-8">
                        {/* Area yang akan di-print */}
                        <div
                            ref={printRef}
                            className="flex items-center justify-center bg-white shadow-sm"
                        >
                            <AssetQrCodeLabel
                                asset={asset}
                                company={company}
                                locationName={locationName}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
