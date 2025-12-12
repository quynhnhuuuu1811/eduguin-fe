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
import { useTranslation } from '@/i18n';
import BlockIcon from '@mui/icons-material/Block';
import { useAuthStore } from '@/zustand/stores/AuthStore';
import { useUserStore } from '@/zustand/stores/UserStore';
import dayjs from 'dayjs';
interface StudentData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatar?: string;
  status: string;
  enrolledClasses: number;
  createdAt: string;
  [key: string]: unknown;
}

const AdminStudentsPageView = () => {
  const { t } = useTranslation();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const { banUser } = useAuthStore();
  const { getStudents, students, loading } = useUserStore();
  const handleBanStudent = async (studentId: string) => {
    try {
      await banUser(studentId);
      setSnackbar({
        open: true,
        message: t.admin.students.blockSuccess,
        severity: 'success',
      });
    }
    catch (error) {
      setSnackbar({
        open: true,
        message: t.admin.students.blockError,
        severity: 'error',
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      await getStudents({
        page: 1,
        limit: 10,
      });
    }
    fetchData();
  }, [getStudents]);

  const columns: ColumnData<StudentData>[] = [
    {
      label: t.admin.students.student,
      dataKey: 'fullName',
      align: 'left',
      width: 200,
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.avatar} sx={{ width: 36, height: 36 }}>
            {(value as string)?.charAt(0)}
          </Avatar>
          <div>
            <p className="font-medium">{value as string}</p>
            <p className="text-xs text-gray-500">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      label: t.admin.students.email,
      dataKey: 'email',
      align: 'left',
      width: 130,
    },
    {
      label: t.admin.students.sex,
      dataKey: 'sex',
      align: 'center',
      width: 120,
      render: (value) => {
        if (value === 'male') return <Chip label={t.admin.students.male} color="success" size="small" />;
        if (value === 'female') return <Chip label={t.admin.students.female} color="success" size="small" />;
        if (value === 'other') return <Chip label={t.admin.students.other} color="success" size="small" />;
        return <Chip label="-" size="small" />;
      },
    },
    {
      label: t.admin.students.birthDate,
      dataKey: 'birthDate',
      align: 'center',
      width: 120,
      render: (value) => value ? dayjs(value as string).format('DD/MM/YYYY') : '-',
    },
    {
      label: t.admin.students.actions,
      dataKey: 'action',
      align: 'center',
      width: 130,
      render: (_, row) => (
        <div className="flex gap-1 justify-center">
          <Tooltip title={row.status === 'active' ? t.admin.students.block : t.admin.students.unblock}>
            <IconButton
              size="small"
              onClick={() => handleBanStudent(row.id)}
              sx={{ color: row.status === 'active' ? '#ef4444' : '#22c55e' }}
            >
              {row.status === 'active' ? <BlockIcon /> : <span className="text-red-500 text-sm">Tài khoản bị khoá</span>}
            </IconButton>
          </Tooltip>
        </div>
      ),
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
        {t.admin.students.title}
      </Typography>

      <Paper className=" w-full mt-4" elevation={2} sx={{ backgroundColor: 'transparent', boxShadow: 'none' }} >
        <div className="mb-2 flex justify-between items-center">
          <p className="text-gray-600">{t.admin.students.total}: {students.length} {t.admin.students.students}</p>
        </div>

        <Table<StudentData>
          columns={columns}
          data={students}
          autoHeight
          getRowId={(row) => row.id}
          emptyMessage={t.admin.students.noStudents}
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
    </div >
  );
};

export default AdminStudentsPageView;
