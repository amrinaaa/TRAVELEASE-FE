import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import adminReducer from "./adminReducer";
import adminDashboardReducer from "./adminDashboardReducer";
import adminHotelReducer from "./adminHotelReducer";
import adminPesawatReducer from "./adminPesawatReducer";
import mitraReducer from "../reducers/mitraReducer";
import mitraHotelDashboardReducer from "./mitraHotelDashboardReducer";
import mitraPlaneDashboardReducer from "./mitraPlaneDashboardReducer";
import guestHotelReducer from "./guestHotelReducer";
import userHotelReducer from "./userHotelReducer";
import guestReducer from "./guestReducer";
import userAccountReducer from "./userAccountReducer";
import mitraPlaneScheduleReducer from "./mitraPlaneScheduleReducer";
import userPlaneReducer from "./userPlaneReducer";
import mitraPesawatAccountReducer from "./mitraPesawatAccountReducer"
import mitraHotelAccountReducer from "./mitraHotelAccountReducer"
import adminAccountReducer from "./adminAccountReducer"

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  adminDashboard: adminDashboardReducer,
  adminHotel: adminHotelReducer,
  adminPesawat: adminPesawatReducer,
  mitra: mitraReducer,
  mitraHotelDashboard: mitraHotelDashboardReducer,
  mitraPlaneDashboard: mitraPlaneDashboardReducer,
  mitraPlaneSchedule: mitraPlaneScheduleReducer,
  guestHotel: guestHotelReducer,
  userHotel: userHotelReducer,
  guest: guestReducer,
  userAccount: userAccountReducer,
  userPlane: userPlaneReducer,
  mitraPesawatAccount: mitraPesawatAccountReducer,
  mitraHotelAccount: mitraHotelAccountReducer,
  adminAccount: adminAccountReducer,
});

export default rootReducer;