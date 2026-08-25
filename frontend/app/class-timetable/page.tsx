'use client';

import { useEffect, useState } from 'react';
import { ProtectedLayout } from '@/components/protected-layout';
import { timetableAPI, masterDataAPI, curriculumRuleAPI, exportAPI } from '@/lib/api';
import { useAuthStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Download, Loader2, Sparkles, Send } from 'lucide-react';

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
  classId: { name: string; _id: string };
  subjectId: { name: string };
  teacherId?: { name: string };
  roomId?: { name: string };
  status: string;
}

const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
const DAY_LABELS = {
  MONDAY: 'Thứ Hai',
  TUESDAY: 'Thứ Ba',
  WEDNESDAY: 'Thứ Tư',
  THURSDAY: 'Thứ Năm',
  FRIDAY: 'Thứ Sáu',
};

export default function ClassTimetablePage() {
  const [entries, setEntries] = useState<TimetableEntry[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [publishing, setPublishing] = useState(false);
  const [autoFilling, setAutoFilling] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [message, setMessage] = useState('');
  const role = useAuthStore((s) => s.user?.role);
  const canPublish = role === 'ADMIN' || role === 'SCHEDULER';

  useEffect(() => {
    loadClasses();
  }, []);

  useEffect(() => {
    if (selectedClassId) {
      loadClassTimetable();
    }
  }, [selectedClassId]);

  const loadClasses = async () => {
    try {
      const response = await masterDataAPI.getClasses();
      setClasses(response.data);
      if (response.data.length > 0) {
        setSelectedClassId(response.data[0]._id);
      }
    } catch (error) {
      console.error('Failed to load classes:', error);
    }
  };

  const loadClassTimetable = async () => {
    try {
      setLoading(true);
      const [entriesResponse, slotsResponse] = await Promise.all([
        timetableAPI.getByClass(selectedClassId),
        masterDataAPI.getTimeSlots(),
      ]);
      setEntries(entriesResponse.data);
      setTimeSlots(slotsResponse.data.sort((a: TimeSlot, b: TimeSlot) => a.order - b.order));
    } catch (error) {
      console.error('Failed to load class timetable:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEntry = (day: string, slot: TimeSlot): TimetableEntry | null => {
    return entries.find((e) => e.dayOfWeek === day && e.timeSlotId._id === slot._id) || null;
  };

  const selectedClass = classes.find((c) => c._id === selectedClassId);
  const isPublished = entries.length > 0 && entries.every((e) => e.status === 'PUBLISHED');

  const handlePublish = async () => {
    if (!selectedClass) return;
    try {
      setPublishing(true);
      setMessage('');
      await timetableAPI.publish(selectedClass._id, selectedClass.academicYearId);
      setMessage('✓ Đã publish thời khóa biểu');
      loadClassTimetable();
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Lỗi khi publish');
    } finally {
      setPublishing(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleAutoFill = async () => {
    if (!selectedClass) return;
    try {
      setAutoFilling(true);
      setMessage('');
      const res = await curriculumRuleAPI.autoFill(selectedClass._id);
      const { createdCount, remainingDeficits } = res.data;
      const remainingText = remainingDeficits.length
        ? ` Còn thiếu: ${remainingDeficits.map((d: any) => `${d.subjectName} (${d.remaining} tiết)`).join(', ')}`
        : '';
      setMessage(`✓ Đã tự động điền ${createdCount} tiết.${remainingText}`);
      loadClassTimetable();
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Lỗi khi tự động điền');
    } finally {
      setAutoFilling(false);
    }
  };

  const handleExport = async () => {
    if (!selectedClass) return;
    try {
      setExporting(true);
      await exportAPI.class(selectedClass._id, selectedClass.name);
    } catch (err) {
      setMessage('Lỗi khi xuất Excel');
    } finally {
      setExporting(false);
    }
  };

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold tracking-tight">
              Thời Khóa Biểu Lớp Học
            </h1>
            <p className="text-sm text-muted-foreground">Xem TKB theo từng lớp</p>
          </div>
          <div className="flex items-end gap-3">
            <div className="w-48 space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Chọn Lớp</label>
              <Select value={selectedClassId} onValueChange={(value) => setSelectedClassId(value ?? '')}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn lớp" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls._id} value={cls._id}>
                      {cls.name} (Khối {cls.grade})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleExport} disabled={exporting || !selectedClassId} variant="secondary">
              {exporting ? <Loader2 className="animate-spin" /> : <Download />}
              Xuất Excel
            </Button>
          </div>
        </div>

        {selectedClass && (
          <Card>
            <CardContent className="flex flex-wrap items-center justify-between gap-3 py-4">
              <div className="flex items-center gap-3 text-sm">
                <span>
                  Lớp <span className="font-semibold">{selectedClass.name}</span>
                  {selectedClass.roomId && (
                    <span className="text-muted-foreground"> · Phòng {selectedClass.roomId.name}</span>
                  )}
                </span>
                <Badge variant={isPublished ? 'default' : 'secondary'}>
                  {isPublished ? 'Đã Publish' : 'Bản nháp'}
                </Badge>
              </div>
              {canPublish && (
                <div className="flex gap-2">
                  <Button onClick={handleAutoFill} disabled={autoFilling} variant="outline" size="sm">
                    {autoFilling ? <Loader2 className="animate-spin" /> : <Sparkles />}
                    Tự động điền
                  </Button>
                  <Button onClick={handlePublish} disabled={publishing || entries.length === 0} size="sm">
                    {publishing ? <Loader2 className="animate-spin" /> : <Send />}
                    Publish
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
        {message && <p className="text-sm text-muted-foreground">{message}</p>}

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
                        <div className="text-xs text-muted-foreground">
                          {slot.startTime} - {slot.endTime}
                        </div>
                      </TableCell>
                      {DAYS.map((day) => {
                        const entry = getEntry(day, slot);
                        return (
                          <TableCell key={`${day}-${slot._id}`} className="min-w-32 border-b border-r align-top">
                            {entry ? (
                              <div className="rounded-md bg-primary/10 px-2 py-1.5 text-sm">
                                <div className="font-semibold text-primary">{entry.subjectId.name}</div>
                                {entry.teacherId && (
                                  <div className="text-xs text-muted-foreground">{entry.teacherId.name}</div>
                                )}
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

        {!loading && (
          <p className="text-sm text-muted-foreground">
            Tổng số tiết: {timeSlots.length} · Tổng số tiết học: {entries.length}
          </p>
        )}
      </div>
    </ProtectedLayout>
  );
}

