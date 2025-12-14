"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "@/i18n";
import { usePaymentStore } from "@/zustand/stores/PaymentStore";

interface DepositModalProps {
  open: boolean;
  onClose: () => void;
}

const MIN_AMOUNT = 20000;

const SUGGESTED_AMOUNTS = [
  { label: "100K", value: 100000 },
  { label: "200K", value: 200000 },
  { label: "500K", value: 500000 },
  { label: "1TR", value: 1000000 },
];

const DepositModal: React.FC<DepositModalProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const isEnglish = t.common.loading === "Loading...";
  const { createPayment } = usePaymentStore();

  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN").format(value);
  };

  // Check if amount is valid (>= 20,000)
  const amountValue = amount ? parseInt(amount) : 0;
  const isAmountTooLow = amountValue > 0 && amountValue < MIN_AMOUNT;
  const isValidAmount = amountValue >= MIN_AMOUNT;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setAmount(value);
  };

  const handleSuggestedAmount = (value: number) => {
    setAmount(value.toString());
  };

  const handleDeposit = async () => {
    if (!isValidAmount) return;

    setIsLoading(true);
    try {
      const res = await createPayment(amountValue);
      // createPayment returns res.data from API, so access order_url directly
      window.open(res?.order_url, "_blank");
    } catch (error) {
      console.error("Deposit error:", error);
    } finally {
      setIsLoading(false);
    }
    onClose();
  };

  const handleClose = () => {
    setAmount("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      sx={{
        zIndex: 10000,
      }}
      PaperProps={{
        sx: {
          borderRadius: "16px",
          fontFamily: "Quicksand",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "Quicksand",
          fontWeight: "bold",
          color: "#0C65B6",
          fontSize: "20px",
          marginBottom: "20px",
        }}
      >
        {isEnglish ? "Deposit" : "Nạp tiền"}
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {/* Amount Input */}
        <TextField
          fullWidth
          label={isEnglish ? "Enter amount" : "Nhập số tiền"}
          value={amount ? formatCurrency(parseInt(amount)) : ""}
          onChange={handleAmountChange}
          placeholder="0"
          error={isAmountTooLow}
          helperText={
            isAmountTooLow
              ? isEnglish
                ? `Minimum amount is ${formatCurrency(MIN_AMOUNT)} VND`
                : `Số tiền tối thiểu là ${formatCurrency(MIN_AMOUNT)} VND`
              : ""
          }
          InputProps={{
            endAdornment: <InputAdornment position="end">VND</InputAdornment>,
            sx: { fontFamily: "Quicksand" },
          }}
          InputLabelProps={{
            sx: { fontFamily: "Quicksand" },
          }}
          FormHelperTextProps={{
            sx: { fontFamily: "Quicksand", fontSize: "13px" },
          }}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
        />

        {/* Suggested Amounts */}
        <p
          className="text-gray-600 mb-3 font-quicksand text-sm"
          style={{ fontFamily: "Quicksand" }}
        >
          {isEnglish ? "Quick select:" : "Chọn nhanh:"}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {SUGGESTED_AMOUNTS.map((item) => (
            <Button
              key={item.value}
              variant={amountValue === item.value ? "contained" : "outlined"}
              onClick={() => handleSuggestedAmount(item.value)}
              sx={{
                borderRadius: "10px",
                fontFamily: "Quicksand",
                fontWeight: "bold",
                textTransform: "none",
                py: 1.5,
                borderColor: "#0C65B6",
                color: amountValue === item.value ? "white" : "#0C65B6",
                backgroundColor: amountValue === item.value ? "#0C65B6" : "transparent",
                "&:hover": {
                  backgroundColor: amountValue === item.value ? "#0a5299" : "rgba(12, 101, 182, 0.1)",
                  borderColor: "#0C65B6",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </div>

        {/* Display selected amount */}
        {isValidAmount && (
          <div className="mt-4 p-3 bg-blue-50 rounded-xl">
            <p className="text-center font-quicksand">
              <span className="text-gray-600">
                {isEnglish ? "Amount to deposit:" : "Số tiền nạp:"}
              </span>
              <br />
              <span className="text-2xl font-bold text-blue-600">
                {formatCurrency(amountValue)} VND
              </span>
            </p>
          </div>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            borderRadius: "10px",
            fontFamily: "Quicksand",
            textTransform: "none",
            px: 3,
          }}
        >
          {isEnglish ? "Cancel" : "Hủy"}
        </Button>
        <Button
          onClick={handleDeposit}
          variant="contained"
          disabled={!isValidAmount || isLoading}
          sx={{
            borderRadius: "10px",
            fontFamily: "Quicksand",
            fontWeight: "bold",
            textTransform: "none",
            px: 3,
            backgroundColor: "#0C65B6",
            "&:hover": {
              backgroundColor: "#0a5299",
            },
          }}
        >
          {isLoading
            ? isEnglish
              ? "Processing..."
              : "Đang xử lý..."
            : isEnglish
              ? "Deposit"
              : "Nạp tiền"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DepositModal;
