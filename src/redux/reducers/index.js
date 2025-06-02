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
import userAccountReducer from "./userAccountReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  adminHotel: adminHotelReducer,
  adminPesawat: adminPesawatReducer,
  mitra: mitraReducer,
  guestHotel: guestHotelReducer,
  userHotel: userHotelReducer,
  guest: guestReducer,
  userAccount: userAccountReducer,
});

export default rootReducer;