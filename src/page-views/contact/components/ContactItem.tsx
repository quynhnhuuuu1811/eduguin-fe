"use client";

import React, { useState } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

interface ContactItemProps {
  type: "email" | "phone" | "address";
  title: string;
  subtitle: string;
  value: string;
  onClick?: () => void;
}

// Màu sắc cho từng loại card
const colorSchemes = {
  email: {
    bg: "bg-blue-500/10",
    border: "border-blue-200/50",
    text: "text-blue-800",
    subtitleText: "text-blue-600/70",
    iconBg: "bg-blue-500",
    btnBg: "bg-blue-100/60 hover:bg-blue-200",
    iconStroke: "stroke-blue-700",
  },
  phone: {
    bg: "bg-green-500/10",
    border: "border-green-200/50",
    text: "text-green-800",
    subtitleText: "text-green-600/70",
    iconBg: "bg-green-500",
    btnBg: "bg-green-100/60 hover:bg-green-200",
    iconStroke: "stroke-green-700",
  },
  address: {
    bg: "bg-amber-500/10",
    border: "border-amber-200/50",
    text: "text-amber-800",
    subtitleText: "text-amber-600/70",
    iconBg: "bg-amber-500",
    btnBg: "bg-amber-100/60 hover:bg-amber-200",
    iconStroke: "stroke-amber-700",
  },
};

const ContactItem: React.FC<ContactItemProps> = ({
  type = "email",
  title,
  subtitle,
  value,
  onClick,
}) => {
  const colors = colorSchemes[type] || colorSchemes.email;

  const [isCopied, setIsCopied] = useState(false);

  // Icon cho mỗi loại
  const renderIcon = () => {
    switch (type) {
      case "email":
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
        );
      case "phone":
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        );
      case "address":
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`
        group
        w-[250px]
        rounded-2xl
        ${colors.bg}
        border ${colors.border}
        flex flex-col
        relative
        overflow-hidden
        cursor-pointer
        font-quicksand
        transition-all duration-300
        hover:shadow-lg hover:shadow-black/10
        hover:scale-[1.02]
      `}
      onClick={onClick}
    >
      {/* Animated circle */}
      <div
        className={`
          absolute
          w-[100px] h-[100px]
          -top-[40%] -left-[20%]
          rounded-full
          border-[35px] border-white/10
          transition-all duration-700 ease-out
          blur-sm
          group-hover:w-[140px] group-hover:h-[140px]
          group-hover:-top-[30%] group-hover:left-[50%]
          group-hover:blur-0
        `}
      />

      {/* Text content */}
      <div className="flex-1 p-4 flex flex-col z-10">
        <div className="flex items-center gap-2 mb-2">
          <div className={`p-2 rounded-full ${colors.iconBg} text-white`}>
            {renderIcon()}
          </div>
        </div>
        <span className={`text-lg font-bold ${colors.text}`}>{title}</span>
        <p className={`text-sm font-light mt-1 ${colors.subtitleText}`}>
          {subtitle}
        </p>
        <p className={`text-xs mt-auto font-medium ${colors.text} opacity-80`}>
          {value}
        </p>
      </div>

      {/* Bottom action buttons - 2 buttons only */}
      <div className="flex w-full rounded-b-2xl overflow-hidden">
        {/* Nút sao chép thông tin */}
        <button
          className={`
            flex-1 h-[40px]
            ${colors.btnBg}
            flex items-center justify-center gap-2
            transition-colors duration-200
            text-sm font-medium
            ${colors.text}
          `}
          onClick={(e) => {
            e.stopPropagation();
            setIsCopied(true);
            setTimeout(() => {
              setIsCopied(false);
            }, 1000);
          }}
        >
          {isCopied ? (
            <CheckIcon className="w-2 h-2" sx={{ fontSize: 12 }} />
          ) : (
            <ContentCopyIcon className="w-2 h-2" sx={{ fontSize: 12 }} />
          )}
          {isCopied ? "Đã sao chép" : "Sao chép"}
        </button>

        {/* Nút liên hệ */}
        <button
          className={`
            flex-1 h-[40px]
            ${colors.btnBg}
            flex items-center justify-center gap-2
            transition-colors duration-200
            text-sm font-medium
            ${colors.text}
          `}
          onClick={(e) => {
            e.stopPropagation();
            if (type === "email") {
              window.location.href = `mailto:${value}`;
            } else if (type === "phone") {
              window.location.href = `tel:${value}`;
            } else {
              window.open(`https://maps.google.com/?q=${encodeURIComponent(value)}`, "_blank");
            }
          }}
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          Liên hệ
        </button>
      </div>
    </div>
  );
};

export default ContactItem;
