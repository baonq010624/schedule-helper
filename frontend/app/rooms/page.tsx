'use client';

import { useEffect, useState } from 'react';
import { ProtectedLayout } from '@/components/protected-layout';
import { RoomModal } from '@/components/room-modal';
import { DeleteConfirmation } from '@/components/delete-confirmation';
import { masterDataAPI } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Room {
  _id: string;
  name: string;
  capacity: number;
  type: string;
  isActive: boolean;
}

const TYPE_LABELS: Record<string, string> = {
  CLASSROOM: 'Phòng học',
  LAB: 'Phòng thí nghiệm/Tin học',
  GYM: 'Nhà thể chất',
};

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    room: Room | null;
  }>({ isOpen: false, room: null });

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      setLoading(true);
      const response = await masterDataAPI.getRooms();
      setRooms(response.data);
    } catch (error) {
      console.error('Failed to load rooms:', error);
      toast.error('Lỗi khi tải danh sách phòng học');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRoom = async () => {
    if (!deleteConfirm.room) return;
    try {
      await masterDataAPI.deleteRoom(deleteConfirm.room._id);
      toast.success(`Đã xóa "${deleteConfirm.room.name}"`);
      setDeleteConfirm({ isOpen: false, room: null });
      loadRooms();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Lỗi khi xóa phòng học');
    }
  };

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold tracking-tight">Quản lý Phòng Học</h1>
            <p className="text-sm text-muted-foreground">Danh sách phòng học, phòng chức năng</p>
          </div>
          <Button
            onClick={() => {
              setSelectedRoom(null);
              setIsModalOpen(true);
            }}
          >
            <Plus />
            Thêm Mới
          </Button>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm tên phòng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <Card className="overflow-hidden py-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên Phòng</TableHead>
                <TableHead>Sức Chứa</TableHead>
                <TableHead>Loại Phòng</TableHead>
                <TableHead className="text-center">Trạng Thái</TableHead>
                <TableHead className="text-right">Hành Động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                    Đang tải...
                  </TableCell>
                </TableRow>
              ) : filteredRooms.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                    Không tìm thấy phòng học nào
                  </TableCell>
                </TableRow>
              ) : (
                filteredRooms.map((room) => (
                  <TableRow key={room._id}>
                    <TableCell className="font-medium">{room.name}</TableCell>
                    <TableCell className="text-muted-foreground">{room.capacity}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {TYPE_LABELS[room.type] || room.type}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={room.isActive ? 'default' : 'secondary'}>
                        {room.isActive ? 'Hoạt động' : 'Ngừng'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => {
                            setSelectedRoom(room);
                            setIsModalOpen(true);
                          }}
                        >
                          <Pencil />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDeleteConfirm({ isOpen: true, room })}
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

        <p className="text-sm text-muted-foreground">Tổng số phòng: {rooms.length}</p>

        <RoomModal
          isOpen={isModalOpen}
          room={selectedRoom}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRoom(null);
          }}
          onSave={loadRooms}
        />

        <DeleteConfirmation
          isOpen={deleteConfirm.isOpen}
          title="Xóa Phòng Học"
          message="Bạn chắc chắn muốn xóa phòng học này? Hành động này không thể hoàn tác."
          itemName={deleteConfirm.room?.name || ''}
          onConfirm={handleDeleteRoom}
          onCancel={() => setDeleteConfirm({ isOpen: false, room: null })}
          isDangerous
        />
      </div>
    </ProtectedLayout>
  );
}

