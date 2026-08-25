'use client';

import { useEffect, useState } from 'react';
import { ProtectedLayout } from '@/components/protected-layout';
import { CurriculumRuleModal } from '@/components/curriculum-rule-modal';
import { DeleteConfirmation } from '@/components/delete-confirmation';
import { curriculumRuleAPI, masterDataAPI } from '@/lib/api';

interface CurriculumRule {
  _id: string;
  academicYearId: any;
  grade?: number;
  classId?: any;
  subjectId: any;
  requiredPeriodsPerWeek: number;
  minPeriodsPerDay?: number;
  maxPeriodsPerDay?: number;
  isRequired: boolean;
  severity: string;
}

const SEVERITY_STYLES: Record<string, string> = {
  ERROR: 'bg-red-100 text-red-800',
  WARNING: 'bg-yellow-100 text-yellow-800',
  INFO: 'bg-blue-100 text-blue-800',
};

export default function CurriculumRulesPage() {
  const [rules, setRules] = useState<CurriculumRule[]>([]);
  const [academicYears, setAcademicYears] = useState<any[]>([]);
  const [selectedYearId, setSelectedYearId] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<CurriculumRule | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; rule: CurriculumRule | null }>({
    isOpen: false,
    rule: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    masterDataAPI.getAcademicYears().then((res) => {
      setAcademicYears(res.data);
      if (res.data.length > 0) setSelectedYearId(res.data[0]._id);
    });
  }, []);

  useEffect(() => {
    if (selectedYearId) loadRules();
  }, [selectedYearId]);

  const loadRules = async () => {
    try {
      setLoading(true);
      const res = await curriculumRuleAPI.getAll({ academicYearId: selectedYearId });
      setRules(res.data);
    } catch (err) {
      console.error('Failed to load curriculum rules:', err);
      setError('Lỗi khi tải danh sách quy định');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm.rule) return;
    try {
      await curriculumRuleAPI.delete(deleteConfirm.rule._id);
      setSuccess('Xóa quy định thành công');
      setDeleteConfirm({ isOpen: false, rule: null });
      loadRules();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi xóa quy định');
    }
  };

  return (
    <ProtectedLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">Quy Định Chương Trình</h1>
        <p className="text-gray-600 mb-6">Số tiết/tuần yêu cầu theo môn học và khối/lớp</p>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
            <button onClick={() => setError('')} className="ml-2 text-sm font-semibold hover:underline">
              Đóng
            </button>
          </div>
        )}
        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            ✓ {success}
          </div>
        )}

        <div className="mb-6 flex gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Năm Học</label>
            <select
              value={selectedYearId}
              onChange={(e) => setSelectedYearId(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {academicYears.map((y) => (
                <option key={y._id} value={y._id}>{y.name}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => { setSelectedRule(null); setIsModalOpen(true); }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            + Thêm Quy Định
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-6 py-3 text-left font-medium text-gray-700">Môn Học</th>
                <th className="px-6 py-3 text-center font-medium text-gray-700">Khối</th>
                <th className="px-6 py-3 text-center font-medium text-gray-700">Lớp riêng</th>
                <th className="px-6 py-3 text-center font-medium text-gray-700">Số Tiết/Tuần</th>
                <th className="px-6 py-3 text-center font-medium text-gray-700">Bắt buộc</th>
                <th className="px-6 py-3 text-center font-medium text-gray-700">Mức độ</th>
                <th className="px-6 py-3 text-center font-medium text-gray-700">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="px-6 py-8 text-center text-gray-500">Đang tải...</td></tr>
              ) : rules.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-8 text-center text-gray-500">Chưa có quy định nào</td></tr>
              ) : (
                rules.map((rule) => (
                  <tr key={rule._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium text-gray-900">{rule.subjectId?.name}</td>
                    <td className="px-6 py-3 text-center">{rule.grade ?? '-'}</td>
                    <td className="px-6 py-3 text-center">{rule.classId?.name ?? '-'}</td>
                    <td className="px-6 py-3 text-center">{rule.requiredPeriodsPerWeek}</td>
                    <td className="px-6 py-3 text-center">{rule.isRequired ? 'Có' : 'Không'}</td>
                    <td className="px-6 py-3 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${SEVERITY_STYLES[rule.severity]}`}>
                        {rule.severity}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-center space-x-2">
                      <button
                        onClick={() => { setSelectedRule(rule); setIsModalOpen(true); }}
                        className="text-blue-500 hover:text-blue-700 hover:underline font-medium"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => setDeleteConfirm({ isOpen: true, rule })}
                        className="text-red-500 hover:text-red-700 hover:underline font-medium"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <CurriculumRuleModal
          isOpen={isModalOpen}
          rule={selectedRule}
          onClose={() => { setIsModalOpen(false); setSelectedRule(null); }}
          onSave={loadRules}
        />

        <DeleteConfirmation
          isOpen={deleteConfirm.isOpen}
          title="Xóa Quy Định"
          message="Bạn chắc chắn muốn xóa quy định này? Hành động này không thể hoàn tác."
          itemName={deleteConfirm.rule?.subjectId?.name || ''}
          onConfirm={handleDelete}
          onCancel={() => setDeleteConfirm({ isOpen: false, rule: null })}
          isDangerous
        />
      </div>
    </ProtectedLayout>
  );
}
