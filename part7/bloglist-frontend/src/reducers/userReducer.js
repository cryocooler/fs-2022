import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

//const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
const initialState = [];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(initialState, action) {
      return action.payload;
    },
  },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;

export const initializeUsers = () => {
  console.log("stored user");
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};
