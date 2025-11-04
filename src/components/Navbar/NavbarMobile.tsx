"use client";
import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const NavbarMobile = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem
          className="!text-[12px] !font-[Quicksand] !font-semibold active:bg-gray-200"
          onClick={handleClose}
        >
          Trang chủ
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          className="!text-[12px] !font-[Quicksand] !font-semibold  active:bg-gray-200"
        >
          Tìm gia sư
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          className="!text-[12px] !font-[Quicksand] !font-semibold  active:bg-gray-200"
        >
          Tở thành gia sư
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          className="!text-[12px] !font-[Quicksand] !font-semibold  active:bg-gray-200"
        >
          Liên hệ
        </MenuItem>
      </Menu>
    </div>
  );
};

export default NavbarMobile;
