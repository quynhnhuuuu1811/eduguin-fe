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
        height: "700px",
        padding: 20,
      }}
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
        className="flex flex-col items-center justify-center px-[140px] gap-12"
      >
        <div className="flex w-full gap-[100px] items-center">
          <TextBanner />
          <OverallRating />
        </div>
        <div className="flex gap-5">
          <Message>
            Dù bạn cần ôn luyện thi cử, củng cố kiến thức nền hay hỗ trợ học tập
            tại nhà – chúng tôi kết nối bạn với những gia sư chất lượng, được
            tuyển chọn kỹ lưỡng.
          </Message>
          <Message
            icon={
              <div className="border-blue700 p-[2px] border-2 w-8 h-8 flex items-center justify-center rounded-full">
                <LikeIcon
                  style={{
                    cursor: "none",
                    color: "#094A86",
                    width: "20px",
                    height: "20px",
                  }}
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
