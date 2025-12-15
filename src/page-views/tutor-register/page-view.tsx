"use client";
import { Alert, Box, Link, Snackbar, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import CustomInput from '@/components/Input';
import { CustomButton } from '@/components/Button';
import { useAuthStore } from '@/zustand/stores/AuthStore';
import { useRouter } from 'next/navigation';
import { TutorApplyRequest } from '@/zustand/types/Auth';
import LoadingScreen from '@/components/LoadingScreen';
import { useSubjectStore } from '@/zustand/stores/SubjectStore';
import { useTranslation } from '@/i18n';

interface TutorRegisterFormData {
  email: string;
  fullName: string;
  dateOfBirth: string;
  sex: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  subjectId: string;
  grade: string;
  bio: string;
}

const TutorRegisterPageView = () => {
  const imageUrl = 'https://res.cloudinary.com/dh2uwapb8/image/upload/v1764762832/fe/xghioug67mqjrt3sdbls.png';
  const { tutorApply, loading } = useAuthStore();
  const { subjects, fetchAllSubjects } = useSubjectStore();
  const { t } = useTranslation();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const router = useRouter();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TutorRegisterFormData>({
    defaultValues: {
      email: '',
      fullName: '',
      dateOfBirth: '',
      sex: '',
      password: '',
      confirmPassword: '',
      displayName: '',
      subjectId: '',
      grade: '',
      bio: '',
    },
  });

  const password = watch('password');

  // Fetch subjects when component mounts
  useEffect(() => {
    fetchAllSubjects();
  }, [fetchAllSubjects]);

  if (loading) {
    return <LoadingScreen />;
  }

  const genderOptions = [
    { value: 'male', label: t.profile.male },
    { value: 'female', label: t.profile.female },
    { value: 'other', label: t.profile.other },
  ];

  const isEnglish = t.common.loading === 'Loading...';
  const gradeOptions = [
    { value: '1', label: isEnglish ? 'Grade 1' : 'Lớp 1' },
    { value: '2', label: isEnglish ? 'Grade 2' : 'Lớp 2' },
    { value: '3', label: isEnglish ? 'Grade 3' : 'Lớp 3' },
    { value: '4', label: isEnglish ? 'Grade 4' : 'Lớp 4' },
    { value: '5', label: isEnglish ? 'Grade 5' : 'Lớp 5' },
    { value: '6', label: isEnglish ? 'Grade 6' : 'Lớp 6' },
    { value: '7', label: isEnglish ? 'Grade 7' : 'Lớp 7' },
    { value: '8', label: isEnglish ? 'Grade 8' : 'Lớp 8' },
    { value: '9', label: isEnglish ? 'Grade 9' : 'Lớp 9' },
    { value: '10', label: isEnglish ? 'Grade 10' : 'Lớp 10' },
    { value: '11', label: isEnglish ? 'Grade 11' : 'Lớp 11' },
    { value: '12', label: isEnglish ? 'Grade 12' : 'Lớp 12' },
  ];

  // Convert subjects to options format
  const subjectOptions = subjects.map((subject) => ({
    value: subject.id,
    label: subject.name,
  }));

  const onSubmit = async (data: TutorRegisterFormData) => {
    try {
      const applyData: TutorApplyRequest = {
        email: data.email,
        fullName: data.fullName,
        dateOfBirth: data.dateOfBirth,
        displayName: data.displayName,
        sex: data.sex,
        password: data.password,
        confirmPassword: data.confirmPassword,
        subjectId: data.subjectId,
        grade: Number(data.grade),
        bio: data.bio,
      };

      await tutorApply(applyData);

      setSnackbar({
        open: true,
        message: t.auth.tutorRegister.success,
        severity: 'success',
      });

      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      setSnackbar({
        open: true,
        message: t.common.error,
        severity: 'error',
      });
    }
  };

  return (
    <>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>

      <div className='flex flex-row min-h-screen overflow-auto relative'
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
        <div className='w-full flex flex-col py-10 justify-center items-center relative z-10'>
          <Box
            component='div'
            className='w-full flex flex-col justify-center items-center'
            sx={{
              width: {
                xs: '90%',
                sm: '85%',
                md: '70%',
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
                {t.auth.tutorRegister.title}
              </Typography>
              <Typography
                sx={{
                  color: 'var(--color-gray600)',
                  fontFamily: 'Quicksand',
                  fontSize: { xs: '12px', sm: '14px' },
                  textAlign: 'center',
                }}
              >
                {t.auth.tutorRegister.subtitle}
              </Typography>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='w-full flex flex-col justify-center items-start'
              style={{ gap: '20px' }}
              noValidate
            >
              {/* Row 1: Email & Họ tên */}
              <div className='w-full flex flex-col md:flex-row justify-center items-start gap-5'>
                <div className='w-full md:w-1/2'>
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: t.validation.required,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t.validation.invalidEmail,
                      },
                    }}
                    render={({ field }) => (
                      <div>
                        <CustomInput
                          label={t.profile.email}
                          type="email"
                          value={field.value || ''}
                          onChange={field.onChange}
                          name="email"
                        />
                        {errors.email && (
                          <Typography sx={{ color: 'error.main', fontSize: '12px', mt: 0.5, ml: 1, fontFamily: 'Quicksand' }}>
                            {errors.email.message}
                          </Typography>
                        )}
                      </div>
                    )}
                  />
                </div>
                <div className='w-full md:w-1/2'>
                  <Controller
                    name="fullName"
                    control={control}
                    rules={{ required: t.validation.required }}
                    render={({ field }) => (
                      <div>
                        <CustomInput
                          label={t.profile.fullName}
                          type="text"
                          value={field.value || ''}
                          onChange={field.onChange}
                          name="fullName"
                        />
                        {errors.fullName && (
                          <Typography sx={{ color: 'error.main', fontSize: '12px', mt: 0.5, ml: 1, fontFamily: 'Quicksand' }}>
                            {errors.fullName.message}
                          </Typography>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>

              {/* Row 2: Ngày sinh & Giới tính */}
              <div className='w-full flex flex-col md:flex-row justify-center items-start gap-5'>
                <div className='w-full md:w-1/2'>
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    rules={{ required: t.validation.required }}
                    render={({ field }) => (
                      <div>
                        <CustomInput
                          label={t.profile.dateOfBirth}
                          type="date"
                          value={field.value || ''}
                          onChange={field.onChange}
                          name="dateOfBirth"
                        />
                        {errors.dateOfBirth && (
                          <Typography sx={{ color: 'error.main', fontSize: '12px', mt: 0.5, ml: 1, fontFamily: 'Quicksand' }}>
                            {errors.dateOfBirth.message}
                          </Typography>
                        )}
                      </div>
                    )}
                  />
                </div>
                <div className='w-full md:w-1/2'>
                  <Controller
                    name="sex"
                    control={control}
                    rules={{ required: t.validation.required }}
                    render={({ field }) => (
                      <div>
                        <CustomInput
                          label={t.profile.gender}
                          type="select"
                          value={field.value || ''}
                          onChange={field.onChange}
                          name="sex"
                          options={genderOptions}
                        />
                        {errors.sex && (
                          <Typography sx={{ color: 'error.main', fontSize: '12px', mt: 0.5, ml: 1, fontFamily: 'Quicksand' }}>
                            {errors.sex.message}
                          </Typography>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>

              {/* Row 3: Tên tài khoản & Môn dạy */}
              <div className='w-full flex flex-col md:flex-row justify-center items-start gap-5'>
                <div className='w-full md:w-1/2'>
                  <Controller
                    name="displayName"
                    control={control}
                    rules={{ required: t.validation.required }}
                    render={({ field }) => (
                      <div>
                        <CustomInput
                          label={isEnglish ? 'Display Name' : 'Tên tài khoản'}
                          type="text"
                          value={field.value || ''}
                          onChange={field.onChange}
                          name="displayName"
                        />
                        {errors.displayName && (
                          <Typography sx={{ color: 'error.main', fontSize: '12px', mt: 0.5, ml: 1, fontFamily: 'Quicksand' }}>
                            {errors.displayName.message}
                          </Typography>
                        )}
                      </div>
                    )}
                  />
                </div>
                <div className='w-full md:w-1/2'>
                  <Controller
                    name="subjectId"
                    control={control}
                    rules={{ required: t.validation.required }}
                    render={({ field }) => (
                      <div>
                        <CustomInput
                          label={t.auth.tutorRegister.subject}
                          type="select"
                          value={field.value || ''}
                          onChange={field.onChange}
                          name="subjectId"
                          options={subjectOptions}
                        />
                        {errors.subjectId && (
                          <Typography sx={{ color: 'error.main', fontSize: '12px', mt: 0.5, ml: 1, fontFamily: 'Quicksand' }}>
                            {errors.subjectId.message}
                          </Typography>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>

              {/* Row 4: Khối dạy & Giới thiệu bản thân */}
              <div className='w-full flex flex-col md:flex-row justify-center items-start gap-5'>
                <div className='w-full md:w-1/2'>
                  <Controller
                    name="grade"
                    control={control}
                    rules={{ required: t.validation.required }}
                    render={({ field }) => (
                      <div>
                        <CustomInput
                          label={t.auth.tutorRegister.grade}
                          type="select"
                          value={field.value || ''}
                          onChange={field.onChange}
                          name="grade"
                          options={gradeOptions}
                        />
                        {errors.grade && (
                          <Typography sx={{ color: 'error.main', fontSize: '12px', mt: 0.5, ml: 1, fontFamily: 'Quicksand' }}>
                            {errors.grade.message}
                          </Typography>
                        )}
                      </div>
                    )}
                  />
                </div>
                <div className='w-full md:w-1/2'>
                  <Controller
                    name="bio"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        label={t.auth.tutorRegister.bio}
                        type="text"
                        value={field.value || ''}
                        onChange={field.onChange}
                        name="bio"
                      />
                    )}
                  />
                </div>
              </div>

              {/* Submit button */}
              <div className='w-full flex flex-row justify-center gap-5 items-center'>
                <CustomButton type='Primary' onClick={handleSubmit(onSubmit)} className='w-full md:w-1/2'>
                  {t.auth.tutorRegister.submit}
                </CustomButton>
              </div>
            </form>

            {/* Login link */}
            <div className='w-full flex flex-col justify-center items-center'>
              <Typography
                variant="body1"
                sx={{
                  color: 'var(--color-primary500)',
                  fontSize: { xs: '12px', sm: '14px' },
                  textAlign: 'center',
                  fontFamily: 'Quicksand',
                }}
              >
                {t.auth.register.hasAccount} <Link href="/login" sx={{ fontWeight: 700 }}>{t.auth.register.loginNow}</Link>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'var(--color-primary500)',
                  fontSize: { xs: '12px', sm: '14px' },
                  textAlign: 'center',
                  fontFamily: 'Quicksand',
                  mt: 1,
                }}
              >
                {t.auth.tutorRegister.isStudent} <Link href="/register" sx={{ fontWeight: 700 }}>{t.auth.tutorRegister.registerStudent}</Link>
              </Typography>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
};

export default TutorRegisterPageView;
