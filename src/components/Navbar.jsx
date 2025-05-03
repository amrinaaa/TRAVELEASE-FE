import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {Button} from "@heroui/react";

const Navbar = () => {
    const [active, setActive] = useState(false);
    const [scroll, setScroll] = useState(false);

    const location = useLocation();

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
                    md:translate-y-0 md:p-0 md:m-0 md:transition-none gap-6 fixed ${menuActive} top-[208px] -translate-y-1/2 
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
                    </ul>
                    <i 
                        className={`${active ? "ri-close-line" : "ri-menu-3-line"} text-3xl md:hidden block`}onClick={handleClick}>
                    </i>
                </div>
            </div>
        </div>
    )
}

export default Navbar