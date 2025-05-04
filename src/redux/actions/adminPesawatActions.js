import axios from "axios";
import Cookies from "js-cookie";
import {
  getHotelsRequest,
  getHotelsSuccess,
  getHotelsFailure,

  createHotelRequest,
  createHotelSuccess,
  createHotelFailure,
  resetCreateHotelState,

  deleteHotelRequest,
  deleteHotelSuccess,
  deleteHotelFailure,

  editHotelRequest,
  editHotelSuccess,
  editHotelFailure,

  getHotelDetailRequest,
  getHotelDetailSuccess,
  getHotelDetailFailure,
} from "../reducers/adminPesawatReducer";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

// Fetch all Mitra Hotel
export const getHotels = () => async (dispatch) => {
  try {
    dispatch(getHotelsRequest());

    const token = Cookies.get("token");
    console.log("[DEBUG] Auth Token:", token);

    const { data } = await axios.get(`${api_url}/partners?role=MITRA_PENERBANGAN`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("[DEBUG] Penerbangan Data Response:", data);

    if (data?.data && Array.isArray(data.data)) {
      dispatch(getHotelsSuccess(data.data));
    } else {
      throw new Error("Invalid penerbangan data format from API");
    }

  } catch (error) {
    console.error("[ERROR] Fetching penerbangan:", error);
    dispatch(getHotelsFailure(error.response?.data?.message || error.message));
  }
};

// Create new Mitra Hotel
export const createHotelPartner = (partnerData) => async (dispatch) => {
    try {
      dispatch(createHotelRequest());
  
      const token = Cookies.get("token");
      console.log("[DEBUG] Auth Token for Create:", token);
  
      const { data } = await axios.post(`${api_url}/partner`, partnerData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      console.log("[DEBUG] penerbangan Create Response:", data);
  
      dispatch(createHotelSuccess(data.data.user)); // user object dari response
    } catch (error) {
      console.error("[ERROR] Creating penerbangan partner:", error);
      dispatch(createHotelFailure(error.response?.data?.message || error.message));
    }
  };

export const resetCreateHotel = () => (dispatch) => {
    dispatch(resetCreateHotelState());
};


// Delete Mitra Hotel
export const deleteHotelPartner = (uid) => async (dispatch) => {
    try {
      dispatch(deleteHotelRequest());
  
      const token = Cookies.get("token");
  
      const { data } = await axios.delete(`${api_url}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { uid },
      });
  
      dispatch(deleteHotelSuccess(uid)); // Notify success and pass the deleted UID
    } catch (error) {
      dispatch(deleteHotelFailure(error.response?.data?.message || error.message));
    }
  };

  // Edit Mitra penerbangan (Update Name and Email)
export const editHotelPartner = (uid, name, email) => async (dispatch) => {
    try {
      dispatch(editHotelRequest());
  
      const token = Cookies.get("token");
  
      const response = await axios.patch(`${api_url}/user`, { uid, name, email }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (response.data?.data) {
        dispatch(editHotelSuccess(response.data.data)); // Return the updated user data
      } else {
        throw new Error("Error while editing penerbangan partner");
      }
    } catch (error) {
      dispatch(editHotelFailure(error.response?.data?.message || error.message));
    }
  };

// Fetch detail partner berdasarkan identifier dan role
export const getHotelDetail = (name) => async (dispatch) => {
    try {
      dispatch(getHotelDetailRequest());
  
      const token = Cookies.get("token");
      console.log("[DEBUG] Auth Token:", token);
  
      const { data } = await axios.get(`${api_url}/partner`, {
        params: {
          identifier: name,
          role: "MITRA_PENERBANGAN", // role sudah ditentukan
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      console.log("[DEBUG] Hotel penerbangan Response:", data);
  
      if (data?.data && data.data.length > 0) {
        dispatch(getHotelDetailSuccess(data.data[0])); // Ambil data pertama dari array
      } else {
        throw new Error("Hotel not found");
      }
  
    } catch (error) {
      console.error("[ERROR] Fetching penerbangan detail:", error);
      dispatch(getHotelDetailFailure(error.response?.data?.message || error.message));
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