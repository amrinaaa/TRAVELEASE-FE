import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotels: [],
  loadingFetch: false,
  errorFetch: null,

  loadingCreate: false,
  successCreate: false,
  errorCreate: null,
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
} = adminHotelSlice.actions;

export default adminHotelSlice.reducer;
