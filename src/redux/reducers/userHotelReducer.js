import { createSlice } from "@reduxjs/toolkit";

// Memperbarui initialState untuk mencakup detail ruangan tunggal
const initialState = {
  hotelRooms: [], // Menyimpan array ruangan untuk hotel tertentu
  loading: false,    // Status loading untuk daftar hotelRooms
  error: null,       // Status error untuk daftar hotelRooms

  currentRoomDetails: null, // Menyimpan detail dari satu ruangan yang diambil
  loadingRoomDetails: false, // Status loading untuk mengambil detail satu ruangan
  errorRoomDetails: null,    // Status error untuk mengambil detail satu ruangan
};

const userHotelSlice = createSlice({
  name: "userHotel",
  initialState,
  reducers: {
    // Reducer untuk mengambil daftar ruangan hotel
    getHotelRoomsRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.hotelRooms = []; // Bersihkan ruangan sebelumnya pada request baru
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

    // Reducer baru untuk mengambil detail satu ruangan
    getRoomDetailRequest: (state) => {
      state.loadingRoomDetails = true;
      state.errorRoomDetails = null;
      state.currentRoomDetails = null; // Bersihkan detail ruangan sebelumnya
    },
    getRoomDetailSuccess: (state, action) => {
      state.loadingRoomDetails = false;
      state.currentRoomDetails = action.payload; // Payload adalah objek detail ruangan
      state.errorRoomDetails = null;
    },
    getRoomDetailFailure: (state, action) => {
      state.loadingRoomDetails = false;
      state.errorRoomDetails = action.payload;
      state.currentRoomDetails = null;
    },

    // Mereset semua state dalam slice ini ke initialState
    resetUserHotelState: (state) => {
      Object.assign(state, initialState); // initialState sekarang mencakup field baru
    },
  },
});

// Mengekspor semua action creator, termasuk yang baru
export const {
  getHotelRoomsRequest,
  getHotelRoomsSuccess,
  getHotelRoomsFailure,
  getRoomDetailRequest,  // Action creator baru
  getRoomDetailSuccess, // Action creator baru
  getRoomDetailFailure, // Action creator baru
  resetUserHotelState,
} = userHotelSlice.actions;

export default userHotelSlice.reducer;