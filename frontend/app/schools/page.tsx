'use client';

import { useEffect, useState } from 'react';
import { ProtectedLayout } from '@/components/protected-layout';
import { SchoolModal } from '@/components/school-modal';
import { DeleteConfirmation } from '@/components/delete-confirmation';
import { masterDataAPI } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface School {
  _id: string;
  name: string;
  address: string;
  isActive: boolean;
}

export default function SchoolsPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    school: School | null;
  }>({ isOpen: false, school: null });

  useEffect(() => {
    loadSchools();
  }, []);

  const loadSchools = async () => {
    try {
      setLoading(true);
      const response = await masterDataAPI.getSchools();
      setSchools(response.data);
    } catch (error) {
      console.error('Failed to load schools:', error);
      toast.error('Lỗi khi tải danh sách trường');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSchool = async () => {
    if (!deleteConfirm.school) return;
    try {
      await masterDataAPI.deleteSchool(deleteConfirm.school._id);
      toast.success(`Đã xóa "${deleteConfirm.school.name}"`);
      setDeleteConfirm({ isOpen: false, school: null });
      loadSchools();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Lỗi khi xóa trường');
    }
  };

  const filteredSchools = schools.filter(
    (school) =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.address.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold tracking-tight">Quản lý Trường</h1>
            <p className="text-sm text-muted-foreground">Danh sách các trường trong hệ thống</p>
          </div>
          <Button
            onClick={() => {
              setSelectedSchool(null);
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
            placeholder="Tìm kiếm tên hoặc địa chỉ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <Card className="overflow-hidden py-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên Trường</TableHead>
                <TableHead>Địa Chỉ</TableHead>
                <TableHead className="text-center">Trạng Thái</TableHead>
                <TableHead className="text-right">Hành Động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                    Đang tải...
                  </TableCell>
                </TableRow>
              ) : filteredSchools.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                    Không tìm thấy trường nào
                  </TableCell>
                </TableRow>
              ) : (
                filteredSchools.map((school) => (
                  <TableRow key={school._id}>
                    <TableCell className="font-medium">{school.name}</TableCell>
                    <TableCell className="text-muted-foreground">{school.address}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={school.isActive ? 'default' : 'secondary'}>
                        {school.isActive ? 'Hoạt động' : 'Ngừng'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => {
                            setSelectedSchool(school);
                            setIsModalOpen(true);
                          }}
                        >
                          <Pencil />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDeleteConfirm({ isOpen: true, school })}
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

        <p className="text-sm text-muted-foreground">Tổng số trường: {schools.length}</p>

        <SchoolModal
          isOpen={isModalOpen}
          school={selectedSchool}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedSchool(null);
          }}
          onSave={loadSchools}
        />

        <DeleteConfirmation
          isOpen={deleteConfirm.isOpen}
          title="Xóa Trường"
          message="Bạn chắc chắn muốn xóa trường này? Hành động này không thể hoàn tác."
          itemName={deleteConfirm.school?.name || ''}
          onConfirm={handleDeleteSchool}
          onCancel={() => setDeleteConfirm({ isOpen: false, school: null })}
          isDangerous
        />
      </div>
    </ProtectedLayout>
  );
}
