import { createSlice } from "@reduxjs/toolkit";

const initialState = { search: "" };

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    filterByString(state, action) {
      const search = action.payload;
      state = search;
      //console.log("keystring", search);

      return state;
    },
  },
});

export default filterSlice.reducer;

export const { filterByString } = filterSlice.actions;
