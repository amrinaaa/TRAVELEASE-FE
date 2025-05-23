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
  loadingCreatePlane: false, // New state for creating plane
  errorCreatePlane: null,   // New state for creating plane error
  createdPlane: null,       // New state for created plane
  planeTypeList: [],
  loadingPlaneTypes: false,
  errorPlaneTypes: null,
  loadingCreatePlaneType: false,
  errorCreatePlaneType: null,
  createdPlaneType: null,
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
    createPlaneRequest: (state) => { // Reducer for creating plane request
      state.loadingCreatePlane = true;
      state.errorCreatePlane = null;
      state.createdPlane = null;
    },
    createPlaneSuccess: (state, action) => { // Reducer for creating plane success
      state.loadingCreatePlane = false;
      state.createdPlane = action.payload;
      state.errorCreatePlane = null;
      // Note: The response doesn't include the full planeType object.
      // We push it, but might need a refetch for full consistency later.
      // Or, better, refetch `getPlanesRequest` after success in the component.
      // For now, we don't push to avoid inconsistent data.
      // state.planeList.push(action.payload); // Consider refetching instead.
    },
    createPlaneFailure: (state, action) => { // Reducer for creating plane failure
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
  resetMitraState,
} = mitraSlice.actions;

export default mitraSlice.reducer;