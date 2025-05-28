import { FaEnvelope, FaLock } from "react-icons/fa6";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/authActions";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const auth = useSelector((state) => state.auth);
  const { loading, error, userInfo } = auth;

  // On component mount, check if the token exists in cookies
  useEffect(() => {
    const token = Cookies.get("userToken");
    if (token) {
      dispatch({ type: "LOGIN_SUCCESS", payload: { data: token } });
    }
    // Redirect if login is successful
    if (userInfo) {
      const decoded = jwtDecode(userInfo.data);
      switch (decoded.role) {
        case "ADMIN": navigate("/admin"); break;
        case "MITRA_PENERBANGAN": navigate("/mitra-pesawat"); break;
        case "MITRA_HOTEL": navigate("/mitra-hotel"); break;
        default: navigate("/"); break;
      }
    }
  }, [dispatch, userInfo, navigate]); // Add navigate to dependency array

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <section className="login min-h-screen flex justify-center items-center relative bg-gradient-to-b from-ungu4 to-ungu9">
      <div className="relative z-10 bg-transparent sm:bg-white sm:bg-opacity-10 sm:rounded-xl sm:shadow-xl sm:p-4 max-w-2xl w-full sm:backdrop-blur-lg sm:border sm:border-white sm:border-opacity-20">
        <div className="flex flex-col md:flex-row justify-center items-center md:gap-10 md:px-10 md:py-12">
          <div className="shrink-1 mb-12 md:p-0 pt-12 pr-12 pl-12 grow-0 basis-auto md:mb-0 md:w-6/12 md:shrink-0 lg:w-6/12 xl:w-6/12 ">
            <img src="/logo-b.png" className="w-full" alt="Logo" />
          </div>
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-6/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <h2 className="text-center text-2xl font-bold text-ungu1 mb-4">Login to your Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ungu1"
                />
              </div>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ungu1"
                />
              </div>
              <div className="grid grid-rows-2 items-center">
                <a href="/forgot-password" className="text-sm text-purple-600 text-right">Forgot password?</a>
                <button
                  type="submit"
                  className="w-full mt-2 py-2 bg-ungu5 text-white rounded-3xl hover:bg-ungu6 transition duration-300"
                >
                  {loading ? "Logging in..." : "Log in"}
                </button>
              </div>
            </form>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            {userInfo && <p className="text-green-500 text-center mt-4">Login successful!</p>}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-700">
                Have no account yet?{" "}
                <a href="/register" className="text-purple-600">Registration</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;