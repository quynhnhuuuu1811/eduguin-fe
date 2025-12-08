"use client";

import React, { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

interface BankCardProps {
  bankName?: string;
  accountNumber: string;
  accountHolder: string;
  bankBranch?: string;
}

const BankCard: React.FC<BankCardProps> = ({
  bankName = "VIETCOMBANK",
  accountNumber,
  accountHolder,
  bankBranch = "",
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField(null);
    }, 1500);
  };

  return (
    <div
      className="
        group
        flex flex-col items-start justify-end
        w-[320px] h-[200px]
        rounded-xl
        p-5
        font-quicksand
        relative
        gap-4
        shadow-lg
        cursor-pointer
      "
      style={{
        backgroundImage:
          "radial-gradient(circle 897px at 9% 80.3%, rgba(55, 60, 245, 1) 0%, rgba(234, 161, 15, 0.9) 100.2%)",
      }}
    >
      {/* Logo Container */}
      <div className="absolute top-0 left-0 w-full flex items-center justify-left p-4">
        <span className="text-white text-xs font-bold tracking-wider opacity-80">
          {bankName}
        </span>
        {/* Mastercard Logo */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 48 48"
        >
          <path
            fill="#ff9800"
            d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
          />
          <path
            fill="#d50000"
            d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
          />
          <path
            fill="#ff3d00"
            d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
          />
        </svg>
      </div>

      {/* Account Number */}
      <div className="w-full flex flex-col items-start justify-start">
        <label className="text-[10px] tracking-wider text-gray-200 mb-1">
          SỐ TÀI KHOẢN
        </label>
        <div className="flex items-center gap-2">
          <span className="text-white text-sm font-medium tracking-widest">
            {accountNumber}
          </span>
          <button
            onClick={() => handleCopy(accountNumber, "account")}
            className="text-white/70 hover:text-white transition-colors"
          >
            {copiedField === "account" ? (
              <CheckIcon sx={{ fontSize: 14 }} />
            ) : (
              <ContentCopyIcon sx={{ fontSize: 14 }} />
            )}
          </button>
        </div>
      </div>

      {/* Account Holder & Branch */}
      <div className="w-full flex gap-4">
        <div className="flex-1 flex flex-col items-start justify-start">
          <label className="text-[8px] tracking-wider text-gray-200 mb-1">
            CHỦ TÀI KHOẢN
          </label>
          <div className="flex items-center gap-2">
            <span className="text-white text-[10px] font-medium tracking-wide uppercase">
              {accountHolder}
            </span>
            <button
              onClick={() => handleCopy(accountHolder, "holder")}
              className="text-white/70 hover:text-white transition-colors"
            >
              {copiedField === "holder" ? (
                <CheckIcon sx={{ fontSize: 12 }} />
              ) : (
                <ContentCopyIcon sx={{ fontSize: 12 }} />
              )}
            </button>
          </div>
        </div>
        {bankBranch && (
          <div className="flex items-end justify-start">
            <label className="text-[10px] tracking-wider text-gray-200 mb-1">
              CHI NHÁNH : {bankBranch}
            </label>
          </div>
        )}
      </div>

      {/* Copy All Overlay - hiện khi hover */}
      <div
        className="
          absolute inset-0 
          rounded-xl
          bg-black/50 
          opacity-0 group-hover:opacity-100
          flex items-end justify-end
          transition-opacity duration-300
          p-4
        "
      >
        <button
          onClick={() =>
            handleCopy(
              `Ngân hàng: ${bankName}\nSố TK: ${accountNumber}\nChủ TK: ${accountHolder}${bankBranch ? `\nChi nhánh: ${bankBranch}` : ""}`,
              "all"
            )
          }
          className="
            bg-white/20 hover:bg-white/30
            text-white text-sm font-medium
            px-4 py-2 rounded-lg
            flex items-center gap-2
            transition-colors
          "
        >
          {copiedField === "all" ? (
            <>
              <CheckIcon sx={{ fontSize: 16 }} />
              Đã sao chép!
            </>
          ) : (
            <>
              <ContentCopyIcon sx={{ fontSize: 16 }} />
              Sao chép tất cả
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default BankCard;
