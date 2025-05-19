// reducers/index.js
import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import adminReducer from "./adminReducer";
import adminHotelReducer from "./adminHotelReducer";
import adminPesawatReducer from "./adminPesawatReducer";
import mitraReducer from "../reducers/mitraReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  adminHotel: adminHotelReducer,
  adminPesawat: adminPesawatReducer,
  mitra: mitraReducer,
});

export default rootReducer;