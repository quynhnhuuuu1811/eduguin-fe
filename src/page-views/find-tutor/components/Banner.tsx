"use client";
import { Box, Typography } from "@mui/material";
import React from "react";
import bkg from "../../../assets/images/FindTutor.jpg";
import { useTranslation } from "../../../i18n/LanguageContext";

const Banner = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: {
          xs: "200px",
          sm: "300px",
          md: "400px",
          lg: "500px",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "90%",
          height: "90%",
          backgroundImage: `url(${bkg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0, 0, 0, 0.5)",
          },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          borderRadius: {
            xs: "10px",
            sm: "15px",
            md: "20px",
            lg: "25px",
          },
        }}
      >
        <Typography
          sx={{
            position: "relative",
            zIndex: 1,
            fontFamily: "sugar",
            fontSize: {
              xs: "20px",
              sm: "20px",
              md: "30px",
              lg: "40px",
            },
          }}
          component={"span"}
          className="text-blue100"
        >
          {t.findTutor.banner.title}
        </Typography>
      </Box>
    </Box>
  );
};

export default Banner;
