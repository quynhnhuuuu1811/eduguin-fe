"use client";
import * as React from "react";
import Button from "@mui/material/Button";

interface Props extends React.PropsWithChildren {
  type: "Primary" | "Secondary" | "PrimaryOutlined" | "SecondaryOutlined";
  className?: string;
  onClick?: () => void;
}

export const CustomButton: React.FC<Props> = ({
  children,
  type,
  className = "",
  onClick,
}) => {
  let sx: any = {};

  switch (type) {
    case "Primary":
      sx = {
        backgroundColor: "var(--color-primary500)",
        color: "white",
        "&:hover": { backgroundColor: "var(--color-primary600)" },
        px: { xs: 2, sm: 3, md: 4, lg: 5 },
        py: { xs: 1, sm: 1, md: 1.5, lg: 1.5 },
        borderRadius: "8px",
        fontSize: { xs: "10px", sm: "12px", md: "14px", lg: "16px" },
      };
      break;

    case "PrimaryOutlined":
      sx = {
        color: "var(--color-primary500)",
        backgroundColor: "white",
        "&:hover": { backgroundColor: "#F0F0F0" },
        px: { xs: 2, sm: 3, md: 4, lg: 5 },
        py: { xs: 1, sm: 1, md: 1.5, lg: 1.5 },
        borderRadius: "8px",
        fontSize: { xs: "10px", sm: "12px", md: "14px", lg: "16px" },
      };
      break;

    case "Secondary":
      sx = {
        backgroundColor: "var(--color-primary700)",
        color: "white",
        "&:hover": { backgroundColor: "var(--color-primary500) !important" },
        px: { xs: 1, sm: 2, md: 3, lg: 3 },
        py: { xs: 0.5, sm: 1, md: 1, lg: 1 },
        borderRadius: "999px",
        fontSize: { xs: "6px", sm: "8px", md: "12px", lg: "14px" },
      };
      break;

    case "SecondaryOutlined":
      sx = {
        backgroundColor: "transparent",
        color: "var(--color-primary700)",
        border: "1px solid var(--color-primary700)",
        "&:hover": { color: "var(--color-primary500) !important" },
        px: { xs: 1, sm: 2, md: 3, lg: 3 },
        py: { xs: 0.5, sm: 1, md: 1, lg: 1 },
        borderRadius: "999px",
        fontSize: { xs: "6px", sm: "8px", md: "12px", lg: "14px" },
      };
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
        transition: "all 0.2s ease-in-out",
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
