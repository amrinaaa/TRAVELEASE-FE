// import axios from "axios";
// import Cookies from "js-cookie";
// import {
//   getMitraRequest,
//   getMitraSuccess,
//   getMitraFailure,
//   createMitraRequest,
//   createMitraSuccess,
//   createMitraFailure,
//   deleteMitraRequest,
//   deleteMitraSuccess,
//   deleteMitraFailure,
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
//   getHotelsRequest, // New action type for hotels
//   getHotelsSuccess, // New action type for hotels
//   getHotelsFailure, // New action type for hotels
// } from "../reducers/mitraReducer";

// const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

// // --- Airline Actions ---

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
//       throw new Error("Invalid data format from API");
//     }
//   } catch (error) {
//     dispatch(getMitraFailure(error.response?.data?.message || error.message));
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
//     dispatch(createMitraFailure(error.response?.data?.message || error.message));
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

// export const updateMitra = (mitraData) => async (dispatch) => {
//   dispatch(updateMitraRequest());
//   try {
//     const token = Cookies.get("token");
//     const response = await axios.put(`${api_url}/airline`, mitraData, {
//       headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//     });
//     dispatch(updateMitraSuccess(response.data.data));
//   } catch (error) {
//     dispatch(updateMitraFailure(error.response?.data?.message || error.message));
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
//       throw new Error("Invalid data format from API");
//     }
//   } catch (error) {
//     dispatch(getPlanesFailure(error.response?.data?.message || error.message));
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
//     dispatch(deletePlaneFailure(error.response?.data?.message || error.message));
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
//     dispatch(createPlaneFailure(error.response?.data?.message || error.message));
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
//       throw new Error("Invalid data format from API");
//     }
//   } catch (error) {
//     dispatch(getPlaneTypesFailure(error.response?.data?.message || error.message));
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
//     dispatch(createPlaneTypeFailure(error.response?.data?.message || error.message));
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
//     dispatch(getSeatsFailure(error.response?.data?.message || error.message));
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
//     dispatch(deleteSeatFailure(error.response?.data?.message || error.message));
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
//     dispatch(createSeatsFailure(error.response?.data?.message || error.message));
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
//       throw new Error("Invalid data format from API");
//     }
//   } catch (error) {
//     dispatch(getSeatCategoriesFailure(error.response?.data?.message || error.message));
//   }
// };

// // --- Hotel Actions ---
// export const fetchHotels = () => async (dispatch) => { // Renamed from fetchHotelsRequest for clarity if no ID is passed
//   dispatch(getHotelsRequest());
//   try {
//     const token = Cookies.get("token");
//     const response = await axios.get(`${api_url}/hotels`, { // Changed endpoint to /hotels
//       headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//     });
//     if (response.data?.data && Array.isArray(response.data.data)) {
//       dispatch(getHotelsSuccess(response.data.data));
//     } else {
//       throw new Error("Invalid data format from API");
//     }
//   } catch (error) {
//     dispatch(getHotelsFailure(error.response?.data?.message || error.message));
//   }
// };

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
  getHotelsRequest,
  getHotelsSuccess,
  getHotelsFailure,
  createHotelRequest,
  createHotelSuccess,
  createHotelFailure,
  updateHotelRequest,
  updateHotelSuccess,
  updateHotelFailure,
  deleteHotelRequest, // <--- PASTIKAN INI DIIMPOR
  deleteHotelSuccess, // <--- PASTIKAN INI DIIMPOR
  deleteHotelFailure, // <--- PASTIKAN INI DIIMPOR
  clearDeleteHotelErrorRequest,
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

export const deleteMitra = (airlineId) => async (dispatch) => {
  dispatch(deleteMitraRequest());
  try {
    const token = Cookies.get("token");
    await axios.delete(`${api_url}/airline`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      data: { airlineId: airlineId },
    });
    dispatch(deleteMitraSuccess(airlineId));
  } catch (error) {
    dispatch(deleteMitraFailure(error.response?.data?.message || error.message));
  }
};

// Ganti nama jika ada konflik dengan deleteHotel
export const deleteAirline = (airlineId) => async (dispatch) => {
  dispatch(deleteAirlineMitraRequest()); // Menggunakan alias jika perlu
  try {
    const token = Cookies.get("token");
    await axios.delete(`${api_url}/airline`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      data: { airlineId: airlineId },
    });
    dispatch(deleteAirlineMitraSuccess(airlineId)); // Menggunakan alias jika perlu
  } catch (error) {
    dispatch(deleteAirlineMitraFailure(error.response?.data?.message || error.message || "Failed to delete airline")); // Menggunakan alias jika perlu
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
      headers: { Authorization: `Bearer ${token}` },
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
  dispatch(resetCreateHotelStatus());
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
    dispatch(updateHotelFailure(error.response?.data?.message || error.message || "Failed to update hotel"));
  }
};

export const deleteHotel = (hotelId) => async (dispatch) => {
  console.log("deleteHotel ACTION FIRED with hotelId:", hotelId);
  dispatch(deleteHotelRequest()); // <--- SEKARANG MEMANGGIL ACTION CREATOR YANG DIIMPOR
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
    dispatch(deleteHotelSuccess(hotelId)); // <--- SEKARANG MEMANGGIL ACTION CREATOR YANG DIIMPOR
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
    dispatch(deleteHotelFailure(errorMessage)); // <--- SEKARANG MEMANGGIL ACTION CREATOR YANG DIIMPOR
  }
};

export const clearDeleteHotelError = () => (dispatch) => {
  dispatch(clearDeleteHotelErrorRequest());
};