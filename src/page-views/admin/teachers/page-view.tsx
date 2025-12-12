'use client';

import React, { useEffect, useState } from 'react';
import {
  Typography,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Avatar,
  Snackbar,
  Alert,
} from '@mui/material';
import Table, { ColumnData } from '@/components/Table';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { CustomButton } from '@/components/Button';
import { useUserStore } from '@/zustand/stores/UserStore';
import { useTranslation } from '@/i18n';
import BlockIcon from '@mui/icons-material/Block';
import { useAuthStore } from '@/zustand/stores/AuthStore';

interface TeacherData {
  id: string;
  fullName?: string;
  email?: string;
  avatarUrl?: string;
  sex?: string;
  birthDate?: string;
  role?: string;
  tutorProfile?: {
    description?: string;
    price?: number;
    introVideoUrl?: string;
    rating?: number;
    subject?: string;
  };
  [key: string]: unknown;
}

const AdminTeachersPageView = () => {
  const { t } = useTranslation();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const { fetchAllTutors, users, loading, totalUsers } = useUserStore();

  // Pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { banUser } = useAuthStore();
  const handleBlockTeacher = async (teacherId: string) => {
    try {
      await banUser(teacherId);
      setSnackbar({
        open: true,
        message: t.admin.teachers.blockSuccess,
        severity: 'success',
      });
    }
    catch (error) {
      setSnackbar({
        open: true,
        message: t.admin.teachers.blockError,
        severity: 'error',
      });
    }
  };
  useEffect(() => {
    fetchAllTutors({
      page,
      limit: rowsPerPage,
    });
  }, [fetchAllTutors, users, page, rowsPerPage]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1); // Reset to first page
  };

  const teachers = users ?? [];

  const columns: ColumnData<TeacherData>[] = [
    {
      label: t.admin.teachers.teacher,
      dataKey: 'fullName',
      align: 'left',
      width: 150,
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
      width: 140,
      render: (value) => (
        <div className="flex items-center gap-3">
          <p className="text-xs text-gray-500">{value as string}</p>
        </div>
      ),
    },
    {
      label: t.admin.teachers.subject,
      dataKey: 'tutorProfile',
      align: 'left',
      width: 100,
      render: (_, row) => {
        const subject = (row as any).tutorProfile?.subject;
        return subject ? (
          <Chip label={subject} size="small" variant="outlined" />
        ) : (
          <span className="text-gray-400">-</span>
        );
      },
    },
    {
      label: t.admin.teachers.birthDate,
      dataKey: 'birthDate',
      align: 'center',
      width: 100,
      render: (_, row) => {
        const birthDate = (row as any).birthDate;
        return birthDate ? (
          <span>{birthDate}</span>
        ) : (
          <span className="text-gray-400">-</span>
        );
      },
    },
    {
      label: t.admin.teachers.gender,
      dataKey: 'sex',
      align: 'center',
      width: 100,
      render: (_, row) => {
        const sex = (row as any).sex;
        return sex ? (
          <span>{sex === 'male' ? t.profile.male : t.profile.female}</span>
        ) : (
          <span className="text-gray-400">-</span>
        );
      },
    },
    {
      label: t.admin.teachers.rating,
      dataKey: 'rating',
      align: 'center',
      width: 100,
      render: (_, row) => {
        const rating = (row as any).tutorProfile?.rating;
        return rating ? (
          <span>{rating.toLocaleString('vi-VN')}</span>
        ) : (
          <span className="text-gray-400">-</span>
        );
      },
    },
    {
      label: t.admin.teachers.actions,
      dataKey: 'action',
      align: 'center',
      width: 100,
      render: (_, row) => {
        return (
          <div className="flex gap-1 justify-center">
            <Tooltip title={t.admin.teachers.block}>
              <IconButton size="small" onClick={() => handleBlockTeacher(row.id)} sx={{ color: '#ef4444' }}>
                <BlockIcon />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full p-6">
      <Typography variant="h4" className="font-bold text-slate-800 mb-6"
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
        {t.admin.teachers.title}
      </Typography>

      <Paper className=" w-full mt-4" elevation={2} sx={{ backgroundColor: 'transparent', boxShadow: 'none' }} >
        <div className="mb-2 flex justify-between items-center">
          <p className="text-gray-600">{t.admin.teachers.total}: {totalUsers} {t.admin.teachers.teachers}</p>
        </div>

        <Table<TeacherData>
          columns={columns}
          data={teachers as unknown as TeacherData[]}
          autoHeight
          getRowId={(row) => row.id}
          emptyMessage={t.admin.teachers.noTeachers}
          pagination={{
            page,
            rowsPerPage,
            totalCount: totalUsers,
            onPageChange: handlePageChange,
            onRowsPerPageChange: handleRowsPerPageChange,
            rowsPerPageOptions: [5, 10, 25, 50],
          }}
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
  );
};

export default AdminTeachersPageView;
