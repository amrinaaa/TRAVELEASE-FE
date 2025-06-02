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
// } from "../reducers/mitraReducer";  // Sesuaikan path jika perlu

// const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

// // ... (kode untuk fetchMitraRequest, createMitra, deleteMitra (airline), updateMitra, dll. tetap sama) ...
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
//     dispatch(getMitraFailure(error.response?.data?.message || error.message || "Failed to fetch airlines"));
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
//     dispatch(createMitraFailure(error.response?.data?.message || error.message || "Failed to create airline"));
//   }
// };

// //This deleteMitra seems to be for airlines, keeping as is.
// export const deleteMitra = (airlineId) => async (dispatch) => {
//   dispatch(deleteAirlineMitraRequest()); // Using alias
//   try {
//     const token = Cookies.get("token");
//     await axios.delete(`${api_url}/airline`, {
//       headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//       data: { airlineId: airlineId },
//     });
//     dispatch(deleteAirlineMitraSuccess(airlineId)); // Using alias
//   } catch (error) {
//     dispatch(deleteAirlineMitraFailure(error.response?.data?.message || error.message || "Failed to delete airline")); // Using alias
//   }
// };

// // Ganti nama jika ada konflik dengan deleteHotel (Original had deleteMitra and deleteAirline)
// // Assuming deleteAirline is the intended one based on naming consistency with aliases.
// export const deleteAirline = (airlineId) => async (dispatch) => {
//   dispatch(deleteAirlineMitraRequest());
//   try {
//     const token = Cookies.get("token");
//     await axios.delete(`${api_url}/airline`, {
//       headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//       data: { airlineId: airlineId },
//     });
//     dispatch(deleteAirlineMitraSuccess(airlineId));
//   } catch (error) {
//     dispatch(deleteAirlineMitraFailure(error.response?.data?.message || error.message || "Failed to delete airline"));
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
//     dispatch(updateMitraFailure(error.response?.data?.message || error.message || "Failed to update airline"));
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
//     dispatch(getPlanesFailure(error.response?.data?.message || error.message || "Failed to fetch planes"));
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
//     dispatch(deletePlaneFailure(error.response?.data?.message || error.message || "Failed to delete plane"));
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
//     dispatch(createPlaneFailure(error.response?.data?.message || error.message || "Failed to create plane"));
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
//     dispatch(getPlaneTypesFailure(error.response?.data?.message || error.message || "Failed to fetch plane types"));
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
//     dispatch(createPlaneTypeFailure(error.response?.data?.message || error.message || "Failed to create plane type"));
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
//     dispatch(getSeatsFailure(error.response?.data?.message || error.message || "Failed to fetch seats"));
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
//     dispatch(deleteSeatFailure(error.response?.data?.message || error.message || "Failed to delete seat"));
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
//     dispatch(createSeatsFailure(error.response?.data?.message || error.message || "Failed to create seats"));
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
//     dispatch(getSeatCategoriesFailure(error.response?.data?.message || error.message || "Failed to fetch seat categories"));
//   }
// };

// // --- Hotel Actions ---
// export const fetchHotels = () => async (dispatch) => {
//   console.log("mitraAction: fetchHotels dipanggil"); // LOG E.1
//   dispatch(getHotelsRequest());
//   try {
//     const token = Cookies.get("token");
//     console.log("mitraAction - fetchHotels: Token:", token ? "Ada" : "TIDAK ADA"); // LOG E.2
//     const response = await axios.get(`${api_url}/hotels`, { 
//       headers: { Authorization: `Bearer ${token}` }, 
//     });
//     console.log("mitraAction - fetchHotels: Respons API:", response.data); // LOG E.3
//     if (response.data?.data && Array.isArray(response.data.data)) {
//       dispatch(getHotelsSuccess(response.data.data));
//     } else if (response.data?.message === "Success" && response.data?.data === null) {
//       dispatch(getHotelsSuccess([]));
//     } else {
//       console.error("mitraAction - fetchHotels: Format data tidak valid:", response.data); // LOG E.4
//       throw new Error("Format data tidak valid dari API untuk hotels");
//     }
//   } catch (error) {
//     console.error("mitraAction - fetchHotels: Error di catch block:", error); // LOG E.5
//     dispatch(getHotelsFailure(error.response?.data?.message || error.message || "Gagal mengambil data hotel"));
//   }
// };

