'use client';

import { useEffect, useState } from 'react';
import { masterDataAPI } from '@/lib/api';

interface Subject {
  _id?: string;
  schoolId?: string;
  name: string;
  code: string;
  shortName: string;
  isActive: boolean;
}

interface SubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  subject?: Subject | null;
}

export function SubjectModal({ isOpen, onClose, onSave, subject }: SubjectModalProps) {
  const [formData, setFormData] = useState<Subject>({
    schoolId: '',
    name: '',
    code: '',
    shortName: '',
    isActive: true,
  });
  const [schools, setSchools] = useState<{ _id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    masterDataAPI.getSchools().then((res) => setSchools(res.data)).catch(() => null);
  }, []);

  useEffect(() => {
    if (subject) {
      setFormData({ ...subject, schoolId: (subject as any).schoolId || '' });
    } else {
      setFormData({
        schoolId: '',
        name: '',
        code: '',
        shortName: '',
        isActive: true,
      });
    }
    setError('');
  }, [subject, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.schoolId) {
      setError('Vui lòng chọn trường');
      return;
    }
    if (!formData.name.trim()) {
      setError('Tên môn học không được trống');
      return;
    }
    if (!formData.code.trim()) {
      setError('Mã môn học không được trống');
      return;
    }
    if (!formData.shortName.trim()) {
      setError('Viết tắt không được trống');
      return;
    }

    try {
      setLoading(true);
      if (subject && subject._id) {
        // Update
        await masterDataAPI.updateSubject(subject._id, formData);
      } else {
        // Create
        await masterDataAPI.createSubject(formData);
      }
      onSave();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi lưu môn học');
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
            {subject ? 'Chỉnh sửa Môn Học' : 'Thêm Môn Học Mới'}
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
              value={formData.schoolId || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="">-- Chọn trường --</option>
              {schools.map((s) => (
                <option key={s._id} value={s._id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên Môn Học <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="VD: Toán học"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mã Môn Học <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="VD: TOAN"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Viết Tắt <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="shortName"
              value={formData.shortName}
              onChange={handleChange}
              placeholder="VD: TN"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
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
