"use client";
import React from "react";
import tutorImg from "../../../assets/images/TutorAndStudent.jpg";
import studentImg from "../../../assets/images/student.png";
import teacherImg from "../../../assets/images/teacher.png";
import { Grid, Typography } from "@mui/material";
import { CustomButton } from "../../../components/Button";
import { useRouter } from "next/navigation";

const RoleOptions = () => {
  const router = useRouter();
  return (
    <Grid
      className=" w-full
    flex flex-col md:flex-row 
    items-stretch
    gap-2 sm:gap-2 md:gap-4 lg:gap-4
    px-[50px] sm:px-[65px] md:px-[80px] lg:px-[135px]
    py-5 sm:py-7 md:py-9 lg:py-11"
      spacing={2}
    >
      <Grid
        className="!aspect-square !flex-1/3 w-full border p-5"
        size={4}
        sx={{
          borderRadius: 3,
          backgroundColor: "#F4F5F5",
          border: "2px solid var(--color-gray900)",
        }}
      >
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
          >
            "Chúng tôi tự hào"
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
          >
            khi là cầu nối vững chắc cho học sinh và gia sư
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
        container
      >
        <div
          className="flex flex-1 flex-col md:flex-row w-full items-center !h-full bg-blue50 p-5 border-2 border-blue700"
          style={{
            borderRadius: "12px !important",
          }}
        >
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
              }}
            >
              Cần tìm gia sư?
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
              }}
            >
              Với bộ lọc cá nhân hóa, bạn sẽ dễ dàng dàng tìm được người bạn
              đồng hành trên chặng đường tìm kiếm tri thức.
            </Typography>
            <CustomButton
              type="SecondaryOutlined"
              className="!border-blue700 !text-blue700"
              onClick={() => router.push("/find-tutor")}
            >
              Tìm gia sư ngay!
            </CustomButton>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row w-full items-center !h-1/2 bg-blue50 p-5 border-2 border-blue700"
          style={{
            borderRadius: "12px !important",
          }}
        >
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
              }}
            >
              Cần tìm kiếm công việc gia sư?{" "}
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
              }}
            >
              Cùng tạo ra những CV đặc sắc, tìm công việc gia sư một cách dễ
              dàng, không còn phải mất nhiều công sức và thời gian!
            </Typography>
            <CustomButton
              type="SecondaryOutlined"
              className="!border-blue700 !text-blue700"
              onClick={() => router.push("/find-tutor")}
            >
              Tạo CV ngay!
            </CustomButton>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default RoleOptions;
