// ** Third Party Imports
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coupons: [],
};

const coupons = createSlice({
  name: "coupons",
  initialState,
  reducers: {
    getCoupons: (state, action) => {
      state.coupons = action.payload;
    },
    addCoupon: (state, action) => {
      state.coupons.push(action.payload);
    },
    editCoupon: (state, action) => {
      state.coupons = state.coupons.map((coupon) =>
        coupon._id === action.payload._id ? action.payload : coupon
      );
    },
    removeCoupon: (state, action) => {
      state.coupons.splice(
        state.coupons.findIndex((item) => item._id === action.payload),
        1
      );
    },
  },
});

export const { getCoupons, addCoupon, editCoupon, removeCoupon } =
  coupons.actions;

export default coupons.reducer;
