"use client";

import Image from "next/image";
import { useState } from "react";
import Img from "../../../assets/images/FindTutor.jpg";
import TeacherImg from "../../../assets/images/teacher.png";
import Banner from "../../../assets/images/VideoThumbnail.png";
import { CustomButton } from "@/components/Button";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { Typography, TextField } from "@mui/material";
import dayjs from "dayjs";
import CustomInput from "@/components/Input";
import { useRouter } from "next/navigation";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import { useAuthStore } from "@/zustand/stores/AuthStore";
import { AuthUser } from "@/zustand/types/Auth";
import LoadingScreen from "@/components/LoadingScreen";
import { useUserStore } from "@/zustand/stores/UserStore";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "@/i18n";

interface InfoProps {
  userInfo: AuthUser;
}

const Info = ({ userInfo }: InfoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const isTutor = userInfo.role === "tutor";
  const { t } = useTranslation();
  console.log(222, isTutor);
  // Format dateOfBirth to YYYY-MM-DD for input type="date"
  const formatDateForInput = (date: string | undefined | null): string => {
    if (!date) return "";
    const parsed = dayjs(date);
    return parsed.isValid() ? parsed.format("YYYY-MM-DD") : "";
  };

  // Normalize sex value to lowercase
  const normalizeSex = (sex: string | undefined | null): string => {
    if (!sex) return "";
    const lower = sex.toLowerCase();
    if (lower === "male" || lower === "nam") return "male";
    if (lower === "female" || lower === "nữ" || lower === "nu") return "female";
    return lower;
  };

  const [editedData, setEditedData] = useState({
    description: userInfo.description || userInfo.tutorProfile?.bio || "",
    dateOfBirth: formatDateForInput(userInfo.dateOfBirth || userInfo.birthDate),
    email: userInfo.email || "",
    sex: normalizeSex(userInfo.sex),
  });

  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadImg, setUploadImg] = useState<File | null>(null);
  const [uploadVideo, setUploadVideo] = useState<File | null>(null);

  const { updateTutorInfo, updateStudentInfo } = useUserStore();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedData({
      description: userInfo.description || userInfo.tutorProfile?.bio || "",
      dateOfBirth: formatDateForInput(
        userInfo.dateOfBirth || userInfo.birthDate
      ),
      email: userInfo.email || "",
      sex: normalizeSex(userInfo.sex),
    });
    setPreviewImg(null);
    setUploadImg(null);
    if (previewVideo) {
      URL.revokeObjectURL(previewVideo);
    }
    setPreviewVideo(null);
    setUploadVideo(null);
    setIsEditing(false);
  };

  const handleSave = async () => {
    await handleUpdate();
  };

  const handleInputChange =
    (field: keyof typeof editedData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setEditedData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const introVideoUrl = userInfo.tutorProfile?.introVideoUrl;
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    router.push("/login");
  };

  const handleUploadAvatar = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        // Validate file type
        if (!file.type.startsWith("image/")) {
          alert("Vui lòng chọn file ảnh");
          return;
        }

        if (file.size > 5 * 1024 * 1024) {
          alert("Kích thước ảnh không được vượt quá 5MB");
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImg(reader.result as string);
        };
        reader.readAsDataURL(file);

        setUploadImg(file);
      }
    };
    fileInput.click();
  };

  const handleUploadVideo = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "video/*";
    fileInput.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        // Validate file type
        if (!file.type.startsWith("video/")) {
          alert("Vui lòng chọn file video");
          return;
        }

        // Validate file size (max 100MB)
        if (file.size > 100 * 1024 * 1024) {
          alert("Kích thước video không được vượt quá 100MB");
          return;
        }

        // Create preview URL
        const videoUrl = URL.createObjectURL(file);
        setPreviewVideo(videoUrl);

        // Set upload video
        setUploadVideo(file);
      }
    };
    fileInput.click();
  };

  const handleUpdate = async () => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      if (uploadImg) {
        formData.append("avatar", uploadImg);
      }
      if (uploadVideo) {
        formData.append("introVideoUrl", uploadVideo);
      }
      if (editedData.description) {
        formData.append("description", editedData.description);
      }
      if (editedData.dateOfBirth) {
        formData.append("dateOfBirth", editedData.dateOfBirth);
      }
      if (editedData.email) {
        formData.append("email", editedData.email);
      }
      if (editedData.sex) {
        formData.append("sex", editedData.sex);
      }

      if (isTutor) {
        await updateTutorInfo(formData);
      } else {
        await updateStudentInfo(formData);
      }

      // Clear preview and upload state after successful upload
      setPreviewImg(null);
      setUploadImg(null);
      if (previewVideo) {
        URL.revokeObjectURL(previewVideo);
      }
      setPreviewVideo(null);
      setUploadVideo(null);

      // Refresh user info
      const { getMyInfo } = useAuthStore.getState();
      await getMyInfo();
      setIsEditing(false);
    } catch (error: unknown) {
      console.error("Error updating user info:", error);
      const errorMessage =
        error && typeof error === "object" && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined;
      alert(errorMessage || "Có lỗi xảy ra khi cập nhật thông tin");
      // Reset on error
      setPreviewImg(null);
      setUploadImg(null);
      if (previewVideo) {
        URL.revokeObjectURL(previewVideo);
      }
      setPreviewVideo(null);
      setUploadVideo(null);
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <>
      {isUploading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="font-quicksand w-full max-w-[90%] mt-5 flex items-center flex-col justify-center mx-auto">
            <Typography
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: {
                  xs: "50px",
                  sm: "80px",
                  md: "120px",
                  lg: "120px",
                },
                fontFamily: "quicksand",
                fontWeight: "bold",
                fontSize: {
                  xs: "15px",
                  sm: "20px",
                  md: "25px",
                  lg: "28px",
                },
                color: "#0C65B6",
                marginBottom: {
                  xs: "20px",
                  sm: "20px",
                  md: "50px",
                  lg: "50px",
                },
              }}>
              {t.profile.title}
            </Typography>

            {/* Profile Section */}
            <div className="grid grid-cols-12 gap-5 md:gap-6 items-start w-full">
              {/* Avatar */}
              <div className="flex gap-8 col-span-12 md:col-span-2 items-center md:items-start justify-center md:justify-start">
                <div className="w-full shrink-0 relative group cursor-pointer">
                  {previewImg ? (
                    <Image
                      src={previewImg}
                      alt="Avatar Preview"
                      width={200}
                      height={200}
                      className="rounded-xl w-full h-full aspect-square object-cover"
                    />
                  ) : userInfo.avatarUrl || userInfo.avatar ? (
                    <Image
                      src={userInfo.avatarUrl || userInfo.avatar || ""}
                      alt="Avatar"
                      width={200}
                      height={200}
                      className="rounded-xl w-full h-auto aspect-square object-cover"
                    />
                  ) : (
                    <Image
                      src="https://res.cloudinary.com/dh2uwapb8/image/upload/v1765078223/fe/fliiqbvbsfiwel8b3k2j.jpg"
                      alt="Avatar"
                      width={200}
                      height={200}
                      className="rounded-xl w-full h-full object-cover"
                    />
                  )}
                  {isUploading && (
                    <div className="absolute top-0 left-0 w-full aspect-square flex items-center justify-center bg-black bg-opacity-50 rounded-xl z-10">
                      <Typography className="text-white">
                        Đang tải...
                      </Typography>
                    </div>
                  )}
                  {isEditing && (
                    <div className="absolute top-0 left-0 w-full aspect-square flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 pointer-events-none">
                      <UploadFileRoundedIcon
                        onClick={handleUploadAvatar}
                        className="text-white bg-black bg-opacity-70 rounded-full p-2 hover:bg-opacity-50 cursor-pointer pointer-events-auto"
                        sx={{ fontSize: "70px" }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col col-span-12 md:col-span-5 gap-3">
                <div className="flex flex-col gap-[10px]">
                  <h2 className="text-black text-[28px] font-bold">
                    {userInfo.fullName || userInfo.name || "-"}
                  </h2>
                  <h6 className="text-blue600 font-semibold text-[15px]">
                    {isTutor
                      ? `${t.home.roleOptions.tutorTitle} ${userInfo.tutorProfile?.subject} ${userInfo.tutorProfile?.grade}`
                      : t.home.roleOptions.studentTitle}
                  </h6>
                </div>
                {/* Chỉ hiện description cho tutor */}
                {isTutor &&
                  (isEditing ? (
                    <CustomInput
                      label={t.auth.tutorRegister.description}
                      type="text"
                      value={editedData.description}
                      onChange={handleInputChange("description")}
                      name="description"
                    />
                  ) : userInfo?.description || userInfo.tutorProfile?.bio ? (
                    <p className="text-black text-[14px] font-normal max-w-full md:max-w-[520px]">
                      {userInfo.description || userInfo.tutorProfile?.bio}
                    </p>
                  ) : (
                    <p className="text-black text-[14px] font-normal max-w-full md:max-w-[520px]">
                      -
                    </p>
                  ))}
              </div>

              {/* Video/Info Card */}
              <div className="col-span-12 md:col-span-4 lg:col-span-4 mt-4 md:mt-0">
                <div className="bg-white overflow-hidden">
                  {isTutor && (
                    <div className="h-48 md:h-[250px] relative border-[#0C65B6] border-[3px] rounded-xl overflow-hidden bg-black group">
                      {previewVideo ? (
                        <video
                          src={previewVideo}
                          controls
                          className="w-full h-full object-cover"
                        />
                      ) : introVideoUrl ? (
                        <video
                          src={introVideoUrl}
                          controls
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray900 text-white">
                          Không có video giới thiệu
                        </div>
                      )}
                      {isUploading && (
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 rounded-xl z-10">
                          <Typography className="text-white">
                            Đang tải...
                          </Typography>
                        </div>
                      )}
                      {isEditing && (
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 pointer-events-none">
                          <UploadFileRoundedIcon
                            onClick={handleUploadVideo}
                            className="text-white bg-black bg-opacity-70 rounded-full p-2 hover:bg-opacity-50 cursor-pointer pointer-events-auto"
                            sx={{ fontSize: "70px" }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="flex flex-col gap-5 text-black font-quicksand mt-10 w-full max-w-[90%] mx-auto">
            <h3 className="font-bold text-[15px] md:text-[20px] lg:text-[20px]">
              {t.profile.personalInfo}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {isEditing ? (
                <>
                  <div>
                    <CustomInput
                      label={t.profile.dateOfBirth}
                      type="date"
                      value={editedData.dateOfBirth}
                      onChange={handleInputChange("dateOfBirth")}
                      name="dateOfBirth"
                    />
                  </div>
                  <div>
                    <CustomInput
                      label={t.profile.email}
                      type="email"
                      value={editedData.email}
                      onChange={handleInputChange("email")}
                      name="email"
                    />
                  </div>
                  <div>
                    <CustomInput
                      label={t.profile.gender}
                      type="select"
                      value={editedData.sex}
                      onChange={handleInputChange("sex")}
                      name="sex"
                      options={[
                        { value: "male", label: t.profile.male },
                        { value: "female", label: t.profile.female },
                      ]}
                    />
                  </div>
                </>
              ) : (
                <>
                  <p className="font-bold">
                    {t.profile.dateOfBirth}{" "}
                    <span className="font-normal">
                      {userInfo.dateOfBirth || userInfo.birthDate
                        ? dayjs(
                            userInfo.dateOfBirth || userInfo.birthDate
                          ).format("DD/MM/YYYY")
                        : "-"}
                    </span>
                  </p>
                  <p className="font-bold">
                    {t.profile.email}{" "}
                    <span className="font-normal">{userInfo.email || "-"}</span>
                  </p>
                  <p className="font-bold">
                    {t.profile.gender}{" "}
                    <span className="font-normal">
                      {userInfo.sex === "male"
                        ? t.profile.male
                        : userInfo.sex === "female"
                          ? t.profile.female
                          : "-"}
                    </span>
                  </p>
                  {(userInfo.phone || userInfo.phoneNumber) && (
                    <p className="font-bold">
                      {t.profile.phone}{" "}
                      <span className="font-normal">
                        {userInfo.phone || userInfo.phoneNumber}
                      </span>
                    </p>
                  )}
                  {userInfo.address && (
                    <p className="font-bold col-span-2">
                      {t.profile.address}{" "}
                      <span className="font-normal">{userInfo.address}</span>
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Settings - Language */}
          <div className="flex flex-col gap-5 text-black font-quicksand mt-10 w-full max-w-[90%] mx-auto">
            <h3 className="font-bold text-[15px] md:text-[20px] lg:text-[20px]">
              {t.profile.settings}
            </h3>
            <div className="flex items-center gap-4">
              <span className="font-medium">{t.profile.language}:</span>
              <LanguageSwitcher size="small" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row gap-3 mt-6 w-full max-w-[90%] mx-auto justify-center">
            {isEditing ? (
              <>
                <CustomButton
                  type="Secondary"
                  className="flex items-center gap-2 !bg-gray-500 !text-white hover:!bg-gray-600"
                  onClick={handleCancel}>
                  <CancelIcon sx={{ fontSize: "18px" }} />
                  {t.common.cancel}
                </CustomButton>
                <CustomButton
                  type="Secondary"
                  className="flex items-center gap-2 !bg-green-500 !text-white hover:!bg-green-600"
                  onClick={handleSave}>
                  <SaveIcon sx={{ fontSize: "18px" }} />
                  {t.common.save}
                </CustomButton>
              </>
            ) : (
              <>
                <CustomButton
                  type="Secondary"
                  className="flex items-center gap-2 !bg-blue100 !text-blue700"
                  onClick={handleEdit}>
                  <EditIcon sx={{ fontSize: "18px" }} />
                  {t.common.edit}
                </CustomButton>
                <CustomButton
                  type="Secondary"
                  className="flex items-center gap-2 !bg-yellow100 !text-yellow500"
                  onClick={handleLogout}>
                  <LogoutIcon sx={{ fontSize: "18px" }} />
                  {t.common.logout}
                </CustomButton>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Info;
