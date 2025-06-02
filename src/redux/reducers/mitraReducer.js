// // mitraReducer.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   mitraList: [],
//   loadingFetch: false,
//   errorFetch: null,
//   loadingCreate: false,
//   errorCreate: null,
//   createdMitra: null,
//   loadingDelete: false,
//   errorDelete: null,
//   loadingUpdate: false,
//   errorUpdate: null,
//   updatedMitra: null,

//   planeList: [],
//   loadingPlanes: false,
//   errorPlanes: null,
//   loadingDeletePlane: false,
//   errorDeletePlane: null,
//   loadingCreatePlane: false,
//   errorCreatePlane: null,
//   createdPlane: null,

//   planeTypeList: [],
//   loadingPlaneTypes: false,
//   errorPlaneTypes: null,
//   loadingCreatePlaneType: false,
//   errorCreatePlaneType: null,
//   createdPlaneType: null,

//   seatList: [],
//   loadingSeats: false,
//   errorSeats: null,
//   loadingDeleteSeat: false,
//   errorDeleteSeat: null,
//   loadingCreateSeats: false,
//   errorCreateSeats: null,
//   createdSeatsInfo: null,

//   seatCategoryList: [],
//   loadingSeatCategories: false,
//   errorSeatCategories: null,

//   hotelList: [], // State untuk daftar hotel
//   loadingHotels: false, // State loading untuk hotel
//   errorHotels: null, // State error untuk hotel
//   loadingCreateHotel: false,
//   errorCreateHotel: null,
//   createdHotelData: null,
//   loadingUpdateHotel: false,
//   errorUpdateHotel: null,
//   updatedHotelData: null,
//   loadingDeleteHotel: false,
//   errorDeleteHotel: null,

//   locationList: [],
//   loadingLocations: false,
//   errorLocations: null,

//   roomList: [], // State untuk daftar kamar
//   loadingRooms: false, // State loading untuk kamar
//   errorRooms: null, // State error untuk kamar
// };

// const mitraSlice = createSlice({
//   name: "mitra",
//   initialState,
//   reducers: {
//     // --- Mitra/Airline Reducers ---
//     getMitraRequest: (state) => { state.loadingFetch = true; state.errorFetch = null; },
//     getMitraSuccess: (state, action) => { state.loadingFetch = false; state.mitraList = action.payload; },
//     getMitraFailure: (state, action) => { state.loadingFetch = false; state.errorFetch = action.payload; state.mitraList = []; },
//     createMitraRequest: (state) => { state.loadingCreate = true; state.errorCreate = null; state.createdMitra = null; },
//     createMitraSuccess: (state, action) => { state.loadingCreate = false; state.createdMitra = action.payload; state.mitraList.push(action.payload); },
//     createMitraFailure: (state, action) => { state.loadingCreate = false; state.errorCreate = action.payload; },
//     deleteMitraRequest: (state) => { state.loadingDelete = true; state.errorDelete = null; }, 
//     deleteMitraSuccess: (state, action) => { state.loadingDelete = false; state.mitraList = state.mitraList.filter( (mitra) => mitra.id !== action.payload ); }, 
//     deleteMitraFailure: (state, action) => { state.loadingDelete = false; state.errorDelete = action.payload; }, 
//     updateMitraRequest: (state) => { state.loadingUpdate = true; state.errorUpdate = null; state.updatedMitra = null; },
//     updateMitraSuccess: (state, action) => { state.loadingUpdate = false; state.updatedMitra = action.payload; const index = state.mitraList.findIndex( (mitra) => mitra.id === action.payload.id ); if (index !== -1) { state.mitraList[index] = action.payload; } },
//     updateMitraFailure: (state, action) => { state.loadingUpdate = false; state.errorUpdate = action.payload; },

