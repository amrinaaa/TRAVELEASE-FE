// reducers/index.js
import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import adminReducer from "./adminReducer";
import adminHotelReducer from "./adminHotelReducer";
import adminPesawatReducer from "./adminPesawatReducer";
import mitraReducer from "../reducers/mitraReducer";
import guestHotelReducer from "./guestHotelReducer";
import userHotelReducer from "./userHotelReducer";
import guestReducer from "./guestReducer";


const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  adminHotel: adminHotelReducer,
  adminPesawat: adminPesawatReducer,
  mitra: mitraReducer,
  guestHotel: guestHotelReducer,
  userHotel: userHotelReducer,
  guest: guestReducer,
});

export default rootReducer;