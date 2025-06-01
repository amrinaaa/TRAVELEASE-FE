import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotelRooms: [],
  loading: false,
  error: null,

  currentRoomDetails: null,
  loadingRoomDetails: false,
  errorRoomDetails: null, 

  userBalance: null,
  loadingUserBalance: false,
  errorUserBalance: null,
};

const userHotelSlice = createSlice({
  name: "userHotel", 
  initialState,
  reducers: {
    getHotelRoomsRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.hotelRooms = [];
    },
    getHotelRoomsSuccess: (state, action) => {
      state.loading = false;
      state.hotelRooms = action.payload;
      state.error = null;
    },
    getHotelRoomsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.hotelRooms = [];
    },

    getRoomDetailRequest: (state) => {
      state.loadingRoomDetails = true;
      state.errorRoomDetails = null;
      state.currentRoomDetails = null;
    },
    getRoomDetailSuccess: (state, action) => {
      state.loadingRoomDetails = false;
      state.currentRoomDetails = action.payload;
      state.errorRoomDetails = null;
    },
    getRoomDetailFailure: (state, action) => {
      state.loadingRoomDetails = false;
      state.errorRoomDetails = action.payload;
      state.currentRoomDetails = null;
    },

    getUserBalanceRequest: (state) => {
      state.loadingUserBalance = true;
      state.errorUserBalance = null;
      state.userBalance = null;
    },
    getUserBalanceSuccess: (state, action) => {
      state.loadingUserBalance = false;
      state.userBalance = action.payload; 
      state.errorUserBalance = null;
    },
    getUserBalanceFailure: (state, action) => {
      state.loadingUserBalance = false;
      state.errorUserBalance = action.payload;
      state.userBalance = null;
    },

    resetUserHotelState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  getHotelRoomsRequest,
  getHotelRoomsSuccess,
  getHotelRoomsFailure,
  getRoomDetailRequest,
  getRoomDetailSuccess,
  getRoomDetailFailure,
  getUserBalanceRequest, 
  getUserBalanceSuccess, 
  getUserBalanceFailure,
  resetUserHotelState,
} = userHotelSlice.actions;

export default userHotelSlice.reducer;