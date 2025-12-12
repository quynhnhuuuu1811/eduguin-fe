'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import LogoutIcon from '@mui/icons-material/Logout';
import LanguageIcon from '@mui/icons-material/Language';
import { useAuthStore } from '@/zustand/stores/AuthStore';
import { useTranslation } from '@/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const AdminSidebar = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const user = useAuthStore((state) => state.data.user);
  const { t } = useTranslation();

  const navItems = [
    {
      label: t.admin.sidebar.tutorApproval,
      href: '/admin/tutor-apply',
      icon: <SupervisorAccountIcon />,
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
    localStorage.removeItem('admin_token');
    window.location.href = '/admin/login';
  };

  return (
    <aside className="w-64 min-h-screen bg-blue600 text-white flex flex-col rounded-r-2xl shadow-lg">
      {/* Logo / Brand */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <DashboardIcon />
          {mounted ? (user?.fullName || user?.name || 'Admin') : 'Admin'}
        </h1>
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
