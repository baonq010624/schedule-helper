'use client';

import { useEffect, useState } from 'react';
import { ProtectedLayout } from '@/components/protected-layout';
import { TimeSlotModal } from '@/components/time-slot-modal';
import { DeleteConfirmation } from '@/components/delete-confirmation';
import { masterDataAPI } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface TimeSlot {
  _id: string;
  session: string;
  period: number;
  startTime: string;
  endTime: string;
  type: string;
  order: number;
  isActive: boolean;
}

const SESSION_LABELS: Record<string, string> = {
  MORNING: 'Sáng',
  AFTERNOON: 'Chiều',
};

export default function TimeSlotsPage() {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    slot: TimeSlot | null;
  }>({ isOpen: false, slot: null });

  useEffect(() => {
    loadTimeSlots();
  }, []);

  const loadTimeSlots = async () => {
    try {
      setLoading(true);
      const response = await masterDataAPI.getTimeSlots();
      setTimeSlots(
        [...response.data].sort((a: TimeSlot, b: TimeSlot) => a.order - b.order),
      );
    } catch (error) {
      console.error('Failed to load time slots:', error);
      toast.error('Lỗi khi tải danh sách khung giờ');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSlot = async () => {
    if (!deleteConfirm.slot) return;
    try {
      await masterDataAPI.deleteTimeSlot(deleteConfirm.slot._id);
      toast.success('Đã xóa khung giờ');
      setDeleteConfirm({ isOpen: false, slot: null });
      loadTimeSlots();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Lỗi khi xóa khung giờ');
    }
  };

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold tracking-tight">Quản lý Khung Giờ</h1>
            <p className="text-sm text-muted-foreground">Danh sách các tiết học và giờ giải lao</p>
          </div>
          <Button
            onClick={() => {
              setSelectedSlot(null);
              setIsModalOpen(true);
            }}
          >
            <Plus />
            Thêm Mới
          </Button>
        </div>

        <Card className="overflow-hidden py-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Thứ Tự</TableHead>
                <TableHead>Buổi</TableHead>
                <TableHead>Tiết</TableHead>
                <TableHead>Giờ</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead className="text-center">Trạng Thái</TableHead>
                <TableHead className="text-right">Hành Động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                    Đang tải...
                  </TableCell>
                </TableRow>
              ) : timeSlots.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                    Chưa có khung giờ nào
                  </TableCell>
                </TableRow>
              ) : (
                timeSlots.map((slot) => (
                  <TableRow key={slot._id}>
                    <TableCell className="text-muted-foreground">{slot.order}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {SESSION_LABELS[slot.session] || slot.session}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {slot.type === 'BREAK' ? 'Giải lao' : `Tiết ${slot.period}`}
                    </TableCell>
                    <TableCell className="font-medium">
                      {slot.startTime} - {slot.endTime}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {slot.type === 'BREAK' ? 'Giải lao' : 'Tiết học'}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={slot.isActive ? 'default' : 'secondary'}>
                        {slot.isActive ? 'Hoạt động' : 'Ngừng'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => {
                            setSelectedSlot(slot);
                            setIsModalOpen(true);
                          }}
                        >
                          <Pencil />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDeleteConfirm({ isOpen: true, slot })}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>

        <p className="text-sm text-muted-foreground">Tổng số khung giờ: {timeSlots.length}</p>

        <TimeSlotModal
          isOpen={isModalOpen}
          timeSlot={selectedSlot}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedSlot(null);
          }}
          onSave={loadTimeSlots}
        />

        <DeleteConfirmation
          isOpen={deleteConfirm.isOpen}
          title="Xóa Khung Giờ"
          message="Bạn chắc chắn muốn xóa khung giờ này? Hành động này không thể hoàn tác."
          itemName={
            deleteConfirm.slot
              ? `${SESSION_LABELS[deleteConfirm.slot.session]} - ${deleteConfirm.slot.startTime}-${deleteConfirm.slot.endTime}`
              : ''
          }
          onConfirm={handleDeleteSlot}
          onCancel={() => setDeleteConfirm({ isOpen: false, slot: null })}
          isDangerous
        />
      </div>
    </ProtectedLayout>
  );
}

