import axios from "axios";
import {
  getGuestHotelsRequest,
  getGuestHotelsSuccess,
  getGuestHotelsFailure,
} from "../reducers/guestHotelReducer"; // Adjusted path if necessary

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const getGuestHotels = () => async (dispatch) => {
  try {
    dispatch(getGuestHotelsRequest());

    const { data } = await axios.get(`${api_url}/guest/hotels`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Ensure proper data structure from the response
    if (data?.data && Array.isArray(data.data)) {
      dispatch(getGuestHotelsSuccess(data.data));
    } else if (data?.message === "success" && Array.isArray(data.data)) { // Handle cases where data might be empty but message is success
      dispatch(getGuestHotelsSuccess(data.data));
    } 
    else {
      throw new Error("Invalid data format from API or no hotels found");
    }

  } catch (error) {
    console.error("[ERROR] Fetching guest hotels:", error);
    dispatch(getGuestHotelsFailure(error.response?.data?.message || error.message));
  }
};