import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Total Users State
  totalUsersData: null,
  loadingTotalUsers: false,
  errorTotalUsers: null,

  // Total Hotel Partners State
  totalHotelPartnersData: null,
  loadingTotalHotelPartners: false,
  errorTotalHotelPartners: null,

  // Total Plane Partners State
  totalPlanePartnersData: null,
  loadingTotalPlanePartners: false,
  errorTotalPlanePartners: null,

  // Monthly Users Graph State
  monthlyUsersGraphData: [],
  loadingMonthlyUsersGraph: false,
  errorMonthlyUsersGraph: null,

  // Monthly Hotel Partners Graph State
  monthlyHotelPartnersGraphData: [],
  loadingMonthlyHotelPartnersGraph: false,
  errorMonthlyHotelPartnersGraph: null,

  // Monthly Plane Partners Graph State
  monthlyPlanePartnersGraphData: [],
  loadingMonthlyPlanePartnersGraph: false,
  errorMonthlyPlanePartnersGraph: null,
};

const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {
    // Total Users Reducers
    GET_TOTAL_USERS_REQUEST: (state) => {
      state.loadingTotalUsers = true;
      state.errorTotalUsers = null;
    },
    GET_TOTAL_USERS_SUCCESS: (state, action) => {
      state.loadingTotalUsers = false;
      state.totalUsersData = action.payload;
      state.errorTotalUsers = null;
    },
    GET_TOTAL_USERS_FAILURE: (state, action) => {
      state.loadingTotalUsers = false;
      state.errorTotalUsers = action.payload;
      state.totalUsersData = null;
    },

    // Total Hotel Partners Reducers
    GET_TOTAL_HOTEL_PARTNERS_REQUEST: (state) => {
      state.loadingTotalHotelPartners = true;
      state.errorTotalHotelPartners = null;
    },
    GET_TOTAL_HOTEL_PARTNERS_SUCCESS: (state, action) => {
      state.loadingTotalHotelPartners = false;
      state.totalHotelPartnersData = action.payload;
      state.errorTotalHotelPartners = null;
    },
    GET_TOTAL_HOTEL_PARTNERS_FAILURE: (state, action) => {
      state.loadingTotalHotelPartners = false;
      state.errorTotalHotelPartners = action.payload;
      state.totalHotelPartnersData = null;
    },

    // Total Plane Partners Reducers
    GET_TOTAL_PLANE_PARTNERS_REQUEST: (state) => {
      state.loadingTotalPlanePartners = true;
      state.errorTotalPlanePartners = null;
    },
    GET_TOTAL_PLANE_PARTNERS_SUCCESS: (state, action) => {
      state.loadingTotalPlanePartners = false;
      state.totalPlanePartnersData = action.payload;
      state.errorTotalPlanePartners = null;
    },
    GET_TOTAL_PLANE_PARTNERS_FAILURE: (state, action) => {
      state.loadingTotalPlanePartners = false;
      state.errorTotalPlanePartners = action.payload;
      state.totalPlanePartnersData = null;
    },

    // Monthly Users Graph Reducers
    GET_MONTHLY_USERS_GRAPH_REQUEST: (state) => {
      state.loadingMonthlyUsersGraph = true;
      state.errorMonthlyUsersGraph = null;
    },
    GET_MONTHLY_USERS_GRAPH_SUCCESS: (state, action) => {
      state.loadingMonthlyUsersGraph = false;
      state.monthlyUsersGraphData = action.payload;
      state.errorMonthlyUsersGraph = null;
    },
    GET_MONTHLY_USERS_GRAPH_FAILURE: (state, action) => {
      state.loadingMonthlyUsersGraph = false;
      state.errorMonthlyUsersGraph = action.payload;
      state.monthlyUsersGraphData = [];
    },

    // Monthly Hotel Partners Graph Reducers
    GET_MONTHLY_HOTEL_PARTNERS_GRAPH_REQUEST: (state) => {
      state.loadingMonthlyHotelPartnersGraph = true;
      state.errorMonthlyHotelPartnersGraph = null;
    },
    GET_MONTHLY_HOTEL_PARTNERS_GRAPH_SUCCESS: (state, action) => {
      state.loadingMonthlyHotelPartnersGraph = false;
      state.monthlyHotelPartnersGraphData = action.payload;
      state.errorMonthlyHotelPartnersGraph = null;
    },
    GET_MONTHLY_HOTEL_PARTNERS_GRAPH_FAILURE: (state, action) => {
      state.loadingMonthlyHotelPartnersGraph = false;
      state.errorMonthlyHotelPartnersGraph = action.payload;
      state.monthlyHotelPartnersGraphData = [];
    },

    // Monthly Plane Partners Graph Reducers
    GET_MONTHLY_PLANE_PARTNERS_GRAPH_REQUEST: (state) => {
      state.loadingMonthlyPlanePartnersGraph = true;
      state.errorMonthlyPlanePartnersGraph = null;
    },
    GET_MONTHLY_PLANE_PARTNERS_GRAPH_SUCCESS: (state, action) => {
      state.loadingMonthlyPlanePartnersGraph = false;
      state.monthlyPlanePartnersGraphData = action.payload;
      state.errorMonthlyPlanePartnersGraph = null;
    },
    GET_MONTHLY_PLANE_PARTNERS_GRAPH_FAILURE: (state, action) => {
      state.loadingMonthlyPlanePartnersGraph = false;
      state.errorMonthlyPlanePartnersGraph = action.payload;
      state.monthlyPlanePartnersGraphData = [];
    },

    // Reset State
    resetAdminDashboardState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

// Export all actions
export const {
  GET_TOTAL_USERS_REQUEST,
  GET_TOTAL_USERS_SUCCESS,
  GET_TOTAL_USERS_FAILURE,
  GET_TOTAL_HOTEL_PARTNERS_REQUEST,
  GET_TOTAL_HOTEL_PARTNERS_SUCCESS,
  GET_TOTAL_HOTEL_PARTNERS_FAILURE,
  GET_TOTAL_PLANE_PARTNERS_REQUEST,
  GET_TOTAL_PLANE_PARTNERS_SUCCESS,
  GET_TOTAL_PLANE_PARTNERS_FAILURE,
  GET_MONTHLY_USERS_GRAPH_REQUEST,
  GET_MONTHLY_USERS_GRAPH_SUCCESS,
  GET_MONTHLY_USERS_GRAPH_FAILURE,
  GET_MONTHLY_HOTEL_PARTNERS_GRAPH_REQUEST,
  GET_MONTHLY_HOTEL_PARTNERS_GRAPH_SUCCESS,
  GET_MONTHLY_HOTEL_PARTNERS_GRAPH_FAILURE,
  GET_MONTHLY_PLANE_PARTNERS_GRAPH_REQUEST,
  GET_MONTHLY_PLANE_PARTNERS_GRAPH_SUCCESS,
  GET_MONTHLY_PLANE_PARTNERS_GRAPH_FAILURE,
  resetAdminDashboardState,
} = adminDashboardSlice.actions;

export default adminDashboardSlice.reducer;