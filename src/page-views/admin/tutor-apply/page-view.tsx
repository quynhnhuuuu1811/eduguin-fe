'use client';

import React, { useEffect, useState } from 'react';
import {
  Typography,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Avatar,
} from '@mui/material';
import Table, { ColumnData } from '@/components/Table';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import dayjs from 'dayjs';
import { useClassStore } from '@/zustand/stores/ClassStore';
import LoadingScreen from '@/components/LoadingScreen';
import { useTranslation } from '@/i18n';

interface TutorData {
  id: string;
  fullName?: string;
  email?: string;
  avatarUrl?: string;
  sex?: string;
  birthDate?: string;
  status: string;
  createdAt?: string;
  tutorProfile?: {
    subject?: string;
    description?: string;
  };
  [key: string]: unknown;
}

const AdminTutorApplyPageView = () => {
  const { tutorApplyList, loading, getTutorApplyList, approveTutorApplication, rejectTutorApplication } = useClassStore();
  const { t } = useTranslation();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    getTutorApplyList();
  }, []);

  const handleApprove = async (tutorId: string) => {
    try {
      await approveTutorApplication(tutorId);
      setSnackbar({
        open: true,
        message: t.admin.tutorApply.approveSuccess,
        severity: 'success',
      });
    } catch {
      setSnackbar({
        open: true,
        message: t.admin.tutorApply.approveError,
        severity: 'error',
      });
    }
  };

  const handleReject = async (tutorId: string) => {
    try {
      await rejectTutorApplication(tutorId);
      setSnackbar({
        open: true,
        message: t.admin.tutorApply.rejectSuccess,
        severity: 'success',
      });
    } catch {
      setSnackbar({
        open: true,
        message: t.admin.tutorApply.rejectError,
        severity: 'error',
      });
    }
  };

  const columns: ColumnData<TutorData>[] = [
    {
      label: t.admin.tutorApply.teacher,
      dataKey: 'fullName',
      align: 'left',
      width: 180,
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.avatarUrl || ''} sx={{ width: 36, height: 36 }}>
            {(value as string)?.charAt(0)}
          </Avatar>
          <p className="font-medium">{value as string}</p>
        </div>
      ),
    },
    {
      label: t.profile.email,
      dataKey: 'email',
      align: 'left',
      width: 180,
    },
    {
      label: t.admin.tutorApply.registrationDate,
      dataKey: 'createdAt',
      align: 'left',
      width: 120,
      render: (value) => value ? dayjs(value as string).format('DD/MM/YYYY') : '-',
    },
    {
      label: t.admin.tutorApply.gender,
      dataKey: 'sex',
      align: 'center',
      width: 80,
      render: (value) => (value === 'male' ? t.profile.male : t.profile.female),
    },
    {
      label: t.admin.students.birthDate,
      dataKey: 'birthDate',
      align: 'center',
      width: 120,
      render: (value) => value ? dayjs(value as string).format('DD/MM/YYYY') : '-',
    },
    {
      label: t.admin.tutorApply.actions,
      dataKey: 'action',
      align: 'center',
      width: 120,
      render: (_, row) => {
        if (row.status !== 'PENDING') {
          return <span className="text-gray-400 text-sm">{t.admin.tutorApply.processed}</span>;
        }
        return (
          <div className="flex gap-1 justify-center">
            <Tooltip title={t.admin.tutorApply.approve}>
              <IconButton
                size="small"
                onClick={() => handleApprove(row.id)}
                sx={{ color: '#22c55e' }}
              >
                <CheckCircleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t.admin.tutorApply.reject}>
              <IconButton
                size="small"
                onClick={() => handleReject(row.id)}
                sx={{ color: '#ef4444' }}
              >
                <CancelIcon />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    loading ? <LoadingScreen /> : (
      <div className="w-full p-6">
        <Typography
          variant="h4"
          className="font-bold text-slate-800 mb-6"
          sx={{
            color: 'var(--color-blue600)',
            fontFamily: 'Quicksand',
            fontSize: {
              xs: '16px',
              sm: '20px',
              md: '24px',
              lg: '28px',
            },
            fontStyle: 'normal',
            fontWeight: '600',
          }}
        >
          {t.admin.tutorApply.title}
        </Typography>

        <Paper className="w-full mt-4" elevation={2} sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
          <div className="mb-2 flex justify-between items-center">
            <p className="text-gray-600">{t.admin.teachers.total}: {tutorApplyList.length} {t.admin.tutorApply.totalPending}</p>
          </div>

          <Table<TutorData>
            columns={columns}
            data={tutorApplyList}
            autoHeight
            getRowId={(row) => row.id}
            emptyMessage={t.admin.tutorApply.noTeachers}
          />
        </Paper>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity={snackbar.severity} variant="filled">
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    )
  );
};

export default AdminTutorApplyPageView;
