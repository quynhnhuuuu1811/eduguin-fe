import { Recommend } from "@mui/icons-material";
import { User, StudentResponse, UserResponse } from "../types/User";
import instance from "@/lib/httpService";
import RecommnendTutor from "@/page-views/home/components/RecommendTutor";

export const UserApi = {
  getTutorByID(id: string): Promise<User[]> {
    return instance.get(`/user/tutor/${id}`);
  },
  getAllTutors(params?: Record<string, unknown>): Promise<User[]> {
    return instance.get(`/user/tutor`, { params });
  },
  updateStudentInfo(data: FormData): Promise<StudentResponse> {
    return instance.patch(`/user/my-student`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateTutorInfo(data: FormData): Promise<UserResponse> {
    return instance.patch(`/user/my-tutor`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  recommendTutor() {
    return instance.get(`/student-event/recommendations`);
  },
  getStudents(params?: Record<string, unknown>): Promise<any> {
    return instance.get(`/user/students`, { params });
  },
};
