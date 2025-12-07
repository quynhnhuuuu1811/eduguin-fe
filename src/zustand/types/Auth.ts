export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    data: {
    access_token: string;
      user: AuthUser;
    };
  };
}

export interface AuthUser {
  id: string;
  name?: string;
  fullName?: string;
  email: string;
  role?: string;
  avatar?: string;
  avatarUrl?: string;
  description?: string;
  dateOfBirth?: string;
  birthDate?: string;
  sex?: string;
  phoneNumber?: string;
  phone?: string;
  address?: string;
  tutorProfile?: {
    userId: string;
    bio?: string;
    monthlyPrice?: number;
    introVideoUrl?: string;
    rating?: string;
    grade?: number;
    ratingCount?: number;
    meetingTool?: Record<string, any>;
  };
  studentProfile?: any;
}

export interface RegisterRequest {
  email: string;
  fullName: string;
  dateOfBirth: string;
  displayName: string;
  sex: string;
  password: string;
  confirmPassword: string;
  role: string;
  // Tutor-specific fields
  subjectId?: string;
  grade?: number;
}

export interface RegisterResponse {
  data: {
    data: {
      message: string;
    };
  };
}

export interface ProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    email: string;
    passwordHash: string;
    fullName: string;
    phoneNumber: string | null;
    avatarUrl: string | null;
    role: string;
    sex: string;
    birthDate: string;
    balance: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    tutorProfile: {
      userId: string;
      bio: string;
      monthlyPrice: number;
      introVideoUrl: string | null;
      rating: string;
      grade: number;
      ratingCount: number;
      meetingTool: Record<string, any>;
    } | null;
    studentProfile: any;
  };
  timestamp: string;
  path: string;
}

