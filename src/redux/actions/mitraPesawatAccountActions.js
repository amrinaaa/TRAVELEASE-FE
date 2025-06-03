import axios from "axios";
import Cookies from "js-cookie";
import {
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
} from "../reducers/mitraPesawatAccountReducer"; // Updated import path

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

// Action to get mitra pesawat profile
export const getMitraPesawatProfile = () => async (dispatch) => { // Renamed thunk
  try {
    dispatch(getUserProfileRequest());

    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Authentication token not found.");
    }

    const { data } = await axios.get(`${api_url}/mitra-penerbangan/profile`, { // Updated endpoint
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (data && data.data) {
      dispatch(getUserProfileSuccess(data.data));
    } else {
      throw new Error("Invalid data format from API for mitra pesawat profile");
    }
  } catch (error) {
    console.error("[ERROR] Fetching mitra pesawat profile:", error); // Updated log message
    dispatch(getUserProfileFailure(error.response?.data?.message || error.message));
  }
};

// Action to update mitra pesawat profile
export const updateMitraPesawatProfile = (newName) => async (dispatch) => { // Renamed thunk
  try {
    dispatch(updateUserProfileRequest());

    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Authentication token not found.");
    }

    const { data } = await axios.put(
      `${api_url}/mitra-penerbangan/profile`, // Updated endpoint
      { newName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    dispatch(updateUserProfileSuccess(data.message || "Profile updated successfully"));
    dispatch(getMitraPesawatProfile()); // Refresh profile data using the new thunk name
    return data;
  } catch (error) {
    console.error("[ERROR] Updating mitra pesawat profile:", error); // Updated log message
    dispatch(updateUserProfileFailure(error.response?.data?.message || error.message));
    throw error;
  }
};

// Action to upload mitra pesawat profile picture
export const uploadMitraPesawatProfilePicture = (file) => async (dispatch) => { // Renamed thunk
  try {
    dispatch(uploadProfilePictureRequest());

    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Authentication token not found.");
    }

    if (!file) throw new Error("No file selected");
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      throw new Error("Only JPG/JPEG/PNG files allowed");
    }
    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      throw new Error("File size must be less than 2MB");
    }

    const formData = new FormData();
    formData.append('file', file);

    const { data } = await axios.post(
      `${api_url}/mitra-penerbangan/profile`, // Updated endpoint
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    dispatch(uploadProfilePictureSuccess(data.message || "Upload successful"));
    dispatch(getMitraPesawatProfile()); // Refresh profile data using the new thunk name
  } catch (error) {
    console.error("[ERROR] Uploading mitra pesawat profile picture:", error); // Updated log message
    dispatch(uploadProfilePictureFailure(error.response?.data?.message || error.message));
    throw error;
  }
};

// Action to delete mitra pesawat profile picture
export const deleteMitraPesawatProfilePicture = () => async (dispatch) => { // Renamed thunk
  try {
    dispatch(deleteProfilePictureRequest());

    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Authentication token not found.");
    }

    const { data } = await axios.delete(`${api_url}/mitra-penerbangan/profile`, { // Updated endpoint
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch(deleteProfilePictureSuccess(data.message || "Deleted successful"));
    dispatch(getMitraPesawatProfile()); // Refresh profile data using the new thunk name
  } catch (error) {
    console.error("[ERROR] deleting mitra pesawat profile picture:", error); // Updated log message
    dispatch(deleteProfilePictureFailure(error.response?.data?.message || error.message));
    throw error;
  }
};