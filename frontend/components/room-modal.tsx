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

interface Room {
  _id?: string;
  name: string;
  capacity: number;
  type: string;
  isActive: boolean;
}

interface RoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  room?: Room | null;
}

const ROOM_TYPES = [
  { value: 'CLASSROOM', label: 'Phòng học' },
  { value: 'LAB', label: 'Phòng thí nghiệm/Tin học' },
  { value: 'GYM', label: 'Nhà thể chất' },
];

export function RoomModal({ isOpen, onClose, onSave, room }: RoomModalProps) {
  const [formData, setFormData] = useState<Room>({
    name: '',
    capacity: 40,
    type: 'CLASSROOM',
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (room) {
      setFormData(room);
    } else {
      setFormData({ name: '', capacity: 40, type: 'CLASSROOM', isActive: true });
    }
    setError('');
  }, [room, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Tên phòng không được trống');
      return;
    }
    if (!formData.capacity || formData.capacity < 1) {
      setError('Sức chứa không hợp lệ');
      return;
    }

    try {
      setLoading(true);
      if (room && room._id) {
        await masterDataAPI.updateRoom(room._id, formData);
      } else {
        await masterDataAPI.createRoom(formData);
      }
      onSave();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi lưu phòng học');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{room ? 'Chỉnh sửa Phòng Học' : 'Thêm Phòng Học Mới'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="name">
              Tên Phòng <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="VD: Phòng 101"
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="capacity">
                Sức Chứa <span className="text-destructive">*</span>
              </Label>
              <Input
                id="capacity"
                type="number"
                min={1}
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                disabled={loading}
              />
            </div>
            <div className="space-y-1.5">
              <Label>
                Loại Phòng <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) => value && setFormData({ ...formData, type: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ROOM_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

