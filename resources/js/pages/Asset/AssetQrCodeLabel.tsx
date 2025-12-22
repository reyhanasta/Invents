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
            className={`box-border h-[40mm] w-[60mm] border-3 border-teal-600 bg-white p-[3mm]`}
        >
            {/* Header */}
            <div className="mb-3 w-full items-center justify-between">
                <div className="text-[8px] font-bold tracking-wider text-primary uppercase">
                    Invents Assets Label
                </div>
                <div className="h-px w-8 bg-primary"></div>
            </div>
            <div className="grid w-full grid-cols-2 gap-2">
                {/* QR Section */}
                <div
                    className={`col-span-1 justify-self-center border-2 border-dotted border-teal-600 p-1`}
                >
                    <QRCode
                        value={assetQrdetailUrl.toString()}
                        size={65}
                        level="M"
                        viewBox="0 0 255 255"
                    />
                </div>

                <div className="col-span-1">
                    <div className={`text-[12px] font-bold`}>
                        {asset.asset_name}
                    </div>
                    <div className={`text-[10px] text-muted-foreground`}>
                        {asset.asset_code}
                    </div>
                </div>
            </div>
            {/* Footer */}
            <div className="mt-2 w-full border-t border-dashed border-foreground/20 pt-1">
                <div className={`text-center text-[7px] text-muted-foreground`}>
                    Scan QR code untuk melihat detail asset
                </div>
            </div>
        </div>
    );
}
