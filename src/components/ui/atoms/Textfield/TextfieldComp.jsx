import { TextField } from "@mui/material";
import React from "react";

const TextfieldComp = ({ variant="outlined", ...props }) => {
  return <TextField variant={variant} {...props} />;
};

export default TextfieldComp;
