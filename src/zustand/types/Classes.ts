export interface Class {
  id: string;
  name: string;
  description?: string;
  tutorId: string;
  tutorName?: string;
  studentId?: string;
  studentName?: string;
  subject?: string;
  startDate?: string;
  endDate?: string;
  status?: 'pending' | 'completed';
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateClassRequest {
  name: string;
  description?: string;
  subject?: string;
  startDate?: string;
  endDate?: string;
  studentId?: string;
}

export interface UpdateClassRequest {
  name?: string;
  description?: string;
  subject?: string;
  startDate?: string;
  endDate?: string;
  status?: 'active' | 'completed' | 'cancelled' | 'pending';
}

export interface ClassResponse {
  data: {
    data: Class;
  };
}

export interface ClassesResponse {
  data: {
    data: Class[];
  };
}

export interface JoinClassRequest {
  classId: string;
  studentId?: string;
}

export interface JoinClassResponse {
  data: {
    data: {
      message: string;
      class: Class;
    };
  };
}

