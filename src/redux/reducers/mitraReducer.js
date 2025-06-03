// // mitraReducer.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   mitraList: [],
//   loadingFetch: false,
//   errorFetch: null,
//   loadingCreate: false,
//   errorCreate: null,
//   createdMitra: null,
//   loadingDelete: false, // Untuk delete airline
//   errorDelete: null,    // Untuk delete airline
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

//   loadingCreateFlight: false,
//   errorCreateFlight: null,
//   createdFlight: null,
//   airportList: [],
//   loadingAirports: false,
//   errorAirports: null,

//   hotelList: [],
//   loadingHotels: false,
//   errorHotels: null,
//   hotelDetail: null,
//   loadingHotelDetail: false,
//   errorHotelDetail: null,
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

//   roomList: [],
//   loadingRooms: false,
//   errorRooms: null,
//   loadingUpdateRoomStatus: {},
//   errorUpdateRoomStatus: {},
//   loadingDeleteRoom: false,    // <-- Tambahkan state ini
//   errorDeleteRoom: null,       // <-- Tambahkan state ini
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

//     // --- Flight Reducers ---
//     createFlightRequest: (state) => {
//       state.loadingCreateFlight = true;
//       state.errorCreateFlight = null;
//       state.createdFlight = null;
//     },
//     createFlightSuccess: (state, action) => {
//       state.loadingCreateFlight = false;
//       state.createdFlight = action.payload;
//       state.errorCreateFlight = null;
//     },
//     createFlightFailure: (state, action) => {
//       state.loadingCreateFlight = false;
//       state.errorCreateFlight = action.payload;
//       state.createdFlight = null;
//     },
//     resetCreateFlightStatus: (state) => {
//         state.loadingCreateFlight = false;
//         state.errorCreateFlight = null;
//         state.createdFlight = null;
//     },

//     // --- Airport Reducers ---
//     getAirportsRequest: (state) => {
//       state.loadingAirports = true;
//       state.errorAirports = null;
//     },
//     getAirportsSuccess: (state, action) => {
//       state.loadingAirports = false;
//       state.airportList = action.payload;
//       state.errorAirports = null;
//     },
//     getAirportsFailure: (state, action) => {
//       state.loadingAirports = false;
//       state.errorAirports = action.payload;
//       state.airportList = [];
//     },

