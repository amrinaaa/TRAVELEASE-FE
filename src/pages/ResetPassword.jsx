// import { FaUser, FaEnvelope, FaLock, FaEye } from "react-icons/fa6";
// import React from 'react';

// const ResetPassword = () => {
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
//             <h2 className="text-center text-2xl font-bold text-[#461873] mb-4">Create New Password</h2>
//             <form>
//               <div className="mb-4 relative">
//                 <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
//                 <input
//                   className="w-full p-2 pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#461873]"
//                   type="password"
//                   id="password"
//                   placeholder="New Password"
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
//                   Reset Password
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default ResetPassword

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPassword } from "../redux/actions/authActions";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [oobCode, setOobCode] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const auth = useSelector((state) => state.auth);
  const { loading, error, resetPasswordSuccess } = auth;

  // Extract oobCode from the URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("oobCode");
    if (code) {
      setOobCode(code);
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmationPassword) {
      dispatch(resetPassword(oobCode, newPassword, confirmationPassword));
    } else {
      alert("Passwords do not match!");
    }
  };

  if (resetPasswordSuccess) {
    return (
      <div className="text-center text-green-500">
        <p>Password successfully changed!</p>
        <a href="/login" className="text-purple-600">Login now</a>
      </div>
    );
  }

  return (
    <section className="login min-h-screen flex justify-center items-center relative bg-gradient-to-b from-purple-900 to-white">
      <div className="relative z-10 bg-transparent sm:bg-white sm:bg-opacity-10 sm:rounded-xl sm:shadow-xl sm:p-4 max-w-2xl w-full sm:backdrop-blur-lg sm:border sm:border-white sm:border-opacity-20">
        <div className="flex flex-col md:flex-row justify-center items-center md:gap-8 md:px-10 md:py-12">
          <div className="shrink-1 mb-12 md:p-0 pt-12 pr-12 pl-12 grow-0 basis-auto md:mb-0 md:w-6/12 md:shrink-0 lg:w-6/12 xl:w-6/12 ">
            <img src="/logo.png" className="w-full" alt="Logo" />
          </div>
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-6/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <h2 className="text-center text-2xl font-bold text-[#461873] mb-4">Reset Password</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 relative">
                <input
                  type="password"
                  id="new-password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#461873]"
                />
              </div>
              <div className="mb-4 relative">
                <input
                  type="password"
                  id="confirmation-password"
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
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>

            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
