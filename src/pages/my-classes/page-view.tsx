"use client";
import React, { useEffect, useMemo, useState } from 'react';
import Table from '@/components/Table';
import { ColumnData } from '@/components/Table';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useAuthStore } from '@/zustand/stores/AuthStore';
import { CustomButton } from '@/components/Button';
import { AddCircleOutline, DeleteOutlined } from '@mui/icons-material';
import CreateModel from './components/CreateModel';
import DeleteModel from './components/DeleteModel';
import { useClassStore } from '@/zustand/stores/ClassStore';
import LoadingScreen from '@/components/LoadingScreen';

interface ScheduleItem {
  days: string;
  time: string;
}

interface ClassData {
  id?: string;
  name?: string;
  className?: string;
  teacherName?: string;
  tutorName?: string;
  subject?: string;
  startDate?: string;
  endDate?: string;
  status?: 'pending' | 'completed' | 'OPEN' | 'CLOSED';
  schedule?: ScheduleItem[];
  studentCount?: number;
  capacity?: number;
  onlineLink?: string;
  [key: string]: unknown;
}

const MyClassesPageView = () => {
  const { data: authData } = useAuthStore();
  const { fetchTutorClasses, classes, loading } = useClassStore();
  const isTutor = authData?.user?.role === 'tutor';

  useEffect(() => {
    if (isTutor) {
      fetchTutorClasses();
    }
  }, [isTutor, fetchTutorClasses]);

  const classList = useMemo(() => {
    return classes;
  }, [classes]);

  // Create Modal State
  const [openCreateModel, setOpenCreateModel] = useState(false);

  const handleOpenCreateModel = () => {
    setOpenCreateModel(true);
  };

  const handleCloseCreateModel = () => {
    setOpenCreateModel(false);
  };

  // Delete Modal State
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);

  const handleOpenDeleteModel = (classData: ClassData) => {
    setSelectedClass(classData);
    setOpenDeleteModel(true);
  };

  const handleCloseDeleteModel = () => {
    setOpenDeleteModel(false);
    setSelectedClass(null);
  };

  const currentDate = dayjs().format('YYYY-MM-DD');

  const columns: ColumnData<ClassData>[] = useMemo(
    () => {
      const baseColumns: ColumnData<ClassData>[] = [
        {
          label: 'Tên lớp',
          dataKey: 'className',
          align: 'left',
          width: 180,
        },
      ];

      // Nếu là học sinh thì hiện cột tên giáo viên
      if (!isTutor) {
        baseColumns.push({
          label: 'Tên giáo viên',
          dataKey: 'teacherName',
          align: 'left',
          width: 180,
        });
      }

      // Nếu là gia sư thì hiện cột sĩ số
      if (isTutor) {
        baseColumns.push({
          label: 'Sĩ số',
          dataKey: 'capacity',
          align: 'left',
          width: 100,
          render: (value: unknown) => {
            return (
              <span>
                {value ? `${value} học sinh` : '0 học sinh'}
              </span>
            );
          },
        });
      }

      baseColumns.push(
        {
          label: 'Môn học',
          dataKey: 'subject',
          align: 'left',
          width: 100,
        },
        {
          label: 'Ngày bắt đầu',
          dataKey: 'startDate',
          align: 'left',
          width: 120,
        },
        {
          label: 'Ngày kết thúc',
          dataKey: 'endDate',
          align: 'left',
          width: 120,
        },
        {
          label: 'Trạng thái',
          dataKey: 'status',
          align: 'left',
          width: 120,
          render: (value: unknown) => {
            if (value === 'OPEN' && dayjs(value).isAfter(currentDate)) return <span className='text-yellow-500'>Sắp diễn ra</span>;
            if (value === 'OPEN') return <span className='text-green-500'>Đang diễn ra</span>;
            if (value === 'CLOSED') return <span className='text-red-500'>Đã kết thúc</span>;
            return <span className='text-gray-500'>-</span>;
          },
        },
        {
          label: 'Lịch học',
          dataKey: 'schedules',
          align: 'left',
          width: 150,
          render: (value: unknown) => {
            if (!value) return '-';
            const scheduleStr = value as string;
            return (
              <div className="flex flex-col gap-1">
                {scheduleStr.split('\n').map((line, idx) => (
                  <span key={idx} className="text-xs">
                    {line}
                  </span>
                ))}
              </div>
            );
          },
        },
      );

      if (isTutor) {
        baseColumns.push({
          label: '',
          dataKey: 'action',
          align: 'center',
          width: 50,
          render: (_value: unknown, row: ClassData) => {
            return (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDeleteModel(row);
                }}
                className="p-2 rounded-full hover:bg-red-100 transition-colors"
                title="Xoá lớp học"
              >
                <DeleteOutlined sx={{ fontSize: 20, color: 'var(--color-red500, #ef4444)' }} />
              </button>
            );
          },
        });
      }

      return baseColumns;
    },
    [isTutor, currentDate]
  );

  if (loading) {
    return <LoadingScreen />;
  }

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
          {isTutor ? 'Danh sách lớp học của bạn' : 'Danh sách lớp học đã đăng ký'}
        </Typography>
      </div>
      <div className='flex justify-end pb-4 px-8'>
        <CustomButton type="Secondary" className="bg-blue700! text-white! gap-1 flex" onClick={handleOpenCreateModel}>
          <AddCircleOutline sx={{ fontSize: 20 }} /> Thêm lớp học
        </CustomButton>
      </div>
      <div className='flex justify-center items-center w-full max-w-[95%] mx-auto'>
        <Table<ClassData>
          columns={columns}
          data={Array.isArray(classList) ? classList : []}
          autoHeight
          getRowId={(row, index) => row.id || index.toString()}
          onRowClick={(row) => console.log('Row clicked:', row)}
          emptyMessage="Chưa có lớp học nào"
        />
      </div>

      {/* Create Modal */}
      <CreateModel open={openCreateModel} onClose={handleCloseCreateModel} />

      {/* Delete Modal */}
      <DeleteModel
        open={openDeleteModel}
        onClose={handleCloseDeleteModel}
        classData={selectedClass}
      />
    </div>
  );
};

export default MyClassesPageView;
