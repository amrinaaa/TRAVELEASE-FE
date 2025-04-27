import axios from "axios";
import Cookies from "js-cookie";
import {
  getHotelsRequest,
  getHotelsSuccess,
  getHotelsFailure,
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
