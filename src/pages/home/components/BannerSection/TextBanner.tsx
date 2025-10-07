import { CustomButton } from "@/components/Button";
import React from "react";
import ButtonGroup from "./ButtonGroup";

const TextBanner = () => {
  return (
    <div className="flex flex-col text-primary200 font-[900] !text-[37px] md:text-[20px] sm:text-[15px] w-full whitespace-normal break-words gap-[40px]">
      <div>
        Tìm người{" "}
        <span className="!font-sugar font-bold !text-[60px] px-2 text-blue100">
          bạn đồng hành
        </span>{" "}
        trên con đường học tập
      </div>
      <ButtonGroup />
    </div>
  );
};

export default TextBanner;
