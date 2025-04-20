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

export const getUserByEmail = (email) => async (dispatch) => {
  try {
    dispatch({ type: "admin/GET_USER_BY_EMAIL_REQUEST" }); // Add slice prefix
    
    const encodedEmail = decodeURIComponent(email);
    const { data } = await axios.get(`${api_url}/user/?identifier=${encodedEmail}`, {
      headers: { 
        Authorization: `Bearer ${Cookies.get("token")}`,
        'Content-Type': 'application/json'
      }
    });

    if (data?.data?.length > 0) {
      dispatch({ 
        type: "admin/GET_USER_BY_EMAIL_SUCCESS", // Add slice prefix
        payload: data.data[0]
      });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    dispatch({
      type: "admin/GET_USER_BY_EMAIL_FAILURE", // Add slice prefix
      payload: error.response?.data?.message || error.message
    });
  }
};

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
    
    // Return the data for chaining
    return data.data;
    
  } catch (error) {
    dispatch({
      type: "UPDATE_USER_FAILURE",
      payload: error.response?.data?.message || error.message
    });
    // Throw error for component catching
    throw error;
  }
};

export const getUserById = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "admin/GET_USER_BY_ID_REQUEST" });
    
    const { data } = await axios.get(`${api_url}/user/${userId}`, {
      headers: { 
        Authorization: `Bearer ${Cookies.get("token")}`,
        'Content-Type': 'application/json'
      }
    });

    if (data?.data) {
      dispatch({ 
        type: "admin/GET_USER_BY_ID_SUCCESS", 
        payload: data.data
      });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    dispatch({
      type: "admin/GET_USER_BY_ID_FAILURE",
      payload: error.response?.data?.message || error.message
    });
  }
};

export const updateUserAmount = (uid, amount) => async (dispatch) => {
  try {
    dispatch({ type: "admin/UPDATE_AMOUNT_REQUEST" });

    const token = Cookies.get("token");
    const { data } = await axios.put(`${api_url}/amount`, 
      {
        uid,
        amount: Number(amount),
        type: "adding"
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    dispatch({ 
      type: "admin/UPDATE_AMOUNT_SUCCESS",
      payload: { uid, amount }
    });

    return data;
  } catch (error) {
    dispatch({
      type: "admin/UPDATE_AMOUNT_FAILURE",
      payload: error.response?.data?.message || error.message
    });
    throw error;
  }
};

export const deleteUser = (uid) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_USER_REQUEST" });

    const token = Cookies.get("token");
    await axios.delete(`${api_url}/user`, {
      data: { uid },
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    dispatch({ type: "DELETE_USER_SUCCESS" });
    // Refresh users list after deletion
    dispatch(getUsers());
  } catch (error) {
    dispatch({
      type: "DELETE_USER_FAILURE",
      payload: error.response?.data?.message || error.message
    });
    throw error;
  }
};

export const createUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_USER_REQUEST" });

    const token = Cookies.get("token");
    const { data } = await axios.post(`${api_url}/user`, 
      { name, email, password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    dispatch({ 
      type: "CREATE_USER_SUCCESS",
      payload: data.data.user
    });

    return data;
  } catch (error) {
    dispatch({
      type: "CREATE_USER_FAILURE",
      payload: error.response?.data?.message || error.message
    });
    throw error;
  }
};