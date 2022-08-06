import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: "", type: null };

const notifSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotification(state = initialState, action) {
      //console.log(action.payload);
      state = action.payload;
      return state;
    },
  },
});

let timeoutID = null;

export const createNotification = (message, time, type) => {
  //console.log("triggered");
  return (dispatch) => {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    console.log(message);
    console.log(type);
    dispatch(setNotification({ message, type }));
    timeoutID = setTimeout(
      () => dispatch(setNotification({ message: "" })),
      time * 1000
    );
  };
};

export default notifSlice.reducer;
export const { setNotification } = notifSlice.actions;
