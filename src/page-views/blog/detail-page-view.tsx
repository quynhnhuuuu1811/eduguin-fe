"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Typography, Avatar, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShareIcon from "@mui/icons-material/Share";
import dayjs from "dayjs";
import { useBlogStore } from "@/zustand/stores/BlogStore";
import { useTranslation } from "@/i18n";
import LoadingScreen from "@/components/LoadingScreen";
import { Blog } from "@/zustand/types/Blog";

// Format content from API to display nicely
const formatBlogContent = (content: string): string => {
  if (!content) return "";

  // First, normalize line endings
  let formatted = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // Split by double line breaks (paragraphs)
  const paragraphs = formatted.split(/\n\n+/);

  const formattedParagraphs = paragraphs.map((paragraph) => {
    // Trim each paragraph
    paragraph = paragraph.trim();
    if (!paragraph) return "";

    // Check if it's a numbered heading like "1)", "2)", etc.
    const numberedHeadingMatch = paragraph.match(/^(\d+)\)\s*(.+)$/);
    if (numberedHeadingMatch) {
      const number = numberedHeadingMatch[1];
      const text = numberedHeadingMatch[2];
      return `<h3 class="text-xl font-bold text-blue-600 mt-6 mb-3">${number}. ${text}</h3>`;
    }

    // Check if it starts with "Kết" or "Kết luận" (conclusion)
    if (paragraph.match(/^Kết\s*$/i) || paragraph.match(/^Kết luận/i)) {
      return `<h3 class="text-xl font-bold text-blue-600 mt-6 mb-3">${paragraph}</h3>`;
    }

    // Check if it's a bullet point (starts with - or •)
    if (paragraph.match(/^[-•]\s/)) {
      const items = paragraph.split(/\n/).map((item) => {
        const cleanItem = item.replace(/^[-•]\s*/, "").trim();
        return cleanItem ? `<li>${cleanItem}</li>` : "";
      });
      return `<ul class="list-disc pl-6 mb-4 space-y-2">${items.join("")}</ul>`;
    }

    // Handle lines within a paragraph (single line breaks)
    const lines = paragraph.split(/\n/);
    if (lines.length > 1) {
      // Check if it looks like a list (multiple items starting with similar patterns)
      const hasListItems = lines.some(
        (line) =>
          line.match(/^[-•]\s/) ||
          line.match(/^[a-zA-Z]\.\s/) ||
          line.match(/^\d+\.\s/)
      );

      if (hasListItems) {
        const items = lines
          .map((line) => {
            const cleanLine = line
              .replace(/^[-•]\s*/, "")
              .replace(/^[a-zA-Z]\.\s*/, "")
              .trim();
            return cleanLine ? `<li>${cleanLine}</li>` : "";
          })
          .filter(Boolean);
        return `<ul class="list-disc pl-6 mb-4 space-y-2">${items.join("")}</ul>`;
      }

      // Regular paragraph with line breaks
      return `<p class="mb-4 leading-relaxed">${lines.join("<br>")}</p>`;
    }

    // Regular paragraph
    return `<p class="mb-4 leading-relaxed">${paragraph}</p>`;
  });

  return formattedParagraphs.filter(Boolean).join("");
};

interface BlogDetailPageViewProps {
  blogId: string;
}

const BlogDetailPageView: React.FC<BlogDetailPageViewProps> = ({ blogId }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const isEnglish = t.common.loading === "Loading...";
  const { getBlogById } = useBlogStore();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      setLoading(true);
      try {
        const blogData = await getBlogById(blogId);
        setBlog(blogData);
      } catch (error) {
        console.error("Error loading blog:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [blogId, getBlogById]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(isEnglish ? "Link copied to clipboard!" : "Đã sao chép link!");
    }
  };

  // Get author name
  const getAuthorName = () => {
    if (!blog?.author) return "Gia sư";
    return blog.author.fullName || blog.author.name || "Gia sư";
  };

  if (loading) return <LoadingScreen />;

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Typography sx={{ fontFamily: "Quicksand" }}>
          {isEnglish ? "Blog not found" : "Không tìm thấy bài viết"}
        </Typography>
      </div>
    );
  }

  const authorName = getAuthorName();
  const formattedContent = formatBlogContent(blog.content);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
          <IconButton onClick={() => router.back()}>
            <ArrowBackIcon />
          </IconButton>
          <Typography
            sx={{
              fontFamily: "Quicksand",
              fontWeight: 600,
              color: "#333",
              flex: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {blog.title}
          </Typography>
          <IconButton onClick={handleShare}>
            <ShareIcon />
          </IconButton>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-6">
        {/* Cover Image */}
        {blog.coverImageUrl && (
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-6">
            <Image
              src={blog.coverImageUrl}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Title */}
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Quicksand",
            fontWeight: "bold",
            color: "#1a1a1a",
            mb: 2,
            lineHeight: 1.4,
          }}
        >
          {blog.title}
        </Typography>

        {/* Author */}
        <div className="flex items-center gap-3 mb-6 pb-6 border-b">
          {blog.author?.avatarUrl ? (
            <Image
              src={blog.author.avatarUrl}
              alt={authorName}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
          ) : (
            <Avatar sx={{ width: 48, height: 48 }}>
              {authorName.charAt(0)}
            </Avatar>
          )}
          <div>
            <p className="font-semibold text-gray-800 font-quicksand">
              {authorName}
            </p>
            <p className="text-sm text-gray-500 font-quicksand">
              {isEnglish ? "Tutor" : "Gia sư"} • {dayjs(blog.createdAt).format("DD/MM/YYYY")}
            </p>
          </div>
        </div>

        {/* Content */}
        <article
          className="prose prose-lg max-w-none mb-8 font-quicksand text-gray-700"
          dangerouslySetInnerHTML={{ __html: formattedContent }}
          style={{
            fontFamily: "Quicksand",
          }}
        />
      </div>
    </div>
  );
};

export default BlogDetailPageView;
