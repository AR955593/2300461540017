import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { TOP_N_CHOICES, TopNChoice, STACK_FRONTEND } from '../utils/constants';
import { Log } from '../../../logging_middleware/logger';

interface TopNSelectorProps {
  value: number;
  onChange: (newValue: number) => void;
}

export const TopNSelector: React.FC<TopNSelectorProps> = ({ value, onChange }) => {
  useEffect(() => {
    Log(STACK_FRONTEND, 'debug', 'component', 'TopNSelector component rendered (mounted)').catch((err) =>
      console.error('[TopNSelector Component Logger Fail]', err)
    );
  }, []);

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    const newValue = Number(event.target.value) as TopNChoice;
    // Log state update
    Log(STACK_FRONTEND, 'info', 'state', `Top N count updated: ${value} -> ${newValue}`).catch((err) =>
      console.error('[TopNSelector State Logger Fail]', err)
    );
    onChange(newValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2,
        mb: 4,
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: '1px solid #E5E7EB',
      }}
    >
      <Box>
        <Typography variant="subtitle1" fontWeight={700} sx={{ color: 'text.primary' }}>
          Priority Limit
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Select the maximum number of high-priority notifications to display.
        </Typography>
      </Box>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <Select
          id="top-n-selector"
          value={value}
          onChange={handleSelectChange}
          sx={{
            fontWeight: 600,
            borderRadius: 2,
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#D1D5DB',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
          }}
        >
          {TOP_N_CHOICES.map((choice) => (
            <MenuItem key={choice} value={choice} sx={{ fontWeight: 500 }}>
              Top {choice}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
