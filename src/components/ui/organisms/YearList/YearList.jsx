import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { styled } from '@mui/system';

const years = [
  '2019', '2020', '2021',
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

const YearSelector = ({handleYearChange}) => {
  const [selectedMonth, setSelectedMonth] = useState('');

  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
    handleYearChange(Number(event.target.value))
  };

  return (
    <Box sx={{ width: 300, margin: 'auto', marginTop: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="year-select-label">Year</InputLabel>
        <StyledSelect
          labelId="year-select-label"
          value={selectedMonth}
          onChange={handleChange}
          label="Year"
        >
          {years.map((year, index) => (
            <MenuItem key={index} value={year}>
              {year}
            </MenuItem>
          ))}
        </StyledSelect>
      </FormControl>
    </Box>
  );
};

export default YearSelector;