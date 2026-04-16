import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard, maintenances, tickets } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { 
    Activity, 
    AlertCircle, 
    Box, 
    CheckCircle2, 
    Clock, 
    Package, 
    PenTool, 
    Ticket as TicketIcon
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

type DashboardProps = {
    stats: {
        total_assets: number;
        in_use: number;
        available: number;
        condition_stats: {
            good: number;
            minor_damage: number;
            major_damage: number;
        };
        recent_maintenances: any[];
        pending_tickets: number;
    };
};

export default function Dashboard({ stats }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            
            <div className="flex-1 space-y-6 p-4 md:p-8">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
                </div>

                {/* KPI Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Aset</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_assets}</div>
                            <p className="text-xs text-muted-foreground">Unit terdaftar dalam sistem</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sedang Digunakan</CardTitle>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.in_use}</div>
                            <p className="text-xs text-muted-foreground">
                                {((stats.in_use / (stats.total_assets || 1)) * 100).toFixed(1)}% dari total aset
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Maintenance Aktif</CardTitle>
                            <PenTool className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.recent_maintenances.length}</div>
                            <p className="text-xs text-muted-foreground">Proses pemeliharaan berjalan</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Tiket Terbuka</CardTitle>
                            <TicketIcon className="h-4 w-4 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.pending_tickets}</div>
                            <p className="text-xs text-muted-foreground">Butuh penanganan segera</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    {/* Condition Breakdown */}
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Status Kondisi Aset</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="space-y-1">
                                        <div className="text-2xl font-bold text-green-600">{stats.condition_stats.good}</div>
                                        <div className="text-xs text-muted-foreground uppercase">Baik</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-2xl font-bold text-yellow-600">{stats.condition_stats.minor_damage}</div>
                                        <div className="text-xs text-muted-foreground uppercase">Rusak Ringan</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-2xl font-bold text-red-600">{stats.condition_stats.major_damage}</div>
                                        <div className="text-xs text-muted-foreground uppercase">Rusak Berat</div>
                                    </div>
                                </div>
                                
                                {/* Simple Visual Progress Bar */}
                                <div className="h-4 w-full overflow-hidden rounded-full bg-secondary flex">
                                    <div 
                                        className="h-full bg-green-500" 
                                        style={{ width: `${(stats.condition_stats.good / stats.total_assets) * 100}%` }} 
                                    />
                                    <div 
                                        className="h-full bg-yellow-500" 
                                        style={{ width: `${(stats.condition_stats.minor_damage / stats.total_assets) * 100}%` }} 
                                    />
                                    <div 
                                        className="h-full bg-red-500" 
                                        style={{ width: `${(stats.condition_stats.major_damage / stats.total_assets) * 100}%` }} 
                                    />
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Baik: {stats.condition_stats.good}</span>
                                    <span>Rusak: {stats.condition_stats.minor_damage + stats.condition_stats.major_damage}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Maintenance Activity */}
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Aktivitas Terkini</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {stats.recent_maintenances.length > 0 ? (
                                    stats.recent_maintenances.map((m) => (
                                        <div key={m.id} className="flex items-center gap-4">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                                <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm font-medium leading-none">
                                                    {m.asset.asset_name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {m.type} - {m.status}
                                                </p>
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {new Date(m.maintenance_date).toLocaleDateString('id-ID')}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                                        <Clock className="mb-2 h-10 w-10 opacity-20" />
                                        <p className="text-sm">Tidak ada aktivitas terbaru</p>
                                    </div>
                                )}
                            </div>
                            <div className="mt-6">
                                <Link
                                    href={maintenances().url}
                                    className="text-sm font-medium text-blue-600 hover:underline"
                                >
                                    Lihat semua maintenance &rarr;
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
