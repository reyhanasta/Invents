import QRCode from 'react-qr-code';
import { Asset } from './AssetDetail';

type LabelSize = '60x40' | '60x30' | '30x20';

type BarcodeLabelProps = {
    asset: Asset;
    location: string;
    category: string;
    size: LabelSize;
};

const sizeConfig: Record<
    LabelSize,
    {
        containerClass: string;
        qrWrapperClass: string;
        qrSize: number;
        titleClass: string;
        codeClass: string;
        infoClass: string;
    }
> = {
    '60x40': {
        containerClass: 'w-[60mm] h-[40mm] p-[3mm] ',
        qrWrapperClass: 'w-[10mm] h-[10mm] ',
        qrSize: 80,
        titleClass: 'text-[10pt] font-bold',
        codeClass: 'text-[8pt] font-semibold',
        infoClass: 'text-[8pt]',
    },
    '60x30': {
        containerClass: 'w-[60mm] h-[30mm] p-[1.5mm]',
        qrWrapperClass: 'w-[22mm] h-[22mm]',
        qrSize: 50,

        titleClass: 'text-[7pt] font-bold',
        codeClass: 'text-[6pt] font-semibold',
        infoClass: 'text-[5pt]',
    },
    '30x20': {
        containerClass: 'w-[30mm] h-[20mm] p-[1mm]',
        qrWrapperClass: 'w-[14mm] h-[14mm]',
        qrSize: 50,
        titleClass: 'text-[6pt] font-bold',
        codeClass: 'text-[5pt] font-semibold',
        infoClass: 'text-[4pt]',
    },
};

export default function BarcodeLabel({
    asset,
    location,
    size,
}: BarcodeLabelProps) {
    const config = sizeConfig[size];

    return (
        <div
            className={`${config.containerClass} item-center box-border flex flex-row border border-black bg-white`}
        >
            <div className={`${config.qrWrapperClass} w-fit align-baseline`}>
                <QRCode
                    value={asset.asset_code}
                    size={config.qrSize}
                    viewBox="0 0 0 0"
                />
            </div>

            <div className="col-span-1 h-fit w-fit items-start align-middle text-sm">
                <div className={`${config.titleClass} mb-[0.5mm]`}>INVENTS</div>
                <div className={`${config.codeClass} mb-[0.5mm]`}>
                    {asset.asset_code}
                </div>
                {size !== '30x20' && (
                    <div
                        className={`${config.infoClass} mt-[0.5mm] w-full space-y-[0.5mm]`}
                    >
                        <div className="font-medium">{asset.asset_name}</div>
                        {size === '60x40' && (
                            <>
                                <div>{location}</div>
                            </>
                        )}
                        {size === '60x30' && <div>{location}</div>}
                    </div>
                )}
            </div>
        </div>
    );
}
