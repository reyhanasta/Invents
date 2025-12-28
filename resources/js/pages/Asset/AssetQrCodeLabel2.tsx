import { assetsQrcodeDetail } from '@/routes';
import { Asset } from '@/types';
import QRCode from 'react-qr-code';

type BarcodeLabelProps = {
    asset: Asset;
    company: string;
};

export default function AssetQrCodeLabel({
    asset,
    company = 'company name',
}: BarcodeLabelProps) {
    const assetQrdetailUrl =
        window.location.origin + assetsQrcodeDetail(asset.id).url;
    return (
        <div
            className={`print-color box-border h-[40mm] w-[60mm] border-4 border-black bg-white p-[3mm]`}
        >
            <div className="mb-2 flex w-full items-center justify-between">
                <div className="print-color text-[8px] font-bold tracking-wider text-black uppercase">
                    {company}
                </div>
                <div className="print-color h-px w-8 bg-black"></div>
            </div>
            <div className="flex h-[28mm] w-full flex-row gap-3">
                {/* QR Section */}
                <div className="print-color col-span-1 flex flex-col items-center justify-center">
                    <QRCode
                        value={assetQrdetailUrl.toString()}
                        size={70}
                        level="M"
                        viewBox="0 0 256 256"
                        className="justify-self-auto"
                    />
                    <span className="font-mono text-lg text-black">
                        {asset.asset_code}
                    </span>
                </div>

                <div className="col-span-1 flex w-28 flex-col text-wrap text-black">
                    <div className="print-color flex h-full w-full flex-col justify-center">
                        {/* Detail Alat */}
                        <span className="text-sm font-bold text-ellipsis">
                            {asset.asset_name}
                        </span>
                    </div>
                    {/* Footer */}
                    <div
                        className="print-color w-full border-t border-dashed border-foreground/20 pt-1"
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
            </div>
        </div>
    );
}
