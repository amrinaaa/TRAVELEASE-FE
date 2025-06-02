// // mitraAction.js
// import axios from "axios";
// import Cookies from "js-cookie";
// import {
//   getMitraRequest,
//   getMitraSuccess,
//   getMitraFailure,
//   createMitraRequest,
//   createMitraSuccess,
//   createMitraFailure,
//   deleteMitraRequest as deleteAirlineMitraRequest,
//   deleteMitraSuccess as deleteAirlineMitraSuccess,
//   deleteMitraFailure as deleteAirlineMitraFailure,
//   updateMitraRequest,
//   updateMitraSuccess,
//   updateMitraFailure,
//   getPlanesRequest,
//   getPlanesSuccess,
//   getPlanesFailure,
//   deletePlaneRequest,
//   deletePlaneSuccess,
//   deletePlaneFailure,
//   createPlaneRequest,
//   createPlaneSuccess,
//   createPlaneFailure,
//   getPlaneTypesRequest,
//   getPlaneTypesSuccess,
//   getPlaneTypesFailure,
//   createPlaneTypeRequest,
//   createPlaneTypeSuccess,
//   createPlaneTypeFailure,
//   getSeatsRequest,
//   getSeatsSuccess,
//   getSeatsFailure,
//   deleteSeatRequest,
//   deleteSeatSuccess,
//   deleteSeatFailure,
//   getSeatCategoriesRequest,
//   getSeatCategoriesSuccess,
//   getSeatCategoriesFailure,
//   createSeatsRequest,
//   createSeatsSuccess,
//   createSeatsFailure,
//   createFlightRequest,
//   createFlightSuccess,
//   createFlightFailure,
//   getAirportsRequest,
//   getAirportsSuccess,
//   getAirportsFailure,
//   getHotelsRequest,
//   getHotelsSuccess,
//   getHotelsFailure,
//   createHotelRequest,
//   createHotelSuccess,
//   createHotelFailure,
//   updateHotelRequest,
//   updateHotelSuccess,
//   updateHotelFailure,
//   deleteHotelRequest,
//   deleteHotelSuccess,
//   deleteHotelFailure,
//   clearDeleteHotelErrorRequest,
//   getLocationsRequest,
//   getLocationsSuccess,
//   getLocationsFailure,
//   getRoomsRequest,
//   getRoomsSuccess,
//   getRoomsFailure,
//   updateRoomStatusRequest,
//   updateRoomStatusSuccess,
//   updateRoomStatusFailure,
//   getHotelByIdRequest,
//   getHotelByIdSuccess,
//   getHotelByIdFailure,
// } from "../reducers/mitraReducer";

// const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

// // --- Airline Actions (Mitra) ---
// export const fetchMitraRequest = () => async (dispatch) => {
//   dispatch(getMitraRequest());
//   try {
//     const token = Cookies.get("token");
//     const response = await axios.get(`${api_url}/airlines`, {
//       headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//     });
//     if (response.data?.data && Array.isArray(response.data.data)) {
//       dispatch(getMitraSuccess(response.data.data));
//     } else {
//       throw new Error("Invalid data format from API for airlines");
//     }
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || error.message || "Failed to fetch airlines";
//     dispatch(getMitraFailure(String(errorMessage)));
//   }
// };

// export const createMitra = (mitraData) => async (dispatch) => {
//   dispatch(createMitraRequest());
//   try {
//     const token = Cookies.get("token");
//     const response = await axios.post(`${api_url}/airline`, mitraData, {
//       headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//     });
//     dispatch(createMitraSuccess(response.data.data));
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || error.message || "Failed to create airline";
//     dispatch(createMitraFailure(String(errorMessage)));
//   }
// };

// export const deleteMitra = (airlineId) => async (dispatch) => {
//   dispatch(deleteAirlineMitraRequest());
//   try {
//     const token = Cookies.get("token");
//     await axios.delete(`${api_url}/airline`, {
//       headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//       data: { airlineId: airlineId },
//     });
//     dispatch(deleteAirlineMitraSuccess(airlineId));
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || error.message || "Failed to delete airline";
//     dispatch(deleteAirlineMitraFailure(String(errorMessage)));
//   }
// };


// export const updateMitra = (mitraData) => async (dispatch) => {
//   dispatch(updateMitraRequest());
//   try {
//     const token = Cookies.get("token");
//     const response = await axios.put(`${api_url}/airline`, mitraData, {
//       headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//     });
//     dispatch(updateMitraSuccess(response.data.data));
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || error.message || "Failed to update airline";
//     dispatch(updateMitraFailure(String(errorMessage)));
//   }
// };

