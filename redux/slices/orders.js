// ** Third Party Imports
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orders = createSlice({
  name: "orders",
  initialState,
  reducers: {
    getOrders: (state, action) => {
      state.orders = action.payload;
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    editOrder: (state, action) => {
      state.orders = state.orders.map((order) =>
        order._id === action.payload._id ? action.payload : order
      );
    },
  },
});

export const { getOrders, addOrder, editOrder } = orders.actions;

export default orders.reducer;
