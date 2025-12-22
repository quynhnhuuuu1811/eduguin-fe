import { CustomButton } from "@/components/Button";
import CustomInput from "@/components/Input";
import LoadingScreen from "@/components/LoadingScreen";
import OtpInput from "@/components/OTPInput";
import { useAuthStore } from "@/zustand/stores/AuthStore";
import { useUserStore } from "@/zustand/stores/UserStore";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({ open, onClose }: ChangePasswordModalProps) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");

  const { resetPassword } = useAuthStore();
  const { data } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const handleChangePassword = () => {
    setIsLoading(true);
    resetPassword({
      email: data?.user?.email || "",
      otp: otp,
      password: newPassword,
      confirmPassword: confirmPassword,
    });
    onClose();
    setIsLoading(false);
  };
  return (
    <div className="flex justify-center items-center w-full">
      {isLoading && (
        <LoadingScreen />
      )}
      <Dialog open={open} onClose={onClose} className="p-10 gap-5">
        <DialogTitle>Đổi mật khẩu</DialogTitle>

        <DialogContent className="flex flex-col gap-5">
          <CustomInput
            label="Mật khẩu mới"
            type="password"
            value={newPassword}
            onChange={(e: any) => setNewPassword(e.target.value)}
            name="newPassword"
          />
          <CustomInput
            label="Xác nhận mật khẩu"
            type="password"
            value={confirmPassword}
            onChange={(e: any) => setConfirmPassword(e.target.value)}
            name="confirmPassword"
          />
          <OtpInput
            length={6}
            value={otp}
            onChange={(val) => setOtp(val)}
          />
          <CustomButton
            type="Primary"
            onClick={handleChangePassword}
          >
            Đổi mật khẩu
          </CustomButton>
        </DialogContent>
      </Dialog >
    </div>
  );
}