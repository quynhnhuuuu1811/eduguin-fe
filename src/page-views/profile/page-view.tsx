"use client";

import React, { useMemo, useEffect } from 'react';
import Info from './components/Info';
import CommentList from './components/CommentList';
import { useAuthStore } from '@/zustand/stores/AuthStore';
import LoadingScreen from '@/components/LoadingScreen';

const ProfilePageView = () => {
  const { data: authData, getMyInfo } = useAuthStore();

  useEffect(() => {
    getMyInfo();
  }, [getMyInfo]);
  console.log(111, authData);

  const userInfo = useMemo(() => {
    if (!authData?.user) return undefined;
    return authData.user;
  }, [authData?.user]);

  if (!userInfo) {
    return <div><LoadingScreen /></div>;
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