// // --- Plane Actions ---
// export const fetchPlanesRequest = (airlineId) => async (dispatch) => {
//   dispatch(getPlanesRequest());
//   try {
//     const token = Cookies.get("token");
//     const response = await axios.get(`${api_url}/planes?airlineId=${airlineId}`, {
//       headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//     });
//     if (response.data?.data && Array.isArray(response.data.data)) {
//       dispatch(getPlanesSuccess(response.data.data));
//     } else {
//       throw new Error("Invalid data format from API for planes");
//     }
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || error.message || "Failed to fetch planes";
//     dispatch(getPlanesFailure(String(errorMessage)));
//   }
// };

// export const deletePlane = (planeId) => async (dispatch) => {
//   dispatch(deletePlaneRequest());
//   try {
//     const token = Cookies.get("token");
//     await axios.delete(`${api_url}/plane`, {
//       headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//       data: { planeId: planeId },
//     });
//     dispatch(deletePlaneSuccess(planeId));
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || error.message || "Failed to delete plane";
//     dispatch(deletePlaneFailure(String(errorMessage)));
//   }
// };

// export const createPlane = (planeData) => async (dispatch) => {
//   dispatch(createPlaneRequest());
//   try {
//     const token = Cookies.get("token");
//     const response = await axios.post(`${api_url}/plane`, planeData, {
//       headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//     });
//     dispatch(createPlaneSuccess(response.data.data));
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || error.message || "Failed to create plane";
//     dispatch(createPlaneFailure(String(errorMessage)));
//   }
// };

// // --- Plane Type Actions ---
// export const fetchPlaneTypesRequest = () => async (dispatch) => {
//   dispatch(getPlaneTypesRequest());
//   try {
//     const token = Cookies.get("token");
//     const response = await axios.get(`${api_url}/plane-type`, {
//       headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//     });
//     if (response.data?.data && Array.isArray(response.data.data)) {
//       dispatch(getPlaneTypesSuccess(response.data.data));
//     } else {
//       throw new Error("Invalid data format from API for plane types");
//     }
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || error.message || "Failed to fetch plane types";
//     dispatch(getPlaneTypesFailure(String(errorMessage)));
//   }
// };

// export const createPlaneType = (planeTypeData) => async (dispatch) => {
//   dispatch(createPlaneTypeRequest());
//   try {
//     const token = Cookies.get("token");
//     const response = await axios.post(`${api_url}/plane-type`, planeTypeData, {
//       headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//     });
//     dispatch(createPlaneTypeSuccess(response.data.data));
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || error.message || "Failed to create plane type";
//     dispatch(createPlaneTypeFailure(String(errorMessage)));
//   }
// };

// // --- Seat Actions ---
// export const fetchSeatsRequest = (planeId) => async (dispatch) => {
//   dispatch(getSeatsRequest());
//   try {
//     const token = Cookies.get("token");
//     const response = await axios.get(`${api_url}/seats?planeId=${planeId}`, {
//       headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//     });
//     if (response.data?.data && Array.isArray(response.data.data)) {
//       dispatch(getSeatsSuccess(response.data.data));
//     } else {
//       throw new Error("Invalid data format from API or no seats found");
//     }
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || error.message || "Failed to fetch seats";
//     dispatch(getSeatsFailure(String(errorMessage)));
//   }
// };

// export const deleteSeat = (seatId) => async (dispatch) => {
//   dispatch(deleteSeatRequest());
//   try {
//     const token = Cookies.get("token");
//     await axios.delete(`${api_url}/seat`, {
//       headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//       data: { seatId: seatId },
//     });
//     dispatch(deleteSeatSuccess(seatId));
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || error.message || "Failed to delete seat";
//     dispatch(deleteSeatFailure(String(errorMessage)));
//   }
// };

// export const createSeats = (seatData) => async (dispatch) => {
//   dispatch(createSeatsRequest());
//   try {
//     const token = Cookies.get("token");
//     const response = await axios.post(`${api_url}/seat`, seatData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });
//     dispatch(createSeatsSuccess({
//         response: response.data.data,
//         seatCategoryId: seatData.seatCategoryId
//     }));
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || error.message || "Failed to create seats";
//     dispatch(createSeatsFailure(String(errorMessage)));
//   }
// };

