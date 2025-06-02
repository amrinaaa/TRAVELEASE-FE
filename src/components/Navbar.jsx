// import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom'; // useNavigate dihapus karena tidak dipakai lagi untuk logout
// import { Button as HeroButton } from "@heroui/react";
// import { useSelector, useDispatch } from 'react-redux';
// import { jwtDecode } from 'jwt-decode';
// import Cookies from 'js-cookie';
// import { getUserProfile } from '../redux/actions/userAccountActions'; // Sesuaikan path
// import { resetUserAccountState } from '../redux/reducers/userAccountReducer'; // Impor untuk reset state
// import { formatRupiah } from "../utils/formatRupiah"; // Asumsi ada util ini

// const Navbar = () => {
//     const [active, setActive] = useState(false);
//     // const [scroll, setScroll] = useState(false); // scroll state tidak digunakan
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [showTopupModal, setShowTopupModal] = useState(false);

//     const location = useLocation();
//     // const navigate = useNavigate(); // Dihapus
//     const dispatch = useDispatch();

//     const auth = useSelector((state) => state.auth);
//     const { userInfo: authUserInfo } = auth; 
    
//     const userAccount = useSelector((state) => state.userAccount);
//     const { profile: userProfile, loadingGetProfile } = userAccount;

//     let userDisplayInfo = null;
//     let userTokenInfo = null;

//     const token = Cookies.get("token");

//     if (token) {
//         try {
//             userTokenInfo = jwtDecode(token);
//         } catch (error) {
//             console.error("Invalid token:", error);
//             // Pertimbangkan untuk dispatch logout jika token tidak valid
//             // atau hapus cookie di sini jika terdeteksi invalid.
//             // Cookies.remove("token"); 
//             // window.location.reload(); // untuk memaksa refresh state
//         }
//     }
    
//     if (userProfile && !loadingGetProfile) {
//         userDisplayInfo = {
//             name: userProfile.name,
//             profilePicture: userProfile.profilePicture,
//             currentAmount: userProfile.currentAmount,
//             email: userProfile.email, 
//         };
//     } else if (authUserInfo) { 
//          userDisplayInfo = {
//             name: authUserInfo.name,
//             profilePicture: authUserInfo.profilePicture, 
//             currentAmount: authUserInfo.currentAmount, 
//             email: authUserInfo.email, 
//         };
//     } else if (userTokenInfo) { 
//         userDisplayInfo = {
//             name: userTokenInfo.name,
//             profilePicture: userTokenInfo.profilePicture, 
//             currentAmount: userTokenInfo.currentAmount, 
//             email: userTokenInfo.email,
//         };
//     }

//     useEffect(() => {
//         if (token && !userProfile && !loadingGetProfile) {
//             dispatch(getUserProfile());
//         }
//     }, [dispatch, token, userProfile, loadingGetProfile]);


//     const handleClick = () => {
//         setActive(!active);
//     };

//     let menuActive = active ? "right-0" : "-right-full";

//     useEffect(() => {
//         const handleScroll = () => {
//             if (window.scrollY > 5) {
//                 setActive(false); 
//             }
//         };

//         window.addEventListener("scroll", handleScroll);
//         return () => {
//             window.removeEventListener("scroll", handleScroll);
//         };
//     }, []);

//     const isActiveLink = (path) => location.pathname === path ? "text-ungu8 font-bold underline underline-offset-4" : "hover:text-ungu8 hover:underline-offset-4 transition-all";

//     const handleLogoutClick = () => {
//         Cookies.remove("token"); // Hapus cookie token
//         dispatch(resetUserAccountState()); // Reset state userAccount di Redux
//         // Jika Anda memiliki state auth di Redux yang juga perlu di-reset, lakukan di sini
//         // dispatch({ type: 'auth/LOGOUT' }); // Contoh untuk authReducer
//         setShowDropdown(false); // Tutup dropdown
//         setActive(false); // Tutup menu mobile jika terbuka
//         window.location.href = "/"; // Redirect ke halaman utama
//     };
    
