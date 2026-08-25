'use client';

import { useEffect, useMemo, useState } from 'react';
import { ProtectedLayout } from '@/components/protected-layout';
import { AcademicYearModal } from '@/components/academic-year-modal';
import { DeleteConfirmation } from '@/components/delete-confirmation';
import { masterDataAPI } from '@/lib/api';

interface AcademicYear {
  _id: string;
  schoolId: { name: string; _id: string } | string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export default function AcademicYearsPage() {
  const [years, setYears] = useState<AcademicYear[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<AcademicYear | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    year: AcademicYear | null;
  }>({ isOpen: false, year: null });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const modalYear = useMemo(() => {
    if (!selectedYear) return null;
    return {
      ...selectedYear,
      schoolId:
        typeof selectedYear.schoolId === 'object'
          ? selectedYear.schoolId._id
          : selectedYear.schoolId,
    };
  }, [selectedYear]);

  useEffect(() => {
    loadYears();
  }, []);

  const loadYears = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await masterDataAPI.getAcademicYears();
      setYears(response.data);
    } catch (error) {
      console.error('Failed to load academic years:', error);
      setError('Lỗi khi tải danh sách năm học');
    } finally {
      setLoading(false);
    }
  };

  const schoolName = (schoolId: AcademicYear['schoolId']) =>
    typeof schoolId === 'object' ? schoolId.name : '';

  const handleOpenCreateModal = () => {
    setSelectedYear(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (year: AcademicYear) => {
    setSelectedYear(year);
    setIsModalOpen(true);
  };

  const handleOpenDeleteConfirm = (year: AcademicYear) => {
    setDeleteConfirm({ isOpen: true, year });
  };

  const handleDeleteYear = async () => {
    if (!deleteConfirm.year) return;
    try {
      await masterDataAPI.deleteAcademicYear(deleteConfirm.year._id);
      setSuccess(`Xóa "${deleteConfirm.year.name}" thành công`);
      setDeleteConfirm({ isOpen: false, year: null });
      loadYears();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Lỗi khi xóa năm học');
    }
  };

  const handleSaveYear = () => {
    loadYears();
  };

  const filteredYears = years.filter(
    (year) =>
      year.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schoolName(year.schoolId).toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <ProtectedLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">Quản lý Năm Học</h1>
        <p className="text-gray-600 mb-6">Danh sách các năm học theo từng trường</p>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
            <button
              onClick={() => setError('')}
              className="ml-2 text-sm font-semibold hover:underline"
            >
              Đóng
            </button>
          </div>
        )}

        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            ✓ {success}
          </div>
        )}

        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Tìm kiếm tên năm học hoặc trường..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleOpenCreateModal}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            + Thêm Mới
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-6 py-3 text-left font-medium text-gray-700">Năm Học</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Trường</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Bắt Đầu</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Kết Thúc</th>
                <th className="px-6 py-3 text-center font-medium text-gray-700">Trạng Thái</th>
                <th className="px-6 py-3 text-center font-medium text-gray-700">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Đang tải...
                  </td>
                </tr>
              ) : filteredYears.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Không tìm thấy năm học nào
                  </td>
                </tr>
              ) : (
                filteredYears.map((year) => (
                  <tr key={year._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium text-gray-900">{year.name}</td>
                    <td className="px-6 py-3 text-gray-700">{schoolName(year.schoolId)}</td>
                    <td className="px-6 py-3 text-gray-700">
                      {new Date(year.startDate).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-3 text-gray-700">
                      {new Date(year.endDate).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-3 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          year.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {year.isActive ? 'Hoạt động' : 'Ngừng'}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-center space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(year)}
                        className="text-blue-500 hover:text-blue-700 hover:underline font-medium"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleOpenDeleteConfirm(year)}
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

        <div className="mt-6 text-sm text-gray-600">
          <p>Tổng số năm học: {years.length}</p>
        </div>

        <AcademicYearModal
          isOpen={isModalOpen}
          academicYear={modalYear}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedYear(null);
          }}
          onSave={handleSaveYear}
        />

        <DeleteConfirmation
          isOpen={deleteConfirm.isOpen}
          title="Xóa Năm Học"
          message="Bạn chắc chắn muốn xóa năm học này? Hành động này không thể hoàn tác."
          itemName={deleteConfirm.year?.name || ''}
          onConfirm={handleDeleteYear}
          onCancel={() => setDeleteConfirm({ isOpen: false, year: null })}
          isDangerous
        />
      </div>
    </ProtectedLayout>
  );
}
