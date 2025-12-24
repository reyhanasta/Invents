import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Banknote, Box, Calendar, Clock } from 'lucide-react';

export function MaintananceStatusCard() {
    return (
        <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="flex flex-row">
                    <div className="item-center flex flex-col pl-4">
                        <Box
                            size={50}
                            className="rounded-2xl bg-accent p-3 text-primary/80"
                        />
                    </div>
                    <div className="flex flex-col self-start">
                        <CardTitle className="text-3xl">-</CardTitle>
                        <CardDescription>Total Records</CardDescription>
                    </div>
                </Card>
                <Card className="flex flex-row border-primary/40 bg-primary/20">
                    <div className="item-center flex flex-col pl-4">
                        <Calendar
                            size={50}
                            className="rounded-2xl bg-primary/70 p-3 text-white"
                        />
                    </div>
                    <div className="flex flex-col self-start">
                        <CardTitle className="text-3xl">-</CardTitle>
                        <CardDescription className="">
                            Scheduled
                        </CardDescription>
                    </div>
                </Card>
                <Card className="flex flex-row border-amber-200 bg-amber-200/30">
                    <div className="item-center flex flex-col pl-4">
                        <Clock
                            size={50}
                            className="rounded-2xl bg-amber-400 p-3 text-white"
                        />
                    </div>
                    <div className="flex flex-col self-start">
                        <CardTitle className="text-3xl">-</CardTitle>
                        <CardDescription className="">
                            In Progress
                        </CardDescription>
                    </div>
                </Card>
                <Card className="flex flex-row border-green-400/50 bg-green-300/70">
                    <div className="item-center flex flex-col pl-4">
                        <Banknote
                            size={50}
                            className="rounded-2xl bg-green-400/80 p-3 text-white"
                        />
                    </div>
                    <div className="flex flex-col self-start">
                        <CardTitle className="text-3xl">-</CardTitle>
                        <CardDescription className="">
                            Total Cost
                        </CardDescription>
                    </div>
                </Card>
            </div>
        </>
    );
}
