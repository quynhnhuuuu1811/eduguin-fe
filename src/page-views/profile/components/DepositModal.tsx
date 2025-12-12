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
import { useRouter } from "next/navigation";

interface DepositModalProps {
  open: boolean;
  onClose: () => void;
}

const SUGGESTED_AMOUNTS = [
  { label: "100K", value: 100000 },
  { label: "200K", value: 200000 },
  { label: "500K", value: 500000 },
  { label: "1TR", value: 1000000 },
];

const DepositModal: React.FC<DepositModalProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const isEnglish = t.common.loading === "Loading...";

  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN").format(value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, "");
    setAmount(value);
  };

  const handleSuggestedAmount = (value: number) => {
    setAmount(value.toString());
  };

  const handleDeposit = async () => {
    if (!amount || parseInt(amount) <= 0) return;

    setIsLoading(true);
    try {
      // TODO: Call API to create payment
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to payment result page
      // In real implementation, this would redirect to a payment gateway
      // and then callback to payment-result page
      const success = Math.random() > 0.3; // Simulate 70% success rate
      router.push(`/payment-result?status=${success ? "success" : "failed"}&amount=${amount}`);
      onClose();
    } catch (error) {
      console.error("Deposit error:", error);
      router.push(`/payment-result?status=failed&amount=${amount}`);
      onClose();
    } finally {
      setIsLoading(false);
    }
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
          InputProps={{
            endAdornment: <InputAdornment position="end">VND</InputAdornment>,
            sx: { fontFamily: "Quicksand" },
          }}
          InputLabelProps={{
            sx: { fontFamily: "Quicksand" },
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
              variant={parseInt(amount) === item.value ? "contained" : "outlined"}
              onClick={() => handleSuggestedAmount(item.value)}
              sx={{
                borderRadius: "10px",
                fontFamily: "Quicksand",
                fontWeight: "bold",
                textTransform: "none",
                py: 1.5,
                borderColor: "#0C65B6",
                color: parseInt(amount) === item.value ? "white" : "#0C65B6",
                backgroundColor: parseInt(amount) === item.value ? "#0C65B6" : "transparent",
                "&:hover": {
                  backgroundColor: parseInt(amount) === item.value ? "#0a5299" : "rgba(12, 101, 182, 0.1)",
                  borderColor: "#0C65B6",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </div>

        {/* Display selected amount */}
        {amount && parseInt(amount) > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-xl">
            <p className="text-center font-quicksand">
              <span className="text-gray-600">
                {isEnglish ? "Amount to deposit:" : "Số tiền nạp:"}
              </span>
              <br />
              <span className="text-2xl font-bold text-blue-600">
                {formatCurrency(parseInt(amount))} VND
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
          disabled={!amount || parseInt(amount) <= 0 || isLoading}
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
