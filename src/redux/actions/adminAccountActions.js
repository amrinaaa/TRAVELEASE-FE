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
} from "../reducers/adminAccountReducer"; // Updated import path

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

// Action to get admin profile
export const getAdminProfile = () => async (dispatch) => { // Renamed thunk
  try {
    dispatch(getUserProfileRequest());

    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Authentication token not found.");
    }

    const { data } = await axios.get(`${api_url}/admin-profile`, { // Updated endpoint
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (data && data.data) {
      dispatch(getUserProfileSuccess(data.data));
    } else {
      throw new Error("Invalid data format from API for admin profile");
    }
  } catch (error) {
    console.error("[ERROR] Fetching admin profile:", error); // Updated log message
    dispatch(getUserProfileFailure(error.response?.data?.message || error.message));
  }
};

// Action to update admin profile
export const updateAdminProfile = (newName) => async (dispatch) => { // Renamed thunk
  try {
    dispatch(updateUserProfileRequest());

    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Authentication token not found.");
    }

    const { data } = await axios.put(
      `${api_url}/admin-profile`, // Updated endpoint
      { newName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    dispatch(updateUserProfileSuccess(data.message || "Profile updated successfully"));
    dispatch(getAdminProfile()); // Refresh profile data using the new thunk name
    return data;
  } catch (error) {
    console.error("[ERROR] Updating admin profile:", error); // Updated log message
    dispatch(updateUserProfileFailure(error.response?.data?.message || error.message));
    throw error;
  }
};

// Action to upload admin profile picture
export const uploadAdminProfilePicture = (file) => async (dispatch) => { // Renamed thunk
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
      `${api_url}/admin-profile`, // Updated endpoint for uploading profile picture
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    dispatch(uploadProfilePictureSuccess(data.message || "Upload successful"));
    dispatch(getAdminProfile()); // Refresh profile data
  } catch (error) {
    console.error("[ERROR] Uploading admin profile picture:", error); // Updated log message
    dispatch(uploadProfilePictureFailure(error.response?.data?.message || error.message));
    throw error;
  }
};

// Action to delete admin profile picture
export const deleteAdminProfilePicture = () => async (dispatch) => { // Renamed thunk
  try {
    dispatch(deleteProfilePictureRequest());

    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Authentication token not found.");
    }

    const { data } = await axios.delete(`${api_url}/admin-profile`, { // Updated endpoint
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch(deleteProfilePictureSuccess(data.message || "Deleted successful"));
    dispatch(getAdminProfile()); // Refresh profile data
  } catch (error) {
    console.error("[ERROR] Deleting admin profile picture:", error); // Updated log message
    dispatch(deleteProfilePictureFailure(error.response?.data?.message || error.message));
    throw error;
  }
};