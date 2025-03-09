import { configureStore } from '@reduxjs/toolkit';

// Import your reducers here
// import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
  },
});