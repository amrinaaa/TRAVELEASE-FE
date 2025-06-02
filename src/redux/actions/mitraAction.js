// import axios from "axios";
// import Cookies from "js-cookie";
// import {
//   // ... (semua impor action type/creator Anda yang lain) ...
//   getMitraRequest,
//   getMitraSuccess,
//   getMitraFailure,
//   createMitraRequest,
//   createMitraSuccess,
//   createMitraFailure,
//   deleteMitraRequest as deleteAirlineMitraRequest, // Alias untuk menghindari konflik nama jika ada
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
//   deleteHotelRequest, // <--- PASTIKAN INI DIIMPOR
//   deleteHotelSuccess, // <--- PASTIKAN INI DIIMPOR
//   deleteHotelFailure, // <--- PASTIKAN INI DIIMPOR
//   clearDeleteHotelErrorRequest,
//   // Action types for locations
//   getLocationsRequest,
//   getLocationsSuccess,
//   getLocationsFailure,
// } from "../reducers/mitraReducer"; // Sesuaikan path jika perlu

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

// export const deleteMitra = (airlineId) => async (dispatch) => {
//   dispatch(deleteMitraRequest());
//   try {
//     const token = Cookies.get("token");
//     await axios.delete(`${api_url}/airline`, {
//       headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//       data: { airlineId: airlineId },
//     });
//     dispatch(deleteMitraSuccess(airlineId));
//   } catch (error) {
//     dispatch(deleteMitraFailure(error.response?.data?.message || error.message));
//   }
// };

// // Ganti nama jika ada konflik dengan deleteHotel
// export const deleteAirline = (airlineId) => async (dispatch) => {
//   dispatch(deleteAirlineMitraRequest()); // Menggunakan alias jika perlu
//   try {
//     const token = Cookies.get("token");
//     await axios.delete(`${api_url}/airline`, {
//       headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//       data: { airlineId: airlineId },
//     });
//     dispatch(deleteAirlineMitraSuccess(airlineId)); // Menggunakan alias jika perlu
//   } catch (error) {
//     dispatch(deleteAirlineMitraFailure(error.response?.data?.message || error.message || "Failed to delete airline")); // Menggunakan alias jika perlu
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
//       throw new Error("Invalid data format from API for hotels");
//     }
//   } catch (error) {
//     console.error("Fetch Hotels Error:", error.response || error);
//     dispatch(getHotelsFailure(error.response?.data?.message || error.message || "Failed to fetch hotels"));
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
//     dispatch(createHotelFailure(error.response?.data?.message || error.message || "Failed to create hotel"));
//   }
// };

// export const clearCreateHotelStatus = () => (dispatch) => {
//   dispatch(resetCreateHotelStatus());
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
//     dispatch(updateHotelFailure(error.response?.data?.message || error.message || "Failed to update hotel"));
//   }
// };

// export const deleteHotel = (hotelId) => async (dispatch) => {
//   console.log("deleteHotel ACTION FIRED with hotelId:", hotelId);
//   dispatch(deleteHotelRequest()); // <--- SEKARANG MEMANGGIL ACTION CREATOR YANG DIIMPOR
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
//     dispatch(deleteHotelSuccess(hotelId)); // <--- SEKARANG MEMANGGIL ACTION CREATOR YANG DIIMPOR
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
//     dispatch(deleteHotelFailure(errorMessage)); // <--- SEKARANG MEMANGGIL ACTION CREATOR YANG DIIMPOR
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

// mitraAction.js
import axios from "axios";
import Cookies from "js-cookie";
import {
  // ... (semua impor action type/creator Anda yang lain) ...
  getMitraRequest,
  getMitraSuccess,
  getMitraFailure,
  createMitraRequest,
  createMitraSuccess,
  createMitraFailure,
  deleteMitraRequest as deleteAirlineMitraRequest, // Alias untuk menghindari konflik nama jika ada
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
  createFlightRequest, // Import new action type
  createFlightSuccess, // Import new action type
  createFlightFailure, // Import new action type
  getAirportsRequest, // Import new action type
  getAirportsSuccess, // Import new action type
  getAirportsFailure, // Import new action type
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
  // Action types for locations
  getLocationsRequest,
  getLocationsSuccess,
  getLocationsFailure,
  // Action types for rooms
  getRoomsRequest,
  getRoomsSuccess,
  getRoomsFailure,
} from "../reducers/mitraReducer"; // Sesuaikan path jika perlu

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

