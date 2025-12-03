import { create } from "zustand";
import { User } from "../types/User";
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
  selectedUser: Tutor | null;

  loading: boolean;
  error: string | null;

  fetchTutorByID: (id: string) => Promise<void>;
  fetchAllTutors: (params?: FetchTutorParams) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  selectedUser: null,
  loading: false,
  error: null,

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

  async fetchAllTutors(params) {
    set({ loading: true, error: null });
    try {
      const res: any = await UserApi.getAllTutors(params);
      const tutor = res.data.data;
      set({ users: tutor, loading: false });
    } catch (error: any) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Failed to load user list",
      });
    }
  },
}));
