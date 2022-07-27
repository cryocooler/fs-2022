import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notifSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotification(state = initialState, action) {
      console.log(action.payload);
      state = action.payload;
      return state;
    },
  },
});

let timeoutID = null;

export const createNotification = (message, time) => {
  console.log("triggered");
  return (dispatch) => {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    console.log(message);
    dispatch(setNotification(message));
    timeoutID = setTimeout(() => dispatch(setNotification("")), time * 1000);
  };
};

export default notifSlice.reducer;
export const { setNotification } = notifSlice.actions;
