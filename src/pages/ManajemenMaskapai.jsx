import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Searchbar from "../components/Searchbar";
import TableAirline from "../components/TableAirline";

const ManajemenMaskapai = ({ isSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState(""); // ⬅️ State untuk pencarian

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-full transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">Airline Management</p>
            <p className="text-xs pt-2  text-gray-600">Airline List</p>
          </div>
          <div className="flex flex-row justify-end">
            <Link to="/manajemen-maskapai" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <i class="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
          </div>
        </div>
        <div className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="grid grid-cols-2 px-4 items-center">
            <div className="text-left md:text-xl">
              <p>Airline List</p>
            </div>
            <div className="flex gap-3 items-center">
              <Searchbar forWhat="airline" onSearch={setSearchQuery} />
              <Link to="/tambah-maskapai">
                <button className="bg-ungu7 text-white rounded-xl px-2 py-1 hidden md:inline">
                  <i className="ri-add-line mr-1"></i>
                  <span>Airline</span>
                </button>
                <button className="bg-ungu7 text-white rounded-3xl md:rounded-xl px-2 py-2 items-center md:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M15.97 13.83A5.9 5.9 0 0 0 13.82 16l-2.27-4.37l-3.89 3.87L8 18l-1.05 1.06l-1.77-3.19L2 14.11l1.06-1.06l2.48.35l3.89-3.9L2 5.62l1.41-1.41l9.2 2.12l3.89-3.89a1.49 1.49 0 0 1 2.12 0c.58.59.58 1.56 0 2.12l-3.89 3.89zM20 18v-3h-2v3h-3v2h3v3h2v-3h3v-2z"></path></svg>
                </button>
              </Link>
            </div>
          </div>
          <div>
            <TableAirline searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManajemenMaskapai