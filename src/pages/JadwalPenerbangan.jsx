import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Searchbar from "../components/Searchbar";
import TableFlight from "../components/TableFlight";

const JadwalPenerbangan = ({ isSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState(""); // ⬅️ State untuk pencarian

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-full transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">Flight Schedule</p>
            <p className="text-xs pt-2  text-gray-600">Flight List</p>
          </div>
          <div className="flex flex-row justify-end">
            <Link to="/jadwal-penerbangan" className="flex items-center gap-1 text-black pt-9 md:pt-0">
              <i class="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
          </div>
        </div>
        <div className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="grid grid-cols-2 px-4 items-center">
            <div className="text-left md:text-xl">
              <p>Flight List</p>
            </div>
            <div className="text-right">
              <Searchbar forWhat="flight" onSearch={setSearchQuery} />
            </div>
          </div>
          <div>
            <TableFlight searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JadwalPenerbangan