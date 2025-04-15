import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, role }) => {
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState(location.pathname);

  return (
    <div className={`fixed h-full md:px-4 py-2 bg-gradient-to-b from-ungu7 to-ungu4 z-10 transition-transform duration-300 
                    w-16 md:w-64 ${isOpen ? 'translate-x-0' : '-translate-x-64'}`}>
      <div className="my-1 mb-3 md:mr-4 px-2 md:px-0 flex">
        <img 
          src="/src/assets/img/Logo-w.png" 
          alt="logo-dashboard"
          className="h-8 pl-4 hidden md:inline" 
        />
        <img 
          src="/logo-b.png" 
          alt="logo-dashboard-mobile"
          className="h-8 md:hidden" 
        />
      </div>
      <div className='px-2'>
        <hr />
      </div>
      <ul className="mt-3 text-white px-4 md:px-0">
        {role === 'admin' && (
          <>
            <li 
              className={`relative flex flex-col items-center md:items-start rounded-2xl hover:shadow hover:text-black hover:bg-ungu10 mb-2 group 
                ${activeMenu === "/admin" ? "bg-ungu10 text-black" : ""}`}
              onClick={() => setActiveMenu("/admin")}
            >
              <Link to="/admin" className="flex items-center md:ml-2">
                <i className="ri-home-gear-line text-2xl"></i>
                <span className="hidden md:inline ml-3 mt-1">
                  Home
                </span>
                <span className="absolute left-full opacity-0 group-hover:opacity-100 bg-white text-black text-xs font-semibold px-2 py-1 rounded shadow-lg ml-2 md:hidden">
                  Home
                </span>
              </Link>
            </li>

            <li 
              className={`relative flex flex-col items-center md:items-start rounded-2xl hover:shadow hover:text-black hover:bg-ungu10 mb-2 group 
                ${activeMenu === "/manajemen-pengguna" ? "bg-ungu10 text-black" : ""}`}
              onClick={() => setActiveMenu("/manajemen-pengguna")}
            >
              <Link to="/manajemen-pengguna" className="flex items-center md:ml-2">
                <i className="ri-user-settings-line text-2xl"></i>
                <span className="hidden md:inline ml-3 mt-1">
                  User Management
                </span>
                <span className="absolute left-full opacity-0 group-hover:opacity-100 bg-white text-black text-xs font-semibold px-2 py-1 rounded shadow-lg ml-2 md:hidden">
                  User Management
                </span>
              </Link>
            </li>

            <li 
              className={`relative flex flex-col items-center md:items-start rounded-2xl hover:shadow hover:text-black hover:bg-ungu10 mb-2 group 
                ${activeMenu === "/manajemen-mitra" ? "bg-ungu10 text-black" : ""}`}
              onClick={() => setActiveMenu("/manajemen-mitra")}
            >              
              <Link to="/manajemen-mitra" className="flex items-center md:ml-2">
                <i className="ri-mail-settings-line text-2xl"></i>
                <span className="hidden md:inline ml-3">
                    Partner Management
                </span>
                <span className="absolute left-full opacity-0 group-hover:opacity-100 bg-white text-black text-xs font-semibold px-2 py-1 rounded shadow-lg ml-2 md:hidden">
                    Partner Management
                </span>
              </Link>
            </li>
          </>
        )}

        {role === 'mitra-hotel' && (
          <>
            <li 
              className={`relative flex flex-col items-center md:items-start rounded-2xl hover:shadow hover:text-black hover:bg-ungu10 mb-2 group 
                ${activeMenu === "/mitra-hotel" ? "bg-ungu10 text-black" : ""}`}
              onClick={() => setActiveMenu("/mitra-hotel")}
            >              
              <Link to="/mitra-hotel" className="flex items-center md:ml-2">
                <i className="ri-home-gear-line text-2xl"></i>
                <span className="hidden md:inline ml-3 mt-1">
                    Home
                </span>
                <span className="absolute left-full opacity-0 group-hover:opacity-100 bg-white text-black text-xs font-semibold px-2 py-1 rounded shadow-lg ml-2 md:hidden">
                    Home
                </span>
              </Link>
            </li>

            <li 
              className={`relative flex flex-col items-center md:items-start rounded-2xl hover:shadow hover:text-black hover:bg-ungu10 mb-2 group 
                ${activeMenu === "/manajemen-hotel" ? "bg-ungu10 text-black" : ""}`}
              onClick={() => setActiveMenu("/manajemen-hotel")}
            >
              <Link to="/manajemen-hotel" className="flex items-center md:ml-2">
                <i className="ri-hotel-bed-fill text-2xl"></i>
                <span className="hidden md:inline ml-3 mt-1">
                    Room Management
                </span>
                <span className="absolute left-full opacity-0 group-hover:opacity-100 bg-white text-black text-xs font-semibold px-2 py-1 rounded shadow-lg ml-2 md:hidden">
                    Room Management
                </span>
              </Link>
            </li>
          </>
        )}

        {role === 'mitra-pesawat' && (
          <>
            <li 
              className={`relative flex flex-col items-center md:items-start rounded-2xl hover:shadow hover:text-black hover:bg-ungu10 mb-2 group 
                ${activeMenu === "/mitra-pesawat" ? "bg-ungu10 text-black" : ""}`}
              onClick={() => setActiveMenu("/mitra-pesawat")}
            >              
              <Link to="/mitra-pesawat" className="flex items-center md:ml-2">
                <i className="ri-home-gear-line text-2xl"></i>
                <span className="hidden md:inline ml-3 mt-1">
                    Home
                </span>
                <span className="absolute left-full opacity-0 group-hover:opacity-100 bg-white text-black text-xs font-semibold px-2 py-1 rounded shadow-lg ml-2 md:hidden">
                    Home
                </span>
              </Link>
            </li>

            <li 
              className={`relative flex flex-col items-center md:items-start rounded-2xl hover:shadow hover:text-black hover:bg-ungu10 mb-2 group 
                ${activeMenu === "/manajemen-pesawat" ? "bg-ungu10 text-black" : ""}`}
              onClick={() => setActiveMenu("/manajemen-pesawat")}
            >
              <Link to="/manajemen-pesawat" className="flex items-center md:ml-2">
                <i className="ri-flight-takeoff-line text-2xl"></i>
                <span className="hidden md:inline ml-3 mt-1">
                    Airplane Management
                </span>
                <span className="absolute left-full opacity-0 group-hover:opacity-100 bg-white text-black text-xs font-semibold px-2 py-1 rounded shadow-lg ml-2 md:hidden">
                    Airplane Management
                </span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar