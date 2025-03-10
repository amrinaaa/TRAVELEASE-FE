import { FaUser, FaEnvelope, FaLock, FaEye } from "react-icons/fa6";
import React from 'react';

// const Register = () => {
//   return (
//     <div className="h-screen bg-gradient-to-b from-purple-500 to-white flex justify-center items-center">
//       {/* regis box */}
//       <div className="bg-gray-200 rounded-lg shadow-xl p-8 w-full max-w-[1105px] flex flex-col md:flex-row md:space-x-8">
//         {/* logo box */}
//         <div className="flex justify-center md:justify-start mb-8 md:mb-0 w-full">
//           <img src="/logo.png" alt="TravelEase Logo" />
//         </div>
        
//         {/* regis form */}
//         <div className="w-full flex flex-col space-y-6">
//           <h2 className="text-3xl font-semibold text-purple-800 text-center">
//             Registration
//           </h2>
          
//           <form className="space-y-4">
//             {/* Username Input */}
//             <div className="relative">
//               <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
//               <input
//                 id="username"
//                 type="text"
//                 required
//                 className="border-purple-500 bg-gray-200 w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
//                 placeholder="Username"
//               />
//             </div>

//             {/* Email Input */}
//             <div className="relative">
//               <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
//               <input
//                 id="email"
//                 type="email"
//                 required
//                 className="border-purple-500 bg-gray-200 w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
//                 placeholder="Email"
//               />
//             </div>

//             {/* Password Input */}
//             <div className="relative">
//               <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
//               <FaEye className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
//               <input
//                 id="password"
//                 type="password"
//                 required
//                 className="border-purple-500 bg-gray-200 w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
//                 placeholder="Password"
//               />
//             </div>

//             {/* Confirm Password Input */}
//             <div className="relative">
//               <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
//               <FaEye className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
//               <input
//                 id="confirmPassword"
//                 type="password"
//                 required
//                 className="border-purple-500 bg-gray-200 w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
//                 placeholder="Confirm Password"
//               />
//             </div>

//             {/* submit button */}
//             <div className="flex justify-center">
//               <button
//                 type="submit"
//                 className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
//               >
//                 Register
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

// PUNYA FADLI YANG ATAS


// INI PUNYA WIRA

const Register = () => {
  return (
    <section className='login min-h-screen flex justify-center items-center relative bg-gradient-to-b from-purple-900 to-white"'>
      <div className="relative z-10 bg-transparent sm:bg-white sm:bg-opacity-10 sm:rounded-xl sm:shadow-xl sm:p-4 max-w-2xl w-full sm:backdrop-blur-lg sm:border sm:border-white sm:border-opacity-20">
        <div className='flex flex-col md:flex-row justify-center items-center md:gap-8 md:px-10 md:py-12'>
          <div className="shrink-1 mb-12 md:p-0 pt-12 pr-12 pl-12 grow-0 basis-auto md:mb-0 md:w-6/12 md:shrink-0 lg:w-6/12 xl:w-6/12 ">
            <img
                src="/logo.png"
                className="w-full"
                alt="TravelEase Logo"
              />
          </div>
          <div className='shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-6/12 md:shrink-0 lg:w-6/12 xl:w-6/12'>
            <h2 className="text-center text-2xl font-bold text-[#461873] mb-4">Registration</h2>
            <form>
              <div className="mb-4 relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
                <input
                  className="w-full p-2 pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#461873]"
                  type="text"
                  id="username"
                  placeholder="Username"
                />
              </div>
              <div className="mb-4 relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
                <input
                  className="w-full p-2 pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#461873]"
                  type="text"
                  id="email"
                  placeholder="Email"
                />
              </div>
              <div className="mb-4 relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
                <input
                  className="w-full p-2 pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#461873]"
                  type="password"
                  id="password"
                  placeholder="Password"
                />
              </div>
              <div className="mb-4 relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
                <input
                  className="w-full p-2 pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#461873]"
                  type="password"
                  id="confirm password"
                  placeholder="Confirm Password"
                />
              </div>
              <button className="w-full mt-2 py-2 bg-[#461873] text-white rounded-3xl hover:bg-purple-800 transition duration-300">
                  Registration
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register;
