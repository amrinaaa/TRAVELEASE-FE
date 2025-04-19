// import { configureStore } from '@reduxjs/toolkit';

// // Import your reducers here
// // import counterReducer from '../features/counter/counterSlice';

// export const store = configureStore({
//   reducer: {
//     // counter: counterReducer,
//   },
// });

// import { configureStore } from "@reduxjs/toolkit";
// import { authReducer } from "./reducers/authReducer";

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

// export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import { authReducer } from "./reducers/authReducer";
// import adminReducer from "./reducers/adminReducer";

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     admin: adminReducer
//   },
// });

// export default store;

// store.js
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.MODE === "development",
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(thunk),
});

export default store;