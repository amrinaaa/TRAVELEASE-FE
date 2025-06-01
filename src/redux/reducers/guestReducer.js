import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flights: [],
  loadingFlights: false,
  errorFlights: null,
};

const guestSlice = createSlice({
  name: "guest",
  initialState,
  reducers: {
    getFlightsRequest: (state) => {
      state.loadingFlights = true;
      state.errorFlights = null;
    },
    getFlightsSuccess: (state, action) => {
      state.loadingFlights = false;
      state.flights = action.payload;
      state.errorFlights = null;
    },
    getFlightsFailure: (state, action) => {
      state.loadingFlights = false;
      state.errorFlights = action.payload;
      state.flights = [];
    },
    resetGuestState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

// Export semua actions
export const {
  getFlightsRequest,
  getFlightsSuccess,
  getFlightsFailure,
  resetGuestState,
} = guestSlice.actions;

export default guestSlice.reducer;