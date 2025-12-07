import { Recommend } from "@mui/icons-material";
import { User, StudentResponse, UserResponse } from "../types/User";
import instance from "@/lib/httpService";
import RecommnendTutor from "@/pages/home/components/RecommendTutor";

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
  updateTutorInfo(data: FormData): Promise<UserResponse> {
    return instance.patch(`/user/my-tutor`, data);
  },
  recommendTutor() {
    return instance.get(`/student-event/recommendations`);
  },
};
