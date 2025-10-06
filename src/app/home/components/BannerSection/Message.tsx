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
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
        className="px-5 py-4"
      >
        {icon && (
          <span className="absolute top-2 right-2 cursor-pointer">{icon}</span>
        )}
        {children}
      </div>
    </div>
  );
};

export default Message;
