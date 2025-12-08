import { CustomButton } from "@/components/Button";
import CustomInput from "@/components/Input";
import LoadingScreen from "@/components/LoadingScreen";
import { useClassStore } from "@/zustand/stores/ClassStore";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

interface SubcribModalProps {
  open: boolean;
  onClose: () => void;
  teacherName: string;
  teacherAvatar: string;
  teacherSubject: string;
  teacherGrade: string;
  teacherPrice: number;
  teacherId: string;
}

export default function SubcribModal({
  open,
  onClose,
  teacherName,
  teacherAvatar,
  teacherSubject,
  teacherGrade,
  teacherPrice,
  teacherId,
}: SubcribModalProps) {
  const { classes, subscribeToClass, error, loading } = useClassStore();

  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubscribe = async () => {
    try {
      await subscribeToClass({ classId: selectedClassId });
      setShowSuccess(true);
      onClose();
    } catch {
      setShowError(true);
    }
  };

  const snackbars = (
    <>
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Đã đăng kí lớp học thành công! Chúng tôi sẽ thông báo sớm nhất có thể khi có phản hồi từ giáo viên!
        </Alert>
      </Snackbar>
      <Snackbar
        open={showError}
        autoHideDuration={2000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          {
            error == 'You already requested or joined this class' ? 'Bạn đã đăng kí lớp học này rồi!' : "Đăng kí thất bại! Vui lòng thử lại."
          }
        </Alert>
      </Snackbar>
    </>
  );

  if (!open) {
    if (showSuccess || showError) {
      return snackbars;
    }
    return null;
  }

  if (loading) {
    return (
      <>
        {snackbars}
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-70" />
          <div className="relative bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-lg flex items-center justify-center min-h-[200px]">
            <LoadingScreen />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {snackbars}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black opacity-70"
          onClick={onClose}
        />
        {/* Modal content */}
        <div className="relative bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-lg">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold">
            ✕
          </button>
          <h4 className="text-xl font-bold mb-4">Đăng kí học</h4>
          <div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <img
                  src={teacherAvatar}
                  alt={teacherName}
                  className="w-10 h-10 rounded-full"
                />
                <h5>{teacherName}</h5>
              </div>
              <span className="text-gray-600">{`Giáo viên ${teacherSubject} - lớp ${teacherGrade}`}</span>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <span className="text-sm text-gray-500">Chọn lịch học</span>
              <CustomInput
                label="Lịch học"
                select
                options={Array.isArray(classes) ? classes.map((item) => ({
                  label: `${item.className} (${item.startDate} - ${item.endDate})`,
                  value: item.id,
                })) : []}
                name="classId"
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center gap-2 w-full mt-4">
            <CustomButton
              type="Secondary"
              onClick={onClose}
              className="w-full !bg-gray-200 !text-gray-700"
            >
              Hủy
            </CustomButton>
            <CustomButton
              type="Secondary"
              onClick={handleSubscribe}
              disabled={!selectedClassId}
              className="w-full !text-white"
            >
              Đăng kí
            </CustomButton>
          </div>
        </div>
      </div>
    </>
  );
}
