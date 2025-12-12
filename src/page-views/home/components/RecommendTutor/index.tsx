"use client";
import React, { useEffect } from "react";
import bkg from "../../../../assets/images/rcmTutor.png";
import { Box, Typography } from "@mui/material";
import CardItem from "./CardItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import { useUserStore } from "@/zustand/stores/UserStore";
import { useTranslation } from "@/i18n";

const RecommendTutor = () => {
  const { tutorList, recommendTutor } = useUserStore();
  const { t } = useTranslation();

  useEffect(() => {
    recommendTutor();
  }, []);

  return (
    <Box
      sx={{
        backgroundImage: `url(${bkg.src})`,
        backgroundColor: "#FFFFFF/80",
        width: "100%",
        height: "auto",
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingBlock: {
          xs: 4,
          sm: 6,
          md: 8,
          lg: 10,
        },
        paddingInline: {
          xs: "50px",
          sm: "80px",
          md: "100px",
          lg: "135px",
        },
      }}>
      <Typography
        sx={{
          fontFamily: "quicksand",
          fontSize: {
            xs: "15px",
            sm: "20px",
            md: "25px",
            lg: "25px",
          },
          fontWeight: 700,
          marginBottom: 4,
          color: "#000000",
        }}>
        {t.home.recommendTutor.title}
      </Typography>
      <Box className="w-full flex justify-center items-center !bg-transparent">
        <Swiper
          style={{ width: "100%", paddingBottom: "50px" }}
          spaceBetween={15}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
          loop={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="recommend-tutor-swiper">
          {tutorList.map((tutor, index) => (
            <SwiperSlide
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
              }}>
              <CardItem tutor={tutor as any} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default RecommendTutor;
