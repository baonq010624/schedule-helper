'use client';

import { useEffect, useState } from 'react';
import { curriculumRuleAPI, masterDataAPI } from '@/lib/api';

interface CurriculumRule {
  _id?: string;
  academicYearId: string;
  grade?: number;
  classId?: string;
  subjectId: string;
  requiredPeriodsPerWeek: number;
  minPeriodsPerDay?: number;
  maxPeriodsPerDay?: number;
  isRequired: boolean;
  severity: string;
}

interface CurriculumRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  rule?: CurriculumRule | null;
}

const emptyForm: CurriculumRule = {
  academicYearId: '',
  grade: undefined,
  classId: '',
  subjectId: '',
  requiredPeriodsPerWeek: 1,
  minPeriodsPerDay: undefined,
  maxPeriodsPerDay: undefined,
  isRequired: true,
  severity: 'WARNING',
};

export function CurriculumRuleModal({ isOpen, onClose, onSave, rule }: CurriculumRuleModalProps) {
  const [formData, setFormData] = useState<CurriculumRule>(emptyForm);
  const [academicYears, setAcademicYears] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([masterDataAPI.getAcademicYears(), masterDataAPI.getSubjects()]).then(
      ([years, subs]) => {
        setAcademicYears(years.data);
        setSubjects(subs.data);
      },
    );
  }, []);

  useEffect(() => {
    if (formData.academicYearId) {
      masterDataAPI.getClasses(formData.academicYearId).then((res) => setClasses(res.data));
    } else {
      setClasses([]);
    }
  }, [formData.academicYearId]);

  useEffect(() => {
    if (rule) {
      setFormData({
        ...rule,
        academicYearId:
          typeof rule.academicYearId === 'object' ? (rule.academicYearId as any)._id : rule.academicYearId,
        subjectId: typeof rule.subjectId === 'object' ? (rule.subjectId as any)._id : rule.subjectId,
        classId:
          rule.classId && typeof rule.classId === 'object' ? (rule.classId as any)._id : rule.classId || '',
      });
    } else {
      setFormData(emptyForm);
    }
    setError('');
  }, [rule, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : type === 'number'
            ? value === '' ? undefined : Number(value)
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
    if (!formData.subjectId) {
      setError('Vui lòng chọn môn học');
      return;
    }
    if (!formData.grade && !formData.classId) {
      setError('Cần chọn khối hoặc lớp áp dụng');
      return;
    }
    if (!formData.requiredPeriodsPerWeek || formData.requiredPeriodsPerWeek < 0) {
      setError('Số tiết/tuần không hợp lệ');
      return;
    }

    const payload = { ...formData, classId: formData.classId || undefined };

    try {
      setLoading(true);
      if (rule && rule._id) {
        await curriculumRuleAPI.update(rule._id, payload);
      } else {
        await curriculumRuleAPI.create(payload);
      }
      onSave();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi lưu quy định');
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
            {rule ? 'Chỉnh sửa Quy Định' : 'Thêm Quy Định Chương Trình'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
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
                <option key={y._id} value={y._id}>{y.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Môn Học <span className="text-red-500">*</span>
            </label>
            <select
              name="subjectId"
              value={formData.subjectId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="">-- Chọn môn học --</option>
              {subjects.map((s) => (
                <option key={s._id} value={s._id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Khối (áp dụng cho cả khối)
            </label>
            <input
              type="number"
              name="grade"
              value={formData.grade ?? ''}
              onChange={handleChange}
              placeholder="VD: 1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lớp cụ thể (ghi đè quy định khối, tùy chọn)
            </label>
            <select
              name="classId"
              value={formData.classId || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="">-- Không --</option>
              {classes.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số Tiết / Tuần <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="requiredPeriodsPerWeek"
              value={formData.requiredPeriodsPerWeek}
              onChange={handleChange}
              min={0}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tối thiểu/ngày
              </label>
              <input
                type="number"
                name="minPeriodsPerDay"
                value={formData.minPeriodsPerDay ?? ''}
                onChange={handleChange}
                min={0}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tối đa/ngày
              </label>
              <input
                type="number"
                name="maxPeriodsPerDay"
                value={formData.maxPeriodsPerDay ?? ''}
                onChange={handleChange}
                min={0}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mức độ cảnh báo khi lệch quy định
            </label>
            <select
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="ERROR">ERROR - Nghiêm trọng</option>
              <option value="WARNING">WARNING - Cảnh báo</option>
              <option value="INFO">INFO - Thông tin</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isRequired"
              id="isRequired"
              checked={formData.isRequired}
              onChange={handleChange}
              disabled={loading}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isRequired" className="ml-2 text-sm text-gray-700">
              Môn bắt buộc
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
