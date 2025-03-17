// import axios from "axios";

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

// Action creators
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

    // Store the token in cookies
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
