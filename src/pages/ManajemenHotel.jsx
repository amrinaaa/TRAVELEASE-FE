import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Searchbar from "../components/Searchbar";
import TableHotel from "../components/TableHotel";

const ManajemenHotel = ({ isSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState(""); // ⬅️ State untuk pencarian

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-full transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">Hotel Management</p>
            <p className="text-xs pt-2  text-gray-600">Hotel List</p>
          </div>
          <div className="flex flex-row justify-end">
            <Link to="/manajemen-hotel" className="flex items-center gap-1 text-black pt-9 md:pt-0">
              <i class="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
          </div>
        </div>
        <div className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="grid grid-cols-2 px-4 items-center">
            <div className="text-left md:text-xl">
              <p>Hotel List</p>
            </div>
            <div className="flex gap-3 items-center">
              <Searchbar forWhat="hotel" onSearch={setSearchQuery} />
              <Link to="/tambah-hotel">
                <button className="bg-ungu7 text-white rounded-xl px-2 py-1 hidden md:inline">
                  <i className="ri-add-line mr-1"></i>
                  <span>Hotel</span>
                </button>
                <button className="bg-ungu7 text-white rounded-3xl md:rounded-xl px-2 py-2 items-center md:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M5 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1h1a1 1 0 1 1 0 2v11a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2V8a1 1 0 0 1 0-2h1zm12 0v1H7V5zm1 3v11h-3.5v-2.5a2.5 2.5 0 0 0-5 0V19H6V8zm-6 8a.5.5 0 0 1 .5.5V19h-1v-2.5a.5.5 0 0 1 .5-.5m-4-3a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1m8 0a1 1 0 0 1 .993.883L17 14v1a1 1 0 0 1-1.993.117L15 15v-1a1 1 0 0 1 1-1M8 9a1 1 0 0 1 .993.883L9 10v1a1 1 0 0 1-1.993.117L7 11v-1a1 1 0 0 1 1-1m4 0a1 1 0 0 1 .993.883L13 10v1a1 1 0 0 1-1.993.117L11 11v-1a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1"/></g></svg>
                </button>
              </Link>
            </div>
          </div>
          <div>
            <TableHotel searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManajemenHotel