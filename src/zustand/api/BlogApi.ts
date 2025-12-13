import { BlogRequest, BlogListResponse, BlogDetailResponse, CreateBlogResponse } from "../types/Blog";
import instance from "@/lib/httpService";

export const BlogApi = {
  // Create a new blog (pending approval) - using FormData for file upload
  createBlog(request: BlogRequest): Promise<CreateBlogResponse> {
    const formData = new FormData();
    formData.append("title", request.title);
    formData.append("content", request.content);
    if (request.cover) {
      formData.append("cover", request.cover);
    }
    return instance.post("/blogs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Get all public/approved blogs
  getPublicBlogs(page: number = 1, limit: number = 10): Promise<BlogListResponse> {
    return instance.get(`/blogs/public`);
  },

  // Get pending blogs (for admin)
  getPendingBlogs(page: number = 1, limit: number = 10): Promise<BlogListResponse> {
    return instance.get(`/blogs/pending`);
  },

  // Get my blogs (for tutor - all statuses)
  getMyBlogs(page: number = 1, limit: number = 10): Promise<BlogListResponse> {
    return instance.get(`/blogs/mine?page=${page}&limit=${limit}`);
  },

  // Get blog detail by ID
  getBlogById(id: string): Promise<BlogDetailResponse> {
    return instance.get(`/blogs/${id}`);
  },

  // Approve blog (admin only)
  approveBlog(id: string): Promise<BlogDetailResponse> {
    return instance.patch(`/blogs/${id}/approve`);
  },

  // Reject blog (admin only)
  rejectBlog(id: string): Promise<BlogDetailResponse> {
    return instance.patch(`/blogs/${id}/reject`);
  },

  // Delete blog
  deleteBlog(id: string): Promise<void> {
    return instance.delete(`/blogs/${id}`);
  },
};
