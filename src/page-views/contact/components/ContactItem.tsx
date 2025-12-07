"use client";

import React from "react";

interface ContactItemProps {
  type: "email" | "phone" | "address";
  frontTitle: string;
  frontSubtitle: string;
  backTitle: string;
  backValue: string;
  onClick?: () => void;
}

// Màu sắc cho từng loại card
const colorSchemes = {
  email: {
    front: "bg-linear-to-br from-blue50 via-blue100 to-blue100/80",
    frontText: "text-blue800",
    frontBorder: "border-blue700",
    back: "bg-white",
    backText: "text-blue800",
    backBorder: "border-blue700",
  },
  phone: {
    front: "bg-linear-to-br from-primary50 via-primary200 to-primary200/60",
    frontText: "text-primary700",
    frontBorder: "border-primary500",
    back: "bg-white",
    backText: "text-primary700",
    backBorder: "border-primary500",
  },
  address: {
    front: "bg-linear-to-br from-yellow100 via-yellow100 to-yellow500/30",
    frontText: "text-yellow500",
    frontBorder: "border-yellow500",
    back: "bg-white",
    backText: "text-yellow500",
    backBorder: "border-yellow500",
  },
};

const ContactItem: React.FC<ContactItemProps> = ({
  type = "email",
  frontTitle,
  frontSubtitle,
  backTitle,
  backValue,
  onClick,
}) => {
  const colors = colorSchemes[type] || colorSchemes.email;

  // Icon cho mỗi loại
  const renderIcon = () => {
    switch (type) {
      case "email":
        return (
          <svg
            className="w-12 h-12 mb-2"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
        );
      case "phone":
        return (
          <svg
            className="w-12 h-12 mb-2"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        );
      case "address":
        return (
          <svg
            className="w-12 h-12 mb-2"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        );
    }
  };

  return (
    <div
      className="bg-transparent w-[190px] h-[254px] perspective-[1000px] font-quicksand cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-full h-full text-center [transition:transform_0.8s] transform-3d hover:transform-[rotateY(180deg)]">
        {/* Front */}
        <div
          className={`
            [box-shadow:0_8px_14px_0_rgba(0,0,0,0.2)]
            absolute flex flex-col justify-center items-center
            w-full h-full
            backface-hidden
            border rounded-2xl
            ${colors.front}
            ${colors.frontText}
            ${colors.frontBorder}
          `}
        >
          {renderIcon()}
          <p className="text-2xl font-black m-0">{frontTitle}</p>
          <p className="text-sm mt-2">{frontSubtitle}</p>
        </div>

        {/* Back */}
        <div
          className={`
            [box-shadow:0_8px_14px_0_rgba(0,0,0,0.2)]
            absolute flex flex-col justify-center items-center
            w-full h-full
            backface-hidden
            border rounded-2xl
            transform-[rotateY(180deg)]
            px-4
            ${colors.back}
            ${colors.backText}
            ${colors.backBorder}
          `}
        >
          <p className="text-2xl font-black m-0">{backTitle}</p>
          <p className="text-sm mt-3 wrap-break-word text-center leading-relaxed">
            {backValue}
          </p>
          <p className="text-xs mt-4 opacity-80">Nhấn để liên hệ</p>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
