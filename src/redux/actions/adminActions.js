// actions/adminActions.js
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

    // Get token from cookies - make sure this matches your auth token name
    const token = Cookies.get("token"); // Or "token" if you changed it
    
    // Debugging: Log the token retrieval
    console.log("[DEBUG] Auth Token:", token);

    const config = {
      headers: {
        Authorization: `token=${token}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
    };

    // Debugging: Log the full request details
    console.log("[DEBUG] Making request to:", `${api_url}/users`);
    console.log("[DEBUG] Request config:", config);

    const { data } = await axios.get(`${api_url}/users`, config);
    
    // Debugging: Log the response
    console.log("[DEBUG] Users response:", data);
    
    dispatch(getUsersSuccess(data.data));
  } catch (error) {
    // Enhanced error logging
    console.error("[DEBUG] Users error:", error);
    console.error("[DEBUG] Error response:", error.response);
    
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        "Unknown error occurred";
    dispatch(getUsersFailure(errorMessage));
  }
};