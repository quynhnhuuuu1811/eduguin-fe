"use client";

import Table from "@/components/Table";
import { ColumnData } from "@/components/Table";
import dayjs from "dayjs";

export interface CourseData extends Record<string, unknown> {
  id: string;
  teacherName: string;
  subject: string;
  className: string;
  status: string;
  registrationDate: string;
}

export interface TeachingCourseData extends Record<string, unknown> {
  id: string;
  courseName: string;
  teachingHours: { day: string; time: string }[];
  studentCount: number;
  status: string;
}

interface CourseListProps {
  isTutor: boolean;
  studentCourses?: CourseData[];
  teachingCourses?: TeachingCourseData[];
}

const CourseList = ({ isTutor, studentCourses = [], teachingCourses = [] }: CourseListProps) => {
  // Columns cho bảng khóa học của student
  const studentCourseColumns: ColumnData<CourseData>[] = [
    {
      label: "Giáo viên",
      dataKey: "teacherName",
      align: "left",
      width: 150,
    },
    {
      label: "Môn học",
      dataKey: "subject",
      align: "left",
      width: 120,
    },
    {
      label: "Lớp học",
      dataKey: "className",
      align: "left",
      width: 150,
    },
    {
      label: "Trạng thái",
      dataKey: "status",
      align: "center",
      width: 130,
      render: (value: unknown) => {
        const statusMap: Record<string, { label: string; color: string }> = {
          pending: { label: "Đang diễn ra", color: "var(--color-primary500)" },
          completed: { label: "Đã kết thúc", color: "var(--color-red600)" },
        };
        const status = statusMap[value as string] || { label: value as string, color: "#666" };
        return (
          <span style={{ color: status.color, fontWeight: 600, fontSize: "12px" }}>
            {status.label}
          </span>
        );
      },
    },
    {
      label: "Ngày đăng ký",
      dataKey: "registrationDate",
      align: "left",
      width: 150,
      render: (value: unknown) => {
        if (!value) return "-";
        return dayjs(value as string).format("DD/MM/YYYY");
      },
    },
  ];

  // Columns cho bảng khóa dạy của tutor
  const teachingCourseColumns: ColumnData<TeachingCourseData>[] = [
    {
      label: "Tên khoá học",
      dataKey: "courseName",
      align: "left",
      width: 200,
    },
    {
      label: "Giờ dạy",
      dataKey: "teachingHours",
      align: "left",
      width: 250,
      render: (value: unknown) => {
        const hours = Array.isArray(value) ? (value as { day: string; time: string }[]) : [];
        if (hours.length === 0) return "-";
        const dayMap: Record<string, string> = {
          "1": "Thứ hai",
          "2": "Thứ ba",
          "3": "Thứ tư",
          "4": "Thứ năm",
          "5": "Thứ sáu",
          "6": "Thứ bảy",
          "7": "Chủ nhật",
        };
        return (
          <div className="flex flex-col gap-1">
            {hours.map((item, idx) => (
              <span key={idx} style={{ fontSize: "12px" }}>
                {dayMap[item.day] || item.day} {item.time}
              </span>
            ))}
          </div>
        );
      },
    },
    {
      label: "Số học sinh",
      dataKey: "studentCount",
      align: "center",
      width: 120,
    },
    {
      label: "Tình trạng",
      dataKey: "status",
      align: "center",
      width: 130,
      render: (value: unknown) => {
        const statusMap: Record<string, { label: string; color: string }> = {
          pending: { label: "Đang diễn ra", color: "var(--color-primary500)" },
          completed: { label: "Đã kết thúc", color: "var(--color-red600)" },
        };
        const status = statusMap[value as string] || { label: value as string, color: "#666" };
        return (
          <span style={{ color: status.color, fontWeight: 600, fontSize: "12px" }}>
            {status.label}
          </span>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-5 text-black font-quicksand mt-10 w-full">
      <h3 className="font-bold text-[15px] md:text-[20px] lg:text-[20px]">
        {isTutor ? "Danh sách khoá dạy" : "Danh sách khoá học"}
      </h3>
      <div className="w-full">
        {isTutor ? (
          <Table<TeachingCourseData>
            columns={teachingCourseColumns}
            data={teachingCourses}
            height={400}
            getRowId={(row) => row.id}
          />
        ) : (
          <Table<CourseData>
            columns={studentCourseColumns}
            data={studentCourses}
            height={400}
            getRowId={(row) => row.id}
          />
        )}
      </div>
    </div>
  );
};

export default CourseList;

