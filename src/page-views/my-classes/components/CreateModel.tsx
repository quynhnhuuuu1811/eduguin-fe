"use client";
import { useClassStore } from "@/zustand/stores/ClassStore";
import { Dialog, DialogContent, DialogTitle, TextField, DialogActions, Button, CircularProgress, MenuItem, IconButton } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "@/i18n";

interface CreateModelProps {
  open: boolean;
  onClose: () => void;
}

interface ScheduleItem {
  days: string;
  startTime: string;
  endTime: string;
}

const initialFormData = {
  className: '',
  startTime: '',
  endTime: '',
  capacity: 0,
  linkMeeting: '',
  price: 0,
};

const initialSchedule: ScheduleItem = {
  days: '',
  startTime: '',
  endTime: '',
};

export default function CreateModel({ open, onClose }: CreateModelProps) {
  const { t } = useTranslation();
  const isEnglish = t.common.loading === "Loading...";

  const DAYS_OF_WEEK = [
    { value: '2', label: t.myClasses.monday },
    { value: '3', label: t.myClasses.tuesday },
    { value: '4', label: t.myClasses.wednesday },
    { value: '5', label: t.myClasses.thursday },
    { value: '6', label: t.myClasses.friday },
    { value: '7', label: t.myClasses.saturday },
    { value: '8', label: t.myClasses.sunday },
  ];

  const currentDate = dayjs().format('YYYY-MM-DD');
  const { createClass, setSchedule, loading, fetchTutorClasses } = useClassStore();

  const [formData, setFormData] = useState(initialFormData);
  const [schedules, setSchedules] = useState<ScheduleItem[]>([{ ...initialSchedule }]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!formData.className.trim()) return t.myClasses.classNameRequired;
    if (!formData.startTime) return t.myClasses.startDateRequired;
    if (!formData.endTime) return t.myClasses.endDateRequired;
    if (!formData.capacity || formData.capacity < 1) return t.myClasses.capacityRequired;
    if (!formData.price || formData.price < 0) return t.myClasses.priceRequired;
    if (!formData.linkMeeting.trim()) return t.myClasses.linkRequired;

    if (dayjs(formData.startTime).isAfter(dayjs(formData.endTime))) {
      return t.myClasses.startBeforeEnd;
    }
    if (dayjs(formData.startTime).isBefore(currentDate)) {
      return t.myClasses.startAfterToday;
    }

    // Validate schedules
    for (let i = 0; i < schedules.length; i++) {
      const schedule = schedules[i];
      const scheduleNum = isEnglish ? `Schedule ${i + 1}` : `Lịch học ${i + 1}`;
      if (!schedule.days) return `${scheduleNum}: ${t.myClasses.selectDay}`;
      if (!schedule.startTime) return `${scheduleNum}: ${t.myClasses.enterStartTime}`;
      if (!schedule.endTime) return `${scheduleNum}: ${t.myClasses.enterEndTime}`;
      if (schedule.startTime >= schedule.endTime) {
        return `${scheduleNum}: ${t.myClasses.startBeforeEndTime}`;
      }
    }

    // Check for duplicate/overlapping schedules on same day
    for (let i = 0; i < schedules.length; i++) {
      for (let j = i + 1; j < schedules.length; j++) {
        if (schedules[i].days === schedules[j].days) {
          const start1 = schedules[i].startTime;
          const end1 = schedules[i].endTime;
          const start2 = schedules[j].startTime;
          const end2 = schedules[j].endTime;

          // Check if time slots overlap
          const isOverlapping = start1 < end2 && start2 < end1;
          if (isOverlapping) {
            const dayLabel = DAYS_OF_WEEK.find(d => d.value === schedules[i].days)?.label || schedules[i].days;
            const scheduleText = isEnglish
              ? `Schedule ${i + 1} and ${j + 1} ${t.myClasses.scheduleOverlap} ${dayLabel}`
              : `Lịch học ${i + 1} và ${j + 1} ${t.myClasses.scheduleOverlap} ${dayLabel}`;
            return scheduleText;
          }
        }
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
      const classPayload = {
        name: formData.className,
        startTime: dayjs(formData.startTime).format('YYYY-MM-DD'),
        endTime: dayjs(formData.endTime).format('YYYY-MM-DD'),
        capacity: formData.capacity,
        linkMeeting: formData.linkMeeting,
        price: formData.price,
      };
      console.log('Creating class with payload:', classPayload);

      // Step 1: Create the class and get the response with class ID
      const createdClass = await createClass(classPayload);
      console.log('Created class:', createdClass);

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
    } catch (err: any) {
      console.error('Error creating class:', err);
      console.error('Error response:', err?.response?.data);
      setError(err?.response?.data?.message || t.myClasses.createError);
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
        {t.myClasses.addClass}
      </DialogTitle>
      <DialogContent className="flex flex-col gap-4 pt-4">
        <TextField
          label={t.myClasses.className}
          name="className"
          value={formData.className}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label={t.myClasses.startDate}
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            label={t.myClasses.endDate}
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
            <span className="font-semibold text-gray-700">{t.myClasses.scheduleLabel}</span>
            <Button
              size="small"
              startIcon={<Add />}
              onClick={addSchedule}
              variant="text"
            >
              {t.myClasses.add}
            </Button>
          </div>
          <div className="flex flex-col gap-3">
            {schedules.map((schedule, index) => (
              <div key={index} className="flex items-center gap-2">
                <TextField
                  select
                  label={t.myClasses.day}
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
                  label={t.myClasses.from}
                  type="time"
                  value={schedule.startTime}
                  onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)}
                  size="small"
                  slotProps={{ inputLabel: { shrink: true } }}
                  sx={{ width: 200 }}
                />
                <TextField
                  label={t.myClasses.to}
                  type="time"
                  value={schedule.endTime}
                  onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)}
                  size="small"
                  slotProps={{ inputLabel: { shrink: true } }}
                  sx={{ width: 200 }}
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
          label={t.myClasses.price}
          name="price"
          value={formData.price || ''}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          type="number"
        />
        <TextField
          label={t.myClasses.maxCapacity}
          name="capacity"
          value={formData.capacity || ''}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          type="number"
        />
        <TextField
          label={t.myClasses.onlineLink}
          name="linkMeeting"
          value={formData.linkMeeting}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
        {error && (
          <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}
      </DialogContent>
      <DialogActions className="px-6 pb-4">
        <Button onClick={handleClose} variant="outlined" color="inherit" disabled={isSubmitting}>
          {t.myClasses.cancel}
        </Button>
        <Button
          onClick={handleCreateClass}
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : null}
        >
          {isSubmitting ? t.myClasses.creating : t.myClasses.create}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
