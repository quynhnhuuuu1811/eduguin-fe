"use client";

import React, { useMemo, useEffect, useState } from 'react';
import Info from './components/Info';
import CommentList from './components/CommentList';
import { useAuthStore } from '@/zustand/stores/AuthStore';
import LoadingScreen from '@/components/LoadingScreen';

const ProfilePageView = () => {
  const [mounted, setMounted] = useState(false);
  const { data: authData, getMyInfo } = useAuthStore();

  useEffect(() => {
    setMounted(true);
    getMyInfo();
  }, [getMyInfo]);

  const userInfo = useMemo(() => {
    if (!authData?.user) return undefined;
    return authData.user;
  }, [authData?.user]);

  // Wait for client-side mounting to avoid hydration mismatch
  if (!mounted || !userInfo) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <Info userInfo={userInfo} />
      {
        userInfo.role === "tutor" && (
          <CommentList tutorId={userInfo.id} />
        )
      }
    </div>
  );
};

export default ProfilePageView;
