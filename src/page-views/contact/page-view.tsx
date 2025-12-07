"use client";

import React from "react";
import ContactItem from "./components/ContactItem";

const ContactPageView = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:contact@eduguin.com";
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+84123456789";
  };

  const handleAddressClick = () => {
    window.open(
      "https://maps.google.com/?q=Ho+Chi+Minh+City,+Vietnam",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center py-20 px-4">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-blue800 mb-4">Liên hệ với chúng tôi</h1>
        <p className="text-gray900 max-w-xl mx-auto">
          Bạn có câu hỏi hoặc cần hỗ trợ? Hãy liên hệ với chúng tôi qua các kênh
          dưới đây.
        </p>
      </div>

      {/* Cards Container */}
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
        <ContactItem
          type="email"
          frontTitle="EMAIL"
          frontSubtitle="Hover Me"
          backTitle="Gửi Email"
          backValue="contact@eduguin.com"
          onClick={handleEmailClick}
        />
        <ContactItem
          type="phone"
          frontTitle="ĐIỆN THOẠI"
          frontSubtitle="Hover Me"
          backTitle="Gọi Ngay"
          backValue="+84 123 456 789"
          onClick={handlePhoneClick}
        />
        <ContactItem
          type="address"
          frontTitle="ĐỊA CHỈ"
          frontSubtitle="Hover Me"
          backTitle="Địa Chỉ"
          backValue="TP. Hồ Chí Minh, Việt Nam"
          onClick={handleAddressClick}
        />
      </div>

      {/* Additional Info */}
      <div className="mt-16 text-center">
        <p className="text-gray900 text-sm">
          Giờ làm việc: Thứ 2 - Thứ 6, 8:00 - 17:00
        </p>
      </div>
    </div>
  );
};

export default ContactPageView;
