"use client";

import Image from "next/image";
import { useState } from "react";
import Img from "../../../assets/images/FindTutor.jpg";
import TeacherImg from "../../../assets/images/teacher.png";
import Banner from "../../../assets/images/VideoThumbnail.png";
import { CustomButton } from "@/components/Button";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { UserResponse } from "@/zustand/types/User";
import { Typography, TextField } from "@mui/material";
import dayjs from "dayjs";
import CustomInput from "@/components/Input";
import { useRouter } from "next/navigation";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import { useAuthStore } from "@/zustand/stores/AuthStore";

interface InfoProps {
  userInfo: {
    data: {
      data: UserResponse;
    };
  };
}

const Info = ({ userInfo }: InfoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    description: (userInfo.data.data as any).description || "",
    dateOfBirth: (userInfo.data.data as any).dateOfBirth || "",
    email: (userInfo.data.data as any).email || "",
    sex: (userInfo.data.data as any).sex || "",
  });

  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadImg, setUploadImg] = useState<File | null>(null);

  const { updateMyInfo } = useAuthStore();
  const id = userInfo.data.data.id;
  const isTutor = userInfo.data.data.role === "tutor";
  const introUrl = userInfo.data.data.introVideoUrl;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedData({
      description: userInfo.description || "",
      dateOfBirth: userInfo.dateOfBirth || "",
      email: userInfo.email || "",
      sex: userInfo.sex || "",
    });
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
  const router = useRouter();

  const handleLogout = () => {
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

  const handleUpdate = async () => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      if (uploadImg) {
        formData.append("avatar", uploadImg);
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

      await updateMyInfo(formData);

      // Clear preview and upload state after successful upload
      setPreviewImg(null);
      setUploadImg(null);

      // Refresh user info
      const { getMyInfo } = useAuthStore.getState();
      await getMyInfo();
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
    } finally {
      setIsUploading(false);
    }
  };
  return (
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
          Thông tin cá nhân
        </Typography>

        {/* Profile Section */}
        <div className="grid grid-cols-12 gap-5 md:gap-6 items-start w-full">
          {/* Avatar */}
          <div className="flex gap-6 col-span-12 md:col-span-3 items-center md:items-start justify-center md:justify-start">
            <div className="w-full shrink-0 relative group cursor-pointer">
              {previewImg ? (
                <Image
                  src={previewImg}
                  alt="Avatar Preview"
                  width={200}
                  height={200}
                  className="rounded-xl w-full h-auto aspect-square object-cover"
                />
              ) : userInfo.avatar ? (
                <Image
                  src={userInfo.avatar}
                  alt="Avatar"
                  width={200}
                  height={200}
                  className="rounded-xl w-full h-auto aspect-square object-cover"
                />
              ) : (
                <Image
                  src={isTutor ? TeacherImg.src : Img.src}
                  alt="Avatar"
                  width={200}
                  height={200}
                  className="rounded-xl w-full h-full object-cover"
                />
              )}
              {isUploading && (
                <div className="absolute top-0 left-0 w-full aspect-square flex items-center justify-center bg-black bg-opacity-50 rounded-xl z-10">
                  <Typography className="text-white">Đang tải...</Typography>
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
                {userInfo.fullName || userInfo.name}
              </h2>
              <h6 className="text-blue600 font-semibold text-[15px]">
                {isTutor ? `Gia sư ${userInfo.subject || ""}` : "Học sinh"}
              </h6>
            </div>
            {isEditing ? (
              <CustomInput
                label="Mô tả..."
                type="text"
                value={editedData.description}
                onChange={handleInputChange("description")}
                name="description"
              />
            ) : userInfo?.description ? (
              <p className="text-black text-[14px] font-normal max-w-full md:max-w-[520px]">
                {userInfo.description}
              </p>
            ) : (
              <p className="text-black text-[14px] font-normal max-w-full md:max-w-[520px]">
                Chưa cập nhật
              </p>
            )}
          </div>

          {/* Video/Info Card */}
          <div className="col-span-12 md:col-span-4 lg:col-span-4 mt-4 md:mt-0">
            <div className="bg-white overflow-hidden">
              {isTutor && (
                <div className="h-48 md:h-[250px] relative border-[#0C65B6] border-[3px] rounded-xl overflow-hidden bg-black">
                  {embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title="Video giới thiệu"
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
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="flex flex-col gap-5 text-black font-quicksand mt-10 w-full max-w-[90%] mx-auto">
        <h3 className="font-bold text-[15px] md:text-[20px] lg:text-[20px]">
          Thông tin cơ bản
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {isEditing ? (
            <>
              <div>
                <CustomInput
                  label="Ngày sinh"
                  type="date"
                  value={editedData.dateOfBirth}
                  onChange={handleInputChange("dateOfBirth")}
                  name="dateOfBirth"
                />
              </div>
              <div>
                <CustomInput
                  label="Email"
                  type="email"
                  value={editedData.email}
                  onChange={handleInputChange("email")}
                  name="email"
                />
              </div>
              <div>
                <CustomInput
                  label="Giới tính"
                  type="select"
                  value={editedData.sex}
                  onChange={handleInputChange("sex")}
                  name="sex"
                  options={[
                    { value: "male", label: "Nam" },
                    { value: "female", label: "Nữ" },
                  ]}
                />
              </div>
            </>
          ) : (
            <>
              <p className="font-bold">
                Ngày sinh{" "}
                <span className="font-normal">
                  {userInfo.dateOfBirth
                    ? dayjs(userInfo.dateOfBirth).format("DD/MM/YYYY")
                    : "Chưa cập nhật"}
                </span>
              </p>
              <p className="font-bold">
                Email <span className="font-normal">{userInfo.email}</span>
              </p>
              <p className="font-bold">
                Giới tính{" "}
                <span className="font-normal">
                  {userInfo.sex === "male"
                    ? "Nam"
                    : userInfo.sex === "female"
                      ? "Nữ"
                      : "Chưa cập nhật"}
                </span>
              </p>
              {userInfo.phone && (
                <p className="font-bold">
                  Số điện thoại{" "}
                  <span className="font-normal">{userInfo.phone}</span>
                </p>
              )}
              {userInfo.address && (
                <p className="font-bold col-span-2">
                  Địa chỉ{" "}
                  <span className="font-normal">{userInfo.address}</span>
                </p>
              )}
            </>
          )}
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
              Hủy
            </CustomButton>
            <CustomButton
              type="Secondary"
              className="flex items-center gap-2 !bg-green-500 !text-white hover:!bg-green-600"
              onClick={handleSave}>
              <SaveIcon sx={{ fontSize: "18px" }} />
              Lưu
            </CustomButton>
          </>
        ) : (
          <>
            <CustomButton
              type="Secondary"
              className="flex items-center gap-2 !bg-blue100 !text-blue700"
              onClick={handleEdit}>
              <EditIcon sx={{ fontSize: "18px" }} />
              Chỉnh sửa
            </CustomButton>
            <CustomButton
              type="Secondary"
              className="flex items-center gap-2 !bg-yellow100 !text-yellow500"
              onClick={handleLogout}>
              <LogoutIcon sx={{ fontSize: "18px" }} />
              Đăng xuất
            </CustomButton>
          </>
        )}
      </div>
    </>
  );
};

export default Info;