// // --- Seat Category Actions ---
// export const fetchSeatCategoriesRequest = (planeId) => async (dispatch) => {
//   dispatch(getSeatCategoriesRequest());
//   try {
//     const token = Cookies.get("token");
//     const response = await axios.get(`${api_url}/seat-category?planeId=${planeId}`, {
//       headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//     });
//     if (response.data?.data && Array.isArray(response.data.data)) {
//       dispatch(getSeatCategoriesSuccess(response.data.data));
//     } else {
//       throw new Error("Invalid data format from API for seat categories");
//     }
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || error.message || "Failed to fetch seat categories";
//     dispatch(getSeatCategoriesFailure(String(errorMessage)));
//   }
// };

// // --- Flight Actions ---
// export const createFlight = (flightData) => async (dispatch) => {
//   dispatch(createFlightRequest());
//   try {
//     const token = Cookies.get("token");
//     console.log("[DEBUG] Auth Token for Create Flight:", token);
//     console.log("[DEBUG] Sending Flight Data:", flightData);

//     const response = await axios.post(`${api_url}/flight`, flightData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     console.log("[DEBUG] API Response (Create Flight):", response.data);
//     dispatch(createFlightSuccess(response.data.data));
//   } catch (error) {
//     console.error("[ERROR] Creating flight:", error.response || error);
//     dispatch(createFlightFailure(error.response?.data?.message || error.message));
//   }
// };

// // --- Airport Actions ---
// export const fetchAirportsRequest = () => async (dispatch) => {
//   dispatch(getAirportsRequest());
//   try {
//     const token = Cookies.get("token");
//     console.log("[DEBUG] Auth Token for Get Airports:", token);

//     const response = await axios.get(`${api_url}/airports`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     console.log("[DEBUG] API Response (Get Airports):", response.data);
//     if (response.data?.data && Array.isArray(response.data.data)) {
//       dispatch(getAirportsSuccess(response.data.data));
//     } else {
//       throw new Error("Invalid data format from API");
//     }
//   } catch (error) {
//     console.error("[ERROR] Fetching airports:", error.response || error);
//     dispatch(getAirportsFailure(error.response?.data?.message || error.message));
//   }
// };

// // --- Hotel Actions ---
// export const fetchHotels = () => async (dispatch) => {
//   console.log("mitraAction: fetchHotels dipanggil");
//   dispatch(getHotelsRequest());
//   try {
//     const token = Cookies.get("token");
//     console.log("mitraAction - fetchHotels: Token:", token ? "Ada" : "TIDAK ADA");
//     const response = await axios.get(`${api_url}/hotels`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     console.log("mitraAction - fetchHotels: Respons API:", response.data);
//     if (response.data?.data && Array.isArray(response.data.data)) {
//       dispatch(getHotelsSuccess(response.data.data));
//     } else if (response.data?.message === "Success" && response.data?.data === null) {
//       dispatch(getHotelsSuccess([]));
//     } else {
//       console.error("mitraAction - fetchHotels: Format data tidak valid:", response.data);
//       throw new Error("Format data tidak valid dari API untuk hotels");
//     }
//   } catch (error) {
//     console.error("mitraAction - fetchHotels: Error di catch block:", error);
//     const errorMessage = error.response?.data?.message || error.message || "Gagal mengambil data hotel";
//     dispatch(getHotelsFailure(String(errorMessage)));
//   }
// };

// export const fetchHotelById = (hotelId) => async (dispatch) => {
//   console.log(`mitraAction: fetchHotelById dipanggil untuk hotelId: ${hotelId}`);
//   dispatch(getHotelByIdRequest());
//   try {
//     const token = Cookies.get("token");
//     console.log("mitraAction - fetchHotelById: Token:", token ? "Ada" : "TIDAK ADA");
//     const response = await axios.get(`${api_url}/hotel/data/${hotelId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     console.log("mitraAction - fetchHotelById: Respons API:", response.data);
//     if (response.data?.message === "Success" && response.data?.data) {
//       dispatch(getHotelByIdSuccess(response.data.data));
//     } else {
//       console.error("mitraAction - fetchHotelById: Format data tidak valid:", response.data);
//       throw new Error(response.data?.message || "Format data tidak valid dari API untuk detail hotel");
//     }
//   } catch (error) {
//     console.error("mitraAction - fetchHotelById: Error di catch block:", error);
//     const errorMessage = error.response?.data?.message || error.message || "Gagal mengambil detail data hotel";
//     dispatch(getHotelByIdFailure(String(errorMessage)));
//   }
// };

