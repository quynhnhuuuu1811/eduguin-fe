"use client";
import React, { useMemo } from 'react';
import Table from '@/components/Table';
import { ColumnData } from '@/components/Table';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';

interface ScheduleItem {
  day: string;
  time: string;
}

interface ClassData extends Record<string, unknown> {
  id?: string;
  name: string;
  teacherName: string;
  subject: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'completed';
  schedule?: ScheduleItem[];
}

const MyClassesPageView = () => {
  const columns: ColumnData<ClassData>[] = useMemo(
    () => [
      {
        label: 'Tên lớp',
        dataKey: 'name',
        align: 'left',
        width: 200,
      },
      {
        label: 'Tên giáo viên',
        dataKey: 'teacherName',
        align: 'left',
        width: 180,
      },
      {
        label: 'Môn học',
        dataKey: 'subject',
        align: 'left',
        width: 120,
      },
      {
        label: 'Ngày bắt đầu',
        dataKey: 'startDate',
        align: 'left',
        width: 130,
        render: (value: unknown) => {
          if (!value) return '-';
          return dayjs(value as string).format('DD/MM/YYYY');
        },
      },
      {
        label: 'Ngày kết thúc',
        dataKey: 'endDate',
        align: 'left',
        width: 130,
        render: (value: unknown) => {
          if (!value) return '-';
          return dayjs(value as string).format('DD/MM/YYYY');
        },
      },
      {
        label: 'Trạng thái',
        dataKey: 'status',
        align: 'center',
        width: 120,
        render: (value: unknown) => {
          const statusMap: Record<string, { label: string; color: string }> = {
            pending: { label: 'Đang diễn ra', color: 'var(--color-primary500)' },
            completed: { label: 'Đã kết thúc', color: 'var(--color-red600)' },
          };
          const status = statusMap[value as string] || { label: value as string, color: '#666' };
          return (
            <span style={{ color: status.color, fontWeight: 600 }}>
              {status.label}
            </span>
          );
        },
      },
      {
        label: 'Lịch học',
        dataKey: 'schedule',
        align: 'left',
        width: 200,
        render: (value: unknown) => {
          const schedule = Array.isArray(value) ? (value as ScheduleItem[]) : [];
          if (schedule.length === 0) return '-';
          return (
            <div className='flex flex-col gap-1'>
              {schedule.map((item: ScheduleItem, idx: number) => (
                <span key={idx} style={{ fontSize: '12px' }}>
                  {item.day === '1' ? 'Thứ hai' : item.day === '2' ? 'Thứ ba' : item.day === '3' ? 'Thứ tư' : item.day === '4' ? 'Thứ năm' : item.day === '5' ? 'Thứ sáu' : item.day === '6' ? 'Thứ bảy' : 'Chủ nhật'} - {item.time}
                </span>
              ))}
            </div>
          );
        },
      },
    ],
    []
  );

  const data: ClassData[] = useMemo(
    () => [
      {
        id: '1',
        name: 'Lớp Toán 10',
        teacherName: 'Nguyễn Văn A',
        subject: 'Toán',
        startDate: '2024-01-15',
        endDate: '2024-06-30',
        status: 'pending',
        schedule: [
          { day: '1', time: '10:00 - 11:00' },
          { day: '3', time: '14:00 - 15:00' },
        ],
      },
      {
        id: '2',
        name: 'Lớp Vật lý 11',
        teacherName: 'Trần Thị B',
        subject: 'Vật lý',
        startDate: '2024-02-01',
        endDate: '2024-07-15',
        status: 'completed',
        schedule: [
          { day: '2', time: '16:00 - 17:00' },
          { day: '4', time: '18:00 - 19:00' },
        ],
      },
      {
        id: '3',
        name: 'Lớp Hóa học 12',
        teacherName: 'Lê Văn C',
        subject: 'Hóa học',
        startDate: '2024-01-20',
        endDate: '2024-05-30',
        status: 'pending',
        schedule: [
          { day: '5', time: '09:00 - 10:00' },
          { day: '7', time: '15:00 - 16:00' },
        ],
      },
    ],
    []
  );

  return (
    <div style={{ padding: '20px' }} className='flex flex-col mt-20'>
      <div className='flex justify-between items-center w-full mb-10'>
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Sugar',
            color: 'var(--color-blue600)',
            width: '100%',
            textAlign: 'center',
          }}
        >
          Danh sách lớp học đã đăng ký
        </Typography>
      </div>
      <div className='flex justify-center items-center w-full max-w-[95%] mx-auto'>
        <Table<ClassData>
          columns={columns}
          data={data}
          height={600}
          getRowId={(row, index) => row.id || index.toString()}
          onRowClick={(row) => console.log('Row clicked:', row)}
          emptyMessage="Chưa có lớp học nào"
        />
      </div>
    </div>
  );
};

export default MyClassesPageView;