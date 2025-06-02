import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flights: [],
  currentFlightPassengers: {
    stats: {
      totalPassengers: 0,
      adultCount: 0,
      childrenCount: 0,
      paidTickets: 0,
      unpaidTickets: 0
    },
    passengers: []
  },
  loadingFlights: false,
  errorFlights: null,
  loadingPassengers: false,
  errorPassengers: null,
  loadingDeleteFlight: false,
  errorDeleteFlight: null,
  deleteFlightSuccess: false, // Flag untuk menandakan sukses delete
};

const mitraPlaneScheduleSlice = createSlice({
  name: "mitraPlaneSchedule",
  initialState,
  reducers: {
    // Get Mitra Flights
    getMitraFlightsRequest: (state) => {
      state.loadingFlights = true;
      state.errorFlights = null;
    },
    getMitraFlightsSuccess: (state, action) => {
      state.loadingFlights = false;
      state.flights = action.payload;
      state.errorFlights = null;
    },
    getMitraFlightsFailure: (state, action) => {
      state.loadingFlights = false;
      state.errorFlights = action.payload;
      state.flights = [];
    },

    // Get Passengers by Flight
    getPassengersRequest: (state) => {
      state.loadingPassengers = true;
      state.errorPassengers = null;
      // Reset data penumpang sebelumnya saat request baru
      state.currentFlightPassengers = initialState.currentFlightPassengers;
    },
    getPassengersSuccess: (state, action) => {
      state.loadingPassengers = false;
      state.currentFlightPassengers = action.payload;
      state.errorPassengers = null;
    },
    getPassengersFailure: (state, action) => {
      state.loadingPassengers = false;
      state.errorPassengers = action.payload;
      state.currentFlightPassengers = initialState.currentFlightPassengers;
    },

    // Delete Mitra Flight
    deleteMitraFlightRequest: (state) => {
      state.loadingDeleteFlight = true;
      state.errorDeleteFlight = null;
      state.deleteFlightSuccess = false;
    },
    deleteMitraFlightSuccess: (state, action) => {
      state.loadingDeleteFlight = false;
      // Filter flight yang dihapus dari state
      state.flights = state.flights.filter(flight => flight["Flight ID"] !== action.payload);
      state.errorDeleteFlight = null;
      state.deleteFlightSuccess = true;
    },
    deleteMitraFlightFailure: (state, action) => {
      state.loadingDeleteFlight = false;
      state.errorDeleteFlight = action.payload;
      state.deleteFlightSuccess = false;
    },

    // Reset state (opsional, jika diperlukan)
    resetMitraPlaneScheduleState: (state) => {
      Object.assign(state, initialState);
    },
    resetDeleteFlightStatus: (state) => { // Untuk mereset status delete setelah berhasil
        state.loadingDeleteFlight = false;
        state.errorDeleteFlight = null;
        state.deleteFlightSuccess = false;
    }
  },
});

export const {
  getMitraFlightsRequest,
  getMitraFlightsSuccess,
  getMitraFlightsFailure,
  getPassengersRequest,
  getPassengersSuccess,
  getPassengersFailure,
  deleteMitraFlightRequest,
  deleteMitraFlightSuccess,
  deleteMitraFlightFailure,
  resetMitraPlaneScheduleState,
  resetDeleteFlightStatus
} = mitraPlaneScheduleSlice.actions;

export default mitraPlaneScheduleSlice.reducer;