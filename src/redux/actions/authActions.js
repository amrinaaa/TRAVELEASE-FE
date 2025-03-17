// import axios from "axios";
// import Cookies from "js-cookie";

// // Action Types
// export const LOGIN_REQUEST = "LOGIN_REQUEST";
// export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
// export const LOGIN_FAIL = "LOGIN_FAIL";

// // Action creators
// export const login = (email, password) => async (dispatch) => {
//   try {
//     dispatch({ type: LOGIN_REQUEST });

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     const { data } = await axios.post(
//       "http://localhost:3000/api/login",
//       { email, password },
//       config
//     );

//     // Store the token in cookies
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

import axios from "axios";
import Cookies from "js-cookie";

// Action Types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

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
