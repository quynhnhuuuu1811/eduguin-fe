'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ArticleIcon from '@mui/icons-material/Article';
import LogoutIcon from '@mui/icons-material/Logout';
import LanguageIcon from '@mui/icons-material/Language';
import { useAuthStore } from '@/zustand/stores/AuthStore';
import { useTranslation } from '@/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import LogoImg from '@/assets/images/Logo-Photoroom.png';

const AdminSidebar = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { data: { user }, logout } = useAuthStore();
  const { t } = useTranslation();

  const isEnglish = t.common.loading === "Loading...";

  const navItems = [
    {
      label: t.admin.sidebar.tutorApproval,
      href: '/admin/tutor-apply',
      icon: <SupervisorAccountIcon />,
    },
    {
      label: isEnglish ? 'Blog Approval' : 'Kiểm duyệt blog',
      href: '/admin/blogs',
      icon: <ArticleIcon />,
    },
    {
      label: t.admin.sidebar.teacherManagement,
      href: '/admin/teachers',
      icon: <SchoolIcon />,
    },
    {
      label: t.admin.sidebar.studentManagement,
      href: '/admin/students',
      icon: <PersonIcon />,
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = '/admin/login';
  };

  return (
    <aside className="w-64 min-h-screen bg-blue600 text-white flex flex-col rounded-r-2xl shadow-lg">
      {/* Logo / Brand */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-full p-2">
            <Image
              src={LogoImg}
              alt="EduGuin Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold">EduGuin</h1>
            <p className="text-xs text-slate-300">
              {mounted ? (user?.fullName || user?.name || 'Admin') : 'Admin'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive
                      ? 'bg-blue700 text-white font-semibold'
                      : 'text-white hover:bg-white/20 hover:text-white'
                    }
                  `}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Language Switcher */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 px-4 py-2">
          <LanguageIcon className="text-slate-300" />
          <LanguageSwitcher size="small" isDark />
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-slate-300 hover:bg-red-600 hover:text-white transition-colors"
        >
          <LogoutIcon />
          <span>{t.admin.sidebar.logout}</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
