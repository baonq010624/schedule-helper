'use client';

import { useEffect, useState } from 'react';
import { masterDataAPI } from '@/lib/api';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

interface TimeSlot {
  _id?: string;
  session: string;
  period: number;
  startTime: string;
  endTime: string;
  type: string;
  order: number;
  isActive: boolean;
}

interface TimeSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  timeSlot?: TimeSlot | null;
}

const emptyForm: TimeSlot = {
  session: 'MORNING',
  period: 1,
  startTime: '',
  endTime: '',
  type: 'CLASS',
  order: 1,
  isActive: true,
};

export function TimeSlotModal({
  isOpen,
  onClose,
  onSave,
  timeSlot,
}: TimeSlotModalProps) {
  const [formData, setFormData] = useState<TimeSlot>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setFormData(timeSlot ?? emptyForm);
    setError('');
  }, [timeSlot, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.startTime || !formData.endTime) {
      setError('Vui lòng nhập giờ bắt đầu và kết thúc');
      return;
    }
    if (formData.endTime <= formData.startTime) {
      setError('Giờ kết thúc phải sau giờ bắt đầu');
      return;
    }

    try {
      setLoading(true);
      if (timeSlot && timeSlot._id) {
        await masterDataAPI.updateTimeSlot(timeSlot._id, formData);
      } else {
        await masterDataAPI.createTimeSlot(formData);
      }
      onSave();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi lưu khung giờ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{timeSlot ? 'Chỉnh sửa Khung Giờ' : 'Thêm Khung Giờ Mới'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>
                Buổi <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.session}
                onValueChange={(value) => value && setFormData({ ...formData, session: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MORNING">Sáng</SelectItem>
                  <SelectItem value="AFTERNOON">Chiều</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>
                Loại <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) => value && setFormData({ ...formData, type: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CLASS">Tiết học</SelectItem>
                  <SelectItem value="BREAK">Giải lao</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="period">Tiết Số</Label>
              <Input
                id="period"
                type="number"
                min={1}
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: Number(e.target.value) })}
                disabled={loading}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="order">
                Thứ Tự <span className="text-destructive">*</span>
              </Label>
              <Input
                id="order"
                type="number"
                min={1}
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="startTime">
                Giờ Bắt Đầu <span className="text-destructive">*</span>
              </Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                disabled={loading}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="endTime">
                Giờ Kết Thúc <span className="text-destructive">*</span>
              </Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked === true })}
              disabled={loading}
            />
            <Label htmlFor="isActive" className="font-normal">
              Hoạt động
            </Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Hủy
            </Button>
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

