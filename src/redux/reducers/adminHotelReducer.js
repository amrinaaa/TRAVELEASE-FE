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

  loadingEdit: false,
  successEdit: false,
  errorEdit: null,
  editedHotel: null, // Store the edited hotel data

  hotels: [],
  hotelDetail: null,  // Store untuk hotel detail yang diambil
  loadingFetch: false,
  errorFetch: null,

  loadingUpdateAmount: false,
  errorUpdateAmount: null,
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

      // Edit Hotel Partner (Update Name and Email)
      editHotelRequest: (state) => {
        state.loadingEdit = true;
        state.errorEdit = null;
        state.successEdit = false;
      },
      editHotelSuccess: (state, action) => {
        state.loadingEdit = false;
        state.successEdit = true;
        state.errorEdit = null;
        state.editedHotel = action.payload; // Update the edited hotel data
        // Optionally update the hotel list with the edited data
        const index = state.hotels.findIndex(hotel => hotel.id === action.payload.id);
        if (index !== -1) {
          state.hotels[index] = action.payload;
        }
      },
      editHotelFailure: (state, action) => {
        state.loadingEdit = false;
        state.successEdit = false;
        state.errorEdit = action.payload;
      },

      getHotelDetailRequest: (state) => {
        state.loadingFetch = true;
        state.errorFetch = null;
      },
      getHotelDetailSuccess: (state, action) => {
        state.loadingFetch = false;
        state.hotelDetail = action.payload; // Simpan hotel detail yang didapat
        state.errorFetch = null;
      },
      getHotelDetailFailure: (state, action) => {
        state.loadingFetch = false;
        state.hotelDetail = null;
        state.errorFetch = action.payload;
      },
      // UPDATE_AMOUNT_REQUEST: (state) => {
      //   state.loadingUpdateAmount = true;
      //   state.errorUpdateAmount = null;
      // },
      // UPDATE_AMOUNT_SUCCESS: (state, action) => {
      //   state.loadingUpdateAmount = false;
      //   if (state.currentUser) {
      //     state.currentUser.currentAmount += action.payload.amount;
      //   }
      //   state.errorUpdateAmount = null;
      // },
      // UPDATE_AMOUNT_FAILURE: (state, action) => {
      //   state.loadingUpdateAmount = false;
      //   state.errorUpdateAmount = action.payload;
      // },
            UPDATE_AMOUNT_REQUEST: (state) => {
        state.loadingUpdateAmount = true;
        state.errorUpdateAmount = null;
      },
      UPDATE_AMOUNT_SUCCESS: (state, action) => {
        state.loadingUpdateAmount = false;
        if (state.currentUser) {
          state.currentUser.currentAmount += action.payload.amount;
        }
        state.errorUpdateAmount = null;
      },
      UPDATE_AMOUNT_FAILURE: (state, action) => {
        state.loadingUpdateAmount = false;
        state.errorUpdateAmount = action.payload;
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
  deleteHotelFailure,
  editHotelRequest,
  editHotelSuccess,
  editHotelFailure,
  getHotelDetailRequest,
  getHotelDetailSuccess,
  getHotelDetailFailure,
  UPDATE_AMOUNT_REQUEST,
  UPDATE_AMOUNT_SUCCESS,
  UPDATE_AMOUNT_FAILURE,
  
} = adminHotelSlice.actions;

export default adminHotelSlice.reducer;
