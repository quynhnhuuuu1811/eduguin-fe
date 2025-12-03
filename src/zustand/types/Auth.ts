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
  name: string;
  email: string;
  role?: string;
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
}

export interface RegisterResponse {
  data: {
    data: {
      message: string;
    };
  };
}

