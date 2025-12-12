"use client";
import React from "react";
import ButtonGroup from "./ButtonGroup";
import { useTranslation } from "@/i18n";

const TextBanner = () => {
  const { t } = useTranslation();
  const isEnglish = t.common.loading === 'Loading...';

  return (
    <div
      className="
        flex flex-col 
        text-primary200 font-[900] text-[18px]
        lg:text-[37px] md:!text-[27px] sm:text-[23px]
        w-full whitespace-normal break-words sm:gap-[20px] md:gap-[40px] lg:gap-[40px]
        sm:items-center text-center sm:text-left md:text-left lg:text-left
      "
    >
      <div className="w-full">
        {isEnglish ? 'Find your' : 'Tìm người'}{" "}
        <span
          className="!font-sugar font-bold !text-[27px]
          lg:!text-[60px] md:!text-[40px] sm:!text-[35px] 
          px-2 text-blue100"
        >
          {isEnglish ? 'learning partner' : 'bạn đồng hành'}
        </span>
        <br />
        {isEnglish ? 'on your learning journey' : 'trên con đường học tập'}
      </div>
      <div className="w-full flex-start">
        <ButtonGroup />
      </div>
    </div>
  );
};

export default TextBanner;