//     // --- Plane, Seat, Seat Category Reducers ---
//     getPlanesRequest: (state) => { state.loadingPlanes = true; state.errorPlanes = null; },
//     getPlanesSuccess: (state, action) => { state.loadingPlanes = false; state.planeList = action.payload; },
//     getPlanesFailure: (state, action) => { state.loadingPlanes = false; state.errorPlanes = action.payload; state.planeList = []; },
//     deletePlaneRequest: (state) => { state.loadingDeletePlane = true; state.errorDeletePlane = null; },
//     deletePlaneSuccess: (state, action) => { state.loadingDeletePlane = false; state.planeList = state.planeList.filter( (plane) => plane.id !== action.payload ); },
//     deletePlaneFailure: (state, action) => { state.loadingDeletePlane = false; state.errorDeletePlane = action.payload; },
//     createPlaneRequest: (state) => { state.loadingCreatePlane = true; state.errorCreatePlane = null; state.createdPlane = null; },
//     createPlaneSuccess: (state, action) => { state.loadingCreatePlane = false; state.createdPlane = action.payload; state.planeList.push(action.payload);},
//     createPlaneFailure: (state, action) => { state.loadingCreatePlane = false; state.errorCreatePlane = action.payload; },
//     getPlaneTypesRequest: (state) => { state.loadingPlaneTypes = true; state.errorPlaneTypes = null; },
//     getPlaneTypesSuccess: (state, action) => { state.loadingPlaneTypes = false; state.planeTypeList = action.payload; },
//     getPlaneTypesFailure: (state, action) => { state.loadingPlaneTypes = false; state.errorPlaneTypes = action.payload; state.planeTypeList = []; },
//     createPlaneTypeRequest: (state) => { state.loadingCreatePlaneType = true; state.errorCreatePlaneType = null; state.createdPlaneType = null; },
//     createPlaneTypeSuccess: (state, action) => { state.loadingCreatePlaneType = false; state.createdPlaneType = action.payload; state.planeTypeList.push(action.payload);},
//     createPlaneTypeFailure: (state, action) => { state.loadingCreatePlaneType = false; state.errorCreatePlaneType = action.payload;},
//     getSeatsRequest: (state) => { state.loadingSeats = true; state.errorSeats = null; },
//     getSeatsSuccess: (state, action) => { state.loadingSeats = false; state.seatList = action.payload; },
//     getSeatsFailure: (state, action) => { state.loadingSeats = false; state.errorSeats = action.payload; state.seatList = []; },
//     deleteSeatRequest: (state) => { state.loadingDeleteSeat = true; state.errorDeleteSeat = null; },
//     deleteSeatSuccess: (state, action) => { state.loadingDeleteSeat = false; const seatIdToDelete = action.payload; state.seatList = state.seatList.map(category => ({ ...category, seats: category.seats ? category.seats.filter(seat => seat.id !== seatIdToDelete) : [], })); },
//     deleteSeatFailure: (state, action) => { state.loadingDeleteSeat = false; state.errorDeleteSeat = action.payload; },
//     createSeatsRequest: (state) => { state.loadingCreateSeats = true; state.errorCreateSeats = null; state.createdSeatsInfo = null; },
//     createSeatsSuccess: (state, action) => { state.loadingCreateSeats = false; const { response, seatCategoryId } = action.payload; state.createdSeatsInfo = response; state.seatList = state.seatList.map(category => { if (category.categoryId === seatCategoryId) { const existingSeats = Array.isArray(category.seats) ? category.seats : []; const newSeats = Array.isArray(response.seats) ? response.seats : []; return { ...category, seats: [...existingSeats, ...newSeats], }; } return category; }); },
//     createSeatsFailure: (state, action) => { state.loadingCreateSeats = false; state.errorCreateSeats = action.payload; },
//     resetCreateSeatsStatus: (state) => { state.loadingCreateSeats = false; state.errorCreateSeats = null; state.createdSeatsInfo = null; },
//     getSeatCategoriesRequest: (state) => { state.loadingSeatCategories = true; state.errorSeatCategories = null; },
//     getSeatCategoriesSuccess: (state, action) => { state.loadingSeatCategories = false; state.seatCategoryList = action.payload; },
//     getSeatCategoriesFailure: (state, action) => { state.loadingSeatCategories = false; state.errorSeatCategories = action.payload; state.seatCategoryList = []; },

