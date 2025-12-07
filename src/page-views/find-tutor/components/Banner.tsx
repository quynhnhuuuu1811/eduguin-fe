import { Box, Typography } from "@mui/material";
import React from "react";
import bkg from "../../../assets/images/FindTutor.jpg";

const Banner = () => {
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
            fontFamily: "quicksand",
            fontSize: {
              xs: "15px",
              sm: "20px",
              md: "25px",
              lg: "30px",
            },
          }}
          component={"span"}
          className="text-blue100"
        >
          Cùng EduGuin{" "}
          <Typography
            component={"span"}
            fontFamily={"sugar"}
            fontSize={{
              xs: "20px",
              sm: "35px",
              md: "40px",
              lg: "45px",
            }}
            className="text-primary200"
          >
            tìm gia sư
          </Typography>{" "}
          phù hợp với bạn
        </Typography>
      </Box>
    </Box>
  );
};

export default Banner;
