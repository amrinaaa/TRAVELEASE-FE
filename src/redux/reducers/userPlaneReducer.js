import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flightSeats: null,
  bookingResult: null,
  paymentResult: null,
  userSaldo: null,
  cancelResult: null,
  flightDetail: null, // New state for flight detail
  loadingSeats: false,
  errorSeats: null,
  loadingBooking: false,
  errorBooking: null,
  successBooking: false,
  loadingPayment: false,
  errorPayment: null,
  successPayment: false,
  loadingSaldo: false,
  errorSaldo: null,
  loadingCancel: false,
  errorCancel: null,
  successCancel: false,
  loadingFlightDetail: false, // New loading state for flight detail
  errorFlightDetail: null, // New error state for flight detail
  successFlightDetail: false, // New success state for flight detail
};

const userPlaneSlice = createSlice({
  name: "userPlane",
  initialState,
  reducers: {
    getFlightSeatsRequest: (state) => {
      state.loadingSeats = true;
      state.errorSeats = null;
      state.flightSeats = null;
    },
    getFlightSeatsSuccess: (state, action) => {
      state.loadingSeats = false;
      state.flightSeats = action.payload;
    },
    getFlightSeatsFailure: (state, action) => {
      state.loadingSeats = false;
      state.errorSeats = action.payload;
    },
    bookFlightRequest: (state) => {
      state.loadingBooking = true;
      state.errorBooking = null;
      state.successBooking = false;
      state.bookingResult = null;
    },
    bookFlightSuccess: (state, action) => {
      state.loadingBooking = false;
      state.bookingResult = action.payload;
      state.successBooking = true;
    },
    bookFlightFailure: (state, action) => {
      state.loadingBooking = false;
      state.errorBooking = action.payload;
      state.successBooking = false;
    },
    payFlightRequest: (state) => {
      state.loadingPayment = true;
      state.errorPayment = null;
      state.successPayment = false;
      state.paymentResult = null;
    },
    payFlightSuccess: (state, action) => {
      state.loadingPayment = false;
      state.paymentResult = action.payload;
      state.successPayment = true;
      if (action.payload?.user?.currentBalance !== undefined) {
        if (state.userSaldo) {
          state.userSaldo.currentAmount = action.payload.user.currentBalance;
        } else {
          state.userSaldo = { currentAmount: action.payload.user.currentBalance };
        }
      }
    },
    payFlightFailure: (state, action) => {
      state.loadingPayment = false;
      state.errorPayment = action.payload;
      state.successPayment = false;
    },
    getUserSaldoRequest: (state) => {
      state.loadingSaldo = true;
      state.errorSaldo = null;
    },
    getUserSaldoSuccess: (state, action) => {
      state.loadingSaldo = false;
      state.userSaldo = action.payload;
    },
    getUserSaldoFailure: (state, action) => {
      state.loadingSaldo = false;
      state.errorSaldo = action.payload;
      state.userSaldo = null;
    },
    cancelPaymentRequest: (state) => {
      state.loadingCancel = true;
      state.errorCancel = null;
      state.successCancel = false;
      state.cancelResult = null;
    },
    cancelPaymentSuccess: (state, action) => {
      state.loadingCancel = false;
      state.cancelResult = action.payload;
      state.successCancel = true;
    },
    cancelPaymentFailure: (state, action) => {
      state.loadingCancel = false;
      state.errorCancel = action.payload;
      state.successCancel = false;
    },
    // New reducers for flight detail
    getFlightDetailRequest: (state) => {
      state.loadingFlightDetail = true;
      state.errorFlightDetail = null;
      state.successFlightDetail = false;
      state.flightDetail = null;
    },
    getFlightDetailSuccess: (state, action) => {
      state.loadingFlightDetail = false;
      state.flightDetail = action.payload;
      state.successFlightDetail = true;
    },
    getFlightDetailFailure: (state, action) => {
      state.loadingFlightDetail = false;
      state.errorFlightDetail = action.payload;
      state.successFlightDetail = false;
    },
    resetUserPlaneState: (state) => {
      Object.assign(state, initialState);
    },
    resetBookingStatus: (state) => {
        state.successBooking = false;
        state.errorBooking = null;
        state.loadingBooking = false; // Also reset loading
    },
    resetPaymentStatus: (state) => {
        state.successPayment = false;
        state.errorPayment = null;
        state.loadingPayment = false; // Also reset loading
    },
    resetCancelStatus: (state) => {
        state.successCancel = false;
        state.errorCancel = null;
        state.loadingCancel = false; // Also reset loading
    },
    resetFlightDetailStatus: (state) => { // New helper to reset flight detail status
        state.successFlightDetail = false;
        state.errorFlightDetail = null;
        state.loadingFlightDetail = false;
        state.flightDetail = null;
    }
  },
});

export const {
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
  cancelPaymentRequest,
  cancelPaymentSuccess,
  cancelPaymentFailure,
  getFlightDetailRequest, // Export new action
  getFlightDetailSuccess, // Export new action
  getFlightDetailFailure, // Export new action
  resetUserPlaneState,
  resetBookingStatus,
  resetPaymentStatus,
  resetCancelStatus,
  resetFlightDetailStatus, // Export new helper
} = userPlaneSlice.actions;

export default userPlaneSlice.reducer;