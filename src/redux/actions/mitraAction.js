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
//   deleteRoomRequest, // <-- Tambahkan ini
//   deleteRoomSuccess, // <-- Tambahkan ini
//   deleteRoomFailure, // <-- Tambahkan ini
//   clearDeleteRoomErrorRequest, // <-- Tambahkan ini (opsional, untuk membersihkan error)
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
//     const response = await axios.post(`${api_url}/flight`, flightData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });
//     dispatch(createFlightSuccess(response.data.data));
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || error.message || "Failed to create flight";
//     dispatch(createFlightFailure(String(errorMessage)));
//   }
// };

// // --- Airport Actions ---
// export const fetchAirportsRequest = () => async (dispatch) => {
//   dispatch(getAirportsRequest());
//   try {
//     const token = Cookies.get("token");
//     const response = await axios.get(`${api_url}/airports`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });
//     if (response.data?.data && Array.isArray(response.data.data)) {
//       dispatch(getAirportsSuccess(response.data.data));
//     } else {
//       throw new Error("Invalid data format from API");
//     }
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || error.message || "Failed to fetch airports";
//     dispatch(getAirportsFailure(String(errorMessage)));
//   }
// };

// // --- Hotel Actions ---
// export const fetchHotels = () => async (dispatch) => {
//   dispatch(getHotelsRequest());
//   try {
//     const token = Cookies.get("token");
//     const response = await axios.get(`${api_url}/hotels`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (response.data?.data && Array.isArray(response.data.data)) {
//       dispatch(getHotelsSuccess(response.data.data));
//     } else if (response.data?.message === "Success" && response.data?.data === null) {
//       dispatch(getHotelsSuccess([]));
//     } else {
//       throw new Error("Format data tidak valid dari API untuk hotels");
//     }
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || error.message || "Gagal mengambil data hotel";
//     dispatch(getHotelsFailure(String(errorMessage)));
//   }
// };

// export const fetchHotelById = (hotelId) => async (dispatch) => {
//   dispatch(getHotelByIdRequest());
//   try {
//     const token = Cookies.get("token");
//     const response = await axios.get(`${api_url}/hotel/data/${hotelId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (response.data?.message === "Success" && response.data?.data) {
//       dispatch(getHotelByIdSuccess(response.data.data));
//     } else {
//       throw new Error(response.data?.message || "Format data tidak valid dari API untuk detail hotel");
//     }
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || error.message || "Gagal mengambil detail data hotel";
//     dispatch(getHotelByIdFailure(String(errorMessage)));
//   }
// };

// export const createHotel = (hotelFormData) => async (dispatch) => {
//   dispatch(createHotelRequest());
//   try {
//     const token = Cookies.get("token");
//     const response = await axios.post(`${api_url}/hotel`, hotelFormData, {
//       headers: { Authorization: `Bearer ${token}` }, // Axios akan mengatur Content-Type untuk FormData
//     });
//     if (response.data?.data) {
//       dispatch(createHotelSuccess(response.data.data));
//     } else {
//       throw new Error("Invalid data format from API on create hotel");
//     }
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || error.message || "Failed to create hotel";
//     dispatch(createHotelFailure(String(errorMessage)));
//   }
// };

// export const updateHotel = (hotelFormData) => async (dispatch) => {
//   dispatch(updateHotelRequest());
//   try {
//     const token = Cookies.get("token");
//     const response = await axios.patch(`${api_url}/hotel`, hotelFormData, {
//       headers: { Authorization: `Bearer ${token}` }, // Axios akan mengatur Content-Type untuk FormData
//     });
//     if (response.data?.data) {
//       dispatch(updateHotelSuccess(response.data.data));
//     } else {
//       throw new Error("Invalid data format from API on update hotel");
//     }
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || error.message || "Failed to update hotel";
//     dispatch(updateHotelFailure(String(errorMessage)));
//   }
// };

