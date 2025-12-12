"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Typography, Button } from "@mui/material";
import { useTranslation } from "@/i18n";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PaymentSuccessImg from "@/assets/images/payment-success.png";
import PaymentFailedImg from "@/assets/images/payment-failed.png";
import { CustomButton } from "@/components/Button";

const PaymentResultPageView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useTranslation();
  const isEnglish = t.common.loading === "Loading...";

  const [mounted, setMounted] = useState(false);

  const status = searchParams?.get("status");
  const amount = searchParams?.get("amount");

  const isSuccess = status === "success";

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatCurrency = (value: string | null) => {
    if (!value) return "0";
    return new Intl.NumberFormat("vi-VN").format(parseInt(value));
  };

  const handleBackToProfile = () => {
    router.push("/profile");
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        {/* Image */}
        <div className="mb-6 flex justify-center">
          <Image
            src={isSuccess ? PaymentSuccessImg : PaymentFailedImg}
            alt={isSuccess ? "Payment Success" : "Payment Failed"}
            width={150}
            height={150}
            className="object-contain"
          />
        </div>

        {/* Title */}
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Quicksand",
            fontWeight: "bold",
            color: isSuccess ? "#22c55e" : "#ef4444",
            mb: 2,
          }}
        >
          {isSuccess
            ? isEnglish
              ? "Deposit Successful!"
              : "Nạp tiền thành công!"
            : isEnglish
              ? "Deposit Failed"
              : "Nạp tiền thất bại"}
        </Typography>

        {/* Amount */}
        {amount && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-gray-500 text-sm font-quicksand">
              {isEnglish ? "Amount" : "Số tiền"}
            </p>
            <p className="text-2xl font-bold text-blue-600 font-quicksand">
              {formatCurrency(amount)} VND
            </p>
          </div>
        )}

        {/* Message */}
        <Typography
          sx={{
            fontFamily: "Quicksand",
            color: "#666",
            mb: 4,
            fontSize: "14px",
          }}
        >
          {isSuccess
            ? isEnglish
              ? "Your account has been credited successfully. You can now use your balance to register for classes."
              : "Tài khoản của bạn đã được nạp tiền thành công. Bạn có thể sử dụng số dư để đăng ký các lớp học."
            : isEnglish
              ? "Something went wrong with your payment. Please try again or contact support if the issue persists."
              : "Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại hoặc liên hệ hỗ trợ nếu lỗi vẫn tiếp tục."}
        </Typography>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <CustomButton
            type="Secondary"
            onClick={handleBackToProfile}
          >
            {isEnglish ? "Back to Profile" : "Quay lại hồ sơ"}
          </CustomButton>

          <CustomButton
            type="SecondaryOutlined"
            onClick={handleBackToHome}
          >
            {isEnglish ? "Back to Home" : "Về trang chủ"}
          </CustomButton>

          {!isSuccess && (
            <CustomButton
              type="Secondary"
              onClick={() => router.back()}

            >
              {isEnglish ? "Try Again" : "Thử lại"}
            </CustomButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentResultPageView;
