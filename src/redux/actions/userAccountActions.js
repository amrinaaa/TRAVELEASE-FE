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
  getTransactionHistoryRequest, // Added
  getTransactionHistorySuccess, // Added
  getTransactionHistoryFailure, // Added
} from "../reducers/userAccountReducer"; // Pastikan path ini benar

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

// Action to get user profile
export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch(getUserProfileRequest());

    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Authentication token not found.");
    }

    const { data } = await axios.get(`${api_url}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (data && data.data) {
      dispatch(getUserProfileSuccess(data.data));
    } else {
      throw new Error("Invalid data format from API for user profile");
    }
  } catch (error) {
    console.error("[ERROR] Fetching user profile:", error);
    dispatch(getUserProfileFailure(error.response?.data?.message || error.message));
  }
};

// Action to update user profile
export const updateUserProfile = (newName) => async (dispatch) => {
  try {
    dispatch(updateUserProfileRequest());

    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Authentication token not found.");
    }

    const { data } = await axios.put(
      `${api_url}/profile`,
      { newName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    dispatch(updateUserProfileSuccess(data.message || "Profile updated successfully"));
    dispatch(getUserProfile()); // Refresh profile data
    return data;
  } catch (error) {
    console.error("[ERROR] Updating user profile:", error);
    dispatch(updateUserProfileFailure(error.response?.data?.message || error.message));
    throw error;
  }
};

// Action to upload profile picture
export const uploadUserProfilePicture = (file) => async (dispatch) => {
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
    if (file.size > 2 * 1024 * 1024) { // Example: 2MB limit
      throw new Error("File size must be less than 2MB");
    }

    const formData = new FormData();
    formData.append('file', file);

    const { data } = await axios.post(
      `${api_url}/profile`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    dispatch(uploadProfilePictureSuccess(data.message || "Upload successful"));
    dispatch(getUserProfile());
  } catch (error) {
    console.error("[ERROR] Uploading profile picture:", error);
    dispatch(uploadProfilePictureFailure(error.response?.data?.message || error.message));
    throw error;
  }
};

// Action to delete profile picture
export const deleteUserProfilePicture = () => async (dispatch) => {
  try {
    dispatch(deleteProfilePictureRequest());

    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Authentication token not found.");
    }

    const { data } = await axios.delete(`${api_url}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch(deleteProfilePictureSuccess(data.message || "Deleted successful"));
    dispatch(getUserProfile());
  } catch (error) {
    console.error("[ERROR] deleting profile picture:", error);
    dispatch(deleteProfilePictureFailure(error.response?.data?.message || error.message));
    throw error;
  }
};

// Action to get transaction history
export const getTransactionHistory = () => async (dispatch) => {
  try {
    dispatch(getTransactionHistoryRequest());

    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Authentication token not found.");
    }

    const { data } = await axios.get(`${api_url}/transaction-history`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json' // Added for consistency, though GET typically doesn't need Content-Type for body
      }
    });

    if (data && data.data) {
      dispatch(getTransactionHistorySuccess(data.data));
    } else if (data && data.message && Array.isArray(data.data)) { // Handle cases where data might be empty but valid
        dispatch(getTransactionHistorySuccess(data.data));
    }
    else {
      // If the API returns a message like "Transaction history retrieved successfully" but data is empty,
      // it's still a success but with no transactions.
      // The provided example shows data can be an empty array, so this should be handled.
      throw new Error("Invalid data format from API for transaction history");
    }
  } catch (error) {
    console.error("[ERROR] Fetching transaction history:", error);
    // Check if the error is due to "Invalid data format" custom error or an API/network error
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(getTransactionHistoryFailure(errorMessage));
    // Optionally, rethrow if you want calling code to also handle it,
    // but for Redux actions, usually dispatching failure is enough.
    // throw error;
  }
};