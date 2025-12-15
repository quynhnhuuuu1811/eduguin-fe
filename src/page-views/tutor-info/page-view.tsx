"use client";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import Info from "./components/Info";
import { useTranslation } from "@/i18n";
import { useAuthStore } from "@/zustand/stores/AuthStore";

const TutorInfo = ({ id }: { id: string }) => {
  const { t } = useTranslation();
  const { data: authData, getMyInfo } = useAuthStore();

  useEffect(() => {
    getMyInfo();
  }, [getMyInfo]);

  const userInfo = useMemo(() => {
    if (!authData?.user) return undefined;
    return authData.user;
  }, [authData?.user]);

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
      } catch (e) { }
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
        {t.tutorInfo.title}
      </Typography>
      <Box width="100%" className="max-w-[80%] mx-auto">
        <Info id={id} userInfo={userInfo ?? undefined} />
      </Box>
    </div>
  );
};

export default TutorInfo;
