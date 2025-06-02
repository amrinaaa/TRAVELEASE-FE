import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import yang hilang
import { FaBars } from "react-icons/fa";
import { Button } from "@heroui/react";
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const NavSidebar = ({ toggleSidebar, isSidebarOpen }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  
  const location = useLocation();
  
  const auth = useSelector((state) => state.auth);
  const { userInfo } = auth;

  // Perbaiki logika user - hapus duplikasi dan parameter yang tidak terpakai
  let user = userInfo;

  if (!user && Cookies.get("token")) {
    try {
      user = jwtDecode(Cookies.get("token"));
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  return (
    <nav className='fixed flex top-0 left-0 w-full bg-white shadow-md px-4 py-4 transition-all duration-300 '>
      <div 
        className={`absolute top-4 transition-all duration-300 ${isSidebarOpen ? 'left-16 md:left-64 ml-4' : 'left-4'}`}
      >
        <FaBars 
          className="text-black text-2xl cursor-pointer" 
          onClick={toggleSidebar} 
        />
      </div>

      <div className='flex items-center gap-3 ml-auto'>
        <p className='text-black'>{user?.name || "User"}</p>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className='focus:outline-none'
        >
          <img
            src="/path-to-your-image/image.png"
            alt="User Icon"
            className="w-6 h-6 rounded-full border-2 border-black shadow-lg"
          />
        </button>

          {showDropdown && (
            <div className='absolute bg-white rounded-lg shadow-lg w-40 top-full right-3 border z-10'>
              <ul className='text-left px-3 py-2 text-sm text-gray-950'>
                <li className='py-2 hover:text-blue-600 border-b border-gray-100'>
                  <Link
                    to="/pengaturan-akun-mitra"
                    className="flex items-center"
                    onClick={() => setShowDropdown(false)}
                  >
                    <i className="ri-user-settings-line text-md mr-2"></i>
                    Account Settings
                  </Link>
                </li>
                <li className='py-2 hover:text-blue-600 border-b border-gray-100'>
                  <button className="flex items-center w-full text-left">
                    <i className="ri-wallet-3-line text-md mr-2"></i>
                    Rp. 90,000
                  </button>
                </li>
                <li className='py-2 hover:text-red-600'>
                  <button
                    onClick={() => {
                      Cookies.remove("token");
                      window.location.href = "/login";
                    }}
                    className="flex items-center w-full text-left"
                  >
                    <i className="ri-logout-circle-r-line text-md mr-2"></i>
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
    </nav>
  );
};

export default NavSidebar