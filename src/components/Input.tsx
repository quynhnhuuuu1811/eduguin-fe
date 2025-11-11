import { TextField } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ResponsiveStyleValue } from "@mui/system";
import React from "react";

interface CustomInputProps {
  label?: string;
  select?: boolean;
  options?: { value: string | number; label: string }[];
  width?: ResponsiveStyleValue<number | string>;
  sx?: SxProps<Theme>;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  select = false,
  options = [],
  width = "100%",
  sx,
}) => {
  return (
    <TextField
      label={label}
      variant="filled"
      size="small"
      select={select}
      SelectProps={{ native: true }}
      slotProps={{
        input: { disableUnderline: true },
        inputLabel: {
          sx: {
            fontWeight: 600,
            color: "#B2BAC6",
            fontFamily: "quicksand",
            fontSize: { xs: 8, sm: 10, md: 12, lg: 14 },
            "&.MuiInputLabel-shrink": {
              fontSize: { xs: 7, sm: 9, md: 11, lg: 13 },
              marginBottom: "2px",
              marginTop: "4px",
            },
          },
        },
      }}
      sx={{
        width,
        backgroundColor: "transparent",
        "& .MuiFilledInput-root": {
          backgroundColor: "transparent",
          border: "1px solid lightgray",
          borderRadius: "4px",
          fontFamily: "quicksand",
          "&:hover": { border: "1px solid #0C8CE9" },
          "&.Mui-focused": { border: "1px solid #0C8CE9" },

          // input text responsive
          "& .MuiFilledInput-input": {
            display: "flex",
            alignItems: "center",
            fontFamily: "quicksand",
            fontWeight: 600,
            color: "#23262A",
            lineHeight: 1.2,
            paddingInline: "11px",
            paddingTop: {
              xs: "14px",
              sm: "16px",
              md: "18px",
              lg: "20px",
            },
            paddingBottom: {
              xs: "4px",
              sm: "6px",
              md: "8px",
              lg: "10px",
            },
            fontSize: { xs: 8, sm: 10, md: 12, lg: 14 },
          },
        },
        ...sx,
      }}
    >
      {select &&
        options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
    </TextField>
  );
};

export default CustomInput;
