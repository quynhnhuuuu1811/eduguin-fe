import CustomInput from "@/components/Input";
import { useClassStore } from "@/zustand/stores/ClassStore";
import { useEffect } from "react";

interface SubcribModalProps {
  open: boolean;
  onClose: () => void;
  teacherName: string;
  teacherAvatar: string;
  teacherSubject: string;
  teacherGrade: string;
  teacherPrice: number;
}

export default function SubcribModal({ open, onClose, teacherName, teacherAvatar, teacherSubject, teacherGrade, teacherPrice }: SubcribModalProps) {
  const { subscribeToClass, fetchTutorClasses } = useClassStore();

  useEffect(() => {
    fetchTutorClasses();
  }, []);

  const classes = fetchTutorClasses();
  console.log(classes);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      {/* Modal content */}
      <div className="relative bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ✕
        </button>
        <h4 className="text-xl font-bold mb-4">Đăng kí học</h4>
        <div>
          <div className="flex flex-col gap-2">
            <h5 className="font-semibold">Lớp học</h5>
            <div className="flex items-center gap-2">
              <img src={teacherAvatar} alt={teacherName} className="w-10 h-10 rounded-full" />
              <h5>{teacherName}</h5>
            </div>
            <span className="text-gray-600">{`Giáo viên ${teacherSubject} - lớp ${teacherGrade}`}</span>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <h5 className="font-semibold">Lịch học</h5>
            <span className="text-sm text-gray-500">Chọn lịch học</span>
            <CustomInput
              label="Lịch học"
              select
              options={Array.isArray(classes) ? classes.map((item) => ({
                label: item.name,
                value: item.id,
              })) : []}
              name="classId"
              value={''}
              onChange={() => { }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}