// ... (kode untuk fetchMitraRequest, createMitra, deleteMitra (airline), updateMitra, dll. tetap sama) ...
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
    dispatch(getMitraFailure(error.response?.data?.message || error.message || "Failed to fetch airlines"));
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
    dispatch(createMitraFailure(error.response?.data?.message || error.message || "Failed to create airline"));
  }
};

//This deleteMitra seems to be for airlines, keeping as is.
export const deleteMitra = (airlineId) => async (dispatch) => {
  dispatch(deleteAirlineMitraRequest()); // Using alias
  try {
    const token = Cookies.get("token");
    await axios.delete(`${api_url}/airline`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      data: { airlineId: airlineId },
    });
    dispatch(deleteAirlineMitraSuccess(airlineId)); // Using alias
  } catch (error) {
    dispatch(deleteAirlineMitraFailure(error.response?.data?.message || error.message || "Failed to delete airline")); // Using alias
  }
};

// Ganti nama jika ada konflik dengan deleteHotel (Original had deleteMitra and deleteAirline)
// Assuming deleteAirline is the intended one based on naming consistency with aliases.
export const deleteAirline = (airlineId) => async (dispatch) => {
  dispatch(deleteAirlineMitraRequest());
  try {
    const token = Cookies.get("token");
    await axios.delete(`${api_url}/airline`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      data: { airlineId: airlineId },
    });
    dispatch(deleteAirlineMitraSuccess(airlineId));
  } catch (error) {
    dispatch(deleteAirlineMitraFailure(error.response?.data?.message || error.message || "Failed to delete airline"));
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
    dispatch(updateMitraFailure(error.response?.data?.message || error.message || "Failed to update airline"));
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
    dispatch(getPlanesFailure(error.response?.data?.message || error.message || "Failed to fetch planes"));
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
    dispatch(deletePlaneFailure(error.response?.data?.message || error.message || "Failed to delete plane"));
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
    dispatch(createPlaneFailure(error.response?.data?.message || error.message || "Failed to create plane"));
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
    dispatch(getPlaneTypesFailure(error.response?.data?.message || error.message || "Failed to fetch plane types"));
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
    dispatch(createPlaneTypeFailure(error.response?.data?.message || error.message || "Failed to create plane type"));
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
    dispatch(getSeatsFailure(error.response?.data?.message || error.message || "Failed to fetch seats"));
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
    dispatch(deleteSeatFailure(error.response?.data?.message || error.message || "Failed to delete seat"));
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
    dispatch(createSeatsFailure(error.response?.data?.message || error.message || "Failed to create seats"));
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
    dispatch(getSeatCategoriesFailure(error.response?.data?.message || error.message || "Failed to fetch seat categories"));
  }
};

