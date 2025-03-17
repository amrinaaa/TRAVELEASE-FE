// import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from "../actions/authActions";

// // Initial state
// const initialState = {
//   loading: false,
//   userInfo: null,
//   error: null,
// };

// // Reducer
// export const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOGIN_REQUEST:
//       return { ...state, loading: true };
//     case LOGIN_SUCCESS:
//       return { loading: false, userInfo: action.payload, error: null };
//     case LOGIN_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/authActions";

// Initial state
const initialState = {
  loading: false,
  userInfo: null,
  error: null,
  registrationSuccess: false,
};

// Reducer
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload, error: null };
    case LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case REGISTER_REQUEST:
      return { ...state, loading: true };
    case REGISTER_SUCCESS:
      return { loading: false, registrationSuccess: true, userInfo: action.payload, error: null };
    case REGISTER_FAIL:
      return { loading: false, registrationSuccess: false, error: action.payload };

    default:
      return state;
  }
};
