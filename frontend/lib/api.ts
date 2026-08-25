import axios, { AxiosInstance, AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Create axios instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle responses and errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// API service functions
export const authAPI = {
  register: (email: string, password: string, name: string) =>
    apiClient.post('/auth/register', { email, password, name }),
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
  getProfile: () => apiClient.get('/auth/profile'),
  getUsers: () => apiClient.get('/auth/users'),
  setUserTeacher: (userId: string, teacherId: string | null) =>
    apiClient.put(`/auth/users/${userId}/teacher`, { teacherId }),
};

export const timetableAPI = {
  getAll: (academicYearId?: string) =>
    apiClient.get('/timetable-entries', { params: { academicYearId } }),
  getByClass: (classId: string, dayOfWeek?: string) =>
    apiClient.get(`/timetable-entries/class/${classId}`, { params: { dayOfWeek } }),
  getByTeacher: (teacherId: string, dayOfWeek?: string) =>
    apiClient.get(`/timetable-entries/teacher/${teacherId}`, { params: { dayOfWeek } }),
  getByRoom: (roomId: string, dayOfWeek?: string) =>
    apiClient.get(`/timetable-entries/room/${roomId}`, { params: { dayOfWeek } }),
  getById: (id: string) => apiClient.get(`/timetable-entries/${id}`),
  create: (data: any) => apiClient.post('/timetable-entries', data),
  update: (id: string, data: any) => apiClient.put(`/timetable-entries/${id}`, data),
  delete: (id: string) => apiClient.delete(`/timetable-entries/${id}`),
  getMine: (dayOfWeek?: string) =>
    apiClient.get('/timetable-entries/me', { params: { dayOfWeek } }),
  publish: (classId: string, academicYearId: string) =>
    apiClient.post('/timetable-entries/publish', { classId, academicYearId }),
};

export const masterDataAPI = {
  getSchools: () => apiClient.get('/schools'),
  createSchool: (data: any) => apiClient.post('/schools', data),
  updateSchool: (id: string, data: any) => apiClient.put(`/schools/${id}`, data),
  deleteSchool: (id: string) => apiClient.delete(`/schools/${id}`),

  getAcademicYears: (schoolId?: string) =>
    apiClient.get('/academic-years', { params: { schoolId } }),
  createAcademicYear: (data: any) => apiClient.post('/academic-years', data),
  updateAcademicYear: (id: string, data: any) =>
    apiClient.put(`/academic-years/${id}`, data),
  deleteAcademicYear: (id: string) => apiClient.delete(`/academic-years/${id}`),

  getClasses: (academicYearId?: string) =>
    apiClient.get('/classes', { params: { academicYearId } }),
  createClass: (data: any) => apiClient.post('/classes', data),
  updateClass: (id: string, data: any) => apiClient.put(`/classes/${id}`, data),
  deleteClass: (id: string) => apiClient.delete(`/classes/${id}`),

  getSubjects: (schoolId?: string) => apiClient.get('/subjects', { params: { schoolId } }),
  createSubject: (data: any) => apiClient.post('/subjects', data),
  updateSubject: (id: string, data: any) => apiClient.put(`/subjects/${id}`, data),
  deleteSubject: (id: string) => apiClient.delete(`/subjects/${id}`),
  getTeachers: (schoolId?: string) => apiClient.get('/teachers', { params: { schoolId } }),
  createTeacher: (data: any) => apiClient.post('/teachers', data),
  updateTeacher: (id: string, data: any) => apiClient.put(`/teachers/${id}`, data),
  deleteTeacher: (id: string) => apiClient.delete(`/teachers/${id}`),

  getRooms: () => apiClient.get('/rooms'),
  createRoom: (data: any) => apiClient.post('/rooms', data),
  updateRoom: (id: string, data: any) => apiClient.put(`/rooms/${id}`, data),
  deleteRoom: (id: string) => apiClient.delete(`/rooms/${id}`),

  getTimeSlots: (session?: string) =>
    apiClient.get('/time-slots', { params: { session } }),
  createTimeSlot: (data: any) => apiClient.post('/time-slots', data),
  updateTimeSlot: (id: string, data: any) => apiClient.put(`/time-slots/${id}`, data),
  deleteTimeSlot: (id: string) => apiClient.delete(`/time-slots/${id}`),
};

export const curriculumRuleAPI = {
  getAll: (filters?: { academicYearId?: string; classId?: string; grade?: number; subjectId?: string }) =>
    apiClient.get('/curriculum-rules', { params: filters }),
  getById: (id: string) => apiClient.get(`/curriculum-rules/${id}`),
  create: (data: any) => apiClient.post('/curriculum-rules', data),
  update: (id: string, data: any) => apiClient.put(`/curriculum-rules/${id}`, data),
  delete: (id: string) => apiClient.delete(`/curriculum-rules/${id}`),
  getClassReport: (classId: string) => apiClient.get(`/curriculum-rules/report/${classId}`),
  autoFill: (classId: string) => apiClient.post(`/curriculum-rules/auto-fill/${classId}`),
};

// Trả về Blob để tải file Excel xuống máy người dùng
const downloadFile = async (url: string, filename: string) => {
  const response = await apiClient.get(url, { responseType: 'blob' });
  const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = blobUrl;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(blobUrl);
};

export const exportAPI = {
  master: (academicYearId?: string) =>
    downloadFile(
      `/exports/master${academicYearId ? `?academicYearId=${academicYearId}` : ''}`,
      'bang-tong-thoi-khoa-bieu.xlsx',
    ),
  class: (classId: string, className: string) =>
    downloadFile(`/exports/class/${classId}`, `tkb-lop-${className}.xlsx`),
  teacher: (teacherId: string, teacherName: string) =>
    downloadFile(`/exports/teacher/${teacherId}`, `tkb-gv-${teacherName}.xlsx`),
  room: (roomId: string, roomName: string) =>
    downloadFile(`/exports/room/${roomId}`, `tkb-phong-${roomName}.xlsx`),
};