// export const createHotel = (hotelFormData) => async (dispatch) => {
//   dispatch(createHotelRequest());
//   try {
//     const token = Cookies.get("token");
//     const response = await axios.post(`${api_url}/hotel`, hotelFormData, {
//       headers: { Authorization: `Bearer ${token}` }, // Content-Type might be multipart/form-data if hotelFormData includes files
//     });
//     if (response.data?.data) {
//       dispatch(createHotelSuccess(response.data.data));
//     } else {
//       throw new Error("Invalid data format from API on create hotel");
//     }
//   } catch (error) {
//     console.error("Create Hotel Error:", error.response || error);
//     dispatch(createHotelFailure(error.response?.data?.message || error.message || "Failed to create hotel"));
//   }
// };

// export const clearCreateHotelStatus = () => (dispatch) => {
//   // Assuming resetCreateHotelStatus is defined in mitraReducer and exported
//   // If not, you might need to define it or use existing error/success clearing actions.
//   // For now, this will cause an error if resetCreateHotelStatus is not defined.
//   // dispatch(resetCreateHotelStatus());
// };

// export const updateHotel = (hotelFormData) => async (dispatch) => {
//   dispatch(updateHotelRequest());
//   try {
//     const token = Cookies.get("token");
//     const response = await axios.patch(`${api_url}/hotel`, hotelFormData, {
//       headers: { Authorization: `Bearer ${token}` }, // Content-Type might be multipart/form-data
//     });
//     if (response.data?.data) {
//       dispatch(updateHotelSuccess(response.data.data));
//     } else {
//       throw new Error("Invalid data format from API on update hotel");
//     }
//   } catch (error) {
//     console.error("Update Hotel Error:", error.response || error);
//     dispatch(updateHotelFailure(error.response?.data?.message || error.message || "Failed to update hotel"));
//   }
// };

// export const deleteHotel = (hotelId) => async (dispatch) => {
//   console.log("deleteHotel ACTION FIRED with hotelId:", hotelId);
//   dispatch(deleteHotelRequest());
//   try {
//     const token = Cookies.get("token");
//     console.log(`[ACTION] Attempting DELETE /hotel. hotelId: ${hotelId}. Token present: ${!!token}`);
//     const payload = { hotelId: hotelId };
//     console.log("[ACTION] Request Body:", payload);

//     await axios.delete(`${api_url}/hotel`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       data: payload,
//     });
//     console.log("[ACTION] Delete request successful for hotelId:", hotelId);
//     dispatch(deleteHotelSuccess(hotelId));
//   } catch (error) {
//     if (error.response) {
//       console.error("Delete Hotel API Error Response Data:", error.response.data);
//       console.error("Delete Hotel API Error Response Status:", error.response.status);
//       console.error("Delete Hotel API Error Response Headers:", error.response.headers);
//     } else if (error.request) {
//       console.error("Delete Hotel API No Response:", error.request);
//     } else {
//       console.error("Delete Hotel API Request Setup Error:", error.message);
//     }
//     const errorMessage = error.response?.data?.message || error.message || "Failed to delete hotel from action";
//     dispatch(deleteHotelFailure(errorMessage));
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
//       dispatch(getLocationsSuccess([])); // Handle case where data is null but success
//     }
//     else {
//       throw new Error("Invalid data format from API for locations");
//     }
//   } catch (error) {
//     console.error("Fetch Locations Error:", error.response || error);
//     dispatch(getLocationsFailure(error.response?.data?.message || error.message || "Failed to fetch locations"));
//   }
// };

// // --- Room Actions ---
// export const fetchRooms = (hotelId) => async (dispatch) => {
//   console.log("mitraAction: fetchRooms dipanggil dengan hotelId:", hotelId); // LOG 4 (dari instruksi sebelumnya)
//   dispatch(getRoomsRequest());
//   try {
//     const token = Cookies.get("token");
//     console.log("mitraAction - fetchRooms: Token untuk fetchRooms:", token ? "Ada" : "TIDAK ADA"); // LOG 5 (dari instruksi sebelumnya)
//     const response = await axios.get(`${api_url}/rooms/${hotelId}`, { 
//       headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, 
//     });
//     console.log("mitraAction - fetchRooms: Respons API mentah untuk /rooms:", response); // LOG 6 (dari instruksi sebelumnya)
//     console.log("mitraAction - fetchRooms: Respons API data untuk /rooms:", response.data); // LOG 7 (dari instruksi sebelumnya)

