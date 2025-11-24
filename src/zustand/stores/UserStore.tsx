import { create } from "zustand";
import { User } from "../types/User";
import { UserApi } from "../api/UserApi";

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
  selectedUser: User | null;

  loading: boolean;
  error: string | null;

  // actions
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
      const data = await UserApi.getTutorByID(id);
      set({ users: data, loading: false });
    } catch (error: any) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Failed to load user list",
      });
    }
  },
  async fetchAllTutors(params) {
    set({ loading: true, error: null });
    try {
      const res = await UserApi.getAllTutors(params);
      console.log(222, res);
      const tutor = res.data.data;
      console.log(333, tutor);
      set({ users: tutor, loading: false });
    } catch (error: any) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Failed to load user list",
      });
    }
  },
}));