//     // --- Hotel Reducers ---
//     // getHotelsRequest: (state) => { state.loadingHotels = true; state.errorHotels = null; }, // Reducer untuk memulai request hotel
//     // getHotelsSuccess: (state, action) => { state.loadingHotels = false; state.hotelList = action.payload; state.errorHotels = null; }, // Reducer jika request hotel sukses
//     // getHotelsFailure: (state, action) => { state.loadingHotels = false; state.errorHotels = action.payload; state.hotelList = []; }, // Reducer jika request hotel gagal
//         getHotelsRequest: (state) => { 
//       console.log("mitraReducer: getHotelsRequest dieksekusi"); // LOG F.1
//       state.loadingHotels = true; state.errorHotels = null; 
//     }, 
//     getHotelsSuccess: (state, action) => { 
//       console.log("mitraReducer: getHotelsSuccess dieksekusi, payload length:", action.payload?.length); // LOG F.2
//       state.loadingHotels = false; state.hotelList = action.payload; state.errorHotels = null; 
//     }, 
//     getHotelsFailure: (state, action) => { 
//       console.log("mitraReducer: getHotelsFailure dieksekusi, error:", action.payload); // LOG F.3
//       state.loadingHotels = false; state.errorHotels = action.payload; state.hotelList = []; 
//     },
//     createHotelRequest: (state) => { state.loadingCreateHotel = true; state.errorCreateHotel = null; state.createdHotelData = null; },
//     createHotelSuccess: (state, action) => { state.loadingCreateHotel = false; state.createdHotelData = action.payload; state.errorCreateHotel = null; state.hotelList.push(action.payload); },
//     createHotelFailure: (state, action) => { state.loadingCreateHotel = false; state.errorCreateHotel = action.payload; state.createdHotelData = null; },
//     updateHotelRequest: (state) => { state.loadingUpdateHotel = true; state.errorUpdateHotel = null; state.updatedHotelData = null; },
//     updateHotelSuccess: (state, action) => { state.loadingUpdateHotel = false; state.updatedHotelData = action.payload; state.errorUpdateHotel = null; const index = state.hotelList.findIndex( (hotel) => hotel.id === action.payload.id ); if (index !== -1) { state.hotelList[index] = action.payload; } },
//     updateHotelFailure: (state, action) => { state.loadingUpdateHotel = false; state.errorUpdateHotel = action.payload; state.updatedHotelData = null; },
//     deleteHotelRequest: (state) => { state.loadingDeleteHotel = true; state.errorDeleteHotel = null; },
//     deleteHotelSuccess: (state, action) => { state.loadingDeleteHotel = false; state.errorDeleteHotel = null; state.hotelList = state.hotelList.filter( (hotel) => hotel.id !== action.payload ); },
//     deleteHotelFailure: (state, action) => { state.loadingDeleteHotel = false; state.errorDeleteHotel = action.payload; },
//     clearDeleteHotelErrorRequest: (state) => { state.errorDeleteHotel = null; },

//     // --- Location Reducers ---
//     getLocationsRequest: (state) => { state.loadingLocations = true; state.errorLocations = null; },
//     getLocationsSuccess: (state, action) => { state.loadingLocations = false; state.locationList = action.payload; state.errorLocations = null; },
//     getLocationsFailure: (state, action) => { state.loadingLocations = false; state.errorLocations = action.payload; state.locationList = []; },

