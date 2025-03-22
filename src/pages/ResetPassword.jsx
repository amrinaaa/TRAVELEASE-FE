import { FaUser, FaEnvelope, FaLock, FaEye } from "react-icons/fa6";
import React from 'react';

const ResetPassword = () => {
  return (
    <section className='resetPassword min-h-screen flex justify-center items-center relative bg-gradient-to-b from-ungu4 to-ungu9'>
      <div className="relative z-10 bg-transparent sm:bg-white sm:bg-opacity-10 sm:rounded-xl sm:shadow-xl sm:p-4 max-w-2xl w-full sm:backdrop-blur-lg sm:border sm:border-white sm:border-opacity-20">
        <div className='flex flex-col md:flex-row justify-center items-center md:gap-10 md:px-10 md:py-12'>
          <div className="shrink-1 mb-12 md:p-0 pt-12 pr-12 pl-12 grow-0 basis-auto md:mb-0 md:w-6/12 md:shrink-0 lg:w-6/12 xl:w-6/12 ">
            <img
                src="/logo-b.png"
                className="w-full"
                alt="TravelEase Logo"
              />
          </div>
          <div className='shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-6/12 md:shrink-0 lg:w-6/12 xl:w-6/12'>
            <h2 className="text-center text-2xl font-bold text-ungu1 mb-4">Create New Password</h2>
            <form>
              <div className="mb-4 relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
                <input
                  className="w-full p-2 pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ungu1"
                  type="password"
                  id="password"
                  placeholder="New Password"
                />
              </div>
              <div className="mb-4 relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
                <input
                  className="w-full p-2 pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ungu1"
                  type="password"
                  id="confirm password"
                  placeholder="Confirm Password"
                />
              </div>
              <button className="w-full mt-2 py-2 bg-ungu5 text-white rounded-3xl hover:bg-ungu6 transition duration-300">
                  Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResetPassword