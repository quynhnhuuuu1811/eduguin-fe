import { User, StudentResponse, UserResponse } from "../types/User";
import instance from "@/lib/httpService";

export const UserApi = {
  getTutorByID(id: string): Promise<User[]> {
    return instance.get(`/user/tutor/${id}`);
  },
  getAllTutors(params?: Record<string, unknown>): Promise<User[]> {
    return instance.get(`/user/tutor`, { params });
  },
  updateStudentInfo(id: string, data: FormData): Promise<StudentResponse> {
    return instance.patch(`/user/student/${id}`, data);
  },
  updateTutorInfo(id: string, data: FormData): Promise<UserResponse> {
    return instance.patch(`/user/tutor/${id}`, data);
  },
};
