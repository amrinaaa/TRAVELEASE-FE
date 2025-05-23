import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mitraList: [],
  loadingFetch: false,
  errorFetch: null,
  loadingCreate: false,
  errorCreate: null,
  createdMitra: null,
  loadingDelete: false,
  errorDelete: null,
  loadingUpdate: false,
  errorUpdate: null,
  updatedMitra: null,
  planeList: [],
  loadingPlanes: false,
  errorPlanes: null,
  loadingDeletePlane: false,
  errorDeletePlane: null,
  loadingCreatePlane: false,
  errorCreatePlane: null,
  createdPlane: null,
  planeTypeList: [],
  loadingPlaneTypes: false,
  errorPlaneTypes: null,
  loadingCreatePlaneType: false,
  errorCreatePlaneType: null,
  createdPlaneType: null,
  seatList: [],
  loadingSeats: false,
  errorSeats: null,
  loadingDeleteSeat: false, // New state for deleting seat
  errorDeleteSeat: null,   // New state for deleting seat error
};

const mitraSlice = createSlice({
  name: "mitra",
  initialState,
  reducers: {
    // --- Mitra/Airline Reducers ---
    getMitraRequest: (state) => {
      state.loadingFetch = true;
      state.errorFetch = null;
    },
    getMitraSuccess: (state, action) => {
      state.loadingFetch = false;
      state.mitraList = action.payload;
      state.errorFetch = null;
    },
    getMitraFailure: (state, action) => {
      state.loadingFetch = false;
      state.errorFetch = action.payload;
      state.mitraList = [];
    },
    createMitraRequest: (state) => {
      state.loadingCreate = true;
      state.errorCreate = null;
      state.createdMitra = null;
    },
    createMitraSuccess: (state, action) => {
      state.loadingCreate = false;
      state.createdMitra = action.payload;
      state.errorCreate = null;
      state.mitraList.push(action.payload);
    },
    createMitraFailure: (state, action) => {
      state.loadingCreate = false;
      state.errorCreate = action.payload;
      state.createdMitra = null;
    },
    deleteMitraRequest: (state) => {
      state.loadingDelete = true;
      state.errorDelete = null;
    },
    deleteMitraSuccess: (state, action) => {
      state.loadingDelete = false;
      state.mitraList = state.mitraList.filter(
        (mitra) => mitra.id !== action.payload
      );
      state.errorDelete = null;
    },
    deleteMitraFailure: (state, action) => {
      state.loadingDelete = false;
      state.errorDelete = action.payload;
    },
    updateMitraRequest: (state) => {
      state.loadingUpdate = true;
      state.errorUpdate = null;
      state.updatedMitra = null;
    },
    updateMitraSuccess: (state, action) => {
      state.loadingUpdate = false;
      state.updatedMitra = action.payload;
      state.errorUpdate = null;
      const index = state.mitraList.findIndex(
        (mitra) => mitra.id === action.payload.id
      );
      if (index !== -1) {
        state.mitraList[index] = action.payload;
      }
    },
    updateMitraFailure: (state, action) => {
      state.loadingUpdate = false;
      state.errorUpdate = action.payload;
      state.updatedMitra = null;
    },
    // --- Plane Reducers ---
    getPlanesRequest: (state) => {
      state.loadingPlanes = true;
      state.errorPlanes = null;
    },
    getPlanesSuccess: (state, action) => {
      state.loadingPlanes = false;
      state.planeList = action.payload;
      state.errorPlanes = null;
    },
    getPlanesFailure: (state, action) => {
      state.loadingPlanes = false;
      state.errorPlanes = action.payload;
      state.planeList = [];
    },
    deletePlaneRequest: (state) => {
      state.loadingDeletePlane = true;
      state.errorDeletePlane = null;
    },
    deletePlaneSuccess: (state, action) => {
      state.loadingDeletePlane = false;
      state.planeList = state.planeList.filter(
        (plane) => plane.id !== action.payload
      );
      state.errorDeletePlane = null;
    },
    deletePlaneFailure: (state, action) => {
      state.loadingDeletePlane = false;
      state.errorDeletePlane = action.payload;
    },
    createPlaneRequest: (state) => {
      state.loadingCreatePlane = true;
      state.errorCreatePlane = null;
      state.createdPlane = null;
    },
    createPlaneSuccess: (state, action) => {
      state.loadingCreatePlane = false;
      state.createdPlane = action.payload;
      state.errorCreatePlane = null;
    },
    createPlaneFailure: (state, action) => {
      state.loadingCreatePlane = false;
      state.errorCreatePlane = action.payload;
      state.createdPlane = null;
    },
    // --- Plane Type Reducers ---
    getPlaneTypesRequest: (state) => {
      state.loadingPlaneTypes = true;
      state.errorPlaneTypes = null;
    },
    getPlaneTypesSuccess: (state, action) => {
      state.loadingPlaneTypes = false;
      state.planeTypeList = action.payload;
      state.errorPlaneTypes = null;
    },
    getPlaneTypesFailure: (state, action) => {
      state.loadingPlaneTypes = false;
      state.errorPlaneTypes = action.payload;
      state.planeTypeList = [];
    },
    createPlaneTypeRequest: (state) => {
      state.loadingCreatePlaneType = true;
      state.errorCreatePlaneType = null;
      state.createdPlaneType = null;
    },
    createPlaneTypeSuccess: (state, action) => {
      state.loadingCreatePlaneType = false;
      state.createdPlaneType = action.payload;
      state.errorCreatePlaneType = null;
      state.planeTypeList.push(action.payload);
    },
    createPlaneTypeFailure: (state, action) => {
      state.loadingCreatePlaneType = false;
      state.errorCreatePlaneType = action.payload;
      state.createdPlaneType = null;
    },
    // --- Seat Reducers ---
    getSeatsRequest: (state) => {
      state.loadingSeats = true;
      state.errorSeats = null;
    },
    getSeatsSuccess: (state, action) => {
      state.loadingSeats = false;
      state.seatList = action.payload;
      state.errorSeats = null;
    },
    getSeatsFailure: (state, action) => {
      state.loadingSeats = false;
      state.errorSeats = action.payload;
      state.seatList = [];
    },
    deleteSeatRequest: (state) => { // Reducer for deleting seat request
      state.loadingDeleteSeat = true;
      state.errorDeleteSeat = null;
    },
    deleteSeatSuccess: (state, action) => { // Reducer for deleting seat success
      state.loadingDeleteSeat = false;
      const seatIdToDelete = action.payload;
      // Filter out the deleted seat from the nested structure
      state.seatList = state.seatList.map(category => ({
          ...category,
          seats: category.seats.filter(seat => seat.id !== seatIdToDelete),
      })).filter(category => category.seats.length > 0 || state.seatList.some(cat => cat.categoryId === category.categoryId && cat.seats.length > 0)); // Optional: remove category if empty
      state.errorDeleteSeat = null;
    },
    deleteSeatFailure: (state, action) => { // Reducer for deleting seat failure
      state.loadingDeleteSeat = false;
      state.errorDeleteSeat = action.payload;
    },
    // --- Reset State ---
    resetMitraState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  getMitraRequest,
  getMitraSuccess,
  getMitraFailure,
  createMitraRequest,
  createMitraSuccess,
  createMitraFailure,
  deleteMitraRequest,
  deleteMitraSuccess,
  deleteMitraFailure,
  updateMitraRequest,
  updateMitraSuccess,
  updateMitraFailure,
  getPlanesRequest,
  getPlanesSuccess,
  getPlanesFailure,
  deletePlaneRequest,
  deletePlaneSuccess,
  deletePlaneFailure,
  createPlaneRequest,
  createPlaneSuccess,
  createPlaneFailure,
  getPlaneTypesRequest,
  getPlaneTypesSuccess,
  getPlaneTypesFailure,
  createPlaneTypeRequest,
  createPlaneTypeSuccess,
  createPlaneTypeFailure,
  getSeatsRequest,
  getSeatsSuccess,
  getSeatsFailure,
  deleteSeatRequest,
  deleteSeatSuccess,
  deleteSeatFailure,
  resetMitraState,
} = mitraSlice.actions;

export default mitraSlice.reducer;