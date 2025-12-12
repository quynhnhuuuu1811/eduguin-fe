"use client";
import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/zustand/stores/AuthStore";
import { useTranslation } from "@/i18n";

const NavbarMobile = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((state) => !!state.data.accessToken);
  const userRole = useAuthStore((state) => state.data.user?.role);
  const isTutor = userRole === "tutor";
  const { t } = useTranslation();

  const getNavItems = () => {
    if (!isAuthenticated) {
      return [
        { label: t.navbar.home, path: "/" },
        { label: t.navbar.findTutor, path: "/find-tutor" },
        { label: t.navbar.myClasses, path: "/my-classes" },
        { label: t.navbar.contact, path: "/contact" },
        { label: t.common.login, path: "/login" },
      ];
    }

    if (isTutor) {
      return [
        { label: t.navbar.home, path: "/" },
        { label: t.navbar.myClasses, path: "/my-classes" },
        { label: t.navbar.classRequests, path: "/class-subcribtion" },
        { label: t.navbar.contact, path: "/contact" },
        { label: t.navbar.profile, path: "/profile" },
      ];
    }

    return [
      { label: t.navbar.home, path: "/" },
      { label: t.navbar.findTutor, path: "/find-tutor" },
      { label: t.navbar.myClasses, path: "/my-classes" },
      { label: t.navbar.contact, path: "/contact" },
      { label: t.navbar.profile, path: "/profile" },
    ];
  };

  const navItems = getNavItems();
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
