"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Avatar, Chip } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import dayjs from "dayjs";
import { Blog } from "@/zustand/types/Blog";

interface BlogCardProps {
  blog: Blog;
  showStatus?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, showStatus = false }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/blog/${blog.id}`);
  };

  // Clean and truncate content for preview
  const getContentPreview = (text: string, maxLength: number = 150): string => {
    if (!text) return "";

    // Remove HTML tags
    let cleaned = text.replace(/<[^>]*>/g, "");

    // Replace \r\n and \n with spaces
    cleaned = cleaned.replace(/\r\n/g, " ").replace(/\n/g, " ");

    // Remove numbered headings like "1)", "2)"
    cleaned = cleaned.replace(/\d+\)\s*/g, "");

    // Remove multiple spaces
    cleaned = cleaned.replace(/\s+/g, " ").trim();

    // Truncate
    if (cleaned.length <= maxLength) return cleaned;
    return cleaned.substring(0, maxLength) + "...";
  };

  const getStatusChip = () => {
    if (!showStatus) return null;

    switch (blog.status) {
      case "PENDING":
        return (
          <Chip
            icon={<PendingIcon sx={{ fontSize: 16 }} />}
            label="Chờ duyệt"
            size="small"
            sx={{
              backgroundColor: "#fef3c7",
              color: "#d97706",
              fontFamily: "Quicksand",
              fontWeight: 600,
            }}
          />
        );
      case "APPROVED":
        return (
          <Chip
            icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
            label="Đã duyệt"
            size="small"
            sx={{
              backgroundColor: "#d1fae5",
              color: "#059669",
              fontFamily: "Quicksand",
              fontWeight: 600,
            }}
          />
        );
      case "REJECTED":
        return (
          <Chip
            label="Từ chối"
            size="small"
            sx={{
              backgroundColor: "#fee2e2",
              color: "#dc2626",
              fontFamily: "Quicksand",
              fontWeight: 600,
            }}
          />
        );
      default:
        return null;
    }
  };

  // Get author display name
  const getAuthorName = () => {
    if (!blog.author) return null;
    return blog.author.fullName || blog.author.name || null;
  };

  const authorName = getAuthorName();

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        {blog.coverImageUrl ? (
          <Image
            src={blog.coverImageUrl}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <span className="text-white text-4xl font-bold opacity-50">
              {blog.title.charAt(0)}
            </span>
          </div>
        )}
        {/* Status badge */}
        {showStatus && (
          <div className="absolute top-2 right-2">
            {getStatusChip()}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-quicksand font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {blog.title}
        </h3>

        {/* Preview content */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 font-quicksand">
          {getContentPreview(blog.content)}
        </p>

        {/* Author info & Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {blog.author?.avatarUrl ? (
              <Image
                src={blog.author.avatarUrl}
                alt={authorName || ""}
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
            ) : authorName ? (
              <Avatar sx={{ width: 32, height: 32, fontSize: 14 }}>
                {authorName.charAt(0)}
              </Avatar>
            ) : null}
            {authorName && (
              <p className="text-sm font-semibold text-gray-800 font-quicksand">
                {authorName}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <AccessTimeIcon sx={{ fontSize: 14 }} />
            <span>{dayjs(blog.createdAt).format("DD/MM/YYYY")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
