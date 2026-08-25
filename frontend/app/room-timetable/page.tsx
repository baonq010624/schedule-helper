'use client';

import { useEffect, useState } from 'react';
import { ProtectedLayout } from '@/components/protected-layout';
import { timetableAPI, masterDataAPI, exportAPI } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Download, Loader2 } from 'lucide-react';

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
  teacherId?: { name: string };
}

const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
const DAY_LABELS = {
  MONDAY: 'Thứ Hai',
  TUESDAY: 'Thứ Ba',
  WEDNESDAY: 'Thứ Tư',
  THURSDAY: 'Thứ Năm',
  FRIDAY: 'Thứ Sáu',
};

export default function RoomTimetablePage() {
  const [entries, setEntries] = useState<TimetableEntry[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoomId, setSelectedRoomId] = useState<string>('');
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    if (selectedRoomId) {
      loadRoomTimetable();
    }
  }, [selectedRoomId]);

  const loadRooms = async () => {
    try {
      const response = await masterDataAPI.getRooms();
      setRooms(response.data);
      if (response.data.length > 0) {
        setSelectedRoomId(response.data[0]._id);
      }
    } catch (error) {
      console.error('Failed to load rooms:', error);
    }
  };

  const loadRoomTimetable = async () => {
    try {
      setLoading(true);
      const [entriesResponse, slotsResponse] = await Promise.all([
        timetableAPI.getByRoom(selectedRoomId),
        masterDataAPI.getTimeSlots(),
      ]);
      setEntries(entriesResponse.data);
      setTimeSlots(slotsResponse.data.sort((a: TimeSlot, b: TimeSlot) => a.order - b.order));
    } catch (error) {
      console.error('Failed to load room timetable:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEntry = (day: string, slot: TimeSlot): TimetableEntry | null => {
    return entries.find((e) => e.dayOfWeek === day && e.timeSlotId._id === slot._id) || null;
  };

  const selectedRoom = rooms.find((r) => r._id === selectedRoomId);

  const handleExport = async () => {
    if (!selectedRoom) return;
    try {
      setExporting(true);
      await exportAPI.room(selectedRoom._id, selectedRoom.name);
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
              Thời Khóa Biểu Phòng Học
            </h1>
            <p className="text-sm text-muted-foreground">Xem TKB theo từng phòng học</p>
          </div>
          <div className="flex items-end gap-3">
            <div className="w-64 space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Chọn Phòng Học</label>
              <Select value={selectedRoomId} onValueChange={(value) => setSelectedRoomId(value ?? '')}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn phòng học" />
                </SelectTrigger>
                <SelectContent>
                  {rooms.map((room) => (
                    <SelectItem key={room._id} value={room._id}>
                      {room.name} ({room.type}) - {room.capacity} chỗ
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleExport} disabled={exporting || !selectedRoomId} variant="secondary">
              {exporting ? <Loader2 className="animate-spin" /> : <Download />}
              Xuất Excel
            </Button>
          </div>
        </div>

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
                                <div className="text-xs text-muted-foreground">{entry.classId.name}</div>
                                {entry.teacherId && (
                                  <div className="text-xs text-muted-foreground">{entry.teacherId.name}</div>
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
            Tổng số tiết: {timeSlots.length} · Tổng số tiết sử dụng: {entries.length}
          </p>
        )}
      </div>
    </ProtectedLayout>
  );
}