//     // --- Hotel Reducers ---
//     getHotelsRequest: (state) => {
//       state.loadingHotels = true; state.errorHotels = null;
//     },
//     getHotelsSuccess: (state, action) => {
//       state.loadingHotels = false; state.hotelList = action.payload; state.errorHotels = null;
//     },
//     getHotelsFailure: (state, action) => {
//       state.loadingHotels = false; state.errorHotels = action.payload; state.hotelList = [];
//     },
//     getHotelByIdRequest: (state) => {
//       state.loadingHotelDetail = true;
//       state.errorHotelDetail = null;
//       state.hotelDetail = null;
//     },
//     getHotelByIdSuccess: (state, action) => {
//       state.loadingHotelDetail = false;
//       state.hotelDetail = action.payload;
//       state.errorHotelDetail = null;
//     },
//     getHotelByIdFailure: (state, action) => {
//       state.loadingHotelDetail = false;
//       state.errorHotelDetail = action.payload;
//       state.hotelDetail = null;
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
//     getRoomsRequest: (state) => {
//       state.loadingRooms = true; state.errorRooms = null; state.roomList = [];
//     },
//     getRoomsSuccess: (state, action) => {
//       state.loadingRooms = false; state.roomList = action.payload; state.errorRooms = null;
//     },
//     getRoomsFailure: (state, action) => {
//       state.loadingRooms = false; state.errorRooms = action.payload; state.roomList = [];
//     },
//     updateRoomStatusRequest: (state, action) => {
//       const { roomId } = action.payload;
//       state.loadingUpdateRoomStatus[roomId] = true;
//       state.errorUpdateRoomStatus[roomId] = null;
//     },
//     updateRoomStatusSuccess: (state, action) => {
//       const updatedRoom = action.payload;
//       if (updatedRoom && updatedRoom.id) {
//         state.loadingUpdateRoomStatus[updatedRoom.id] = false;
//         state.errorUpdateRoomStatus[updatedRoom.id] = null;
//         const index = state.roomList.findIndex(room => room.id === updatedRoom.id);
//         if (index !== -1) {
//           state.roomList[index] = { ...state.roomList[index], ...updatedRoom };
//         }
//       } else {
//         console.error("mitraReducer: updateRoomStatusSuccess - updatedRoom atau updatedRoom.id tidak valid:", updatedRoom);
//       }
//     },
//     updateRoomStatusFailure: (state, action) => {
//       const { roomId, error } = action.payload;
//       state.loadingUpdateRoomStatus[roomId] = false;
//       state.errorUpdateRoomStatus[roomId] = error;
//     },
//     // Reducer baru untuk delete room
//     deleteRoomRequest: (state) => { // <-- Tambahkan reducer ini
//       state.loadingDeleteRoom = true;
//       state.errorDeleteRoom = null;
//     },
//     deleteRoomSuccess: (state, action) => { // <-- Tambahkan reducer ini
//       state.loadingDeleteRoom = false;
//       state.errorDeleteRoom = null;
//       // Menghapus kamar dari roomList berdasarkan roomId (action.payload)
//       state.roomList = state.roomList.filter((room) => room.id !== action.payload);
//     },
//     deleteRoomFailure: (state, action) => { // <-- Tambahkan reducer ini
//       state.loadingDeleteRoom = false;
//       state.errorDeleteRoom = action.payload;
//     },
//     clearDeleteRoomErrorRequest: (state) => { // <-- Tambahkan reducer ini (opsional)
//         state.errorDeleteRoom = null;
//     },

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
//   createFlightRequest,
//   createFlightSuccess,
//   createFlightFailure,
//   resetCreateFlightStatus,
//   getAirportsRequest,
//   getAirportsSuccess,
//   getAirportsFailure,
//   getHotelsRequest, getHotelsSuccess, getHotelsFailure,
//   getHotelByIdRequest, getHotelByIdSuccess, getHotelByIdFailure,
//   createHotelRequest, createHotelSuccess, createHotelFailure,
//   updateHotelRequest, updateHotelSuccess, updateHotelFailure,
//   deleteHotelRequest, deleteHotelSuccess, deleteHotelFailure,
//   clearDeleteHotelErrorRequest,
//   getLocationsRequest, getLocationsSuccess, getLocationsFailure,
//   getRoomsRequest, getRoomsSuccess, getRoomsFailure,
//   updateRoomStatusRequest, updateRoomStatusSuccess, updateRoomStatusFailure,
//   deleteRoomRequest, // <-- Ekspor action ini
//   deleteRoomSuccess, // <-- Ekspor action ini
//   deleteRoomFailure, // <-- Ekspor action ini
//   clearDeleteRoomErrorRequest, // <-- Ekspor action ini (opsional)
//   resetMitraState,
// } = mitraSlice.actions;

// export default mitraSlice.reducer;

