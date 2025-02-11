// ** Third Party Imports
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admins: [],
};

const admins = createSlice({
  name: "admins",
  initialState,
  reducers: {
    getAdmins: (state, action) => {
      state.admins = action.payload;
    },
    addAdmin: (state, action) => {
      state.admins.push(action.payload);
    },
    editAdmin: (state, action) => {
      state.admins = state.admins.map((admin) =>
        admin._id === action.payload._id ? action.payload : admin
      );
    },
    removeAdmin: (state, action) => {
      state.admins.splice(
        state.admins.findIndex((item) => item._id === action.payload),
        1
      );
    },
  },
});

export const { getAdmins, addAdmin, editAdmin, removeAdmin } = admins.actions;

export default admins.reducer;
