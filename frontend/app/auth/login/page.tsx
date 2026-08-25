'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import Link from 'next/link';
import { CalendarRange, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <CalendarRange className="h-5.5 w-5.5" />
          </div>
          <span className="font-heading text-lg font-semibold">Schedule Helper</span>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-xl">Đăng nhập</CardTitle>
            <CardDescription>Nhập thông tin tài khoản để tiếp tục</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading && <Loader2 className="animate-spin" />}
                {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
              </Button>
            </form>

            <p className="mt-5 text-center text-sm text-muted-foreground">
              Chưa có tài khoản?{' '}
              <Link href="/auth/register" className="font-medium text-primary hover:underline">
                Đăng ký
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
