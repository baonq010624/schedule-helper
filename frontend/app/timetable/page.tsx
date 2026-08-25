'use client';

import { useEffect, useMemo, useState } from 'react';
import { ProtectedLayout } from '@/components/protected-layout';
import {
  TimetableEntryModal,
  TimetableCellContext,
} from '@/components/timetable-entry-modal';
import { timetableAPI, masterDataAPI, exportAPI } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Download, Loader2, Plus } from 'lucide-react';

interface TimeSlot {
  _id: string;
  period: number;
  startTime: string;
  endTime: string;
  session: string;
  type: string;
  order: number;
}

interface ClassItem {
  _id: string;
  name: string;
  grade: number;
}

interface TimetableEntry {
  _id: string;
  dayOfWeek: string;
  timeSlotId: TimeSlot;
  classId: { name: string; _id: string };
  subjectId: { name: string; shortName?: string; _id: string };
  teacherId?: { name: string; _id: string };
  roomId?: { name: string; _id: string };
  note?: string;
}

const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
const DAY_LABELS: Record<string, string> = {
  MONDAY: 'Thứ Hai',
  TUESDAY: 'Thứ Ba',
  WEDNESDAY: 'Thứ Tư',
  THURSDAY: 'Thứ Năm',
  FRIDAY: 'Thứ Sáu',
};

