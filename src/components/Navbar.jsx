// import React from 'react';
// import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

// const user = {
//   name: 'Tom Cook',
//   email: 'tom@example.com',
//   imageUrl:
//     'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
// };

// const navigation = [
//   { name: 'Home', href: '#', current: true },
//   { name: 'Hotels', href: '#', current: false },
//   { name: 'Plants', href: '#', current: false },
// ];

// const userNavigation = [
//   { name: 'Your Profile', href: '#' },
//   { name: 'Settings', href: '#' },
//   { name: 'Sign out', href: '#' },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

// const Navbar = () => {
//   return (
//     <div className="min-h-full">
//       <Disclosure as="nav" className="bg-ungu1 fixed w-full top-0 z-50">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="flex h-16 items-center justify-between">
//             <div className="flex items-center">
//               <div className="shrink-0">
//                 <h1 className='text-3xl text-white font-bold'>TravelEase</h1>
//               </div>
//               <div className="hidden md:block">
//                 <div className="ml-10 flex items-baseline space-x-4">
//                   {navigation.map((item) => (
//                     <a
//                       key={item.name}
//                       href={item.href}
//                       aria-current={item.current ? 'page' : undefined}
//                       className={classNames(
//                         item.current ? 'bg-ungu4 text-white' : 'text-gray-300 hover:bg-ungu3 hover:text-white',
//                         'rounded-md px-3 py-2 text-sm font-medium',
//                       )}
//                     >
//                       {item.name}
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div className="hidden md:block">
//               <div className="ml-4 flex items-center md:ml-6">
//                 <button
//                   type="button"
//                   className="relative rounded-full bg-ungu2 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
//                 >
//                   <span className="absolute -inset-1.5" />
//                   <span className="sr-only">View notifications</span>
//                   <BellIcon aria-hidden="true" className="size-6" />
//                 </button>

//                 {/* Profile dropdown */}
//                 <Menu as="div" className="relative ml-3">
//                   <div>
//                     <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
//                       <span className="absolute -inset-1.5" />
//                       <span className="sr-only">Open user menu</span>
//                       <img alt="" src={user.imageUrl} className="size-8 rounded-full" />
//                     </MenuButton>
//                   </div>
//                   <MenuItems
//                     transition
//                     className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
//                   >
//                     {userNavigation.map((item) => (
//                       <MenuItem key={item.name}>
//                         <a
//                           href={item.href}
//                           className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
//                         >
//                           {item.name}
//                         </a>
//                       </MenuItem>
//                     ))}
//                   </MenuItems>
//                 </Menu>
//               </div>
//             </div>
//             <div className="-mr-2 flex md:hidden">
//               {/* Mobile menu button */}
//               <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-ungu4 p-2 text-white hover:bg-ungu3 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
//                 <span className="absolute -inset-0.5" />
//                 <span className="sr-only">Open main menu</span>
//                 <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
//                 <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
//               </DisclosureButton>
//             </div>
//           </div>
//         </div>

//         <DisclosurePanel className="md:hidden">
//           <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
//             {navigation.map((item) => (
//               <DisclosureButton
//                 key={item.name}
//                 as="a"
//                 href={item.href}
//                 aria-current={item.current ? 'page' : undefined}
//                 className={classNames(
//                   item.current ? 'bg-ungu4 text-white' : 'text-gray-300 hover:bg-ungu3 hover:text-white',
//                   'block rounded-md px-3 py-2 text-base font-medium',
//                 )}
//               >
//                 {item.name}
//               </DisclosureButton>
//             ))}
//           </div>
//           <div className="border-t border-white pt-4 pb-3">
//             <div className="flex items-center px-5">
//               <div className="shrink-0">
//                 <img alt="" src={user.imageUrl} className="size-10 rounded-full" />
//               </div>
//               <div className="ml-3">
//                 <div className="text-base/5 font-medium text-white">{user.name}</div>
//                 <div className="text-sm font-medium text-gray-400">{user.email}</div>
//               </div>
//               <button
//                 type="button"
//                 className="relative ml-auto shrink-0 rounded-full bg-ungu4 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
//               >
//                 <span className="absolute -inset-1.5" />
//                 <span className="sr-only">View notifications</span>
//                 <BellIcon aria-hidden="true" className="size-6" />
//               </button>
//             </div>
//             <div className="mt-3 space-y-1 px-2">
//               {userNavigation.map((item) => (
//                 <DisclosureButton
//                   key={item.name}
//                   as="a"
//                   href={item.href}
//                   className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-ungu3 hover:text-white"
//                 >
//                   {item.name}
//                 </DisclosureButton>
//               ))}
//             </div>
//           </div>
//         </DisclosurePanel>
//       </Disclosure>
//     </div>
//   );
// };

// export default Navbar

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {Button} from "@heroui/react";

const Navbar = () => {
    const [active, setActive] = useState(false);

    const location = useLocation();

    const handleClick = () => {
        setActive(!active);
    };

    let menuActive = active ? "right-0" : "-right-full";

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 5) {
                setScroll(true);
                setActive(false);
            } else {
                setScroll(false);
            }
        });
    });

    const isActiveLink = (path) => location.pathname === path ? "text-ungu8 font-bold underline underline-offset-4" : "hover:text-ungu8 hover:underline-offset-4 transition-all";

    return (
        <div className={`navbar fixed w-full transition-all z-50 bg-ungu1`}>
            <div className="container mx-auto px-4 text-white">
                <div className="navbar-box flex items-center justify-between">
                    <div className="flex items-center space-x-3 h-16">
                        <Link to="/">
                            <img 
                                src="/src/assets/img/LogoNavbar.png" 
                                alt="logo-navbar"
                                className='h-24 md:h-28' 
                            />
                        </Link>
                    </div>
                    <ul className={`flex lg:gap-12 md:static md:bg-transparent md:flex-row md:shadow-none md:w-auto md:h-full 
                    md:translate-y-0 md:p-0 md:m-0 md:transition-none gap-6 fixed ${menuActive} top-[208px] -translate-y-1/2 
                    flex-col px-8 py-6 rounded-bl-lg shadow-lg shadow-slate-300 bg-ungu3 font-bold transition-all`}>
                        <li className='flex items-center justify-center gap-3'>
                            <i className="ri-home-line md:hidden block"></i>
                            <Link to="/" className={`font-medium ${isActiveLink('/')}`}>Home</Link>
                        </li>
                        <li className='flex items-center justify-center gap-3'>
                            <i className="ri-hotel-line md:hidden block"></i>
                            <Link to="/hotels" className={`font-medium ${isActiveLink('/hotels')}`}>Hotels</Link>
                        </li>
                        <li className='flex items-center justify-center gap-3'>
                            <i className="ri-flight-takeoff-line md:hidden block"></i>
                            <Link to="/flights" className={`font-medium ${isActiveLink('/flights')}`}>Flights</Link>
                        </li>
                        <div className='flex md:flex-row md:gap-2 flex-col gap-4'>
                          <li className='flex items-center justify-center gap-3'>
                            <Link to="/login">
                              <Button className='text-white border-white bg-ungu1' variant="bordered">Log In</Button>
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