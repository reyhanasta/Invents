import { assetsQrcodeDetail } from '@/routes';
import QRcode from 'react-qr-code';
import { Asset } from './AssetDetail';

type AssetLabelProps = {
    asset: Asset;
    location: string;
};
export default function AssetLabel({ asset, location }: AssetLabelProps) {
    const assetQrdetailUrl =
        window.location.origin + assetsQrcodeDetail(asset.id).url;
    return (
        <div className="w-72 rounded-lg border-2 border-primary bg-card p-4 text-center">
            <div className="mb-2 text-xs font-semibold text-primary">
                INVENTS ASSET LABEL
            </div>
            <div className="mb-1 text-sm font-bold text-foreground">
                {asset.asset_name}
            </div>
            <div className="mb-3 text-xs text-muted-foreground">
                {asset.asset_code}
            </div>
            <div className="flex justify-center">
                <QRcode
                    value={assetQrdetailUrl.toString()}
                    size={160}
                    viewBox={`0 0 256 256`}
                />
            </div>
            <div className="label-location mt-2 text-[10px] text-muted-foreground">
                Location: {location}
            </div>
        </div>
    );
}
