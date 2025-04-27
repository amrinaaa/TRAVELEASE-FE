// reducers/index.js
import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import adminReducer from "./adminReducer";
import adminHotelReducer from "./adminHotelReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  adminHotel: adminHotelReducer,
});

export default rootReducer;