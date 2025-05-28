import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {Button} from "@heroui/react";
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';


const Navbar = () => {
    const [active, setActive] = useState(false);
    const [scroll, setScroll] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showTopupModal, setShowTopupModal] = useState(false);

    const location = useLocation();

    const auth = useSelector((state) => state.auth);
    const { userInfo } = auth;

    let user = userInfo;

    if (!user && Cookies.get("token")) {
    try {
        user = jwtDecode(Cookies.get("token"));
    } catch (error) {
        console.error("Invalid token:", error);
    }
    }

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
                        {user ? (
                        <div className='flex items-center gap-3 ml-auto'>
                            <p>{user?.name || "User"}</p>
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className='text-white focus:outline-none'
                                >
                                    <img
                                    src="/path-to-your-image/image.png"
                                    alt="User Icon"
                                    className="w-6 h-6 rounded-full border-2 border-black shadow-lg"
                                    />
                                </button>

                                {showDropdown && (
                                    <div className='z-10 absolute bg-white rounded-lg shadow w-44 top-full right-0 mt-2'>
                                    <ul className='text-left px-3 py-2 text-sm text-gray-950'>
                                        <li className='py-1 hover:text-blue-600'>
                                            <Link
                                                to="/pengaturan-akun"
                                                onClick={() => setShowDropdown(false)}
                                                className="flex items-center"
                                            >
                                                <i className="ri-user-settings-line text-md mr-2"></i>
                                                Account Settings
                                            </Link>
                                        </li>
                                        <li className='py-1 hover:text-blue-600'>
                                        <button
                                            onClick={() => setShowTopupModal(true)}
                                            className="flex items-center w-full text-left"
                                        >
                                            <i className="ri-wallet-3-line text-md mr-2"></i>
                                            Rp. 90000
                                        </button>
                                        </li>
                                        <li className='py-1 hover:text-blue-600'>
                                            <Link
                                                to="/riwayat-pemesanan"
                                                className="flex items-center"
                                            >
                                                <i className="ri-history-line text-md mr-2"></i>
                                                Order History
                                            </Link>
                                        </li>
                                        <li className='hover:text-red-600'>
                                            <button
                                                onClick={() => {
                                                Cookies.remove("token");
                                                window.location.href = "/";
                                                }}
                                                className="flex items-center"
                                            >
                                                <i className="ri-logout-circle-r-line text-md mr-2"></i>
                                                Log out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        ) : (
                        <div className='flex md:flex-row md:gap-2 flex-col gap-4'>
                            <li className='flex items-center justify-center gap-3'>
                            <Link to="/login">
                                <Button className='text-white border-white bg-ungu4' variant="bordered">Log In</Button>
                            </Link>
                            </li>
                            <li className='flex items-center justify-center gap-3'>
                            <Link to="/register">
                                <Button className='text-ungu1 bg-ungu10'>Register</Button>
                            </Link>
                            </li>
                        </div>
                        )}
                    </ul>
                    <i 
                        className={`${active ? "ri-close-line" : "ri-menu-3-line"} text-3xl md:hidden block`}onClick={handleClick}>
                    </i>
                </div>
            </div>
            {showTopupModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-xl p-6 text-center relative w-[90%] max-w-md">
                <h2 className="text-2xl font-bold mb-4">Top up Saldo</h2>
                <p className="text-sm text-black mb-3">
                    Silahkan hubungi admin melalui kontak WhatsApp dibawah ini dengan melampirkan:
                </p>
                <ul className="text-left text-sm text-black mb-3 list-disc pl-5">
                    <li>Username travelease</li>
                    <li>Nominal Top-up</li>
                </ul>
                <p className="text-black font-semibold mb-4">Admin: +62811590976</p>

                <a
                    href="https://wa.me/62811590976"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-green-400 hover:bg-green-500 text-black font-bold py-2 px-6 rounded-full"
                >
                    Hubungi kami
                </a>

                <button
                    onClick={() => setShowTopupModal(false)}
                    className="absolute top-2 right-4 text-2xl text-gray-700 hover:text-black"
                >
                    &times;
                </button>
                </div>
            </div>
            )}
        </div>
    )
}

export default Navbar