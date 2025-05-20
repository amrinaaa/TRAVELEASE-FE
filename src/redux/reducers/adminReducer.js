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
  loadingUpdateAmount: false,
  errorUpdateAmount: null,
  loadingFetchById: false,
  errorFetchById: null,
  loadingCreate: false,
  errorCreate: null,
  loadingProfilePic: false,
  errorProfilePic: null,
  loadingDeletePic: false,
  errorDeletePic: null,
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
      GET_USER_BY_ID_REQUEST: (state) => {
        state.loadingFetchById = true;
        state.errorFetchById = null;
      },
      GET_USER_BY_ID_SUCCESS: (state, action) => {
        state.loadingFetchById = false;
        state.currentUser = action.payload;
        state.errorFetchById = null;
      },
      GET_USER_BY_ID_FAILURE: (state, action) => {
        state.loadingFetchById = false;
        state.errorFetchById = action.payload;
      },
      UPDATE_AMOUNT_REQUEST: (state) => {
        state.loadingUpdateAmount = true;
        state.errorUpdateAmount = null;
      },
      UPDATE_AMOUNT_SUCCESS: (state, action) => {
        state.loadingUpdateAmount = false;
        if (state.currentUser) {
          state.currentUser.currentAmount += action.payload.amount;
        }
        state.errorUpdateAmount = null;
      },
      UPDATE_AMOUNT_FAILURE: (state, action) => {
        state.loadingUpdateAmount = false;
        state.errorUpdateAmount = action.payload;
      },
      DELETE_USER_REQUEST: (state) => {
        state.loadingDelete = true;
        state.errorDelete = null;
      },
      DELETE_USER_SUCCESS: (state) => {
        state.loadingDelete = false;
        state.errorDelete = null;
      },
      DELETE_USER_FAILURE: (state, action) => {
        state.loadingDelete = false;
        state.errorDelete = action.payload;
      },
      CREATE_USER_REQUEST: (state) => {
        state.loadingCreate = true;
        state.errorCreate = null;
        state.successCreate = false;
      },
      CREATE_USER_SUCCESS: (state, action) => {
        state.loadingCreate = false;
        state.users.push(action.payload);
        state.errorCreate = null;
        state.successCreate = true;
      },
      CREATE_USER_FAILURE: (state, action) => {
        state.loadingCreate = false;
        state.errorCreate = action.payload;
      },
      RESET_CREATE_STATE: (state) => {
        state.loadingCreate = false;
        state.errorCreate = null;
        state.successCreate = false;
      },
          UPLOAD_PROFILE_PIC_REQUEST: (state) => {
      state.loadingProfilePic = true;
      state.errorProfilePic = null;
    },
    UPLOAD_PROFILE_PIC_SUCCESS: (state) => {
      state.loadingProfilePic = false;
      state.errorProfilePic = null;
    },
    UPLOAD_PROFILE_PIC_FAILURE: (state, action) => {
      state.loadingProfilePic = false;
      state.errorProfilePic = action.payload;
    },
    DELETE_PROFILE_PIC_REQUEST: (state) => {
      state.loadingDeletePic = true;
      state.errorDeletePic = null;
    },
    DELETE_PROFILE_PIC_SUCCESS: (state) => {
      state.loadingDeletePic = false;
      state.errorDeletePic = null;
    },
    DELETE_PROFILE_PIC_FAILURE: (state, action) => {
      state.loadingDeletePic = false;
      state.errorDeletePic = action.payload;
    }    
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
      resetAdminState,
      GET_USER_BY_ID_REQUEST,
      GET_USER_BY_ID_SUCCESS,
      GET_USER_BY_ID_FAILURE,
      UPDATE_AMOUNT_REQUEST,
      UPDATE_AMOUNT_SUCCESS,
      UPDATE_AMOUNT_FAILURE,
      DELETE_USER_REQUEST,
      DELETE_USER_SUCCESS,
      DELETE_USER_FAILURE,
      CREATE_USER_REQUEST,
      CREATE_USER_SUCCESS,
      CREATE_USER_FAILURE,
      UPLOAD_PROFILE_PIC_REQUEST,
      UPLOAD_PROFILE_PIC_SUCCESS,
      UPLOAD_PROFILE_PIC_FAILURE,
      DELETE_PROFILE_PIC_REQUEST,
      DELETE_PROFILE_PIC_SUCCESS,
      DELETE_PROFILE_PIC_FAILURE
    } = adminSlice.actions;
    
    export default adminSlice.reducer;
