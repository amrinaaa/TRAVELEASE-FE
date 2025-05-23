import axios from "axios";
import Cookies from "js-cookie";
import {
  getMitraRequest,
  getMitraSuccess,
  getMitraFailure,
  createMitraRequest,
  createMitraSuccess,
  createMitraFailure,
  deleteMitraRequest,
  deleteMitraSuccess,
  deleteMitraFailure,
  updateMitraRequest,
  updateMitraSuccess,
  updateMitraFailure,
  getPlanesRequest, // Import new action type for getting planes
  getPlanesSuccess, // Import new action type for getting planes
  getPlanesFailure, // Import new action type for getting planes
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
      data: { airlineId: airlineId },
    });

    console.log("[DEBUG] API Response (Delete Mitra):", response.data);

    dispatch(deleteMitraSuccess(airlineId));
  } catch (error) {
    console.error("[ERROR] Deleting mitra:", error);
    dispatch(deleteMitraFailure(error.response?.data?.message || error.message));
  }
};

export const updateMitra = (mitraData) => async (dispatch) => {
  dispatch(updateMitraRequest());
  try {
    const token = Cookies.get("token");
    console.log("[DEBUG] Auth Token:", token);

    const response = await axios.put(`${api_url}/airline`, mitraData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("[DEBUG] API Response (Update Mitra):", response.data);

    dispatch(updateMitraSuccess(response.data.data));
  } catch (error) {
    console.error("[ERROR] Updating mitra:", error);
    dispatch(updateMitraFailure(error.response?.data?.message || error.message));
  }
};

// New action creator to fetch planes for a specific airline
export const fetchPlanesRequest = (airlineId) => async (dispatch) => {
  dispatch(getPlanesRequest());
  try {
    const token = Cookies.get("token");
    console.log("[DEBUG] Auth Token:", token);

    const response = await axios.get(`${api_url}/planes?airlineId=${airlineId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("[DEBUG] API Response (Fetch Planes):", response.data);

    if (response.data?.data && Array.isArray(response.data.data)) {
      dispatch(getPlanesSuccess(response.data.data));
    } else {
      throw new Error("Invalid data format from API");
    }

  } catch (error) {
    console.error("[ERROR] Fetching planes:", error);
    dispatch(getPlanesFailure(error.response?.data?.message || error.message));
  }
};