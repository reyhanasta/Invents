import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { User, Wrench } from 'lucide-react';

export default function AssetMaintanance() {
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
                    <div className="rounded-lg border bg-accent p-4">
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
                    </div>
                    <div className="rounded-lg border bg-accent p-4">
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
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
