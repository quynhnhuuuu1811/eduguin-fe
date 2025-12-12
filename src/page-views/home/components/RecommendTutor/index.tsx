"use client";
import React, { useEffect, useState } from "react";
import bkg from "../../../../assets/images/rcmTutor.png";
import { Box, Typography } from "@mui/material";
import CardItem from "./CardItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import { useUserStore } from "@/zustand/stores/UserStore";
import { useTranslation } from "@/i18n";
import { Tutor } from "@/types/tutor.type";

const RecommendTutor = () => {
  const { users, tutorList, recommendTutor, fetchAllTutors } = useUserStore();
  const { t } = useTranslation();

  const [displayTutors, setDisplayTutors] = useState<Tutor[]>(tutorList || []);
  const [usedFallback, setUsedFallback] = useState(false);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        await recommendTutor();
        if (mounted) setUsedFallback(false);
      } catch (error) {
        if (mounted) await fetchAllTutors({ page: 1, limit: 4 });
        if (mounted) setUsedFallback(true);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [recommendTutor, fetchAllTutors]);

  // Keep displayTutors in sync: prefer tutorList when available, otherwise use users.
  useEffect(() => {
    if (usedFallback) {
      // store.users may be typed as User[]; assert to Tutor[] when using as fallback
      setDisplayTutors((users ?? []) as unknown as Tutor[]);
      return;
    }

    if (Array.isArray(tutorList) && tutorList.length > 0) {
      setDisplayTutors(tutorList);
    } else {
      setDisplayTutors((users ?? []) as unknown as Tutor[]);
    }
  }, [tutorList, users, usedFallback]);

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
          loop={displayTutors.length > 4}
          centerInsufficientSlides={true}
          pagination={{ clickable: true, dynamicBullets: true }}
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}>
          {displayTutors.map((tutor: Tutor, index: number) => (
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
