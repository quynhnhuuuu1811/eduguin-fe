"use client";
import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Info from "./components/Info";

const TutorInfo = ({ id }: { id: string }) => {
  useEffect(() => {
    const track = async () => {
      console.log("Tracking view_tutor for tutorId:", id);
      try {
        await fetch("/api/track-view-tutor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ tutorId: id }),
        });
      } catch (e) {}
    };

    track();
  }, [id]);
  return (
    <div>
      <Typography
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: {
            xs: "50px",
            sm: "80px",
            md: "120px",
            lg: "120px",
          },
          fontFamily: "quicksand",
          fontWeight: "bold",
          fontSize: {
            xs: "15px",
            sm: "20px",
            md: "25px",
            lg: "28px",
          },
          color: "#0C65B6",
          marginBottom: {
            xs: "20px",
            sm: "20px",
            md: "50px",
            lg: "50px",
          },
        }}>
        Thông tin giáo viên
      </Typography>
      <Box width="100%" className="max-w-[80%] mx-auto">
        <Info id={id} />
      </Box>
    </div>
  );
};

export default TutorInfo;
