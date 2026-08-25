import type { ComponentType } from 'react';
import {
  LayoutDashboard,
  CalendarRange,
  Users2,
  UserSquare2,
  DoorOpen,
  GraduationCap,
  ClipboardList,
  BarChart3,
  School,
  CalendarDays,
  BookOpen,
  Clock,
  KeyRound,
  CalendarClock,
} from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  roles?: string[];
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const DASHBOARD_ITEM: NavItem = {
  label: 'Dashboard',
  href: '/dashboard',
  icon: LayoutDashboard,
};

export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Thời Khóa Biểu',
    items: [
      { label: 'Bảng Tổng', href: '/timetable', icon: CalendarRange },
      { label: 'TKB Lớp', href: '/class-timetable', icon: Users2 },
      { label: 'TKB Giáo Viên', href: '/teacher-timetable', icon: UserSquare2 },
      { label: 'TKB Phòng', href: '/room-timetable', icon: DoorOpen },
      { label: 'TKB Của Tôi', href: '/my-timetable', icon: CalendarClock, roles: ['TEACHER'] },
    ],
  },
  {
    label: 'Phân Tích',
    items: [
      { label: 'Báo Cáo Số Tiết', href: '/reports', icon: BarChart3 },
      {
        label: 'Quy Định Chương Trình',
        href: '/curriculum-rules',
        icon: ClipboardList,
        roles: ['ADMIN', 'SCHEDULER'],
      },
    ],
  },
  {
    label: 'Quản Lý',
    items: [
      { label: 'Trường', href: '/schools', icon: School, roles: ['ADMIN'] },
      { label: 'Năm Học', href: '/academic-years', icon: CalendarDays, roles: ['ADMIN'] },
      { label: 'Lớp', href: '/classes', icon: GraduationCap, roles: ['ADMIN'] },
      { label: 'Giáo Viên', href: '/teachers', icon: UserSquare2, roles: ['ADMIN'] },
      { label: 'Môn Học', href: '/subjects', icon: BookOpen, roles: ['ADMIN'] },
      { label: 'Phòng Học', href: '/rooms', icon: DoorOpen, roles: ['ADMIN'] },
      { label: 'Khung Giờ', href: '/time-slots', icon: Clock, roles: ['ADMIN'] },
      { label: 'Tài Khoản', href: '/users', icon: KeyRound, roles: ['ADMIN'] },
    ],
  },
];

export function getPageTitle(pathname: string): string {
  if (pathname === DASHBOARD_ITEM.href) return DASHBOARD_ITEM.label;
  for (const group of NAV_GROUPS) {
    const item = group.items.find((i) => i.href === pathname);
    if (item) return item.label;
  }
  return 'Schedule Helper';
}
