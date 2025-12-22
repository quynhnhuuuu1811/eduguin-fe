"use client";
import React from "react";
import BgImg from "../assets/images/footer-bg.png";
import LogoImg from "../assets/images/Logo-Photoroom.png";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "@/i18n";

const Footer = () => {
  const pathname = usePathname();
  const { t } = useTranslation();

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  const linkItems = [
    {
      href: "/",
      icon: (
        <FacebookIcon
          sx={{
            fontSize: {
              xs: "16px",
              sm: "20px",
              md: "24px",
              lg: "28px",
            },
          }}
        />
      ),
    },
    {
      href: "/find-tutor",
      icon: (
        <InstagramIcon
          sx={{
            fontSize: {
              xs: "16px",
              sm: "20px",
              md: "24px",
              lg: "28px",
            },
          }}
        />
      ),
    },
    {
      href: "/is-tutor",
      icon: (
        <TwitterIcon
          sx={{
            fontSize: {
              xs: "16px",
              sm: "20px",
              md: "24px",
              lg: "28px",
            },
          }}
        />
      ),
    },
    {
      href: "/contact",
      icon: (
        <YouTubeIcon
          sx={{
            fontSize: {
              xs: "16px",
              sm: "20px",
              md: "24px",
              lg: "28px",
            },
          }}
        />
      ),
    },
  ];

  return (
    <Box
      sx={{
        backgroundImage: `url(${BgImg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: {
          xs: "150px",
          sm: "200px",
          md: "250px",
          lg: "250px",
        },
        gap: {
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
        },
      }}
      className="flex flex-col items-center justify-center w-full mt-12"
    >
      <div className="flex gap-6">
        {linkItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-center rounded-full bg-blue700 !text-white shadow-md transition duration-300 w-6 sm:w-8 md:w-10 lg:w-12 h-6 sm:h-8 md:h-10 lg:h-12"
          >
            {item.icon}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Image
          src={LogoImg}
          alt="EduGuin Logo"
          width={40}
          height={40}
          className="object-contain"
        />
        <Typography
          className="!font-[900] text-blue700"
          sx={{
            fontSize: {
              xs: "15px",
              sm: "20px",
              md: "25px",
              lg: "30px",
            },
            fontFamily: "quicksand",
          }}
        >
          EduGuin
        </Typography>
      </div>
      <div className="flex flex-col justify-center text-center">
        <Typography
          className="text-blue700 font-500"
          sx={{
            fontFamily: "quicksand",
            fontSize: {
              xs: "10px",
              sm: "12px",
              md: "14px",
              lg: "16px",
            },
          }}
        >
          {t.footer.copyright}
        </Typography>
        <Typography
          className="text-blue700 font-500"
          sx={{
            fontFamily: "quicksand",
            fontSize: {
              xs: "10px",
              sm: "12px",
              md: "14px",
              lg: "16px",
            },
          }}
        >
          {t.footer.allRights}
        </Typography>
      </div>
    </Box>
  );
};

export default Footer;
