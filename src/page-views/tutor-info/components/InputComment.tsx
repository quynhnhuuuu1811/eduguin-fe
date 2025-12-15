import IntialAvatar from "@/components/IntialAvatar";
import { useCommentStore } from "@/zustand/stores/CommentStore";
import { useEffect, useState } from "react";
import { useTranslation } from "@/i18n";
import { AuthUser } from "@/zustand/types/Auth";
export default function InputComment({
  idTutor,
  userInfo,
}: {
  userInfo: AuthUser;
  idTutor: string;
}) {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  console.log(33, userInfo)

  const {
    newComment,
    loading: commentLoading,
    error: commentError,
    createComment,
    getListCmtByTutorID,
  } = useCommentStore();

  const totalStars = 5;

  useEffect(() => {
    if (newComment && idTutor) {
      getListCmtByTutorID(idTutor);
      setRating(0);
      setContent("");
      setLocalError(null);
    }
  }, [newComment, getListCmtByTutorID, idTutor]);

  const handleSubmit = async () => {
    if (!idTutor) {
      setLocalError(t.tutorInfo.tutorNotFound);
      return;
    }

    if (!rating) {
      setLocalError(t.tutorInfo.selectRating);
      return;
    }

    if (!content.trim()) {
      setLocalError(t.tutorInfo.enterReview);
      return;
    }

    setLocalError(null);

    try {
      await createComment(idTutor, content.trim(), rating);
    } catch { }
  };

  // Don't render if no tutor ID
  if (!idTutor) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 mt-4 w-full text-black font-quicksand">
      <div className="flex items-center gap-3">
        {userInfo?.avatar ? (
          <img
            src={userInfo?.avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <IntialAvatar name={userInfo?.name || ""} width={40} />
        )}
        <h5>{userInfo?.fullName || t.tutorInfo.student}</h5>
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
        placeholder={t.tutorInfo.reviewPlaceholder}
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
          {commentLoading ? t.tutorInfo.sending : t.tutorInfo.sendReview}
          <img
            src="https://res.cloudinary.com/dh2uwapb8/image/upload/v1764430229/fe/uwhg9axscm9mlid8fdkr.png"
            className="w-4 h-4"
          />
        </button>
      </div>
    </div>
  );
}
