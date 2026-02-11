import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
    assets,
    categories,
    company,
    dashboard,
    helpdeskIndex,
    locations,
    maintenances,
    tickets,
} from '@/routes';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    Box,
    Building2,
    FileText,
    Folder,
    LifeBuoy,
    MapPin,
    Wrench,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    // {
    //     title: 'Dashboard',
    //     href: dashboard(),
    //     icon: LayoutGrid,
    // },
    {
        title: 'Aset',
        href: assets(),
        icon: Box,
    },
    {
        title: 'Kategori',
        href: categories(),
        icon: Folder,
    },
    {
        title: 'Lokasi',
        href: locations(),
        icon: MapPin,
    },
    {
        title: 'Pemeliharaan',
        href: maintenances(),
        icon: Wrench,
    },

    {
        title: 'Ticketing',
        href: tickets(),
        icon: FileText,
    },
    {
        title: 'Pusat Bantuan',
        href: helpdeskIndex(),
        icon: LifeBuoy,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Perusahaan',
        href: company(),
        icon: Building2,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;

    // Check if user has admin role (assuming roles array contains 'admin')
    const isAdmin = auth.user.roles?.includes('admin');

    const filteredMainNavItems = mainNavItems.filter((item) => {
        if (item.title === 'Ticketing' && !isAdmin) return false;
        if (item.title === 'Pusat Bantuan' && isAdmin) return false;
        return true;
    });

    const filteredFooterNavItems = footerNavItems.filter((item) => {
        if (item.title === 'Perusahaan' && !isAdmin) return false;
        return true;
    });

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard().url} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={filteredMainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={filteredFooterNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
