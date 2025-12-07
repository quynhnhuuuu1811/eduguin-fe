import { useClassStore } from "@/zustand/stores/ClassStore";
import { Dialog, DialogContent, DialogTitle, TextField, DialogActions, Button, CircularProgress, MenuItem, IconButton } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import dayjs from "dayjs";
import { useState } from "react";

interface CreateModelProps {
  open: boolean;
  onClose: () => void;
}

interface ScheduleItem {
  days: string;
  startTime: string;
  endTime: string;
}

const DAYS_OF_WEEK = [
  { value: '2', label: 'Thứ hai' },
  { value: '3', label: 'Thứ ba' },
  { value: '4', label: 'Thứ tư' },
  { value: '5', label: 'Thứ năm' },
  { value: '6', label: 'Thứ sáu' },
  { value: '7', label: 'Thứ bảy' },
  { value: '8', label: 'Chủ nhật' },
];

const initialFormData = {
  className: '',
  startTime: '',
  endTime: '',
  capacity: 0,
  linkMeeting: '',
};

const initialSchedule: ScheduleItem = {
  days: '',
  startTime: '',
  endTime: '',
};

export default function CreateModel({ open, onClose }: CreateModelProps) {
  const currentDate = dayjs().format('YYYY-MM-DD');
  const { createClass, setSchedule, loading, fetchTutorClasses } = useClassStore();

  const [formData, setFormData] = useState(initialFormData);
  const [schedules, setSchedules] = useState<ScheduleItem[]>([{ ...initialSchedule }]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!formData.className.trim()) return 'Tên lớp học là bắt buộc';
    if (!formData.startTime) return 'Ngày bắt đầu là bắt buộc';
    if (!formData.endTime) return 'Ngày kết thúc là bắt buộc';
    if (!formData.capacity || formData.capacity < 1) return 'Sĩ số tối đa phải lớn hơn 0';
    if (!formData.linkMeeting.trim()) return 'Link học trực tuyến là bắt buộc';

    if (dayjs(formData.startTime).isAfter(dayjs(formData.endTime))) {
      return 'Ngày bắt đầu phải trước ngày kết thúc';
    }
    if (dayjs(formData.startTime).isBefore(currentDate)) {
      return 'Ngày bắt đầu phải sau ngày hiện tại';
    }

    // Validate schedules
    for (let i = 0; i < schedules.length; i++) {
      const schedule = schedules[i];
      if (!schedule.days) return `Lịch học ${i + 1}: Vui lòng chọn ngày`;
      if (!schedule.startTime) return `Lịch học ${i + 1}: Vui lòng nhập giờ bắt đầu`;
      if (!schedule.endTime) return `Lịch học ${i + 1}: Vui lòng nhập giờ kết thúc`;
      if (schedule.startTime >= schedule.endTime) {
        return `Lịch học ${i + 1}: Giờ bắt đầu phải trước giờ kết thúc`;
      }
    }

    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number(value) : value,
    });
    setError(null);
  };

  const handleScheduleChange = (index: number, field: keyof ScheduleItem, value: string) => {
    const newSchedules = [...schedules];
    newSchedules[index] = { ...newSchedules[index], [field]: value };
    setSchedules(newSchedules);
    setError(null);
  };

  const addSchedule = () => {
    setSchedules([...schedules, { ...initialSchedule }]);
  };

  const removeSchedule = (index: number) => {
    if (schedules.length > 1) {
      setSchedules(schedules.filter((_, i) => i !== index));
    }
  };

  const handleCreateClass = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Step 1: Create the class and get the response with class ID
      const createdClass = await createClass({
        name: formData.className,
        startTime: dayjs(formData.startTime).format('YYYY-MM-DD'),
        endTime: dayjs(formData.endTime).format('YYYY-MM-DD'),
        capacity: formData.capacity,
        linkMeeting: formData.linkMeeting,
      });

      // Step 2: Create schedules for the class
      for (const schedule of schedules) {
        const schedulePayload = {
          classId: createdClass.id,
          days: Number(schedule.days),
          startTime: schedule.startTime,
          endTime: schedule.endTime,
        };
        console.log('Schedule payload:', schedulePayload);
        await setSchedule(schedulePayload);
      }

      // Reset form and close modal on success
      setFormData(initialFormData);
      setSchedules([{ ...initialSchedule }]);
      setError(null);
      onClose();

      // Refresh list
      fetchTutorClasses();
    } catch (err) {
      setError('Có lỗi xảy ra khi tạo lớp học');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setSchedules([{ ...initialSchedule }]);
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
          minWidth: '500px',
          maxWidth: '600px',
          borderRadius: '12px',
        }
      }}
    >
      <DialogTitle className="text-2xl font-bold font-quicksand text-blue700">
        Thêm lớp học
      </DialogTitle>
      <DialogContent className="flex flex-col gap-4 pt-4">
        {error && (
          <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}
        <TextField
          label="Tên lớp học"
          name="className"
          value={formData.className}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Ngày bắt đầu"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            label="Ngày kết thúc"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </div>

        {/* Lịch học */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-gray-700">Lịch học</span>
            <Button
              size="small"
              startIcon={<Add />}
              onClick={addSchedule}
              variant="text"
            >
              Thêm
            </Button>
          </div>
          <div className="flex flex-col gap-3">
            {schedules.map((schedule, index) => (
              <div key={index} className="flex items-center gap-2">
                <TextField
                  select
                  label="Ngày"
                  value={schedule.days}
                  onChange={(e) => handleScheduleChange(index, 'days', e.target.value)}
                  size="small"
                  sx={{ minWidth: 120 }}
                >
                  {DAYS_OF_WEEK.map((day) => (
                    <MenuItem key={day.value} value={day.value}>
                      {day.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Từ"
                  type="time"
                  value={schedule.startTime}
                  onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)}
                  size="small"
                  slotProps={{ inputLabel: { shrink: true } }}
                  sx={{ width: 110 }}
                />
                <TextField
                  label="Đến"
                  type="time"
                  value={schedule.endTime}
                  onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)}
                  size="small"
                  slotProps={{ inputLabel: { shrink: true } }}
                  sx={{ width: 110 }}
                />
                {schedules.length > 1 && (
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => removeSchedule(index)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                )}
              </div>
            ))}
          </div>
        </div>

        <TextField
          label="Sĩ số tối đa"
          name="capacity"
          value={formData.capacity || ''}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          type="number"
        />
        <TextField
          label="Link học trực tuyến"
          name="linkMeeting"
          value={formData.linkMeeting}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
      </DialogContent>
      <DialogActions className="px-6 pb-4">
        <Button onClick={handleClose} variant="outlined" color="inherit" disabled={isSubmitting}>
          Hủy
        </Button>
        <Button
          onClick={handleCreateClass}
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : null}
        >
          {isSubmitting ? 'Đang tạo...' : 'Tạo lớp'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
