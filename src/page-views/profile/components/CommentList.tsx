"use client";

import Table from "@/components/Table";
import { ColumnData } from "@/components/Table";
import dayjs from "dayjs";
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import { useCommentStore } from "@/zustand/stores/CommentStore";
import { useEffect, useMemo } from "react";
import Image from "next/image";

interface CommentData {
  id: string;
  content: string;
  rating: number;
  createdAt: string;
  student: {
    id: string;
    name: string;
    avatar: string | null;
  };
  [key: string]: unknown;
}

interface CommentListProps {
  tutorId: string;
}

const CommentList = ({ tutorId }: CommentListProps) => {
  const { getListCmtByTutorID, comments } = useCommentStore();

  const commentList = useMemo(() => comments as CommentData[], [comments]);

  const commentColumns: ColumnData<CommentData>[] = [
    {
      label: "Học sinh",
      dataKey: "student",
      align: "left",
      width: 150,
      render: (value: unknown) => {
        const student = value as CommentData["student"];
        return (
          <div className="flex items-center gap-2">
            {student?.avatar ? (
              <Image
                src={student.avatar}
                alt={student.name || "Avatar"}
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue100 flex items-center justify-center text-blue700 font-bold text-sm">
                {student?.name?.charAt(0)?.toUpperCase() || "?"}
              </div>
            )}
            <span className="font-medium">{student?.name || "Ẩn danh"}</span>
          </div>
        );
      },
    },
    {
      label: "Đánh giá",
      dataKey: "rating",
      align: "center",
      width: 120,
      render: (value: unknown) => (
        <div className="flex items-center justify-center gap-1">
          <span className="font-semibold">{value as number}</span>
          <StarRateRoundedIcon sx={{ color: 'var(--color-yellow500)', fontSize: 18 }} />
        </div>
      ),
    },
    {
      label: "Nội dung",
      dataKey: "content",
      align: "left",
      width: 300,
      render: (value: unknown) => (
        <p className="text-gray-700 line-clamp-2">{value as string}</p>
      ),
    },
    {
      label: "Ngày đăng",
      dataKey: "createdAt",
      align: "center",
      width: 120,
      render: (value: unknown) => (
        <span className="text-gray-500 text-sm">
          {dayjs(value as string).format("DD/MM/YYYY")}
        </span>
      ),
    },
  ];

  useEffect(() => {
    getListCmtByTutorID(tutorId);
  }, [getListCmtByTutorID, tutorId]);

  return (
    <div className="flex flex-col gap-5 text-black font-quicksand mt-10 w-full max-w-[90%] mx-auto">
      <h3 className="font-bold text-[15px] md:text-[20px] lg:text-[20px]">
        Danh sách bình luận ({commentList.length})
      </h3>
      {commentList.length > 0 ? (
        <div className="w-full">
          <Table<CommentData>
            columns={commentColumns}
            data={commentList}
            autoHeight
            maxHeight={400}
            getRowId={(row) => row.id}
          />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full mt-20 mb-40 gap-2">
          <img
            src="https://res.cloudinary.com/dh2uwapb8/image/upload/v1764778004/fe/fxvnauqnwitk0ixpkq2y.png"
            style={{ width: "70px", height: "70px" }}
            alt="No comments"
          />
          <h5 className="text-gray-700 font-bold opacity-50">
            Có vẻ không có bình luận nào ở đây...
          </h5>
        </div>
      )}
    </div>
  );
};

export default CommentList;
