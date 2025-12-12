"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import NavbarMobile from "./NavbarMobile";

export const ConditionalNavbar = () => {
  const pathname = usePathname();

  // Ẩn navbar trên trang admin
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  if (pathname === "/login") {
    return null;
  }

  if (pathname === "/register") {
    return null;
  }

  if (pathname === "/tutor-register") {
    return null;
  }

  return (
    <>
      <header className="fixed top-6 left-0 w-full z-50 hidden md:block">
        <Navbar />
      </header>
      <header className="fixed top-8 left-8 w-full z-50 md:hidden sm:block">
        <NavbarMobile />
      </header>
    </>
  );
};

