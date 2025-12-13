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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import Table, { ColumnData } from '@/components/Table';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import dayjs from 'dayjs';
import { useBlogStore } from '@/zustand/stores/BlogStore';
import LoadingScreen from '@/components/LoadingScreen';
import { useTranslation } from '@/i18n';
import { Blog } from '@/zustand/types/Blog';

interface BlogTableData extends Blog {
  [key: string]: unknown;
}

const AdminBlogsPageView = () => {
  const {
    pendingBlogs,
    loading,
    getPendingBlogs,
    approveBlog,
    rejectBlog,
  } = useBlogStore();
  const { t } = useTranslation();
  const isEnglish = t.common.loading === "Loading...";

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const [previewBlog, setPreviewBlog] = useState<Blog | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    getPendingBlogs();
  }, [getPendingBlogs]);

  const handleApprove = async (blogId: string) => {
    try {
      await approveBlog(blogId);
      setSnackbar({
        open: true,
        message: isEnglish ? 'Blog approved successfully' : 'Duyệt bài viết thành công',
        severity: 'success',
      });
    } catch {
      setSnackbar({
        open: true,
        message: isEnglish ? 'Failed to approve blog' : 'Duyệt bài viết thất bại',
        severity: 'error',
      });
    }
  };

  const handleReject = async (blogId: string) => {
    try {
      await rejectBlog(blogId);
      setSnackbar({
        open: true,
        message: isEnglish ? 'Blog rejected successfully' : 'Từ chối bài viết thành công',
        severity: 'success',
      });
    } catch {
      setSnackbar({
        open: true,
        message: isEnglish ? 'Failed to reject blog' : 'Từ chối bài viết thất bại',
        severity: 'error',
      });
    }
  };

  const handlePreview = (blog: Blog) => {
    setPreviewBlog(blog);
    setPreviewOpen(true);
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'PENDING':
        return (
          <Chip
            label={isEnglish ? 'Pending' : 'Chờ duyệt'}
            size="small"
            sx={{
              backgroundColor: '#fef3c7',
              color: '#d97706',
              fontFamily: 'Quicksand',
              fontWeight: 600,
            }}
          />
        );
      case 'APPROVED':
        return (
          <Chip
            label={isEnglish ? 'Approved' : 'Đã duyệt'}
            size="small"
            sx={{
              backgroundColor: '#d1fae5',
              color: '#059669',
              fontFamily: 'Quicksand',
              fontWeight: 600,
            }}
          />
        );
      case 'REJECTED':
        return (
          <Chip
            label={isEnglish ? 'Rejected' : 'Từ chối'}
            size="small"
            sx={{
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              fontFamily: 'Quicksand',
              fontWeight: 600,
            }}
          />
        );
      default:
        return null;
    }
  };

  // Format content preview
  const getContentPreview = (content: string, maxLength: number = 100): string => {
    if (!content) return "";
    let cleaned = content.replace(/<[^>]*>/g, "");
    cleaned = cleaned.replace(/\r\n/g, " ").replace(/\n/g, " ");
    cleaned = cleaned.replace(/\d+\)\s*/g, "");
    cleaned = cleaned.replace(/\s+/g, " ").trim();
    if (cleaned.length <= maxLength) return cleaned;
    return cleaned.substring(0, maxLength) + "...";
  };

  const columns: ColumnData<BlogTableData>[] = [
    {
      label: isEnglish ? 'Title' : 'Tiêu đề',
      dataKey: 'title',
      align: 'left',
      width: 250,
      render: (value, row) => (
        <div className="flex items-center gap-3">
          {row.coverImageUrl ? (
            <img
              src={row.coverImageUrl}
              alt={value as string}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-bold">
                {(value as string)?.charAt(0)}
              </span>
            </div>
          )}
          <p className="font-medium line-clamp-2">{value as string}</p>
        </div>
      ),
    },
    {
      label: isEnglish ? 'Content' : 'Nội dung',
      dataKey: 'content',
      align: 'left',
      width: 200,
      render: (value) => (
        <p className="text-gray-600 text-sm line-clamp-2">
          {getContentPreview(value as string)}
        </p>
      ),
    },
    {
      label: isEnglish ? 'Author' : 'Tác giả',
      dataKey: 'author',
      align: 'left',
      width: 150,
      render: (value) => {
        const author = value as Blog['author'];
        const name = author?.fullName || author?.name || 'N/A';
        return (
          <div className="flex items-center gap-2">
            <Avatar src={author?.avatarUrl || ''} sx={{ width: 32, height: 32 }}>
              {name.charAt(0)}
            </Avatar>
            <span>{name}</span>
          </div>
        );
      },
    },
    {
      label: isEnglish ? 'Created' : 'Ngày tạo',
      dataKey: 'createdAt',
      align: 'center',
      width: 120,
      render: (value) => value ? dayjs(value as string).format('DD/MM/YYYY') : '-',
    },
    {
      label: isEnglish ? 'Status' : 'Trạng thái',
      dataKey: 'status',
      align: 'center',
      width: 120,
      render: (value) => getStatusChip(value as string),
    },
    {
      label: isEnglish ? 'Actions' : 'Thao tác',
      dataKey: 'action',
      align: 'center',
      width: 150,
      render: (_, row) => {
        return (
          <div className="flex gap-1 justify-center">
            <Tooltip title={isEnglish ? 'Preview' : 'Xem trước'}>
              <IconButton
                size="small"
                onClick={() => handlePreview(row)}
                sx={{ color: '#0C65B6' }}
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
            {row.status === 'PENDING' && (
              <>
                <Tooltip title={isEnglish ? 'Approve' : 'Duyệt'}>
                  <IconButton
                    size="small"
                    onClick={() => handleApprove(row.id)}
                    sx={{ color: '#22c55e' }}
                  >
                    <CheckCircleIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={isEnglish ? 'Reject' : 'Từ chối'}>
                  <IconButton
                    size="small"
                    onClick={() => handleReject(row.id)}
                    sx={{ color: '#ef4444' }}
                  >
                    <CancelIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
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
          {isEnglish ? 'Blog Approval' : 'Kiểm duyệt bài viết'}
        </Typography>

        <Paper className="w-full mt-4" elevation={2} sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
          <div className="mb-2 flex justify-between items-center">
            <p className="text-gray-600">
              {isEnglish ? 'Total' : 'Tổng'}: {pendingBlogs.length} {isEnglish ? 'pending blogs' : 'bài viết chờ duyệt'}
            </p>
          </div>

          <Table<BlogTableData>
            columns={columns}
            data={pendingBlogs as BlogTableData[]}
            autoHeight
            getRowId={(row) => row.id}
            emptyMessage={isEnglish ? 'No pending blogs' : 'Không có bài viết chờ duyệt'}
          />
        </Paper>

        {/* Preview Dialog */}
        <Dialog
          open={previewOpen}
          onClose={() => setPreviewOpen(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: '16px',
              fontFamily: 'Quicksand',
            },
          }}
        >
          <DialogTitle
            sx={{
              fontFamily: 'Quicksand',
              fontWeight: 'bold',
              color: '#0C65B6',
              fontSize: '20px',
            }}
          >
            {isEnglish ? 'Blog Preview' : 'Xem trước bài viết'}
          </DialogTitle>
          <DialogContent>
            {previewBlog && (
              <div>
                {previewBlog.coverImageUrl && (
                  <img
                    src={previewBlog.coverImageUrl}
                    alt={previewBlog.title}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                )}
                <Typography
                  variant="h5"
                  sx={{ fontFamily: 'Quicksand', fontWeight: 'bold', mb: 2 }}
                >
                  {previewBlog.title}
                </Typography>
                <div className="flex items-center gap-2 mb-4">
                  <Avatar
                    src={previewBlog.author?.avatarUrl || ''}
                    sx={{ width: 32, height: 32 }}
                  >
                    {(previewBlog.author?.fullName || previewBlog.author?.name || 'A').charAt(0)}
                  </Avatar>
                  <span className="text-gray-600 font-quicksand">
                    {previewBlog.author?.fullName || previewBlog.author?.name || 'N/A'}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500 text-sm">
                    {dayjs(previewBlog.createdAt).format('DD/MM/YYYY')}
                  </span>
                </div>
                <div
                  className="prose max-w-none font-quicksand text-gray-700"
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {previewBlog.content}
                </div>
              </div>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={() => setPreviewOpen(false)}
              variant="outlined"
              sx={{
                borderRadius: '10px',
                fontFamily: 'Quicksand',
                textTransform: 'none',
              }}
            >
              {isEnglish ? 'Close' : 'Đóng'}
            </Button>
            {previewBlog?.status === 'PENDING' && (
              <>
                <Button
                  onClick={() => {
                    handleReject(previewBlog.id);
                    setPreviewOpen(false);
                  }}
                  variant="outlined"
                  color="error"
                  sx={{
                    borderRadius: '10px',
                    fontFamily: 'Quicksand',
                    textTransform: 'none',
                  }}
                >
                  {isEnglish ? 'Reject' : 'Từ chối'}
                </Button>
                <Button
                  onClick={() => {
                    handleApprove(previewBlog.id);
                    setPreviewOpen(false);
                  }}
                  variant="contained"
                  color="success"
                  sx={{
                    borderRadius: '10px',
                    fontFamily: 'Quicksand',
                    textTransform: 'none',
                  }}
                >
                  {isEnglish ? 'Approve' : 'Duyệt'}
                </Button>
              </>
            )}
          </DialogActions>
        </Dialog>

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

export default AdminBlogsPageView;
