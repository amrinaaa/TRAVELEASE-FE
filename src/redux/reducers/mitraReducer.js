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
  planeList: [], // New state for planes list
  loadingPlanes: false, // New state for loading planes
  errorPlanes: null,   // New state for planes error
};

const mitraSlice = createSlice({
  name: "mitra",
  initialState,
  reducers: {
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
    // Reducers for getting planes
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
  resetMitraState,
} = mitraSlice.actions;

export default mitraSlice.reducer;