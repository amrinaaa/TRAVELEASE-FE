import axios from "axios";
import Cookies from "js-cookie"; // Impor Cookies untuk mengambil token
import {
  getHotelRoomsRequest,
  getHotelRoomsSuccess,
  getHotelRoomsFailure,
  getRoomDetailRequest,  // Impor action creator baru
  getRoomDetailSuccess, // Impor action creator baru
  getRoomDetailFailure, // Impor action creator baru
} from "../reducers/userHotelReducer"; // Pastikan path ini benar

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

// Action untuk mengambil daftar ruangan dari sebuah hotel (sudah ada sebelumnya)
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

// Action baru untuk mengambil detail satu ruangan berdasarkan ID ruangan
export const getRoomDetailById = (roomId) => async (dispatch) => {
  if (!roomId) {
    dispatch(getRoomDetailFailure("Room ID is required."));
    return;
  }

  const token = Cookies.get("token"); // Mengambil token dari cookies
  if (!token) {
    // Jika tidak ada token, dispatch error dan hentikan proses
    dispatch(getRoomDetailFailure("Authentication token not found. Please login."));
    return;
  }

  try {
    dispatch(getRoomDetailRequest()); // Dispatch action request

    // Melakukan request GET ke API dengan menyertakan token di header Authorization
    const { data } = await axios.get(`${api_url}/user/detail-room/${roomId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Menyertakan token
      }
    });

    // Memastikan struktur data respons sesuai (data adalah objek)
    if (data?.message === "success" && typeof data.data === 'object' && data.data !== null) {
      dispatch(getRoomDetailSuccess(data.data)); // Dispatch action success dengan payload data ruangan
    } else {
      // Menangani kasus jika data.data adalah null meskipun message "success"
      if (data?.message === "success" && data.data === null) {
         dispatch(getRoomDetailSuccess(null)); // Atau bisa dianggap error jika data seharusnya selalu ada
      } else {
        throw new Error(data?.message || "Invalid data format from API or room detail not found");
      }
    }
  } catch (error) {
    console.error(`[ERROR] Fetching detail for room ID ${roomId}:`, error);
    dispatch(getRoomDetailFailure(error.response?.data?.message || error.message)); // Dispatch action failure
  }
};