"use client";
import LogoImg from "../../assets/images/Logo-Photoroom.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/zustand/stores/AuthStore";
import { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useTranslation } from "@/i18n";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setHasMounted(true);
  }, []);


  const [mounted, setMounted] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const isAuthenticated = useAuthStore((state) => !!state.data.accessToken);
  const userRole = useAuthStore((state) => state.data.user?.role);
  const isTutor = userRole === "tutor";

  const navItems = [
    { href: "/", label: t.navbar.home, requireAuth: false, hideForTutor: false, showOnlyForTutor: false },
    { href: "/find-tutor", label: t.navbar.findTutor, requireAuth: true, hideForTutor: true, showOnlyForTutor: false },
    { href: "/my-classes", label: t.navbar.myClasses, requireAuth: true, hideForTutor: false, showOnlyForTutor: false },
    { href: "/class-subcribtion", label: t.navbar.classRequests, requireAuth: true, hideForTutor: false, showOnlyForTutor: true },
    { href: "/contact", label: t.navbar.contact, requireAuth: true, hideForTutor: false, showOnlyForTutor: false },
  ];

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter((item) => {
    // Ẩn với tutor nếu hideForTutor = true
    if (mounted && isTutor && item.hideForTutor) {
      return false;
    }
    // Chỉ hiện cho tutor nếu showOnlyForTutor = true
    if (mounted && item.showOnlyForTutor && !isTutor) {
      return false;
    }
    return true;
  });

  // Đợi client mount để tránh hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavClick = (e: React.MouseEvent, item: typeof navItems[0]) => {
    // Nếu là trang chủ hoặc đã đăng nhập thì cho phép điều hướng
    if (!item.requireAuth || (mounted && isAuthenticated)) {
      return; // Cho phép Link hoạt động bình thường
    }

    // Nếu chưa đăng nhập và cần auth, chặn điều hướng và hiện popup
    e.preventDefault();
    setShowLoginPopup(true);
  };

  const handleClosePopup = () => {
    setShowLoginPopup(false);
  };

  const handleGoToLogin = () => {
    setShowLoginPopup(false);
    router.push("/login");
  };

  const renderAuthButton = () => {
    if (!hasMounted) {
      return (
        <button
          className="!px-8 !py-2 h-[40px] bg-blue100 text-black rounded-full text-[10px] lg:text-[12px] font-semibold cursor-pointer"
          onClick={() => {
            router.push("/login");
          }}>
          Đăng nhập
        </button>
      );
    }

    if (isAuthenticated) {
      return (
        <button
          className="!px-8 !py-2 h-[40px] bg-blue100 text-black rounded-full text-[10px] lg:text-[12px] font-semibold cursor-pointer"
          style={{
            backgroundColor:
              pathname === "/profile" ? "white" : "var(--color-blue100)",
          }}
          onClick={() => {
            router.push("/profile");
          }}>
          Tài khoản
        </button>
      );
    }

    return (
      <button
        className="!px-8 !py-2 h-[40px] bg-blue100 text-black rounded-full text-[10px] lg:text-[12px] font-semibold cursor-pointer"
        onClick={() => {
          router.push("/login");
        }}>
        Đăng nhập
      </button>
    );
  };

  return (
    <>
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
            {filteredNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`px-8 py-2 text-black rounded-full transition flex justify-center items-center text-[10px] lg:text-[12px] font-semibold ${pathname === item.href
                  ? "bg-white  px-4"
                  : "bg-transparent  hover:bg-white/40"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {mounted && isAuthenticated ? (
            <button
              className="px-8 py-2 h-[40px] bg-blue100 text-black rounded-full text-[10px] lg:text-[12px] font-semibold cursor-pointer"
              style={{
                backgroundColor: pathname === "/profile" ? "white" : "var(--color-blue100)",
              }}
              onClick={() => {
                router.push("/profile");
              }}
            >
              {t.navbar.profile}
            </button>
          ) : (
            <button
              className="px-8 py-2 h-[40px] bg-blue100 text-black rounded-full text-[10px] lg:text-[12px] font-semibold cursor-pointer"
              onClick={() => {
                router.push("/login");
              }}
            >
              {t.common.login}
            </button>
          )}
        </div>
      </div>

      {/* Login Required Popup */}
      <Dialog
        open={showLoginPopup}
        onClose={handleClosePopup}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            padding: '8px',
            minWidth: '350px',
          }
        }}
      >
        <DialogTitle className="text-center font-quicksand font-bold text-blue700">
          {t.auth.login.noAccount?.replace('?', '') || 'Bạn chưa đăng nhập'}
        </DialogTitle>
        <DialogContent>
          <p className="text-center text-gray-600 font-quicksand">
            {t.auth.login.loginFailed ? 'Vui lòng đăng nhập để truy cập trang này.' : 'Vui lòng đăng nhập để truy cập trang này.'}
          </p>
        </DialogContent>
        <DialogActions className="justify-center gap-2 pb-4">
          <Button
            onClick={handleClosePopup}
            variant="outlined"
            color="inherit"
            sx={{ borderRadius: '20px', px: 3 }}
          >
            {t.common.cancel}
          </Button>
          <Button
            onClick={handleGoToLogin}
            variant="contained"
            sx={{
              borderRadius: '20px',
              px: 3,
              backgroundColor: 'var(--color-blue700)',
              '&:hover': {
                backgroundColor: 'var(--color-blue800)',
              }
            }}
          >
            {t.common.login}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
