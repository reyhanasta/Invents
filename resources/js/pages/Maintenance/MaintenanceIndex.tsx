import AppLayout from '@/layouts/app-layout';
import { assets } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

export type Maintenance = {
    id: number;
    asset_id: number;
    type: 'routine' | 'repair' | 'inspection' | 'calibration';
    description: string;
    maintenance_date: string;
    maintenance_done_date: string;
    technician: string;
    cost?: string;
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
    notes?: string;
};

type PaginationLinkProps = {
    url: string | null;
    label: string;
    active: boolean;
};

type AssetPaginationProps = {
    data: Maintenance[];
    links: PaginationLinkProps;
    first_page_url: string;
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
};

type MaintenanceIndexProps = {
    maintenance: AssetPaginationProps;
    search?: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Assets',
        href: assets().url,
    },
];

export default function MaintenanceIndex({
    maintenance,
    search,
}: MaintenanceIndexProps) {
    console.log(maintenance);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head />
            <div className="container mx-auto space-y-6 p-4 md:p-6 lg:p-8"></div>
        </AppLayout>
    );
}