// export const createHotel = (hotelFormData) => async (dispatch) => {
//   dispatch(createHotelRequest());
//   try {
//     const token = Cookies.get("token");
//     const response = await axios.post(`${api_url}/hotel`, hotelFormData, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (response.data?.data) {
//       dispatch(createHotelSuccess(response.data.data));
//     } else {
//       throw new Error("Invalid data format from API on create hotel");
//     }
//   } catch (error) {
//     console.error("Create Hotel Error:", error.response || error);
//     const errorMessage = error.response?.data?.message || error.message || "Failed to create hotel";
//     dispatch(createHotelFailure(String(errorMessage)));
//   }
// };

// export const updateHotel = (hotelFormData) => async (dispatch) => {
//   dispatch(updateHotelRequest());
//   try {
//     const token = Cookies.get("token");
//     const response = await axios.patch(`${api_url}/hotel`, hotelFormData, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (response.data?.data) {
//       dispatch(updateHotelSuccess(response.data.data));
//     } else {
//       throw new Error("Invalid data format from API on update hotel");
//     }
//   } catch (error) {
//     console.error("Update Hotel Error:", error.response || error);
//     const errorMessage = error.response?.data?.message || error.message || "Failed to update hotel";
//     dispatch(updateHotelFailure(String(errorMessage)));
//   }
// };

// export const deleteHotel = (hotelId) => async (dispatch) => {
//   console.log("deleteHotel ACTION FIRED with hotelId:", hotelId); //
//   dispatch(deleteHotelRequest()); //
//   try {
//     const token = Cookies.get("token"); //
//     const payload = { hotelId: hotelId }; //
//     await axios.delete(`${api_url}/hotel`, { //
//       headers: {
//         Authorization: `Bearer ${token}`, //
//         "Content-Type": "application/json", //
//       },
//       data: payload, //
//     });
//     dispatch(deleteHotelSuccess(hotelId)); //
//   } catch (error) {
//     console.error("Delete Hotel API Error:", error.response || error); //
//     const errorMessage = error.response?.data?.message || error.message || "Failed to delete hotel from action"; //
//     dispatch(deleteHotelFailure(String(errorMessage))); //
//   }
// };

// export const clearDeleteHotelError = () => (dispatch) => {
//   dispatch(clearDeleteHotelErrorRequest());
// };

// // --- Location Actions ---
// export const fetchLocations = () => async (dispatch) => {
//   dispatch(getLocationsRequest());
//   try {
//     const token = Cookies.get("token");
//     const response = await axios.get(`${api_url}/locations`, {
//       headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//     });
//     if (response.data?.message === "Success" && Array.isArray(response.data.data)) {
//       dispatch(getLocationsSuccess(response.data.data));
//     } else if (response.data?.message === "Success" && response.data?.data === null) {
//       dispatch(getLocationsSuccess([]));
//     }
//     else {
//       throw new Error("Invalid data format from API for locations");
//     }
//   } catch (error) {
//     console.error("Fetch Locations Error:", error.response || error);
//     const errorMessage = error.response?.data?.message || error.message || "Failed to fetch locations";
//     dispatch(getLocationsFailure(String(errorMessage)));
//   }
// };

// // --- Room Actions ---
// export const fetchRooms = (hotelId) => async (dispatch) => {
//   console.log("mitraAction: fetchRooms dipanggil dengan hotelId:", hotelId);
//   dispatch(getRoomsRequest());
//   try {
//     const token = Cookies.get("token");
//     console.log("mitraAction - fetchRooms: Token untuk fetchRooms:", token ? "Ada" : "TIDAK ADA");
//     const response = await axios.get(`${api_url}/rooms/${hotelId}`, {
//       headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//     });
//     console.log("mitraAction - fetchRooms: Respons API mentah untuk /rooms:", response);
//     console.log("mitraAction - fetchRooms: Respons API data untuk /rooms:", response.data);

//     if (response.data?.message === "Success" && Array.isArray(response.data.data)) {
//       console.log("mitraAction - fetchRooms: Dispatching getRoomsSuccess dengan data:", response.data.data);
//       dispatch(getRoomsSuccess(response.data.data));
//     } else if (response.data?.message === "Success" && response.data?.data === null) {
//       console.log("mitraAction - fetchRooms: Dispatching getRoomsSuccess dengan array kosong (data dari API null)");
//       dispatch(getRoomsSuccess([]));
//     } else {
//       console.error("mitraAction - fetchRooms: Respons API /rooms TIDAK SESUAI kondisi sukses. response.data:", response.data);
//       throw new Error(response.data?.message || "Format data tidak valid dari API untuk rooms");
//     }
//   } catch (error) {
//     console.error("mitraAction - fetchRooms: Error di catch block. Error:", error);
//     console.error("mitraAction - fetchRooms: Error response data (jika ada):", error.response?.data);
//     console.error("mitraAction - fetchRooms: Error message:", error.message);
//     const errorMessage = error.response?.data?.message || error.message || "Gagal mengambil data kamar";
//     dispatch(getRoomsFailure(String(errorMessage)));
//   }
// };

