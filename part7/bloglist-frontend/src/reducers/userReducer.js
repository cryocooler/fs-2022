import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { createNotification } from "./notificationReducer";

//const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
const initialState = JSON.parse(
  window.localStorage.getItem("loggedBlogAppUser")
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser(initialState, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

export const logUserToApp = ({ username, password }) => {
  //console.log("passed user", username);
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      dispatch(setUser(user));
      await blogService.setToken(user.token);
      dispatch(createNotification("Logged in succesfully", 5, "success"));
    } catch (error) {
      dispatch(createNotification("Failed to to login", 3, "error"));
    }
  };
};

export const logOutUser = () => {
  return (dispatch) => {
    dispatch(setUser(null));
    window.localStorage.removeItem("loggedBlogAppUser");
  };
};

// export const initializeUser = () => {
//   console.log("stored user");
//   return (dispatch) => {
//     console.log(window.localStorage.getItem("loggedBlogAppUser"));
//     dispatch(setUser(("loggedBlogAppUser")));
//   };
// };
