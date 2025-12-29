import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Maintenance } from '@/types';
import {
    BadgeCheckIcon,
    CircleX,
    Flag,
    Hammer,
    User,
    Wrench,
} from 'lucide-react';
import { memo, useMemo } from 'react';
type AssetmaintenanceProps = {
    maintenance: Maintenance[];
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
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };
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
                    {/* {new Date(m.maintenance_date).toDateString()} */}
                    {formatDate(m.maintenance_date)}
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

export default function Assetmaintenance({
    maintenance,
}: AssetmaintenanceProps) {
    const sorted = useMemo(
        () =>
            [...(maintenance ?? [])].sort(
                (a, b) =>
                    +new Date(b.maintenance_date) -
                    +new Date(a.maintenance_date),
            ),
        [maintenance],
    );

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className="flex flex-row items-center gap-2">
                        <Wrench size={20} className="text-primary" />
                        Maintenance
                    </CardTitle>
                    <CardDescription>Riwaya Maintenance</CardDescription>
                </CardHeader>
                <CardContent className="mx-2 flex flex-col gap-2 border-l-4 border-primary/20 px-2">
                    {sorted.length === 0 ? (
                        <div className="text-center text-sm text-muted-foreground">
                            No maintenance records.
                        </div>
                    ) : (
                        sorted.map((m) => <MaintItem key={m.id} m={m} />)
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
