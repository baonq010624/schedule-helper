'use client';

import { useEffect, useMemo, useState } from 'react';
import { ProtectedLayout } from '@/components/protected-layout';
import { ClassModal } from '@/components/class-modal';
import { DeleteConfirmation } from '@/components/delete-confirmation';
import { masterDataAPI } from '@/lib/api';

interface ClassItem {
  _id: string;
  academicYearId: { name: string; _id: string } | string;
  grade: number;
  name: string;
  roomId?: { name: string; _id: string } | string;
  isActive: boolean;
}

export default function ClassesPage() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    classItem: ClassItem | null;
  }>({ isOpen: false, classItem: null });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const modalClassItem = useMemo(() => {
    if (!selectedClass) return null;
    const academicYearId =
      typeof selectedClass.academicYearId === 'object'
        ? selectedClass.academicYearId._id
        : selectedClass.academicYearId;
    const roomId: string | undefined =
      selectedClass.roomId && typeof selectedClass.roomId === 'object'
        ? selectedClass.roomId._id
        : (selectedClass.roomId as string | undefined);
    return {
      _id: selectedClass._id,
      academicYearId,
      grade: selectedClass.grade,
      name: selectedClass.name,
      roomId,
      isActive: selectedClass.isActive,
    };
  }, [selectedClass]);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await masterDataAPI.getClasses();
      setClasses(response.data);
    } catch (error) {
      console.error('Failed to load classes:', error);
      setError('Lỗi khi tải danh sách lớp học');
    } finally {
      setLoading(false);
    }
  };

  const yearName = (yearId: ClassItem['academicYearId']) =>
    typeof yearId === 'object' ? yearId.name : '';
  const roomName = (roomId: ClassItem['roomId']) =>
    roomId && typeof roomId === 'object' ? roomId.name : '-';

  const handleOpenCreateModal = () => {
    setSelectedClass(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (classItem: ClassItem) => {
    setSelectedClass(classItem);
    setIsModalOpen(true);
  };

  const handleOpenDeleteConfirm = (classItem: ClassItem) => {
    setDeleteConfirm({ isOpen: true, classItem });
  };

  const handleDeleteClass = async () => {
    if (!deleteConfirm.classItem) return;
    try {
      await masterDataAPI.deleteClass(deleteConfirm.classItem._id);
      setSuccess(`Xóa "${deleteConfirm.classItem.name}" thành công`);
      setDeleteConfirm({ isOpen: false, classItem: null });
      loadClasses();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Lỗi khi xóa lớp học');
    }
  };

  const handleSaveClass = () => {
    loadClasses();
  };

  const filteredClasses = classes.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      yearName(c.academicYearId).toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <ProtectedLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">Quản lý Lớp Học</h1>
        <p className="text-gray-600 mb-6">Danh sách các lớp theo từng năm học</p>

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
            placeholder="Tìm kiếm tên lớp hoặc năm học..."
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
                <th className="px-6 py-3 text-left font-medium text-gray-700">Lớp</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Khối</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Năm Học</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Phòng</th>
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
              ) : filteredClasses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Không tìm thấy lớp học nào
                  </td>
                </tr>
              ) : (
                filteredClasses.map((c) => (
                  <tr key={c._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium text-gray-900">{c.name}</td>
                    <td className="px-6 py-3 text-gray-700">Khối {c.grade}</td>
                    <td className="px-6 py-3 text-gray-700">{yearName(c.academicYearId)}</td>
                    <td className="px-6 py-3 text-gray-700">{roomName(c.roomId)}</td>
                    <td className="px-6 py-3 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          c.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {c.isActive ? 'Hoạt động' : 'Ngừng'}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-center space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(c)}
                        className="text-blue-500 hover:text-blue-700 hover:underline font-medium"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleOpenDeleteConfirm(c)}
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
          <p>Tổng số lớp: {classes.length}</p>
        </div>

        <ClassModal
          isOpen={isModalOpen}
          classItem={modalClassItem}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedClass(null);
          }}
          onSave={handleSaveClass}
        />

        <DeleteConfirmation
          isOpen={deleteConfirm.isOpen}
          title="Xóa Lớp Học"
          message="Bạn chắc chắn muốn xóa lớp học này? Hành động này không thể hoàn tác."
          itemName={deleteConfirm.classItem?.name || ''}
          onConfirm={handleDeleteClass}
          onCancel={() => setDeleteConfirm({ isOpen: false, classItem: null })}
          isDangerous
        />
      </div>
    </ProtectedLayout>
  );
}
