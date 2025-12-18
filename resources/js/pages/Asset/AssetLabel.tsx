import Barcode from 'react-barcode';
import { Asset } from './AssetDetail';

type AssetLabelProps = {
    asset: Asset;
};
export default function AssetLabel({ asset }: AssetLabelProps) {
    return (
        <div className="label w-72 rounded-lg border-2 border-primary bg-card p-4 text-center">
            <div className="label-header mb-2 text-xs font-semibold text-primary">
                CLINIC ASSET
            </div>
            <div className="label-name mb-1 text-sm font-bold text-foreground">
                {asset.asset_name}
            </div>
            <div className="label-id mb-3 text-xs text-muted-foreground">
                {asset.id}
            </div>
            <div className="label-barcode flex justify-center">
                <Barcode
                    // value={asset.id}
                    value="123456789012"
                    width={1.5}
                    height={50}
                    fontSize={10}
                    margin={0}
                    displayValue={false}
                />
            </div>
            <div className="label-location mt-2 text-[10px] text-muted-foreground">
                Location: {asset.location_id}
            </div>
        </div>
    );
}
