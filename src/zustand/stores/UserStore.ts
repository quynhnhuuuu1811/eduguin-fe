import { create } from "zustand";
import { User, UserResponse } from "../types/User";
import { UserApi } from "../api/UserApi";
import { Tutor } from "@/types/tutor.type";

interface FetchTutorParams {
  subject?: string;
  grade?: number;
  sex?: string;
  minRating?: number;
  sortPrice?: "ASC" | "DESC";
  page: number;
  limit: number;
}

interface UserState {
  users: User[];
  totalUsers: number;
  students: any[];
  selectedUser: Tutor | null;
  userInfo: UserResponse | null;
  tutorList: Tutor[];
  loading: boolean;
  error: string | null;

  fetchTutorByID: (id: string) => Promise<void>;
  fetchAllTutors: (params?: FetchTutorParams) => Promise<void>;
  updateStudentInfo: (data: FormData) => Promise<void>;
  updateTutorInfo: (data: FormData) => Promise<void>;
  clearStudentInfo: () => void;
  recommendTutor: () => Promise<void>;
  getStudents: (params: any) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  totalUsers: 0,
  students: [],
  selectedUser: null,
  userInfo: null,
  loading: false,
  error: null,
  tutorList: [],
  async fetchTutorByID(id: string) {
    set({ loading: true, error: null });
    try {
      const data: any = await UserApi.getTutorByID(id);
      set({
        selectedUser: data.data.data,
        loading: false,
      });
    } catch (error: any) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Failed to load tutor detail",
      });
    }
  },

  async fetchAllTutors(params: any) {
    set({ loading: true, error: null });
    try {
      const res: any = await UserApi.getAllTutors(params);
      const tutor = res.data.data;
      const total = res.data.meta?.total || res.data.total || tutor?.length || 0;
      set({ users: tutor, totalUsers: total, loading: false });
    } catch (error: any) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Failed to load user list",
      });
    }
  },

  async updateStudentInfo( data: FormData) {
    set({ loading: true, error: null });
    try {
      const res = await UserApi.updateStudentInfo(data);
      set({
        userInfo: res.data.data,
        loading: false,
      });
    } catch (error: any) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Failed to update user info",
      });
      throw error;
    }
  },
  async recommendTutor() {
    set({ loading: true, error: null });
    try {
      const res: any = await UserApi.recommendTutor();
      const tutors = res.data.data;
      set({ tutorList: tutors, loading: false });
    } catch (error: any) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Failed to recommend tutors",
      });
    }
  },

  async updateTutorInfo(data: FormData) {
    set({ loading: true, error: null });
    try {
      const res: any = await UserApi.updateTutorInfo(data);
      set({
        userInfo: res.data.data,
        loading: false,
      });
    } catch (error: any) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Failed to update user info",
      });
      throw error;
    }
  },
  async getStudents(params: any) {
    set({ loading: true, error: null });
    try {
      const res: any = await UserApi.getStudents(params);
      set({ students: res.data.data, loading: false });
    } catch (error: any) {
      set({ loading: false, error: error?.response?.data?.message || "Failed to get students" });
    }
  },

  clearStudentInfo() {
    set({ userInfo: null });
  },
}));
