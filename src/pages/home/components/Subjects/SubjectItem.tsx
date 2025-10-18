import React, { FC, PropsWithChildren } from "react";
interface Props extends PropsWithChildren {
  bgColor: string;
  labelColor: string;
}
const SubjectItem: FC<Props> = ({ bgColor, labelColor, children }) => {
  return (
    <div>
      <div
        className="rounded-tr-15 rounded-b-15"
        style={{
          backgroundColor: bgColor,
          position: "relative",
        }}
      >
        <div className="rounded-tr-full rounded-b-full"></div>
        {children}
      </div>
    </div>
  );
};

export default SubjectItem;
