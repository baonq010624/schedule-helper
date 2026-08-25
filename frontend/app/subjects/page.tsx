'use client';

import { useEffect, useState } from 'react';
import { ProtectedLayout } from '@/components/protected-layout';
import { SubjectModal } from '@/components/subject-modal';
import { DeleteConfirmation } from '@/components/delete-confirmation';
import { masterDataAPI } from '@/lib/api';

interface Subject {
  _id: string;
  name: string;
  code: string;
  shortName: string;
  isActive: boolean;
}

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    subject: Subject | null;
  }>({ isOpen: false, subject: null });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await masterDataAPI.getSubjects();
      setSubjects(response.data);
    } catch (error) {
      console.error('Failed to load subjects:', error);
      setError('Lỗi khi tải danh sách môn học');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    setSelectedSubject(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (subject: Subject) => {
    setSelectedSubject(subject);
    setIsModalOpen(true);
  };

  const handleOpenDeleteConfirm = (subject: Subject) => {
    setDeleteConfirm({ isOpen: true, subject });
  };

  const handleDeleteSubject = async () => {
    if (!deleteConfirm.subject) return;
    try {
      await masterDataAPI.deleteSubject(deleteConfirm.subject._id);
      setSuccess(`Xóa "${deleteConfirm.subject.name}" thành công`);
      setDeleteConfirm({ isOpen: false, subject: null });
      loadSubjects();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Lỗi khi xóa môn học');
    }
  };

  const handleSaveSubject = () => {
    loadSubjects();
  };

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.shortName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProtectedLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">Quản lý Môn Học</h1>
        <p className="text-gray-600 mb-6">Danh sách môn học trong chương trình học</p>

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
            placeholder="Tìm kiếm tên, mã hoặc tên viết tắt..."
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
                <th className="px-6 py-3 text-left font-medium text-gray-700">Tên Môn Học</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Mã Môn</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Viết Tắt</th>
                <th className="px-6 py-3 text-center font-medium text-gray-700">Trạng Thái</th>
                <th className="px-6 py-3 text-center font-medium text-gray-700">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Đang tải...
                  </td>
                </tr>
              ) : filteredSubjects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Không tìm thấy môn học nào
                  </td>
                </tr>
              ) : (
                filteredSubjects.map((subject) => (
                  <tr key={subject._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium text-gray-900">
                      {subject.name}
                    </td>
                    <td className="px-6 py-3 text-gray-700">{subject.code}</td>
                    <td className="px-6 py-3 text-gray-700">{subject.shortName}</td>
                    <td className="px-6 py-3 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          subject.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {subject.isActive ? 'Hoạt động' : 'Ngừng'}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-center space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(subject)}
                        className="text-blue-500 hover:text-blue-700 hover:underline font-medium"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleOpenDeleteConfirm(subject)}
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
          <p>Tổng số môn học: {subjects.length}</p>
          <p>Môn học hoạt động: {subjects.filter((s) => s.isActive).length}</p>
        </div>

        {/* Modals */}
        <SubjectModal
          isOpen={isModalOpen}
          subject={selectedSubject}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedSubject(null);
          }}
          onSave={handleSaveSubject}
        />

        <DeleteConfirmation
          isOpen={deleteConfirm.isOpen}
          title="Xóa Môn Học"
          message="Bạn chắc chắn muốn xóa môn học này? Hành động này không thể hoàn tác."
          itemName={deleteConfirm.subject?.name || ''}
          onConfirm={handleDeleteSubject}
          onCancel={() => setDeleteConfirm({ isOpen: false, subject: null })}
          isDangerous
        />
      </div>
    </ProtectedLayout>
  );
}
