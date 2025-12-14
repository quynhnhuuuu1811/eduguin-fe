"use client";
import React, { useEffect, useMemo, useState } from 'react';
import Table from '@/components/Table';
import { ColumnData } from '@/components/Table';
import { Typography, Tooltip, Snackbar, Alert } from '@mui/material';
import dayjs from 'dayjs';
import { useAuthStore } from '@/zustand/stores/AuthStore';
import { CustomButton } from '@/components/Button';
import { AddCircleOutline, DeleteOutlined, PublishOutlined } from '@mui/icons-material';
import CreateModel from './components/CreateModel';
import DeleteModel from './components/DeleteModel';
import { useClassStore } from '@/zustand/stores/ClassStore';
import LoadingScreen from '@/components/LoadingScreen';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useRouter } from 'next/navigation';
import StudentListTable from './components/StudentListTable';
import { useTranslation } from '@/i18n';

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
  status?: 'pending' | 'completed' | 'OPEN' | 'CLOSED' | 'DRAFT';
  schedule?: ScheduleItem[];
  studentCount?: number;
  capacity?: number;
  onlineLink?: string;
  linkMeeting?: string;
  [key: string]: unknown;
}

const MyClassesPageView = () => {
  const [mounted, setMounted] = useState(false);
  const { data: authData } = useAuthStore();
  const { fetchTutorClasses, classes, loading, fetchStudentClasses, setOpenClass } = useClassStore();
  const isTutor = authData?.user?.role === 'tutor';
  const { t } = useTranslation();
  const isEnglish = t.common.loading === "Loading...";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (isTutor) {
      fetchTutorClasses();
    } else {
      fetchStudentClasses();
    }
  }, [mounted, isTutor, fetchTutorClasses, fetchStudentClasses]);


  const router = useRouter();
  // Transform data cho học sinh (subscription có nested class object)
  const classList = useMemo(() => {
    if (isTutor) {
      return classes;
    }

    // Chỉ lấy những lớp đã được duyệt (approved)
    return classes
      .filter((subscription: any) => subscription.approvedAt !== null)
      .map((subscription: any) => ({
        approvedAt: subscription.approvedAt,
        id: subscription.id,
        classId: subscription.classId,
        className: subscription.class?.name || subscription.class?.className || '',
        teacherName: subscription.class?.tutorProfile?.user?.fullName || 'Chưa có thông tin',
        subject: subscription.class?.subject || '',
        startDate: dayjs(subscription.class?.startTime).format('DD/MM/YYYY') || '',
        endDate: dayjs(subscription.class?.endTime).format('DD/MM/YYYY') || '',
        subscriptionStatus: subscription.status,
        status: subscription.class?.status,
        schedules: subscription.class?.schedules || '',
        capacity: subscription.class?.capacity,
        linkMeeting: subscription.class?.linkMeeting,
        requestedAt: subscription.requestedAt,
        teacherId: subscription.class?.tutorId || subscription.class?.tutorProfile?.userId
      }));
  }, [classes, isTutor]);

  // Create Modal State
  const [openCreateModel, setOpenCreateModel] = useState(false);
  const [openListModal, setOpenListModal] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const handleOpenCreateModel = () => {
    setOpenCreateModel(true);
  };

  const handleCloseCreateModel = () => {
    setOpenCreateModel(false);
  };

  // Delete Modal State
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);

  // Snackbar states
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);

  const { getListStudentofClass } = useClassStore();

  const handleOpenDeleteModel = async (classData: ClassData) => {
    const today = dayjs();
    const classStartDate = classData.startDate ? dayjs(classData.startDate) : null;

    // Kiểm tra lớp học đã bắt đầu chưa
    if (classStartDate && classStartDate.isBefore(today, 'day') || classStartDate?.isSame(today, 'day')) {
      // Kiểm tra có học sinh không
      try {
        const students = await getListStudentofClass(classData.id || '');
        if (students && students.length > 0) {
          setDeleteError('Lớp học đã diễn ra và có học sinh đăng ký, không thể xoá!');
          return;
        }
      } catch (error) {
        console.error('Error checking students:', error);
      }
    }

    setSelectedClass(classData);
    setOpenDeleteModel(true);
  };

  const handleCloseDeleteModel = () => {
    setOpenDeleteModel(false);
    setSelectedClass(null);
  };

  // Handle publish class (set to OPEN)
  const handlePublishClass = async (classId: string) => {
    try {
      await setOpenClass(classId);
      setPublishSuccess(true);
    } catch (error: any) {
      console.error('Error publishing class:', error);
      setPublishError(error?.response?.data?.message || (isEnglish ? 'Failed to publish class' : 'Không thể công khai lớp học'));
    }
  };

  const currentDate = dayjs().format('YYYY-MM-DD');

  const columns: ColumnData<ClassData>[] = useMemo(
    () => {
      const baseColumns: ColumnData<ClassData>[] = [
        {
          label: t.myClasses.className,
          dataKey: 'className',
          align: 'left',
          width: 180,
        },
      ];

      // Nếu là học sinh thì hiện cột tên giáo viên
      if (!isTutor) {
        baseColumns.push({
          label: t.home.roleOptions.tutorTitle,
          dataKey: 'teacherName',
          align: 'left',
          width: 180,
          render: (value: unknown, row: ClassData) => {
            return (
              <span
                className='text-blue-500 hover:text-blue-700 cursor-pointer font-semibold underline'
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/tutor-info/${row.teacherId}`);
                }}
              >
                {value ? value as string : '-'}
              </span>
            );
          },
        });
      }

      // Nếu là gia sư thì hiện cột sĩ số
      if (isTutor) {
        baseColumns.push({
          label: t.myClasses.students,
          dataKey: 'capacity',
          align: 'left',
          width: 120,
          render: (value: unknown, row: ClassData) => {
            return (
              <Tooltip arrow placement="top" title={t.myClasses.students}>
                <span
                  className='underline cursor-pointer hover:text-blue-600 text-blue-500'
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedClassId(row.id || null);
                    setOpenListModal(true);
                  }}
                >
                  {value ? `${value} ${t.myClasses.students.toLowerCase()}` : `0 ${t.myClasses.students.toLowerCase()}`}
                </span>
              </Tooltip>
            );
          },
        });
      }

      baseColumns.push(
        {
          label: t.myClasses.subject,
          dataKey: 'subject',
          align: 'left',
          width: 100,
        },
        {
          label: t.myClasses.className === 'Class Name' ? 'Start Date' : 'Ngày bắt đầu',
          dataKey: 'startDate',
          align: 'left',
          width: 120,
        },
        {
          label: t.myClasses.className === 'Class Name' ? 'End Date' : 'Ngày kết thúc',
          dataKey: 'endDate',
          align: 'left',
          width: 120,
        },
        {
          label: t.myClasses.price,
          dataKey: 'price',
          align: 'left',
          width: 120,
        },
        {
          label: t.myClasses.status,
          dataKey: 'status',
          align: 'left',
          width: 120,
          render: (value: unknown) => {
            if (value === 'DRAFT') return <span className='text-yellow-500'>{t.myClasses.draft}</span>;
            if (value === 'OPEN') return <span className='text-green-500'>{t.myClasses.active}</span>;
            if (value === 'CLOSED') return <span className='text-red-500'>{t.myClasses.inactive}</span>;
            return <span className='text-gray-500'>-</span>;
          },
        },
        {
          label: t.myClasses.schedule,
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

      // Actions cho gia sư
      if (isTutor) {
        baseColumns.push({
          label: '',
          dataKey: 'action',
          align: 'center',
          width: 100,
          render: (_value: unknown, row: ClassData) => {
            return (
              <div className="flex items-center gap-1">
                {/* Nút publish - chỉ hiện khi status là DRAFT */}
                {row.status === 'DRAFT' && (
                  <Tooltip title={isEnglish ? 'Publish Class' : 'Công khai lớp học'} arrow placement="top">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePublishClass(row.id || '');
                      }}
                      className="p-2 rounded-full hover:bg-green-100 transition-colors"
                    >
                      <PublishOutlined sx={{ fontSize: 20, color: '#22c55e' }} />
                    </button>
                  </Tooltip>
                )}
                {/* Nút xóa */}
                <Tooltip title={t.common.delete} arrow placement="top">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDeleteModel(row);
                    }}
                    className="p-2 rounded-full hover:bg-red-100 transition-colors"
                  >
                    <DeleteOutlined sx={{ fontSize: 20, color: 'var(--color-red500, #ef4444)' }} />
                  </button>
                </Tooltip>
              </div>
            );
          },
        });
      }

      // Nút vào lớp học cho học sinh
      if (!isTutor) {
        baseColumns.push({
          label: '',
          dataKey: 'action',
          align: 'center',
          width: 50,
          render: (_value: unknown, row: ClassData) => {
            return (
              <Tooltip title={t.myClasses.className === 'Class Name' ? 'Join Class' : 'Vào lớp học'} arrow placement="top">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(row.linkMeeting as string, '_blank');
                  }}
                  className="p-2 rounded-full hover:bg-blue-100 transition-colors"
                >
                  <OpenInNewIcon sx={{ fontSize: 20, color: 'var(--color-blue600)' }} />
                </button>
              </Tooltip>
            );
          },
        });
      }

      return baseColumns;
    },
    [isTutor, currentDate, t, router, isEnglish]
  );

  // Wait for client-side mounting to avoid hydration mismatch
  if (!mounted || loading) {
    return <LoadingScreen />;
  }

  return (
    <div style={{ padding: '20px' }} className='flex flex-col mt-20'>
      <StudentListTable open={openListModal} onClose={() => setOpenListModal(false)} classId={selectedClassId || ''} />
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
          {t.myClasses.title}
        </Typography>
      </div>
      {isTutor && (
        <div className='flex justify-end pb-4 px-8'>
          <CustomButton type="Secondary" className="bg-blue700! text-white! gap-1 flex" onClick={handleOpenCreateModel}>
            <AddCircleOutline sx={{ fontSize: 20 }} /> {t.myClasses.createClass}
          </CustomButton>
        </div>
      )}
      <div className='flex justify-center items-center w-full max-w-[95%] mx-auto'>
        <Table<ClassData>
          columns={columns}
          data={Array.isArray(classList) ? classList : []}
          autoHeight
          getRowId={(row, index) => row.id || index.toString()}
          onRowClick={(row) => console.log('Row clicked:', row)}
          emptyMessage={t.myClasses.noClasses}
        />
      </div>

      {/* Create Modal */}
      <CreateModel open={openCreateModel} onClose={handleCloseCreateModel} />

      {/* Delete Modal */}
      <DeleteModel
        open={openDeleteModel}
        onClose={handleCloseDeleteModel}
        classData={selectedClass}
        onSuccess={() => setDeleteSuccess(true)}
      />

      {/* Snackbar for delete validation error */}
      <Snackbar
        open={!!deleteError}
        autoHideDuration={4000}
        onClose={() => setDeleteError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setDeleteError(null)}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {deleteError}
        </Alert>
      </Snackbar>

      {/* Snackbar for delete success */}
      <Snackbar
        open={deleteSuccess}
        autoHideDuration={2000}
        onClose={() => setDeleteSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setDeleteSuccess(false)}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {t.common.success}
        </Alert>
      </Snackbar>

      {/* Snackbar for publish success */}
      <Snackbar
        open={publishSuccess}
        autoHideDuration={2000}
        onClose={() => setPublishSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setPublishSuccess(false)}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {isEnglish ? 'Class published successfully!' : 'Công khai lớp học thành công!'}
        </Alert>
      </Snackbar>

      {/* Snackbar for publish error */}
      <Snackbar
        open={!!publishError}
        autoHideDuration={4000}
        onClose={() => setPublishError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setPublishError(null)}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {publishError}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MyClassesPageView;
