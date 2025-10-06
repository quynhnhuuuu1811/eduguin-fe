"use client";
import React from "react";
import BgImg from "../assets/images/footer-bg.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Typography } from "@mui/material";

const Footer = () => {
  const pathname = usePathname();

  const linkItems = [
    { href: "/home", icon: <FacebookIcon fontSize="small" /> },
    { href: "/find-tutor", icon: <InstagramIcon fontSize="small" /> },
    { href: "/is-tutor", icon: <TwitterIcon fontSize="small" /> },
    { href: "/contact", icon: <YouTubeIcon fontSize="small" /> },
  ];

  return (
    <div
      style={{
        backgroundImage: `url(${BgImg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex flex-col items-center justify-center w-full h-[250px] gap-5"
    >
      <div className="flex gap-6">
        {linkItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue700 !text-white shadow-md transition duration-300"
          >
            {item.icon}
          </Link>
        ))}
      </div>
      <h3 className="!font-[900] text-blue700">Eduguin</h3>
      <div className="flex flex-col justify-center text-center">
        <p className="text-blue700 font-500">Copyright © 2025 EduGuin</p>
        <p className="text-blue700 font-500">
          All Rights Reserved. Developed By Qnhu
        </p>
      </div>
    </div>
  );
};

export default Footer;
