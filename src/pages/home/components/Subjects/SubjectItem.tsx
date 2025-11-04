import React, { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  bgColor: string;
  labelColor: string;
  img: string;
}

const SubjectItem: FC<Props> = ({ bgColor, labelColor, img, children }) => {
  return (
    <div className="flex w-full flex-col items-center">
      <div
        className="relative rounded-tr-[20px] rounded-b-[20px]
        sm:rounded-tr-[30px] sm:rounded-b-[30px]
        md:rounded-tr-[40px] md:rounded-b-[40px]
        lg:rounded-tr-[50px] lg:rounded-b-[50px]
        w-[60px] h-[90px]
        sm:w-[100px] sm:h-[150px]
        md:w-[120px] md:h-[180px]
        lg:w-[150px] lg:h-[225px]
        flex items-center justify-center mb-4 overflow-hidden"
        style={{
          backgroundColor: bgColor,
        }}
      >
        <div
          className="absolute top-0 left-0 w-[30px] sm:w-[50px] md:w-[65px] lg:w-[80px] h-[30px] sm:h-[50px] md:h-[65px] lg:h-[80px] flex items-center justify-center overflow-hidden rounded-b-full rounded-tr-full"
          style={{
            backgroundColor: labelColor,
          }}
        >
          <img
            src={img}
            alt="Label Subject"
            className="!w-[20px] sm:!w-[33px] md:!w-[43px] lg:!w-[53px] "
          />
        </div>

        <span className="text-white font-sugar !text-center !text-[10px] sm:!text-[14px] md:!text-[18px] lg:!text-[22px] !font-semibold">
          {children}
        </span>
      </div>
    </div>
  );
};

export default SubjectItem;
