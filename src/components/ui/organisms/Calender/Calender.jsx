import React, { useEffect, useState, useCallback } from 'react';
import dayjs from 'dayjs';
import { Box, Typography, Button } from '@mui/material';
import { styled } from "@mui/system";

const TopBox = styled(Box)(({ }) => ({
    margin: "auto",
    textAlign: "center",
    marginTop: "2rem",
    // padding: theme.spacing(0, 1),
  }));

const BoxContainer = styled(Box)(({ }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
    // padding: theme.spacing(0, 1),
  }));


const Calendar = ({yearData, monthData, events}) => {
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
    else if(monthData)  setCurrentDate(dayjs().month(monthData))
    
  },[yearData, monthData])

  // Function to filter events based on the selected date
  const filterEventsByDate = useCallback(
    (date) => events.filter(event => dayjs(event.eventDate).isSame(date, 'day')),
    [events]
  );

  // Memoized function to render the layout based on the filtered events
  const renderLayout = useCallback((date) => {
    const filteredEvents = filterEventsByDate(date);

    console.log(date, filteredEvents, 'event')

    return (
      <div>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event.id} className="event">
              <h3>{event.name}</h3>
            </div>
          ))
        ) : (
          <p>No events for this date.</p>
        )}
      </div>
    );
  }, [filterEventsByDate]);
  

  return (
    <TopBox>
      <BoxContainer>
        <Button onClick={handlePreviousMonth} variant="contained">Previous</Button>
        <Typography variant="h5">{currentDate.format('MMMM YYYY')}</Typography>
        <Button onClick={handleNextMonth} variant="contained">Next</Button>
      </BoxContainer>

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
            {renderLayout(date)}
          </Box>
        ))}
      </Box>
    </TopBox>
  );
};

export default Calendar;