import { create } from "zustand";
import {
  AuthUser,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  TutorApplyRequest,
  AdminLoginRequest,
} from "../types/Auth";
import { AuthApi } from "../api/AuthApi";
import { setAuthCookies, clearAuthCookies } from "@/utils/cookies";

interface AuthState {
  data: {
    user: AuthUser | null;
    accessToken: string | null;
  };
  loading: boolean;
  error: string | null;

  login: (credentials: LoginRequest) => Promise<void>;
  adminLogin: (credentials: AdminLoginRequest) => Promise<void>;
  register: (credentials: RegisterRequest) => Promise<RegisterResponse>;
  tutorApply: (data: TutorApplyRequest) => Promise<RegisterResponse>;
  logout: () => void;
  clearError: () => void;
  getMyInfo: () => Promise<void>;
  banUser: (id: string) => Promise<void>;
}

const getInitialState = (): Pick<AuthState, "data" | "loading" | "error"> => {
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
        // Set cookies for middleware
        setAuthCookies(accessToken, user);
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

  async adminLogin(credentials: AdminLoginRequest) {
    set({ loading: true, error: null });
    try {
      const res = await AuthApi.adminLogin(credentials);
      const user = res.data?.data?.user;
      const accessToken = res.data?.data?.access_token;

      if (typeof window !== "undefined" && accessToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, role: "admin" })
        );
        // Set cookies for middleware
        setAuthCookies(accessToken, { ...user, role: "admin" });
      }

      set({
        data: { user: { ...user, role: "admin" }, accessToken },
        loading: false,
      });
    } catch {
      set({
        loading: false,
        error: "Đăng nhập admin thất bại",
      });
      throw new Error("Đăng nhập admin thất bại");
    }
  },

  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      // Clear cookies for middleware
      clearAuthCookies();
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

  async tutorApply(data: TutorApplyRequest) {
    set({ loading: true, error: null });
    try {
      const res = await AuthApi.tutorApply(data);
      set({ loading: false });
      return res;
    } catch (error) {
      set({ loading: false, error: "Gửi đơn ứng tuyển thất bại" });
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
        bio: userData.tutorProfile?.bio || "",
        dateOfBirth: userData.birthDate,
        birthDate: userData.birthDate,
        sex: userData.sex,
        phoneNumber: userData.phoneNumber ?? undefined,
        phone: userData.phoneNumber ?? undefined,
        tutorProfile: userData.tutorProfile
          ? {
              userId: userData.tutorProfile.userId,
              bio: userData.tutorProfile.bio,
              introVideoUrl: userData.tutorProfile.introVideoUrl ?? undefined,
              rating: userData.tutorProfile.rating,
              grade: userData.tutorProfile.grade,
              ratingCount: userData.tutorProfile.ratingCount,
              meetingTool: userData.tutorProfile.meetingTool,
              subject: userData.tutorProfile.subject,
            }
          : undefined,
        studentProfile: userData.studentProfile ?? undefined,
        balance: userData.balance ?? undefined,
      };
      // Update localStorage and cookies with new user info
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(user));
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          setAuthCookies(accessToken, user);
        }
      }

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

  async banUser(id: string) {
    set({ loading: true, error: null });
    try {
      const res = await AuthApi.banUser(id);
      set({ loading: false });
      return res;
    } catch (error) {
      set({ loading: false, error: "Khóa người dùng thất bại" });
      throw error;
    }
  },
}));
