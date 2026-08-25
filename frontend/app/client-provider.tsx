'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store';

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Load user from stored token on app startup
    const loadUserFromToken = useAuthStore.getState().loadUserFromToken;
    loadUserFromToken();
  }, []);

  return <>{children}</>;
}
