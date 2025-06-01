import axios from "axios";
import Cookies from "js-cookie";
import {
  getHotelRoomsRequest,
  getHotelRoomsSuccess,
  getHotelRoomsFailure,
  getRoomDetailRequest,
  getRoomDetailSuccess,
  getRoomDetailFailure,
  getUserBalanceRequest,
  getUserBalanceSuccess,
  getUserBalanceFailure, 
} from "../reducers/userHotelReducer"; 

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const getHotelRoomsById = (hotelId) => async (dispatch) => {
  if (!hotelId) {
    dispatch(getHotelRoomsFailure("Hotel ID is required."));
    return;
  }

  try {
    dispatch(getHotelRoomsRequest());

    const { data } = await axios.get(`${api_url}/user/hotel-rooms/${hotelId}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (data?.message === "success" && Array.isArray(data.data)) {
      dispatch(getHotelRoomsSuccess(data.data));
    } else {
      if (data?.message === "success" && data.data === null) {
         dispatch(getHotelRoomsSuccess([]));
      } else {
        throw new Error(data?.message || "Invalid data format from API or no hotel rooms found");
      }
    }

  } catch (error) {
    console.error(`[ERROR] Fetching hotel rooms for hotel ID ${hotelId}:`, error);
    dispatch(getHotelRoomsFailure(error.response?.data?.message || error.message));
  }
};

export const getRoomDetailById = (roomId) => async (dispatch) => {
  if (!roomId) {
    dispatch(getRoomDetailFailure("Room ID is required."));
    return;
  }

  const token = Cookies.get("token");
  if (!token) {
    dispatch(getRoomDetailFailure("Authentication token not found. Please login."));
    return;
  }

  try {
    dispatch(getRoomDetailRequest());

    const { data } = await axios.get(`${api_url}/user/detail-room/${roomId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (data?.message === "success" && typeof data.data === 'object' && data.data !== null) {
      dispatch(getRoomDetailSuccess(data.data));
    } else {
      if (data?.message === "success" && data.data === null) {
         dispatch(getRoomDetailSuccess(null));
      } else {
        throw new Error(data?.message || "Invalid data format from API or room detail not found");
      }
    }
  } catch (error) {
    console.error(`[ERROR] Fetching detail for room ID ${roomId}:`, error);
    dispatch(getRoomDetailFailure(error.response?.data?.message || error.message));
  }
};

export const getUserBalance = () => async (dispatch) => {
  const token = Cookies.get("token");
  if (!token) {
    dispatch(getUserBalanceFailure("Authentication token not found. Please login."));
    return;
  }

  try {
    dispatch(getUserBalanceRequest());

    const { data } = await axios.get(`${api_url}/user/saldo`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      }
    });

    if (data?.message === "success" && typeof data.data === 'object' && data.data !== null) {
      dispatch(getUserBalanceSuccess(data.data)); 
    } else {
      if (data?.message === "success" && data.data === null) {
        dispatch(getUserBalanceSuccess(null)); 
      } else {
        throw new Error(data?.message || "Invalid data format from API or user balance not found");
      }
    }
  } catch (error) {
    console.error(`[ERROR] Fetching user balance:`, error);
    dispatch(getUserBalanceFailure(error.response?.data?.message || error.message)); 
  }
};