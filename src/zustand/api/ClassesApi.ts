import {
  Class,
  CreateClassRequest,
  UpdateClassRequest,
  ClassResponse,
  ClassesResponse,
  JoinClassRequest,
  JoinClassResponse,
} from '../types/Classes';
import instance from '@/lib/httpService';

export const ClassesApi = {
  // Lấy danh sách tất cả lớp học
  getAllClasses(params?: {
    tutorId?: string;
    studentId?: string;
    status?: string;
    subject?: string;
  }): Promise<ClassesResponse> {
    return instance.get('/classes', { params });
  },

  // Lấy chi tiết lớp học theo ID
  getClassById(id: string): Promise<ClassResponse> {
    return instance.get(`/classes/${id}`);
  },

  // Tạo lớp học mới
  createClass(data: CreateClassRequest): Promise<ClassResponse> {
    return instance.post('/classes', data);
  },

  // Cập nhật lớp học
  updateClass(id: string, data: UpdateClassRequest): Promise<ClassResponse> {
    return instance.put(`/classes/${id}`, data);
  },

  // Xóa lớp học
  deleteClass(id: string): Promise<{ data: { data: { message: string } } }> {
    return instance.delete(`/classes/${id}`);
  },

  // Tham gia lớp học
  joinClass(data: JoinClassRequest): Promise<JoinClassResponse> {
    return instance.post('/classes/join', data);
  },

  // Rời lớp học
  leaveClass(classId: string): Promise<{ data: { data: { message: string } } }> {
    return instance.post(`/classes/${classId}/leave`);
  },

  // Lấy lớp học của tutor
  getTutorClasses(tutorId: string, params?: { status?: string }): Promise<ClassesResponse> {
    return instance.get(`/classes/tutor/${tutorId}`, { params });
  },

  // Lấy lớp học của student
  getStudentClasses(studentId: string, params?: { status?: string }): Promise<ClassesResponse> {
    return instance.get(`/classes/student/${studentId}`, { params });
  },
};

