// import axios from "axios";
// import Cookies from "js-cookie";

// // Action Types
// export const LOGIN_REQUEST = "LOGIN_REQUEST";
// export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
// export const LOGIN_FAIL = "LOGIN_FAIL";

// export const REGISTER_REQUEST = "REGISTER_REQUEST";
// export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
// export const REGISTER_FAIL = "REGISTER_FAIL";

// const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

// // Action creators for Login
// export const login = (email, password) => async (dispatch) => {
//   try {
//     dispatch({ type: LOGIN_REQUEST });

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     const { data } = await axios.post(
//       `${api_url}/login`,
//       { email, password },
//       config
//     );

//     Cookies.set("userToken", data.data, { expires: 7 });  // Set token for 7 days

//     dispatch({ type: LOGIN_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: LOGIN_FAIL,
//       payload: error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message,
//     });
//   }
// };

// // Action creators for Register
// export const register = (name, email, password, confirmationPassword) => async (dispatch) => {
//   try {
//     dispatch({ type: REGISTER_REQUEST });

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     const { data } = await axios.post(
//       `${api_url}/register`,
//       { name, email, password, confirmation_password: confirmationPassword },
//       config
//     );

//     dispatch({ type: REGISTER_SUCCESS, payload: data });

//   } catch (error) {
//     dispatch({
//       type: REGISTER_FAIL,
//       payload: error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message,
//     });
//   }
// };

import axios from "axios";
import Cookies from "js-cookie";

// Action Types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAIL = "FORGOT_PASSWORD_FAIL";

// Action creators for Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:3000/api/login",
      { email, password },
      config
    );

    Cookies.set("userToken", data.data, { expires: 7 });  // Set token for 7 days

    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Action creators for Register
export const register = (name, email, password, confirmationPassword) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:3000/api/register",
      { name, email, password, confirmation_password: confirmationPassword },
      config
    );

    dispatch({ type: REGISTER_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Action creators for Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:3000/api/forgot-password",
      { email },
      config
    );

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
