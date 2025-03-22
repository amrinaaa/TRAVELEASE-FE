import React from 'react';
import { FaBars } from "react-icons/fa";

const NavSidebar = ({ toggleSidebar, isSidebarOpen, user }) => {
  return (
    <nav className='fixed flex top-0 left-0 w-full bg-white shadow-md px-4 py-4 transition-all duration-300'>
      <div 
        className={`absolute top-4 transition-all duration-300 ${isSidebarOpen ? 'left-16 md:left-64 ml-4' : 'left-4'}`}
      >
        <FaBars 
          className="text-black text-2xl cursor-pointer" 
          onClick={toggleSidebar} 
        />
      </div>
      <div className='flex relative items-center gap-3 ml-auto'>
        <p>{user?.name || "User"}</p>
        <button className='text-white group'>
            <img
              src="/path-to-your-image/image.png" 
              alt="User Icon"
              className="w-6 h-6 rounded-full border-2 border-black shadow-lg"
            />
            <div className='z-10 hidden absolute bg-white rounded-lg shadow w-40 group-focus:block top-full right-0'>
              <ul className='text-left px-3 py-2 text-sm text-gray-950'>
                <li className='py-1 hover:text-blue-600'>
                  <a href="">
                    <i className="ri-user-settings-line text-md mr-2"></i>
                    Account Settings
                  </a>
                </li>
                <li className='hover:text-red-600'>
                  <a href="">
                    <i className="ri-logout-circle-r-line text-md mr-2"></i>
                    Log out
                  </a>
                </li>
              </ul>
            </div>
        </button>
      </div>
    </nav>
  );
};

export default NavSidebar