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

import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
