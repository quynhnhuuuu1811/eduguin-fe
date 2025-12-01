"use client";
import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useRouter, usePathname } from "next/navigation";

const NavbarMobile = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const pathname = usePathname();

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

  const navItems = [
    { label: "Trang chủ", path: "/home" },
    { label: "Tìm gia sư", path: "/find-tutor" },
    { label: "Gia sư của tôi", path: "/my-tutor" },
    { label: "Liên hệ", path: "/contact" },
  ];

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
              className={`!text-[12px] !font-[Quicksand] active:bg-gray-200 ${
                isActive ? "!font-bold text-primary500" : "!font-semibold"
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
