"use client";
import { CustomButton } from "../Button";
import LogoImg from "../../assets/images/Logo-Photoroom.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ensureNetwork } from "@/lib/eth";
import { getSignerAddress } from "@/lib/escrow";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  async function handleConnect() {
    try {
      await ensureNetwork("sepolia");
      const addr = await getSignerAddress();
      console.log("addr", addr);
    } catch (e: any) {}
  }
  const navItems = [
    { href: "/home", label: "Trang chủ" },
    { href: "/find-tutor", label: "Tìm gia sư" },
    { href: "/is-tutor", label: "Trở thành gia sư" },
    { href: "/contact", label: "Liên hệ" },
  ];

  return (
    <div className="flex w-full justify-center">
      <div className="flex items-center justify-center gap-5 w-fit px-6 py-3 rounded-full ">
        <div className="flex h-[40px] w-[70px] items-center justify-center bg-blue-100 rounded-full">
          <Image
            src={LogoImg}
            alt="logo"
            width={30}
            height={20}
            className="object-contain"
          />
        </div>

        <nav className="flex gap-4 bg-blue100 p-[5px] h-[40px] rounded-full">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-8 py-2 text-black rounded-full transition flex justify-center items-center text-[10px] lg:text-[12px] font-semibold ${
                pathname === item.href
                  ? "bg-white  px-4"
                  : "bg-transparent  hover:bg-white/40"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          className="!px-8 !py-2 h-[40px] bg-blue100 text-black rounded-full text-[10px] lg:text-[12px] font-semibold"
          onClick={() => {
            handleConnect();
          }}
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
};
