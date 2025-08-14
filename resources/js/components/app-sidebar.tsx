import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid , Users ,ClipboardList ,BarChart , BadgeCheck} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Adherents',
        href: '/adherents',
        icon: Users,
    },
    {
        title: 'Adhesions',
        href: '/adhesions',
        icon: ClipboardList,
    },
    {
        title: 'Types d’adhésions',
        href: '/types-adhesion',
        icon: BadgeCheck,
    },
    {
        title: 'Reports',
        href: '/reports',
        icon: BarChart,
    },
];


export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
<div className="flex justify-center">
  <Link href="/dashboard" prefetch>
    <img src="/cmc.png" alt="Logo" className="h-16 w-16 object-contain" />
  </Link>
</div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
              
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
