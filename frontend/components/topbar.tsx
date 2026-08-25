'use client';

import { useRouter, usePathname } from 'next/navigation';
import { LogOut, User } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getPageTitle } from '@/lib/nav';

const ROLE_LABELS: Record<string, string> = {
  ADMIN: 'Quản trị viên',
  SCHEDULER: 'Người xếp TKB',
  TEACHER: 'Giáo viên',
  VIEWER: 'Người xem',
};

export function Topbar() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  const initials = user?.email ? user.email.slice(0, 2).toUpperCase() : '??';

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <h1 className="font-heading text-sm font-semibold text-foreground/90">
        {getPageTitle(pathname)}
      </h1>

      <div className="ml-auto flex items-center gap-3">
        {user?.role && (
          <Badge variant="secondary" className="hidden sm:inline-flex">
            {ROLE_LABELS[user.role] ?? user.role}
          </Badge>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-full outline-none ring-ring focus-visible:ring-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex flex-col">
              <span className="truncate text-sm font-medium">{user?.email}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {user?.role ? ROLE_LABELS[user.role] ?? user.role : ''}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} variant="destructive">
              <LogOut />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
