import {
  CreateClassRequest,
  UpdateClassRequest,
  ClassResponse,
  ClassesResponse,
  JoinClassRequest,
  JoinClassResponse,
  SetScheduleRequest,
  ClassSubscriptionRequest,
  ClassSubscriptionResponse,
} from '../types/Classes';
import instance from '@/lib/httpService';

export const ClassesApi = {
  getTutorClasses(): Promise<ClassesResponse> {
    return instance.get('/class-schedule/tutor');
  },

  createClass(request: CreateClassRequest): Promise<ClassResponse> {
    return instance.post('/classes', request);
  },

  setSchedule(request: SetScheduleRequest): Promise<ClassResponse> {
    return instance.post('/class-schedule', request);
  },

  deleteClass(classId: string): Promise<void> {
    return instance.delete(`/classes/${classId}`);
  },

  subscribeToClass(request: ClassSubscriptionRequest): Promise<ClassSubscriptionResponse> {
    return instance.post('/class-subscription', request);
  },
  getClassesByTutorId(tutorId: string): Promise<ClassesResponse> {
    return instance.get(`/class-schedule/tutor/${tutorId}`);
  },
};
