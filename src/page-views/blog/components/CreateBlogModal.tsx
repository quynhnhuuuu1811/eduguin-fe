"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import { useTranslation } from "@/i18n";
import LexicalEditor from "./LexicalEditor";
import { useBlogStore } from "@/zustand/stores/BlogStore";

interface CreateBlogModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: BlogFormData) => void;
}

export interface BlogFormData {
  title: string;
  content: string;
  cover?: File;
}

const CreateBlogModal: React.FC<CreateBlogModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const isEnglish = t.common.loading === "Loading...";

  const { createBlog } = useBlogStore();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Snackbar state
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "warning";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message: string, severity: "success" | "error" | "warning") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        showSnackbar(
          isEnglish ? "Please select an image file" : "Vui lòng chọn file ảnh",
          "error"
        );
        return;
      }
      // Max 2MB
      if (file.size > 2 * 1024 * 1024) {
        showSnackbar(
          isEnglish ? "Image size must be less than 2MB" : "Kích thước ảnh không được vượt quá 2MB",
          "error"
        );
        return;
      }
      setCoverFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContentChange = (text: string) => {
    setContent(text);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      showSnackbar(
        isEnglish ? "Please fill in title and content" : "Vui lòng nhập tiêu đề và nội dung",
        "warning"
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await createBlog({
        title: title.trim(),
        content: content.trim(),
        cover: coverFile || undefined,
      });
      showSnackbar(
        isEnglish ? "Blog created successfully!" : "Tạo bài viết thành công!",
        "success"
      );
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (error) {
      showSnackbar(
        isEnglish ? "Failed to create blog. Please try again." : "Tạo bài viết thất bại. Vui lòng thử lại.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setTitle("");
    setContent("");
    setCoverFile(null);
    setCoverPreview(null);
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            fontFamily: "Quicksand",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Quicksand",
            fontWeight: "bold",
            color: "#0C65B6",
            fontSize: "20px",
          }}
        >
          {isEnglish ? "Create New Blog" : "Tạo bài viết mới"}
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          {/* Cover Upload */}
          <Box
            sx={{
              mb: 3,
              border: "2px dashed #ccc",
              borderRadius: "12px",
              p: 2,
              textAlign: "center",
              cursor: "pointer",
              "&:hover": {
                borderColor: "#0C65B6",
                backgroundColor: "rgba(12, 101, 182, 0.05)",
              },
            }}
            onClick={() => document.getElementById("cover-input")?.click()}
          >
            {coverPreview ? (
              <img
                src={coverPreview}
                alt="Cover preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <Box sx={{ py: 3 }}>
                <ImageIcon sx={{ fontSize: 48, color: "#ccc" }} />
                <p className="text-gray-500 mt-2 font-quicksand">
                  {isEnglish ? "Click to upload cover image (max 2MB)" : "Nhấn để tải ảnh bìa (tối đa 2MB)"}
                </p>
              </Box>
            )}
            <input
              id="cover-input"
              type="file"
              accept="image/*"
              hidden
              onChange={handleCoverChange}
            />
          </Box>

          {/* Title */}
          <TextField
            fullWidth
            label={isEnglish ? "Title" : "Tiêu đề"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                fontFamily: "Quicksand",
              },
              "& .MuiInputLabel-root": {
                fontFamily: "Quicksand",
              },
            }}
          />

          {/* Content - Lexical Editor */}
          <div className="mb-2">
            <label className="block text-gray-700 font-quicksand mb-2 text-sm">
              {isEnglish ? "Content" : "Nội dung"}
            </label>
            <LexicalEditor
              onChange={handleContentChange}
              placeholder={isEnglish ? "Write your blog content here..." : "Viết nội dung bài viết của bạn ở đây..."}
            />
          </div>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              borderRadius: "10px",
              fontFamily: "Quicksand",
              textTransform: "none",
              px: 3,
            }}
          >
            {isEnglish ? "Cancel" : "Hủy"}
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={isSubmitting || !title.trim() || !content.trim()}
            sx={{
              borderRadius: "10px",
              fontFamily: "Quicksand",
              fontWeight: "bold",
              textTransform: "none",
              px: 3,
              backgroundColor: "#0C65B6",
              "&:hover": {
                backgroundColor: "#0a5299",
              },
            }}
          >
            {isSubmitting
              ? isEnglish
                ? "Publishing..."
                : "Đang đăng..."
              : isEnglish
                ? "Publish"
                : "Đăng bài"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            fontFamily: "Quicksand",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateBlogModal;
