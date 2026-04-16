import AppLogoIcon from '@/components/app-logo-icon';
import { assetsQrcodeDetail } from '@/routes';
import { Asset } from '@/types';
import QRCode from 'react-qr-code';

type BarcodeLabelProps = {
    asset: Asset;
    company: string;
    companyLogo?: string | null;
    locationName: string;
};

export default function AssetQrCodeLabel({
    asset,
    company = '',
    companyLogo = null,
    locationName = '',
}: BarcodeLabelProps) {
    const assetQrdetailUrl =
        window.location.origin + assetsQrcodeDetail(asset.id).url;

    return (
        <div
            className="print-color box-border h-[40mm] w-[60mm] border-2 border-black bg-white p-[1mm]"
            style={{ color: 'black' }}
        >
            {/* Header: Logo + Property Of */}
            <div className="mb-1 flex items-center gap-2 px-1">
                {companyLogo ? (
                    <img
                        src={companyLogo}
                        alt="Logo"
                        className="h-6 w-6 object-contain"
                    />
                ) : (
                    <AppLogoIcon className="h-6 w-6" />
                )}
                <span className="text-[12px] font-bold tracking-tight uppercase">
                    {company}
                </span>
            </div>

            {/* Separator Line */}
            <div className="mb-2 h-[1.5px] w-full bg-black"></div>

            {/* Body: 2 Columns */}
            <div className="flex h-[26mm] w-full gap-2">
                {/* Column Left: QR Code */}
                <div className="flex w-[24mm] flex-col items-center justify-start pt-1">
                    <div className="border border-black/10 bg-white p-1">
                        <QRCode
                            value={assetQrdetailUrl.toString()}
                            size={72}
                            level="M"
                            viewBox="0 0 256 256"
                        />
                    </div>
                    <div className="mt-1 text-center text-[6px] leading-tight font-bold uppercase">
                        PINDAI UNTUK DETAIL ASET
                    </div>
                </div>

                {/* Column Right: Info Info */}
                <div className="flex flex-1 flex-col justify-start border-l border-black py-0.5 pl-2">
                    {/* Nama Aset */}
                    <div className="mb-1">
                        <div className="text-[7px] font-bold uppercase">
                            NAMA ASET:
                        </div>
                        <div className="line-clamp-2 text-[10px] leading-tight font-bold uppercase">
                            {asset.asset_name}
                        </div>
                    </div>

                    <div className="mb-1 h-[0.5px] w-full bg-black/30"></div>

                    {/* Kode Aset */}
                    <div className="mb-1">
                        <div className="text-[7px] font-bold uppercase">
                            KODE ASET:
                        </div>
                        <div className="text-[10px] leading-tight font-bold uppercase">
                            {asset.asset_code}
                        </div>
                    </div>

                    <div className="mb-1 h-[0.5px] w-full bg-black/30"></div>

                    {/* Lokasi Aset */}
                    <div>
                        <div className="text-[7px] font-bold uppercase">
                            LOKASI ASET:
                        </div>
                        <div className="line-clamp-2 text-[10px] leading-tight font-bold uppercase">
                            {locationName}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
