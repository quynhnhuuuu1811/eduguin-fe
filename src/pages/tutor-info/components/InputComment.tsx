import { useCommentStore } from "@/zustand/stores/CommentStore";
import { useEffect, useState } from "react";

export default function InputComment({
  idTutor,
  user,
}: {
  user: { avatar: string; name: string };
  idTutor: string;
}) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const {
    newComment,
    loading: commentLoading,
    error: commentError,
    createComment,
    getListCmtByTutorID,
  } = useCommentStore();

  const totalStars = 5;

  useEffect(() => {
    if (newComment) {
      getListCmtByTutorID(idTutor);
      setRating(0);
      setContent("");
      setLocalError(null);
    }
  }, [newComment, getListCmtByTutorID, idTutor]);

  const handleSubmit = async () => {
    if (!rating) {
      setLocalError("Vui lòng chọn số sao đánh giá.");
      return;
    }

    if (!content.trim()) {
      setLocalError("Vui lòng nhập nội dung đánh giá.");
      return;
    }

    setLocalError(null);

    try {
      await createComment(idTutor, content.trim(), rating);
    } catch {}
  };

  return (
    <div className="flex flex-col gap-3 mt-4 w-full text-black font-quicksand">
      <div className="flex items-center gap-3">
        <img
          src={user?.avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <h5>{user?.name || "Học sinh"}</h5>
      </div>

      <div className="flex gap-2 items-center">
        {[...Array(totalStars)].map((_, i) => (
          <img
            key={i}
            onClick={() => !commentLoading && setRating(i + 1)}
            src={
              i < rating
                ? "https://res.cloudinary.com/dh2uwapb8/image/upload/v1764429705/fe/f98luprt0vcejudw04bi.png"
                : "https://res.cloudinary.com/dh2uwapb8/image/upload/v1764429706/fe/cyf3fjuffni9496qkjwq.png"
            }
            alt="star"
            className="w-6 h-6 cursor-pointer"
          />
        ))}
      </div>

      <textarea
        className="w-full border border-gray-300 rounded-xl p-4 outline-none disabled:bg-gray-100"
        rows={3}
        placeholder="Nhập đánh giá của bạn..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={commentLoading}></textarea>

      {(localError || commentError) && (
        <p className="text-sm text-red-500">{localError || commentError}</p>
      )}

      <div className="flex justify-end">
        <button
          className="bg-[#025A2F] cursor-pointer text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-green-800 duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={commentLoading}>
          {commentLoading ? "Đang gửi..." : "Gửi đánh giá"}
          <img
            src="https://res.cloudinary.com/dh2uwapb8/image/upload/v1764430229/fe/uwhg9axscm9mlid8fdkr.png"
            className="w-4 h-4"
          />
        </button>
      </div>
    </div>
  );
}
