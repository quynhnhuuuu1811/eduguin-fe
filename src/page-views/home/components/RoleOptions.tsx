"use client";
import React from "react";
import tutorImg from "../../../assets/images/TutorAndStudent.jpg";
import studentImg from "../../../assets/images/student.png";
import teacherImg from "../../../assets/images/teacher.png";
import { Grid, Typography } from "@mui/material";
import { CustomButton } from "../../../components/Button";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/i18n";

const RoleOptions = () => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <Grid
      className=" w-full
    flex flex-col md:flex-row 
    items-stretch
    gap-2 sm:gap-2 md:gap-4 lg:gap-4
    px-[50px] sm:px-[65px] md:px-[80px] lg:px-[135px]
    py-5 sm:py-7 md:py-9 lg:py-11"
      spacing={2}>
      <Grid
        className="!aspect-square !flex-1/3 w-full border p-5"
        size={4}
        sx={{
          borderRadius: 3,
          backgroundColor: "#F4F5F5",
          border: "2px solid var(--color-gray900)",
        }}>
        <div className="py-3">
          <Typography
            sx={{
              fontFamily: "sugar",
              fontSize: {
                xs: "20px",
                sm: "20px",
                md: "25px",
                lg: "25px",
              },
            }}
            color="#414853">
            {t.home.roleOptions.studentTitle === 'Student' ? '"We are proud"' : '"Chúng tôi tự hào"'}
          </Typography>
          <Typography
            sx={{
              fontFamily: "quicksand",
              fontSize: {
                xs: "12px",
                sm: "14px",
                md: "15px",
                lg: "15px",
              },
            }}
            color="#414853">
            {t.home.roleOptions.studentTitle === 'Student'
              ? 'to be a solid bridge for students and tutors'
              : 'khi là cầu nối vững chắc cho học sinh và gia sư'}
          </Typography>
        </div>
        <img
          src={tutorImg.src}
          alt="img"
          className="aspect-square w-full object-cover rounded rounded-3"
        />
      </Grid>
      <Grid
        size={8}
        className="flex !flex-2/3 w-full h-max "
        sx={{
          display: "flex",
          height: "100% !important",
          flexDirection: "column",
          gap: 2,
        }}
        container>
        <div
          className="flex flex-1 flex-col md:flex-row w-full items-center !h-full bg-blue50 p-5 border-2 border-blue700"
          style={{
            borderRadius: "12px !important",
          }}>
          <img
            src={studentImg.src}
            alt="img"
            className="w-2/3 md:w-1/4 rounded rounded-3 gap-3"
          />
          <div className="p-5">
            <Typography
              sx={{
                fontFamily: "quicksand",
                fontSize: {
                  xs: "12px",
                  sm: "15px",
                  md: "20px",
                  lg: "20px",
                },
                fontWeight: "bold",
                marginBottom: "8px",
                color: "#000000",
              }}>
              {t.home.roleOptions.studentTitle === 'Student' ? 'Looking for a tutor?' : 'Cần tìm gia sư?'}
            </Typography>
            <Typography
              className="pb-3"
              sx={{
                fontFamily: "quicksand",
                fontSize: {
                  xs: "10px",
                  sm: "10px",
                  md: "14px",
                  lg: "14px",
                },
                color: "#000000",
              }}>
              {t.home.roleOptions.studentDesc}
            </Typography>
            <CustomButton
              type="SecondaryOutlined"
              className="!border-blue700 !text-blue700"
              onClick={() => router.push("/find-tutor")}>
              {t.home.banner.findTutor}
            </CustomButton>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row w-full items-center !h-1/2 bg-blue50 p-5 border-2 border-blue700"
          style={{
            borderRadius: "12px !important",
          }}>
          <img
            src={teacherImg.src}
            alt="img"
            className="w-2/3 md:w-1/4 rounded rounded-3 gap-3"
          />
          <div className="p-5">
            <Typography
              sx={{
                fontFamily: "quicksand",
                fontSize: {
                  xs: "12px",
                  sm: "15px",
                  md: "20px",
                  lg: "20px",
                },
                fontWeight: "bold",
                marginBottom: "8px",
                color: "#000000",
              }}>
              {t.home.roleOptions.studentTitle === 'Student' ? 'Looking for a tutoring job?' : 'Cần tìm kiếm công việc gia sư?'}
            </Typography>
            <Typography
              className="pb-3"
              sx={{
                fontFamily: "quicksand",
                fontSize: {
                  xs: "10px",
                  sm: "10px",
                  md: "14px",
                  lg: "14px",
                },
                color: "#000000",
              }}>
              {t.home.roleOptions.tutorDesc}
            </Typography>
            <CustomButton
              type="SecondaryOutlined"
              className="!border-blue700 !text-blue700"
              onClick={() => router.push("/tutor-register")}>
              {t.home.banner.createCV}
            </CustomButton>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default RoleOptions;
