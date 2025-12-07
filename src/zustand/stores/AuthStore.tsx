import { create } from "zustand";
import { AuthUser, LoginRequest, RegisterRequest, RegisterResponse } from "../types/Auth";
import { AuthApi } from "../api/AuthApi";

interface AuthState {
  data: {
    user: AuthUser | null;
    accessToken: string | null;
  };
  loading: boolean;
  error: string | null;

  login: (credentials: LoginRequest) => Promise<void>;
  register: (credentials: RegisterRequest) => Promise<RegisterResponse>;
  logout: () => void;
  clearError: () => void;
  getMyInfo: () => Promise<void>;
}

const getInitialState = (): Pick<AuthState, 'data' | 'loading' | 'error'> => {
  if (typeof window === "undefined") {
    return {
      data: { user: null, accessToken: null },
      loading: false,
      error: null,
    };
  }

  const accessToken = localStorage.getItem("accessToken");
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  return {
    data: { user, accessToken },
    loading: false,
    error: null,
  };
};

export const useAuthStore = create<AuthState>((set) => ({
  ...getInitialState(),

  async login(credentials: LoginRequest) {
    set({ loading: true, error: null });
    try {
      const res = await AuthApi.login(credentials);
      const user = res.data?.data?.user;
      const accessToken = res.data?.data?.access_token;

      if (typeof window !== "undefined" && accessToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
      }

      set({
        data: { user, accessToken },
        loading: false,
      });
    } catch {
      set({
        loading: false,
        error: "Đăng nhập thất bại",
      });
    }
  },

  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }
    set({
      data: {
        user: null,
        accessToken: null,
      },
      error: null,
    });
  },

  async register(credentials: RegisterRequest) {
    set({ loading: true, error: null });
    try {
      const res = await AuthApi.register(credentials);
      set({ loading: false });
      return res;
    } catch (error) {
      set({ loading: false, error: "Đăng ký thất bại" });
      throw error;
    }
  },

  clearError() {
    set({ error: null });
  },

  async getMyInfo() {
    set({ loading: true, error: null });
    try {
      const res = await AuthApi.getMyInfo();
      const userData = res.data.data; // res.data is ProfileResponse, res.data.data is the user object
      const user: AuthUser = {
        id: userData.id,
        fullName: userData.fullName,
        email: userData.email,
        role: userData.role,
        avatarUrl: userData.avatarUrl ?? undefined,
        avatar: userData.avatarUrl ?? undefined,
        description: userData.tutorProfile?.bio || "",
        dateOfBirth: userData.birthDate,
        birthDate: userData.birthDate,
        sex: userData.sex,
        phoneNumber: userData.phoneNumber ?? undefined,
        phone: userData.phoneNumber ?? undefined,
        tutorProfile: userData.tutorProfile ? {
          userId: userData.tutorProfile.userId,
          bio: userData.tutorProfile.bio,
          monthlyPrice: userData.tutorProfile.monthlyPrice,
          introVideoUrl: userData.tutorProfile.introVideoUrl ?? undefined,
          rating: userData.tutorProfile.rating,
          grade: userData.tutorProfile.grade,
          ratingCount: userData.tutorProfile.ratingCount,
          meetingTool: userData.tutorProfile.meetingTool,
        } : undefined,
        studentProfile: userData.studentProfile ?? undefined,
      };
      set((state) => ({
        data: {
          user,
          accessToken: state.data.accessToken,
        },
        loading: false,
      }));
    } catch (error) {
      set({ loading: false, error: "Không thể tải thông tin người dùng" });
    }
  },
}));


