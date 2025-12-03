import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../types/Auth";
import instance from "@/lib/httpService";

export const AuthApi = {
  login(credentials: LoginRequest): Promise<LoginResponse> {
    return instance.post(`/auth/login`, credentials);
  },
  register(credentials: RegisterRequest): Promise<RegisterResponse> {
    return instance.post(`/auth/register`, credentials);
  },
};


