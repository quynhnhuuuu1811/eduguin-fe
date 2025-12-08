"use client";

import React from "react";
import ContactItem from "./components/ContactItem";
import BankCard from "./components/BankCard";

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
    <div className="min-h-screen  flex flex-col items-center justify-center pt-20 px-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-blue800 mb-8 mt-6">Liên hệ với chúng tôi</h1>
        <p className="text-gray900 max-w-xl my-0 font-semibold mb-2">
          Bạn có câu hỏi hoặc cần hỗ trợ? Hãy liên hệ với chúng tôi qua các kênh
          dưới đây.
        </p>
      </div>

      {/* Cards Container */}
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
        <ContactItem
          type="email"
          title="EMAIL"
          subtitle="Gửi email cho chúng tôi"
          value="contact@eduguin.com"
          onClick={handleEmailClick}
        />
        <ContactItem
          type="phone"
          title="ĐIỆN THOẠI"
          subtitle="Gọi ngay cho chúng tôi"
          value="+84 123 456 789"
          onClick={handlePhoneClick}
        />
        <ContactItem
          type="address"
          title="ĐỊA CHỈ"
          subtitle="Ghé thăm văn phòng"
          value="TP. Hồ Chí Minh, Việt Nam"
          onClick={handleAddressClick}
        />
      </div>

      {/* Additional Info */}
      <div className="mt-8 text-center">
        <p className="text-gray900 text-sm">
          Giờ làm việc: Thứ 2 - Thứ 6, 8:00 - 17:00
        </p>
      </div>
      {/* Donation Section */}
      <div className="mt-12 text-center">
        <p className="text-gray900 mb-6 font-semibold">
          Nếu bạn thấy sản phẩm/dịch vụ của chúng tôi hữu ích và muốn ủng hộ, bạn có thể chuyển khoản qua:
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <BankCard
            bankName="MB BANK"
            accountNumber="0969036238"
            accountHolder="NGUYEN NGOC QUYNH NHU"
            bankBranch="HCM"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactPageView;
