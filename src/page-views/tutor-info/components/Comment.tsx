import IntialAvatar from "@/components/IntialAvatar";

type CommentProps = {
  rating?: number;
  content?: string;
  name?: string;
  date?: string;
  avatar?: string;
};

export default function Comment({
  rating = 3,
  content,
  name,
  date,
  avatar,
}: CommentProps) {
  const totalStars = 5;

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex items-center gap-3 ">
        {avatar ? (
        <img
            src={avatar}
          alt="Teacher"
          className="w-10 h-10 rounded-full"
        />
        ) : (
          <IntialAvatar name={name || ""} width={40} />
        )}
        <div>
          <h5>{name}</h5>
          <p className="text-xs mt-1">{date}</p>
        </div>
      </div>

      <div className="flex gap-[6px]">
        {[...Array(totalStars)].map((_, index) => (
          <img
            key={index}
            src={
              index < rating
                ? "https://res.cloudinary.com/dh2uwapb8/image/upload/v1764429705/fe/f98luprt0vcejudw04bi.png" // sao đầy
                : "https://res.cloudinary.com/dh2uwapb8/image/upload/v1764429706/fe/cyf3fjuffni9496qkjwq.png" // sao rỗng
            }
            alt="star"
            className="w-5 h-5"
          />
        ))}
      </div>
      <div className="text-sm text-black">
        <p>{content}</p>
      </div>
    </div>
  );
}
