import { Dialog, DialogContent, DialogTitle, DialogActions, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useClassStore } from "@/zustand/stores/ClassStore";

interface ClassData {
  id?: string;
  name?: string;
  className?: string;
  [key: string]: unknown;
}

interface DeleteModelProps {
  open: boolean;
  onClose: () => void;
  classData: ClassData | null;
  onSuccess?: () => void;
}

export default function DeleteModel({ open, onClose, classData, onSuccess }: DeleteModelProps) {
  const { deleteClass, fetchTutorClasses } = useClassStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!classData?.id) return;

    try {
      setIsDeleting(true);
      setError(null);
      await deleteClass(classData.id);
      onClose();
      fetchTutorClasses();
      onSuccess?.();
    } catch {
      setError("Có lỗi xảy ra khi xoá lớp học");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    if (isDeleting) return;
    setError(null);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          minWidth: '400px',
          maxWidth: '450px',
          borderRadius: '12px',
        }
      }}
    >
      <DialogTitle className="text-xl font-bold font-quicksand text-red-600">
        Xác nhận xoá lớp học
      </DialogTitle>
      <DialogContent className="pt-4">
        {error && (
          <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        <p className="text-gray-700 font-quicksand">
          Bạn có chắc chắn muốn xoá lớp học{" "}
          <span className="font-bold text-blue700">
            {classData?.className || classData?.name}
          </span>{" "}
          không?
        </p>
        <p className="text-gray-500 text-sm mt-2 font-quicksand">
          Hành động này không thể hoàn tác.
        </p>
      </DialogContent>
      <DialogActions className="px-6 pb-4 gap-2">
        <Button
          onClick={handleClose}
          variant="outlined"
          color="inherit"
          disabled={isDeleting}
          sx={{ borderRadius: '8px' }}
        >
          Hủy
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          disabled={isDeleting}
          sx={{ borderRadius: '8px' }}
        >
          {isDeleting ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Xoá lớp học"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