//     const defaultProfilePic = "/src/assets/img/default-profile.png"; 

//     return (
//         <div className={`navbar fixed w-full transition-all z-50 bg-ungu4`}>
//             <div className="container mx-auto px-4 text-white">
//                 <div className="navbar-box flex items-center justify-between h-16 md:h-20">
//                     <div className="flex items-center space-x-3">
//                         <Link to="/">
//                             <img 
//                                 src="/src/assets/img/Logo-w.png" 
//                                 alt="logo-navbar"
//                                 className='h-7 md:h-9' 
//                             />
//                         </Link>
//                     </div>
//                     <ul className={`flex lg:gap-10 md:static md:bg-transparent md:flex-row md:shadow-none md:w-auto md:h-full 
//                     md:items-center md:translate-y-0 md:p-0 md:m-0 md:transition-none gap-6 fixed ${menuActive} top-0 right-0 h-screen
//                     flex-col px-8 py-6 pt-24 shadow-lg shadow-slate-500 bg-ungu4 font-medium text-base md:text-sm lg:text-base transition-all md:pt-0 md:h-auto`}>
//                         <li className='flex items-center md:justify-center gap-3'>
//                             <i className="ri-home-line md:hidden block text-xl"></i>
//                             <Link to="/" className={`${isActiveLink('/')}`} onClick={() => setActive(false)}>
//                                 <span>Home</span>
//                             </Link>
//                         </li>
//                         <li className='flex items-center md:justify-center gap-3'>
//                             <i className="ri-hotel-line md:hidden block text-xl"></i>
//                             <Link to="/hotel" className={`${isActiveLink('/hotel')}`} onClick={() => setActive(false)}>Hotels</Link>
//                         </li>
//                         <li className='flex items-center md:justify-center gap-3'>
//                             <i className="ri-flight-takeoff-line md:hidden block text-xl"></i>
//                             <Link to="/pesawat" className={`${isActiveLink('/pesawat')}`} onClick={() => setActive(false)}>Flights</Link>
//                         </li>
                        
//                         {token && userDisplayInfo ? ( 
//                         <li className="relative group md:ml-6">
//                             <button
//                                 onClick={() => setShowDropdown(!showDropdown)}
//                                 className='flex items-center gap-2 text-white focus:outline-none'
//                             >
//                                 <img
//                                     src={userDisplayInfo.profilePicture || defaultProfilePic}
//                                     alt="User"
//                                     className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-white object-cover shadow-md"
//                                     onError={(e) => { e.target.onerror = null; e.target.src=defaultProfilePic; }}
//                                 />
//                                 <span className="hidden lg:block">{userDisplayInfo.name || "User"}</span>
//                                 <i className={`ri-arrow-down-s-line transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}></i>
//                             </button>

