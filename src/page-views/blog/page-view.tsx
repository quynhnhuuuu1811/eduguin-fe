"use client";

import React, { useState, useEffect } from "react";
import { Typography, Tabs, Tab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PublicIcon from "@mui/icons-material/Public";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { CustomButton } from "@/components/Button";
import BlogCard from "./components/BlogCard";
import CreateBlogModal, { BlogFormData } from "./components/CreateBlogModal";
import { useAuthStore } from "@/zustand/stores/AuthStore";
import { useBlogStore } from "@/zustand/stores/BlogStore";
import { useTranslation } from "@/i18n";
import LoadingScreen from "@/components/LoadingScreen";
import { Blog } from "@/zustand/types/Blog";


const BlogPageView = () => {
  const { t } = useTranslation();
  const isEnglish = t.common.loading === "Loading...";
  const { data } = useAuthStore();
  const user = data?.user;
  const {
    publicBlogs,
    myBlogs,
    loading: storeLoading,
    getMyBlogs,
    getPublicBlogs,
  } = useBlogStore();

  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const isTutor = user?.role === "tutor";

  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      try {
        await getPublicBlogs();
        if (isTutor) {
          await getMyBlogs();
        }
      } catch (error) {
        console.error("Error loading blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, [isTutor, getMyBlogs, getPublicBlogs]);

  const handleCreateBlog = async (data: BlogFormData) => {
    console.log("Creating blog:", data);
    // Blog creation is handled in CreateBlogModal
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getCurrentBlogs = (): Blog[] => {
    if (tabValue === 0) {
      return publicBlogs;
    } else {
      // Use myBlogs state from store
      return myBlogs;
    }
  };
  console.log(publicBlogs);

  if (loading || storeLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 py-30 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Quicksand",
              fontWeight: "bold",
              color: "white",
              mb: 2,
            }}
          >
            {isEnglish ? "EduGuin Blog" : "Blog EduGuin"}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Quicksand",
              color: "rgba(255,255,255,0.9)",
              fontSize: "18px",
            }}
          >
            {isEnglish
              ? "Share knowledge, learn together"
              : "Chia sẻ kiến thức, cùng nhau học tập"}
          </Typography>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tabs & Action bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          {/* Tabs - Only show for tutors */}
          {isTutor ? (
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                "& .MuiTab-root": {
                  fontFamily: "Quicksand",
                  fontWeight: 600,
                  textTransform: "none",
                  minHeight: "48px",
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#0C65B6",
                },
              }}
            >
              <Tab
                icon={<PublicIcon sx={{ fontSize: 20 }} />}
                iconPosition="start"
                label={isEnglish ? "Public Blogs" : "Blog công khai"}
              />
              <Tab
                icon={<PendingActionsIcon sx={{ fontSize: 20 }} />}
                iconPosition="start"
                label={
                  isEnglish
                    ? `My Blogs (${myBlogs.length})`
                    : `Bài viết của tôi (${myBlogs.length})`
                }
              />
            </Tabs>
          ) : (
            <div /> // Empty div for flex spacing
          )}

          {/* Create button (only for tutors) */}
          {isTutor && (
            <CustomButton
              type="Secondary"
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2"
            >
              <AddIcon sx={{ fontSize: 20 }} />
              {isEnglish ? "Create Blog" : "Viết bài"}
            </CustomButton>
          )}
        </div>

        {/* Blog Grid */}
        {getCurrentBlogs().length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getCurrentBlogs().map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                showStatus={tabValue === 1}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Typography
              sx={{
                fontFamily: "Quicksand",
                color: "#666",
                fontSize: "16px",
              }}
            >
              {tabValue === 0
                ? isEnglish
                  ? "No public blogs yet"
                  : "Chưa có bài viết công khai nào"
                : isEnglish
                  ? "You haven't written any blogs yet"
                  : "Bạn chưa có bài viết nào"}
            </Typography>
          </div>
        )}
      </div>

      {/* Create Blog Modal */}
      <CreateBlogModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateBlog}
      />
    </div>
  );
};

export default BlogPageView;
