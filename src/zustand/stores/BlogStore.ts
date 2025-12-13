import { Blog, BlogRequest } from "../types/Blog";
import { BlogApi } from "../api/BlogApi";
import { create } from "zustand";

interface BlogState {
  publicBlogs: Blog[];
  pendingBlogs: Blog[];
  myBlogs: Blog[];
  currentBlog: Blog | null;
  loading: boolean;
  error: string | null;
  totalPublic: number;
  totalPending: number;
  totalMyBlogs: number;

  // Actions
  createBlog: (request: BlogRequest) => Promise<Blog>;
  getPublicBlogs: (page?: number, limit?: number) => Promise<void>;
  getPendingBlogs: (page?: number, limit?: number) => Promise<void>;
  getMyBlogs: (page?: number, limit?: number) => Promise<void>;
  getBlogById: (id: string) => Promise<Blog>;
  approveBlog: (id: string) => Promise<void>;
  rejectBlog: (id: string) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
}

export const useBlogStore = create<BlogState>((set, get) => ({
  publicBlogs: [],
  pendingBlogs: [],
  myBlogs: [],
  currentBlog: null,
  loading: false,
  error: null,
  totalPublic: 0,
  totalPending: 0,
  totalMyBlogs: 0,

  createBlog: async (request: BlogRequest) => {
    set({ loading: true, error: null });
    try {
      const res = await BlogApi.createBlog(request);
      // Handle different response structures
      const responseData = res.data as any;
      const newBlog = responseData.data || responseData;
      // Add to myBlogs list
      const { myBlogs } = get();
      set({ myBlogs: [newBlog, ...myBlogs], loading: false });
      return newBlog;
    } catch (error: any) {
      console.error("Failed to create blog:", error);
      set({
        loading: false,
        error: error?.response?.data?.message || "Failed to create blog",
      });
      throw error;
    }
  },

  getPublicBlogs: async (page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const res = await BlogApi.getPublicBlogs(page, limit);
      // Handle different response structures
      const responseData = (res.data as any)?.data?.items;
      const blogs = Array.isArray(responseData) 
        ? responseData 
        : (responseData.data || responseData.blogs || []);
      const total = responseData.total || blogs.length;
      
      set({
        publicBlogs: blogs,
        totalPublic: total,
        loading: false,
      });
    } catch (error: any) {
      console.error("Failed to get public blogs:", error);
      set({
        loading: false,
        error: error?.response?.data?.message || "Failed to get public blogs",
      });
    }
  },

  getPendingBlogs: async (page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const res = await BlogApi.getPendingBlogs(page, limit);
      // Handle different response structures
      const responseData = res.data as any;
      const blogs = Array.isArray(responseData) 
        ? responseData 
        : (responseData.data || responseData.blogs || []);
      const total = responseData.total || blogs.length;
      
      set({
        pendingBlogs: blogs,
        totalPending: total,
        loading: false,
      });
    } catch (error: any) {
      console.error("Failed to get pending blogs:", error);
      set({
        loading: false,
        error: error?.response?.data?.message || "Failed to get pending blogs",
      });
    }
  },

  getMyBlogs: async (page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const res = await BlogApi.getMyBlogs(page, limit);
      // Handle different response structures
      const responseData = res.data as any;
      const blogs = Array.isArray(responseData) 
        ? responseData 
        : (responseData.data || responseData.blogs || []);
      const total = responseData.total || blogs.length;
      
      set({
        myBlogs: blogs,
        totalMyBlogs: total,
        loading: false,
      });
    } catch (error: any) {
      console.error("Failed to get my blogs:", error);
      set({
        loading: false,
        error: error?.response?.data?.message || "Failed to get my blogs",
      });
    }
  },

  getBlogById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const res = await BlogApi.getBlogById(id);
      // Handle different response structures
      const responseData = res.data as any;
      const blog = responseData.data || responseData;
      set({ currentBlog: blog, loading: false });
      return blog;
    } catch (error: any) {
      console.error("Failed to get blog:", error);
      set({
        loading: false,
        error: error?.response?.data?.message || "Failed to get blog",
      });
      throw error;
    }
  },

  approveBlog: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await BlogApi.approveBlog(id);
      // Move from pending to public
      const { pendingBlogs, publicBlogs } = get();
      const approvedBlog = pendingBlogs.find((b) => b.id === id);
      if (approvedBlog) {
        set({
          pendingBlogs: pendingBlogs.filter((b) => b.id !== id),
          publicBlogs: [{ ...approvedBlog, status: "APPROVED" }, ...publicBlogs],
          loading: false,
        });
      } else {
        set({ loading: false });
      }
    } catch (error: any) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Failed to approve blog",
      });
      throw error;
    }
  },

  rejectBlog: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await BlogApi.rejectBlog(id);
      // Remove from pending
      const { pendingBlogs } = get();
      set({
        pendingBlogs: pendingBlogs.filter((b) => b.id !== id),
        loading: false,
      });
    } catch (error: any) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Failed to reject blog",
      });
      throw error;
    }
  },

  deleteBlog: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await BlogApi.deleteBlog(id);
      // Remove from all lists
      const { publicBlogs, pendingBlogs, myBlogs } = get();
      set({
        publicBlogs: publicBlogs.filter((b) => b.id !== id),
        pendingBlogs: pendingBlogs.filter((b) => b.id !== id),
        myBlogs: myBlogs.filter((b) => b.id !== id),
        loading: false,
      });
    } catch (error: any) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Failed to delete blog",
      });
      throw error;
    }
  },
}));
