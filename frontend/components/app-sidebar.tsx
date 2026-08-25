'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarRange } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useAuthStore } from '@/lib/store';
import { DASHBOARD_ITEM, NAV_GROUPS } from '@/lib/nav';

export function AppSidebar() {
  const pathname = usePathname();
  const role = useAuthStore((s) => s.user?.role);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <CalendarRange className="h-4.5 w-4.5" />
          </div>
          <div className="flex flex-col leading-none group-data-[collapsible=icon]:hidden">
            <span className="font-heading font-semibold text-sm">Schedule Helper</span>
            <span className="text-xs text-sidebar-foreground/60">Quản lý thời khóa biểu</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-2 pt-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href={DASHBOARD_ITEM.href} />}
              isActive={pathname === DASHBOARD_ITEM.href}
              tooltip="Dashboard"
            >
              <DASHBOARD_ITEM.icon />
              <span>{DASHBOARD_ITEM.label}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {NAV_GROUPS.map((group) => {
          const visibleItems = group.items.filter(
            (item) => !item.roles || (role && item.roles.includes(role)),
          );
          if (visibleItems.length === 0) return null;
          return (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {visibleItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        render={<Link href={item.href} />}
                        isActive={pathname === item.href}
                        tooltip={item.label}
                      >
                        <item.icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border px-2 py-2 text-xs text-sidebar-foreground/50 group-data-[collapsible=icon]:hidden">
        © {new Date().getFullYear()} Schedule Helper
      </SidebarFooter>
    </Sidebar>
  );
}
