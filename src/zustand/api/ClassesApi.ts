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
  ListStudentSubscriptionsResponse,
} from '../types/Classes';
import instance from '@/lib/httpService';
import { StudentResponse } from '../types/User';

export const ClassesApi = {
  getTutorClasses(): Promise<ClassesResponse> {
    return instance.get('/class-schedule/tutor');
  },

  getStudentClasses(): Promise<ClassesResponse> {
    return instance.get('/class-subscriptions/student');
  },

  getListStudentSubscriptions(): Promise<ListStudentSubscriptionsResponse> {
    return instance.get('/class-subscriptions/tutor/pending');
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
    return instance.post('/class-subscriptions', request);
  },
  getClassesByTutorId(tutorId: string): Promise<ClassesResponse> {
    return instance.get(`/class-schedule/tutor/${tutorId}`);
  },

  approveClassSubscription(subscriptionId: string): Promise<ClassSubscriptionResponse> {
    return instance.patch(`/class-subscriptions/approve/${subscriptionId}`);
  },

  rejectClassSubscription(subscriptionId: string): Promise<ClassSubscriptionResponse> {
    return instance.patch(`/class-subscriptions/decline/${subscriptionId}`);
  },

  getListStudentofClass(classId: string): Promise<StudentResponse> {
    return instance.get(`/class-subscriptions/tutor/class/${classId}/students`);
  },

  getTutorApplyList(): Promise<any> {
    return instance.get('/user/tutor-applications');
  },

  approveTutorApplication(id: string): Promise<any> {
    return instance.patch(`/user/tutor-applications/${id}/approve`);
  },

  rejectTutorApplication(id: string): Promise<any> {
    return instance.patch(`/user/tutor-applications/${id}/reject`);
  },

};
