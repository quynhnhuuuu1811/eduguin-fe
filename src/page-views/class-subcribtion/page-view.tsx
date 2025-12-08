'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useClassStore } from '@/zustand/stores/ClassStore'
import { ColumnData } from '@/components/Table';
import Table from '@/components/Table';
import { Alert, Typography } from '@mui/material';
import LoadingScreen from '@/components/LoadingScreen';
import dayjs from 'dayjs';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Snackbar from '@mui/material/Snackbar';

interface SubscriptionData {
  id: string;
  className: string;
  studentName: string;
  studentEmail?: string;
  requestedAt: string;
  status: string;
  classId?: string;
  studentId?: string;
  [key: string]: unknown;
}

const ClassSubcribtionPageView = () => {
  const { studentSubscriptions, getListStudentSubscriptions, loading, approveClassSubscription, rejectClassSubscription } = useClassStore();

  // Snackbar states
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    getListStudentSubscriptions();
  }, [getListStudentSubscriptions]);

  const subscriptionList = useMemo(() => {
    if (!Array.isArray(studentSubscriptions)) return [];

    return studentSubscriptions.map((sub: any) => ({
      id: sub.id,
      classId: sub.classId || sub.class?.id,
      className: sub.class?.name || sub.className || 'Chưa có tên',
      studentId: sub.studentId || sub.student?.id,
      studentName: sub.student?.fullName || sub.studentName || 'Chưa có tên',
      studentEmail: sub.student?.email || '',
      requestedAt: sub.requestedAt || sub.createdAt || '',
      status: sub.status || 'pending',
    }));
  }, [studentSubscriptions]);

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleApprove = async (subscriptionId: string) => {
    console.log('Approve:', subscriptionId);
    try {
      await approveClassSubscription(subscriptionId);
      setSnackbar({
        open: true,
        message: 'Đã duyệt yêu cầu thành công!',
        severity: 'success',
      });
      // Refresh list
      getListStudentSubscriptions();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Có lỗi xảy ra khi duyệt yêu cầu!',
        severity: 'error',
      });
    }
  };

  const handleReject = async (subscriptionId: string) => {
    try {
      await rejectClassSubscription(subscriptionId);
      setSnackbar({
        open: true,
        message: 'Đã từ chối yêu cầu!',
        severity: 'success',
      });
      // Refresh list
      getListStudentSubscriptions();
    } catch (error) {
      console.error('Error rejecting subscription:', error);
    }
  };

  const columns: ColumnData<SubscriptionData>[] = [
    {
      label: 'Tên lớp',
      dataKey: 'className',
      align: 'left',
      width: 180,
    },
    {
      label: 'Tên học sinh',
      dataKey: 'studentName',
      align: 'left',
      width: 150,
    },
    {
      label: 'Ngày yêu cầu',
      dataKey: 'requestedAt',
      align: 'left',
      width: 120,
      render: (value: unknown) => {
        if (!value) return '-';
        return <span>{dayjs(value as string).format('DD/MM/YYYY HH:mm')}</span>;
      },
    },
    {
      label: 'Trạng thái',
      dataKey: 'status',
      align: 'center',
      width: 100,
      render: (value: unknown) => {
        if (value === 'pending') return <span className="text-yellow-500 font-medium">Chờ duyệt</span>;
        if (value === 'approved') return <span className="text-green-500 font-medium">Đã duyệt</span>;
        if (value === 'rejected') return <span className="text-red-500 font-medium">Từ chối</span>;
        return <span className="text-gray-500">-</span>;
      },
    },
    {
      label: 'Hành động',
      dataKey: 'action',
      align: 'center',
      width: 150,
      render: (_value: unknown, row: SubscriptionData) => {
        if (row.status !== 'pending') {
          return <span className="text-gray-400 text-sm">Đã xử lý</span>;
        }
        return (
          <div className="flex gap-2 justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleApprove(row.id);
              }}
              className="p-2 rounded-full hover:bg-green-100 transition-colors"
              title="Duyệt"
            >
              <CheckCircleIcon sx={{ fontSize: 22, color: '#22c55e' }} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleReject(row.id);
              }}
              className="p-2 rounded-full hover:bg-red-100 transition-colors"
              title="Từ chối"
            >
              <CancelIcon sx={{ fontSize: 22, color: '#ef4444' }} />
            </button>
          </div>
        );
      },
    }
  ];

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="pt-28 pb-10 w-full max-w-[80%] mx-auto">
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Sugar',
            color: 'var(--color-blue600)',
            width: '100%',
            textAlign: 'center',
            mb: 4,
          }}
        >
          Danh sách yêu cầu vào lớp học
        </Typography>

        <div className="flex justify-center items-center w-full">
          <Table<SubscriptionData>
            columns={columns}
            data={subscriptionList}
            autoHeight
            getRowId={(row, index) => row.id || index.toString()}
            onRowClick={(row) => console.log('Row clicked:', row)}
            emptyMessage="Chưa có yêu cầu nào"
          />
        </div>
      </div>

      {/* Snackbar thông báo */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default ClassSubcribtionPageView
