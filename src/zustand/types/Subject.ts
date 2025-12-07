export interface Subject {
  id: string;
  name: string;
}

export interface SubjectsResponse {
  data: {
    data: Subject[];
  };
}

export interface SubjectResponse {
  data: {
    data: Subject;
  };
}