//                             {showDropdown && (
//                                 <div className='z-20 absolute bg-white rounded-lg shadow-xl w-52 md:w-60 top-full right-0 mt-2 animate-fadeIn'>
//                                     <div className="p-3 border-b border-gray-200">
//                                         <p className="text-sm font-semibold text-gray-800 truncate">{userDisplayInfo.name || "User"}</p>
//                                         {userDisplayInfo.email && <p className="text-xs text-gray-500 truncate">{userDisplayInfo.email}</p>}
//                                     </div>
//                                     <ul className='text-left py-2 text-sm text-gray-700'>
//                                         <li className='px-3 py-2 hover:bg-gray-100'>
//                                             <Link
//                                                 to="/pengaturan-akun"
//                                                 onClick={() => {setShowDropdown(false); setActive(false);}}
//                                                 className="flex items-center"
//                                             >
//                                                 <i className="ri-user-settings-line text-md mr-2 text-ungu6"></i>
//                                                 Account Settings
//                                             </Link>
//                                         </li>
//                                         <li className='px-3 py-2 hover:bg-gray-100'>
//                                         <button
//                                             onClick={() => {setShowTopupModal(true); setShowDropdown(false); setActive(false);}}
//                                             className="flex items-center w-full text-left"
//                                         >
//                                             <i className="ri-wallet-3-line text-md mr-2 text-ungu6"></i>
//                                             Saldo: {userDisplayInfo.currentAmount !== undefined ? formatRupiah(userDisplayInfo.currentAmount) : 'Rp 0'}
//                                         </button>
//                                         </li>
//                                         <li className='px-3 py-2 hover:bg-gray-100'>
//                                             <Link
//                                                 to="/riwayat-pemesanan"
//                                                 onClick={() => {setShowDropdown(false); setActive(false);}}
//                                                 className="flex items-center"
//                                             >
//                                                 <i className="ri-history-line text-md mr-2 text-ungu6"></i>
//                                                 Order History
//                                             </Link>
//                                         </li>
//                                         <li className='px-3 py-2 hover:bg-red-50 hover:text-red-600'>
//                                             <button
//                                                 onClick={handleLogoutClick} // Menggunakan handleLogoutClick yang baru
//                                                 className="flex items-center w-full text-left"
//                                             >
//                                                 <i className="ri-logout-circle-r-line text-md mr-2"></i>
//                                                 Log out
//                                             </button>
//                                         </li>
//                                     </ul>
//                                 </div>
//                             )}
//                         </li>
//                         ) : (
//                         <div className='flex md:flex-row md:gap-3 flex-col gap-4 mt-6 md:mt-0 md:ml-6'>
//                             <li className='flex items-center justify-center'>
//                             <Link to="/login" onClick={() => setActive(false)}>
//                                 <HeroButton className='text-white border-white bg-transparent hover:bg-white hover:text-ungu4 w-full md:w-auto px-6 py-2' variant="bordered">Log In</HeroButton>
//                             </Link>
//                             </li>
//                             <li className='flex items-center justify-center'>
//                             <Link to="/register" onClick={() => setActive(false)}>
//                                 <HeroButton className='text-ungu4 bg-white hover:bg-gray-200 w-full md:w-auto px-6 py-2'>Register</HeroButton>
//                             </Link>
//                             </li>
//                         </div>
//                         )}
//                     </ul>
//                     <div className="md:hidden">
//                         <i 
//                             className={`${active ? "ri-close-large-line" : "ri-menu-3-line"} text-3xl cursor-pointer`}
//                             onClick={handleClick}>
//                         </i>
//                     </div>
//                 </div>
//             </div>

//             {showTopupModal && (
//             <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
//                 <div className="bg-white rounded-xl p-6 md:p-8 text-center relative w-[90%] max-w-md shadow-2xl animate-modalShow">
//                 <h2 className="text-2xl font-bold mb-4 text-gray-800">Top up Saldo</h2>
//                 <p className="text-sm text-gray-600 mb-1">
//                     Silahkan hubungi admin melalui kontak WhatsApp dibawah ini dengan melampirkan:
//                 </p>
//                 <ul className="text-left text-sm text-gray-600 mb-4 list-disc list-inside pl-2 bg-gray-50 p-3 rounded-md">
//                     <li><span className="font-semibold">Username anda</span> (Email yang terdaftar)</li>
//                     <li><span className="font-semibold">Nominal Top-up</span> yang diinginkan</li>
//                 </ul>
//                 <p className="text-gray-700 font-semibold mb-1">Admin Travelease:</p>
//                 <p className="text-lg text-green-600 font-bold mb-6">+62 811 590976</p>

//                 <a
//                     href="https://wa.me/62811590976?text=Halo%20Admin%20Travelease,%20saya%20ingin%20melakukan%20top-up%20saldo."
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 px-6 rounded-full transition-colors duration-150 w-full md:w-auto"
//                 >
//                     <i className="ri-whatsapp-line mr-2 text-xl"></i>
//                     Hubungi via WhatsApp
//                 </a>

//                 <button
//                     onClick={() => setShowTopupModal(false)}
//                     className="absolute top-3 right-3 text-3xl text-gray-400 hover:text-gray-600 transition-colors"
//                     aria-label="Close modal"
//                 >
//                     &times;
//                 </button>
//                 </div>
//             </div>
//             )}
//         </div>
//     )
// }

