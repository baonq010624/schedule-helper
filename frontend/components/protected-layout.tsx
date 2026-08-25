'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { AppSidebar } from './app-sidebar';
import { Topbar } from './topbar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { CalendarRange } from 'lucide-react';

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const loadUserFromToken = useAuthStore((state) => state.loadUserFromToken);

  useEffect(() => {
    // Load user from stored token on component mount
    loadUserFromToken();

    // Check if user is authenticated
    const storedToken = localStorage.getItem('token');
    if (!storedToken && !token) {
      router.push('/auth/login');
    }
  }, [router, token, loadUserFromToken]);

  // Show loading state while checking authentication
  if (!user && !token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <CalendarRange className="h-8 w-8 animate-pulse text-primary" />
          <p className="text-sm">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Topbar />
        <main className="flex-1 overflow-auto bg-muted/30 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
