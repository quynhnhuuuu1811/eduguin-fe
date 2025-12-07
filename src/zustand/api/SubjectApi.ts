import { SubjectsResponse, SubjectResponse } from '../types/Subject';
import instance from '@/lib/httpService';

export const SubjectApi = {
  getAllSubjects(): Promise<SubjectsResponse> {
    return instance.get('/subjects');
  },
};

