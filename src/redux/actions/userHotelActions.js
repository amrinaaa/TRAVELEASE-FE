import axios from "axios";
import Cookies from "js-cookie";
import {
  getHotelRoomsRequest,
  getHotelRoomsSuccess,
  getHotelRoomsFailure,
  getRoomDetailRequest,
  getRoomDetailSuccess,
  getRoomDetailFailure,
  getUserBalanceRequest,
  getUserBalanceSuccess,
  getUserBalanceFailure,
  bookRoomRequest,
  bookRoomSuccess,
  bookRoomFailure,
  cancelPaymentRequest,
  cancelPaymentSuccess,
  cancelPaymentFailure,
  // Added: Import process payment actions
  processPaymentRequest,
  processPaymentSuccess,
  processPaymentFailure,
} from "../reducers/userHotelReducer";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const getHotelRoomsById = (hotelId) => async (dispatch) => {
  if (!hotelId) {
    dispatch(getHotelRoomsFailure("Hotel ID is required."));
    return;
  }

  try {
    dispatch(getHotelRoomsRequest());

    const { data } = await axios.get(`${api_url}/user/hotel-rooms/${hotelId}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (data?.message === "success" && Array.isArray(data.data)) {
      dispatch(getHotelRoomsSuccess(data.data));
    } else {
      if (data?.message === "success" && data.data === null) {
         dispatch(getHotelRoomsSuccess([]));
      } else {
        throw new Error(data?.message || "Invalid data format from API or no hotel rooms found");
      }
    }

  } catch (error) {
    console.error(`[ERROR] Fetching hotel rooms for hotel ID ${hotelId}:`, error);
    dispatch(getHotelRoomsFailure(error.response?.data?.message || error.message));
  }
};

export const getRoomDetailById = (roomId) => async (dispatch) => {
  if (!roomId) {
    dispatch(getRoomDetailFailure("Room ID is required."));
    return;
  }

  const token = Cookies.get("token");
  if (!token) {
    dispatch(getRoomDetailFailure("Authentication token not found. Please login."));
    return;
  }

  try {
    dispatch(getRoomDetailRequest());

    const { data } = await axios.get(`${api_url}/user/detail-room/${roomId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (data?.message === "success" && typeof data.data === 'object' && data.data !== null) {
      dispatch(getRoomDetailSuccess(data.data));
    } else {
      if (data?.message === "success" && data.data === null) {
         dispatch(getRoomDetailSuccess(null));
      } else {
        throw new Error(data?.message || "Invalid data format from API or room detail not found");
      }
    }
  } catch (error) {
    console.error(`[ERROR] Fetching detail for room ID ${roomId}:`, error);
    dispatch(getRoomDetailFailure(error.response?.data?.message || error.message));
  }
};

export const getUserBalance = () => async (dispatch) => {
  const token = Cookies.get("token");
  if (!token) {
    dispatch(getUserBalanceFailure("Authentication token not found. Please login."));
    return;
  }

  try {
    dispatch(getUserBalanceRequest());

    const { data } = await axios.get(`${api_url}/user/saldo`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (data?.message === "success" && typeof data.data === 'object' && data.data !== null) {
      dispatch(getUserBalanceSuccess(data.data));
    } else {
      if (data?.message === "success" && data.data === null) {
        dispatch(getUserBalanceSuccess({ saldo: 0 })); // Default to 0 or appropriate structure
      } else {
        throw new Error(data?.message || "Invalid data format from API or user balance not found");
      }
    }
  } catch (error) {
    console.error(`[ERROR] Fetching user balance:`, error);
    dispatch(getUserBalanceFailure(error.response?.data?.message || error.message));
  }
};

export const bookRoom = (bookingData) => async (dispatch) => {
  const { roomId, startDate, endDate } = bookingData;

  if (!roomId || roomId.length === 0) {
    dispatch(bookRoomFailure("Room ID is required."));
    return;
  }
  if (!startDate) {
    dispatch(bookRoomFailure("Start date is required."));
    return;
  }
  if (!endDate) {
    dispatch(bookRoomFailure("End date is required."));
    return;
  }

  const token = Cookies.get("token");
  if (!token) {
    dispatch(bookRoomFailure("Authentication token not found. Please login."));
    return;
  }

  try {
    dispatch(bookRoomRequest());

    const payload = {
      roomId,
      startDate,
      endDate,
    };

    const { data } = await axios.post(`${api_url}/booking-room`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (data?.message === "Booking kamar berhasil" && typeof data.transaction === 'object' && data.transaction !== null) {
      dispatch(bookRoomSuccess(data.transaction)); // data.transaction is the booking object
      // After successful booking, user balance might have changed (e.g. if payment is immediate or a hold is placed)
      // or it might be a "pay later" scenario.
      // For safety, or if payment reduces balance immediately, refetch balance.
      // If booking creates an "ORDERED" transaction that needs separate payment, then balance refetch here might not be essential
      // but refetching after the actual payment step is crucial.
      // The current setup seems to create an ORDERED transaction, so balance update is more critical after payment.
    } else {
      throw new Error(data?.message || "Invalid data format from API or booking failed");
    }
  } catch (error) {
    console.error(`[ERROR] Booking room:`, error);
    dispatch(bookRoomFailure(error.response?.data?.message || error.message));
  }
};

export const cancelPayment = (transactionId) => async (dispatch) => {
  if (!transactionId) {
    dispatch(cancelPaymentFailure("Transaction ID is required."));
    return;
  }

  const token = Cookies.get("token");
  if (!token) {
    dispatch(cancelPaymentFailure("Authentication token not found. Please login."));
    return;
  }

  try {
    dispatch(cancelPaymentRequest());

    const payload = {
      transactionId,
    };

    const { data } = await axios.put(`${api_url}/cancel-payment`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (data?.message === "Transaction successfully cancelled" && typeof data.data === 'object' && data.data !== null) {
      dispatch(cancelPaymentSuccess(data.data, { transactionId })); // data.data contains status and refundData
      dispatch(getUserBalance()); // Refetch balance due to refund
    } else {
      throw new Error(data?.message || "Invalid data format from API or cancellation failed");
    }
  } catch (error) {
    console.error(`[ERROR] Cancelling payment for transaction ID ${transactionId}:`, error);
    dispatch(cancelPaymentFailure(error.response?.data?.message || error.message));
  }
};

// Added: Action to process a room payment
export const processRoomPayment = (transactionId) => async (dispatch) => {
  if (!transactionId) {
    dispatch(processPaymentFailure("Transaction ID is required."));
    return;
  }

  const token = Cookies.get("token");
  if (!token) {
    dispatch(processPaymentFailure("Authentication token not found. Please login."));
    return;
  }

  try {
    dispatch(processPaymentRequest());

    // PATCH request, typically without a body if only the ID in URL is needed for the operation
    // If a body is needed, it should be passed as the second argument to axios.patch
    const { data } = await axios.patch(`${api_url}/payment-room/${transactionId}`, {}, {
      headers: {
        'Content-Type': 'application/json', // Usually not needed for PATCH with no body, but good practice
        'Authorization': `Bearer ${token}`
      }
    });

    if (data?.message === "success" && typeof data.data === 'object' && data.data !== null && data.data.transaction) {
      dispatch(processPaymentSuccess(data.data)); // data.data contains message and the updated transaction
      // After successful payment, refetch user balance as it has definitely changed.
      dispatch(getUserBalance());
    } else {
      let errorMessage = "Invalid data format from API or payment failed";
      if (data?.data?.message) { // Prefer specific message from API if available
        errorMessage = data.data.message;
      } else if (data?.message && data.message !== "success") {
        errorMessage = data.message;
      }
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error(`[ERROR] Processing payment for transaction ID ${transactionId}:`, error);
    dispatch(processPaymentFailure(error.response?.data?.message || error.response?.data?.data?.message || error.message));
  }
};