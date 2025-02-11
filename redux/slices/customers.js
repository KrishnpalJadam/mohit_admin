// ** Third Party Imports
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [],
};

const customers = createSlice({
  name: "customers",
  initialState,
  reducers: {
    getCustomers: (state, action) => {
      state.customers = action.payload;
    },
    editCustomer: (state, action) => {
      state.customers = state.customers.map((customer) =>
        customer._id === action.payload._id ? action.payload : customer
      );
    },
  },
});

export const { getCustomers, editCustomer } = customers.actions;

export default customers.reducer;
