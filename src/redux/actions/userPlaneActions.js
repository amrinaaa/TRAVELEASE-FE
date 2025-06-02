import axios from "axios";
import Cookies from "js-cookie";
import {
  getFlightSeatsRequest,
  getFlightSeatsSuccess,
  getFlightSeatsFailure,
  bookFlightRequest,
  bookFlightSuccess,
  bookFlightFailure,
  payFlightRequest,
  payFlightSuccess,
  payFlightFailure,
  getUserSaldoRequest,
  getUserSaldoSuccess,
  getUserSaldoFailure,
  resetUserPlaneState, // Added for resetting state
  cancelPaymentRequest, // New action type
  cancelPaymentSuccess, // New action type
  cancelPaymentFailure,
} from "../reducers/userPlaneReducer";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const getFlightSeats = (flightId) => async (dispatch) => {
  try {
    dispatch(getFlightSeatsRequest());

    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Authentication token not found.");
    }

    const { data } = await axios.get(`${api_url}/seats/${flightId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (data?.data) {
      dispatch(getFlightSeatsSuccess(data.data));
    } else {
      throw new Error("Invalid data format from API for flight seats");
    }
  } catch (error) {
    console.error("[ERROR] Fetching flight seats:", error);
    dispatch(getFlightSeatsFailure(error.response?.data?.message || error.message));
  }
};

export const bookFlight = (flightId, passengers) => async (dispatch) => {
  try {
    dispatch(bookFlightRequest());

    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Authentication token not found.");
    }

    const { data } = await axios.post(`${api_url}/booking-flight`,
      { flightId, passengers },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (data?.data) {
      dispatch(bookFlightSuccess(data.data));
      return data.data; // Return data for chaining or component use
    } else {
      throw new Error("Invalid data format from API for flight booking");
    }
  } catch (error) {
    console.error("[ERROR] Booking flight:", error);
    dispatch(bookFlightFailure(error.response?.data?.message || error.message));
    throw error; // Re-throw for component error handling
  }
};

export const payFlight = (transactionId) => async (dispatch) => {
  try {
    dispatch(payFlightRequest());

    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Authentication token not found.");
    }

    const { data } = await axios.put(`${api_url}/payment-flight`, // Assuming 'payment-fligt' was a typo
      { transactionId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (data?.data) {
      dispatch(payFlightSuccess(data.data));
      // Optionally, refresh user saldo after successful payment
      dispatch(getUserSaldo());
      return data.data; // Return data for component use
    } else {
      throw new Error("Invalid data format from API for flight payment");
    }
  } catch (error) {
    console.error("[ERROR] Paying flight:", error);
    dispatch(payFlightFailure(error.response?.data?.message || error.message));
    throw error; // Re-throw for component error handling
  }
};

export const getUserSaldo = () => async (dispatch) => {
  try {
    dispatch(getUserSaldoRequest());

    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Authentication token not found.");
    }

    const { data } = await axios.get(`${api_url}/user/saldo`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (data?.data) {
      dispatch(getUserSaldoSuccess(data.data));
    } else {
      throw new Error("Invalid data format from API for user saldo");
    }
  } catch (error) {
    console.error("[ERROR] Fetching user saldo:", error);
    dispatch(getUserSaldoFailure(error.response?.data?.message || error.message));
  }
};

export const cancelPayment = (transactionId) => async (dispatch) => {
  try {
    dispatch(cancelPaymentRequest());

    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Authentication token not found.");
    }

    const { data } = await axios.put(`${api_url}/cancel-payment`,
      { transactionId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (data?.data && data.message === "Transaction successfully cancelled") {
      dispatch(cancelPaymentSuccess(data.data));
      // After successful cancellation and refund, refresh user's saldo
      dispatch(getUserSaldo());
      return data; // Return the full response data
    } else {
      throw new Error(data?.message || "Invalid data format from API for cancel payment");
    }
  } catch (error) {
    console.error("[ERROR] Cancelling payment:", error);
    dispatch(cancelPaymentFailure(error.response?.data?.message || error.message));
    throw error; // Re-throw for component error handling
  }
};

// Action to reset state, can be called on component unmount or specific events
export const clearUserPlaneState = () => (dispatch) => {
  dispatch(resetUserPlaneState());
};