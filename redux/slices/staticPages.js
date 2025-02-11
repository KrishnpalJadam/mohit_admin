// ** Third Party Imports
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  staticPages: [],
};

const staticPages = createSlice({
  name: "staticPages",
  initialState,
  reducers: {
    getStaticPages: (state, action) => {
      state.staticPages = action.payload;
    },
    addStaticPage: (state, action) => {
      state.staticPages.push(action.payload);
    },
    editStaticPage: (state, action) => {
      state.staticPages = state.staticPages.map((page) =>
        page._id === action.payload._id ? action.payload : page
      );
    },
    removeStaticPage: (state, action) => {
      state.staticPages.splice(
        state.staticPages.findIndex((item) => item._id === action.payload),
        1
      );
    },
  },
});

export const {
  getStaticPages,
  addStaticPage,
  editStaticPage,
  removeStaticPage,
} = staticPages.actions;

export default staticPages.reducer;
