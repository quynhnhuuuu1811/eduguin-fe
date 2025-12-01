import { User } from "../types/User";
import instance from "@/lib/httpService";

export const UserApi = {
  getTutorByID(id: string): Promise<User[]> {
    return instance.get(`/user/tutor/${id}`);
  },
  getAllTutors(params?: any): Promise<User[]> {
    return instance.get(`/user/tutor`, { params });
  },
};