//     if (response.data?.message === "Success" && Array.isArray(response.data.data)) {
//       console.log("mitraAction - fetchRooms: Dispatching getRoomsSuccess dengan data:", response.data.data); // LOG 8 (dari instruksi sebelumnya)
//       dispatch(getRoomsSuccess(response.data.data));
//     } else if (response.data?.message === "Success" && response.data?.data === null) {
//       console.log("mitraAction - fetchRooms: Dispatching getRoomsSuccess dengan array kosong (data dari API null)"); // LOG 9 (dari instruksi sebelumnya)
//       dispatch(getRoomsSuccess([]));
//     } else {
//       console.error("mitraAction - fetchRooms: Respons API /rooms TIDAK SESUAI kondisi sukses. response.data:", response.data); // LOG 10 (dari instruksi sebelumnya)
//       throw new Error(response.data?.message || "Format data tidak valid dari API untuk rooms");
//     }
//   } catch (error) {
//     console.error("mitraAction - fetchRooms: Error di catch block. Error:", error); // LOG 11 (dari instruksi sebelumnya)
//     console.error("mitraAction - fetchRooms: Error response data (jika ada):", error.response?.data); // LOG 12 (dari instruksi sebelumnya)
//     console.error("mitraAction - fetchRooms: Error message:", error.message); // LOG 13 (dari instruksi sebelumnya)
//     dispatch(getRoomsFailure(error.response?.data?.message || error.message || "Gagal mengambil data kamar"));
//   }
// };


// mitraAction.js
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

// --- Hotel Actions ---
export const fetchHotels = () => async (dispatch) => {
  console.log("mitraAction: fetchHotels dipanggil");
  dispatch(getHotelsRequest());
  try {
    const token = Cookies.get("token");
    console.log("mitraAction - fetchHotels: Token:", token ? "Ada" : "TIDAK ADA");
    const response = await axios.get(`${api_url}/hotels`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("mitraAction - fetchHotels: Respons API:", response.data);
    if (response.data?.data && Array.isArray(response.data.data)) {
      dispatch(getHotelsSuccess(response.data.data));
    } else if (response.data?.message === "Success" && response.data?.data === null) {
      dispatch(getHotelsSuccess([]));
    } else {
      console.error("mitraAction - fetchHotels: Format data tidak valid:", response.data);
      throw new Error("Format data tidak valid dari API untuk hotels");
    }
  } catch (error) {
    console.error("mitraAction - fetchHotels: Error di catch block:", error);
    const errorMessage = error.response?.data?.message || error.message || "Gagal mengambil data hotel";
    dispatch(getHotelsFailure(String(errorMessage)));
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
    console.error("Create Hotel Error:", error.response || error);
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
    console.error("Update Hotel Error:", error.response || error);
    const errorMessage = error.response?.data?.message || error.message || "Failed to update hotel";
    dispatch(updateHotelFailure(String(errorMessage)));
  }
};

export const deleteHotel = (hotelId) => async (dispatch) => {
  console.log("deleteHotel ACTION FIRED with hotelId:", hotelId);
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
    console.error("Delete Hotel API Error:", error.response || error);
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
    console.error("Fetch Locations Error:", error.response || error);
    const errorMessage = error.response?.data?.message || error.message || "Failed to fetch locations";
    dispatch(getLocationsFailure(String(errorMessage)));
  }
};

