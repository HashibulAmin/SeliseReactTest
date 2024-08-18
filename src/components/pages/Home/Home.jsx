import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import ButtonComp from "../../ui/atoms/Button/ButtonComp";
import BasicModal from "../../ui/atoms/Modal/Modal"
import FormComponent from "../../ui/organisms/Form/Form"
import MonthSelector from "../../ui/organisms/MonthList/MonthList"
import YearSelector from "../../ui/organisms/YearList/YearList"
import Calendar from "../../ui/organisms/Calender/Calender"

import { useDispatch, useSelector } from "react-redux";
import { appointmentActions } from "../../../store/appointment";

import {useParams} from "react-router-dom";

export const monthList = {
  'January': 0,
  'February': 1, 
  'March': 2, 
  'April': 3, 
  'May': 4, 
  'June': 5,
  'July': 6, 
  'August': 7, 
  'September': 8, 
  'October': 9, 
  'November': 10, 
  'December': 11
};

const TopHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
}));

const TopDiv = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "",
  padding: theme.spacing(0, 1),
}));

const StyledButton = styled(ButtonComp)(() => ({}));

const Home = () => {

  const dispatch = useDispatch();

  const {year, month} = useParams();

  const appointmentLists = useSelector((state) => state.appointment.lists);

  const [yearData, setYearData] = useState(null)
  const [monthData, setMonthData] = useState(null)

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleMonthValue = (data) => {
    setMonthData(monthList[data])
    // console.log(data)
  }

  const handleYearChange = (data) => {
    setYearData(data)
  }

  useEffect(() => {
    setYearData(Number(year))
  }, [year])

  useEffect(() => {
    if(Number(month) < 13 && Number(month) > 0)
      setMonthData(Number(month)-1)
  }, [month])

  // console.log(year, month)

  const handleFormSubmit = (data) => {
    dispatch(appointmentActions.addAppointment(data))
    handleClose()
  }

  console.log(appointmentLists);

  return (
    <React.Fragment>
      <TopHeader>
        <TopDiv>
          <MonthSelector  handleMonthValue={handleMonthValue} />
          <YearSelector handleYearChange={handleYearChange} />
        </TopDiv>
        <StyledButton onClick={handleOpen}>create appointment</StyledButton>
      </TopHeader>


    <Calendar events={appointmentLists} yearData={yearData} monthData={monthData} />

    <BasicModal open={open} handleClose={handleClose}>
      <FormComponent handleFormSubmit={handleFormSubmit}> </FormComponent>
    </BasicModal>


    </React.Fragment>
);
};

export default Home;