// export const updateRoomStatus = (roomId, hotelIdForContext, newStatus) => async (dispatch) => {
//   console.log(`mitraAction: updateRoomStatus. roomId: ${roomId}, hotelIdForContext: ${hotelIdForContext}, newStatus: ${newStatus}`);
//   dispatch(updateRoomStatusRequest({ roomId }));
//   try {
//     const token = Cookies.get("token");
//     const targetUrl = `${api_url}/rooms/${roomId}`;
//     console.log(`mitraAction - updateRoomStatus: Mencoba PATCH ke URL: ${targetUrl} dengan status: ${newStatus}`);

//     const response = await axios.patch(targetUrl,
//       { status: newStatus },
//       {
//         headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//       }
//     );
//     console.log("mitraAction - updateRoomStatus: Respons API data:", response.data);

//     if (response.data?.message === "Success" && response.data?.data) {
//       console.log("mitraAction - updateRoomStatus: Dispatching updateRoomStatusSuccess dengan data:", response.data.data);
//       dispatch(updateRoomStatusSuccess(response.data.data));
//     } else if (response.data?.message === "Success") {
//         console.log("mitraAction - updateRoomStatus: Sukses, API tidak return data kamar. Membuat data lokal.");
//         dispatch(updateRoomStatusSuccess({ id: roomId, status: newStatus, hotelId: hotelIdForContext }));
//     }
//     else {
//       console.error("mitraAction - updateRoomStatus: Respons API TIDAK SESUAI kondisi sukses. response.data:", response.data);
//       throw new Error(response.data?.message || "Gagal memperbarui status kamar dari API");
//     }
//   } catch (error) {
//     console.error("mitraAction - updateRoomStatus: Error di catch block:", error);
//     if (error.response) {
//       console.error("mitraAction - updateRoomStatus: Error data:", error.response.data);
//       console.error("mitraAction - updateRoomStatus: Error status:", error.response.status);
//       console.error("mitraAction - updateRoomStatus: Error headers:", error.response.headers);
//     } else if (error.request) {
//       console.error("mitraAction - updateRoomStatus: Tidak ada respons dari server:", error.request);
//     } else {
//       console.error("mitraAction - updateRoomStatus: Error saat menyiapkan permintaan:", error.message);
//     }
//     const errorMessage = error.response?.data?.message || error.message || "Gagal memperbarui status kamar";
//     dispatch(updateRoomStatusFailure({ roomId, error: String(errorMessage) }));
//   }
// };


// mitraAction.js
import axios from "axios";
import Cookies from "js-cookie";
import {
  getMitraRequest,
  getMitraSuccess,
  getMitraFailure,
  createMitraRequest,
  createMitraSuccess,
  createMitraFailure,
  deleteMitraRequest as deleteAirlineMitraRequest,
  deleteMitraSuccess as deleteAirlineMitraSuccess,
  deleteMitraFailure as deleteAirlineMitraFailure,
  updateMitraRequest,
  updateMitraSuccess,
  updateMitraFailure,
  getPlanesRequest,
  getPlanesSuccess,
  getPlanesFailure,
  deletePlaneRequest,
  deletePlaneSuccess,
  deletePlaneFailure,
  createPlaneRequest,
  createPlaneSuccess,
  createPlaneFailure,
  getPlaneTypesRequest,
  getPlaneTypesSuccess,
  getPlaneTypesFailure,
  createPlaneTypeRequest,
  createPlaneTypeSuccess,
  createPlaneTypeFailure,
  getSeatsRequest,
  getSeatsSuccess,
  getSeatsFailure,
  deleteSeatRequest,
  deleteSeatSuccess,
  deleteSeatFailure,
  getSeatCategoriesRequest,
  getSeatCategoriesSuccess,
  getSeatCategoriesFailure,
  createSeatsRequest,
  createSeatsSuccess,
  createSeatsFailure,
  createFlightRequest,
  createFlightSuccess,
  createFlightFailure,
  getAirportsRequest,
  getAirportsSuccess,
  getAirportsFailure,
  getHotelsRequest,
  getHotelsSuccess,
  getHotelsFailure,
  createHotelRequest,
  createHotelSuccess,
  createHotelFailure,
  updateHotelRequest,
  updateHotelSuccess,
  updateHotelFailure,
  deleteHotelRequest,
  deleteHotelSuccess,
  deleteHotelFailure,
  clearDeleteHotelErrorRequest,
  getLocationsRequest,
  getLocationsSuccess,
  getLocationsFailure,
  getRoomsRequest,
  getRoomsSuccess,
  getRoomsFailure,
  updateRoomStatusRequest,
  updateRoomStatusSuccess,
  updateRoomStatusFailure,
  getHotelByIdRequest,
  getHotelByIdSuccess,
  getHotelByIdFailure,
  deleteRoomRequest, // <-- Tambahkan ini
  deleteRoomSuccess, // <-- Tambahkan ini
  deleteRoomFailure, // <-- Tambahkan ini
  clearDeleteRoomErrorRequest, // <-- Tambahkan ini (opsional, untuk membersihkan error)
} from "../reducers/mitraReducer";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

