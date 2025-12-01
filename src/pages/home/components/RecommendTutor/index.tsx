"use client";
import React from "react";
import bkg from "../../../../assets/images/rcmTutor.png";
import { Box, ButtonGroupContext, Typography } from "@mui/material";
import Img from "../../../../assets/images/teacher.png";
import CardItem from "./CardItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const RecommnendTutor = () => {
  const rcmTutors = [
    {
      name: "Nguyễn Văn A",
      subject: "Toán học",
      rating: 4.9,
      img: Img,
      location: "Hà Nội",
    },
    {
      name: "Trần Thị B",
      subject: "Vật lý",
      rating: 4.8,
      img: Img,
      location: "TP. Hồ Chí Minh",
    },
    {
      name: "Lê Văn C",
      subject: "Hóa học",
      rating: 4.7,
      img: Img,
      location: "Đà Nẵng",
    },
    {
      name: "Phạm Thị D",
      subject: "Sinh học",
      rating: 4.9,
      img: Img,
      location: "Cần Thơ",
    },
  ];
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
        Đề xuất cho bạn...
      </Typography>
      <Box className="w-full flex justify-center items-center !bg-transparent">
        <Swiper
          style={{ width: "100%", paddingBottom: "20px" }}
          spaceBetween={15}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}>
          {rcmTutors.map((tutor, index) => (
            <SwiperSlide
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
              }}>
              <CardItem tutor={tutor} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default RecommnendTutor;