// export const deleteHotel = (hotelId) => async (dispatch) => {
//   dispatch(deleteHotelRequest());
//   try {
//     const token = Cookies.get("token");
//     const payload = { hotelId: hotelId };
//     await axios.delete(`${api_url}/hotel`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       data: payload,
//     });
//     dispatch(deleteHotelSuccess(hotelId));
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || error.message || "Failed to delete hotel from action";
//     dispatch(deleteHotelFailure(String(errorMessage)));
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
//     const errorMessage = error.response?.data?.message || error.message || "Failed to fetch locations";
//     dispatch(getLocationsFailure(String(errorMessage)));
//   }
// };

// // --- Room Actions ---
// export const fetchRooms = (hotelId) => async (dispatch) => {
//   dispatch(getRoomsRequest());
//   try {
//     const token = Cookies.get("token");
//     const response = await axios.get(`${api_url}/rooms/${hotelId}`, {
//       headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//     });
//     if (response.data?.message === "Success" && Array.isArray(response.data.data)) {
//       dispatch(getRoomsSuccess(response.data.data));
//     } else if (response.data?.message === "Success" && response.data?.data === null) {
//       dispatch(getRoomsSuccess([]));
//     } else {
//       throw new Error(response.data?.message || "Format data tidak valid dari API untuk rooms");
//     }
//   } catch (error) {
//     console.error("mitraAction - fetchRooms: Error di catch block. Error:", error); // LOG 11 (dari instruksi sebelumnya)
//     console.error("mitraAction - fetchRooms: Error response data (jika ada):", error.response?.data); // LOG 12 (dari instruksi sebelumnya)
//     console.error("mitraAction - fetchRooms: Error message:", error.message); // LOG 13 (dari instruksi sebelumnya)
//     dispatch(getRoomsFailure(error.response?.data?.message || error.message || "Gagal mengambil data kamar"));
//   }
// };


// // Action baru untuk membersihkan error delete room (opsional)
// export const clearDeleteRoomError = () => (dispatch) => {
//   dispatch(clearDeleteRoomErrorRequest());
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
  deleteHotelImageRequest,
  deleteHotelImageSuccess,
  deleteHotelImageFailure,
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
  deleteRoomRequest,
  deleteRoomSuccess,
  deleteRoomFailure,
  clearDeleteRoomErrorRequest,
  getRoomTypesRequest,
  getRoomTypesSuccess,
  getRoomTypesFailure,
  createRoomRequest,
  createRoomSuccess,
  createRoomFailure,
  resetCreateRoomStatus,
  // Import new room type create actions
  createRoomTypeRequest,
  createRoomTypeSuccess,
  createRoomTypeFailure,
  resetCreateRoomTypeStatus,
  // Import new facility create actions
  createFacilityRequest,
  createFacilitySuccess,
  createFacilityFailure,
  resetCreateFacilityStatus,
  // Import new customer actions
  getCustomersRequest,
  getCustomersSuccess,
  getCustomersFailure,
} from "../reducers/mitraReducer";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

