export interface TutorProfile {
  description: string;
  price: number;
  introVideoUrl: string;
  rating: number;
  subject: string;
}

export type Sex = "male" | "female" | "other";
export type UserRole = "tutor" | "student" | "admin";

export interface Tutor {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  sex: Sex;
  birthDate: string;
  role: UserRole;
  tutorProfile: TutorProfile;
}
