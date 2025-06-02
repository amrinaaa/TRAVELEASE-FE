import axios from "axios";
import Cookies from "js-cookie";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

// Get Booking Today Data
export const getBookingToday = () => async (dispatch) => {
  try {
    dispatch({ type: "mitraPlaneDashboard/GET_BOOKING_TODAY_REQUEST" });

    const token = Cookies.get("token");
    const { data } = await axios.get(`${api_url}/dashboard-flight/booking-today`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("[DEBUG] Booking Today Response:", data);

    if (data?.data) {
      dispatch({
        type: "mitraPlaneDashboard/GET_BOOKING_TODAY_SUCCESS",
        payload: data.data
      });
    } else {
      throw new Error("Invalid data format from API");
    }

  } catch (error) {
    console.error("[ERROR] Fetching booking today:", error);
    dispatch({
      type: "mitraPlaneDashboard/GET_BOOKING_TODAY_FAILURE",
      payload: error.response?.data?.message || error.message
    });
  }
};

// Get Available Airplane Data
export const getAvailableAirplane = () => async (dispatch) => {
  try {
    dispatch({ type: "mitraPlaneDashboard/GET_AVAILABLE_AIRPLANE_REQUEST" });

    const token = Cookies.get("token");
    const { data } = await axios.get(`${api_url}/dashboard-flight/avalaible-airplane`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("[DEBUG] Available Airplane Response:", data);

    if (data?.data) {
      dispatch({
        type: "mitraPlaneDashboard/GET_AVAILABLE_AIRPLANE_SUCCESS",
        payload: data.data
      });
    } else {
      throw new Error("Invalid data format from API");
    }

  } catch (error) {
    console.error("[ERROR] Fetching available airplane:", error);
    dispatch({
      type: "mitraPlaneDashboard/GET_AVAILABLE_AIRPLANE_FAILURE",
      payload: error.response?.data?.message || error.message
    });
  }
};

// Get Revenue Today Data
export const getRevenueToday = () => async (dispatch) => {
  try {
    dispatch({ type: "mitraPlaneDashboard/GET_REVENUE_TODAY_REQUEST" });

    const token = Cookies.get("token");
    const { data } = await axios.get(`${api_url}/dashboard-flight/revenue-today`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("[DEBUG] Revenue Today Response:", data);

    if (data?.data) {
      dispatch({
        type: "mitraPlaneDashboard/GET_REVENUE_TODAY_SUCCESS",
        payload: data.data
      });
    } else {
      throw new Error("Invalid data format from API");
    }

  } catch (error) {
    console.error("[ERROR] Fetching revenue today:", error);
    dispatch({
      type: "mitraPlaneDashboard/GET_REVENUE_TODAY_FAILURE",
      payload: error.response?.data?.message || error.message
    });
  }
};

// Get Monthly Revenue Data
export const getMonthlyRevenue = () => async (dispatch) => {
  try {
    dispatch({ type: "mitraPlaneDashboard/GET_MONTHLY_REVENUE_REQUEST" });

    const token = Cookies.get("token");
    const { data } = await axios.get(`${api_url}/dashboard-flight/monthly-revenue`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("[DEBUG] Monthly Revenue Response:", data);

    if (data?.data && Array.isArray(data.data)) {
      dispatch({
        type: "mitraPlaneDashboard/GET_MONTHLY_REVENUE_SUCCESS",
        payload: data.data
      });
    } else {
      throw new Error("Invalid data format from API");
    }

  } catch (error) {
    console.error("[ERROR] Fetching monthly revenue:", error);
    dispatch({
      type: "mitraPlaneDashboard/GET_MONTHLY_REVENUE_FAILURE",
      payload: error.response?.data?.message || error.message
    });
  }
};

// Get Monthly Booking Data
export const getMonthlyBooking = () => async (dispatch) => {
  try {
    dispatch({ type: "mitraPlaneDashboard/GET_MONTHLY_BOOKING_REQUEST" });

    const token = Cookies.get("token");
    const { data } = await axios.get(`${api_url}/dashboard-flight/monthly-booking`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("[DEBUG] Monthly Booking Response:", data);

    if (data?.data && Array.isArray(data.data)) {
      dispatch({
        type: "mitraPlaneDashboard/GET_MONTHLY_BOOKING_SUCCESS",
        payload: data.data
      });
    } else {
      throw new Error("Invalid data format from API");
    }

  } catch (error) {
    console.error("[ERROR] Fetching monthly booking:", error);
    dispatch({
      type: "mitraPlaneDashboard/GET_MONTHLY_BOOKING_FAILURE",
      payload: error.response?.data?.message || error.message
    });
  }
};

// Get All Dashboard Data
export const getAllPlaneDashboardData = () => async (dispatch) => {
  try {
    await Promise.all([
      dispatch(getBookingToday()),
      dispatch(getAvailableAirplane()),
      dispatch(getRevenueToday()),
      dispatch(getMonthlyRevenue()),
      dispatch(getMonthlyBooking())
    ]);
  } catch (error) {
    console.error("[ERROR] Fetching all plane dashboard data:", error);
  }
};