import AppLayout from '@/layouts/app-layout';
import { assets } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

export type Maintenance = {
    id: number;
    asset_id: number;
    type: 'routine' | 'repair' | 'inspection' | 'calibration';
    description: string;
    maintanance_date: string;
    maintanance_done_date: string;
    technician: string;
    cost?: string;
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
    notes?: string;
};

type MaintenanceProps = {
    maintenance: Maintenance;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Assets',
        href: assets().url,
    },
];

export default function MaintenanceIndex({ maintenance }: MaintenanceProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head />
            <div className="container mx-auto space-y-6 p-4 md:p-6 lg:p-8"></div>
        </AppLayout>
    );
}
