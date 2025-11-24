"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useUserStore } from "@/zustand/stores/UserStore";
import Img from "../../../assets/images/teacher.png";
import Banner from "../../../assets/images/VideoThumbnail.png"; // ảnh bên phải

const Info = ({ id }: { id: string }) => {
  const {
    selectedUser: teacher,
    loading,
    error,
    fetchTutorByID,
  } = useUserStore();

  useEffect(() => {
    if (!id) return;
    fetchTutorByID(id);
  }, [id, fetchTutorByID]);

  if (!id) {
    return <div>No tutor ID provided</div>;
  }

  if (loading || !teacher) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const rating = teacher.tutorProfile?.rating ?? 0;
  const comments = teacher.cmt ?? 0;
  const price = teacher.tutorProfile?.price ?? 0;
  const introUrl = teacher.tutorProfile?.introVideoUrl;
  const getYoutubeEmbedUrl = (url: string) => {
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtube.com")) {
        const v = u.searchParams.get("v");
        if (v) return `https://www.youtube.com/embed/${v}`;
      }
      if (u.hostname === "youtu.be") {
        return `https://www.youtube.com/embed${u.pathname}`;
      }
    } catch {}
    return null;
  };

  const embedUrl = introUrl ? getYoutubeEmbedUrl(introUrl) : null;
  return (
    <div className="font-quicksand">
      <div className="grid grid-cols-12 gap-5 md:gap-6 items-start">
        <div className="flex gap-6 col-span-12 md:col-span-2 items-center md:items-start justify-center md:justify-start">
          <div className="w-full  shrink-0">
            {teacher.avatarUrl ? (
              <Image
                src={teacher.avatarUrl}
                alt="Teacher Avatar"
                width={200}
                height={200}
                className="rounded-xl w-full h-full object-cover"
              />
            ) : (
              <Image
                src={Img.src}
                alt="Teacher Avatar"
                width={200}
                height={200}
                className="rounded-xl w-full h-full object-cover"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col col-span-12 md:col-span-6 gap-3">
          <div className="flex flex-col gap-[10px]">
            <h2 className="text-black text-[28px] font-bold">
              {teacher.fullName}
            </h2>
            <h6 className="text-blue600 font-semibold text-[15px]">
              Gia sư dạy {teacher.tutorProfile?.subject}
            </h6>
            <p className="text-[13px] text-black font-extrabold">
              Đã dạy 5 học sinh
            </p>
          </div>
          <p className="text-black text-[14px] font-normal max-w-full md:max-w-[520px]">
            {teacher.tutorProfile?.description || "Gia sư chưa có mô tả."}
          </p>
        </div>
        <div className="col-span-12 md:col-span-4 lg:col-span-4 mt-4 md:mt-0">
          <div className="bg-white overflow-hidden">
            <div className="h-48 md:h-[250px] relative border-[#0C65B6] border-[3px] rounded-xl overflow-hidden bg-black">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title="Video giới thiệu gia sư"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : introUrl ? (
                <video
                  src={introUrl}
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={Banner}
                  alt="Course Banner"
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div className="px-4 py-3 flex items-stretch justify-between text-[20px] md:text-[28px] min-h-[80px]">
              <div className="flex flex-col pr-4">
                <div className="flex items-center gap-1 font-bold text-yellow-500">
                  <span>{rating || 5}</span>
                  <span>★</span>
                </div>
                <span className="text-[12px] text-gray-700">
                  {comments} bình luận
                </span>
              </div>

              <div className="w-px bg-[#FBBF77]" />

              <div className="flex flex-col pl-4">
                <span className="font-bold text-[#F97316] text-[18px] md:text-[20px]">
                  {price.toLocaleString("vi-VN")} VND
                </span>
                <span className="text-[12px] text-gray-700">/tháng</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full bg-primary500 text-white text-[14px] font-semibold py-3 px-2 rounded-full hover:bg-primary600 transition-colors">
              Đăng ký học ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
