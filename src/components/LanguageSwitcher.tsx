'use client';

import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useTranslation, Language } from '@/i18n';

interface LanguageSwitcherProps {
  variant?: 'standard' | 'outlined' | 'filled';
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  isDark?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'outlined',
  size = 'small',
  fullWidth = false,
  isDark = false,
}) => {
  const { language, setLanguage, t } = useTranslation();

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as Language);
  };

  return (
    <FormControl variant={variant} size={size} fullWidth={fullWidth}>
      {!isDark && <InputLabel id="language-select-label">{t.profile.language}</InputLabel>}
      <Select
        labelId="language-select-label"
        id="language-select"
        value={language}
        label={isDark ? undefined : t.profile.language}
        onChange={handleChange}
        sx={{
          fontFamily: 'Quicksand',
          minWidth: 120,
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          },
          ...(isDark && {
            color: 'white',
            backgroundColor: 'rgba(255,255,255,0.1)',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255,255,255,0.3)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255,255,255,0.5)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '& .MuiSvgIcon-root': {
              color: 'white',
            },
          }),
        }}
      >
        <MenuItem value="vi">
          <span className="flex items-center gap-2">
            🇻🇳 {t.profile.vietnamese}
          </span>
        </MenuItem>
        <MenuItem value="en">
          <span className="flex items-center gap-2">
            🇺🇸 {t.profile.english}
          </span>
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSwitcher;
