"use client";

import Image from "next/image";
import { use, useEffect, useState } from "react";
import { useUserStore } from "@/zustand/stores/UserStore";
import Img from "../../../assets/images/teacher.png";
import Banner from "../../../assets/images/VideoThumbnail.png";
import { useCommentStore } from "@/zustand/stores/CommentStore";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Comment from "./Comment";
import InputComment from "./InputComment";
import LoadingScreen from "@/components/LoadingScreen";
import SubcribModal from "./SubcribModal";
import { useClassStore } from "@/zustand/stores/ClassStore";
import Table, { ColumnData } from "@/components/Table";
import { Class } from "@/zustand/types/Classes";
import { useTranslation } from "@/i18n";
import { AuthUser } from "@/zustand/types/Auth";
import { useAuthStore } from "@/zustand/stores/AuthStore";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar } from '@mui/material';
import { useRouter } from "next/navigation";
import { CustomButton } from "@/components/Button";

const Info = ({ id, userInfo }: { id: string, userInfo: AuthUser }) => {
  const { t } = useTranslation();
  const isEnglish = t.common.loading === "Loading...";
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const user = useAuthStore();

  console.log(111, user.data.user?.role)
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const {
    selectedUser: teacher,
    loading,
    error,
    fetchTutorByID,
  } = useUserStore();
  const { data: authData, getMyInfo } = useAuthStore();
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

  const { getClassesByTutorId } = useClassStore();
  useEffect(() => {
    if (!id) return;
    getClassesByTutorId(id);
  }, [id, getClassesByTutorId]);

  const classes = useClassStore((state) => state.classes);
  const filteredClasses = Array.isArray(classes)
    ? classes.filter((cls) => cls && cls.status === "pending")
    : [];

  if (!id) {
    return <div>{t.tutorInfo.noTutorId}</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading || !teacher || commentLoading) {
    return <LoadingScreen />;
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

  const columns: ColumnData<Class>[] = [
    {
      label: t.tutorInfo.className,
      dataKey: "className",
      align: "left",
      width: 300,
    },
    {
      label: t.tutorInfo.startDate,
      dataKey: "startDate",
      align: "left",
      width: 180,
    },
    {
      label: t.tutorInfo.endDate,
      dataKey: "endDate",
      align: "left",
      width: 180,
    },
    {
      label: t.tutorInfo.schedule,
      dataKey: "schedules",
      align: "left",
      width: 200,
    },
  ];

  return (
    <div className="font-quicksand">
      <Dialog
        open={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            padding: '8px',
            minWidth: '350px',
          }
        }}
      >
        <DialogTitle className="text-center font-quicksand font-bold text-blue700">
          {t.auth.login.noAccount?.replace('?', '') || 'Bạn chưa đăng nhập'}
        </DialogTitle>
        <DialogContent>
          <p className="text-center text-gray-600 font-quicksand">
            {t.auth.login.loginFailed ? 'Vui lòng đăng nhập để truy cập trang này.' : 'Vui lòng đăng nhập để truy cập trang này.'}
          </p>
        </DialogContent>
        <DialogActions className="justify-center gap-2 pb-4">
          <Button
            onClick={() => setShowLoginPopup(false)}
            variant="outlined"
            color="inherit"
            sx={{ borderRadius: '20px', px: 3 }}
          >
            {t.common.cancel}
          </Button>
          <Button
            onClick={() => router.push("/login")}
            variant="contained"
            sx={{
              borderRadius: '20px',
              px: 3,
              backgroundColor: 'var(--color-blue700)',
              '&:hover': {
                backgroundColor: 'var(--color-blue800)',
              }
            }}
          >
            {t.common.login}
          </Button>
        </DialogActions>
      </Dialog>
      <SubcribModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        teacherName={teacher.fullName}
        teacherAvatar={teacher.avatarUrl}
        teacherSubject={teacher.tutorProfile?.subject}
        teacherGrade={teacher.tutorProfile?.grade.toString() || ""}
        teacherPrice={teacher.tutorProfile?.monthlyPrice || 0}
        teacherId={id}
      />
      <div className="grid grid-cols-12 gap-5 md:gap-6 items-start">
        {/* Avatar */}
        <div className="flex gap-6 col-span-12 md:col-span-3 items-center md:items-start justify-center md:justify-start">
          <div className="w-full shrink-0">
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
              {t.tutorInfo.tutor} {teacher.tutorProfile?.subject}
            </h6>
            <p className="text-[13px] text-black font-extrabold">
              {t.tutorInfo.hasClasses} {classes.length} {t.tutorInfo.openClasses}
            </p>
          </div>
          <p className="text-black text-[14px] font-normal max-w-full md:max-w-[520px]">
            {teacher.tutorProfile?.description || t.tutorInfo.noDescription}
          </p>
        </div>
        <div className="col-span-12 md:col-span-4 lg:col-span-4 mt-4 md:mt-0">
          <div className="bg-white overflow-hidden">
            <div className="h-48 md:h-[250px] relative border-[#0C65B6] border-[3px] rounded-xl overflow-hidden bg-black">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={t.tutorInfo.introVideo}
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
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">{t.tutorInfo.noVideo}</p>
                </div>
              )}
            </div>

            {/* Register Button */}
            <div className="flex justify-center mt-3">
              <CustomButton
                type="Secondary"
                className="w-2/3"
                onClick={() => {
                  if (user.data.user?.role === "student") {
                    setOpenModal(true);
                  }
                  else if (user.data.user?.role === "tutor") {
                    setOpenSnackbar(true);
                  }
                  else {
                    setShowLoginPopup(true);
                  }
                }}>
                {t.tutorInfo.registerNow}
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
      <div className="flex flex-col gap-5 text-black font-quicksand mt-10">
        <h3 className="font-bold text-[15px] md:text-[20px] lg:text-[20px]">
          {t.tutorInfo.basicInfo}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <p className="font-bold">
            {t.tutorInfo.birthDate} <span className="font-normal">{teacher.birthDate}</span>
          </p>
          <p className="font-bold">
            {t.tutorInfo.email} <span className="font-normal">{teacher.email}</span>
          </p>
          <p className="font-bold">
            {t.tutorInfo.gender}{" "}
            <span className="font-normal">
              {teacher.sex === "male" ? t.tutorInfo.male : t.tutorInfo.female}
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-5 text-black font-quicksand w-full mt-5">
        <h3 className="font-bold text-[15px] md:text-[20px] lg:text-[20px]">
          {t.tutorInfo.classList}
        </h3>
        {classes.length > 0 ? (
          <Table columns={columns} data={classes} />
        ) : (
          <div className="flex flex-col justify-center items-center gap-2">
            <img
              src="https://res.cloudinary.com/dh2uwapb8/image/upload/v1764778004/fe/fxvnauqnwitk0ixpkq2y.png"
              style={{ width: "70px", height: "70px" }}
            />
            <h5 className="text-gray-700 font-bold opacity-50">
              {t.tutorInfo.noClasses}
            </h5>
          </div>
        )}
      </div>
      <hr className="my-5 border-t-2 border-[#737E91]" />
      <div className="flex flex-col gap-5 text-black font-quicksand">
        <h3 className="font-bold">{t.tutorInfo.studentReviews}</h3>
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
            <div className="flex justify-center flex-col items-center gap-2">
              <img
                src="https://res.cloudinary.com/dh2uwapb8/image/upload/v1764778004/fe/fxvnauqnwitk0ixpkq2y.png"
                style={{ width: "70px", height: "70px" }}
              />
              <h5 className="text-gray-700 font-bold opacity-50">
                {t.tutorInfo.noComments}
              </h5>
            </div>
          )}
        </div>
      </div>
      <InputComment
        idTutor={id}
        userInfo={userInfo}
      />
      <Snackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message="Chỉ được đăng ký lớp học dưới vai trò học sinh"
      />
    </div>
  );
};

export default Info;
