"use client";

import React, { useMemo, useEffect } from 'react';
import Info from './components/Info';
import { StudentResponse, UserResponse } from '@/zustand/types/User';
import { CourseData, TeachingCourseData } from './components/CourseList';
import { CommentData } from './components/CommentList';
import { useUserStore } from '@/zustand/stores/UserStore';
import { useAuthStore } from '@/zustand/stores/AuthStore';
import LoadingScreen from '@/components/LoadingScreen';

interface UserInfo {
  data: {
    data: UserResponse;
  };
}

const ProfilePageView = () => {
  const { data: authData, getMyInfo } = useAuthStore();

  const userInfo: UserInfo | undefined = useMemo(() => {
    if (!authData?.user) return undefined;
    return {
      data: {
        data: authData.user,
      },
    } as UserInfo;
  }, [authData?.user]);

  console.log(userInfo);

  useEffect(() => {
    getMyInfo();
  }, []);

  const studentCourses: CourseData[] = useMemo(() => [
    {
      id: "1",
      teacherName: "Nguyễn Thị",
      subject: "Toán",
      className: "Lớp Toán 10",
      status: "completed",
      registrationDate: "2024-01-15",
    },
    {
      id: "2",
      teacherName: "Trần Thị C",
      subject: "Vật lý",
      className: "Lớp Vật lý 11",
      status: "pending",
      registrationDate: "2024-02-01",
    },
    {
      id: "3",
      teacherName: "Phan Văn E",
      subject: "Hóa học",
      className: "Lớp Hóa học 12",
      status: "completed",
      registrationDate: "2024-01-20",
    },
  ], []);

  // Mock data cho danh sách khóa dạy (tutor)
  const teachingCourses: TeachingCourseData[] = useMemo(() => [
    {
      id: "1",
      courseName: "Tên khoá học",
      teachingHours: [
        { day: "2", time: "6h - 8h" },
        { day: "4", time: "7h - 9h" },
        { day: "7", time: "6h - 8h" },
      ],
      studentCount: 5,
      status: "completed",
    },
    {
      id: "2",
      courseName: "Tên khoá học",
      teachingHours: [
        { day: "1", time: "8h - 10h" },
        { day: "3", time: "14h - 16h" },
      ],
      studentCount: 3,
      status: "completed",
    },
  ], []);

  // Mock data cho danh sách bình luận (tutor)
  const comments: CommentData[] = useMemo(() => [
    {
      id: "1",
      userName: "Trần Thị C",
      rating: 5,
      comment: "Giảng hay!",
      reviewDate: "2024-01-20",
    },
    {
      id: "2",
      userName: "Phan Văn E",
      rating: 4,
      comment: "Giảng tội Thường xuyên bỏ buổi và vào lớp trẻ giờ",
      reviewDate: "2024-02-15",
    },
  ], []);

  const rating = 4.7;

  if (!userInfo) {
    return <div><LoadingScreen /></div>;
  }

  return (
    <div>
      <Info userInfo={userInfo} />
    </div>
  );
};

export default ProfilePageView;