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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

interface School {
  _id?: string;
  name: string;
  address: string;
  isActive: boolean;
}

interface SchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  school?: School | null;
}

export function SchoolModal({ isOpen, onClose, onSave, school }: SchoolModalProps) {
  const [formData, setFormData] = useState<School>({
    name: '',
    address: '',
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (school) {
      setFormData(school);
    } else {
      setFormData({ name: '', address: '', isActive: true });
    }
    setError('');
  }, [school, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Tên trường không được trống');
      return;
    }
    if (!formData.address.trim()) {
      setError('Địa chỉ không được trống');
      return;
    }

    try {
      setLoading(true);
      if (school && school._id) {
        await masterDataAPI.updateSchool(school._id, formData);
      } else {
        await masterDataAPI.createSchool(formData);
      }
      onSave();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi lưu trường');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{school ? 'Chỉnh sửa Trường' : 'Thêm Trường Mới'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="name">
              Tên Trường <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="VD: Trường Tiểu học ABC"
              disabled={loading}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="address">
              Địa Chỉ <span className="text-destructive">*</span>
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="VD: 123 Đường ABC, Quận 1"
              disabled={loading}
            />
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
