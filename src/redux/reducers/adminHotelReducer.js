import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotels: [],
  loadingFetch: false,
  errorFetch: null,
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
    }
  }
});

// Export actions
export const {
  getHotelsRequest,
  getHotelsSuccess,
  getHotelsFailure,
  resetHotelState
} = adminHotelSlice.actions;

export default adminHotelSlice.reducer;
