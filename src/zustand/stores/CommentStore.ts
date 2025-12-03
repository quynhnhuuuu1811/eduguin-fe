import { create } from "zustand";
import { User } from "../types/User";
import { UserApi } from "../api/UserApi";
import { Tutor } from "@/types/tutor.type";
import { CommentApi } from "../api/CommentApi";

interface FetchTutorParams {
  subject?: string;
  grade?: number;
  sex?: string;
  minRating?: number;
  sortPrice?: "ASC" | "DESC";
  page: number;
  limit: number;
}

interface CommentState {
  comments: any[];
  newComment: any | null;
  loading: boolean;
  error: string | null;

  getListCmtByTutorID: (id: string) => Promise<void>;
  createComment: (
    tutorId: string,
    content: string,
    rating: number
  ) => Promise<void>;
}

export const useCommentStore = create<CommentState>((set, get) => ({
  comments: [],
  loading: false,
  error: null,
  newComment: null,
  async getListCmtByTutorID(id: string) {
    set({ loading: true, error: null });
    try {
      const data: any = await CommentApi.getCommentsByTutorID(id);
      set({
        comments: data.data.data,
        loading: false,
      });
    } catch (error: any) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Failed to load comments",
      });
    }
  },
  async createComment(tutorId: string, content: string, rating: number) {
    set({ loading: true, error: null });
    try {
      const data: any = await CommentApi.createComment(
        tutorId,
        content,
        rating
      );
      set({
        newComment: data.data.data,
        loading: false,
      });
    } catch (error: any) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Failed to create comment",
      });
    }
  },
}));
