import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { styled } from '@mui/system';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const StyledSelect = styled(Select)({
  width: "15rem",
  backgroundColor: '#f5f5f5',
  borderRadius: '4px',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#aaa',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#888',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#555',
  },
});

const MonthSelector = ({handleMonthValue}) => {
  const [selectedMonth, setSelectedMonth] = useState('');

  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
    handleMonthValue(event.target.value)
  };

  return (
    <Box sx={{ width: 300, margin: 'auto', marginTop: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="month-select-label">Month</InputLabel>
        <StyledSelect
          labelId="month-select-label"
          value={selectedMonth}
          onChange={handleChange}
          label="Month"
        >
          {months.map((month, index) => (
            <MenuItem key={index} value={month}>
              {month}
            </MenuItem>
          ))}
        </StyledSelect>
      </FormControl>
    </Box>
  );
};

export default MonthSelector;