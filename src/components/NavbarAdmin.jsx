import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaBars } from "react-icons/fa";
// import { Button } from "@heroui/react"; // Tidak digunakan
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { getAdminProfile } from '../redux/actions/adminAccountActions';
import { resetAdminAccountState } from '../redux/reducers/adminAccountReducer';

const NavbarAdmin = ({ toggleSidebar, isSidebarOpen }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const authState = useSelector((state) => state.auth);
  const { userInfo: authUserInfo } = authState;

  const adminAccount = useSelector((state) => state.adminAccount);
  const { profile: adminProfile, loadingGetProfile } = adminAccount;

  const token = Cookies.get("token");

  useEffect(() => {
    if (token && !adminProfile && !loadingGetProfile) {
      dispatch(getAdminProfile());
    }
  }, [dispatch, token, adminProfile, loadingGetProfile]);

  let displayUser = {
    name: "Admin", // Default name
    profilePicture: null
  };

  if (adminProfile) {
    displayUser.name = adminProfile.name || "Admin";
    displayUser.profilePicture = adminProfile.profilePicture;
  } else if (authUserInfo) {
    displayUser.name = authUserInfo.name || "Admin";
  } else if (token) {
    try {
      const decodedToken = jwtDecode(token);
      displayUser.name = decodedToken.name || "Admin";
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }
  
  const defaultProfilePic = "https://placehold.co/40/A9A9A9/FFFFFF&text=A"; // Placeholder Admin
  const ultimateFallbackSrc = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  const handleImageError = (e) => {
    let resolvedDefaultPicURL;
    try {
      if (defaultProfilePic.startsWith('data:') || defaultProfilePic.startsWith('http')) {
          resolvedDefaultPicURL = defaultProfilePic;
      } else if (typeof window !== 'undefined' && window.location && window.location.origin) {
          resolvedDefaultPicURL = new URL(defaultProfilePic, window.location.origin).href;
      } else {
          resolvedDefaultPicURL = defaultProfilePic; 
      }
    } catch (error) {
        resolvedDefaultPicURL = defaultProfilePic;
    }

    if (e.target.src === resolvedDefaultPicURL) {
        if (e.target.src !== ultimateFallbackSrc) {
          e.target.src = ultimateFallbackSrc;
        }
    } else {
        e.target.onerror = null; 
        e.target.src = defaultProfilePic;
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(resetAdminAccountState());
    setShowDropdown(false);
    window.location.href = "/login"; // Atau /login-admin jika ada halaman login spesifik
  };

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

      <div className='flex items-center gap-3 ml-auto'>
        <p className='text-black'>{displayUser.name}</p>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className='focus:outline-none'
        >
          <img
            src={displayUser.profilePicture || defaultProfilePic} // Mengganti path hardcoded
            alt="Admin Icon"
            className="w-8 h-8 rounded-full border-2 border-gray-400 shadow-lg object-cover"
            onError={handleImageError}
          />
        </button>

          {showDropdown && (
            <div className='absolute bg-white rounded-lg shadow-lg w-52 top-full right-3 border z-20 animate-fadeIn'>
               <div className="p-3 border-b border-gray-200">
                <p className="text-sm font-semibold text-gray-800 truncate">{displayUser.name}</p>
                {adminProfile?.email && <p className="text-xs text-gray-500 truncate">{adminProfile.email}</p>}
              </div>
              <ul className='text-left py-1 text-sm text-gray-700'>
                <li className='px-3 py-2 hover:bg-gray-100'>
                  <Link
                    to="/pengaturan-akun-admin" // Path diperbarui untuk admin
                    className="flex items-center"
                    onClick={() => setShowDropdown(false)}
                  >
                    <i className="ri-user-settings-line text-md mr-2 text-gray-600"></i>
                    Pengaturan Akun
                  </Link>
                </li>
                <li className='px-3 py-2 hover:bg-red-50 hover:text-red-600 border-t border-gray-100'>
                  <button
                    onClick={handleLogout}
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

export default NavbarAdmin;