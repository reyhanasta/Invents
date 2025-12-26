import { assetsQrcodeDetail } from '@/routes';
import QRCode from 'react-qr-code';
import { Asset } from './AssetDetail';

type BarcodeLabelProps = {
    asset: Asset;
};

export default function AssetQrCodeLabel({ asset }: BarcodeLabelProps) {
    const assetQrdetailUrl =
        window.location.origin + assetsQrcodeDetail(asset.id).url;
    return (
        <div
            className={`print-color box-border h-[40mm] w-[60mm] border-3 border-teal-600 bg-white p-[3mm]`}
            style={{
                borderColor: '#0d9488 !important',
                backgroundColor: 'white !important',
                WebkitPrintColorAdjust: 'exact',
                printColorAdjust: 'exact',
                colorAdjust: 'exact',
            }}
        >
            {/* Header */}
            <div className="mb-3 w-full items-center justify-between">
                <div
                    className="print-color text-[8px] font-bold tracking-wider text-primary uppercase"
                    style={{
                        color: '#0f172a !important',
                        WebkitPrintColorAdjust: 'exact',
                        printColorAdjust: 'exact',
                    }}
                >
                    Invents Assets Label
                </div>
                <div
                    className="print-color h-px w-8 bg-primary"
                    style={{
                        backgroundColor: '#0f172a !important',
                        WebkitPrintColorAdjust: 'exact',
                        printColorAdjust: 'exact',
                    }}
                ></div>
            </div>
            <div className="grid w-full grid-cols-2 gap-2">
                {/* QR Section */}
                <div
                    className={`print-color col-span-1 justify-self-center border-2 border-dotted border-teal-600 p-1`}
                    style={{
                        borderColor: '#0d9488 !important',
                        WebkitPrintColorAdjust: 'exact',
                        printColorAdjust: 'exact',
                    }}
                >
                    <QRCode
                        value={assetQrdetailUrl.toString()}
                        size={65}
                        level="M"
                        viewBox="0 0 255 255"
                    />
                </div>

                <div className="col-span-1">
                    <div
                        className={`print-color text-[12px] font-bold`}
                        style={{
                            color: '#0f172a !important',
                            WebkitPrintColorAdjust: 'exact',
                            printColorAdjust: 'exact',
                        }}
                    >
                        {asset.asset_name}
                    </div>
                    <div
                        className={`print-color text-[10px] text-muted-foreground`}
                        style={{
                            color: '#64748b !important',
                            WebkitPrintColorAdjust: 'exact',
                            printColorAdjust: 'exact',
                        }}
                    >
                        {asset.asset_code}
                    </div>
                </div>
            </div>
            {/* Footer */}
            <div
                className="print-color mt-2 w-full border-t border-dashed border-foreground/20 pt-1"
                style={{
                    borderTopColor: '#e2e8f0 !important',
                    WebkitPrintColorAdjust: 'exact',
                    printColorAdjust: 'exact',
                }}
            >
                <div
                    className={`print-color text-center text-[7px] text-muted-foreground`}
                    style={{
                        color: '#64748b !important',
                        WebkitPrintColorAdjust: 'exact',
                        printColorAdjust: 'exact',
                    }}
                >
                    Scan QR code untuk melihat detail asset
                </div>
            </div>
        </div>
    );
}