// export default Navbar;

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // useNavigate dihapus karena tidak dipakai lagi untuk logout
import { Button as HeroButton } from "@heroui/react";
import { useSelector, useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { getUserProfile } from '../redux/actions/userAccountActions'; // Sesuaikan path
import { resetUserAccountState } from '../redux/reducers/userAccountReducer'; // Impor untuk reset state
import { formatRupiah } from "../utils/formatRupiah";

const Navbar = () => {
    const [active, setActive] = useState(false);
    const [scroll, setScroll] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showTopupModal, setShowTopupModal] = useState(false);

    const location = useLocation();
    const dispatch = useDispatch();

    const auth = useSelector((state) => state.auth);
    const { userInfo: authUserInfo } = auth; 
    
    const userAccount = useSelector((state) => state.userAccount);
    const { profile: userProfile, loadingGetProfile } = userAccount;

    let userDisplayInfo = null;
    let userTokenInfo = null;

    const token = Cookies.get("token");

    if (token) {
        try {
            userTokenInfo = jwtDecode(token);
        } catch (error) {
            console.error("Invalid token:", error);
        }
    }
    
    if (userProfile && !loadingGetProfile) {
        userDisplayInfo = {
            name: userProfile.name,
            profilePicture: userProfile.profilePicture,
            currentAmount: userProfile.currentAmount,
            email: userProfile.email, 
        };
    } else if (authUserInfo) { 
         userDisplayInfo = {
            name: authUserInfo.name,
            profilePicture: authUserInfo.profilePicture, 
            currentAmount: authUserInfo.currentAmount, 
            email: authUserInfo.email, 
        };
    } else if (userTokenInfo) { 
        userDisplayInfo = {
            name: userTokenInfo.name,
            profilePicture: userTokenInfo.profilePicture, 
            currentAmount: userTokenInfo.currentAmount, 
            email: userTokenInfo.email,
        };
    }

    useEffect(() => {
        if (token && !userProfile && !loadingGetProfile) {
            dispatch(getUserProfile());
        }
    }, [dispatch, token, userProfile, loadingGetProfile]);


    const handleClick = () => {
        setActive(!active);
    };

    let menuActive = active ? "right-0" : "-right-full";

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 5) {
                setScroll(true);
                setActive(false);
            } else {
                setScroll(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const isActiveLink = (path) => location.pathname === path ? "text-ungu8 font-bold underline underline-offset-4" : "hover:text-ungu8 hover:underline-offset-4 transition-all";

    const handleLogoutClick = () => {
        Cookies.remove("token"); 
        dispatch(resetUserAccountState()); 
        setShowDropdown(false); 
        setActive(false); 
        window.location.href = "/"; 
    };
    
    const defaultProfilePic = "/src/assets/img/default-profile.png"; // Pastikan path ini BENAR dan file ada
    const ultimateFallbackSrc = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // 1x1 transparent gif

    const handleImageError = (e) => {
        // Cek apakah src yang gagal adalah defaultProfilePic itu sendiri
        // Perlu resolve URL defaultProfilePic ke bentuk absolut untuk perbandingan yang akurat jika ia adalah path relatif
        let resolvedDefaultPicURL;
        try {
            // window.location.origin mungkin tidak tersedia di semua environment (sangat jarang, misal non-browser)
            // Jika defaultProfilePic sudah URL absolut atau data URI, URL constructor akan error atau tidak sesuai
            if (defaultProfilePic.startsWith('data:') || defaultProfilePic.startsWith('http')) {
                resolvedDefaultPicURL = defaultProfilePic;
            } else if (typeof window !== 'undefined' && window.location && window.location.origin) {
                resolvedDefaultPicURL = new URL(defaultProfilePic, window.location.origin).href;
            } else {
                resolvedDefaultPicURL = defaultProfilePic; // Fallback jika tidak bisa resolve
            }
        } catch (error) {
            resolvedDefaultPicURL = defaultProfilePic; // Fallback jika URL constructor gagal
        }

        if (e.target.src === resolvedDefaultPicURL) {
            // Jika yang gagal adalah defaultProfilePic, gunakan ultimate fallback (gambar transparan)
            // dan jangan setel ulang onError handler karena ini adalah fallback terakhir.
            if (e.target.src !== ultimateFallbackSrc) { // Hindari loop jika ultimateFallbackSrc juga entah bagaimana error
              e.target.src = ultimateFallbackSrc;
            }
        } else {
            // Jika yang gagal adalah gambar profil asli, coba defaultProfilePic.
            // Setel e.target.onerror = null agar jika defaultProfilePic juga gagal,
            // handler ini tidak akan terpanggil lagi dalam infinite loop untuk elemen ini.
            e.target.onerror = null; 
            e.target.src = defaultProfilePic;
        }
    };

    return (
        <div className={`navbar fixed w-full transition-all z-50 bg-ungu4`}>
            <div className="container mx-auto px-4 text-white">
                <div className="navbar-box flex items-center justify-between">
                    <div className="flex items-center space-x-3 h-16">
                        <Link to="/">
                            <img 
                                src="/src/assets/img/Logo-w.png" 
                                alt="logo-navbar"
                                className='h-7 md:h-9' 
                            />
                        </Link>
                    </div>
                    <ul className={`flex lg:gap-12 md:static md:bg-transparent md:flex-row md:shadow-none md:w-auto md:h-full 
                    md:translate-y-0 md:p-0 md:m-0 md:transition-none gap-6 fixed ${menuActive} top-[172px] -translate-y-1/2 
                    flex-col px-8 py-6 rounded-bl-lg shadow-lg shadow-slate-300 bg-ungu4 font-bold transition-all`}>
                        <li className='flex items-center justify-center gap-3'>
                            <i className="ri-home-line md:hidden block"></i>
                            <Link to="/" className={`font-medium ${isActiveLink('/')}`}>
                                <span>Home</span>
                            </Link>
                        </li>
                        <li className='flex items-center justify-center gap-3'>
                            <i className="ri-hotel-line md:hidden block"></i>
                            <Link to="/hotel" className={`font-medium ${isActiveLink('/hotel')}`}>Hotels</Link>
                        </li>
                        <li className='flex items-center justify-center gap-3'>
                            <i className="ri-flight-takeoff-line md:hidden block"></i>
                            <Link to="/pesawat" className={`font-medium ${isActiveLink('/pesawat')}`}>Flights</Link>
                        </li>
                        
                        {token && userDisplayInfo ? ( 
                        <li className="relative group">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className='flex items-center gap-2 text-white focus:outline-none'
                            >
                                <img
                                    // Jika userDisplayInfo.profilePicture ada (bukan null/undefined/""), gunakan itu. Jika tidak, gunakan defaultProfilePic.
                                    src={userDisplayInfo.profilePicture || defaultProfilePic}
                                    alt="User"
                                    className="w-8 h-8 ml-3 md:ml-0 rounded-full border-2 border-white object-cover shadow-md"
                                    onError={handleImageError} // Menggunakan handler baru
                                />
                                <span className="hidden lg:block">{userDisplayInfo.name || "User"}</span>
                                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}></i>
                            </button>

                            {showDropdown && (
                                <div className='z-20 absolute bg-white rounded-lg shadow-xl w-52 md:w-50 top-full right-0 mt-2 animate-fadeIn'>
                                    <div className="p-3 border-b border-gray-200">
                                        <p className="text-sm font-semibold text-gray-800 truncate">{userDisplayInfo.name || "User"}</p>
                                        {userDisplayInfo.email && <p className="text-xs text-gray-500 truncate">{userDisplayInfo.email}</p>}
                                    </div>
                                    <ul className='text-left py-2 text-sm text-gray-700'>
                                        <li className='px-3 py-2 hover:bg-gray-100'>
                                            <Link
                                                to="/pengaturan-akun"
                                                onClick={() => {setShowDropdown(false); setActive(false);}}
                                                className="flex items-center"
                                            >
                                                <i className="ri-user-settings-line text-md mr-2 text-ungu6"></i>
                                                Account Settings
                                            </Link>
                                        </li>
                                        <li className='px-3 py-2 hover:bg-gray-100'>
                                        <button
                                            onClick={() => {setShowTopupModal(true); setShowDropdown(false); setActive(false);}}
                                            className="flex items-center w-full text-left"
                                        >
                                            <i className="ri-wallet-3-line text-md mr-2 text-ungu6"></i>
                                            Saldo: {userDisplayInfo.currentAmount !== undefined ? formatRupiah(userDisplayInfo.currentAmount) : 'Rp 0'}
                                        </button>
                                        </li>
                                        <li className='px-3 py-2 hover:bg-gray-100'>
                                            <Link
                                                to="/riwayat-pemesanan"
                                                onClick={() => {setShowDropdown(false); setActive(false);}}
                                                className="flex items-center"
                                            >
                                                <i className="ri-history-line text-md mr-2 text-ungu6"></i>
                                                Order History
                                            </Link>
                                        </li>
                                        <li className='px-3 py-2 hover:bg-red-50 hover:text-red-600'>
                                            <button
                                                onClick={handleLogoutClick} 
                                                className="flex items-center w-full text-left"
                                            >
                                                <i className="ri-logout-circle-r-line text-md mr-2"></i>
                                                Log out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </li>
                        ) : (
                        <div className='flex md:flex-row md:gap-3 flex-col gap-4 mt-6 md:mt-0 md:ml-6'>
                            <li className='flex items-center justify-center'>
                            <Link to="/login" onClick={() => setActive(false)}>
                                <HeroButton className='text-white border-white bg-transparent hover:bg-white hover:text-ungu4 w-full md:w-auto px-6 py-2' variant="bordered">Log In</HeroButton>
                            </Link>
                            </li>
                            <li className='flex items-center justify-center'>
                            <Link to="/register" onClick={() => setActive(false)}>
                                <HeroButton className='text-ungu4 bg-white hover:bg-gray-200 w-full md:w-auto px-6 py-2'>Register</HeroButton>
                            </Link>
                            </li>
                        </div>
                        )}
                    </ul>
                    <div className="md:hidden">
                        <i 
                            className={`${active ? "ri-close-large-line" : "ri-menu-3-line"} text-3xl cursor-pointer`}
                            onClick={handleClick}>
                        </i>
                    </div>
                </div>
            </div>

            {showTopupModal && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
                <div className="bg-white rounded-xl p-6 md:p-8 text-center relative w-[90%] max-w-md shadow-2xl animate-modalShow">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Top up Saldo</h2>
                <p className="text-sm text-gray-600 mb-1">
                    Silahkan hubungi admin melalui kontak WhatsApp dibawah ini dengan melampirkan:
                </p>
                <ul className="text-left text-sm text-gray-600 mb-4 list-disc list-inside pl-2 bg-gray-50 p-3 rounded-md">
                    <li><span className="font-semibold">Username anda</span> (Email yang terdaftar)</li>
                    <li><span className="font-semibold">Nominal Top-up</span> yang diinginkan</li>
                </ul>
                <p className="text-gray-700 font-semibold mb-1">Admin Travelease:</p>
                <p className="text-lg text-green-600 font-bold mb-6">+62 811 590976</p>

                <a
                    href="https://wa.me/62811590976?text=Halo%20Admin%20Travelease,%20saya%20ingin%20melakukan%20top-up%20saldo."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 px-6 rounded-full transition-colors duration-150 w-full md:w-auto"
                >
                    <i className="ri-whatsapp-line mr-2 text-xl"></i>
                    Hubungi via WhatsApp
                </a>

                <button
                    onClick={() => setShowTopupModal(false)}
                    className="absolute top-3 right-3 text-3xl text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close modal"
                >
                    &times;
                </button>
                </div>
            </div>
            )}
        </div>
    )
}

export default Navbar;