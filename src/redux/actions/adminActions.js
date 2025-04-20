import axios from "axios";
import Cookies from "js-cookie";
import {
  getUsersRequest,
  getUsersSuccess,
  getUsersFailure,
} from "../reducers/adminReducer";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const getUsers = () => async (dispatch) => {
  try {
    dispatch(getUsersRequest());

    const token = Cookies.get("token");
    console.log("[DEBUG] Auth Token:", token);

    const { data } = await axios.get(`${api_url}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log("[DEBUG] API Response:", data);
    
    // Ensure proper data structure
    if (data?.data && Array.isArray(data.data)) {
      dispatch(getUsersSuccess(data.data));
    } else {
      throw new Error("Invalid data format from API");
    }
    
  } catch (error) {
    console.error("[ERROR] Fetching users:", error);
    dispatch(getUsersFailure(error.response?.data?.message || error.message));
  }
};

// Get single user by email
// adminActions.js - Update getUserByEmail
export const getUserByEmail = (email) => async (dispatch) => {
  try {
    dispatch({ type: "GET_USER_BY_EMAIL_REQUEST" });
    
    const encodedEmail = decodeURIComponent(email);
    const { data } = await axios.get(`${api_url}/user/?identifier=${encodedEmail}`, {
      headers: { 
        Authorization: `Bearer ${Cookies.get("token")}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("[DEBUG] User response:", data); // Add for debugging
    
    if (data?.data?.length > 0) {
      dispatch({ 
        type: "GET_USER_BY_EMAIL_SUCCESS", 
        payload: data.data[0] // Take first element from array
      });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("[ERROR] Fetching user:", error);
    dispatch({
      type: "GET_USER_BY_EMAIL_FAILURE",
      payload: error.response?.data?.message || error.message
    });
    console.log("Full response:", response);
  }
};

// export const getUserByEmail = (email) => async (dispatch) => {
//   try {
//     dispatch({ type: "GET_USER_BY_EMAIL_REQUEST" });
    
//     const encodedEmail = encodeURIComponent(email);
//     const { data } = await axios.get(`${api_url}/user/?identifier=${encodedEmail}`, {
//       params: { identifier: email },
//       headers: { 
//         Authorization: `Bearer ${Cookies.get("token")}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     console.log("API Response:", data); // For debugging
    
//     if (data?.data?.length > 0) {
//       dispatch({ 
//         type: "GET_USER_BY_EMAIL_SUCCESS", 
//         payload: data.data[0] // Take first array element
//       });
//     } else {
//       throw new Error("User not found");
//     }
//   } catch (error) {
//     console.error("Fetch error:", error);
//     dispatch({
//       type: "GET_USER_BY_EMAIL_FAILURE",
//       payload: error.response?.data?.message || error.message
//     });
//   }
// };

// Update user action
export const updateUser = (uid, name, email) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_USER_REQUEST" });

    const token = Cookies.get("token");
    const { data } = await axios.patch(`${api_url}/user`, 
      { uid, name, email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    dispatch({ 
      type: "UPDATE_USER_SUCCESS",
      payload: data.data
    });
    
    // Refresh users list
    dispatch(getUsers());
    
  } catch (error) {
    dispatch({
      type: "UPDATE_USER_FAILURE",
      payload: error.response?.data?.message || error.message
    });
  }
};

