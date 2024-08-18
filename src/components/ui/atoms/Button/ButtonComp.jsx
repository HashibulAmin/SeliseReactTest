import PropTypes from "prop-types";
import { Button } from "@mui/material";
import React from "react";

const ButtonComp = ({ variant="contained", children, ...props }) => {
  return (
    <Button variant={variant} {...props}>
      {children}
    </Button>
  );
};

ButtonComp.propTypes = {
  children: PropTypes.any,
  variant: PropTypes.any,
};

export default ButtonComp;
