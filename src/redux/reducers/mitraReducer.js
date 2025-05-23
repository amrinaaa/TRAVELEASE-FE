// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   mitraList: [],
//   loadingFetch: false,
//   errorFetch: null,
//   loadingCreate: false,
//   errorCreate: null,
//   createdMitra: null,
//   loadingDelete: false, // New state for delete operation
//   errorDelete: null,   // New state for delete operation
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
//     createMitraRequest: (state) => {
//       state.loadingCreate = true;
//       state.errorCreate = null;
//       state.createdMitra = null;
//     },
//     createMitraSuccess: (state, action) => {
//       state.loadingCreate = false;
//       state.createdMitra = action.payload;
//       state.errorCreate = null;
//       state.mitraList.push(action.payload);
//     },
//     createMitraFailure: (state, action) => {
//       state.loadingCreate = false;
//       state.errorCreate = action.payload;
//       state.createdMitra = null;
//     },
//     deleteMitraRequest: (state) => { // New reducer for delete request
//       state.loadingDelete = true;
//       state.errorDelete = null;
//     },
//     deleteMitraSuccess: (state, action) => { // New reducer for delete success
//       state.loadingDelete = false;
//       state.mitraList = state.mitraList.filter(
//         (mitra) => mitra.id !== action.payload
//       ); // Remove the deleted item from the list
//       state.errorDelete = null;
//     },
//     deleteMitraFailure: (state, action) => { // New reducer for delete failure
//       state.loadingDelete = false;
//       state.errorDelete = action.payload;
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
//   deleteMitraRequest,
//   deleteMitraSuccess,
//   deleteMitraFailure,
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
  loadingDelete: false,
  errorDelete: null,
  loadingUpdate: false, // New state for update operation
  errorUpdate: null,   // New state for update operation
  updatedMitra: null,  // To store the newly updated mitra
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
    updateMitraRequest: (state) => { // New reducer for update request
      state.loadingUpdate = true;
      state.errorUpdate = null;
      state.updatedMitra = null;
    },
    updateMitraSuccess: (state, action) => { // New reducer for update success
      state.loadingUpdate = false;
      state.updatedMitra = action.payload;
      state.errorUpdate = null;
      // Find the updated mitra in the list and replace it
      const index = state.mitraList.findIndex(
        (mitra) => mitra.id === action.payload.id
      );
      if (index !== -1) {
        state.mitraList[index] = action.payload;
      }
    },
    updateMitraFailure: (state, action) => { // New reducer for update failure
      state.loadingUpdate = false;
      state.errorUpdate = action.payload;
      state.updatedMitra = null;
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
  resetMitraState,
} = mitraSlice.actions;

export default mitraSlice.reducer;