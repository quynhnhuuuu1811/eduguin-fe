"use client";

import Table from "@/components/Table";
import { ColumnData } from "@/components/Table";
import dayjs from "dayjs";
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';

export interface CommentData extends Record<string, unknown> {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  reviewDate: string;
}

interface CommentListProps {
  comments: CommentData[];
}

const CommentList = ({ comments }: CommentListProps) => {
  const commentColumns: ColumnData<CommentData>[] = [
    {
      label: "Tên người dùng",
      dataKey: "userName",
      align: "left",
      width: 150,
    },
    {
      label: "Sao",
      dataKey: "rating",
      align: "center",
      width: 80,
      render: (value: unknown) => (
        <div className="flex items-center justify-center gap-1">
          <span>{value as number}</span>
          <StarRateRoundedIcon sx={{ fontSize: "16px", color: "var(--color-yellow500)" }} />
        </div>
      ),
    },
    {
      label: "Bình luận",
      dataKey: "comment",
      align: "left",
      width: 300,
    },
    {
      label: "Ngày đánh giá",
      dataKey: "reviewDate",
      align: "left",
      width: 150,
      render: (value: unknown) => {
        if (!value) return "-";
        return dayjs(value as string).format("DD/MM/YYYY");
      },
    },
  ];

  return (
    <div className="flex flex-col gap-5 text-black font-quicksand mt-10 w-full">
      <h3 className="font-bold text-[15px] md:text-[20px] lg:text-[20px]">
        Danh sách bình luận
      </h3>
      <div className="w-full">
        <Table<CommentData>
          columns={commentColumns}
          data={comments}
          height={300}
          getRowId={(row) => row.id}
        />
      </div>
    </div>
  );
};

export default CommentList;

