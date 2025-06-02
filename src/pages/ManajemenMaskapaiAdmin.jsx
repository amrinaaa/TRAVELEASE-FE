import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Searchbar from "../components/Searchbar";
import TableAirline from "../components/TableAirline";

const ManajemenMaskapaiAdmin = ({ isSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState(""); // ⬅️ State untuk pencarian

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-full transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">Partner Management</p>
            <p className="text-xs pt-2  text-gray-600">Airline List</p>
          </div>
          <div className="flex flex-row justify-end">
            <Link to="/manajemen-mitra-pesawat" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <i class="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm mr-1">Home</p>
            </Link>
            <Link to="/mitra-pesawat-admin" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <p>/</p>
              <p className="text-xs md:text-sm">Airline List</p>
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

export default ManajemenMaskapaiAdmin