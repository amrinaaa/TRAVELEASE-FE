// reducers/index.js
import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import adminReducer from "./adminReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
});

export default rootReducer;