//     // --- Room Reducers ---
//     getRoomsRequest: (state) => { state.loadingRooms = true; state.errorRooms = null; state.roomList = []; /* Membersihkan roomList sebelumnya */ }, // Reducer untuk memulai request kamar
//     getRoomsSuccess: (state, action) => { state.loadingRooms = false; state.roomList = action.payload; state.errorRooms = null; }, // Reducer jika request kamar sukses
//     getRoomsFailure: (state, action) => { state.loadingRooms = false; state.errorRooms = action.payload; state.roomList = []; }, // Reducer jika request kamar gagal

//     resetMitraState: (state) => {
//       return initialState;
//     },
//   },
// });

// export const {
//   getMitraRequest, getMitraSuccess, getMitraFailure,
//   createMitraRequest, createMitraSuccess, createMitraFailure,
//   deleteMitraRequest, deleteMitraSuccess, deleteMitraFailure,
//   updateMitraRequest, updateMitraSuccess, updateMitraFailure,
//   getPlanesRequest, getPlanesSuccess, getPlanesFailure,
//   deletePlaneRequest, deletePlaneSuccess, deletePlaneFailure,
//   createPlaneRequest, createPlaneSuccess, createPlaneFailure,
//   getPlaneTypesRequest, getPlaneTypesSuccess, getPlaneTypesFailure,
//   createPlaneTypeRequest, createPlaneTypeSuccess, createPlaneTypeFailure,
//   getSeatsRequest, getSeatsSuccess, getSeatsFailure,
//   deleteSeatRequest, deleteSeatSuccess, deleteSeatFailure,
//   createSeatsRequest, createSeatsSuccess, createSeatsFailure,
//   resetCreateSeatsStatus,
//   getSeatCategoriesRequest, getSeatCategoriesSuccess, getSeatCategoriesFailure,
//   getHotelsRequest, getHotelsSuccess, getHotelsFailure, // Ekspor action hotel
//   createHotelRequest, createHotelSuccess, createHotelFailure,
//   updateHotelRequest, updateHotelSuccess, updateHotelFailure,
//   deleteHotelRequest, deleteHotelSuccess, deleteHotelFailure,
//   clearDeleteHotelErrorRequest,
//   getLocationsRequest, getLocationsSuccess, getLocationsFailure,
//   getRoomsRequest, getRoomsSuccess, getRoomsFailure, // Ekspor action kamar
//   resetMitraState,
// } = mitraSlice.actions;

// export default mitraSlice.reducer;

// mitraReducer.js
// mitraReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mitraList: [],
  loadingFetch: false,
  errorFetch: null,
  loadingCreate: false,
  errorCreate: null,
  createdMitra: null,
  loadingDelete: false, // Untuk delete airline
  errorDelete: null,    // Untuk delete airline
  loadingUpdate: false,
  errorUpdate: null,
  updatedMitra: null,

  planeList: [],
  loadingPlanes: false,
  errorPlanes: null,
  loadingDeletePlane: false,
  errorDeletePlane: null,
  loadingCreatePlane: false,
  errorCreatePlane: null,
  createdPlane: null,

  planeTypeList: [],
  loadingPlaneTypes: false,
  errorPlaneTypes: null,
  loadingCreatePlaneType: false,
  errorCreatePlaneType: null,
  createdPlaneType: null,

  seatList: [],
  loadingSeats: false,
  errorSeats: null,
  loadingDeleteSeat: false,
  errorDeleteSeat: null,
  loadingCreateSeats: false,
  errorCreateSeats: null,
  createdSeatsInfo: null,

  seatCategoryList: [],
  loadingSeatCategories: false,
  errorSeatCategories: null,

  loadingCreateFlight: false,
  errorCreateFlight: null,
  createdFlight: null,
  airportList: [],
  loadingAirports: false,
  errorAirports: null,

  hotelList: [],
  loadingHotels: false,
  errorHotels: null,
  loadingCreateHotel: false,
  errorCreateHotel: null,
  createdHotelData: null,
  loadingUpdateHotel: false,
  errorUpdateHotel: null,
  updatedHotelData: null,
  loadingDeleteHotel: false, // Untuk delete hotel
  errorDeleteHotel: null,    // Untuk delete hotel

  locationList: [],
  loadingLocations: false,
  errorLocations: null,

  roomList: [],
  loadingRooms: false,
  errorRooms: null,
  loadingUpdateRoomStatus: {},
  errorUpdateRoomStatus: {},

  // New states for Room Types
  roomTypeList: [],
  loadingRoomTypes: false,
  errorRoomTypes: null,

  // New states for Creating Room
  loadingCreateRoom: false,
  errorCreateRoom: null,
  createdRoomData: null,
}; //

