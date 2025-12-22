import { CustomButton } from "@/components/Button";
import CustomInput from "@/components/Input";
import LoadingScreen from "@/components/LoadingScreen";
import { useClassStore } from "@/zustand/stores/ClassStore";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/i18n";

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
  const { t } = useTranslation();
  const isEnglish = t.common.loading === "Loading...";

  const { classes, subscribeToClass, error, loading } = useClassStore();
  const router = useRouter();

  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubscribe = async () => {
    try {
      await subscribeToClass({ classId: selectedClassId });
      setShowSuccess(true);
      onClose();
    } catch (err: any) {
      const apiError = err?.response?.data?.message || error;

      if (apiError === 'Insufficient balance to request this class') {
        setErrorMessage(t.tutorInfo.insufficientBalance);
      } else if (apiError === 'You already requested or joined this class') {
        setErrorMessage(t.tutorInfo.alreadySubscribed);
      } else {
        setErrorMessage(t.tutorInfo.subscribeFailed);
      }
      setShowError(true);
    }
  };

  const handleGoToDeposit = () => {
    setShowError(false);
    router.push('/profile');
  };

  const isInsufficientBalance = errorMessage === t.tutorInfo.insufficientBalance;

  const snackbars = (
    <>
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={(_, reason) => {
          if (reason === 'clickaway') return;
          setShowSuccess(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {t.tutorInfo.subscribeSuccess}
        </Alert>
      </Snackbar>
      <Snackbar
        open={showError}
        autoHideDuration={5000}
        onClose={(_, reason) => {
          if (reason === 'clickaway') return;
          setShowError(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
          action={
            isInsufficientBalance ? (
              <button
                onClick={handleGoToDeposit}
                className="text-white underline text-sm font-semibold ml-2"
              >
                {t.tutorInfo.deposit}
              </button>
            ) : null
          }
        >
          {errorMessage}
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
          <h4 className="text-xl font-bold mb-4">{t.tutorInfo.subscribeTitle}</h4>
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
              <span className="text-gray-600">
                {t.tutorInfo.teacher} {teacherSubject} - {t.tutorInfo.grade} {teacherGrade}
              </span>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <span className="text-sm text-gray-500">{t.tutorInfo.selectSchedule}</span>
              <CustomInput
                label={t.tutorInfo.scheduleLabel}
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
              {t.tutorInfo.cancel}
            </CustomButton>
            <CustomButton
              type="Secondary"
              onClick={handleSubscribe}
              disabled={!selectedClassId}
              className="w-full !text-white"
            >
              {t.tutorInfo.register}
            </CustomButton>
          </div>
        </div>
      </div>
    </>
  );
}
