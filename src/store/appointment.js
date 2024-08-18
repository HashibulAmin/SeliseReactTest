import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

export const appointment = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    addAppointment: (state, action) => {
      state.list = [...state.list, action.data];
    },
    deleteAppointment: (state) => {
      state.list = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const appointmentActions = appointment.actions;
export default appointment.reducer;
