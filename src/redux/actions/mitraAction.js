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
  getPlanesRequest,
  getPlanesSuccess,
  getPlanesFailure,
  deletePlaneRequest,
  deletePlaneSuccess,
  deletePlaneFailure,
  createPlaneRequest,
  createPlaneSuccess,
  createPlaneFailure,
  getPlaneTypesRequest,
  getPlaneTypesSuccess,
  getPlaneTypesFailure,
  createPlaneTypeRequest,
  createPlaneTypeSuccess,
  createPlaneTypeFailure,
  getSeatsRequest, // Import new action type for getting seats
  getSeatsSuccess, // Import new action type for getting seats
  getSeatsFailure, // Import new action type for getting seats
} from "../reducers/mitraReducer";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

// --- Airline Actions ---

export const fetchMitraRequest = () => async (dispatch) => {
  dispatch(getMitraRequest());
  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${api_url}/airlines`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    if (response.data?.data && Array.isArray(response.data.data)) {
      dispatch(getMitraSuccess(response.data.data));
    } else {
      throw new Error("Invalid data format from API");
    }
  } catch (error) {
    dispatch(getMitraFailure(error.response?.data?.message || error.message));
  }
};

export const createMitra = (mitraData) => async (dispatch) => {
  dispatch(createMitraRequest());
  try {
    const token = Cookies.get("token");
    const response = await axios.post(`${api_url}/airline`, mitraData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    dispatch(createMitraSuccess(response.data.data));
  } catch (error) {
    dispatch(createMitraFailure(error.response?.data?.message || error.message));
  }
};

export const deleteMitra = (airlineId) => async (dispatch) => {
  dispatch(deleteMitraRequest());
  try {
    const token = Cookies.get("token");
    await axios.delete(`${api_url}/airline`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      data: { airlineId: airlineId },
    });
    dispatch(deleteMitraSuccess(airlineId));
  } catch (error) {
    dispatch(deleteMitraFailure(error.response?.data?.message || error.message));
  }
};

export const updateMitra = (mitraData) => async (dispatch) => {
  dispatch(updateMitraRequest());
  try {
    const token = Cookies.get("token");
    const response = await axios.put(`${api_url}/airline`, mitraData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    dispatch(updateMitraSuccess(response.data.data));
  } catch (error) {
    dispatch(updateMitraFailure(error.response?.data?.message || error.message));
  }
};

// --- Plane Actions ---

export const fetchPlanesRequest = (airlineId) => async (dispatch) => {
  dispatch(getPlanesRequest());
  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${api_url}/planes?airlineId=${airlineId}`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    if (response.data?.data && Array.isArray(response.data.data)) {
      dispatch(getPlanesSuccess(response.data.data));
    } else {
      throw new Error("Invalid data format from API");
    }
  } catch (error) {
    dispatch(getPlanesFailure(error.response?.data?.message || error.message));
  }
};

export const deletePlane = (planeId) => async (dispatch) => {
  dispatch(deletePlaneRequest());
  try {
    const token = Cookies.get("token");
    await axios.delete(`${api_url}/plane`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      data: { planeId: planeId },
    });
    dispatch(deletePlaneSuccess(planeId));
  } catch (error) {
    dispatch(deletePlaneFailure(error.response?.data?.message || error.message));
  }
};

export const createPlane = (planeData) => async (dispatch) => {
  dispatch(createPlaneRequest());
  try {
    const token = Cookies.get("token");
    const response = await axios.post(`${api_url}/plane`, planeData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    dispatch(createPlaneSuccess(response.data.data));
  } catch (error) {
    dispatch(createPlaneFailure(error.response?.data?.message || error.message));
  }
};

// --- Plane Type Actions ---

export const fetchPlaneTypesRequest = () => async (dispatch) => {
  dispatch(getPlaneTypesRequest());
  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${api_url}/plane-type`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    if (response.data?.data && Array.isArray(response.data.data)) {
      dispatch(getPlaneTypesSuccess(response.data.data));
    } else {
      throw new Error("Invalid data format from API");
    }
  } catch (error) {
    dispatch(getPlaneTypesFailure(error.response?.data?.message || error.message));
  }
};

export const createPlaneType = (planeTypeData) => async (dispatch) => {
  dispatch(createPlaneTypeRequest());
  try {
    const token = Cookies.get("token");
    const response = await axios.post(`${api_url}/plane-type`, planeTypeData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    dispatch(createPlaneTypeSuccess(response.data.data));
  } catch (error) {
    dispatch(createPlaneTypeFailure(error.response?.data?.message || error.message));
  }
};

// --- Seat Actions ---

export const fetchSeatsRequest = (planeId) => async (dispatch) => {
  dispatch(getSeatsRequest());
  try {
    const token = Cookies.get("token");
    console.log("[DEBUG] Auth Token:", token);

    const response = await axios.get(`${api_url}/seats?planeId=${planeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("[DEBUG] API Response (Fetch Seats):", response.data);

    if (response.data?.data && Array.isArray(response.data.data)) {
      dispatch(getSeatsSuccess(response.data.data));
    } else {
      // Handle cases where data might be present but not an array (though unlikely based on response)
      // Or if data is completely missing
      throw new Error("Invalid data format from API or no seats found");
    }
  } catch (error) {
    console.error("[ERROR] Fetching seats:", error);
    dispatch(getSeatsFailure(error.response?.data?.message || error.message));
  }
};