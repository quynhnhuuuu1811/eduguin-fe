import Image from "next/image";
import Users from "../../../../assets/images/users.png";

const OverallRating = () => {
  return (
    <div className="relative">
      <div
        className="absolute top-0 left-0 
        w-[200px] h-[92px] sm:w-[250px] sm:h-[142px] 
        md:w-[300px] md:h-[190px] lg:w-[380px] lg:h-[272px]
        bg-[#028E4B] rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl
        rotate-[-5deg]"
      ></div>
      <div
        className="relative overflow-hidden 
        w-[200px] h-[92px] sm:w-[250px] sm:h-[142px] 
        md:w-[300px] md:h-[190px] lg:w-[400px] lg:h-[292px]
        rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl
        rotate-[3deg]"
      >
        <Image alt="user" src={Users.src} fill style={{ objectFit: "cover" }} />
      </div>
    </div>
  );
};

export default OverallRating;
