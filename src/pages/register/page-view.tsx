"use client";
import { Alert, Box, Link, Snackbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import CustomInput from '@/components/Input';
import { CustomButton } from '@/components/Button';
import { useAuthStore } from '@/zustand/stores/AuthStore';
import { useRouter } from 'next/navigation';
import { RegisterRequest } from '@/zustand/types/Auth';

interface RegisterFormData {
  email: string;
  fullName: string;
  dateOfBirth: string;
  sex: string;
  password: string;
  confirmPassword: string;
  lookingFor: string;
  displayName: string;
}

const RegisterPageView = () => {
  const imageUrl = 'https://res.cloudinary.com/dh2uwapb8/image/upload/v1764762832/fe/xghioug67mqjrt3sdbls.png';
  const [step, setStep] = useState(1);
  const { register } = useAuthStore();
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      email: '',
      fullName: '',
      dateOfBirth: '',
      sex: '',
      password: '',
      confirmPassword: '',
      lookingFor: '',
      displayName: '',
    },
  });

  const password = watch('password');

  const genderOptions = [
    { value: 'male', label: 'Nam' },
    { value: 'female', label: 'Nữ' },
    { value: 'other', label: 'Khác' },
  ];

  const lookingForOptions = [
    { value: 'student', label: 'Học sinh' },
    { value: 'tutor', label: 'Gia sư' },
  ];

  const onNext = async () => {
    const isValid = await trigger(['email', 'fullName', 'dateOfBirth', 'displayName', 'sex']);
    if (isValid) {
      setStep(2);
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    // Validate step 2 fields
    const isValid = await trigger(['password', 'confirmPassword', 'lookingFor']);
    if (isValid) {
      try {
        // Get all form values to ensure we have all data
        const allValues = getValues();
        const registerData: RegisterRequest = {
          email: allValues.email || data.email,
          fullName: allValues.fullName || data.fullName,
          dateOfBirth: allValues.dateOfBirth || data.dateOfBirth,
          displayName: allValues.displayName || data.displayName,
          sex: allValues.sex || data.sex,
          password: allValues.password || data.password,
          confirmPassword: allValues.confirmPassword || data.confirmPassword,
          role: data.lookingFor === 'student' ? 'tutor' : 'student',
        };
        console.log('Registering with data:', registerData);
        await register(registerData);
        // Redirect to login or home page after successful registration
        setOpen(true);
        setTimeout(() => {
          router.push('/login');
        }, 1000);
      } catch (error) {
        console.error('Registration error:', error);
      }
    }
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success">Đăng ký thành công! Vui lòng đăng nhập để tiếp tục</Alert>
      </Snackbar>
      <div className='flex flex-row h-screen overflow-hidden relative'
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-white opacity-90 z-0'></div>
        {/* Form section */}
        <div className='w-full flex flex-col h-screen justify-center items-center relative z-10'>
          <Box
            component='div'
            className='w-full flex flex-col justify-center items-center'
            sx={{
              width: {
                xs: '80%',
                sm: '80%',
                md: '60%',
                lg: '60%',
              },
              gap: {
                xs: 2,
                sm: 2,
                md: 3,
                lg: 3,
              },
            }}
          >
            {/* Logo và title */}
            <div className='w-full flex flex-col justify-center items-center' style={{ gap: '10px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://res.cloudinary.com/dh2uwapb8/image/upload/v1763999309/fe/g5uy8ax9vwjidmvjz620.png"
                alt="logo"
                width={50}
                height={50}
                className='h-20 w-auto object-contain'
              />
              <Typography
                variant="h1"
                sx={{
                  color: 'var(--color-blue600)',
                  fontFamily: 'Sugar',
                  fontSize: {
                    xs: '18px',
                    sm: '23px',
                    md: '28px',
                    lg: '35px',
                  },
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: 'normal',
                  textAlign: 'center',
                }}
              >
                Trở thành bạn mới của tớ nhé!
              </Typography>
            </div>

            {/* Form */}
            <form
              onSubmit={step === 1 ? handleSubmit(onNext) : handleSubmit(onSubmit)}
              className='w-full flex flex-col justify-center items-start'
              style={{ gap: '20px' }}
              noValidate
            >
              <div className='w-full flex flex-row justify-center items-start' style={{ gap: '20px' }}>
                <div className='w-full md:w-1/2 flex flex-col justify-center' style={{ gap: '20px' }}>
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: 'Email là bắt buộc',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email không hợp lệ',
                      },
                    }}
                    render={({ field }) => (
                      <div>
                        <CustomInput
                          label='Email'
                          type="email"
                          value={field.value || ''}
                          onChange={field.onChange}
                          name="email"
                        />
                        {errors.email && (
                          <Typography
                            sx={{
                              color: 'error.main',
                              fontSize: { xs: '10px', sm: '12px' },
                              mt: 0.5,
                              ml: 1,
                              fontFamily: 'Quicksand',
                            }}
                          >
                            {errors.email.message}
                          </Typography>
                        )}
                      </div>
                    )}
                  />

                  <Controller
                    name="fullName"
                    control={control}
                    rules={{ required: 'Họ tên là bắt buộc' }}
                    render={({ field }) => (
                      <div>
                        <CustomInput
                          label='Họ tên'
                          type="text"
                          value={field.value || ''}
                          onChange={field.onChange}
                          name="fullName"
                        />
                        {errors.fullName && (
                          <Typography
                            sx={{
                              color: 'error.main',
                              fontSize: { xs: '10px', sm: '12px' },
                              mt: 0.5,
                              ml: 1,
                              fontFamily: 'Quicksand',
                            }}
                          >
                            {errors.fullName.message}
                          </Typography>
                        )}
                      </div>
                    )}
                  />

                  <Controller
                    name="dateOfBirth"
                    control={control}
                    rules={{ required: 'Ngày sinh là bắt buộc' }}
                    render={({ field }) => (
                      <div>
                        <CustomInput
                          label='Ngày sinh'
                          type="date"
                          value={field.value || ''}
                          onChange={field.onChange}
                          name="dateOfBirth"
                        />
                        {errors.dateOfBirth && (
                          <Typography
                            sx={{
                              color: 'error.main',
                              fontSize: { xs: '10px', sm: '12px' },
                              mt: 0.5,
                              ml: 1,
                              fontFamily: 'Quicksand',
                            }}
                          >
                            {errors.dateOfBirth.message}
                          </Typography>
                        )}
                      </div>
                    )}
                  />

                  <Controller
                    name="displayName"
                    control={control}
                    rules={{ required: 'Tên tài khoản là bắt buộc' }}
                    render={({ field }) => (
                      <div>
                        <CustomInput
                          label='Tên tài khoản'
                          type="text"
                          value={field.value || ''}
                          onChange={field.onChange}
                          name="displayName"
                        />
                        {errors.username && (
                          <Typography
                            sx={{
                              color: 'error.main',
                              fontSize: { xs: '10px', sm: '12px' },
                              mt: 0.5,
                              ml: 1,
                              fontFamily: 'Quicksand',
                            }}
                          >
                            {errors.username.message}
                          </Typography>
                        )}
                      </div>
                    )}
                  />
                </div>

                {/* Step 2 */}
                <div className='w-full md:w-1/2 flex flex-col justify-center' style={{ gap: '20px' }}>
                  <Controller
                    name="sex"
                    control={control}
                    rules={{ required: 'Giới tính là bắt buộc' }}
                    render={({ field }) => (
                      <div>
                        <CustomInput
                          label='Giới tính'
                          type="select"
                          value={field.value || ''}
                          onChange={field.onChange}
                          name="sex"
                          options={genderOptions}
                        />
                        {errors.sex && (
                          <Typography
                            sx={{
                              color: 'error.main',
                              fontSize: { xs: '10px', sm: '12px' },
                              mt: 0.5,
                              ml: 1,
                              fontFamily: 'Quicksand',
                            }}
                          >
                            {errors.sex.message}
                          </Typography>
                        )}
                      </div>
                    )}
                  />
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: 'Mật khẩu là bắt buộc',
                      minLength: {
                        value: 6,
                        message: 'Mật khẩu phải có ít nhất 6 ký tự',
                      },
                    }}
                    render={({ field }) => (
                      <div>
                        <CustomInput
                          label='Mật khẩu'
                          type="password"
                          value={field.value || ''}
                          onChange={field.onChange}
                          name="password"
                        />
                        {errors.password && (
                          <Typography
                            sx={{
                              color: 'error.main',
                              fontSize: { xs: '10px', sm: '12px' },
                              mt: 0.5,
                              ml: 1,
                              fontFamily: 'Quicksand',
                            }}
                          >
                            {errors.password.message}
                          </Typography>
                        )}
                      </div>
                    )}
                  />

                  <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{
                      required: 'Nhập lại mật khẩu là bắt buộc',
                      validate: (value) =>
                        value === password || 'Mật khẩu không khớp',
                    }}
                    render={({ field }) => (
                      <div>
                        <CustomInput
                          label='Nhập lại mật khẩu'
                          type="password"
                          value={field.value || ''}
                          onChange={field.onChange}
                          name="confirmPassword"
                        />
                        {errors.confirmPassword && (
                          <Typography
                            sx={{
                              color: 'error.main',
                              fontSize: { xs: '10px', sm: '12px' },
                              mt: 0.5,
                              ml: 1,
                              fontFamily: 'Quicksand',
                            }}
                          >
                            {errors.confirmPassword.message}
                          </Typography>
                        )}
                      </div>
                    )}
                  />

                  <Controller
                    name="lookingFor"
                    control={control}
                    rules={{ required: 'Vui lòng chọn vai trò' }}
                    render={({ field }) => (
                      <div>
                        <CustomInput
                          label='Bạn đang tìm kiếm'
                          type="select"
                          value={field.value || ''}
                          onChange={field.onChange}
                          name="lookingFor"
                          options={lookingForOptions}
                        />
                        {errors.lookingFor && (
                          <Typography
                            sx={{
                              color: 'error.main',
                              fontSize: { xs: '10px', sm: '12px' },
                              mt: 0.5,
                              ml: 1,
                              fontFamily: 'Quicksand',
                            }}
                          >
                            {errors.lookingFor.message}
                          </Typography>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className='w-full flex flex-row justify-center gap-5 items-center' style={{ gap: '10px' }}>
                <CustomButton type='Primary' onClick={handleSubmit(onSubmit)} className='w-1/2'>
                  Đăng ký
                </CustomButton>
              </div>
            </form>

            {/* Login link */}
            <div className='w-full flex flex-col justify-center items-center -mt-5'>
              <Typography
                variant="body1"
                sx={{
                  color: 'var(--color-primary500)',
                  fontSize: { xs: '12px', sm: '14px' },
                  textAlign: 'center',
                  fontFamily: 'Quicksand',
                }}
              >
                Bạn đã có tài khoản? <Link href="/login" sx={{ fontWeight: 700 }}>Đăng nhập ngay</Link>
              </Typography>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
};

export default RegisterPageView;
