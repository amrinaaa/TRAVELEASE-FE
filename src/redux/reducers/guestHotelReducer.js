import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotels: [],
  loading: false,
  error: null,
};

const guestHotelSlice = createSlice({
  name: "guestHotel",
  initialState,
  reducers: {
    getGuestHotelsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getGuestHotelsSuccess: (state, action) => {
      state.loading = false;
      state.hotels = action.payload;
      state.error = null;
    },
    getGuestHotelsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.hotels = [];
    },
    resetGuestHotelState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  getGuestHotelsRequest,
  getGuestHotelsSuccess,
  getGuestHotelsFailure,
  resetGuestHotelState,
} = guestHotelSlice.actions;

export default guestHotelSlice.reducer;