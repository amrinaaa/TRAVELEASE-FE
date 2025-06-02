import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // New Booking State
  newBookingData: null,
  loadingNewBooking: false,
  errorNewBooking: null,

  // Available Room State
  availableRoomData: null,
  loadingAvailableRoom: false,
  errorAvailableRoom: null,

  // Active Booking State
  activeBookingData: null,
  loadingActiveBooking: false,
  errorActiveBooking: null,

  // Revenue State
  revenueData: null,
  loadingRevenue: false,
  errorRevenue: null,

  // Revenue Graph State
  revenueGraphData: [],
  loadingRevenueGraph: false,
  errorRevenueGraph: null,

  // Booking Graph State
  bookingGraphData: [],
  loadingBookingGraph: false,
  errorBookingGraph: null,
};

const mitraHotelDashboardSlice = createSlice({
  name: "mitraHotelDashboard",
  initialState,
  reducers: {
    // New Booking Reducers
    GET_NEW_BOOKING_REQUEST: (state) => {
      state.loadingNewBooking = true;
      state.errorNewBooking = null;
    },
    GET_NEW_BOOKING_SUCCESS: (state, action) => {
      state.loadingNewBooking = false;
      state.newBookingData = action.payload;
      state.errorNewBooking = null;
    },
    GET_NEW_BOOKING_FAILURE: (state, action) => {
      state.loadingNewBooking = false;
      state.errorNewBooking = action.payload;
      state.newBookingData = null;
    },

    // Available Room Reducers
    GET_AVAILABLE_ROOM_REQUEST: (state) => {
      state.loadingAvailableRoom = true;
      state.errorAvailableRoom = null;
    },
    GET_AVAILABLE_ROOM_SUCCESS: (state, action) => {
      state.loadingAvailableRoom = false;
      state.availableRoomData = action.payload;
      state.errorAvailableRoom = null;
    },
    GET_AVAILABLE_ROOM_FAILURE: (state, action) => {
      state.loadingAvailableRoom = false;
      state.errorAvailableRoom = action.payload;
      state.availableRoomData = null;
    },

    // Active Booking Reducers
    GET_ACTIVE_BOOKING_REQUEST: (state) => {
      state.loadingActiveBooking = true;
      state.errorActiveBooking = null;
    },
    GET_ACTIVE_BOOKING_SUCCESS: (state, action) => {
      state.loadingActiveBooking = false;
      state.activeBookingData = action.payload;
      state.errorActiveBooking = null;
    },
    GET_ACTIVE_BOOKING_FAILURE: (state, action) => {
      state.loadingActiveBooking = false;
      state.errorActiveBooking = action.payload;
      state.activeBookingData = null;
    },

    // Revenue Reducers
    GET_REVENUE_REQUEST: (state) => {
      state.loadingRevenue = true;
      state.errorRevenue = null;
    },
    GET_REVENUE_SUCCESS: (state, action) => {
      state.loadingRevenue = false;
      state.revenueData = action.payload;
      state.errorRevenue = null;
    },
    GET_REVENUE_FAILURE: (state, action) => {
      state.loadingRevenue = false;
      state.errorRevenue = action.payload;
      state.revenueData = null;
    },

    // Revenue Graph Reducers
    GET_REVENUE_GRAPH_REQUEST: (state) => {
      state.loadingRevenueGraph = true;
      state.errorRevenueGraph = null;
    },
    GET_REVENUE_GRAPH_SUCCESS: (state, action) => {
      state.loadingRevenueGraph = false;
      state.revenueGraphData = action.payload;
      state.errorRevenueGraph = null;
    },
    GET_REVENUE_GRAPH_FAILURE: (state, action) => {
      state.loadingRevenueGraph = false;
      state.errorRevenueGraph = action.payload;
      state.revenueGraphData = [];
    },

    // Booking Graph Reducers
    GET_BOOKING_GRAPH_REQUEST: (state) => {
      state.loadingBookingGraph = true;
      state.errorBookingGraph = null;
    },
    GET_BOOKING_GRAPH_SUCCESS: (state, action) => {
      state.loadingBookingGraph = false;
      state.bookingGraphData = action.payload;
      state.errorBookingGraph = null;
    },
    GET_BOOKING_GRAPH_FAILURE: (state, action) => {
      state.loadingBookingGraph = false;
      state.errorBookingGraph = action.payload;
      state.bookingGraphData = [];
    },

    // Reset State
    resetmitraHotelDashboardState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

// Export all actions
export const {
  GET_NEW_BOOKING_REQUEST,
  GET_NEW_BOOKING_SUCCESS,
  GET_NEW_BOOKING_FAILURE,
  GET_AVAILABLE_ROOM_REQUEST,
  GET_AVAILABLE_ROOM_SUCCESS,
  GET_AVAILABLE_ROOM_FAILURE,
  GET_ACTIVE_BOOKING_REQUEST,
  GET_ACTIVE_BOOKING_SUCCESS,
  GET_ACTIVE_BOOKING_FAILURE,
  GET_REVENUE_REQUEST,
  GET_REVENUE_SUCCESS,
  GET_REVENUE_FAILURE,
  GET_REVENUE_GRAPH_REQUEST,
  GET_REVENUE_GRAPH_SUCCESS,
  GET_REVENUE_GRAPH_FAILURE,
  GET_BOOKING_GRAPH_REQUEST,
  GET_BOOKING_GRAPH_SUCCESS,
  GET_BOOKING_GRAPH_FAILURE,
  resetmitraHotelDashboardState,
} = mitraHotelDashboardSlice.actions;

export default mitraHotelDashboardSlice.reducer;