"use client";
import * as React from "react";
import Button from "@mui/material/Button";

interface Props extends React.PropsWithChildren {
  type: "Primary" | "Secondary" | "PrimaryOutlined" | "SecondaryOutlined";
}

export const CustomButton: React.FC<Props> = ({ children, type }) => {
  let sx: any = {};
  let className = "";

  switch (type) {
    case "Primary":
      sx = {
        backgroundColor: "var(--color-primary500)",
        color: "white",
        "&:hover": { backgroundColor: "var(--color-primary600)" },
      };
      className =
        "lg:!px-6 lg:!py-3 md:!px-5 md:!py-2 sm:!px-4 sm:!py-1.5 rounded-[8px]";
      break;

    case "PrimaryOutlined":
      sx = {
        color: "var(--color-primary500)",
        backgroundColor: "white",
        "&:hover": { backgroundColor: "var(--color-primary100)" },
      };
      className =
        "lg:!px-6 lg:!py-3 md:!px-5 md:!py-2 sm:!px-4 sm:!py-1.5 rounded-[8px]";
      break;

    case "Secondary":
      sx = {
        backgroundColor: "var(--color-secondary500)",
        color: "white",
        "&:hover": { backgroundColor: "var(--color-secondary600)" },
      };
      className =
        "lg:!px-6 lg:!py-3 md:!px-5 md:!py-2 sm:!px-4 sm:!py-1.5 rounded-[8px]";
      break;

    case "SecondaryOutlined":
      sx = {
        border: "2px solid var(--color-secondary500)",
        color: "var(--color-secondary500)",
        backgroundColor: "white",
        "&:hover": { backgroundColor: "var(--color-secondary100)" },
      };
      className =
        "lg:!px-6 lg:!py-3 md:!px-5 md:!py-2 sm:!px-4 sm:!py-1.5 rounded-[8px]";
      break;
  }

  return (
    <Button
      disableElevation
      className={className}
      sx={{
        ...sx,
        textTransform: "none",
        fontFamily: "Quicksand",
        fontWeight: 600,
        borderRadius: 2,
        transition: "all 0.2s ease-in-out",
        fontSize: {
          xs: "10px",
          sm: "12px",
          md: "14px",
          lg: "16px",
        },
      }}
    >
      {children}
    </Button>
  );
};