// --- Flight Actions ---
export const createFlight = (flightData) => async (dispatch) => {
  dispatch(createFlightRequest());
  try {
    const token = Cookies.get("token");
    console.log("[DEBUG] Auth Token for Create Flight:", token);
    console.log("[DEBUG] Sending Flight Data:", flightData);

    const response = await axios.post(`${api_url}/flight`, flightData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("[DEBUG] API Response (Create Flight):", response.data);
    dispatch(createFlightSuccess(response.data.data));
  } catch (error) {
    console.error("[ERROR] Creating flight:", error.response || error);
    dispatch(createFlightFailure(error.response?.data?.message || error.message));
  }
};

// --- Airport Actions ---
export const fetchAirportsRequest = () => async (dispatch) => {
  dispatch(getAirportsRequest());
  try {
    const token = Cookies.get("token");
    console.log("[DEBUG] Auth Token for Get Airports:", token);

    const response = await axios.get(`${api_url}/airports`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("[DEBUG] API Response (Get Airports):", response.data);
    if (response.data?.data && Array.isArray(response.data.data)) {
      dispatch(getAirportsSuccess(response.data.data));
    } else {
      throw new Error("Invalid data format from API");
    }
  } catch (error) {
    console.error("[ERROR] Fetching airports:", error.response || error);
    dispatch(getAirportsFailure(error.response?.data?.message || error.message));
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
      throw new Error("Invalid data format from API for hotels");
    }
  } catch (error) {
    console.error("Fetch Hotels Error:", error.response || error);
    dispatch(getHotelsFailure(error.response?.data?.message || error.message || "Failed to fetch hotels"));
  }
};

export const createHotel = (hotelFormData) => async (dispatch) => {
  dispatch(createHotelRequest());
  try {
    const token = Cookies.get("token");
    const response = await axios.post(`${api_url}/hotel`, hotelFormData, {
      headers: { Authorization: `Bearer ${token}` }, // Content-Type might be multipart/form-data if hotelFormData includes files
    });
    if (response.data?.data) {
      dispatch(createHotelSuccess(response.data.data));
    } else {
      throw new Error("Invalid data format from API on create hotel");
    }
  } catch (error) {
    console.error("Create Hotel Error:", error.response || error);
    dispatch(createHotelFailure(error.response?.data?.message || error.message || "Failed to create hotel"));
  }
};

export const clearCreateHotelStatus = () => (dispatch) => {
  // Assuming resetCreateHotelStatus is defined in mitraReducer and exported
  // If not, you might need to define it or use existing error/success clearing actions.
  // For now, this will cause an error if resetCreateHotelStatus is not defined.
  // dispatch(resetCreateHotelStatus());
};

export const updateHotel = (hotelFormData) => async (dispatch) => {
  dispatch(updateHotelRequest());
  try {
    const token = Cookies.get("token");
    const response = await axios.patch(`${api_url}/hotel`, hotelFormData, {
      headers: { Authorization: `Bearer ${token}` }, // Content-Type might be multipart/form-data
    });
    if (response.data?.data) {
      dispatch(updateHotelSuccess(response.data.data));
    } else {
      throw new Error("Invalid data format from API on update hotel");
    }
  } catch (error) {
    console.error("Update Hotel Error:", error.response || error);
    dispatch(updateHotelFailure(error.response?.data?.message || error.message || "Failed to update hotel"));
  }
};

export const deleteHotel = (hotelId) => async (dispatch) => {
  console.log("deleteHotel ACTION FIRED with hotelId:", hotelId);
  dispatch(deleteHotelRequest());
  try {
    const token = Cookies.get("token");
    console.log(`[ACTION] Attempting DELETE /hotel. hotelId: ${hotelId}. Token present: ${!!token}`);
    const payload = { hotelId: hotelId };
    console.log("[ACTION] Request Body:", payload);

    await axios.delete(`${api_url}/hotel`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    });
    console.log("[ACTION] Delete request successful for hotelId:", hotelId);
    dispatch(deleteHotelSuccess(hotelId));
  } catch (error) {
    if (error.response) {
      console.error("Delete Hotel API Error Response Data:", error.response.data);
      console.error("Delete Hotel API Error Response Status:", error.response.status);
      console.error("Delete Hotel API Error Response Headers:", error.response.headers);
    } else if (error.request) {
      console.error("Delete Hotel API No Response:", error.request);
    } else {
      console.error("Delete Hotel API Request Setup Error:", error.message);
    }
    const errorMessage = error.response?.data?.message || error.message || "Failed to delete hotel from action";
    dispatch(deleteHotelFailure(errorMessage));
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
      dispatch(getLocationsSuccess([])); // Handle case where data is null but success
    }
    else {
      throw new Error("Invalid data format from API for locations");
    }
  } catch (error) {
    console.error("Fetch Locations Error:", error.response || error);
    dispatch(getLocationsFailure(error.response?.data?.message || error.message || "Failed to fetch locations"));
  }
};

// --- Room Actions ---
export const fetchRooms = (hotelId) => async (dispatch) => {
  dispatch(getRoomsRequest());
  try {
    const token = Cookies.get("token");
    // The user provided endpoint: GET /rooms/cmacig97c0002up7k1lzhpyx4
    // So the structure should be /rooms/{hotelId}
    const response = await axios.get(`${api_url}/rooms/${hotelId}`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    // Based on the provided API response structure:
    // { "message": "Success", "data": [...] }
    if (response.data?.message === "Success" && Array.isArray(response.data.data)) {
      dispatch(getRoomsSuccess(response.data.data));
    } else if (response.data?.message === "Success" && response.data?.data === null) {
      dispatch(getRoomsSuccess([])); // Handle case where data is null but success
    } else {
      throw new Error(response.data?.message || "Invalid data format from API for rooms");
    }
  } catch (error) {
    console.error("Fetch Rooms Error:", error.response || error);
    dispatch(getRoomsFailure(error.response?.data?.message || error.message || "Failed to fetch rooms"));
  }
};