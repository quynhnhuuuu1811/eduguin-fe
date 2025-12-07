"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useUserStore } from "@/zustand/stores/UserStore";
import Img from "../../../assets/images/teacher.png";
import Banner from "../../../assets/images/VideoThumbnail.png";
import { useCommentStore } from "@/zustand/stores/CommentStore";
import { CustomButton } from "@/components/Button";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Comment from "./Comment";
import InputComment from "./InputComment";
import LoadingScreen from "@/components/LoadingScreen";
import SubcribModal from "./SubcribModal";

const Info = ({ id }: { id: string }) => {
  const [openModal, setOpenModal] = useState(false);
  const {
    selectedUser: teacher,
    loading,
    error,
    fetchTutorByID,
  } = useUserStore();
  const {
    comments: commentList,
    loading: commentLoading,
    error: commentError,
    getListCmtByTutorID,
  } = useCommentStore();
  useEffect(() => {
    if (!id) return;
    fetchTutorByID(id);
    getListCmtByTutorID(id);
  }, [id, fetchTutorByID, getListCmtByTutorID]);

  if (!id) {
    return <div>No tutor ID provided</div>;
  }

  if (loading || !teacher || commentLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const rating = teacher.tutorProfile?.rating ?? 0;
  const comments = 0;
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
    } catch { }
    return null;
  };
  const embedUrl = introUrl ? getYoutubeEmbedUrl(introUrl) : null;
  return (
    <div className="font-quicksand">
      <SubcribModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        teacherName={teacher.fullName}
        teacherAvatar={teacher.avatarUrl}
        teacherSubject={teacher.tutorProfile?.subject}
        teacherGrade={teacher.tutorProfile?.grade || ''}
        teacherPrice={teacher.tutorProfile?.monthlyPrice || 0}
      />
      <div className="grid grid-cols-12 gap-5 md:gap-6 items-start">
        {/* Avatar */}
        <div className="flex gap-6 col-span-12 md:col-span-3 items-center md:items-start justify-center md:justify-start">
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
        {/* Info */}
        <div className="flex flex-col col-span-12 md:col-span-5 gap-3">
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
            {/* Rating and Price */}
            <div className="px-4 py-3 flex items-stretch justify-between text-[20px] md:text-[28px] min-h-[80px]">
              {/* Rating */}
              <div className="flex flex-col pr-4 items-center justify-center w-full">
                <div className="flex items-center justify-center gap-1 font-bold text-[15px] md:text-[20px] lg:text-[28px] text-yellow-500">
                  <span>{rating || 5}</span>
                  <StarRateRoundedIcon
                    sx={{
                      fontSize: {
                        xs: "15px",
                        sm: "20px",
                        md: "25px",
                        lg: "30px",
                      },
                      verticalAlign: "middle",
                      color: "var(--color-yellow500)",
                      marginBlock: 0.5,
                    }}
                  />
                </div>
                <span className="text-[12px] text-gray-700">
                  {commentList.length || 0} bình luận
                </span>
              </div>

              <div className="w-px bg-[#FBBF77]" />

              {/* Price */}
              <div className="flex flex-col pl-4 items-center justify-center w-full text-[15px] md:text-[20px] lg:text-[28px]">
                <span className="font-bold text-yellow-500 font-bold">
                  {price.toLocaleString("vi-VN")} VND
                </span>
                <span className="text-[12px] text-gray-700">/tháng</span>
              </div>
            </div>

            {/* Register Button */}
            <div className="flex justify-center">
              <CustomButton type="Secondary" className="w-2/3" onClick={() => setOpenModal(true)}>
                Đăng ký học ngay!
                <ArrowForwardRoundedIcon
                  sx={{
                    fontSize: {
                      xs: "15px",
                      sm: "15px",
                      md: "20px",
                      lg: "20px",
                    },
                    verticalAlign: "middle",
                    color: "var(--color-white)",
                    marginBlock: 0.5,
                  }}
                />
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 text-black font-quicksand mt-10 ">
        <h3 className=" font-bold text-[15px] md:text-[20px] lg:text-[20px]">
          Thông tin cơ bản
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <p className="font-bold">
            Ngày sinh <span className="font-normal">{teacher.birthDate}</span>
          </p>
          <p className="font-bold">
            Email <span className="font-normal">{teacher.email}</span>
          </p>
          <p className="font-bold">
            Giới tính{" "}
            <span className="font-normal">
              {teacher.sex == "male" ? "Nam" : "Nữ"}
            </span>
          </p>
        </div>
      </div>
      <hr className="my-5 border-t-2 border-[#737E91]" />
      <div className="flex flex-col gap-5 text-black font-quicksand">
        <h3 className=" font-bold">Đánh giá của học viên</h3>
        <div className="flex flex-col gap-[20px] max-h-[300px] overflow-auto">
          {commentList && commentList.length > 0 ? (
            commentList.map((comment) => (
              <Comment
                key={comment.id}
                avatar={comment.student.avatar || ""}
                name={comment.student.name}
                content={comment.content}
                rating={comment.rating}
                date={comment.createdAt}
              />
            ))
          ) : (
            <div className="flex justify-center flex-col items-center gap-2 ">
              <img
                src="https://res.cloudinary.com/dh2uwapb8/image/upload/v1764778004/fe/fxvnauqnwitk0ixpkq2y.png"
                style={{ width: "70px", height: "70px" }}
              />
              <h5 className=" text-gray-700 font-bold opacity-50">
                Có vẻ không có bình luận nào ở đây...
              </h5>
            </div>
          )}
        </div>
      </div>
      <InputComment
        idTutor={id}
        user={{ avatar: "https://example.com/avatar.jpg", name: "User Name" }}
      />
    </div>
  );
};

export default Info;
