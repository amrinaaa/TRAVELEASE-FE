// import axios from "axios";
// import Cookies from "js-cookie";
// import {
//   getMitraRequest,
//   getMitraSuccess,
//   getMitraFailure,
//   createMitraRequest,
//   createMitraSuccess,
//   createMitraFailure,
// } from "../reducers/mitraReducer";

// const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

// export const fetchMitraRequest = () => async (dispatch) => {
//   dispatch(getMitraRequest());
//   try {
//     const token = Cookies.get("token");
//     console.log("[DEBUG] Auth Token:", token);

//     const response = await axios.get(`${api_url}/airlines`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     console.log("[DEBUG] API Response:", response.data);

//     if (response.data?.data && Array.isArray(response.data.data)) {
//       dispatch(getMitraSuccess(response.data.data));
//     } else {
//       throw new Error("Invalid data format from API");
//     }

//   } catch (error) {
//     console.error("[ERROR] Fetching mitra:", error);
//     dispatch(getMitraFailure(error.response?.data?.message || error.message));
//   }
// };

// export const createMitra = (mitraData) => async (dispatch) => {
//   dispatch(createMitraRequest());
//   try {
//     const token = Cookies.get("token");
//     console.log("[DEBUG] Auth Token:", token);

//     const response = await axios.post(`${api_url}/airline`, mitraData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     console.log("[DEBUG] API Response (Create Mitra):", response.data);

//     dispatch(createMitraSuccess(response.data.data));
//   } catch (error) {
//     console.error("[ERROR] Creating mitra:", error);
//     dispatch(createMitraFailure(error.response?.data?.message || error.message));
//   }
// };

import axios from "axios";
import Cookies from "js-cookie";
import {
  getMitraRequest,
  getMitraSuccess,
  getMitraFailure,
  createMitraRequest,
  createMitraSuccess,
  createMitraFailure,
  deleteMitraRequest, // Import new action type
  deleteMitraSuccess, // Import new action type
  deleteMitraFailure, // Import new action type
} from "../reducers/mitraReducer";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const fetchMitraRequest = () => async (dispatch) => {
  dispatch(getMitraRequest());
  try {
    const token = Cookies.get("token");
    console.log("[DEBUG] Auth Token:", token);

    const response = await axios.get(`${api_url}/airlines`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("[DEBUG] API Response:", response.data);

    if (response.data?.data && Array.isArray(response.data.data)) {
      dispatch(getMitraSuccess(response.data.data));
    } else {
      throw new Error("Invalid data format from API");
    }

  } catch (error) {
    console.error("[ERROR] Fetching mitra:", error);
    dispatch(getMitraFailure(error.response?.data?.message || error.message));
  }
};

export const createMitra = (mitraData) => async (dispatch) => {
  dispatch(createMitraRequest());
  try {
    const token = Cookies.get("token");
    console.log("[DEBUG] Auth Token:", token);

    const response = await axios.post(`${api_url}/airline`, mitraData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("[DEBUG] API Response (Create Mitra):", response.data);

    dispatch(createMitraSuccess(response.data.data));
  } catch (error) {
    console.error("[ERROR] Creating mitra:", error);
    dispatch(createMitraFailure(error.response?.data?.message || error.message));
  }
};

export const deleteMitra = (airlineId) => async (dispatch) => {
  dispatch(deleteMitraRequest());
  try {
    const token = Cookies.get("token");
    console.log("[DEBUG] Auth Token:", token);

    const response = await axios.delete(`${api_url}/airline`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: { airlineId: airlineId }, // Send airlineId in the request body for DELETE
    });

    console.log("[DEBUG] API Response (Delete Mitra):", response.data);

    dispatch(deleteMitraSuccess(airlineId)); // Pass the ID of the deleted item
  } catch (error) {
    console.error("[ERROR] Deleting mitra:", error);
    dispatch(deleteMitraFailure(error.response?.data?.message || error.message));
  }
};