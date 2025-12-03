"use client";
import { CustomButton } from '@/components/Button';
import CustomInput from '@/components/Input';
import { useAuthStore } from '@/zustand/stores/AuthStore';
import { Box, Link, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const LoginPageView = () => {
  const imageUrl = 'https://res.cloudinary.com/dh2uwapb8/image/upload/v1763998645/fe/yjifhjaytvbt3fmxvdig.png';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { data, loading, error, login, clearError } = useAuthStore();
  const router = useRouter();

  const handleLogin = async () => {
    clearError();
    await login({ email, password });
  };

  const handleInputChange = (field: 'email' | 'password') =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (field === 'email') {
        setEmail(event.target.value);
      } else {
        setPassword(event.target.value);
      }
    };

  useEffect(() => {
    if (data?.accessToken && !loading) {
      router.push('/');
    }
  }, [data?.accessToken, loading, router]);
  return (

    <div className='flex flex-row h-screen overflow-hidden relative'>
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={clearError}
        sx={{ marginTop: '50px' }}
      >
        <Alert
          onClose={clearError}
          severity="error"
          sx={{
            width: '100%',
            backgroundColor: 'error.main',
            color: 'white',
            '& .MuiAlert-icon': { color: 'white' },
          }}
        >
          {error || 'Đăng nhập thất bại! Vui lòng kiểm tra lại email và mật khẩu'}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url('${imageUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: {
            xs: 0.05,
            sm: 0.05,
            md: 0,
            lg: 0,
          },
          zIndex: 0,
          display: {
            xs: 'block',
            sm: 'block',
            md: 'none',
            lg: 'none',
          },
        }}
      />
      <Box
        className='w-auto h-screen mx-auto'
        sx={{
          height: '100vh',
          backgroundImage: `url('${imageUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundBlendMode: 'overlay',
          aspectRatio: 800 / 1024,
          display: {
            xs: 'none',
            sm: 'none',
            md: 'flex',
            lg: 'flex',
          },
        }}
      ></Box>
      <div className='w-full flex flex-col h-screen justify-center items-center relative z-10' >
        <Box component='div' className='w-full flex flex-col justify-center items-center '
          sx={{
            width: {
              xs: '80%',
              sm: '80%',
              md: '50%',
              lg: '50%',
            },
            gap: {
              xs: 2,
              sm: 2,
              md: 5,
              lg: 5,
            },
          }}
        >
          <div className='w-full flex flex-col justify-center items-center '
            style={{
              gap: '10px'
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://res.cloudinary.com/dh2uwapb8/image/upload/v1763999309/fe/g5uy8ax9vwjidmvjz620.png"
              alt="logo"
              width={80}
              height={80}
              className='h-30 w-auto object-contain'
            />
            <Typography
              variant="h1"
              sx={{
                color: 'var(--color-primary600)',
                fontFamily: 'Sugar',
                fontSize: {
                  xs: '24px',
                  sm: '28px',
                  md: '32px',
                  lg: '42px',
                },
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: 'normal',
              }}
            >
              Chào mừng bạn quay trở lại
            </Typography>
          </div>
          <div className='w-full flex flex-col justify-center'
            style={{
              gap: '30px'
            }}
          >
            <CustomInput
              label='Email'
              type="email"
              value={email}
              onChange={handleInputChange('email')}
              name="email"
            />
            <CustomInput
              label='Mật khẩu'
              type="password"
              value={password}
              onChange={handleInputChange('password')}
              name="password"
            />
            <CustomButton
              type='Primary'
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </CustomButton>
          </div>
          <div>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '12px', sm: '14px' },
                textAlign: 'center',
                fontFamily: 'Quicksand',
              }}
            >
              Chưa có tài khoản? <Link href="/register">Đăng ký</Link>
            </Typography>
          </div>
        </Box>
      </div>
    </div>
  )
}

export default LoginPageView;