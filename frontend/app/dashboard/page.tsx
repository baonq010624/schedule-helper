'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store';
import { ProtectedLayout } from '@/components/protected-layout';
import { masterDataAPI } from '@/lib/api';
import {
  School,
  CalendarDays,
  GraduationCap,
  UserSquare2,
  BookOpen,
  DoorOpen,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

interface DashboardStats {
  schools: number;
  academicYears: number;
  classes: number;
  teachers: number;
  subjects: number;
  rooms: number;
  timeSlots: number;
}

const STAT_CARDS: Array<{
  key: keyof DashboardStats;
  label: string;
  icon: typeof School;
  href: string;
}> = [
  { key: 'schools', label: 'Trường Học', icon: School, href: '/schools' },
  { key: 'academicYears', label: 'Năm Học', icon: CalendarDays, href: '/academic-years' },
  { key: 'classes', label: 'Lớp Học', icon: GraduationCap, href: '/classes' },
  { key: 'teachers', label: 'Giáo Viên', icon: UserSquare2, href: '/teachers' },
  { key: 'subjects', label: 'Môn Học', icon: BookOpen, href: '/subjects' },
  { key: 'rooms', label: 'Phòng Học', icon: DoorOpen, href: '/rooms' },
  { key: 'timeSlots', label: 'Tiết Học', icon: Clock, href: '/time-slots' },
];

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const loadUserFromToken = useAuthStore((state) => state.loadUserFromToken);
  const [stats, setStats] = useState<DashboardStats>({
    schools: 0,
    academicYears: 0,
    classes: 0,
    teachers: 0,
    subjects: 0,
    rooms: 0,
    timeSlots: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserFromToken();
    loadStats();
  }, [loadUserFromToken]);

  const loadStats = async () => {
    try {
      const [schools, years, classes, teachers, subjects, rooms, slots] =
        await Promise.all([
          masterDataAPI.getSchools(),
          masterDataAPI.getAcademicYears(),
          masterDataAPI.getClasses(),
          masterDataAPI.getTeachers(),
          masterDataAPI.getSubjects(),
          masterDataAPI.getRooms(),
          masterDataAPI.getTimeSlots(),
        ]);

      setStats({
        schools: schools.data.length,
        academicYears: years.data.length,
        classes: classes.data.length,
        teachers: teachers.data.length,
        subjects: subjects.data.length,
        rooms: rooms.data.length,
        timeSlots: slots.data.length,
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedLayout>
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight">
            Chào mừng, {user?.email}
          </h1>
          <p className="text-sm text-muted-foreground">
            Tổng quan hệ thống quản lý thời khóa biểu
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STAT_CARDS.map(({ key, label, icon: Icon, href }) => (
            <Link key={key} href={href}>
              <Card className="group transition-shadow hover:shadow-md">
                <CardContent className="flex items-center justify-between p-5">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">{label}</p>
                    {loading ? (
                      <Skeleton className="mt-1.5 h-7 w-10" />
                    ) : (
                      <p className="mt-1 text-2xl font-bold tabular-nums">{stats[key]}</p>
                    )}
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-base">Bắt đầu nhanh</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <QuickLink
              href="/timetable"
              title="Xếp thời khóa biểu"
              description="Chỉnh sửa bảng tổng và xuất Excel"
            />
            <QuickLink
              href="/reports"
              title="Xem báo cáo số tiết"
              description="So sánh số tiết đã xếp với quy định"
            />
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  );
}

function QuickLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
    >
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

