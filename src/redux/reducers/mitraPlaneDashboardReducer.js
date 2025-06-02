import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Booking Today State
  bookingTodayData: null,
  loadingBookingToday: false,
  errorBookingToday: null,

  // Available Airplane State
  availableAirplaneData: null,
  loadingAvailableAirplane: false,
  errorAvailableAirplane: null,

  // Revenue Today State
  revenueTodayData: null,
  loadingRevenueToday: false,
  errorRevenueToday: null,

  // Monthly Revenue State
  monthlyRevenueData: [],
  loadingMonthlyRevenue: false,
  errorMonthlyRevenue: null,

  // Monthly Booking State
  monthlyBookingData: [],
  loadingMonthlyBooking: false,
  errorMonthlyBooking: null,
};

const mitraPlaneDashboardSlice = createSlice({
  name: "mitraPlaneDashboard",
  initialState,
  reducers: {
    // Booking Today Reducers
    GET_BOOKING_TODAY_REQUEST: (state) => {
      state.loadingBookingToday = true;
      state.errorBookingToday = null;
    },
    GET_BOOKING_TODAY_SUCCESS: (state, action) => {
      state.loadingBookingToday = false;
      state.bookingTodayData = action.payload;
      state.errorBookingToday = null;
    },
    GET_BOOKING_TODAY_FAILURE: (state, action) => {
      state.loadingBookingToday = false;
      state.errorBookingToday = action.payload;
      state.bookingTodayData = null;
    },

    // Available Airplane Reducers
    GET_AVAILABLE_AIRPLANE_REQUEST: (state) => {
      state.loadingAvailableAirplane = true;
      state.errorAvailableAirplane = null;
    },
    GET_AVAILABLE_AIRPLANE_SUCCESS: (state, action) => {
      state.loadingAvailableAirplane = false;
      state.availableAirplaneData = action.payload;
      state.errorAvailableAirplane = null;
    },
    GET_AVAILABLE_AIRPLANE_FAILURE: (state, action) => {
      state.loadingAvailableAirplane = false;
      state.errorAvailableAirplane = action.payload;
      state.availableAirplaneData = null;
    },

    // Revenue Today Reducers
    GET_REVENUE_TODAY_REQUEST: (state) => {
      state.loadingRevenueToday = true;
      state.errorRevenueToday = null;
    },
    GET_REVENUE_TODAY_SUCCESS: (state, action) => {
      state.loadingRevenueToday = false;
      state.revenueTodayData = action.payload;
      state.errorRevenueToday = null;
    },
    GET_REVENUE_TODAY_FAILURE: (state, action) => {
      state.loadingRevenueToday = false;
      state.errorRevenueToday = action.payload;
      state.revenueTodayData = null;
    },

    // Monthly Revenue Reducers
    GET_MONTHLY_REVENUE_REQUEST: (state) => {
      state.loadingMonthlyRevenue = true;
      state.errorMonthlyRevenue = null;
    },
    GET_MONTHLY_REVENUE_SUCCESS: (state, action) => {
      state.loadingMonthlyRevenue = false;
      state.monthlyRevenueData = action.payload;
      state.errorMonthlyRevenue = null;
    },
    GET_MONTHLY_REVENUE_FAILURE: (state, action) => {
      state.loadingMonthlyRevenue = false;
      state.errorMonthlyRevenue = action.payload;
      state.monthlyRevenueData = [];
    },

    // Monthly Booking Reducers
    GET_MONTHLY_BOOKING_REQUEST: (state) => {
      state.loadingMonthlyBooking = true;
      state.errorMonthlyBooking = null;
    },
    GET_MONTHLY_BOOKING_SUCCESS: (state, action) => {
      state.loadingMonthlyBooking = false;
      state.monthlyBookingData = action.payload;
      state.errorMonthlyBooking = null;
    },
    GET_MONTHLY_BOOKING_FAILURE: (state, action) => {
      state.loadingMonthlyBooking = false;
      state.errorMonthlyBooking = action.payload;
      state.monthlyBookingData = [];
    },

    // Reset State
    resetMitraPlaneDashboardState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

// Export all actions
export const {
  GET_BOOKING_TODAY_REQUEST,
  GET_BOOKING_TODAY_SUCCESS,
  GET_BOOKING_TODAY_FAILURE,
  GET_AVAILABLE_AIRPLANE_REQUEST,
  GET_AVAILABLE_AIRPLANE_SUCCESS,
  GET_AVAILABLE_AIRPLANE_FAILURE,
  GET_REVENUE_TODAY_REQUEST,
  GET_REVENUE_TODAY_SUCCESS,
  GET_REVENUE_TODAY_FAILURE,
  GET_MONTHLY_REVENUE_REQUEST,
  GET_MONTHLY_REVENUE_SUCCESS,
  GET_MONTHLY_REVENUE_FAILURE,
  GET_MONTHLY_BOOKING_REQUEST,
  GET_MONTHLY_BOOKING_SUCCESS,
  GET_MONTHLY_BOOKING_FAILURE,
  resetMitraPlaneDashboardState,
} = mitraPlaneDashboardSlice.actions;

export default mitraPlaneDashboardSlice.reducer;