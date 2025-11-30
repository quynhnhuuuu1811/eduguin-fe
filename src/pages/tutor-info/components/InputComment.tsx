import { useState } from "react";

export const InputComment = ({
  user,
}: {
  user: { avatar: string; name: string };
}) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  const totalStars = 5;

  const handleSubmit = () => {
    console.log("Rating:", rating);
    console.log("Content:", content);
  };

  return (
    <div className="flex flex-col gap-3 mt-4 w-full text-black font-quicksand   ">
      <div className="flex items-center gap-3">
        <img
          src={user?.avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <h5>Học sinh 1</h5>
      </div>

      <div className="flex gap-2 items-center">
        {[...Array(totalStars)].map((_, i) => (
          <img
            key={i}
            onClick={() => setRating(i + 1)}
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
        className="w-full border border-gray-300 rounded-xl p-4 outline-none"
        rows={3}
        placeholder="Nhập đánh giá của bạn..."
        value={content}
        onChange={(e) => setContent(e.target.value)}></textarea>

      <div className="flex justify-end">
        <button
          className="bg-[#025A2F] cursor-pointer text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-green-800 duration-200"
          onClick={handleSubmit}>
          Gửi đánh giá
          <img
            src="https://res.cloudinary.com/dh2uwapb8/image/upload/v1764430229/fe/uwhg9axscm9mlid8fdkr.png"
            className="w-4 h-4"
          />
        </button>
      </div>
    </div>
  );
};
