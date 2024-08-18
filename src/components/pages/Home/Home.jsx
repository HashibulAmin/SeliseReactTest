import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import ButtonComp from "../../ui/atoms/Button/ButtonComp";
import BasicModal from "../../ui/atoms/Modal/Modal"

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
          <div>year</div>
          <div>month</div>
        </TopDiv>
        <StyledButton onClick={handleOpen}>create appointment</StyledButton>
      </TopHeader>


    <BasicModal open={open} handleClose={handleClose}>
      <div>form</div>
    </BasicModal>


    </React.Fragment>
);
};

export default Home;
