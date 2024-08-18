import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { styled } from "@mui/system";
// import TextfieldComp from "../../atoms/Textfield/TextfieldComp";
import ButtonComp from "../../atoms/Button/ButtonComp";
import TypographyComp from "../../atoms/Typography/TypographyComp";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import dayjs from 'dayjs';

import FormInputText from "../../atoms/FormTextInput";

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

// const StyledTextField = styled(TextfieldComp)(() => ({
//     width: "20rem",
//   }));

const StyledSelectField = styled(Select)(() => ({
    width: "20rem",
  }));
  
const StyledButton = styled(ButtonComp)(() => ({}));


const options = [
  {
    label: "Male",
    value: "1",
  },
  {
    label: "Female",
    value: "2",
  },
  {
    label: "Other",
    value: "3",
  },
];

const FormComponent = ({ handleFormSubmit }) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();

  const [eventDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState('')

  const onSubmit = data => {
    const payload = {
      ...data,
      eventDate,
      eventTime,
    }
    // console.log(payload)
    handleFormSubmit(payload)
  };

  const generateSingleOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  const onDateChange = (data) => {
    // console.log(dayjs(data).format('DD/MM/YYYY'))
    setEventDate(dayjs(data).format('DD/MM/YYYY'))
  }

  const onTimeChange = (data) => {
    // console.log()
    setEventTime(dayjs(data).format('HH:mm:ss'))
  }


  return (
    <AppForm 

        onSubmit={handleSubmit(onSubmit)}
    
    >
      <div>
        <FormInputText
          name={"name"}
          control={control}
          label={"Name"}
        />
      </div>

      <div>
      <TypographyComp variant="subtitle1">Gender</TypographyComp>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select onChange={onChange} value={value}>
            {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={'gender'}
      />
      </div>
      
      <div>
        <FormInputText
          name={"age"}
          control={control}
          label={"age"}
          type="number"
        />
      </div>

      <div>
      <TypographyComp variant="subtitle1">Date</TypographyComp>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
             <DatePicker onChange={onDateChange} />
        </LocalizationProvider>
      </div>

      <div>
      <TypographyComp variant="subtitle1">Time</TypographyComp>
       <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
                <TimePicker label="Pick time" onChange={onTimeChange} />
            </DemoContainer>
        </LocalizationProvider>
      </div>
      
      <StyledButton type="submit">Submit</StyledButton>
    </AppForm>
  );
};

export default FormComponent;