import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: "INITIAL MESSAGE" };

const notifSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotification(state = initialState, action) {
      return state.message;
    },
  },
});

export const { setNotification } = notifSlice.actions;
export default notifSlice.reducer;