const mitraSlice = createSlice({
  name: "mitra",
  initialState,
  reducers: {
    // --- Mitra/Airline Reducers ---
    getMitraRequest: (state) => { state.loadingFetch = true; state.errorFetch = null; },
    getMitraSuccess: (state, action) => { state.loadingFetch = false; state.mitraList = action.payload; },
    getMitraFailure: (state, action) => { state.loadingFetch = false; state.errorFetch = action.payload; state.mitraList = []; },
    createMitraRequest: (state) => { state.loadingCreate = true; state.errorCreate = null; state.createdMitra = null; },
    createMitraSuccess: (state, action) => { state.loadingCreate = false; state.createdMitra = action.payload; state.mitraList.push(action.payload); },
    createMitraFailure: (state, action) => { state.loadingCreate = false; state.errorCreate = action.payload; },
    deleteMitraRequest: (state) => { state.loadingDelete = true; state.errorDelete = null; },
    deleteMitraSuccess: (state, action) => { state.loadingDelete = false; state.mitraList = state.mitraList.filter( (mitra) => mitra.id !== action.payload ); },
    deleteMitraFailure: (state, action) => { state.loadingDelete = false; state.errorDelete = action.payload; },
    updateMitraRequest: (state) => { state.loadingUpdate = true; state.errorUpdate = null; state.updatedMitra = null; },
    updateMitraSuccess: (state, action) => { state.loadingUpdate = false; state.updatedMitra = action.payload; const index = state.mitraList.findIndex( (mitra) => mitra.id === action.payload.id ); if (index !== -1) { state.mitraList[index] = action.payload; } },
    updateMitraFailure: (state, action) => { state.loadingUpdate = false; state.errorUpdate = action.payload; },

    // --- Plane, Seat, Seat Category Reducers ---
    getPlanesRequest: (state) => { state.loadingPlanes = true; state.errorPlanes = null; },
    getPlanesSuccess: (state, action) => { state.loadingPlanes = false; state.planeList = action.payload; },
    getPlanesFailure: (state, action) => { state.loadingPlanes = false; state.errorPlanes = action.payload; state.planeList = []; },
    deletePlaneRequest: (state) => { state.loadingDeletePlane = true; state.errorDeletePlane = null; },
    deletePlaneSuccess: (state, action) => { state.loadingDeletePlane = false; state.planeList = state.planeList.filter( (plane) => plane.id !== action.payload ); },
    deletePlaneFailure: (state, action) => { state.loadingDeletePlane = false; state.errorDeletePlane = action.payload; },
    createPlaneRequest: (state) => { state.loadingCreatePlane = true; state.errorCreatePlane = null; state.createdPlane = null; },
    createPlaneSuccess: (state, action) => { state.loadingCreatePlane = false; state.createdPlane = action.payload; state.planeList.push(action.payload);},
    createPlaneFailure: (state, action) => { state.loadingCreatePlane = false; state.errorCreatePlane = action.payload; },
    getPlaneTypesRequest: (state) => { state.loadingPlaneTypes = true; state.errorPlaneTypes = null; },
    getPlaneTypesSuccess: (state, action) => { state.loadingPlaneTypes = false; state.planeTypeList = action.payload; },
    getPlaneTypesFailure: (state, action) => { state.loadingPlaneTypes = false; state.errorPlaneTypes = action.payload; state.planeTypeList = []; },
    createPlaneTypeRequest: (state) => { state.loadingCreatePlaneType = true; state.errorCreatePlaneType = null; state.createdPlaneType = null; },
    createPlaneTypeSuccess: (state, action) => { state.loadingCreatePlaneType = false; state.createdPlaneType = action.payload; state.planeTypeList.push(action.payload);},
    createPlaneTypeFailure: (state, action) => { state.loadingCreatePlaneType = false; state.errorCreatePlaneType = action.payload;},
    getSeatsRequest: (state) => { state.loadingSeats = true; state.errorSeats = null; },
    getSeatsSuccess: (state, action) => { state.loadingSeats = false; state.seatList = action.payload; },
    getSeatsFailure: (state, action) => { state.loadingSeats = false; state.errorSeats = action.payload; state.seatList = []; },
    deleteSeatRequest: (state) => { state.loadingDeleteSeat = true; state.errorDeleteSeat = null; },
    deleteSeatSuccess: (state, action) => { state.loadingDeleteSeat = false; const seatIdToDelete = action.payload; state.seatList = state.seatList.map(category => ({ ...category, seats: category.seats ? category.seats.filter(seat => seat.id !== seatIdToDelete) : [], })); },
    deleteSeatFailure: (state, action) => { state.loadingDeleteSeat = false; state.errorDeleteSeat = action.payload; },
    createSeatsRequest: (state) => { state.loadingCreateSeats = true; state.errorCreateSeats = null; state.createdSeatsInfo = null; },
    createSeatsSuccess: (state, action) => { state.loadingCreateSeats = false; const { response, seatCategoryId } = action.payload; state.createdSeatsInfo = response; state.seatList = state.seatList.map(category => { if (category.categoryId === seatCategoryId) { const existingSeats = Array.isArray(category.seats) ? category.seats : []; const newSeats = Array.isArray(response.seats) ? response.seats : []; return { ...category, seats: [...existingSeats, ...newSeats], }; } return category; }); },
    createSeatsFailure: (state, action) => { state.loadingCreateSeats = false; state.errorCreateSeats = action.payload; },
    resetCreateSeatsStatus: (state) => { state.loadingCreateSeats = false; state.errorCreateSeats = null; state.createdSeatsInfo = null; },
    getSeatCategoriesRequest: (state) => { state.loadingSeatCategories = true; state.errorSeatCategories = null; },
    getSeatCategoriesSuccess: (state, action) => { state.loadingSeatCategories = false; state.seatCategoryList = action.payload; },
    getSeatCategoriesFailure: (state, action) => { state.loadingSeatCategories = false; state.errorSeatCategories = action.payload; state.seatCategoryList = []; },
    createFlightRequest: (state) => {
      state.loadingCreateFlight = true;
      state.errorCreateFlight = null;
      state.createdFlight = null;
    },
    createFlightSuccess: (state, action) => {
      state.loadingCreateFlight = false;
      state.createdFlight = action.payload;
      state.errorCreateFlight = null;
    },
    createFlightFailure: (state, action) => {
      state.loadingCreateFlight = false;
      state.errorCreateFlight = action.payload;
      state.createdFlight = null;
    },
    resetCreateFlightStatus: (state) => {
        state.loadingCreateFlight = false;
        state.errorCreateFlight = null;
        state.createdFlight = null;
    },

    // --- Airport Reducers ---
    getAirportsRequest: (state) => {
      state.loadingAirports = true;
      state.errorAirports = null;
    },
    getAirportsSuccess: (state, action) => {
      state.loadingAirports = false;
      state.airportList = action.payload;
      state.errorAirports = null;
    },
    getAirportsFailure: (state, action) => {
      state.loadingAirports = false;
      state.errorAirports = action.payload;
      state.airportList = [];
    },

    // --- Hotel Reducers ---
    getHotelsRequest: (state) => {
      state.loadingHotels = true; state.errorHotels = null;
    },
    getHotelsSuccess: (state, action) => {
      state.loadingHotels = false; state.hotelList = action.payload; state.errorHotels = null;
    },
    getHotelsFailure: (state, action) => {
      state.loadingHotels = false; state.errorHotels = action.payload; state.hotelList = [];
    },
    createHotelRequest: (state) => { state.loadingCreateHotel = true; state.errorCreateHotel = null; state.createdHotelData = null; },
    createHotelSuccess: (state, action) => { state.loadingCreateHotel = false; state.createdHotelData = action.payload; state.errorCreateHotel = null; state.hotelList.push(action.payload); },
    createHotelFailure: (state, action) => { state.loadingCreateHotel = false; state.errorCreateHotel = action.payload; state.createdHotelData = null; },
    updateHotelRequest: (state) => { state.loadingUpdateHotel = true; state.errorUpdateHotel = null; state.updatedHotelData = null; },
    updateHotelSuccess: (state, action) => { state.loadingUpdateHotel = false; state.updatedHotelData = action.payload; state.errorUpdateHotel = null; const index = state.hotelList.findIndex( (hotel) => hotel.id === action.payload.id ); if (index !== -1) { state.hotelList[index] = action.payload; } },
    updateHotelFailure: (state, action) => { state.loadingUpdateHotel = false; state.errorUpdateHotel = action.payload; state.updatedHotelData = null; },
    deleteHotelRequest: (state) => { state.loadingDeleteHotel = true; state.errorDeleteHotel = null; },
    deleteHotelSuccess: (state, action) => { state.loadingDeleteHotel = false; state.errorDeleteHotel = null; state.hotelList = state.hotelList.filter( (hotel) => hotel.id !== action.payload ); },
    deleteHotelFailure: (state, action) => { state.loadingDeleteHotel = false; state.errorDeleteHotel = action.payload; },
    clearDeleteHotelErrorRequest: (state) => { state.errorDeleteHotel = null; },

    // --- Location Reducers ---
    getLocationsRequest: (state) => { state.loadingLocations = true; state.errorLocations = null; },
    getLocationsSuccess: (state, action) => { state.loadingLocations = false; state.locationList = action.payload; state.errorLocations = null; },
    getLocationsFailure: (state, action) => { state.loadingLocations = false; state.errorLocations = action.payload; state.locationList = []; },

    // --- Room Reducers (Existing: Fetch, Update Status) ---
    getRoomsRequest: (state) => {
      state.loadingRooms = true; state.errorRooms = null; state.roomList = [];
    },
    getRoomsSuccess: (state, action) => {
      state.loadingRooms = false; state.roomList = action.payload; state.errorRooms = null;
    },
    getRoomsFailure: (state, action) => {
      state.loadingRooms = false; state.errorRooms = action.payload; state.roomList = [];
    },
    updateRoomStatusRequest: (state, action) => {
      const { roomId } = action.payload;
      state.loadingUpdateRoomStatus[roomId] = true;
      state.errorUpdateRoomStatus[roomId] = null;
    },
    updateRoomStatusSuccess: (state, action) => {
      const updatedRoom = action.payload;
      if (updatedRoom && updatedRoom.id) {
        state.loadingUpdateRoomStatus[updatedRoom.id] = false;
        state.errorUpdateRoomStatus[updatedRoom.id] = null;
        const index = state.roomList.findIndex(room => room.id === updatedRoom.id);
        if (index !== -1) {
          state.roomList[index] = { ...state.roomList[index], ...updatedRoom };
        }
      }
    },
    updateRoomStatusFailure: (state, action) => {
      const { roomId, error } = action.payload;
      state.loadingUpdateRoomStatus[roomId] = false;
      state.errorUpdateRoomStatus[roomId] = error;
    },

    // --- Room Type Reducers (NEW) ---
    getRoomTypesRequest: (state) => {
      state.loadingRoomTypes = true;
      state.errorRoomTypes = null;
      state.roomTypeList = [];
    }, //
    getRoomTypesSuccess: (state, action) => {
      state.loadingRoomTypes = false;
      state.roomTypeList = action.payload;
      state.errorRoomTypes = null;
    }, //
    getRoomTypesFailure: (state, action) => {
      state.loadingRoomTypes = false;
      state.errorRoomTypes = action.payload;
      state.roomTypeList = [];
    }, //

    // --- Room (Create) Reducers (NEW) ---
    createRoomRequest: (state) => {
      state.loadingCreateRoom = true;
      state.errorCreateRoom = null;
      state.createdRoomData = null;
    }, //
    createRoomSuccess: (state, action) => {
      state.loadingCreateRoom = false;
      state.createdRoomData = action.payload;
      state.errorCreateRoom = null;
      // Optionally, add the new room to the roomList if it's being displayed immediately
      if (state.roomList && Array.isArray(state.roomList)) {
         state.roomList.push(action.payload);
      } else {
         state.roomList = [action.payload]; // Initialize if not an array or doesn't exist
      }
    }, //
    createRoomFailure: (state, action) => {
      state.loadingCreateRoom = false;
      state.errorCreateRoom = action.payload;
      state.createdRoomData = null;
    }, //
    resetCreateRoomStatus: (state) => {
        state.loadingCreateRoom = false;
        state.errorCreateRoom = null;
        state.createdRoomData = null;
    }, //

    resetMitraState: (state) => {
      return initialState;
    },
  }, //
});

