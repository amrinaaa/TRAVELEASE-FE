import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loadingFetch: false,
  errorFetch: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    getUsersRequest: (state) => {
      state.loadingFetch = true;
      state.errorFetch = null;
    },
    getUsersSuccess: (state, action) => {
      state.loadingFetch = false;
      state.users = action.payload;
      state.errorFetch = null;
    },
    getUsersFailure: (state, action) => {
      state.loadingFetch = false;
      state.errorFetch = action.payload;
      state.users = [];
    },
    resetAdminState: (state) => {
      Object.assign(state, initialState);
    }
  },
});

export const { 
  getUsersRequest, 
  getUsersSuccess, 
  getUsersFailure,
  resetAdminState
} = adminSlice.actions;

export default adminSlice.reducer;