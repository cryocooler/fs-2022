import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const notifSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotification(state = initialState, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { setNotification } = notifSlice.actions;
export default notifSlice.reducer;
