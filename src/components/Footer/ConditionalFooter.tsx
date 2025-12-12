"use client";
import { usePathname } from "next/navigation";
import Footer from "../Footer";

export const ConditionalFooter = () => {
  const pathname = usePathname();

  // Ẩn footer trên trang admin
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

  return <Footer />;
};

