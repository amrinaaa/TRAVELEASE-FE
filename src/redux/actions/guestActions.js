import axios from "axios";
import {
  getFlightsRequest,
  getFlightsSuccess,
  getFlightsFailure,
} from "../reducers/guestReducer";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const getFlights = () => async (dispatch) => {
  try {
    dispatch(getFlightsRequest());

    console.log("[DEBUG] Fetching flights...");

    const { data } = await axios.get(`${api_url}/flights`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log("[DEBUG] API Response (Flights):", data);

    // Pastikan struktur data sesuai
    if (data?.data && Array.isArray(data.data)) {
      dispatch(getFlightsSuccess(data.data));
    } else if (data?.message === "Success" && Array.isArray(data.data)) { // Menangani kasus jika data ada tapi mungkin kosong
      dispatch(getFlightsSuccess(data.data));
    }
    else {
      throw new Error("Invalid data format from API for flights");
    }

  } catch (error) {
    console.error("[ERROR] Fetching flights:", error);
    dispatch(getFlightsFailure(error.response?.data?.message || error.message));
  }
};