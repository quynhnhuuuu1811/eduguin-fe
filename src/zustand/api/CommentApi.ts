import instance from "@/lib/httpService";

export const CommentApi = {
  getCommentsByTutorID(id: string): Promise<any[]> {
    return instance.get(`/reviews-favorites/comments/${id}`);
  },

  createComment(
    tutorId: string,
    content: string,
    rating: number
  ): Promise<any> {
    return instance.post(`/reviews-favorites`, {
      tutorId,
      content,
      rating,
    });
  },
};
