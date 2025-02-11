// ** Third Party Imports
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    editProduct: (state, action) => {
      state.products = state.products.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
    },
    setTrending: (state, action) => {
      state.products = state.products.map((product) =>
        product._id === action.payload._id
          ? { ...product, trending: action.payload.trending }
          : product
      );
    },
    removeProduct: (state, action) => {
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },
  },
});

export const {
  getProducts,
  addProduct,
  editProduct,
  setTrending,
  removeProduct,
} = products.actions;

export default products.reducer;