// --- Airline Actions (Mitra) ---
export const fetchMitraRequest = () => async (dispatch) => {
  dispatch(getMitraRequest());
  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${api_url}/airlines`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    if (response.data?.data && Array.isArray(response.data.data)) {
      dispatch(getMitraSuccess(response.data.data));
    } else {
      throw new Error("Invalid data format from API for airlines");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to fetch airlines";
    dispatch(getMitraFailure(String(errorMessage)));
  }
};

export const createMitra = (mitraData) => async (dispatch) => {
  dispatch(createMitraRequest());
  try {
    const token = Cookies.get("token");
    const response = await axios.post(`${api_url}/airline`, mitraData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    dispatch(createMitraSuccess(response.data.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to create airline";
    dispatch(createMitraFailure(String(errorMessage)));
  }
};

export const deleteMitra = (airlineId) => async (dispatch) => {
  dispatch(deleteAirlineMitraRequest());
  try {
    const token = Cookies.get("token");
    await axios.delete(`${api_url}/airline`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      data: { airlineId: airlineId },
    });
    dispatch(deleteAirlineMitraSuccess(airlineId));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to delete airline";
    dispatch(deleteAirlineMitraFailure(String(errorMessage)));
  }
};


export const updateMitra = (mitraData) => async (dispatch) => {
  dispatch(updateMitraRequest());
  try {
    const token = Cookies.get("token");
    const response = await axios.put(`${api_url}/airline`, mitraData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    dispatch(updateMitraSuccess(response.data.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to update airline";
    dispatch(updateMitraFailure(String(errorMessage)));
  }
};

// --- Plane Actions ---
export const fetchPlanesRequest = (airlineId) => async (dispatch) => {
  dispatch(getPlanesRequest());
  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${api_url}/planes?airlineId=${airlineId}`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    if (response.data?.data && Array.isArray(response.data.data)) {
      dispatch(getPlanesSuccess(response.data.data));
    } else {
      throw new Error("Invalid data format from API for planes");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to fetch planes";
    dispatch(getPlanesFailure(String(errorMessage)));
  }
};

export const deletePlane = (planeId) => async (dispatch) => {
  dispatch(deletePlaneRequest());
  try {
    const token = Cookies.get("token");
    await axios.delete(`${api_url}/plane`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      data: { planeId: planeId },
    });
    dispatch(deletePlaneSuccess(planeId));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to delete plane";
    dispatch(deletePlaneFailure(String(errorMessage)));
  }
};

