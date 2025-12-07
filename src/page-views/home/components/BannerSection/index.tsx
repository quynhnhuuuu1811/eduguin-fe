import React from "react";
import TextBanner from "./TextBanner";
import OverallRating from "./OverallRating";
import Message from "./Message";
import LikeIcon from "@mui/icons-material/ThumbUpOutlined";
import Banner from "../../../../assets/images/homepage.png";

const HeroBanner = () => {
  return (
    <div
      style={{
        width: "100%",
        padding: 20,
      }}
      className="h-[400px] md:h-[700px] lg:h-[700px]"
    >
      <div
        style={{
          backgroundImage: `url(${Banner.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
          borderRadius: "20px",
        }}
        className="flex flex-col items-center justify-center lg:px-[100px] md:px-[60px] sm:px-[20px] px-[10px]  md:gap-12 lg:gap-12"
      >
        <div className="flex w-full md:gap-[60px] sm:gap-[20px] lg:gap-[120px] items-center !flex-col md:!flex-row lg:!flex-row sm:!flex-row">
          <TextBanner />
          <div className="hidden sm:block md:block">
            <OverallRating />
          </div>
        </div>
        <div className="flex gap-5 px-[20px] mt-4 md:px-0 sm:px-0 lg:px-0">
          <Message>
            Dù bạn cần ôn luyện thi cử, củng cố kiến thức nền hay hỗ trợ học tập
            tại nhà – chúng tôi kết nối bạn với những gia sư chất lượng, được
            tuyển chọn kỹ lưỡng.
          </Message>
          <Message
            icon={
              <div className="border-blue700 p-[2px] border-2 w-4 h-4 sm:!w-5 sm:!h-5 md:!h-6 md:!w-6 lg:!w-8 lg:!h-8 flex items-center justify-center rounded-full">
                <LikeIcon
                  style={{
                    cursor: "none",
                    color: "#094A86",
                  }}
                  className="!w-2 !h-2 sm:!w-3 sm:!h-3 md:!h-4 md:!w-4 lg:!w-5 lg:!h-5"
                />
              </div>
            }
          >
            Tìm gia sư phù hợp dễ dàng chỉ trong vài bước – đội ngũ giáo viên
            giỏi, tận tâm, sẵn sàng đồng hành cùng học sinh trên hành trình
            chinh phục kiến thức.
          </Message>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
