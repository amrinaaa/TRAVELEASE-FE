import axios from "axios";
import Cookies from "js-cookie";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

// Get Total Users Data
export const getTotalUsers = () => async (dispatch) => {
  try {
    dispatch({ type: "adminDashboard/GET_TOTAL_USERS_REQUEST" });

    const token = Cookies.get("token");
    const { data } = await axios.get(`${api_url}/dashboard/total-users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("[DEBUG] Total Users Response:", data);

    if (data?.message === "success" && data?.data !== undefined) {
      dispatch({
        type: "adminDashboard/GET_TOTAL_USERS_SUCCESS",
        payload: data.data
      });
    } else {
      throw new Error("Invalid data format from API");
    }

  } catch (error) {
    console.error("[ERROR] Fetching total users:", error);
    dispatch({
      type: "adminDashboard/GET_TOTAL_USERS_FAILURE",
      payload: error.response?.data?.message || error.message
    });
  }
};

// Get Total Hotel Partners Data
export const getTotalHotelPartners = () => async (dispatch) => {
  try {
    dispatch({ type: "adminDashboard/GET_TOTAL_HOTEL_PARTNERS_REQUEST" });

    const token = Cookies.get("token");
    const { data } = await axios.get(`${api_url}/dashboard/total-hotel-partners`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("[DEBUG] Total Hotel Partners Response:", data);

    if (data?.message === "success" && data?.data !== undefined) {
      dispatch({
        type: "adminDashboard/GET_TOTAL_HOTEL_PARTNERS_SUCCESS",
        payload: data.data
      });
    } else {
      throw new Error("Invalid data format from API");
    }

  } catch (error) {
    console.error("[ERROR] Fetching total hotel partners:", error);
    dispatch({
      type: "adminDashboard/GET_TOTAL_HOTEL_PARTNERS_FAILURE",
      payload: error.response?.data?.message || error.message
    });
  }
};

// Get Total Plane Partners Data
export const getTotalPlanePartners = () => async (dispatch) => {
  try {
    dispatch({ type: "adminDashboard/GET_TOTAL_PLANE_PARTNERS_REQUEST" });

    const token = Cookies.get("token");
    const { data } = await axios.get(`${api_url}/dashboard/total-plane-partners`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("[DEBUG] Total Plane Partners Response:", data);

    if (data?.message === "success" && data?.data !== undefined) {
      dispatch({
        type: "adminDashboard/GET_TOTAL_PLANE_PARTNERS_SUCCESS",
        payload: data.data
      });
    } else {
      throw new Error("Invalid data format from API");
    }

  } catch (error) {
    console.error("[ERROR] Fetching total plane partners:", error);
    dispatch({
      type: "adminDashboard/GET_TOTAL_PLANE_PARTNERS_FAILURE",
      payload: error.response?.data?.message || error.message
    });
  }
};

// Get Monthly Users Graph Data
export const getMonthlyUsersGraph = () => async (dispatch) => {
  try {
    dispatch({ type: "adminDashboard/GET_MONTHLY_USERS_GRAPH_REQUEST" });

    const token = Cookies.get("token");
    const { data } = await axios.get(`${api_url}/dashboard/graph-monthly-users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("[DEBUG] Monthly Users Graph Response:", data);

    if (data?.message === "success" && data?.data && Array.isArray(data.data)) {
      dispatch({
        type: "adminDashboard/GET_MONTHLY_USERS_GRAPH_SUCCESS",
        payload: data.data
      });
    } else {
      throw new Error("Invalid data format from API");
    }

  } catch (error) {
    console.error("[ERROR] Fetching monthly users graph:", error);
    dispatch({
      type: "adminDashboard/GET_MONTHLY_USERS_GRAPH_FAILURE",
      payload: error.response?.data?.message || error.message
    });
  }
};

// Get Monthly Hotel Partners Graph Data
export const getMonthlyHotelPartnersGraph = () => async (dispatch) => {
  try {
    dispatch({ type: "adminDashboard/GET_MONTHLY_HOTEL_PARTNERS_GRAPH_REQUEST" });

    const token = Cookies.get("token");
    const { data } = await axios.get(`${api_url}/dashboard/graph-monthly-hotel-partners`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("[DEBUG] Monthly Hotel Partners Graph Response:", data);

    if (data?.message === "success" && data?.data && Array.isArray(data.data)) {
      dispatch({
        type: "adminDashboard/GET_MONTHLY_HOTEL_PARTNERS_GRAPH_SUCCESS",
        payload: data.data
      });
    } else {
      throw new Error("Invalid data format from API");
    }

  } catch (error) {
    console.error("[ERROR] Fetching monthly hotel partners graph:", error);
    dispatch({
      type: "adminDashboard/GET_MONTHLY_HOTEL_PARTNERS_GRAPH_FAILURE",
      payload: error.response?.data?.message || error.message
    });
  }
};

// Get Monthly Plane Partners Graph Data
export const getMonthlyPlanePartnersGraph = () => async (dispatch) => {
  try {
    dispatch({ type: "adminDashboard/GET_MONTHLY_PLANE_PARTNERS_GRAPH_REQUEST" });

    const token = Cookies.get("token");
    const { data } = await axios.get(`${api_url}/dashboard/graph-monthly-plane-partners`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("[DEBUG] Monthly Plane Partners Graph Response:", data);

    if (data?.message === "success" && data?.data && Array.isArray(data.data)) {
      dispatch({
        type: "adminDashboard/GET_MONTHLY_PLANE_PARTNERS_GRAPH_SUCCESS",
        payload: data.data
      });
    } else {
      throw new Error("Invalid data format from API");
    }

  } catch (error) {
    console.error("[ERROR] Fetching monthly plane partners graph:", error);
    dispatch({
      type: "adminDashboard/GET_MONTHLY_PLANE_PARTNERS_GRAPH_FAILURE",
      payload: error.response?.data?.message || error.message
    });
  }
};

// Get All Admin Dashboard Data
export const getAllAdminDashboardData = () => async (dispatch) => {
  try {
    await Promise.all([
      dispatch(getTotalUsers()),
      dispatch(getTotalHotelPartners()),
      dispatch(getTotalPlanePartners()),
      dispatch(getMonthlyUsersGraph()),
      dispatch(getMonthlyHotelPartnersGraph()),
      dispatch(getMonthlyPlanePartnersGraph())
    ]);
  } catch (error) {
    console.error("[ERROR] Fetching all admin dashboard data:", error);
  }
};