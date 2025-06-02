import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flightSeats: null,
  bookingResult: null,
  paymentResult: null,
  userSaldo: null,
  cancelResult: null, // New state for cancellation result
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
  loadingCancel: false, // New loading state for cancellation
  errorCancel: null, // New error state for cancellation
  successCancel: false, // New success state for cancellation
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
      // Saldo update will be handled by the getUserSaldo action dispatched in userPlaneActions
    },
    cancelPaymentFailure: (state, action) => {
      state.loadingCancel = false;
      state.errorCancel = action.payload;
      state.successCancel = false;
    },
    resetUserPlaneState: (state) => {
      Object.assign(state, initialState);
    },
    resetBookingStatus: (state) => {
        state.successBooking = false;
        state.errorBooking = null;
    },
    resetPaymentStatus: (state) => {
        state.successPayment = false;
        state.errorPayment = null;
    },
    resetCancelStatus: (state) => { // New helper to reset cancel status
        state.successCancel = false;
        state.errorCancel = null;
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
  resetUserPlaneState,
  resetBookingStatus,
  resetPaymentStatus,
  resetCancelStatus, // Export new helper
} = userPlaneSlice.actions;

export default userPlaneSlice.reducer;