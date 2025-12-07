"use client";
import CustomInput from "@/components/Input";
import { Box, Typography, Grid, Button } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import TeacherCard from "./TeacherCard";
import { useUserStore } from "@/zustand/stores/UserStore";
import LoadingScreen from "@/components/LoadingScreen";
import { useSubjectStore } from "@/zustand/stores/SubjectStore";
import { Subject } from "@/zustand/types/Subject";
import { CustomButton } from "@/components/Button";

const SearchContent = () => {
  const { fetchAllTutors, users, loading } = useUserStore();

  const { fetchAllSubjects, subjects, loading: subjectLoading } = useSubjectStore();

  useEffect(() => {
    fetchAllSubjects();
  }, [fetchAllSubjects]);

  // Filter state
  const [filters, setFilters] = useState({
    subject: "",
    grade: "",
    gender: "",
    rating: "",
  });

  const subjectOptions = useMemo(() => [
    { value: "", label: "Tất cả" },
    ...subjects.map((subject: Subject) => ({
      value: subject.id,
      label: subject.name,
    }))
  ], [subjects]);

  const handleFilterChange = (name: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const handleFilter = () => {
    fetchAllTutors({
      page: 1,
      limit: 10,
      ...(filters.subject && { subject: filters.subject }),
      ...(filters.grade && { grade: Number(filters.grade) }),
      ...(filters.gender && { sex: filters.gender }),
      ...(filters.rating && { minRating: Number(filters.rating) }),
    });
  };

  const handleClearFilter = () => {
    setFilters({
      subject: "",
      grade: "",
      gender: "",
      rating: "",
    });
    fetchAllTutors({
      page: 1,
      limit: 10,
    });
  };

  useEffect(() => {
    fetchAllTutors({
      page: 1,
      limit: 10,
    });
  }, [fetchAllTutors]);

  const teachers = users;

  if (loading) {
    return <LoadingScreen />;
  }

  const GradeOptions = [
    { value: "", label: "Tất cả" },
    { value: "1", label: "Lớp 1" },
    { value: "2", label: "Lớp 2" },
    { value: "3", label: "Lớp 3" },
    { value: "4", label: "Lớp 4" },
    { value: "5", label: "Lớp 5" },
    { value: "6", label: "Lớp 6" },
    { value: "7", label: "Lớp 7" },
    { value: "8", label: "Lớp 8" },
    { value: "9", label: "Lớp 9" },
    { value: "10", label: "Lớp 10" },
    { value: "11", label: "Lớp 11" },
    { value: "12", label: "Lớp 12" },
  ];

  const genderOptions = [
    { value: "", label: "Tất cả" },
    { value: "male", label: "Nam" },
    { value: "female", label: "Nữ" },
  ];

  const ratingOptions = [
    { value: "", label: "Tất cả" },
    { value: "4", label: "4 sao trở lên" },
    { value: "3", label: "3 sao trở lên" },
    { value: "2", label: "2 sao trở lên" },
    { value: "1", label: "1 sao trở lên" },
  ];


  return (
    <Box
      className="w-full"
      sx={{
        paddingInline: {
          xs: "20px",
          sm: "80px",
          md: "100px",
          lg: "135px",
        },
      }}>
      <Typography
        sx={{
          fontFamily: "quicksand",
          fontSize: {
            xs: "10px",
            sm: "15px",
            md: "10px",
            lg: "25px",
          },
          fontWeight: 600,
        }}>
        {teachers.length > 0 ? `${teachers.length} giáo viên đang chờ để được giúp bạn` : "Không có kết quả"}
      </Typography>
      <div
        className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-4 mt-4"
      >
        <CustomInput
          label="Môn học"
          type="select"
          name="subject"
          value={filters.subject}
          onChange={handleFilterChange("subject")}
          options={subjectOptions}
        />
        <CustomInput
          label="Lớp"
          type="select"
          name="grade"
          value={filters.grade}
          onChange={handleFilterChange("grade")}
          options={GradeOptions}
        />
        <CustomInput
          label="Giới tính"
          type="select"
          name="gender"
          value={filters.gender}
          onChange={handleFilterChange("gender")}
          options={genderOptions}
        />
        <CustomInput
          label="Được đánh giá"
          type="select"
          name="rating"
          value={filters.rating}
          onChange={handleFilterChange("rating")}
          options={ratingOptions}
        />
        <CustomButton type="Secondary" className="w-full! text-[14px]! md:text-[14px]! lg:text-[16px]!" onClick={() => handleFilter()}>
          Lọc
        </CustomButton>
        <CustomButton type="SecondaryOutlined" className="w-full! text-[14px]! md:text-[14px]! lg:text-[16px]!" onClick={handleClearFilter}>
          Xoá lọc
        </CustomButton>
      </div>
      {teachers.map((item, index) => (
        <TeacherCard key={index} teacher={item} />
      ))}
    </Box>
  );
};

export default SearchContent;
