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

export const createNotification = (message, time) => {
  console.log("triggered");
  return (dispatch) => {
    console.log(message);
    dispatch(setNotification(message));
    setTimeout(() => dispatch(setNotification("")), time * 1000);
  };
};

export default notifSlice.reducer;
export const { setNotification } = notifSlice.actions;
