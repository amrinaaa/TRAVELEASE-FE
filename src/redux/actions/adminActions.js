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