"use client";
import { Box } from "@mui/material";
import React from "react";
import { useTranslation } from "@/i18n";

const IntroductSection = () => {
  const { t } = useTranslation();

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
        {t.home.introduction.title === 'About Eduguin'
          ? 'The right tutor – Learning made easy.'
          : 'Gia sư phù hợp – Học gì cũng dễ.'}
      </div>
      <div
        style={{
          textAlign: "center",
        }}
        className="text-[11px] sm:text-[11px] md:text-[12px] lg:text-[14px] text-black">
        {t.home.introduction.title === 'About Eduguin'
          ? 'We help you connect with the right tutor – so that every lesson is no longer a pressure, but becomes a light, effective, and inspiring experience. From listening to your learning needs, assessing your current abilities, to suggesting ideal tutors, we accompany you on every step of progress.'
          : 'Chúng tôi giúp bạn kết nối với người thầy phù hợp – để mỗi buổi học không còn là áp lực, mà trở thành trải nghiệm nhẹ nhàng, hiệu quả và đầy cảm hứng. Từ việc lắng nghe nhu cầu học tập, đánh giá năng lực hiện tại đến gợi ý gia sư lý tưởng, chúng tôi đồng hành cùng bạn trên từng bước tiến bộ.'}
      </div>
    </div>
  );
};

export default IntroductSection;
