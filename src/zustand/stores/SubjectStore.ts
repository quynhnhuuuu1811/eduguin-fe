import { create } from "zustand";
import { Subject } from "../types/Subject";
import { SubjectApi } from "../api/SubjectApi";

interface SubjectState {
  // State
  subjects: Subject[];
  selectedSubject: Subject | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchAllSubjects: () => Promise<void>;
  clearError: () => void;
}

export const useSubjectStore = create<SubjectState>((set) => ({
  subjects: [],
  selectedSubject: null,
  loading: false,
  error: null,

  async fetchAllSubjects() {
    set({ loading: true, error: null });
    try {
      const res = await SubjectApi.getAllSubjects();
      set({
        subjects: res.data.data,
        loading: false,
      });
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined;
      set({
        loading: false,
        error: errorMessage || "Không thể tải danh sách môn học",
      });
    }
  },
  
  clearError() {
    set({ error: null });
  },
}));