export default function TimetablePage() {
  const [entries, setEntries] = useState<TimetableEntry[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [academicYearId, setAcademicYearId] = useState<string>('');
  const [academicYears, setAcademicYears] = useState<any[]>([]);
  const [cellContext, setCellContext] = useState<TimetableCellContext | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    loadAcademicYears();
  }, []);

  useEffect(() => {
    if (academicYearId) {
      loadTimetable();
    }
  }, [academicYearId]);

  const loadAcademicYears = async () => {
    try {
      const response = await masterDataAPI.getAcademicYears();
      setAcademicYears(response.data);
      if (response.data.length > 0) {
        setAcademicYearId(response.data[0]._id);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Failed to load academic years:', error);
      setLoading(false);
    }
  };

  const loadTimetable = async () => {
    try {
      setLoading(true);
      setError('');
      const [entriesResponse, slotsResponse, classesResponse] = await Promise.all([
        timetableAPI.getAll(academicYearId),
        masterDataAPI.getTimeSlots(),
        masterDataAPI.getClasses(academicYearId),
      ]);
      setEntries(entriesResponse.data);
      setTimeSlots(
        [...slotsResponse.data].sort((a: TimeSlot, b: TimeSlot) => a.order - b.order),
      );
      setClasses(
        [...classesResponse.data].sort(
          (a: ClassItem, b: ClassItem) => a.grade - b.grade || a.name.localeCompare(b.name),
        ),
      );
    } catch (error) {
      console.error('Failed to load timetable:', error);
      setError('Lỗi khi tải bảng thời khóa biểu');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      await exportAPI.master(academicYearId);
    } catch (err) {
      console.error('Failed to export master timetable:', err);
      setError('Lỗi khi xuất Excel');
    } finally {
      setExporting(false);
    }
  };

  const gradeGroups = useMemo(() => {
    const groups: { grade: number; classes: ClassItem[] }[] = [];
    for (const cls of classes) {
      const group = groups.find((g) => g.grade === cls.grade);
      if (group) {
        group.classes.push(cls);
      } else {
        groups.push({ grade: cls.grade, classes: [cls] });
      }
    }
    return groups.sort((a, b) => a.grade - b.grade);
  }, [classes]);

  const getEntry = (
    day: string,
    slotId: string,
    classId: string,
  ): TimetableEntry | null => {
    return (
      entries.find(
        (e) =>
          e.dayOfWeek === day &&
          e.timeSlotId._id === slotId &&
          e.classId._id === classId,
      ) || null
    );
  };

  const handleCellClick = (day: string, slot: TimeSlot, cls: ClassItem) => {
    const entry = getEntry(day, slot._id, cls._id);
    setCellContext({
      academicYearId,
      classId: cls._id,
      className: cls.name,
      dayOfWeek: day,
      dayLabel: DAY_LABELS[day],
      timeSlot: slot,
      entry: entry as any,
    });
    setIsModalOpen(true);
  };

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold tracking-tight">
              Bảng Tổng Thời Khóa Biểu
            </h1>
            <p className="text-sm text-muted-foreground">
              Nhấp vào một ô để chọn môn học cho lớp
            </p>
          </div>
          <div className="flex items-end gap-3">
            <div className="w-48 space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Năm Học</label>
              <Select value={academicYearId} onValueChange={(value) => setAcademicYearId(value ?? '')}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn năm học" />
                </SelectTrigger>
                <SelectContent>
                  {academicYears.map((year) => (
                    <SelectItem key={year._id} value={year._id}>
                      {year.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleExport} disabled={exporting || !academicYearId} variant="secondary">
              {exporting ? <Loader2 className="animate-spin" /> : <Download />}
              Xuất Excel
            </Button>
          </div>
        </div>

        {error && (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {loading ? (
          <Card>
            <CardContent className="py-16 text-center text-sm text-muted-foreground">
              Đang tải...
            </CardContent>
          </Card>
        ) : classes.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center text-sm text-muted-foreground">
              Chưa có lớp học nào trong năm học này. Hãy thêm lớp ở trang Quản lý Lớp.
            </CardContent>
          </Card>
        ) : (
          <Card className="overflow-hidden py-0">
            <div className="overflow-x-auto">
              <Table className="border-separate border-spacing-0 text-sm">
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead
                      rowSpan={2}
                      className="sticky left-0 z-10 border-b border-r bg-muted/60 text-center align-middle font-semibold"
                    >
                      Thứ / Tiết
                    </TableHead>
                    {gradeGroups.map((group) => (
                      <TableHead
                        key={group.grade}
                        colSpan={group.classes.length}
                        className="border-b border-r bg-muted/40 text-center font-semibold text-foreground"
                      >
                        Khối {group.grade}
                      </TableHead>
                    ))}
                  </TableRow>
                  <TableRow className="hover:bg-transparent">
                    {gradeGroups.flatMap((group) =>
                      group.classes.map((cls) => (
                        <TableHead
                          key={cls._id}
                          className="border-b border-r bg-muted/20 text-center font-medium whitespace-nowrap"
                        >
                          {cls.name}
                        </TableHead>
                      )),
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {DAYS.map((day) =>
                    timeSlots.map((slot, slotIndex) => (
                      <TableRow key={`${day}-${slot._id}`}>
                        {slotIndex === 0 && (
                          <TableCell
                            rowSpan={timeSlots.length}
                            className="sticky left-0 z-10 border-b border-r bg-muted/40 text-center align-middle font-semibold"
                          >
                            {DAY_LABELS[day]}
                          </TableCell>
                        )}
                        {slot.type === 'BREAK' ? (
                          <TableCell
                            colSpan={classes.length}
                            className="border-b bg-muted/10 text-center text-xs text-muted-foreground"
                          >
                            Giải lao ({slot.startTime} - {slot.endTime})
                          </TableCell>
                        ) : (
                          gradeGroups.flatMap((group) =>
                            group.classes.map((cls) => {
                              const entry = getEntry(day, slot._id, cls._id);
                              return (
                                <TableCell
                                  key={`${day}-${slot._id}-${cls._id}`}
                                  onClick={() => handleCellClick(day, slot, cls)}
                                  className="min-w-28 cursor-pointer border-b border-r p-1.5 text-center align-top transition-colors hover:bg-accent/60"
                                  title={`Tiết ${slot.period} (${slot.startTime}-${slot.endTime})`}
                                >
                                  {entry ? (
                                    <div className="rounded-md bg-primary/10 px-2 py-1 text-xs">
                                      <div className="font-semibold text-primary">
                                        {entry.subjectId.shortName || entry.subjectId.name}
                                      </div>
                                      {entry.teacherId && (
                                        <div className="text-muted-foreground">{entry.teacherId.name}</div>
                                      )}
                                      {entry.roomId && (
                                        <div className="text-muted-foreground">{entry.roomId.name}</div>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="flex items-center justify-center py-1.5 text-muted-foreground/40">
                                      <Plus className="h-3.5 w-3.5" />
                                    </div>
                                  )}
                                </TableCell>
                              );
                            }),
                          )
                        )}
                      </TableRow>
                    )),
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        )}

        {!loading && classes.length > 0 && (
          <p className="text-sm text-muted-foreground">
            Tổng số lớp: {classes.length} · Tổng số tiết đã xếp: {entries.length}
          </p>
        )}

        <TimetableEntryModal
          isOpen={isModalOpen}
          context={cellContext}
          onClose={() => {
            setIsModalOpen(false);
            setCellContext(null);
          }}
          onSave={loadTimetable}
        />
      </div>
    </ProtectedLayout>
  );
}
