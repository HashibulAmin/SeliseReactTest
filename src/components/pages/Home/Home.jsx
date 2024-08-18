import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import ButtonComp from "../../ui/atoms/Button/ButtonComp";
import BasicModal from "../../ui/atoms/Modal/Modal"
import FormComponent from "../../ui/organisms/Form/Form"
import MonthSelector from "../../ui/organisms/MonthList/MonthList"
import YearSelector from "../../ui/organisms/YearList/YearList"
import Calendar from "../../ui/organisms/Calender/Calender"

export const monthList = {
  'January': 1,
  'February': 2, 
  'March': 3, 
  'April': 4, 
  'May': 5, 
  'June': 6,
  'July': 7, 
  'August': 8, 
  'September': 9, 
  'October': 10, 
  'November': 11, 
  'December': 12
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

  const [yearData, setYearData] = useState(null)
  const [monthData, setMonthData] = useState(null)

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleMonthValue = (data) => {
    setMonthData(monthList[data])
  }

  const handleYearChange = (data) => {
    setYearData(data)
  }


  return (
    <React.Fragment>
      <TopHeader>
        <TopDiv>
          <MonthSelector  handleMonthValue={handleMonthValue} />
          <YearSelector handleYearChange={handleYearChange} />
        </TopDiv>
        <StyledButton onClick={handleOpen}>create appointment</StyledButton>
      </TopHeader>


    <Calendar yearData={yearData} monthData={monthData} />

    <BasicModal open={open} handleClose={handleClose}>
      <FormComponent> </FormComponent>
    </BasicModal>


    </React.Fragment>
);
};

export default Home;
