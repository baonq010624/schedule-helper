'use client';

import { useEffect, useState } from 'react';
import { ProtectedLayout } from '@/components/protected-layout';
import { TeacherModal } from '@/components/teacher-modal';
import { DeleteConfirmation } from '@/components/delete-confirmation';
import { masterDataAPI } from '@/lib/api';

interface Teacher {
  _id: string;
  name: string;
  code: string;
  email: string;
  department: string;
  isActive: boolean;
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    teacher: Teacher | null;
  }>({ isOpen: false, teacher: null });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await masterDataAPI.getTeachers();
      setTeachers(response.data);
    } catch (error) {
      console.error('Failed to load teachers:', error);
      setError('Lỗi khi tải danh sách giáo viên');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    setSelectedTeacher(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  const handleOpenDeleteConfirm = (teacher: Teacher) => {
    setDeleteConfirm({ isOpen: true, teacher });
  };

  const handleDeleteTeacher = async () => {
    if (!deleteConfirm.teacher) return;
    try {
      await masterDataAPI.deleteTeacher(deleteConfirm.teacher._id);
      setSuccess(`Xóa "${deleteConfirm.teacher.name}" thành công`);
      setDeleteConfirm({ isOpen: false, teacher: null });
      loadTeachers();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Lỗi khi xóa giáo viên');
    }
  };

  const handleSaveTeacher = () => {
    loadTeachers();
  };

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProtectedLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">Quản lý Giáo Viên</h1>
        <p className="text-gray-600 mb-6">Danh sách giáo viên trong hệ thống</p>

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
            placeholder="Tìm kiếm tên, mã hoặc email..."
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
                <th className="px-6 py-3 text-left font-medium text-gray-700">Tên</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Mã GV</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Email</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Bộ Môn</th>
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
              ) : filteredTeachers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Không tìm thấy giáo viên nào
                  </td>
                </tr>
              ) : (
                filteredTeachers.map((teacher) => (
                  <tr key={teacher._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium text-gray-900">
                      {teacher.name}
                    </td>
                    <td className="px-6 py-3 text-gray-700">{teacher.code}</td>
                    <td className="px-6 py-3 text-gray-700">{teacher.email}</td>
                    <td className="px-6 py-3 text-gray-700">{teacher.department}</td>
                    <td className="px-6 py-3 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          teacher.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {teacher.isActive ? 'Hoạt động' : 'Ngừng'}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-center space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(teacher)}
                        className="text-blue-500 hover:text-blue-700 hover:underline font-medium"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleOpenDeleteConfirm(teacher)}
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

        {!loading && (
          <div className="mt-6 text-sm text-gray-600">
            <p>Tổng số giáo viên: {teachers.length}</p>
            <p>Giáo viên hoạt động: {teachers.filter((t) => t.isActive).length}</p>
          </div>
        )}

        {/* Modals */}
        <TeacherModal
          isOpen={isModalOpen}
          teacher={selectedTeacher}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTeacher(null);
          }}
          onSave={handleSaveTeacher}
        />

        <DeleteConfirmation
          isOpen={deleteConfirm.isOpen}
          title="Xóa Giáo Viên"
          message="Bạn chắc chắn muốn xóa giáo viên này? Hành động này không thể hoàn tác."
          itemName={deleteConfirm.teacher?.name || ''}
          onConfirm={handleDeleteTeacher}
          onCancel={() => setDeleteConfirm({ isOpen: false, teacher: null })}
          isDangerous
        />
      </div>
    </ProtectedLayout>
  );
}
