'use client';

import { useEffect, useState } from 'react';
import { masterDataAPI, timetableAPI } from '@/lib/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Trash2 } from 'lucide-react';

const NONE = 'none';

interface TimeSlot {
  _id: string;
  period: number;
  startTime: string;
  endTime: string;
  session: string;
}

interface RefItem {
  _id: string;
  name: string;
}

interface TimetableEntry {
  _id: string;
  subjectId: RefItem;
  teacherId?: RefItem;
  roomId?: RefItem;
  note?: string;
}

export interface TimetableCellContext {
  academicYearId: string;
  classId: string;
  className: string;
  dayOfWeek: string;
  dayLabel: string;
  timeSlot: TimeSlot;
  entry: TimetableEntry | null;
}

interface TimetableEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  context: TimetableCellContext | null;
}

export function TimetableEntryModal({
  isOpen,
  onClose,
  onSave,
  context,
}: TimetableEntryModalProps) {
  const [subjects, setSubjects] = useState<RefItem[]>([]);
  const [teachers, setTeachers] = useState<RefItem[]>([]);
  const [rooms, setRooms] = useState<RefItem[]>([]);
  const [subjectId, setSubjectId] = useState('');
  const [teacherId, setTeacherId] = useState(NONE);
  const [roomId, setRoomId] = useState(NONE);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    Promise.all([
      masterDataAPI.getSubjects(),
      masterDataAPI.getTeachers(),
      masterDataAPI.getRooms(),
    ])
      .then(([subjectsRes, teachersRes, roomsRes]) => {
        setSubjects(subjectsRes.data);
        setTeachers(teachersRes.data);
        setRooms(roomsRes.data);
      })
      .catch(() => {
        setSubjects([]);
        setTeachers([]);
        setRooms([]);
      });
  }, [isOpen]);

  useEffect(() => {
    if (context?.entry) {
      setSubjectId(context.entry.subjectId._id);
      setTeacherId(context.entry.teacherId?._id || NONE);
      setRoomId(context.entry.roomId?._id || NONE);
      setNote(context.entry.note || '');
    } else {
      setSubjectId('');
      setTeacherId(NONE);
      setRoomId(NONE);
      setNote('');
    }
    setError('');
  }, [context, isOpen]);

  if (!context) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!subjectId) {
      setError('Vui lòng chọn môn học');
      return;
    }

    const payload = {
      academicYearId: context.academicYearId,
      classId: context.classId,
      subjectId,
      teacherId: teacherId === NONE ? undefined : teacherId,
      dayOfWeek: context.dayOfWeek,
      timeSlotId: context.timeSlot._id,
      roomId: roomId === NONE ? undefined : roomId,
      note: note || undefined,
    };

    try {
      setLoading(true);
      if (context.entry) {
        await timetableAPI.update(context.entry._id, payload);
      } else {
        await timetableAPI.create(payload);
      }
      onSave();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi lưu thời khóa biểu');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    if (!context.entry) return;
    try {
      setLoading(true);
      await timetableAPI.delete(context.entry._id);
      onSave();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi xóa tiết học');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {context.className} · {context.dayLabel} · Tiết {context.timeSlot.period}
          </DialogTitle>
          <DialogDescription>
            {context.timeSlot.startTime} - {context.timeSlot.endTime}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-1.5">
            <Label>
              Môn Học <span className="text-destructive">*</span>
            </Label>
            <Select value={subjectId} onValueChange={(value) => setSubjectId(value ?? '')}>
              <SelectTrigger className="w-full" disabled={loading}>
                <SelectValue placeholder="-- Chọn môn học --" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((s) => (
                  <SelectItem key={s._id} value={s._id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Giáo Viên</Label>
            <Select value={teacherId} onValueChange={(value) => setTeacherId(value ?? NONE)}>
              <SelectTrigger className="w-full" disabled={loading}>
                <SelectValue placeholder="-- Không chọn --" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NONE}>-- Không chọn --</SelectItem>
                {teachers.map((t) => (
                  <SelectItem key={t._id} value={t._id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Phòng Học</Label>
            <Select value={roomId} onValueChange={(value) => setRoomId(value ?? NONE)}>
              <SelectTrigger className="w-full" disabled={loading}>
                <SelectValue placeholder="-- Không chọn --" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NONE}>-- Không chọn --</SelectItem>
                {rooms.map((r) => (
                  <SelectItem key={r._id} value={r._id}>
                    {r.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="note">Ghi Chú</Label>
            <Input id="note" value={note} onChange={(e) => setNote(e.target.value)} disabled={loading} />
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            {context.entry && (
              <Button
                type="button"
                variant="outline"
                onClick={handleClear}
                disabled={loading}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 />
                Xóa Tiết
              </Button>
            )}
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="animate-spin" />}
              {loading ? 'Đang lưu...' : 'Lưu'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

