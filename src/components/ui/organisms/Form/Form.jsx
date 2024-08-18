import React from 'react';
import { useForm } from 'react-hook-form';

import { styled } from "@mui/system";
import TextfieldComp from "../../atoms/Textfield/TextfieldComp";
import ButtonComp from "../../atoms/Button/ButtonComp";
import TypographyComp from "../../atoms/Typography/TypographyComp";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const AppForm = styled("form")(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    background: "#FFF",
    padding: "15px 20px",
    borderRadius: "10px",
    border: "1px solid #e2e2e2",
    gap: "10px",
  }));

const StyledTextField = styled(TextfieldComp)(() => ({
    width: "20rem",
  }));

const StyledSelectField = styled(Select)(() => ({
    width: "20rem",
  }));
  
const StyledButton = styled(ButtonComp)(() => ({}));

const FormComponent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <AppForm 

        onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)
        }}
    
    >
      <div>
        <TypographyComp variant="subtitle1">Name</TypographyComp>
        <StyledTextField
          id="firstName"
          {...register('firstName', { required: 'First name is required' })}
        />
        {errors.firstName && <p>{errors.firstName.message}</p>}
      </div>

      <div>
      <TypographyComp variant="subtitle1">Gender</TypographyComp>
        <StyledSelectField {...register("gender")}>
            <MenuItem value="female">female</MenuItem>
            <MenuItem value="male">male</MenuItem>
            <MenuItem value="other">other</MenuItem>
        </StyledSelectField>
      </div>
      
      <div>
        <TypographyComp htmlFor="age" variant="subtitle1">Age</TypographyComp>
        <StyledTextField
          id="age"
          type="number"
          {...register('age', { 
            required: 'Age is required',
            valueAsNumber: true,
            min: {
              value: 18,
              message: 'You must be at least 18 years old',
            },
          })}
        />
        {errors.age && <p>{errors.age.message}</p>}
      </div>

      <div>
      <TypographyComp variant="subtitle1">Date</TypographyComp>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
             <DatePicker />
        </LocalizationProvider>
      </div>

      <div>
      <TypographyComp variant="subtitle1">Time</TypographyComp>
       <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
                <TimePicker label="Pick time" />
            </DemoContainer>
        </LocalizationProvider>
      </div>
      
      <StyledButton type="submit">Submit</StyledButton>
    </AppForm>
  );
};

export default FormComponent;