'use client';

import React, { useState } from 'react';
import { CircularProgress, Alert, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import CustomInput from '@/components/Input';
import { CustomButton } from '@/components/Button';
import { useAuthStore } from '@/zustand/stores/AuthStore';
import { useTranslation } from '@/i18n';

const AdminLoginPageView = () => {
  const router = useRouter();
  const { adminLogin, loading: authLoading, error: authError } = useAuthStore();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      setError(t.admin.login.fillInfo);
      return;
    }

    try {
      setError(null);
      await adminLogin({
        email: formData.email,
        password: formData.password,
      });
      router.push('/admin/tutor-apply');
    } catch {
      setError(t.admin.login.loginFailed);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dh2uwapb8/image/upload/v1765467161/fe/x4owoobcp6us115ms3fz.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Typography
            variant="h1"
            sx={{
              color: 'var(--color-blue600)',
              fontFamily: 'Sugar',
              fontSize: {
                xs: '24px',
                sm: '28px',
                md: '32px',
                lg: '42px',
              },
              fontStyle: 'normal',
              fontWeight: '600',
            }}
          >
            {t.admin.login.title.toUpperCase()}
          </Typography>
        </div>

        {/* Form */}
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6 flex flex-col gap-4">
          {(error || authError) && (
            <Alert severity="error" className="mb-4">
              {error || authError}
            </Alert>
          )}

          <CustomInput
            label={t.profile.email}
            name="email"
            value={formData.email}
            onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
          />

          <CustomInput
            label={t.auth.login.password}
            name="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
          />

          <CustomButton
            type="Primary"
            disabled={authLoading}
            onClick={handleSubmit}
            className='w-full text-center !bg-blue600'
          >
            {authLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t.common.login
            )}
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPageView;