// --- Airline Actions (Mitra) ---
export const fetchMitraRequest = (mitraId) => async (dispatch) => {
  dispatch(getMitraRequest());
  try {
    const token = Cookies.get("token");
    // Pastikan mitraId tersedia sebelum membuat request
    const url = mitraId
      ? `${api_url}/airlines?mitraId=${mitraId}`
      : `${api_url}/airlines`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
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
  } catch (error)
 {
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
export const fetchHotels = (mitraId) => async (dispatch) => {
  dispatch(getHotelsRequest());
  try {
    const token = Cookies.get("token");
    // Pastikan mitraId tersedia sebelum membuat request
    const url = mitraId
      ? `${api_url}/hotels?mitraId=${mitraId}`
      : `${api_url}/hotels`;

    const response = await axios.get(url, {
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
  console.log(`[ACTION] fetchHotelById called with hotelId: ${hotelId}`);
  dispatch(getHotelByIdRequest());
  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${api_url}/hotel/data/${hotelId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("[ACTION] fetchHotelById - API Response:", response);
    // Tambahkan log untuk melihat apa isi response.data.data sebelum dispatch
    console.log("[ACTION] fetchHotelById - API Response data.data:", response.data?.data);

    if (response.data?.message === "Success" && response.data?.data) {
      dispatch(getHotelByIdSuccess(response.data.data));
    } else {
      // Kondisi ini akan memicu error jika message bukan "Success" atau jika data.data kosong/null
      // meskipun status HTTP mungkin 200 OK.
      console.warn("[ACTION] fetchHotelById - Condition for success not met or data is null/empty. Response message:", response.data?.message);
      throw new Error(response.data?.message || "Format data tidak valid dari API untuk detail hotel (atau data hotel tidak ditemukan)");
    }
  } catch (error) {
    console.error("[ACTION] fetchHotelById - Error caught:", error);
    const errorMessage = error.response?.data?.message || error.message || "Gagal mengambil detail data hotel";
    dispatch(getHotelByIdFailure(String(errorMessage)));
  }
};

export const createHotel = (hotelFormData) => async (dispatch) => {
  dispatch(createHotelRequest());
  try {
    const token = Cookies.get("token");
    const response = await axios.post(`${api_url}/hotel`, hotelFormData, {
      headers: { Authorization: `Bearer ${token}` },
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
      headers: { Authorization: `Bearer ${token}` },
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

// --- Hotel Image Actions ---
export const deleteHotelImage = (imageId, hotelId) => async (dispatch) => {
  console.log(`[ACTION] deleteHotelImage called with imageId: ${imageId}, hotelId: ${hotelId}`);
  dispatch(deleteHotelImageRequest());
  try {
    const token = Cookies.get("token");
    const response = await axios.delete(`${api_url}/hotelImage/${imageId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("[ACTION] deleteHotelImage - API Response:", response);
    if (response.data?.message?.toLowerCase() === "deleted successful") {
      dispatch(deleteHotelImageSuccess({ imageId, hotelId }));
    } else {
      console.warn("[ACTION] deleteHotelImage - Condition for success not met. Response message:", response.data?.message);
      throw new Error(response.data?.message || "Failed to delete hotel image due to unexpected API response");
    }
  } catch (error) {
    console.error("[ACTION] deleteHotelImage - Error caught:", error);
    // Log detail error dari server jika ada
    if (error.response) {
      console.error("[ACTION] deleteHotelImage - Server Error Response Data:", error.response.data);
      console.error("[ACTION] deleteHotelImage - Server Error Response Status:", error.response.status);
    }
    const errorMessage = error.response?.data?.message || error.message || "Failed to delete hotel image";
    dispatch(deleteHotelImageFailure(String(errorMessage)));
  }
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

// --- Room Actions (Existing: Fetch, Update Status, Delete) ---
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

export const deleteRoom = (roomId) => async (dispatch) => {
  dispatch(deleteRoomRequest());
  try {
    const token = Cookies.get("token");
    const payload = { roomId: roomId };

    const response = await axios.delete(`${api_url}/room`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    });

    if (response.data?.message.toLowerCase() === "success") {
      dispatch(deleteRoomSuccess(roomId));
    } else {
      throw new Error(response.data?.message || "Gagal menghapus kamar dari API");
    }
  } catch (error) {
    console.error("Delete Room API Error:", error.response || error);
    if (error.response) {
      console.error("Delete Room API Error Response Data:", error.response.data);
    }
    const errorMessage = error.response?.data?.message || error.message || "Gagal menghapus kamar";
    dispatch(deleteRoomFailure(String(errorMessage)));
  }
};

export const clearDeleteRoomError = () => (dispatch) => {
  dispatch(clearDeleteRoomErrorRequest());
};

// --- Room Type Actions (Fetch - Existing) ---
export const fetchRoomTypes = (hotelId) => async (dispatch) => {
  dispatch(getRoomTypesRequest());
  try {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Authentication token not found.");
    }
    const response = await axios.get(`${api_url}/roomType/${hotelId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.data?.message === "Success" && Array.isArray(response.data.data)) {
      dispatch(getRoomTypesSuccess(response.data.data));
    } else if (response.data?.message === "Success" && response.data?.data === null) {
      dispatch(getRoomTypesSuccess([]));
    } else {
      throw new Error(response.data?.message || "Invalid data format from API for room types");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to fetch room types";
    dispatch(getRoomTypesFailure(String(errorMessage)));
  }
};

// --- Room (Create) Action (Existing) ---
export const createRoom = (roomData) => async (dispatch) => {
  dispatch(createRoomRequest());
  try {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Authentication token not found.");
    }
    const headers = { Authorization: `Bearer ${token}` };
    if (!(roomData instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }
    const response = await axios.post(`${api_url}/room`, roomData, { headers });
    if (response.data?.message === "Success" && response.data?.data) {
      dispatch(createRoomSuccess(response.data.data));
    } else if (response.data?.data) {
        dispatch(createRoomSuccess(response.data.data));
    }
    else {
      throw new Error(response.data?.message || "Failed to create room or invalid response format from API");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to create room";
    dispatch(createRoomFailure(String(errorMessage)));
  }
};

export const resetCreateRoomState = () => (dispatch) => {
    dispatch(resetCreateRoomStatus());
};


// --- Room Type (Create) Action (NEW) ---
export const createRoomType = (roomTypeData) => async (dispatch) => {
  dispatch(createRoomTypeRequest());
  try {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Authentication token not found.");
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const response = await axios.post(`${api_url}/roomType`, roomTypeData, { headers });
    if (response.data?.message === "Success" && response.data?.data) {
      dispatch(createRoomTypeSuccess(response.data.data));
    } else if (response.data?.data) { // Handle cases where 'message' might be missing but 'data' is present
        dispatch(createRoomTypeSuccess(response.data.data));
    } else {
      throw new Error(response.data?.message || "Failed to create room type or invalid response format from API");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to create room type";
    dispatch(createRoomTypeFailure(String(errorMessage)));
  }
};

// Action to reset create room type status (NEW)
export const resetCreateRoomTypeState = () => (dispatch) => {
    dispatch(resetCreateRoomTypeStatus());
};

// --- Facility (Create) Action (NEW) ---
export const createFacility = (facilityData) => async (dispatch) => {
  dispatch(createFacilityRequest());
  try {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Authentication token not found.");
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const response = await axios.post(`${api_url}/facility`, facilityData, { headers });
    if (response.data?.message === "Success" && response.data?.data) {
      dispatch(createFacilitySuccess(response.data.data));
    } else if (response.data?.data) { // Handle cases where 'message' might be missing but 'data' is present
        dispatch(createFacilitySuccess(response.data.data));
    }
    else {
      throw new Error(response.data?.message || "Failed to create facility or invalid response format from API");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to create facility";
    dispatch(createFacilityFailure(String(errorMessage)));
  }
};

// Action to reset create facility status (NEW)
export const resetCreateFacilityState = () => (dispatch) => {
    dispatch(resetCreateFacilityStatus());
};

// --- Customer Actions (NEW) ---
export const fetchCustomers = (hotelId) => async (dispatch) => {
  dispatch(getCustomersRequest());
  try {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Authentication token not found.");
    }
    if (!hotelId) {
      throw new Error("Hotel ID is required to fetch customers.");
    }
    const response = await axios.get(`${api_url}/customers?hotelId=${hotelId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.data?.success && Array.isArray(response.data.data)) {
      dispatch(getCustomersSuccess(response.data.data));
    } else if (response.data?.success && response.data.data === null) { // Handle case where data is null but success is true
      dispatch(getCustomersSuccess([]));
    }
    else {
      throw new Error(response.data?.message || "Invalid data format from API for customers");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to fetch customers";
    dispatch(getCustomersFailure(String(errorMessage)));
  }
};