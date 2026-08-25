'use client';

import { useEffect, useState } from 'react';
import { masterDataAPI } from '@/lib/api';

interface School {
  _id: string;
  name: string;
}

interface AcademicYear {
  _id?: string;
  schoolId: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

interface AcademicYearModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  academicYear?: AcademicYear | null;
}

export function AcademicYearModal({
  isOpen,
  onClose,
  onSave,
  academicYear,
}: AcademicYearModalProps) {
  const [formData, setFormData] = useState<AcademicYear>({
    schoolId: '',
    name: '',
    startDate: '',
    endDate: '',
    isActive: true,
  });
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    masterDataAPI
      .getSchools()
      .then((res) => setSchools(res.data))
      .catch(() => setSchools([]));
  }, [isOpen]);

  useEffect(() => {
    if (academicYear) {
      setFormData({
        ...academicYear,
        startDate: academicYear.startDate?.slice(0, 10) || '',
        endDate: academicYear.endDate?.slice(0, 10) || '',
        schoolId:
          typeof (academicYear as any).schoolId === 'object'
            ? (academicYear as any).schoolId._id
            : academicYear.schoolId,
      });
    } else {
      setFormData({
        schoolId: '',
        name: '',
        startDate: '',
        endDate: '',
        isActive: true,
      });
    }
    setError('');
  }, [academicYear, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.schoolId) {
      setError('Vui lòng chọn trường');
      return;
    }
    if (!formData.name.trim()) {
      setError('Tên năm học không được trống');
      return;
    }
    if (!formData.startDate || !formData.endDate) {
      setError('Vui lòng nhập ngày bắt đầu và kết thúc');
      return;
    }
    if (new Date(formData.endDate) <= new Date(formData.startDate)) {
      setError('Ngày kết thúc phải sau ngày bắt đầu');
      return;
    }

    try {
      setLoading(true);
      if (academicYear && academicYear._id) {
        await masterDataAPI.updateAcademicYear(academicYear._id, formData);
      } else {
        await masterDataAPI.createAcademicYear(formData);
      }
      onSave();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi lưu năm học');
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
            {academicYear ? 'Chỉnh sửa Năm Học' : 'Thêm Năm Học Mới'}
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
              Trường <span className="text-red-500">*</span>
            </label>
            <select
              name="schoolId"
              value={formData.schoolId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="">-- Chọn trường --</option>
              {schools.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên Năm Học <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="VD: 2026-2027"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày Bắt Đầu <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày Kết Thúc <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>
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
