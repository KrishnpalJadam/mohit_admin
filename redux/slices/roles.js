// ** Third Party Imports
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: [],
};

const roles = createSlice({
  name: "roles",
  initialState,
  reducers: {
    getRoles: (state, action) => {
      state.roles = action.payload;
    },
    addRole: (state, action) => {
      state.roles.push(action.payload);
    },
    editRole: (state, action) => {
      state.roles = state.roles.map((role) =>
        role._id === action.payload._id ? action.payload : role
      );
    },
    removeRole: (state, action) => {
      state.roles.splice(
        state.roles.findIndex((item) => item._id === action.payload),
        1
      );
    },
  },
});

export const { getRoles, addRole, editRole, removeRole } = roles.actions;

export default roles.reducer;
