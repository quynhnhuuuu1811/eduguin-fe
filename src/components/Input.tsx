"use client";
import {
  TextField,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import type { SxProps, Theme } from "@mui/material/styles";
import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
interface CustomInputProps {
  label: string;
  type?: "email" | "password" | "date" | "text" | "select";
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  name: string;
  select?: boolean;
  options?: { value: string; label: string }[];
  error?: string;
  sx?: SxProps<Theme>;
}

const CustomInput = ({
  label,
  type = "text",
  value,
  onChange,
  name,
  select = false,
  options = [],
  error,
  sx,
}: CustomInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const commonSx = {
    width: "100%",
    backgroundColor: "transparent",
    "& .MuiFilledInput-root": {
      backgroundColor: "transparent",
      border: "1px solid lightgray",
      borderRadius: "4px",
      fontFamily: "quicksand",
      "&:hover": { border: "1px solid #0C8CE9" },
      "&.Mui-focused": { border: "1px solid #0C8CE9" },
      "& .MuiFilledInput-input": {
        display: "flex",
        alignItems: "center",
        fontFamily: "quicksand",
        fontWeight: 600,
        color: "#23262A",
        lineHeight: "normal",
        paddingInline: "11px",
        paddingTop: { xs: "14px", sm: "16px", md: "18px", lg: "20px" },
        paddingBottom: { xs: "4px", sm: "6px", md: "8px", lg: "10px" },
        fontSize: { xs: 8, sm: 10, md: 12, lg: 14 },
      },
    },
    "& .MuiInputLabel-root": {
      fontWeight: 600,
      color: "#B2BAC6",
      fontFamily: "quicksand",
      fontSize: { xs: 8, sm: 10, md: 12, lg: 14 },
      lineHeight: "normal",
      top: "4px",
      "&.MuiInputLabel-shrink": {
        fontSize: { xs: 7, sm: 9, md: 11, lg: 13 },
        transform: "translate(11px, -6px) scale(0.85)",
        top: "12px",
      },
    },
    ...sx,
  };

  if (type === "password") {
    return (
      <TextField
        label={label}
        variant="filled"
        size="small"
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) =>
          onChange(e as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)
        }
        name={name}
        slotProps={{
          input: {
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  edge="end"
                  sx={{
                    padding: { xs: "4px", sm: "6px", md: "8px", lg: "10px" },
                  }}>
                  {showPassword ? (
                    <VisibilityOff
                      sx={{
                        fontSize: {
                          xs: "16px",
                          sm: "18px",
                          md: "20px",
                          lg: "22px",
                        },
                        color: "#B2BAC6",
                      }}
                    />
                  ) : (
                    <Visibility
                      sx={{
                        fontSize: {
                          xs: "16px",
                          sm: "18px",
                          md: "20px",
                          lg: "22px",
                        },
                        color: "#B2BAC6",
                      }}
                    />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={commonSx}
      />
    );
  }

  if (select || type === "select") {
    return (
      <TextField
        variant="filled"
        size="small"
        select
        SelectProps={{ native: true }}
        value={value}
        onChange={(e) =>
          onChange(e as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)
        }
        name={name}
        slotProps={{
          input: {
            disableUnderline: true,
          },
        }}
        sx={{
          ...commonSx,
          "& .MuiFilledInput-root .MuiFilledInput-input": {
            fontWeight: 600,
            color: value ? "#23262A" : "#B2BAC6",
            display: "flex",
            alignItems: "center",
            paddingBottom: { xs: "8px", sm: "10px", md: "12px", lg: "14px" },
            paddingTop: { xs: "8px", sm: "10px", md: "12px", lg: "14px" },
          },
          "& .MuiSelect-select": {
            fontWeight: 600,
            color: value ? "#23262A" : "#B2BAC6",
            display: "flex",
            alignItems: "center",
            paddingTop: { xs: "14px", sm: "16px", md: "18px", lg: "20px" },
            paddingBottom: { xs: "4px", sm: "6px", md: "8px", lg: "10px" },
          },
        }}>
        <option value="" disabled style={{ color: "#B2BAC6", fontWeight: 400 }}>
          {label}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
    );
  }

  if (type === "date") {
    const dateValue = value ? dayjs(value) : null;

    return (
      <DatePicker
        label={label}
        value={dateValue}
        onChange={(newValue: Dayjs | null) => {
          const formattedValue = newValue ? newValue.format("YYYY-MM-DD") : "";
          const syntheticEvent = {
            target: {
              name,
              value: formattedValue,
            },
          } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
          onChange(syntheticEvent);
        }}
        slotProps={{
          textField: {
            variant: "filled",
            size: "small",
            name,
            slotProps: {
              input: {
                disableUnderline: true,
              },
            },
            sx: {
              ...commonSx,
              "& .MuiPickersInputBase-root": {
                backgroundColor: "transparent !important",
                border: "1px solid lightgray",
                size: "small",
                borderRadius: "4px",
                fontFamily: "quicksand",
                "&:hover": {
                  border: "1px solid #0C8CE9",
                  backgroundColor: "transparent !important",
                },
                "&.Mui-focused": {
                  border: "1px solid #0C8CE9",
                  backgroundColor: "transparent !important",
                },
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
              "& .MuiPickersFilledInput-root": {
                backgroundColor: "transparent !important",
                border: "1px solid lightgray",
                borderRadius: "4px",
                fontFamily: "quicksand",
                "&:hover": {
                  border: "1px solid #0C8CE9",
                  backgroundColor: "transparent !important",
                },
                "&.Mui-focused": {
                  border: "1px solid #0C8CE9",
                  backgroundColor: "transparent !important",
                },
              },
              "& .MuiIconButton-root": {
                padding: { xs: "4px", sm: "6px", md: "8px", lg: "10px" },
                "& .MuiSvgIcon-root": {
                  fontSize: { xs: "14px", sm: "16px", md: "18px", lg: "20px" },
                },
              },
              "& .MuiPickersInputAdornment-root": {
                "& .MuiIconButton-root": {
                  padding: { xs: "4px", sm: "6px", md: "8px", lg: "10px" },
                  "& .MuiSvgIcon-root": {
                    fontSize: {
                      xs: "14px",
                      sm: "16px",
                      md: "18px",
                      lg: "20px",
                    },
                    color: "#B2BAC6",
                  },
                },
              },
            },
          },
        }}
      />
    );
  }

  // Default text/email input
  return (
    <TextField
      label={label}
      variant="filled"
      size="small"
      type={type}
      value={value}
      onChange={(e) =>
        onChange(e as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)
      }
      name={name}
      slotProps={{
        input: {
          disableUnderline: true,
        },
      }}
      sx={commonSx}>
      {error && <FormHelperText error>{error}</FormHelperText>}
    </TextField>
  );
};

export default CustomInput;
