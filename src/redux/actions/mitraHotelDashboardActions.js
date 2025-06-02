import axios from "axios";
import Cookies from "js-cookie";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

// Get New Booking Data
export const getNewBooking = () => async (dispatch) => {
  try {
    dispatch({ type: "mitraHotelDashboard/GET_NEW_BOOKING_REQUEST" });

    const token = Cookies.get("token");
    const { data } = await axios.get(`${api_url}/dashboard-hotel/new-booking`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("[DEBUG] New Booking Response:", data);

    if (data?.success && data?.data) {
      dispatch({
        type: "mitraHotelDashboard/GET_NEW_BOOKING_SUCCESS",
        payload: data.data
      });
    } else {
      throw new Error("Invalid data format from API");
    }

  } catch (error) {
    console.error("[ERROR] Fetching new booking:", error);
    dispatch({
      type: "mitraHotelDashboard/GET_NEW_BOOKING_FAILURE",
      payload: error.response?.data?.message || error.message
    });
  }
};

// Get Available Room Data
export const getAvailableRoom = () => async (dispatch) => {
  try {
    dispatch({ type: "mitraHotelDashboard/GET_AVAILABLE_ROOM_REQUEST" });

    const token = Cookies.get("token");
    const { data } = await axios.get(`${api_url}/dashboard-hotel/new-available-room`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("[DEBUG] Available Room Response:", data);

    if (data?.success && data?.data) {
      dispatch({
        type: "mitraHotelDashboard/GET_AVAILABLE_ROOM_SUCCESS",
        payload: data.data
      });
    } else {
      throw new Error("Invalid data format from API");
    }

  } catch (error) {
    console.error("[ERROR] Fetching available room:", error);
    dispatch({
      type: "mitraHotelDashboard/GET_AVAILABLE_ROOM_FAILURE",
      payload: error.response?.data?.message || error.message
    });
  }
};

// Get Active Booking Data
export const getActiveBooking = () => async (dispatch) => {
  try {
    dispatch({ type: "mitraHotelDashboard/GET_ACTIVE_BOOKING_REQUEST" });

    const token = Cookies.get("token");
    const { data } = await axios.get(`${api_url}/dashboard-hotel/active-booking`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("[DEBUG] Active Booking Response:", data);

    if (data?.success && data?.data) {
      dispatch({
        type: "mitraHotelDashboard/GET_ACTIVE_BOOKING_SUCCESS",
        payload: data.data
      });
    } else {
      throw new Error("Invalid data format from API");
    }

  } catch (error) {
    console.error("[ERROR] Fetching active booking:", error);
    dispatch({
      type: "mitraHotelDashboard/GET_ACTIVE_BOOKING_FAILURE",
      payload: error.response?.data?.message || error.message
    });
  }
};

// Get Revenue Data
export const getRevenue = () => async (dispatch) => {
  try {
    dispatch({ type: "mitraHotelDashboard/GET_REVENUE_REQUEST" });

    const token = Cookies.get("token");
    const { data } = await axios.get(`${api_url}/dashboard-hotel/revenue`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("[DEBUG] Revenue Response:", data);

    if (data?.success && data?.data) {
      dispatch({
        type: "mitraHotelDashboard/GET_REVENUE_SUCCESS",
        payload: data.data
      });
    } else {
      throw new Error("Invalid data format from API");
    }

  } catch (error) {
    console.error("[ERROR] Fetching revenue:", error);
    dispatch({
      type: "mitraHotelDashboard/GET_REVENUE_FAILURE",
      payload: error.response?.data?.message || error.message
    });
  }
};

// Get Revenue Graph Data
export const getRevenueGraph = () => async (dispatch) => {
  try {
    dispatch({ type: "mitraHotelDashboard/GET_REVENUE_GRAPH_REQUEST" });

    const token = Cookies.get("token");
    const { data } = await axios.get(`${api_url}/dashboard-hotel/grafik-revenue`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("[DEBUG] Revenue Graph Response:", data);

    if (data?.success && data?.data && Array.isArray(data.data)) {
      dispatch({
        type: "mitraHotelDashboard/GET_REVENUE_GRAPH_SUCCESS",
        payload: data.data
      });
    } else {
      throw new Error("Invalid data format from API");
    }

  } catch (error) {
    console.error("[ERROR] Fetching revenue graph:", error);
    dispatch({
      type: "mitraHotelDashboard/GET_REVENUE_GRAPH_FAILURE",
      payload: error.response?.data?.message || error.message
    });
  }
};

// Get Booking Graph Data
export const getBookingGraph = () => async (dispatch) => {
  try {
    dispatch({ type: "mitraHotelDashboard/GET_BOOKING_GRAPH_REQUEST" });

    const token = Cookies.get("token");
    const { data } = await axios.get(`${api_url}/dashboard-hotel/grafik-booking`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("[DEBUG] Booking Graph Response:", data);

    if (data?.success && data?.data && Array.isArray(data.data)) {
      dispatch({
        type: "mitraHotelDashboard/GET_BOOKING_GRAPH_SUCCESS",
        payload: data.data
      });
    } else {
      throw new Error("Invalid data format from API");
    }

  } catch (error) {
    console.error("[ERROR] Fetching booking graph:", error);
    dispatch({
      type: "mitraHotelDashboard/GET_BOOKING_GRAPH_FAILURE",
      payload: error.response?.data?.message || error.message
    });
  }
};

// Get All Dashboard Data
export const getAllDashboardData = () => async (dispatch) => {
  try {
    await Promise.all([
      dispatch(getNewBooking()),
      dispatch(getAvailableRoom()),
      dispatch(getActiveBooking()),
      dispatch(getRevenue()),
      dispatch(getRevenueGraph()),
      dispatch(getBookingGraph())
    ]);
  } catch (error) {
    console.error("[ERROR] Fetching all dashboard data:", error);
  }
};