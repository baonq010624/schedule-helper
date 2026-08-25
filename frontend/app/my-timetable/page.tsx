'use client';

import { useEffect, useState } from 'react';
import { ProtectedLayout } from '@/components/protected-layout';
import { timetableAPI, masterDataAPI } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface TimeSlot {
  _id: string;
  period: number;
  startTime: string;
  endTime: string;
  order: number;
}

interface TimetableEntry {
  _id: string;
  dayOfWeek: string;
  timeSlotId: TimeSlot;
  classId: { name: string };
  subjectId: { name: string };
  roomId?: { name: string };
}

const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
const DAY_LABELS = {
  MONDAY: 'Thứ Hai',
  TUESDAY: 'Thứ Ba',
  WEDNESDAY: 'Thứ Tư',
  THURSDAY: 'Thứ Năm',
  FRIDAY: 'Thứ Sáu',
};

export default function MyTimetablePage() {
  const [entries, setEntries] = useState<TimetableEntry[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      setError('');
      const [entriesRes, slotsRes] = await Promise.all([
        timetableAPI.getMine(),
        masterDataAPI.getTimeSlots(),
      ]);
      setEntries(entriesRes.data);
      setTimeSlots(slotsRes.data.sort((a: TimeSlot, b: TimeSlot) => a.order - b.order));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Tài khoản chưa được liên kết với một giáo viên');
    } finally {
      setLoading(false);
    }
  };

  const getEntry = (day: string, slot: TimeSlot): TimetableEntry | null => {
    return entries.find((e) => e.dayOfWeek === day && e.timeSlotId._id === slot._id) || null;
  };

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight">TKB Của Tôi</h1>
          <p className="text-sm text-muted-foreground">Thời khóa biểu giảng dạy của bạn</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card className="overflow-hidden py-0">
          <div className="overflow-x-auto">
            <Table className="border-separate border-spacing-0 text-sm">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="border-b border-r bg-muted/40 font-semibold">Tiết / Giờ</TableHead>
                  {DAYS.map((day) => (
                    <TableHead key={day} className="border-b border-r bg-muted/40 text-center font-semibold">
                      {DAY_LABELS[day as keyof typeof DAY_LABELS]}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="p-8 text-center text-muted-foreground">
                      Đang tải...
                    </TableCell>
                  </TableRow>
                ) : timeSlots.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="p-8 text-center text-muted-foreground">
                      Không có tiết học
                    </TableCell>
                  </TableRow>
                ) : (
                  timeSlots.map((slot) => (
                    <TableRow key={slot._id}>
                      <TableCell className="border-b border-r bg-muted/20 font-medium whitespace-nowrap">
                        <div className="text-sm font-semibold">Tiết {slot.period}</div>
                        <div className="text-xs text-muted-foreground">{slot.startTime} - {slot.endTime}</div>
                      </TableCell>
                      {DAYS.map((day) => {
                        const entry = getEntry(day, slot);
                        return (
                          <TableCell key={`${day}-${slot._id}`} className="min-w-32 border-b border-r align-top">
                            {entry ? (
                              <div className="rounded-md bg-primary/10 px-2 py-1.5 text-sm">
                                <div className="font-semibold text-primary">{entry.subjectId.name}</div>
                                <div className="text-xs text-muted-foreground">{entry.classId.name}</div>
                                {entry.roomId && (
                                  <div className="text-xs text-muted-foreground">{entry.roomId.name}</div>
                                )}
                              </div>
                            ) : (
                              <div className="py-1.5 text-center text-muted-foreground/40">-</div>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </ProtectedLayout>
  );
}

