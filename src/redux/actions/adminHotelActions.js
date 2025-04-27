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
} from "../reducers/adminHotelReducer";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

// Fetch all Mitra Hotel
export const getHotels = () => async (dispatch) => {
  try {
    dispatch(getHotelsRequest());

    const token = Cookies.get("token");
    console.log("[DEBUG] Auth Token:", token);

    const { data } = await axios.get(`${api_url}/partners?role=MITRA_HOTEL`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("[DEBUG] Hotel Data Response:", data);

    if (data?.data && Array.isArray(data.data)) {
      dispatch(getHotelsSuccess(data.data));
    } else {
      throw new Error("Invalid hotel data format from API");
    }

  } catch (error) {
    console.error("[ERROR] Fetching hotels:", error);
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
  
      console.log("[DEBUG] Hotel Create Response:", data);
  
      dispatch(createHotelSuccess(data.data.user)); // user object dari response
    } catch (error) {
      console.error("[ERROR] Creating hotel partner:", error);
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