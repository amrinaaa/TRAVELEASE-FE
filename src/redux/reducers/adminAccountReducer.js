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
};

const adminAccountSlice = createSlice({
  name: "adminAccount", // Updated slice name
  initialState,
  reducers: {
    // Get Admin Profile
    getUserProfileRequest: (state) => {
      state.loadingGetProfile = true;
      state.errorGetProfile = null;
      state.profile = null;
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

    // Update Admin Profile
    updateUserProfileRequest: (state) => {
      state.loadingUpdateProfile = true;
      state.errorUpdateProfile = null;
      state.updateProfileMessage = null;
    },
    updateUserProfileSuccess: (state, action) => {
      state.loadingUpdateProfile = false;
      state.updateProfileMessage = action.payload;
      state.errorUpdateProfile = null;
    },
    updateUserProfileFailure: (state, action) => {
      state.loadingUpdateProfile = false;
      state.errorUpdateProfile = action.payload;
      state.updateProfileMessage = null;
    },

    // Upload Admin Profile Picture
    uploadProfilePictureRequest: (state) => {
      state.loadingUploadPicture = true;
      state.errorUploadPicture = null;
      state.uploadPictureMessage = null;
    },
    uploadProfilePictureSuccess: (state, action) => {
      state.loadingUploadPicture = false;
      state.uploadPictureMessage = action.payload;
      state.errorUploadPicture = null;
    },
    uploadProfilePictureFailure: (state, action) => {
      state.loadingUploadPicture = false;
      state.errorUploadPicture = action.payload;
      state.uploadPictureMessage = null;
    },

    // Delete Admin Profile Picture
    deleteProfilePictureRequest: (state) => {
      state.loadingDeletePicture = true;
      state.errorDeletePicture = null;
      state.deletePictureMessage = null;
    },
    deleteProfilePictureSuccess: (state, action) => {
      state.loadingDeletePicture = false;
      state.deletePictureMessage = action.payload;
      state.errorDeletePicture = null;
    },
    deleteProfilePictureFailure: (state, action) => {
      state.loadingDeletePicture = false;
      state.errorDeletePicture = action.payload;
      state.deletePictureMessage = null;
    },

    // Reset state
    resetAdminAccountState: (state) => { // Renamed reset function
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
  resetAdminAccountState, // Export renamed reset function
} = adminAccountSlice.actions;

export default adminAccountSlice.reducer;