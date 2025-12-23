import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    BadgeCheckIcon,
    CircleX,
    Flag,
    Hammer,
    User,
    Wrench,
} from 'lucide-react';
import { memo, useMemo } from 'react';
import { Maintenance } from '../Maintenance/MaintenanceIndex';

type AssetMaintananceProps = {
    maintanance: Maintenance[];
};

const maintenanceTypeConfig = {
    routine: { label: 'Rutin', color: ' ' },
    repair: { label: 'Perbaikan', color: 'bg-amber-500' },
    calibration: { label: 'Kalibrasi', color: 'bg-purple-500 ' },
    inspection: { label: 'Inspeksi', color: 'bg-blue-500 ' },
};

const maintenanceStatusConfig = {
    completed: {
        label: 'Selesai',
        color: 'bg-green-700 ',
        icon: <BadgeCheckIcon />,
    },
    pending: {
        label: 'Pending',
        color: 'bg-blue-500 ',
        icon: <Flag />,
    },
    in_progress: {
        label: 'Sedang Berjalan',
        color: 'bg-yellow-500 ',
        icon: <Hammer />,
    },
    cancelled: {
        label: 'Cancel',
        color: 'bg-red-500 ',
        icon: <CircleX />,
    },
};

const MaintItem = memo(function MaintItem({ m }: { m: Maintenance }) {
    console.log(maintenanceStatusConfig[m.status]);
    return (
        <div className="rounded-lg border bg-accent p-4">
            <div className="flex justify-between">
                <div className="flex flex-row justify-start gap-2 pb-1">
                    <Badge
                        className={`${
                            maintenanceTypeConfig[m.type].color
                        } rounded-md`}
                    >
                        {maintenanceTypeConfig[m.type].label}
                    </Badge>
                    <Badge
                        className={`${
                            maintenanceStatusConfig[m.status].color
                        } rounded-md`}
                    >
                        {maintenanceStatusConfig[m.status].icon}
                        {maintenanceStatusConfig[m.status].label}
                    </Badge>
                </div>
                <CardDescription className="text-xs">
                    {new Date(m.maintanance_date).toLocaleDateString()}
                </CardDescription>
            </div>
            <div className="flex flex-col justify-between gap-2 p-1">
                <CardTitle>{m.description}</CardTitle>
                <CardDescription className="flex flex-row items-center gap-2">
                    <User size={15} />
                    {m.technician ?? '-'}
                </CardDescription>
            </div>
        </div>
    );
});

export default function AssetMaintanance({
    maintanance,
}: AssetMaintananceProps) {
    const sorted = useMemo(
        () =>
            [...(maintanance ?? [])].sort(
                (a, b) =>
                    +new Date(b.maintanance_date) -
                    +new Date(a.maintanance_date),
            ),
        [maintanance],
    );

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex flex-row items-center gap-2">
                        <Wrench size={20} className="text-primary" />
                        Maintanance
                    </CardTitle>
                    <CardDescription>Riwaya Maintanance</CardDescription>
                </CardHeader>
                <CardContent className="mx-2 flex flex-col gap-2 border-l-4 border-primary/20 px-2">
                    {/* {sorted.map((m) => (
                        <MaintItem key={m.id} m={m} />
                    ))} */}
                    {sorted.length === 0 ? (
                        <div className="text-center text-sm text-muted-foreground">
                            No maintenance records.
                        </div>
                    ) : (
                        sorted.map((m) => <MaintItem key={m.id} m={m} />)
                    )}
                    {/* <div className="rounded-lg border bg-accent p-4">
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-row justify-start gap-2 pb-1">
                                <Badge className="rounded-md">Kalibrasi</Badge>
                                <Badge className="rounded-md">Terjadwal</Badge>
                            </div>
                            <CardDescription className="text-xs">
                                12 March 2024
                            </CardDescription>
                        </div>
                        <div className="flex flex-col justify-between gap-2 p-1">
                            <CardTitle>Scheduled calibration check</CardTitle>
                            <div className="flex flex-row">
                                <CardDescription className="flex flex-row items-center gap-2">
                                    <User size={15} /> Philips Service Team
                                </CardDescription>
                            </div>
                        </div>
                    </div> */}
                </CardContent>
            </Card>
        </div>
    );
}
