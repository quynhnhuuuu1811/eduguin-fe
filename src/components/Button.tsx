"use client";
import * as React from "react";
import Button from "@mui/material/Button";

interface Props extends React.PropsWithChildren {
  type: "Primary" | "Secondary" | "PrimaryOutlined" | "SecondaryOutlined";
}

export const CustomButton: React.FC<Props> = ({ children, type }) => {
  let buttonProps = {};

  switch (type) {
    case "Primary":
      buttonProps = {
        sx: {
          color: "white",
          fontSize: "16px",
          borderRadius: 2,
        },
        className: "!bg-primary500 !px-6 !py-3",
      };
      break;

    case "PrimaryOutlined":
      buttonProps = {
        sx: {
          color: "#02743D",
          fontSize: "16px",
          borderRadius: 2,
        },
        className: "!bg-white !px-6 !py-3",
      };
      break;

    case "Secondary":
      buttonProps = {
        sx: {
          color: "white",
        },
        className: "!bg-primary500",
      };
      break;

    case "SecondaryOutlined":
      buttonProps = {
        sx: {
          color: "white",
        },
        className: "!bg-primary500",
      };
      break;

    default:
  }

  return (
    <Button
      {...buttonProps}
      sx={{
        ...buttonProps?.sx,
        textTransform: "none",
        fontFamily: "Quicksand",
        fontWeight: "600",
      }}
    >
      {children}
    </Button>
  );
};
