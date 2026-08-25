'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';

export default function Home() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const loadUserFromToken = useAuthStore((state) => state.loadUserFromToken);

  useEffect(() => {
    // Check if user is logged in
    loadUserFromToken();
    
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    } else {
      router.push('/auth/login');
    }
  }, [router, loadUserFromToken]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500">
      <div className="text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Schedule Helper</h1>
        <p>Đang tải...</p>
      </div>
    </div>
  );
}
