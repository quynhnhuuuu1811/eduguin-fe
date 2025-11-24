import { Box } from "@mui/material";
import React from "react";

const IntroductSection = () => {
  return (
    <div className="px-[50px] lg:px-[135px] sm:px-[80px] md:[100px] w-full flex flex-col gap-2 md:gap-4 lg:gap-5">
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          fontFamily: "sugar",
          color: "#0F7FE5",
        }}
        className="text-[20px] sm:text-[25px] md:text-[30px] lg:text-[40px]">
        Gia sư phù hợp – Học gì cũng dễ.
      </div>
      <div
        style={{
          textAlign: "center",
        }}
        className="text-[11px] sm:text-[11px] md:text-[12px] lg:text-[14px] text-black">
        Chúng tôi giúp bạn kết nối với người thầy phù hợp – để mỗi buổi học
        không còn là áp lực, mà trở thành trải nghiệm nhẹ nhàng, hiệu quả và đầy
        cảm hứng. Từ việc lắng nghe nhu cầu học tập, đánh giá năng lực hiện tại
        đến gợi ý gia sư lý tưởng, chúng tôi đồng hành cùng bạn trên từng bước
        tiến bộ. Mỗi gia sư không chỉ là người dạy kiến thức, mà còn là người
        bạn đồng hành tận tâm – luôn sẵn sàng giải đáp, động viên và tiếp thêm
        động lực để bạn tự tin chinh phục mọi mục tiêu học tập.
      </div>
    </div>
  );
};

export default IntroductSection;
