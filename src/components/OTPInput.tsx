"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { Box, TextField } from "@mui/material";

type OtpInputProps = {
  length?: number;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  error?: boolean;
  helperText?: string;
};

export default function OtpInput({
  length = 6,
  value,
  onChange,
  disabled = false,
  autoFocus = true,
  error = false,
  helperText,
}: OtpInputProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const digits = useMemo(() => {
    const onlyDigits = (value ?? "").replace(/\D/g, "").slice(0, length);
    return Array.from({ length }, (_, i) => onlyDigits[i] ?? "");
  }, [value, length]);

  useEffect(() => {
    if (!autoFocus || disabled) return;
    // focus ô đầu tiên còn trống, nếu đầy thì focus ô cuối
    const firstEmpty = digits.findIndex((d) => d === "");
    const idx = firstEmpty === -1 ? length - 1 : firstEmpty;
    inputsRef.current[idx]?.focus();
  }, [autoFocus, disabled, digits, length]);

  const setDigitAt = (index: number, digit: string) => {
    const cur = digits.slice();
    cur[index] = digit;
    onChange(cur.join(""));
  };

  const handleChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;

      const raw = e.target.value;
      const only = raw.replace(/\D/g, "");

      // Nếu user paste/nhập nhiều số 1 lúc trong 1 ô
      if (only.length > 1) {
        const merged = (digits.join("") + only).replace(/\D/g, "");
        const next = merged.slice(0, length).split("");
        const filled = Array.from({ length }, (_, i) => next[i] ?? "");
        onChange(filled.join(""));

        const nextIndex = Math.min(next.length, length - 1);
        inputsRef.current[nextIndex]?.focus();
        return;
      }

      const digit = only.slice(-1);
      setDigitAt(index, digit);

      if (digit && index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    };

  const handleKeyDown =
    (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      if (e.key === "Backspace") {
        if (digits[index]) {
          // xoá digit hiện tại
          setDigitAt(index, "");
          return;
        }
        // nếu ô hiện tại rỗng -> lùi về ô trước
        if (index > 0) {
          inputsRef.current[index - 1]?.focus();
          setDigitAt(index - 1, "");
        }
      }

      if (e.key === "ArrowLeft" && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
      if (e.key === "ArrowRight" && index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    e.preventDefault();

    const text = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!text) return;

    const next = text.slice(0, length).split("");
    const filled = Array.from({ length }, (_, i) => next[i] ?? "");
    onChange(filled.join(""));

    const nextIndex = Math.min(next.length, length - 1);
    inputsRef.current[nextIndex]?.focus();
  };

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
        {Array.from({ length }).map((_, i) => (
          <TextField
            key={i}
            inputRef={(el) => {
              inputsRef.current[i] = el;
            }}
            value={digits[i]}
            onChange={handleChange(i)}
            onKeyDown={handleKeyDown(i)}
            onPaste={handlePaste}
            disabled={disabled}
            error={error}
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              maxLength: 1,
              style: {
                textAlign: "center",
                fontSize: "18px",
                padding: "10px 0",
                width: "48px",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: 2 },
              width: "56px",
            }}
          />
        ))}
      </Box>

      {helperText ? (
        <Box
          sx={{
            mt: 1,
            textAlign: "center",
            fontSize: 12,
            color: error ? "error.main" : "text.secondary",
          }}
        >
          {helperText}
        </Box>
      ) : null}
    </Box>
  );
}
