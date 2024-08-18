import React, { useEffect, useState, useCallback } from 'react';
import dayjs from 'dayjs';
import { Box, Typography, Button } from '@mui/material';
import { styled } from "@mui/system";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import BasicModal from "../../atoms/Modal/Modal"


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

  const [selectedEvent, setSelectedEvent] = useState({});

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    (date) => events.filter(event =>  dayjs(date).format('DD/MM/YYYY') === event.eventDate),
    [events]
  );

  const openClickEvent = (data) => {
    setSelectedEvent(data);
    handleOpen()
  }

  // console.log(dayjs("30/08/2024"));

  // Memoized function to render the layout based on the filtered events
  const renderLayout = useCallback((date) => {
    const filteredEventsUS = filterEventsByDate(date);

    // console.log(date, filteredEvents, 'event')

    const filteredEvents = filteredEventsUS.sort(function (a, b) {
      return a.eventTime.localeCompare(b.eventTime);
    });

    return (
      <List sx={{ width: '100%', maxWidth: 360, maxHeight: 100, 
        bgcolor: 'background.paper', position: 'relative', overflow: 'auto', }}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <ListItem key={event.id} sx={{ background: '#F2F2F2'}}>
              <div onClick={() => openClickEvent(event)}>{event.name}</div>
            </ListItem>
          ))
        ) : (
          <p>No events for this date.</p>
        )}
      </List>
    );
  }, [filterEventsByDate]);
  

  return (
    <React.Fragment>
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

    <BasicModal open={open} handleClose={handleClose}>
      <div>Name: {selectedEvent.name}</div>
      <div>Age: {selectedEvent.age}</div>
      <div>Gender: {selectedEvent.gender === 1 ? "Male" : selectedEvent.gender === 2 ? "Female" : "Other"
      }</div>
      <div>Date: {selectedEvent.eventDate}</div>
      <div>Time: {selectedEvent.eventTime}</div>
    </BasicModal>

    </React.Fragment>
  );
};

export default Calendar;