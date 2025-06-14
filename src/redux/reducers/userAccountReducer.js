import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  loadingGetProfile: false,
  errorGetProfile: null,
  loadingUpdateProfile: false,
  errorUpdateProfile: null,
  updateProfileMessage: null,
  loadingUploadPicture: false,
  errorUploadPicture: null,
  uploadPictureMessage: null,
  loadingDeletePicture: false,
  errorDeletePicture: null,
  deletePictureMessage: null,
  transactionHistory: [], // Changed from null to [] for easier handling in components
  loadingGetTransactionHistory: false,
  errorGetTransactionHistory: null,
  // getTransactionHistoryMessage: null, // Not needed if we store the data directly
};

const userAccountSlice = createSlice({
  name: "userAccount",
  initialState,
  reducers: {
    // Get User Profile
    getUserProfileRequest: (state) => {
      state.loadingGetProfile = true;
      state.errorGetProfile = null;
      state.profile = null; // Reset profile on new request
    },
    getUserProfileSuccess: (state, action) => {
      state.loadingGetProfile = false;
      state.profile = action.payload;
      state.errorGetProfile = null;
    },
    getUserProfileFailure: (state, action) => {
      state.loadingGetProfile = false;
      state.errorGetProfile = action.payload;
      state.profile = null;
    },

    // Update User Profile
    updateUserProfileRequest: (state) => {
      state.loadingUpdateProfile = true;
      state.errorUpdateProfile = null;
      state.updateProfileMessage = null;
    },
    updateUserProfileSuccess: (state, action) => {
      state.loadingUpdateProfile = false;
      state.updateProfileMessage = action.payload; // Success message
      state.errorUpdateProfile = null;
    },
    updateUserProfileFailure: (state, action) => {
      state.loadingUpdateProfile = false;
      state.errorUpdateProfile = action.payload;
      state.updateProfileMessage = null;
    },

    // Upload Profile Picture
    uploadProfilePictureRequest: (state) => {
      state.loadingUploadPicture = true;
      state.errorUploadPicture = null;
      state.uploadPictureMessage = null;
    },
    uploadProfilePictureSuccess: (state, action) => {
      state.loadingUploadPicture = false;
      state.uploadPictureMessage = action.payload; // Success message
      state.errorUploadPicture = null;
    },
    uploadProfilePictureFailure: (state, action) => {
      state.loadingUploadPicture = false;
      state.errorUploadPicture = action.payload;
      state.uploadPictureMessage = null;
    },

    // Delete Profile Picture
    deleteProfilePictureRequest: (state) => {
      state.loadingDeletePicture = true;
      state.errorDeletePicture = null;
      state.deletePictureMessage = null;
    },
    deleteProfilePictureSuccess: (state, action) => {
      state.loadingDeletePicture = false;
      state.deletePictureMessage = action.payload; // Success message
      state.errorDeletePicture = null;
    },
    deleteProfilePictureFailure: (state, action) => {
      state.loadingDeletePicture = false;
      state.errorDeletePicture = action.payload;
      state.deletePictureMessage = null;
    },

    // Get Transaction History
    getTransactionHistoryRequest: (state) => {
      state.loadingGetTransactionHistory = true;
      state.errorGetTransactionHistory = null;
      state.transactionHistory = []; // Reset on new request
    },
    getTransactionHistorySuccess: (state, action) => {
      state.loadingGetTransactionHistory = false;
      state.transactionHistory = action.payload;
      state.errorGetTransactionHistory = null;
    },
    getTransactionHistoryFailure: (state, action) => {
      state.loadingGetTransactionHistory = false;
      state.errorGetTransactionHistory = action.payload;
      state.transactionHistory = [];
    },

    // Reset state if needed
    resetUserAccountState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  getUserProfileRequest,
  getUserProfileSuccess,
  getUserProfileFailure,
  updateUserProfileRequest,
  updateUserProfileSuccess,
  updateUserProfileFailure,
  uploadProfilePictureRequest,
  uploadProfilePictureSuccess,
  uploadProfilePictureFailure,
  deleteProfilePictureRequest,
  deleteProfilePictureSuccess,
  deleteProfilePictureFailure,
  getTransactionHistoryRequest,
  getTransactionHistorySuccess,
  getTransactionHistoryFailure,
  resetUserAccountState,
} = userAccountSlice.actions;

export default userAccountSlice.reducer;