// mitraReducer.js
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
  hotelDetail: null,
  loadingHotelDetail: false,
  errorHotelDetail: null,
  loadingCreateHotel: false,
  errorCreateHotel: null,
  createdHotelData: null,
  loadingUpdateHotel: false,
  errorUpdateHotel: null,
  updatedHotelData: null,
  loadingDeleteHotel: false,
  errorDeleteHotel: null,
  loadingDeleteHotelImage: false,
  errorDeleteHotelImage: null,

  locationList: [],
  loadingLocations: false,
  errorLocations: null,

  roomList: [],
  loadingRooms: false,
  errorRooms: null,
  loadingUpdateRoomStatus: {}, // Per-room ID loading for status update
  errorUpdateRoomStatus: {},   // Per-room ID error for status update
  loadingDeleteRoom: false,
  errorDeleteRoom: null,

  // New states for individual room details
  roomDetail: null,
  loadingRoomDetail: false,
  errorRoomDetail: null,

  // New states for updating a room's general data
  loadingUpdateRoom: false,
  errorUpdateRoom: null,
  updatedRoomData: null,

  // New states for deleting a room image
  loadingDeleteRoomImage: false,
  errorDeleteRoomImage: null,

  // Existing states for Room Types (fetch)
  roomTypeList: [],
  loadingRoomTypes: false,
  errorRoomTypes: null,

  // Existing states for Creating Room
  loadingCreateRoom: false,
  errorCreateRoom: null,
  createdRoomData: null,

  // New states for Creating Room Type
  loadingCreateRoomType: false,
  errorCreateRoomType: null,
  createdRoomTypeData: null,

  // New states for Creating Facility
  loadingCreateFacility: false,
  errorCreateFacility: null,
  createdFacilityData: null,
};

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

    // --- Flight Reducers ---
    createFlightRequest: (state) => { state.loadingCreateFlight = true; state.errorCreateFlight = null; state.createdFlight = null; },
    createFlightSuccess: (state, action) => { state.loadingCreateFlight = false; state.createdFlight = action.payload; state.errorCreateFlight = null; },
    createFlightFailure: (state, action) => { state.loadingCreateFlight = false; state.errorCreateFlight = action.payload; state.createdFlight = null; },
    resetCreateFlightStatus: (state) => { state.loadingCreateFlight = false; state.errorCreateFlight = null; state.createdFlight = null; },

    // --- Airport Reducers ---
    getAirportsRequest: (state) => { state.loadingAirports = true; state.errorAirports = null; },
    getAirportsSuccess: (state, action) => { state.loadingAirports = false; state.airportList = action.payload; state.errorAirports = null; },
    getAirportsFailure: (state, action) => { state.loadingAirports = false; state.errorAirports = action.payload; state.airportList = []; },

    // --- Hotel Reducers ---
    getHotelsRequest: (state) => { state.loadingHotels = true; state.errorHotels = null; },
    getHotelsSuccess: (state, action) => { state.loadingHotels = false; state.hotelList = action.payload; state.errorHotels = null; },
    getHotelsFailure: (state, action) => { state.loadingHotels = false; state.errorHotels = action.payload; state.hotelList = []; },
    getHotelByIdRequest: (state) => { state.loadingHotelDetail = true; state.errorHotelDetail = null; state.hotelDetail = null; },
    getHotelByIdSuccess: (state, action) => { state.loadingHotelDetail = false; state.hotelDetail = action.payload; state.errorHotelDetail = null; },
    getHotelByIdFailure: (state, action) => { state.loadingHotelDetail = false; state.errorHotelDetail = action.payload; state.hotelDetail = null; },
    createHotelRequest: (state) => { state.loadingCreateHotel = true; state.errorCreateHotel = null; state.createdHotelData = null; },
    createHotelSuccess: (state, action) => { state.loadingCreateHotel = false; state.createdHotelData = action.payload; state.errorCreateHotel = null; state.hotelList.push(action.payload); },
    createHotelFailure: (state, action) => { state.loadingCreateHotel = false; state.errorCreateHotel = action.payload; state.createdHotelData = null; },
    updateHotelRequest: (state) => { state.loadingUpdateHotel = true; state.errorUpdateHotel = null; state.updatedHotelData = null; },
    updateHotelSuccess: (state, action) => { state.loadingUpdateHotel = false; state.updatedHotelData = action.payload; state.errorUpdateHotel = null; const index = state.hotelList.findIndex( (hotel) => hotel.id === action.payload.id ); if (index !== -1) { state.hotelList[index] = action.payload; } if (state.hotelDetail && state.hotelDetail.id === action.payload.id) { state.hotelDetail = action.payload;} },
    updateHotelFailure: (state, action) => { state.loadingUpdateHotel = false; state.errorUpdateHotel = action.payload; state.updatedHotelData = null; },
    deleteHotelRequest: (state) => { state.loadingDeleteHotel = true; state.errorDeleteHotel = null; },
    deleteHotelSuccess: (state, action) => { state.loadingDeleteHotel = false; state.errorDeleteHotel = null; state.hotelList = state.hotelList.filter( (hotel) => hotel.id !== action.payload ); if(state.hotelDetail && state.hotelDetail.id === action.payload) { state.hotelDetail = null;} },
    deleteHotelFailure: (state, action) => { state.loadingDeleteHotel = false; state.errorDeleteHotel = action.payload; },
    clearDeleteHotelErrorRequest: (state) => { state.errorDeleteHotel = null; },

    // --- Hotel Image Reducers ---
    deleteHotelImageRequest: (state) => { state.loadingDeleteHotelImage = true; state.errorDeleteHotelImage = null; },
    deleteHotelImageSuccess: (state, action) => {
      state.loadingDeleteHotelImage = false;
      const { imageId, hotelId } = action.payload;
      if (state.hotelDetail && state.hotelDetail.id === hotelId && state.hotelDetail.hotelImages) {
        state.hotelDetail.hotelImages = state.hotelDetail.hotelImages.filter(image => image.id !== imageId);
      }
      const hotelIndex = state.hotelList.findIndex(hotel => hotel.id === hotelId);
      if (hotelIndex !== -1 && state.hotelList[hotelIndex].hotelImages) {
        state.hotelList[hotelIndex].hotelImages = state.hotelList[hotelIndex].hotelImages.filter(image => image.id !== imageId);
      }
    },
    deleteHotelImageFailure: (state, action) => { state.loadingDeleteHotelImage = false; state.errorDeleteHotelImage = action.payload; },

    // --- Location Reducers ---
    getLocationsRequest: (state) => { state.loadingLocations = true; state.errorLocations = null; },
    getLocationsSuccess: (state, action) => { state.loadingLocations = false; state.locationList = action.payload; state.errorLocations = null; },
    getLocationsFailure: (state, action) => { state.loadingLocations = false; state.errorLocations = action.payload; state.locationList = []; },

    // --- Room Reducers (General List, Status Update, Delete) ---
    getRoomsRequest: (state) => { state.loadingRooms = true; state.errorRooms = null; state.roomList = []; },
    getRoomsSuccess: (state, action) => { state.loadingRooms = false; state.roomList = action.payload; state.errorRooms = null; },
    getRoomsFailure: (state, action) => { state.loadingRooms = false; state.errorRooms = action.payload; state.roomList = []; },
    updateRoomStatusRequest: (state, action) => { const { roomId } = action.payload; state.loadingUpdateRoomStatus[roomId] = true; state.errorUpdateRoomStatus[roomId] = null; },
    updateRoomStatusSuccess: (state, action) => { const updatedRoom = action.payload; if (updatedRoom && updatedRoom.id) { state.loadingUpdateRoomStatus[updatedRoom.id] = false; state.errorUpdateRoomStatus[updatedRoom.id] = null; const index = state.roomList.findIndex(room => room.id === updatedRoom.id); if (index !== -1) { state.roomList[index] = { ...state.roomList[index], ...updatedRoom }; } } },
    updateRoomStatusFailure: (state, action) => { const { roomId, error } = action.payload; state.loadingUpdateRoomStatus[roomId] = false; state.errorUpdateRoomStatus[roomId] = error; },
    deleteRoomRequest: (state) => { state.loadingDeleteRoom = true; state.errorDeleteRoom = null; },
    deleteRoomSuccess: (state, action) => { state.loadingDeleteRoom = false; state.errorDeleteRoom = null; state.roomList = state.roomList.filter((room) => room.id !== action.payload); },
    deleteRoomFailure: (state, action) => { state.loadingDeleteRoom = false; state.errorDeleteRoom = action.payload; },
    clearDeleteRoomErrorRequest: (state) => { state.errorDeleteRoom = null; },

    // --- Room Detail Reducers (NEW) ---
    getRoomByIdRequest: (state) => { state.loadingRoomDetail = true; state.errorRoomDetail = null; state.roomDetail = null; },
    getRoomByIdSuccess: (state, action) => { state.loadingRoomDetail = false; state.roomDetail = action.payload; state.errorRoomDetail = null; },
    getRoomByIdFailure: (state, action) => { state.loadingRoomDetail = false; state.errorRoomDetail = action.payload; state.roomDetail = null; },
    
    // --- Update Room Reducers (NEW - for general room data update) ---
    updateRoomRequest: (state) => { state.loadingUpdateRoom = true; state.errorUpdateRoom = null; state.updatedRoomData = null; },
    updateRoomSuccess: (state, action) => {
      state.loadingUpdateRoom = false;
      state.updatedRoomData = action.payload;
      state.errorUpdateRoom = null;
      // Update room in roomList
      const index = state.roomList.findIndex(room => room.id === action.payload.id);
      if (index !== -1) {
        // Merge existing data with new data, as PATCH might not return all fields
        state.roomList[index] = { ...state.roomList[index], ...action.payload };
      }
      // Update roomDetail if it's the same room
      if (state.roomDetail && state.roomDetail.idRoom === action.payload.id) { // Assuming roomDetail.id is idRoom from response
        state.roomDetail = { ...state.roomDetail, ...action.payload, idRoom: action.payload.id }; // Keep idRoom consistent if needed
      }
    },
    updateRoomFailure: (state, action) => { state.loadingUpdateRoom = false; state.errorUpdateRoom = action.payload; state.updatedRoomData = null; },

    // --- Room Image Delete Reducers (NEW) ---
    deleteRoomImageRequest: (state) => { state.loadingDeleteRoomImage = true; state.errorDeleteRoomImage = null; },
    deleteRoomImageSuccess: (state, action) => {
      state.loadingDeleteRoomImage = false;
      const { imageId, roomId } = action.payload; // Assuming imageId from path, roomId for context
      if (state.roomDetail && state.roomDetail.idRoom === roomId && state.roomDetail.roomImages) {
        state.roomDetail.roomImages = state.roomDetail.roomImages.filter(
          // Assuming the image object has a way to identify it, e.g., by its URL or a unique ID if provided by API
          // The sample response has 'urlImage'. If imageId is the 'id' of the image entity (not in sample), adjust accordingly.
          // For now, let's assume imageId corresponds to something unique in the roomImages array or the backend handles it.
          // If imageId is part of the URL or a specific field in roomImages object:
          // Example: image => image.id !== imageId or image.urlImage !== imageId (if imageId is the URL)
          // The endpoint is /roomImage/{id} - this `id` is the imageId.
          // The provided roomDetail.roomImages contains objects like {urlImage: "..."}. It does not contain an 'id' for the image itself.
          // So we might need to adjust how we filter. If imageId is the URL, filtering is direct.
          // If imageId is an abstract ID, the roomImages array in state might need that ID.
          // For now, assuming action.payload contains what's needed to identify and remove.
          // Let's assume the API deletes it and we just need to reflect this if the imageId is the URL or an ID within the object.
          // Given `DELETE /roomImage/{id}`, `imageId` is likely the identifier for the image.
          // We'll filter based on a property that matches `imageId`. If `roomImages` objects don't have a direct `id` field,
          // this part might need adjustment based on actual data structure of `roomImages` items or how `imageId` relates to them.
          // For simplicity, if imageId is the URL (less likely for a DELETE endpoint ID):
          // image => image.urlImage !== imageId
          // Let's assume for now the `imageId` can be used to find and filter the image.
          // If the image object has an `id` property that matches `imageId`:
          image => image.id !== imageId // This is an assumption. Change if structure is different.
          // If the structure is just {urlImage: "..."} and imageId is that urlImage:
          // image => image.urlImage !== imageId
        );
      }
      // If room images are also part of roomList items, update there too (not typical)
    },
    deleteRoomImageFailure: (state, action) => { state.loadingDeleteRoomImage = false; state.errorDeleteRoomImage = action.payload; },


    // --- Room Type Reducers (Fetch - Existing) ---
    getRoomTypesRequest: (state) => { state.loadingRoomTypes = true; state.errorRoomTypes = null; state.roomTypeList = []; },
    getRoomTypesSuccess: (state, action) => { state.loadingRoomTypes = false; state.roomTypeList = action.payload; state.errorRoomTypes = null; },
    getRoomTypesFailure: (state, action) => { state.loadingRoomTypes = false; state.errorRoomTypes = action.payload; state.roomTypeList = []; },

    // --- Room (Create) Reducers (Existing) ---
    createRoomRequest: (state) => { state.loadingCreateRoom = true; state.errorCreateRoom = null; state.createdRoomData = null; },
    createRoomSuccess: (state, action) => { state.loadingCreateRoom = false; state.createdRoomData = action.payload; state.errorCreateRoom = null; if (state.roomList && Array.isArray(state.roomList)) { state.roomList.push(action.payload); } else { state.roomList = [action.payload]; } },
    createRoomFailure: (state, action) => { state.loadingCreateRoom = false; state.errorCreateRoom = action.payload; state.createdRoomData = null; },
    resetCreateRoomStatus: (state) => { state.loadingCreateRoom = false; state.errorCreateRoom = null; state.createdRoomData = null; },

    // --- Room Type (Create) Reducers (NEW) ---
    createRoomTypeRequest: (state) => { state.loadingCreateRoomType = true; state.errorCreateRoomType = null; state.createdRoomTypeData = null; },
    createRoomTypeSuccess: (state, action) => { state.loadingCreateRoomType = false; state.createdRoomTypeData = action.payload; state.errorCreateRoomType = null; /* Optionally update roomTypeList if needed */ },
    createRoomTypeFailure: (state, action) => { state.loadingCreateRoomType = false; state.errorCreateRoomType = action.payload; state.createdRoomTypeData = null; },
    resetCreateRoomTypeStatus: (state) => { state.loadingCreateRoomType = false; state.errorCreateRoomType = null; state.createdRoomTypeData = null; },

    // --- Facility (Create) Reducers (NEW) ---
    createFacilityRequest: (state) => { state.loadingCreateFacility = true; state.errorCreateFacility = null; state.createdFacilityData = null; },
    createFacilitySuccess: (state, action) => { state.loadingCreateFacility = false; state.createdFacilityData = action.payload; state.errorCreateFacility = null; /* Optionally update a facilityList if it exists */ },
    createFacilityFailure: (state, action) => { state.loadingCreateFacility = false; state.errorCreateFacility = action.payload; state.createdFacilityData = null; },
    resetCreateFacilityStatus: (state) => { state.loadingCreateFacility = false; state.errorCreateFacility = null; state.createdFacilityData = null; },

    resetMitraState: (state) => {
      return initialState;
    },
  },
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
  createFlightRequest, createFlightSuccess, createFlightFailure,
  resetCreateFlightStatus,
  getAirportsRequest, getAirportsSuccess, getAirportsFailure,
  getHotelsRequest, getHotelsSuccess, getHotelsFailure,
  getHotelByIdRequest, getHotelByIdSuccess, getHotelByIdFailure,
  createHotelRequest, createHotelSuccess, createHotelFailure,
  updateHotelRequest, updateHotelSuccess, updateHotelFailure,
  deleteHotelRequest, deleteHotelSuccess, deleteHotelFailure,
  clearDeleteHotelErrorRequest,
  deleteHotelImageRequest, deleteHotelImageSuccess, deleteHotelImageFailure,
  getLocationsRequest, getLocationsSuccess, getLocationsFailure,
  getRoomsRequest, getRoomsSuccess, getRoomsFailure,
  updateRoomStatusRequest, updateRoomStatusSuccess, updateRoomStatusFailure,
  deleteRoomRequest, deleteRoomSuccess, deleteRoomFailure,
  clearDeleteRoomErrorRequest,
  
  // Export new room detail actions
  getRoomByIdRequest, getRoomByIdSuccess, getRoomByIdFailure,
  
  // Export new update room actions
  updateRoomRequest, updateRoomSuccess, updateRoomFailure,

  // Export new room image delete actions
  deleteRoomImageRequest, deleteRoomImageSuccess, deleteRoomImageFailure,

  getRoomTypesRequest, getRoomTypesSuccess, getRoomTypesFailure,
  createRoomRequest, createRoomSuccess, createRoomFailure, resetCreateRoomStatus,
  createRoomTypeRequest, createRoomTypeSuccess, createRoomTypeFailure, resetCreateRoomTypeStatus,
  createFacilityRequest, createFacilitySuccess, createFacilityFailure, resetCreateFacilityStatus,
  resetMitraState,
} = mitraSlice.actions;

export default mitraSlice.reducer;