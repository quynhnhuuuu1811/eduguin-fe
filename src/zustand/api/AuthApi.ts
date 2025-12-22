import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ProfileResponse,
  TutorApplyRequest,
  AdminLoginRequest,
} from "../types/Auth";
import instance from "@/lib/httpService";

export const AuthApi = {
  login(credentials: LoginRequest): Promise<LoginResponse> {
    return instance.post(`/auth/login`, credentials);
  },
  adminLogin(credentials: AdminLoginRequest): Promise<LoginResponse> {
    return instance.post(`/auth/admin/login`, credentials);
  },
  register(credentials: RegisterRequest): Promise<RegisterResponse> {
    return instance.post(`/auth/register`, credentials);
  },
  tutorApply(data: TutorApplyRequest): Promise<RegisterResponse> {
    return instance.post(`/user/tutor-apply`, data);
  },
  getMyInfo(): Promise<{ data: ProfileResponse }> {
    return instance.get(`/auth/profile`);
  },
  banUser(id: string): Promise<void> {
    return instance.patch(`/user/${id}/ban`);
  },
  verifyOtp(payload: { email: string; otp: string }): Promise<any> {
    return instance.post(`/auth/verify-otp`, payload);
  },
};