export const {
  getMitraRequest, getMitraSuccess, getMitraFailure,
  createMitraRequest, createMitraSuccess, createMitraFailure,
  deleteMitraRequest, deleteMitraSuccess, deleteMitraFailure,
  updateMitraRequest, updateMitraSuccess, updateMitraFailure,
  getPlanesRequest, getPlanesSuccess, getPlanesFailure,
  deletePlaneRequest, deletePlaneSuccess, deletePlaneFailure,
  createPlaneRequest, createPlaneSuccess, createPlaneFailure,
  getPlaneTypesRequest, getPlaneTypesSuccess, getPlaneTypesFailure,
  createPlaneTypeRequest, createPlaneTypeSuccess, createPlaneTypeFailure,
  getSeatsRequest, getSeatsSuccess, getSeatsFailure,
  deleteSeatRequest, deleteSeatSuccess, deleteSeatFailure,
  createSeatsRequest, createSeatsSuccess, createSeatsFailure,
  resetCreateSeatsStatus,
  getSeatCategoriesRequest, getSeatCategoriesSuccess, getSeatCategoriesFailure,
  createFlightRequest,
  createFlightSuccess,
  createFlightFailure,
  resetCreateFlightStatus,
  getAirportsRequest,
  getAirportsSuccess,
  getAirportsFailure,
  getHotelsRequest, getHotelsSuccess, getHotelsFailure,
  createHotelRequest, createHotelSuccess, createHotelFailure,
  updateHotelRequest, updateHotelSuccess, updateHotelFailure,
  deleteHotelRequest, deleteHotelSuccess, deleteHotelFailure,
  clearDeleteHotelErrorRequest,
  getLocationsRequest, getLocationsSuccess, getLocationsFailure,
  getRoomsRequest, getRoomsSuccess, getRoomsFailure,
  updateRoomStatusRequest, updateRoomStatusSuccess, updateRoomStatusFailure,
  // Export new room and room type actions
  getRoomTypesRequest, getRoomTypesSuccess, getRoomTypesFailure,
  createRoomRequest, createRoomSuccess, createRoomFailure, resetCreateRoomStatus,
  resetMitraState,
} = mitraSlice.actions; //

export default mitraSlice.reducer; //