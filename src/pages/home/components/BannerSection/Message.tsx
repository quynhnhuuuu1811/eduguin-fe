import React, { FC, PropsWithChildren, ReactNode } from "react";

interface Props extends PropsWithChildren {
  icon?: ReactNode;
}

const Message: FC<Props> = ({ children, icon }) => {
  return (
    <div
      style={{
        padding: "4px",
        borderRadius: "20px",
        background: "linear-gradient(180deg,#CFE7FC, #61AEF4)",
      }}>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
        className="lg:px-5 lg:py-4 md:px-4 md:py-3 sm:px-3 sm:py-2 px-2 py-1 text-[8px]  xs:py-1 lg:text-[16px] md:text-[12px] sm:text-[10px] text-black">
        {icon && (
          <span className="absolute top-2 right-2 cursor-pointer">{icon}</span>
        )}
        {children}
      </div>
    </div>
  );
};

export default Message;
