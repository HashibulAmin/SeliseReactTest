import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import ButtonComp from "../../ui/atoms/Button/ButtonComp";
import BasicModal from "../../ui/atoms/Modal/Modal"
import FormComponent from "../../ui/organisms/Form/Form"
import MonthSelector from "../../ui/organisms/MonthList/MonthList"
import YearSelector from "../../ui/organisms/YearList/YearList"

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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);





  return (
    <React.Fragment>
      <TopHeader>
        <TopDiv>
          <MonthSelector />
          <YearSelector />
        </TopDiv>
        <StyledButton onClick={handleOpen}>create appointment</StyledButton>
      </TopHeader>


    <BasicModal open={open} handleClose={handleClose}>
      <FormComponent> </FormComponent>
    </BasicModal>


    </React.Fragment>
);
};

export default Home;
