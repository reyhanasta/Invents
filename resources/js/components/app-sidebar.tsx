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
    locations,
    maintenances,
} from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Box, Building2, Folder, MapPin, Wrench } from 'lucide-react';
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
        title: 'Perusahaan',
        href: company(),
        icon: Building2,
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
