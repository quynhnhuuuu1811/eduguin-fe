export interface BlogRequest {
  title: string;
  content: string;
  cover?: File;
}

export interface BlogAuthor {
  id: string;
  fullName?: string;
  name?: string; // Alternative field name from API
  avatarUrl?: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  coverImageUrl?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
  author?: BlogAuthor;
}

export interface BlogListResponse {
  data: Blog[] | {
    data?: Blog[];
    blogs?: Blog[];
    total?: number;
    page?: number;
    limit?: number;
  };
}

export interface BlogDetailResponse {
  data: Blog | {
    data?: Blog;
  };
}

export interface CreateBlogResponse {
  data: Blog | {
    data?: Blog;
  };
}
