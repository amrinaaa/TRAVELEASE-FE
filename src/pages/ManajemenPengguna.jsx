import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Searchbar from "../components/Searchbar";
import Table from "../components/Table";

const ManajemenPengguna = ({ isSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState(""); // ⬅️ State untuk pencarian

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-screen transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">User Management</p>
            <p className="text-xs pt-2  text-gray-600">Daftar pengguna</p>
          </div>
          <div className="flex flex-row justify-end">
            <Link to="/manajemen-pengguna" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <i class="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
          </div>
        </div>
        <div className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="grid grid-cols-2 px-4 items-center">
            <div className="text-left md:text-xl">
              <p>Daftar Pengguna</p>
            </div>
            <div className="flex gap-3 items-center">
              <Searchbar forWhat="Pengguna" onSearch={setSearchQuery} />
              <Link to="/tambah-pengguna">
                <button className="bg-ungu7 text-white rounded-xl px-2 py-1 hidden md:inline">
                  <i className="ri-add-line mr-1"></i>
                  <span>Pengguna</span>
                </button>
                <button className="bg-ungu7 text-white rounded-3xl md:rounded-xl px-2 py-1 items-center md:hidden">
                  <i className="ri-user-add-line text-xl"></i>
                </button>
              </Link>
            </div>
          </div>
          <div>
            <Table searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManajemenPengguna