import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotels: [],
  loadingFetch: false,
  errorFetch: null,

  loadingCreate: false,
  successCreate: false,
  errorCreate: null,

  loadingDelete: false,
  successDelete: false,
  errorDelete: null,
};

const adminHotelSlice = createSlice({
  name: "adminHotel",
  initialState,
  reducers: {
    getHotelsRequest: (state) => {
      state.loadingFetch = true;
      state.errorFetch = null;
    },
    getHotelsSuccess: (state, action) => {
      state.loadingFetch = false;
      state.hotels = action.payload;
      state.errorFetch = null;
    },
    getHotelsFailure: (state, action) => {
      state.loadingFetch = false;
      state.hotels = [];
      state.errorFetch = action.payload;
    },
    resetHotelState: (state) => {
      Object.assign(state, initialState);
    },
    
    // Create Hotel Partner
    createHotelRequest: (state) => {
        state.loadingCreate = true;
        state.errorCreate = null;
        state.successCreate = false;
      },
      createHotelSuccess: (state, action) => {
        state.loadingCreate = false;
        state.successCreate = true;
        state.errorCreate = null;
        // Optional: kita bisa langsung push data baru ke list hotels
        state.hotels.push(action.payload);
      },
      createHotelFailure: (state, action) => {
        state.loadingCreate = false;
        state.successCreate = false;
        state.errorCreate = action.payload;
      },
  
      resetHotelState: (state) => {
        Object.assign(state, initialState);
      },
      resetCreateHotelState: (state) => {
        // Khusus reset proses create saja
        state.loadingCreate = false;
        state.successCreate = false;
        state.errorCreate = null;
      },

     // Delete Hotel Partner
     deleteHotelRequest: (state) => {
        state.loadingDelete = true;
        state.errorDelete = null;
        state.successDelete = false;
      },
      deleteHotelSuccess: (state, action) => {
        state.loadingDelete = false;
        state.successDelete = true;
        state.hotels = state.hotels.filter(hotel => hotel.id !== action.payload); // Remove the deleted hotel by ID
        state.errorDelete = null;
      },
      deleteHotelFailure: (state, action) => {
        state.loadingDelete = false;
        state.successDelete = false;
        state.errorDelete = action.payload;
      },
  }
});

// Export actions
export const {
  getHotelsRequest,
  getHotelsSuccess,
  getHotelsFailure,
  resetHotelState,
  createHotelRequest,
  createHotelSuccess,
  createHotelFailure,
  resetCreateHotelState,
  deleteHotelRequest,
  deleteHotelSuccess,
  deleteHotelFailure
} = adminHotelSlice.actions;

export default adminHotelSlice.reducer;
