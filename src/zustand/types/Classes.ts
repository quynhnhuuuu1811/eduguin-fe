export interface Class {
  id: string;
  name: string;
  description?: string;
  studentId?: string;
  studentName?: string;
  subject?: string;
  startDate?: string;
  endDate?: string;
  status?: 'pending' | 'completed' | 'OPEN' | 'CLOSED' | 'DRAFT';
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

export interface CreateClassRequest {
  name: string;
  description?: string;
  subject?: string;
  startTime?: string;
  endTime?: string;
  capacity?: number;
  linkMeeting?: string;
  price?: number;
}

export interface SetScheduleRequest {
  classId: string;
  days:number,
  startTime:string,
  endTime:string,
}

export interface UpdateClassRequest {
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  onlineLink?: string;
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

export interface ClassSubscriptionRequest {
  classId: string;
}

export interface ClassSubscriptionResponse {
  data: {
    data: {
      message: string;
      className?: string;
      studentName?: string;
      requestedAt?: string;
      status?: string;
    };
  };
}

export interface ListStudentSubscriptionsResponse {
  data: {
    data: ClassSubscriptionResponse[];
  };
}
