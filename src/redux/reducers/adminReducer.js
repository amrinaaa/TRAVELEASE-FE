import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  currentUser: null,
  loadingFetch: false,
  loadingFetchSingle: false,
  loadingUpdate: false,
  errorFetch: null,
  errorFetchSingle: null,
  errorUpdate: null,
  currentUser: null, // Ensure this is null initially
  loadingFetchSingle: false,
  errorFetchSingle: null,
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
    },
        // Get single user reducers
        GET_USER_BY_EMAIL_REQUEST: (state) => {
          state.loadingFetchSingle = true;
          state.errorFetchSingle = null;
          state.currentUser = null;
        },
        GET_USER_BY_EMAIL_SUCCESS: (state, action) => {
          state.loadingFetchSingle = false;
          state.currentUser = action.payload; // Ensure payload is direct user object
          state.errorFetchSingle = null;
        },
        GET_USER_BY_EMAIL_FAILURE: (state, action) => {
          state.loadingFetchSingle = false;
          state.errorFetchSingle = action.payload;
          state.currentUser = null;
        },
    
        // Update user reducers
        UPDATE_USER_REQUEST: (state) => {
          state.loadingUpdate = true;
          state.errorUpdate = null;
        },
        UPDATE_USER_SUCCESS: (state, action) => {
          state.loadingUpdate = false;
          state.currentUser = action.payload;
          state.errorUpdate = null;
        },
        UPDATE_USER_FAILURE: (state, action) => {
          state.loadingUpdate = false;
          state.errorUpdate = action.payload;
        },
        
        resetAdminState: (state) => {
          Object.assign(state, initialState);
        }
      },
    });
    
    // Export all actions
    export const { 
      getUsersRequest, 
      getUsersSuccess, 
      getUsersFailure,
      GET_USER_BY_EMAIL_REQUEST,
      GET_USER_BY_EMAIL_SUCCESS,
      GET_USER_BY_EMAIL_FAILURE,
      UPDATE_USER_REQUEST,
      UPDATE_USER_SUCCESS,
      UPDATE_USER_FAILURE,
      resetAdminState
    } = adminSlice.actions;
    
    export default adminSlice.reducer;
