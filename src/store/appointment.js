import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lists: [],
};

export const appointment = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    addAppointment: (state, action) => {
      // console.log(action, 'redux')
      state.lists = [...state.lists, action.payload];
    },
    deleteAppointment: (state) => {
      state.lists = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const appointmentActions = appointment.actions;
export default appointment.reducer;
