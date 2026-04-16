import { index as userIndex } from '@/actions/App/Http/Controllers/Admin/UserController';
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
    reports,
    tickets,
} from '@/routes';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    BarChart3,
    Box,
    Building2,
    FileText,
    Folder,
    Home,
    LifeBuoy,
    MapPin,
    Users,
    Wrench,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
        icon: Home,
    },
    {
        title: 'Aset',
        href: assets().url,
        icon: Box,
    },

    {
        title: 'Kategori',
        href: categories().url,
        icon: Folder,
    },
    {
        title: 'Lokasi',
        href: locations().url,
        icon: MapPin,
    },
];

const navTicket: NavItem[] = [
    {
        title: 'Pemeliharaan',
        href: maintenances().url,
        icon: Wrench,
    },

    {
        title: 'Ticketing',
        href: tickets().url,
        icon: FileText,
    },
    {
        title: 'Pusat Bantuan',
        href: helpdeskIndex().url,
        icon: LifeBuoy,
    },
];
const navAdmin: NavItem[] = [
    {
        title: 'Laporan',
        href: reports().url,
        icon: BarChart3,
    },
    {
        title: 'User Management',
        href: userIndex().url,
        icon: Users,
    },
    {
        title: 'Perusahaan',
        href: company().url,
        icon: Building2,
    },
];

// const footerNavItems: NavItem[] = [
//     {
//         title: 'User Management',
//         href: userIndex().url,
//         icon: Users,
//     },
//     {
//         title: 'Perusahaan',
//         href: company().url,
//         icon: Building2,
//     },
// ];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;

    const isStaff = auth.user.role_names?.some((role) =>
        ['admin', 'management'].includes(role),
    );
    const isClient = auth.user.role_names?.includes('client');
    const isAdmin = auth.user.role_names?.includes('admin');

    const filteredMainNavItems = mainNavItems.filter((item) => {
        if (item.title === 'Ticketing' && !isStaff) return false;
        if (item.title === 'Pusat Bantuan' && !isClient) return false;
        if (item.title === 'Perusahaan' && !isStaff) return false;
        if (item.title === 'User Management' && !isAdmin) return false;
        return true;
    });
    const filteredNavTicket = navTicket.filter((item) => {
        if (item.title === 'Ticketing' && !isStaff) return false;
        if (item.title === 'Pusat Bantuan' && !isClient) return false;
        if (item.title === 'Perusahaan' && !isStaff) return false;
        if (item.title === 'User Management' && !isAdmin) return false;
        return true;
    });
    const filteredNavAdmin = navAdmin.filter((item) => {
        if (item.title === 'Ticketing' && !isStaff) return false;
        if (item.title === 'Pusat Bantuan' && !isClient) return false;
        if (item.title === 'Perusahaan' && !isStaff) return false;
        if (item.title === 'User Management' && !isAdmin) return false;
        return true;
    });

    // const filteredFooterNavItems = footerNavItems.filter((item) => {
    //     if (item.title === 'Perusahaan' && !isStaff) return false;
    //     if (item.title === 'User Management' && !isAdmin) return false;
    //     return true;
    // });

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
                <NavMain items={filteredMainNavItems} title={'Beranda'} />
                <NavMain items={filteredNavTicket} title={'Maintenance'} />
                <NavMain items={filteredNavAdmin} title={'Master'} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={filteredFooterNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
