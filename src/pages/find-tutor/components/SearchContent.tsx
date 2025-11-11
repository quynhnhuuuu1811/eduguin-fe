import CustomInput from "@/components/Input";
import { Box, Typography, Grid } from "@mui/material";
import React from "react";
import TeacherCard from "./TeacherCard";

const SearchContent = () => {
  const teachers = [
    {
      name: "Nguyễn Văn A",
      subject: "Toán học",
      rating: 4.8,
      location: "Hà Nội",
      desciption:
        "Xin chào! Nếu bạn muốn luyện thi đại học và vào được ngôi trường đại học mơ ước, hãy liên hệ với tôi nhé!",
      cmt: 4,
      price: 500000,
      videoUrl: "https://www.youtube.com/watch?v=RFXrPwsV1kM",
    },
    {
      name: "Trần Thị B",
      subject: "Vật lý",
      rating: 4.6,
      location: "Hồ Chí Minh",
      desciption:
        "Xin chào! Nếu bạn muốn luyện thi đại học và vào được ngôi trường đại học mơ ước, hãy liên hệ với tôi nhé!",
      cmt: 5,
      price: 600000,
      videoUrl: "https://www.youtube.com/watch?v=RFXrPwsV1kM",
    },
    {
      name: "Lê Văn C",
      subject: "Hóa học",
      rating: 4.9,
      location: "Đà Nẵng",
      desciption:
        "Xin chào! Nếu bạn muốn luyện thi đại học và vào được ngôi trường đại học mơ ước, hãy liên hệ với tôi nhé!",
      cmt: 5,
      price: 450000,
      videoUrl: "https://www.youtube.com/watch?v=RFXrPwsV1kM",
    },
    {
      name: "Phạm Thị D",
      subject: "Sinh học",
      rating: 4.7,
      location: "Cần Thơ",
      desciption:
        "Xin chào! Nếu bạn muốn luyện thi đại học và vào được ngôi trường đại học mơ ước, hãy liên hệ với tôi nhé!",
      price: 550000,
      videoUrl: "https://www.youtube.com/watch?v=RFXrPwsV1kM",
    },
  ];

  const subjectOptions = [
    { value: "toan", label: "Toán học" },
    { value: "vatly", label: "Vật lý" },
    { value: "hoahoc", label: "Hóa học" },
    { value: "sinhhoc", label: "Sinh học" },
  ];

  const GradeOptions = [
    { value: "lop1", label: "Lớp 1" },
    { value: "lop2", label: "Lớp 2" },
    { value: "lop3", label: "Lớp 3" },
    { value: "lop4", label: "Lớp 4" },
    { value: "lop5", label: "Lớp 5" },
  ];

  const genderOptions = [
    { value: "male", label: "Nam" },
    { value: "female", label: "Nữ" },
    { value: "other", label: "Khác" },
  ];

  const ratingOptions = [
    { value: "4andup", label: "4 sao trở lên" },
    { value: "3andup", label: "3 sao trở lên" },
    { value: "2andup", label: "2 sao trở lên" },
    { value: "1andup", label: "1 sao trở lên" },
  ];

  const locationOptions = [
    { value: "hanoi", label: "Hà Nội" },
    { value: "hochiminh", label: "Hồ Chí Minh" },
    { value: "danang", label: "Đà Nẵng" },
    { value: "cantho", label: "Cần Thơ" },
  ];

  const sortOptions = [
    { value: "highestrated", label: "Giá thấp đến cao" },
    { value: "lowestpriced", label: "Giá cao đến thấp" },
    { value: "ratinghigh", label: "Đánh giá cao đến thấp" },
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
      }}
    >
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
        }}
      >
        {teachers.length} giáo viên đang chờ để được giúp bạn
        <Grid
          container
          spacing={{ xs: 1, sm: 1, md: 2, lg: 3 }}
          sx={{
            marginTop: {
              xs: "5px",
              sm: "10px",
              md: "5px",
              lg: "15px",
            },
          }}
        >
          <Grid item size={{ xs: 6, sm: 6, md: 4, lg: 3 }}>
            <CustomInput label="Môn học" select options={subjectOptions} />
          </Grid>
          <Grid item size={{ xs: 6, sm: 6, md: 4, lg: 3 }}>
            <CustomInput label="Lớp" select options={GradeOptions} />
          </Grid>
          <Grid item size={{ xs: 6, sm: 6, md: 4, lg: 3 }}>
            <CustomInput label="Giới tính" select options={genderOptions} />
          </Grid>
          <Grid item size={{ xs: 6, sm: 6, md: 4, lg: 3 }}>
            <CustomInput label="Được đánh giá" select options={ratingOptions} />
          </Grid>
          <Grid item size={{ xs: 6, sm: 6, md: 4, lg: 3 }}>
            <CustomInput label="Khu vực" select options={locationOptions} />
          </Grid>
          <Grid item size={{ xs: 6, sm: 6, md: 4, lg: 3 }}>
            <CustomInput label="Sắp xếp theo" select options={sortOptions} />
          </Grid>
        </Grid>
        {teachers.map((item, index) => (
          <TeacherCard teacher={item} />
        ))}
      </Typography>
    </Box>
  );
};

export default SearchContent;
