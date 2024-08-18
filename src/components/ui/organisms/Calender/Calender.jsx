import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Box, Typography, Button } from '@mui/material';

const Calendar = ({yearData, monthData}) => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startDay = currentDate.startOf('month').startOf('week');
  const endDay = currentDate.endOf('month').endOf('week');

  const generateCalendar = () => {
    const calendar = [];
    let date = startDay;

    while (date.isBefore(endDay, 'day')) {
      calendar.push(date);
      date = date.add(1, 'day');
    }

    return calendar;
  };

  const calendarDates = generateCalendar();

  const handlePreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  useEffect(() => {
    // console.log(yearData, monthData);
    if(yearData && monthData)
        setCurrentDate(dayjs().year(yearData).month(monthData))
  },[yearData, yearData])

  return (
    <Box sx={{margin: 'auto', textAlign: 'center', marginTop: '2rem' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Button onClick={handlePreviousMonth} variant="contained">Previous</Button>
        <Typography variant="h5">{currentDate.format('MMMM YYYY')}</Typography>
        <Button onClick={handleNextMonth} variant="contained">Next</Button>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <Typography key={day} variant="subtitle2" sx={{ fontWeight: 'bold' }}>{day}</Typography>
        ))}
        {calendarDates.map((date, index) => (
          <Box
            key={index}
            sx={{
              padding: 2,
              textAlign: 'center',
              backgroundColor: date.isSame(currentDate, 'month') ? '#fff' : '#f0f0f0',
              borderRadius: '4px',
            }}
          >
            <Typography variant="body2">{date.format('D')}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Calendar;