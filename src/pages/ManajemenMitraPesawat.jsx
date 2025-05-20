import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { getHotels } from "../redux/actions/adminPesawatActions"; // Import action
import Searchbar from "../components/Searchbar";
import TableMitraPesawat from "../components/TableMitraPesawat";

const ManajemenMitraPesawat = ({ isSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState(""); 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHotels()); // Fetch hotel data on mount
  }, [dispatch]);

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-full transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">Partner Management</p>
            <p className="text-xs pt-2 text-gray-600">Pesawat Partner List</p>
          </div>
          <div className="flex flex-row justify-end">
            <Link to="/manajemen-mitra" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <i className="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
          </div>
        </div>
        <div className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="grid grid-cols-2 px-4 items-center">
            <div className="text-left md:text-xl">
              <p>Pesawat Partner List</p>
            </div>
            <div className="flex gap-3 items-center">
              <Searchbar forWhat="partner" onSearch={setSearchQuery} />
              <Link to="/tambah-mitra-pesawat">
                <button className="bg-ungu7 text-white rounded-xl px-2 py-1 hidden md:inline">
                  <i className="ri-add-line mr-1"></i>
                  <span>Partner</span>
                </button>
                <button className="bg-ungu7 text-white rounded-3xl md:rounded-xl px-2 py-2 items-center md:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M22 9V7h-2v2h-2v2h2v2h2v-2h2V9zM8 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 1c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4m4.51-8.95C13.43 5.11 14 6.49 14 8s-.57 2.89-1.49 3.95C14.47 11.7 16 10.04 16 8s-1.53-3.7-3.49-3.95m4.02 9.78C17.42 14.66 18 15.7 18 17v3h2v-3c0-1.45-1.59-2.51-3.47-3.17"></path></svg>
                </button>
              </Link>
            </div>
          </div>
          <div>
            <TableMitraPesawat searchQuery={searchQuery} dataType="pesawat" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManajemenMitraPesawat;
