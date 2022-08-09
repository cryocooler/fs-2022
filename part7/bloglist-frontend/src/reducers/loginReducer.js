import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import { createNotification } from "./notificationReducer";

const initialState =
  JSON.parse(window.localStorage.getItem("loggedBlogAppUser")) !== null
    ? JSON.parse(window.localStorage.getItem("loggedBlogAppUser"))
    : null;

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin(initialState, action) {
      return action.payload;
    },
  },
});

export const { setLogin } = loginSlice.actions;
export default loginSlice.reducer;

export const logUserToApp = ({ username, password }) => {
  //console.log("passed user", username);
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      dispatch(setLogin(user));
      dispatch(createNotification("Logged in succesfully", 5, "success"));
    } catch (error) {
      dispatch(createNotification("Failed to to login", 3, "error"));
    }
  };
};

export const logOutUser = () => {
  console.log("logging out");
  return (dispatch) => {
    window.localStorage.removeItem("loggedBlogAppUser");
    dispatch(setLogin(null));
    dispatch(createNotification("Logged out", 3, "success"));
  };
};
