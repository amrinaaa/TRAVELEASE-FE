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

    // Assuming the API returns the updated profile or a success message
    // If it returns the updated profile, you might want to dispatch it.
    // For now, let's assume it returns a message and we refetch the profile.
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
    // Add more specific file type and size validation if needed, similar to adminActions
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      throw new Error("Only JPG/JPEG/PNG files allowed");
    }
    if (file.size > 2 * 1024 * 1024) { // Example: 2MB limit
      throw new Error("File size must be less than 2MB");
    }

    const formData = new FormData();
    formData.append('file', file); // 'file' is a common key for file uploads

    const { data } = await axios.post(
      `${api_url}/profile`, // Endpoint for uploading profile picture
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    dispatch(uploadProfilePictureSuccess(data.message || "Upload successful"));
    dispatch(getUserProfile()); // Refresh profile data to get new picture URL
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
    dispatch(getUserProfile()); // Refresh profile data
  } catch (error) {
    console.error("[ERROR] deleting profile picture:", error);
    dispatch(deleteProfilePictureFailure(error.response?.data?.message || error.message));
    throw error;
  }
};