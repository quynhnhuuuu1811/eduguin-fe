import { create } from "zustand";
import {
  Class,
  CreateClassRequest,
  UpdateClassRequest,
  JoinClassRequest,
  SetScheduleRequest,
  ClassSubscriptionRequest,
} from "../types/Classes";
import { ClassesApi } from "../api/ClassesApi";

interface ClassState {
  // State
  classes: Class[];
  selectedClass: Class | null;
  loading: boolean;
  error: string | null;

  // Actions cho Gia sư
  fetchTutorClasses: () => Promise<void>;
  createClass: (request: CreateClassRequest) => Promise<Class>;
  setSchedule: (request: SetScheduleRequest) => Promise<void>;
  deleteClass: (classId: string) => Promise<void>;

  // Actions cho Học sinh
  subscribeToClass: (request: ClassSubscriptionRequest) => Promise<void>;
}

export const useClassStore = create<ClassState>((set, get) => ({
  classes: [],
  selectedClass: null,
  loading: false,
  error: null,

  async fetchTutorClasses() {
    set({ loading: true, error: null });
    try {
      const res = await ClassesApi.getTutorClasses();
      set({
        classes: res.data.data,
        loading: false,
      });
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined;
      set({
        loading: false,
        error: errorMessage || "Không thể tải danh sách lớp học",
      });
    }
  },

  async createClass(request: CreateClassRequest): Promise<Class> {
    set({ loading: true, error: null });
    try {
      const res = await ClassesApi.createClass(request);
      set({
        classes: [...get().classes, res.data.data],
        loading: false,
      });
      return res.data.data;
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined;
      set({
        loading: false,
        error: errorMessage || "Không thể tạo lớp học",
      });
      throw error;
    }
  },

  async setSchedule(request: SetScheduleRequest) {
    set({ loading: true, error: null });
    try {
      await ClassesApi.setSchedule(request);
      set({ loading: false });
    }
    catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined;
      set({ loading: false, error: errorMessage || "Không thể đặt lịch học" });
    }
  },

  async deleteClass(classId: string) {
    set({ loading: true, error: null });
    try {
      await ClassesApi.deleteClass(classId);
      set((state) => ({
        classes: state.classes.filter((c) => c.id !== classId),
        loading: false,
      }));
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined;
      set({ loading: false, error: errorMessage || "Không thể xoá lớp học" });
      throw error;
    }
  },

  async subscribeToClass(request: ClassSubscriptionRequest) {
    set({ loading: true, error: null });
    try {
      await ClassesApi.subscribeToClass(request);
      set({ loading: false });
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined;
      set({ loading: false, error: errorMessage || "Không thể đăng ký lớp học" });
      throw error;
    }
  },
}));