export const createPlane = (planeData) => async (dispatch) => {
  dispatch(createPlaneRequest());
  try {
    const token = Cookies.get("token");
    const response = await axios.post(`${api_url}/plane`, planeData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    dispatch(createPlaneSuccess(response.data.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to create plane";
    dispatch(createPlaneFailure(String(errorMessage)));
  }
};

// --- Plane Type Actions ---
export const fetchPlaneTypesRequest = () => async (dispatch) => {
  dispatch(getPlaneTypesRequest());
  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${api_url}/plane-type`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    if (response.data?.data && Array.isArray(response.data.data)) {
      dispatch(getPlaneTypesSuccess(response.data.data));
    } else {
      throw new Error("Invalid data format from API for plane types");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to fetch plane types";
    dispatch(getPlaneTypesFailure(String(errorMessage)));
  }
};

export const createPlaneType = (planeTypeData) => async (dispatch) => {
  dispatch(createPlaneTypeRequest());
  try {
    const token = Cookies.get("token");
    const response = await axios.post(`${api_url}/plane-type`, planeTypeData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    dispatch(createPlaneTypeSuccess(response.data.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to create plane type";
    dispatch(createPlaneTypeFailure(String(errorMessage)));
  }
};

// --- Seat Actions ---
export const fetchSeatsRequest = (planeId) => async (dispatch) => {
  dispatch(getSeatsRequest());
  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${api_url}/seats?planeId=${planeId}`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    if (response.data?.data && Array.isArray(response.data.data)) {
      dispatch(getSeatsSuccess(response.data.data));
    } else {
      throw new Error("Invalid data format from API or no seats found");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to fetch seats";
    dispatch(getSeatsFailure(String(errorMessage)));
  }
};

export const deleteSeat = (seatId) => async (dispatch) => {
  dispatch(deleteSeatRequest());
  try {
    const token = Cookies.get("token");
    await axios.delete(`${api_url}/seat`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      data: { seatId: seatId },
    });
    dispatch(deleteSeatSuccess(seatId));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to delete seat";
    dispatch(deleteSeatFailure(String(errorMessage)));
  }
};

export const createSeats = (seatData) => async (dispatch) => {
  dispatch(createSeatsRequest());
  try {
    const token = Cookies.get("token");
    const response = await axios.post(`${api_url}/seat`, seatData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    dispatch(createSeatsSuccess({
        response: response.data.data,
        seatCategoryId: seatData.seatCategoryId
    }));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to create seats";
    dispatch(createSeatsFailure(String(errorMessage)));
  }
};

// --- Seat Category Actions ---
export const fetchSeatCategoriesRequest = (planeId) => async (dispatch) => {
  dispatch(getSeatCategoriesRequest());
  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${api_url}/seat-category?planeId=${planeId}`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    if (response.data?.data && Array.isArray(response.data.data)) {
      dispatch(getSeatCategoriesSuccess(response.data.data));
    } else {
      throw new Error("Invalid data format from API for seat categories");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to fetch seat categories";
    dispatch(getSeatCategoriesFailure(String(errorMessage)));
  }
};

// --- Flight Actions ---
export const createFlight = (flightData) => async (dispatch) => {
  dispatch(createFlightRequest());
  try {
    const token = Cookies.get("token");
    const response = await axios.post(`${api_url}/flight`, flightData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    dispatch(createFlightSuccess(response.data.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to create flight";
    dispatch(createFlightFailure(String(errorMessage)));
  }
};

// --- Airport Actions ---
export const fetchAirportsRequest = () => async (dispatch) => {
  dispatch(getAirportsRequest());
  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${api_url}/airports`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.data?.data && Array.isArray(response.data.data)) {
      dispatch(getAirportsSuccess(response.data.data));
    } else {
      throw new Error("Invalid data format from API");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to fetch airports";
    dispatch(getAirportsFailure(String(errorMessage)));
  }
};

// --- Hotel Actions ---
export const fetchHotels = () => async (dispatch) => {
  dispatch(getHotelsRequest());
  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${api_url}/hotels`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.data?.data && Array.isArray(response.data.data)) {
      dispatch(getHotelsSuccess(response.data.data));
    } else if (response.data?.message === "Success" && response.data?.data === null) {
      dispatch(getHotelsSuccess([]));
    } else {
      throw new Error("Format data tidak valid dari API untuk hotels");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Gagal mengambil data hotel";
    dispatch(getHotelsFailure(String(errorMessage)));
  }
};

export const fetchHotelById = (hotelId) => async (dispatch) => {
  dispatch(getHotelByIdRequest());
  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${api_url}/hotel/data/${hotelId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.data?.message === "Success" && response.data?.data) {
      dispatch(getHotelByIdSuccess(response.data.data));
    } else {
      throw new Error(response.data?.message || "Format data tidak valid dari API untuk detail hotel");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Gagal mengambil detail data hotel";
    dispatch(getHotelByIdFailure(String(errorMessage)));
  }
};

export const createHotel = (hotelFormData) => async (dispatch) => {
  dispatch(createHotelRequest());
  try {
    const token = Cookies.get("token");
    const response = await axios.post(`${api_url}/hotel`, hotelFormData, {
      headers: { Authorization: `Bearer ${token}` }, // Axios akan mengatur Content-Type untuk FormData
    });
    if (response.data?.data) {
      dispatch(createHotelSuccess(response.data.data));
    } else {
      throw new Error("Invalid data format from API on create hotel");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to create hotel";
    dispatch(createHotelFailure(String(errorMessage)));
  }
};

export const updateHotel = (hotelFormData) => async (dispatch) => {
  dispatch(updateHotelRequest());
  try {
    const token = Cookies.get("token");
    const response = await axios.patch(`${api_url}/hotel`, hotelFormData, {
      headers: { Authorization: `Bearer ${token}` }, // Axios akan mengatur Content-Type untuk FormData
    });
    if (response.data?.data) {
      dispatch(updateHotelSuccess(response.data.data));
    } else {
      throw new Error("Invalid data format from API on update hotel");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to update hotel";
    dispatch(updateHotelFailure(String(errorMessage)));
  }
};

export const deleteHotel = (hotelId) => async (dispatch) => {
  dispatch(deleteHotelRequest());
  try {
    const token = Cookies.get("token");
    const payload = { hotelId: hotelId };
    await axios.delete(`${api_url}/hotel`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    });
    dispatch(deleteHotelSuccess(hotelId));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to delete hotel from action";
    dispatch(deleteHotelFailure(String(errorMessage)));
  }
};

export const clearDeleteHotelError = () => (dispatch) => {
  dispatch(clearDeleteHotelErrorRequest());
};

// --- Location Actions ---
export const fetchLocations = () => async (dispatch) => {
  dispatch(getLocationsRequest());
  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${api_url}/locations`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    if (response.data?.message === "Success" && Array.isArray(response.data.data)) {
      dispatch(getLocationsSuccess(response.data.data));
    } else if (response.data?.message === "Success" && response.data?.data === null) {
      dispatch(getLocationsSuccess([]));
    }
    else {
      throw new Error("Invalid data format from API for locations");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to fetch locations";
    dispatch(getLocationsFailure(String(errorMessage)));
  }
};

// --- Room Actions ---
export const fetchRooms = (hotelId) => async (dispatch) => {
  dispatch(getRoomsRequest());
  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${api_url}/rooms/${hotelId}`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    if (response.data?.message === "Success" && Array.isArray(response.data.data)) {
      dispatch(getRoomsSuccess(response.data.data));
    } else if (response.data?.message === "Success" && response.data?.data === null) {
      dispatch(getRoomsSuccess([]));
    } else {
      throw new Error(response.data?.message || "Format data tidak valid dari API untuk rooms");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Gagal mengambil data kamar";
    dispatch(getRoomsFailure(String(errorMessage)));
  }
};

export const updateRoomStatus = (roomId, hotelIdForContext, newStatus) => async (dispatch) => {
  dispatch(updateRoomStatusRequest({ roomId }));
  try {
    const token = Cookies.get("token");
    const targetUrl = `${api_url}/rooms/${roomId}`;
    const response = await axios.patch(targetUrl,
      { status: newStatus },
      {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      }
    );
    if (response.data?.message === "Success" && response.data?.data) {
      dispatch(updateRoomStatusSuccess(response.data.data));
    } else if (response.data?.message === "Success") {
        dispatch(updateRoomStatusSuccess({ id: roomId, status: newStatus, hotelId: hotelIdForContext }));
    }
    else {
      throw new Error(response.data?.message || "Gagal memperbarui status kamar dari API");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Gagal memperbarui status kamar";
    dispatch(updateRoomStatusFailure({ roomId, error: String(errorMessage) }));
  }
};

// Action baru untuk delete room
export const deleteRoom = (roomId) => async (dispatch) => {
  console.log("deleteRoom ACTION FIRED with roomId:", roomId);
  dispatch(deleteRoomRequest());
  try {
    const token = Cookies.get("token");
    const payload = { roomId: roomId }; // Sesuai dengan body request yang diminta
    console.log("[ACTION] Attempting DELETE /room. roomId:", roomId, "Token present:", !!token);
    console.log("[ACTION] Request Body for DELETE /room:", payload);

    const response = await axios.delete(`${api_url}/room`, { // Endpoint adalah /room
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload, // Mengirim roomId dalam body
    });

    console.log("[ACTION] Delete room response:", response.data);
    if (response.data?.message.toLowerCase() === "success") {
      dispatch(deleteRoomSuccess(roomId)); // Mengirim roomId agar reducer tahu kamar mana yang dihapus
    } else {
      throw new Error(response.data?.message || "Gagal menghapus kamar dari API");
    }
  } catch (error) {
    console.error("Delete Room API Error:", error.response || error);
    if (error.response) {
      console.error("Delete Room API Error Response Data:", error.response.data);
      console.error("Delete Room API Error Response Status:", error.response.status);
    }
    const errorMessage = error.response?.data?.message || error.message || "Gagal menghapus kamar";
    dispatch(deleteRoomFailure(String(errorMessage)));
  }
};

// Action baru untuk membersihkan error delete room (opsional)
export const clearDeleteRoomError = () => (dispatch) => {
  dispatch(clearDeleteRoomErrorRequest());
};