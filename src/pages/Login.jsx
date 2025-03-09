import { FaEnvelope, FaLock, FaEye } from "react-icons/fa6";
import React from 'react';

const Login = () => {
  return (
    <div className="h-screen bg-gradient-to-b from-purple-500 to-white flex justify-center items-center">
      {/* login box */}
      <div className="bg-gray-200 rounded-lg shadow-xl p-8 w-full max-w-[1105px] flex flex-col md:flex-row md:space-x-8">
        {/* logo */}
        <div className="flex justify-center md:justify-start mb-8 md:mb-0 w-full">
          <img src="/logo.png" alt="TravelEase Logo" />
        </div>
        
        {/* login form */}
        <div className="w-full flex flex-col space-y-6">
          <h2 className="text-3xl font-semibold text-purple-800 text-center">
            Login to your Account
          </h2>
          
          <form className="space-y-4">
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

            <div className="flex justify-between items-center">
              <a href="#" className="text-sm text-purple-600">Forgot password?</a>
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Log in
              </button>
            </div>
          </form>
          
          <div className="text-center">
            <p className="text-sm text-gray-700">
              Have no account yet?{' '}
              <a href="/register" className="text-purple-600">Registration</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// // src/pages/Login.jsx
// import { FaEnvelope, FaLock, FaEye } from "react-icons/fa6";
// import React from 'react';

// const Login = () => {
//   return (
//     <div className="h-screen bg-gradient-to-b from-purple-500 to-white flex justify-center items-center">
//       {/* Login box with max-width */}
//       <div className="bg-gray-200 rounded-lg shadow-xl p-8 w-full max-w-[1105px] flex flex-col md:flex-row md:space-x-8">
//         {/* Logo Section */}
//         <div className="flex justify-center md:justify-start mb-8 md:mb-0 w-full">
//           <img src="/logo.png" alt="TravelEase Logo" />
//         </div>
        
//         {/* Login Form Section */}
//         <div className="w-full flex flex-col space-y-6">
//           <h2 className="text-3xl font-semibold text-purple-800 text-center">
//             Login to your Account
//           </h2>
          
//           <form className="space-y-4">
//             <div className="relative">
//               {/* Envelope Icon inside Email Input */}
//               <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
//               <input
//                 id="email"
//                 type="email"
//                 required
//                 className="border-purple-500 bg-gray-200 w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
//                 placeholder="Email"
//               />
//             </div>
            
//             <div className="relative">
//               {/* Lock Icon inside Password Input */}
//               <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
//               <input
//                 id="password"
//                 type="password"
//                 required
//                 className="border-purple-500 bg-gray-200 w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
//                 placeholder="Password"
//               />
//             </div>

//             {/* Forgot password link */}
//             <div className="flex justify-end">
//               <a href="#" className="text-sm text-purple-600">Forgot password?</a>
//             </div>

//             {/* Log in button */}
//             <div className="flex justify-center">
//               <button
//                 type="submit"
//                 className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
//               >
//                 Log in
//               </button>
//             </div>
//           </form>
          
//           {/* Have no account yet */}
//           <div className="flex justify-center">
//             <p className="text-sm text-gray-700">
//               Have no account yet?{' '}
//             </p>
//           </div>
          
//           {/* Registration button */}
//           <div className="flex justify-center">
//             <a href="/register" className="text-purple-600 px-6 py-2 bg-gray-200 border border-purple-600 rounded-md text-center">
//               Registration
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
