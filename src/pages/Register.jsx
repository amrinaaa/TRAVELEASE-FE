import { FaUser, FaEnvelope, FaLock, FaEye } from "react-icons/fa6";
import React from 'react';

const Register = () => {
  return (
    <div className="h-screen bg-gradient-to-b from-purple-500 to-white flex justify-center items-center">
      {/* regis box */}
      <div className="bg-gray-200 rounded-lg shadow-xl p-8 w-full max-w-[1105px] flex flex-col md:flex-row md:space-x-8">
        {/* logo box */}
        <div className="flex justify-center md:justify-start mb-8 md:mb-0 w-full">
          <img src="/logo.png" alt="TravelEase Logo" />
        </div>
        
        {/* regis form */}
        <div className="w-full flex flex-col space-y-6">
          <h2 className="text-3xl font-semibold text-purple-800 text-center">
            Registration
          </h2>
          
          <form className="space-y-4">
            {/* Username Input */}
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
              <input
                id="username"
                type="text"
                required
                className="border-purple-500 bg-gray-200 w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
                placeholder="Username"
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
              <input
                id="email"
                type="email"
                required
                className="border-purple-500 bg-gray-200 w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
                placeholder="Email"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
              <FaEye className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
              <input
                id="password"
                type="password"
                required
                className="border-purple-500 bg-gray-200 w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
                placeholder="Password"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
              <FaEye className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
              <input
                id="confirmPassword"
                type="password"
                required
                className="border-purple-500 bg-gray-200 w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
                placeholder="Confirm Password"
              />
            </div>

            {/* submit button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;