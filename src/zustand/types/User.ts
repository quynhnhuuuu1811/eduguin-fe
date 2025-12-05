export interface User {
  id: string;
  name: string;
  email: string;
  
}



export interface StudentResponse {
  data: {
    data: UserResponse;
  };
}

export interface UserResponse {
  data: {
  id: string;
  name: string;
  email: string;
  displayName?: string;
  fullName?: string;
  dateOfBirth?: string;
  sex?: string;
  role?: string;
  avatar?: string;
  };
}