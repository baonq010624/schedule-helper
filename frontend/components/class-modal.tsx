'use client';

import { useEffect, useState } from 'react';
import { masterDataAPI } from '@/lib/api';

interface AcademicYear {
  _id: string;
  name: string;
}

interface Room {
  _id: string;
  name: string;
}

interface ClassItem {
  _id?: string;
  academicYearId: string;
  grade: number;
  name: string;
  roomId?: string;
  isActive: boolean;
}

interface ClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  classItem?: ClassItem | null;
}

export function ClassModal({ isOpen, onClose, onSave, classItem }: ClassModalProps) {
  const [formData, setFormData] = useState<ClassItem>({
    academicYearId: '',
    grade: 1,
    name: '',
    roomId: '',
    isActive: true,
  });
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    Promise.all([masterDataAPI.getAcademicYears(), masterDataAPI.getRooms()])
      .then(([yearsRes, roomsRes]) => {
        setAcademicYears(yearsRes.data);
        setRooms(roomsRes.data);
      })
      .catch(() => {
        setAcademicYears([]);
        setRooms([]);
      });
  }, [isOpen]);

  useEffect(() => {
    if (classItem) {
      setFormData({
        ...classItem,
        academicYearId:
          typeof (classItem as any).academicYearId === 'object'
            ? (classItem as any).academicYearId._id
            : classItem.academicYearId,
        roomId:
          typeof (classItem as any).roomId === 'object'
            ? (classItem as any).roomId?._id
            : classItem.roomId || '',
      });
    } else {
      setFormData({
        academicYearId: '',
        grade: 1,
        name: '',
        roomId: '',
        isActive: true,
      });
    }
    setError('');
  }, [classItem, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : name === 'grade'
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.academicYearId) {
      setError('Vui lòng chọn năm học');
      return;
    }
    if (!formData.name.trim()) {
      setError('Tên lớp không được trống');
      return;
    }
    if (!formData.grade || formData.grade < 1) {
      setError('Khối lớp không hợp lệ');
      return;
    }

    const payload = { ...formData, roomId: formData.roomId || undefined };

    try {
      setLoading(true);
      if (classItem && classItem._id) {
        await masterDataAPI.updateClass(classItem._id, payload);
      } else {
        await masterDataAPI.createClass(payload);
      }
      onSave();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi lưu lớp học');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">
            {classItem ? 'Chỉnh sửa Lớp Học' : 'Thêm Lớp Học Mới'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Năm Học <span className="text-red-500">*</span>
            </label>
            <select
              name="academicYearId"
              value={formData.academicYearId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="">-- Chọn năm học --</option>
              {academicYears.map((y) => (
                <option key={y._id} value={y._id}>
                  {y.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Khối <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="grade"
                min={1}
                value={formData.grade}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên Lớp <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="VD: 1A"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phòng Học
            </label>
            <select
              name="roomId"
              value={formData.roomId || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="">-- Không cố định --</option>
              {rooms.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isActive"
              id="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              disabled={loading}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
              Hoạt động
            </label>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Đang lưu...' : 'Lưu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
