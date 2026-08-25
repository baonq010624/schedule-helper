'use client';

import { useEffect, useState } from 'react';
import { ProtectedLayout } from '@/components/protected-layout';
import { authAPI, masterDataAPI } from '@/lib/api';

interface User {
  _id: string;
  email: string;
  name: string;
  role: string;
  teacherId?: string;
  isActive: boolean;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [usersRes, teachersRes] = await Promise.all([
        authAPI.getUsers(),
        masterDataAPI.getTeachers(),
      ]);
      setUsers(usersRes.data);
      setTeachers(teachersRes.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi tải danh sách tài khoản');
    } finally {
      setLoading(false);
    }
  };

  const handleLinkTeacher = async (userId: string, teacherId: string) => {
    try {
      await authAPI.setUserTeacher(userId, teacherId || null);
      setSuccess('Đã cập nhật liên kết giáo viên');
      loadData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi liên kết giáo viên');
    }
  };

  return (
    <ProtectedLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">Quản lý Tài Khoản</h1>
        <p className="text-gray-600 mb-6">
          Liên kết tài khoản có vai trò TEACHER với một giáo viên để họ xem được TKB của mình
        </p>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>
        )}
        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            ✓ {success}
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-6 py-3 text-left font-medium text-gray-700">Tên</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Email</th>
                <th className="px-6 py-3 text-center font-medium text-gray-700">Vai trò</th>
                <th className="px-6 py-3 text-center font-medium text-gray-700">Giáo viên liên kết</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">Đang tải...</td></tr>
              ) : (
                users.map((u) => (
                  <tr key={u._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium text-gray-900">{u.name}</td>
                    <td className="px-6 py-3 text-gray-700">{u.email}</td>
                    <td className="px-6 py-3 text-center">{u.role}</td>
                    <td className="px-6 py-3 text-center">
                      {u.role === 'TEACHER' ? (
                        <select
                          value={u.teacherId || ''}
                          onChange={(e) => handleLinkTeacher(u._id, e.target.value)}
                          className="px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">-- Chưa liên kết --</option>
                          {teachers.map((t) => (
                            <option key={t._id} value={t._id}>{t.name} ({t.code})</option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedLayout>
  );
}
