import { create } from "zustand";
import {
  Class,
  CreateClassRequest,
  UpdateClassRequest,
  JoinClassRequest,
  SetScheduleRequest,
  ClassSubscriptionRequest,
  ClassSubscriptionResponse,
} from "../types/Classes";
import { ClassesApi } from "../api/ClassesApi";

interface ClassState {
  // State
  classes: Class[];
  selectedClass: Class | null;
  loading: boolean;
  error: string | null;
  studentSubscriptions: ClassSubscriptionResponse[];
  // Actions cho Gia sư
  fetchTutorClasses: () => Promise<void>;
  createClass: (request: CreateClassRequest) => Promise<Class>;
  setSchedule: (request: SetScheduleRequest) => Promise<void>;
  deleteClass: (classId: string) => Promise<void>;
  getClassesByTutorId: (tutorId: string) => Promise<Class[]>;

  // Actions cho Học sinh
  subscribeToClass: (request: ClassSubscriptionRequest) => Promise<void>;
  fetchStudentClasses: () => Promise<void>;
  getListStudentSubscriptions: () => Promise<void>;
  approveClassSubscription: (subscriptionId: string) => Promise<void>;
  rejectClassSubscription: (subscriptionId: string) => Promise<void>;   
}

export const useClassStore = create<ClassState>((set, get) => ({
  classes: [],
  studentSubscriptions: [],
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

  async getClassesByTutorId(tutorId: string) {
    set({ loading: true, error: null });
    try {
      const res = await ClassesApi.getClassesByTutorId(tutorId);
      set({
        classes: res.data.data,
        loading: false,
      });
      return res.data.data;
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined;
      set({ loading: false, error: errorMessage || "Không thể tải danh sách lớp học" });
      throw error;
    }
  },

  async fetchStudentClasses() {
    set({ loading: true, error: null });
    try {
      const res = await ClassesApi.getStudentClasses();
      set({ classes: res.data.data, loading: false });
    }
    catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined;
      set({ loading: false, error: errorMessage || "Không thể tải danh sách lớp học" });
      throw error;
    }
  },

  async getListStudentSubscriptions() {
    set({ loading: true, error: null });
    try {
      const res = await ClassesApi.getListStudentSubscriptions();
      set({ studentSubscriptions: res.data.data, loading: false });
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined;
      set({ loading: false, error: errorMessage || "Không thể tải danh sách yêu cầu" });
      throw error;
    }
  },

  async approveClassSubscription(subscriptionId: string) {
    set({ loading: true, error: null });
    try {
      const res = await ClassesApi.approveClassSubscription(subscriptionId);
    }
    catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined;
      set({ loading: false, error: errorMessage || "Không thể duyệt yêu cầu" });
      throw error;
    }
  },

  async rejectClassSubscription(subscriptionId: string) {
    set({ loading: true, error: null });
    try {
      const res = await ClassesApi.rejectClassSubscription(subscriptionId);
    }
    catch (error: unknown) {
    const errorMessage =
      error && typeof error === "object" && "response" in error
        ? (error as { response?: { data?: { message?: string } } }).response
            ?.data?.message
        : undefined;
    set({ loading: false, error: errorMessage || "Không thể từ chối yêu cầu" });
    throw error;
    }
  },
}));

