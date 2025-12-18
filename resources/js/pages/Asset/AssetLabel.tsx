import QRcode from 'react-qr-code';
import { Asset } from './AssetDetail';

type AssetLabelProps = {
    asset: Asset;
    location: string;
    category: string;
};
export default function AssetLabel({
    asset,
    location,
    category,
}: AssetLabelProps) {
    const assetQrData = `Asset Name: ${asset.asset_name}\nAsset Code: ${asset.asset_code}\nLocation : ${location}\nCategory: ${category}`;
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
                {/* <Barcode
                    // value={asset.id}
                    value="123456789012"
                    width={1.5}
                    height={50}
                    fontSize={10}
                    margin={0}
                    displayValue={false}
                /> */}

                <QRcode
                    value={assetQrData}
                    size={116}
                    viewBox={`0 0 256 256`}
                />
            </div>
            <div className="label-location mt-2 text-[10px] text-muted-foreground">
                Location: {location}
            </div>
        </div>
    );
}
