// import { FaUser, FaEnvelope, FaLock, FaEye } from "react-icons/fa6";
// import React from 'react';

// const Register = () => {
//   return (
//     <section className='login min-h-screen flex justify-center items-center relative bg-gradient-to-b from-purple-900 to-white"'>
//       <div className="relative z-10 bg-transparent sm:bg-white sm:bg-opacity-10 sm:rounded-xl sm:shadow-xl sm:p-4 max-w-2xl w-full sm:backdrop-blur-lg sm:border sm:border-white sm:border-opacity-20">
//         <div className='flex flex-col md:flex-row justify-center items-center md:gap-8 md:px-10 md:py-12'>
//           <div className="shrink-1 mb-12 md:p-0 pt-12 pr-12 pl-12 grow-0 basis-auto md:mb-0 md:w-6/12 md:shrink-0 lg:w-6/12 xl:w-6/12 ">
//             <img
//                 src="/logo.png"
//                 className="w-full"
//                 alt="TravelEase Logo"
//               />
//           </div>
//           <div className='shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-6/12 md:shrink-0 lg:w-6/12 xl:w-6/12'>
//             <h2 className="text-center text-2xl font-bold text-[#461873] mb-4">Registration</h2>
//             <form>
//               <div className="mb-4 relative">
//                 <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
//                 <input
//                   className="w-full p-2 pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#461873]"
//                   type="text"
//                   id="name"
//                   placeholder="Name"
//                 />
//               </div>
//               <div className="mb-4 relative">
//                 <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
//                 <input
//                   className="w-full p-2 pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#461873]"
//                   type="text"
//                   id="email"
//                   placeholder="Email"
//                 />
//               </div>
//               <div className="mb-4 relative">
//                 <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
//                 <input
//                   className="w-full p-2 pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#461873]"
//                   type="password"
//                   id="password"
//                   placeholder="Password"
//                 />
//               </div>
//               <div className="mb-4 relative">
//                 <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
//                 <input
//                   className="w-full p-2 pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#461873]"
//                   type="password"
//                   id="confirm password"
//                   placeholder="Confirm Password"
//                 />
//               </div>
//               <button className="w-full mt-2 py-2 bg-[#461873] text-white rounded-3xl hover:bg-purple-800 transition duration-300">
//                   Registration
//               </button>
//               <div className="mt-4 text-center">
//                 <p className="text-sm text-gray-700">
//                   Already have an account?{' '}
//                   <a href="/login" className="text-purple-600">Login</a>
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Register

import { FaUser, FaEnvelope, FaLock } from "react-icons/fa6";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/authActions";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { loading, error, registrationSuccess } = auth;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password, confirmationPassword));
  };

  return (
    <section className="login min-h-screen flex justify-center items-center relative bg-gradient-to-b from-purple-900 to-white">
      <div className="relative z-10 bg-transparent sm:bg-white sm:bg-opacity-10 sm:rounded-xl sm:shadow-xl sm:p-4 max-w-2xl w-full sm:backdrop-blur-lg sm:border sm:border-white sm:border-opacity-20">
        <div className="flex flex-col md:flex-row justify-center items-center md:gap-8 md:px-10 md:py-12">
          <div className="shrink-1 mb-12 md:p-0 pt-12 pr-12 pl-12 grow-0 basis-auto md:mb-0 md:w-6/12 md:shrink-0 lg:w-6/12 xl:w-6/12 ">
            <img src="/logo.png" className="w-full" alt="Logo" />
          </div>
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-6/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <h2 className="text-center text-2xl font-bold text-[#461873] mb-4">Registration</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#461873]"
                />
              </div>
              <div className="mb-4 relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#461873]"
                />
              </div>
              <div className="mb-4 relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#461873]"
                />
              </div>
              <div className="mb-4 relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm Password"
                  value={confirmationPassword}
                  onChange={(e) => setConfirmationPassword(e.target.value)}
                  className="w-full p-2 pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#461873]"
                />
              </div>
              <button
                type="submit"
                className="w-full mt-2 py-2 bg-[#461873] text-white rounded-3xl hover:bg-purple-800 transition duration-300"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            {registrationSuccess && (
              <p className="text-green-500 text-center mt-4">
                Registration successful! Please check your email to verify.
              </p>
            )}

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-700">
                Already have an account?{" "}
                <a href="/login" className="text-purple-600">
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
