"use client";
import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/zustand/stores/AuthStore";

const NavbarMobile = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((state) => !!state.data.accessToken);

  const navItems = isAuthenticated ? [
    { label: "Trang chủ", path: "/" },
    { label: "Tìm gia sư", path: "/find-tutor" },
    { label: "Lớp học của tôi", path: "/my-classes" },
    { label: "Liên hệ", path: "/contact" },
    { label: "Tài khoản", path: "/profile" },
  ] : [
    { label: "Trang chủ", path: "/" },
    { label: "Tìm gia sư", path: "/find-tutor" },
    { label: "Lớp học của tôi", path: "/my-classes" },
    { label: "Liên hệ", path: "/contact" },
    { label: "Đăng nhập", path: "/login" },
  ];
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    handleClose();
    router.push(path);
  };



  return (
    <div>
      <div
        onClick={handleClick}
        className="w-10 h-10 bg-primary500 rounded-full flex items-center justify-center shadow-md cursor-pointer active:bg-primary200"
      >
        <MenuRoundedIcon className="text-white" />
      </div>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        marginThreshold={0}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <MenuItem
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              className={`!text-[12px] !font-[Quicksand] active:bg-gray-200 ${isActive ? "!font-bold text-primary500" : "!font-semibold"
                }`}
            >
              {item.label}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default NavbarMobile;