// --- Room Actions ---
export const fetchRooms = (hotelId) => async (dispatch) => {
  console.log("mitraAction: fetchRooms dipanggil dengan hotelId:", hotelId);
  dispatch(getRoomsRequest());
  try {
    const token = Cookies.get("token");
    console.log("mitraAction - fetchRooms: Token untuk fetchRooms:", token ? "Ada" : "TIDAK ADA");
    const response = await axios.get(`${api_url}/rooms/${hotelId}`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    console.log("mitraAction - fetchRooms: Respons API mentah untuk /rooms:", response);
    console.log("mitraAction - fetchRooms: Respons API data untuk /rooms:", response.data);

    if (response.data?.message === "Success" && Array.isArray(response.data.data)) {
      console.log("mitraAction - fetchRooms: Dispatching getRoomsSuccess dengan data:", response.data.data);
      dispatch(getRoomsSuccess(response.data.data));
    } else if (response.data?.message === "Success" && response.data?.data === null) {
      console.log("mitraAction - fetchRooms: Dispatching getRoomsSuccess dengan array kosong (data dari API null)");
      dispatch(getRoomsSuccess([]));
    } else {
      console.error("mitraAction - fetchRooms: Respons API /rooms TIDAK SESUAI kondisi sukses. response.data:", response.data);
      throw new Error(response.data?.message || "Format data tidak valid dari API untuk rooms");
    }
  } catch (error) {
    console.error("mitraAction - fetchRooms: Error di catch block. Error:", error);
    console.error("mitraAction - fetchRooms: Error response data (jika ada):", error.response?.data);
    console.error("mitraAction - fetchRooms: Error message:", error.message);
    const errorMessage = error.response?.data?.message || error.message || "Gagal mengambil data kamar";
    dispatch(getRoomsFailure(String(errorMessage)));
  }
};

export const updateRoomStatus = (roomId, hotelIdForContext, newStatus) => async (dispatch) => {
  console.log(`mitraAction: updateRoomStatus. roomId: ${roomId}, hotelIdForContext: ${hotelIdForContext}, newStatus: ${newStatus}`);
  dispatch(updateRoomStatusRequest({ roomId }));
  try {
    const token = Cookies.get("token");
    const targetUrl = `${api_url}/rooms/${roomId}`; // URL yang akan di-PATCH
    console.log(`mitraAction - updateRoomStatus: Mencoba PATCH ke URL: ${targetUrl} dengan status: ${newStatus}`); // LOG BARU untuk URL dan status
    
    const response = await axios.patch(targetUrl,
      { status: newStatus }, // Body request
      {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      }
    );
    console.log("mitraAction - updateRoomStatus: Respons API data:", response.data);

    if (response.data?.message === "Success" && response.data?.data) {
      console.log("mitraAction - updateRoomStatus: Dispatching updateRoomStatusSuccess dengan data:", response.data.data);
      dispatch(updateRoomStatusSuccess(response.data.data));
    } else if (response.data?.message === "Success") {
        console.log("mitraAction - updateRoomStatus: Sukses, API tidak return data kamar. Membuat data lokal.");
        dispatch(updateRoomStatusSuccess({ id: roomId, status: newStatus, hotelId: hotelIdForContext }));
    }
    else {
      console.error("mitraAction - updateRoomStatus: Respons API TIDAK SESUAI kondisi sukses. response.data:", response.data);
      throw new Error(response.data?.message || "Gagal memperbarui status kamar dari API");
    }
  } catch (error) {
    console.error("mitraAction - updateRoomStatus: Error di catch block:", error);
    // Menambahkan log untuk detail error Axios yang lebih spesifik
    if (error.response) {
      // Server merespons dengan status code di luar rentang 2xx
      console.error("mitraAction - updateRoomStatus: Error data:", error.response.data);
      console.error("mitraAction - updateRoomStatus: Error status:", error.response.status);
      console.error("mitraAction - updateRoomStatus: Error headers:", error.response.headers);
    } else if (error.request) {
      // Permintaan dibuat tapi tidak ada respons yang diterima
      console.error("mitraAction - updateRoomStatus: Tidak ada respons dari server:", error.request);
    } else {
      // Sesuatu terjadi saat menyiapkan permintaan yang memicu Error
      console.error("mitraAction - updateRoomStatus: Error saat menyiapkan permintaan:", error.message);
    }
    const errorMessage = error.response?.data?.message || error.message || "Gagal memperbarui status kamar";
    dispatch(updateRoomStatusFailure({ roomId, error: String(errorMessage) }));
  }
};