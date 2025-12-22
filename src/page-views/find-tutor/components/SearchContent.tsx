"use client";

import CustomInput from "@/components/Input";
import { Box, Typography, GridLegacy as Grid } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import TeacherCard from "./TeacherCard";
import { useUserStore } from "@/zustand/stores/UserStore";
import LoadingScreen from "@/components/LoadingScreen";
import { useSubjectStore } from "@/zustand/stores/SubjectStore";
import { Subject } from "@/zustand/types/Subject";
import { CustomButton } from "@/components/Button";
import { useTranslation } from "@/i18n";

const SearchContent = () => {
  const { t } = useTranslation();
  const { fetchAllTutors, users, loading } = useUserStore();

  const {
    fetchAllSubjects,
    subjects,
    loading: subjectLoading,
  } = useSubjectStore();

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

  const subjectOptions = useMemo(
    () => [
      { value: "", label: t.findTutor.filters.subject === 'Subject' ? 'All' : 'Tất cả' },
      ...subjects.map((subject: Subject) => ({
        value: subject.id,
        label: subject.name,
      })),
    ],
    [subjects, t]
  );

  const handleFilterChange =
    (name: string) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters((prev) => ({
          ...prev,
          [name]: e.target.value,
        }));
      };

  const handleFilter = () => {
    fetchAllTutors({
      page: 1,
      limit: 1000000,
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

  const teachers = users ?? [];

  if (loading) {
    return <LoadingScreen />;
  }

  const allLabel = t.findTutor.filters.subject === 'Subject' ? 'All' : 'Tất cả';

  const GradeOptions = [
    { value: "", label: allLabel },
    { value: "1", label: t.findTutor.filters.grade === 'Grade' ? "Grade 1" : "Lớp 1" },
    { value: "2", label: t.findTutor.filters.grade === 'Grade' ? "Grade 2" : "Lớp 2" },
    { value: "3", label: t.findTutor.filters.grade === 'Grade' ? "Grade 3" : "Lớp 3" },
    { value: "4", label: t.findTutor.filters.grade === 'Grade' ? "Grade 4" : "Lớp 4" },
    { value: "5", label: t.findTutor.filters.grade === 'Grade' ? "Grade 5" : "Lớp 5" },
    { value: "6", label: t.findTutor.filters.grade === 'Grade' ? "Grade 6" : "Lớp 6" },
    { value: "7", label: t.findTutor.filters.grade === 'Grade' ? "Grade 7" : "Lớp 7" },
    { value: "8", label: t.findTutor.filters.grade === 'Grade' ? "Grade 8" : "Lớp 8" },
    { value: "9", label: t.findTutor.filters.grade === 'Grade' ? "Grade 9" : "Lớp 9" },
    { value: "10", label: t.findTutor.filters.grade === 'Grade' ? "Grade 10" : "Lớp 10" },
    { value: "11", label: t.findTutor.filters.grade === 'Grade' ? "Grade 11" : "Lớp 11" },
    { value: "12", label: t.findTutor.filters.grade === 'Grade' ? "Grade 12" : "Lớp 12" },
  ];

  const genderOptions = [
    { value: "", label: allLabel },
    { value: "male", label: t.profile.male },
    { value: "female", label: t.profile.female },
  ];

  const ratingOptions = [
    { value: "", label: allLabel },
    { value: "4", label: t.findTutor.filters.rating === 'Rating' ? "4 stars & up" : "4 sao trở lên" },
    { value: "3", label: t.findTutor.filters.rating === 'Rating' ? "3 stars & up" : "3 sao trở lên" },
    { value: "2", label: t.findTutor.filters.rating === 'Rating' ? "2 stars & up" : "2 sao trở lên" },
    { value: "1", label: t.findTutor.filters.rating === 'Rating' ? "1 star & up" : "1 sao trở lên" },
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
      {/* Chỉ để text trong Typography, không nhét Grid vào trong */}
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
        {teachers.length > 0
          ? t.findTutor.filters.subject === 'Subject'
            ? `${teachers.length} tutors are waiting to help you`
            : `${teachers.length} giáo viên đang chờ để được giúp bạn`
          : t.findTutor.noResults}
      </Typography>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-4 mt-4">
        <CustomInput
          label={t.findTutor.filters.subject}
          type="select"
          name="subject"
          value={filters.subject}
          onChange={handleFilterChange("subject")}
          options={subjectOptions}
        />
        <CustomInput
          label={t.findTutor.filters.grade}
          type="select"
          name="grade"
          value={filters.grade}
          onChange={handleFilterChange("grade")}
          options={GradeOptions}
        />
        <CustomInput
          label={t.profile.gender}
          type="select"
          name="gender"
          value={filters.gender}
          onChange={handleFilterChange("gender")}
          options={genderOptions}
        />
        <CustomInput
          label={t.findTutor.filters.rating}
          type="select"
          name="rating"
          value={filters.rating}
          onChange={handleFilterChange("rating")}
          options={ratingOptions}
        />
        <CustomButton
          type="Secondary"
          className="w-full! text-[14px]! md:text-[14px]! lg:text-[16px]!"
          onClick={() => handleFilter()}>
          {t.common.search}
        </CustomButton>
        <CustomButton
          type="SecondaryOutlined"
          className="w-full! text-[14px]! md:text-[14px]! lg:text-[16px]!"
          onClick={handleClearFilter}>
          {t.findTutor.filters.subject === 'Subject' ? 'Clear' : 'Xoá lọc'}
        </CustomButton>
      </div>
      {teachers.map((item, index) => (
        <TeacherCard key={index} teacher={item} />
      ))}
    </Box>
  );
};

export default SearchContent;
