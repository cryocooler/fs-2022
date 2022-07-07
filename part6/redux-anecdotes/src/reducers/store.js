import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./anecdoteReducer";
import notificationReducer from "./notificationReducer";
import filterReducer from "./filterReducer";
const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notifications: notificationReducer,
    filters: filterReducer,
  },
});

export default store;
