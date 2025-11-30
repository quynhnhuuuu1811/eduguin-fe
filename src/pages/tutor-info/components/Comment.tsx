import Img from "../../../assets/images/teacher.png";

export const Comment = ({ rating = 3 }) => {
  const totalStars = 5;

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex items-center gap-3 ">
        <img src={Img.src} alt="Teacher" className="w-10 h-10 rounded-full" />
        <div>
          <h5>Học sinh 1</h5>
          <p className="text-xs mt-1">28/08/2025</p>
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
        <p>Thường xuyên đến trễ giờ và bỏ buổi 😠 </p>
      </div>
    </div>
  );
};
