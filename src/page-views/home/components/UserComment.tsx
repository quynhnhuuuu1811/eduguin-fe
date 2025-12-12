"use client";
import { Box, Typography } from "@mui/material";
import React from "react";
import commentImg from "../../../assets/images/userComments.png";
import { CustomButton } from "@/components/Button";
import Image from "next/image";
import { useTranslation } from "@/i18n";

const UserComment = () => {
  const { t } = useTranslation();
  const isEnglish = t.common.loading === 'Loading...';

  return (
    <Box
      className="w-full bg-[#F5FAFE] flex flex-col justify-center items-center"
      sx={{
        height: {
          xs: "200px",
          sm: "300px",
          md: "400px",
          lg: "500px",
        },
        paddingInline: {
          xs: "80px",
          sm: "100px",
          md: "120px",
          lg: "135px",
        },
        paddingBlock: {
          xs: 2,
          sm: 3,
          md: 4,
          lg: 8,
        },
        gap: {
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
        },
      }}
    >
      <Typography
        className="flex gap-1 items-end"
        component="div"
        sx={{
          fontFamily: "quicksand",
          fontSize: {
            xs: "10px",
            sm: "15px",
            md: "20px",
            lg: "20px",
          },
          color: "var(--color-blue600)",
          fontWeight: 700,
        }}
      >
        {isEnglish ? 'What do users' : 'Người dùng'}
        <Typography
          component="span"
          fontFamily="sugar"
          padding={0}
          lineHeight={1}
          sx={{
            fontSize: {
              xs: "15px",
              sm: "20px",
              md: "30px",
              lg: "35px",
            },
            color: "var(--color-primary600)",
          }}
        >
          {" "}
          {isEnglish ? 'say' : 'nhận xét'}{" "}
        </Typography>
        {isEnglish ? 'about EduGuin?' : 'gì về EduGuin?'}
      </Typography>

      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: {
            xs: 2,
            sm: 3,
            md: 4,
            lg: 5,
          },
          width: "100%",
          height: "100%",
          padding: {
            xs: 0.5,
            sm: 1,
            md: 1.5,
            lg: 2,
          },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: {
              xs: 0.5,
              sm: 1,
              md: 1.5,
              lg: 2,
            },
          }}
        >
          <Typography
            sx={{
              fontFamily: "quicksand",
              fontSize: {
                xs: "8px",
                sm: "10px",
                md: "12px",
                lg: "14px",
              },
              color: "var(--color-gray900)",
              fontWeight: 500,
            }}
          >
            {isEnglish ? 'Want to send us your feedback?' : 'Bạn muốn gửi thêm nhận xét cho chúng tôi?'}
          </Typography>
          <CustomButton
            type="Secondary"
            className="!bg-[#CEF8D5] !text-[#02A959] w-fit pb-2"
          >
            {isEnglish ? 'Leave Feedback' : 'Đóng góp ý kiến'}
          </CustomButton>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Image
            src={commentImg.src}
            alt="User Comment"
            width={1000}
            height={1000}
            className="h-full w-auto object-contain rounded-[16px]"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default UserComment;
