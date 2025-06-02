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
import mitraPlaneScheduleReducer from "./mitraPlaneScheduleReducer";
import userPlaneReducer from "./userPlaneReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  adminHotel: adminHotelReducer,
  adminPesawat: adminPesawatReducer,
  mitra: mitraReducer,
  mitraPlaneSchedule: mitraPlaneScheduleReducer,
  guestHotel: guestHotelReducer,
  userHotel: userHotelReducer,
  guest: guestReducer,
  userAccount: userAccountReducer,
  userPlane: userPlaneReducer,
});

export default rootReducer;