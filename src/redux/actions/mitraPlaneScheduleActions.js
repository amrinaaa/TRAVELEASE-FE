// import axios from "axios";
// import Cookies from "js-cookie";
// import {
//   getMitraFlightsRequest,
//   getMitraFlightsSuccess,
//   getMitraFlightsFailure,
//   getPassengersRequest,
//   getPassengersSuccess,
//   getPassengersFailure,
//   deleteMitraFlightRequest,
//   deleteMitraFlightSuccess,
//   deleteMitraFlightFailure,
// } from "../reducers/mitraPlaneScheduleReducer"; // Path relatif mungkin perlu disesuaikan

// const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

// export const getMitraFlights = () => async (dispatch) => {
//   try {
//     dispatch(getMitraFlightsRequest());

//     const token = Cookies.get("token");
//     console.log("[DEBUG] Auth Token for Mitra Flights:", token);

//     const { data } = await axios.get(`${api_url}/mitra-flights`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     console.log("[DEBUG] API Response Mitra Flights:", data);

//     if (data?.data && Array.isArray(data.data)) {
//       dispatch(getMitraFlightsSuccess(data.data));
//     } else {
//       throw new Error("Invalid data format from API for mitra flights");
//     }

//   } catch (error) {
//     console.error("[ERROR] Fetching mitra flights:", error);
//     dispatch(getMitraFlightsFailure(error.response?.data?.message || error.message));
//   }
// };

// export const getPassengersByFlight = (flightId) => async (dispatch) => {
//   try {
//     dispatch(getPassengersRequest());

//     const token = Cookies.get("token");
//     console.log("[DEBUG] Auth Token for Passengers:", token);
//     console.log("[DEBUG] Requesting passengers for flightId:", flightId);

//     // Sesuai spesifikasi, flightId dikirim dalam body untuk GET request
//     const { data } = await axios({
//       method: 'get',
//       url: `${api_url}/passengers`,
//       data: { flightId },
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     console.log("[DEBUG] API Response Passengers:", data);

//     if (data?.data) {
//       dispatch(getPassengersSuccess(data.data));
//     } else {
//       throw new Error("Invalid data format from API for passengers");
//     }

//   } catch (error) {
//     console.error("[ERROR] Fetching passengers:", error);
//     dispatch(getPassengersFailure(error.response?.data?.message || error.message));
//   }
// };

// export const deleteMitraFlight = (flightId) => async (dispatch) => {
//   try {
//     dispatch(deleteMitraFlightRequest());

//     const token = Cookies.get("token");
//     console.log("[DEBUG] Auth Token for Delete Flight:", token);

//     await axios.delete(`${api_url}/flight`, {
//       data: { flightId },
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     console.log("[DEBUG] Flight deleted successfully:", flightId);
//     dispatch(deleteMitraFlightSuccess(flightId)); // Kirim flightId agar bisa di-filter di reducer jika perlu

//     // Optional: Refresh daftar flight setelah delete berhasil
//     // dispatch(getMitraFlights()); 
//     // Atau, jika Anda ingin memperbarui state secara lokal tanpa fetch ulang:
//     // Reducer akan menangani penghapusan flight dari state.

//   } catch (error) {
//     console.error("[ERROR] Deleting flight:", error);
//     dispatch(deleteMitraFlightFailure(error.response?.data?.message || error.message));
//     throw error; // Lempar error agar bisa ditangkap di komponen jika perlu
//   }
// };

import axios from "axios";
import Cookies from "js-cookie";
import {
  getMitraFlightsRequest,
  getMitraFlightsSuccess,
  getMitraFlightsFailure,
  getPassengersRequest,
  getPassengersSuccess,
  getPassengersFailure,
  deleteMitraFlightRequest,
  deleteMitraFlightSuccess,
  deleteMitraFlightFailure,
} from "../reducers/mitraPlaneScheduleReducer"; // Path relatif mungkin perlu disesuaikan

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const getMitraFlights = () => async (dispatch) => {
  try {
    dispatch(getMitraFlightsRequest());

    const token = Cookies.get("token");
    console.log("[DEBUG] Auth Token for Mitra Flights:", token);

    const { data } = await axios.get(`${api_url}/mitra-flights`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("[DEBUG] API Response Mitra Flights:", data);

    if (data?.data && Array.isArray(data.data)) {
      dispatch(getMitraFlightsSuccess(data.data));
    } else {
      throw new Error("Invalid data format from API for mitra flights");
    }

  } catch (error) {
    console.error("[ERROR] Fetching mitra flights:", error);
    dispatch(getMitraFlightsFailure(error.response?.data?.message || error.message));
  }
};

export const getPassengersByFlight = (flightId) => async (dispatch) => {
  try {
    dispatch(getPassengersRequest());

    const token = Cookies.get("token");
    console.log("[DEBUG] Auth Token for Passengers:", token);
    console.log("[DEBUG] Requesting passengers for flightId:", flightId);

    // Mengirim flightId sebagai query parameter
    const { data } = await axios.get(`${api_url}/passengers`, {
      params: { flightId }, // <--- PERUBAHAN DI SINI
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("[DEBUG] API Response Passengers:", data);

    if (data?.data) {
      dispatch(getPassengersSuccess(data.data));
    } else {
      throw new Error("Invalid data format from API for passengers");
    }

  } catch (error) {
    console.error("[ERROR] Fetching passengers:", error);
    dispatch(getPassengersFailure(error.response?.data?.message || error.message));
  }
};

export const deleteMitraFlight = (flightId) => async (dispatch) => {
  try {
    dispatch(deleteMitraFlightRequest());

    const token = Cookies.get("token");
    console.log("[DEBUG] Auth Token for Delete Flight:", token);

    // Untuk DELETE, mengirim data dalam body dengan 'data' key adalah umum jika diperlukan
    await axios.delete(`${api_url}/flight`, {
      data: { flightId },
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("[DEBUG] Flight deleted successfully:", flightId);
    dispatch(deleteMitraFlightSuccess(flightId)); // Kirim flightId agar bisa di-filter di reducer jika perlu

  } catch (error) {
    console.error("[ERROR] Deleting flight:", error);
    dispatch(deleteMitraFlightFailure(error.response?.data?.message || error.message));
    throw error; // Lempar error agar bisa ditangkap di komponen jika perlu
  }
};