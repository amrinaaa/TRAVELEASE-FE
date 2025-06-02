import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotelRooms: [],
  loading: false,
  error: null,

  currentRoomDetails: null,
  loadingRoomDetails: false,
  errorRoomDetails: null,

  userBalance: null,
  loadingUserBalance: false,
  errorUserBalance: null,

  booking: null,
  loadingBooking: false,
  errorBooking: null,

  cancellationDetails: null,
  loadingCancellation: false,
  errorCancellation: null,

  paymentDetails: null, // Added: state for payment details
  loadingPayment: false, // Added: loading state for payment
  errorPayment: null, // Added: error state for payment
};

const userHotelSlice = createSlice({
  name: "userHotel",
  initialState,
  reducers: {
    getHotelRoomsRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.hotelRooms = [];
    },
    getHotelRoomsSuccess: (state, action) => {
      state.loading = false;
      state.hotelRooms = action.payload;
      state.error = null;
    },
    getHotelRoomsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.hotelRooms = [];
    },

    getRoomDetailRequest: (state) => {
      state.loadingRoomDetails = true;
      state.errorRoomDetails = null;
      state.currentRoomDetails = null;
    },
    getRoomDetailSuccess: (state, action) => {
      state.loadingRoomDetails = false;
      state.currentRoomDetails = action.payload;
      state.errorRoomDetails = null;
    },
    getRoomDetailFailure: (state, action) => {
      state.loadingRoomDetails = false;
      state.errorRoomDetails = action.payload;
      state.currentRoomDetails = null;
    },

    getUserBalanceRequest: (state) => {
      state.loadingUserBalance = true;
      state.errorUserBalance = null;
    },
    getUserBalanceSuccess: (state, action) => {
      state.loadingUserBalance = false;
      state.userBalance = action.payload;
      state.errorUserBalance = null;
    },
    getUserBalanceFailure: (state, action) => {
      state.loadingUserBalance = false;
      state.errorUserBalance = action.payload;
    },

    bookRoomRequest: (state) => {
      state.loadingBooking = true;
      state.errorBooking = null;
      state.booking = null;
    },
    bookRoomSuccess: (state, action) => {
      state.loadingBooking = false;
      state.booking = action.payload; // This is the transaction object from booking
      state.errorBooking = null;
    },
    bookRoomFailure: (state, action) => {
      state.loadingBooking = false;
      state.errorBooking = action.payload;
      state.booking = null;
    },

    cancelPaymentRequest: (state) => {
      state.loadingCancellation = true;
      state.errorCancellation = null;
      state.cancellationDetails = null;
    },
    cancelPaymentSuccess: (state, action) => {
      state.loadingCancellation = false;
      state.cancellationDetails = action.payload; // This is data.data from cancel response
      state.errorCancellation = null;
      if (state.booking && state.booking.id === action.meta?.transactionId) {
        // Update status of the existing booking if it was cancelled
        state.booking.status = "CANCELED"; // Or use action.payload.status if available and more accurate
      }
    },
    cancelPaymentFailure: (state, action) => {
      state.loadingCancellation = false;
      state.errorCancellation = action.payload;
      state.cancellationDetails = null;
    },

    // Added: Reducers for processing a room payment
    processPaymentRequest: (state) => {
      state.loadingPayment = true;
      state.errorPayment = null;
      state.paymentDetails = null;
    },
    processPaymentSuccess: (state, action) => {
      state.loadingPayment = false;
      // The payload is data.data which contains message and transaction
      state.paymentDetails = action.payload;
      state.errorPayment = null;
      // If a booking exists and its ID matches the paid transaction, update its status
      if (state.booking && state.booking.id === action.payload.transaction?.id) {
        // Update the whole booking object or just the status, depends on desired behavior
        // state.booking = action.payload.transaction; // Option 1: Replace with new transaction details
        state.booking.status = action.payload.transaction.status; // Option 2: Just update status
      } else if (!state.booking && action.payload.transaction) {
        // If there was no current booking, but payment provides one (e.g. paying for an old order)
        // state.booking = action.payload.transaction; // Potentially set it
      }
    },
    processPaymentFailure: (state, action) => {
      state.loadingPayment = false;
      state.errorPayment = action.payload;
      state.paymentDetails = null;
    },

    resetUserHotelState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
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
  // Added: Export process payment actions
  processPaymentRequest,
  processPaymentSuccess,
  processPaymentFailure,
  resetUserHotelState,
} = userHotelSlice.actions;

export default userHotelSlice.reducer;