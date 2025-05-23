// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   mitraList: [],
//   loadingFetch: false,
//   errorFetch: null,
//   loadingCreate: false, // New state for create operation
//   errorCreate: null,   // New state for create operation
//   createdMitra: null,  // To store the newly created mitra
// };

// const mitraSlice = createSlice({
//   name: "mitra",
//   initialState,
//   reducers: {
//     getMitraRequest: (state) => {
//       state.loadingFetch = true;
//       state.errorFetch = null;
//     },
//     getMitraSuccess: (state, action) => {
//       state.loadingFetch = false;
//       state.mitraList = action.payload;
//       state.errorFetch = null;
//     },
//     getMitraFailure: (state, action) => {
//       state.loadingFetch = false;
//       state.errorFetch = action.payload;
//       state.mitraList = [];
//     },
//     createMitraRequest: (state) => { // New reducer for create request
//       state.loadingCreate = true;
//       state.errorCreate = null;
//       state.createdMitra = null;
//     },
//     createMitraSuccess: (state, action) => { // New reducer for create success
//       state.loadingCreate = false;
//       state.createdMitra = action.payload;
//       state.errorCreate = null;
//       state.mitraList.push(action.payload); // Optionally add the new mitra to the list
//     },
//     createMitraFailure: (state, action) => { // New reducer for create failure
//       state.loadingCreate = false;
//       state.errorCreate = action.payload;
//       state.createdMitra = null;
//     },
//     resetMitraState: (state) => {
//       Object.assign(state, initialState);
//     },
//   },
// });

// export const {
//   getMitraRequest,
//   getMitraSuccess,
//   getMitraFailure,
//   createMitraRequest,
//   createMitraSuccess,
//   createMitraFailure,
//   resetMitraState,
// } = mitraSlice.actions;

// export default mitraSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mitraList: [],
  loadingFetch: false,
  errorFetch: null,
  loadingCreate: false,
  errorCreate: null,
  createdMitra: null,
  loadingDelete: false, // New state for delete operation
  errorDelete: null,   // New state for delete operation
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
    deleteMitraRequest: (state) => { // New reducer for delete request
      state.loadingDelete = true;
      state.errorDelete = null;
    },
    deleteMitraSuccess: (state, action) => { // New reducer for delete success
      state.loadingDelete = false;
      state.mitraList = state.mitraList.filter(
        (mitra) => mitra.id !== action.payload
      ); // Remove the deleted item from the list
      state.errorDelete = null;
    },
    deleteMitraFailure: (state, action) => { // New reducer for delete failure
      state.loadingDelete = false;
      state.errorDelete = action.payload;
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
  resetMitraState,
} = mitraSlice.actions;

export default mitraSlice.reducer;