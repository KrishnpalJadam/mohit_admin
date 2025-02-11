// ** Third Party Imports
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productSettings: {},
};

const productSettings = createSlice({
  name: "productSettings",
  initialState,
  reducers: {
    getProductSettings: (state, action) => {
      state.productSettings = action.payload;
    },
    editProductSettings: (state, action) => {
      state.productSettings = action.payload;
    },
  },
});

export const { getProductSettings, editProductSettings } =
  productSettings.actions;

export default productSettings.reducer;
