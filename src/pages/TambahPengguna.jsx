import React, { useState } from "react";
import { Link } from 'react-router-dom';

const TambahPengguna = ({ isSidebarOpen }) => {

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-screen transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">User Management</p>
            <p className="text-xs pt-2  text-gray-600">Tambah Pengguna</p>
          </div>
          <div className="flex flex-row justify-end">
            <Link to="/manajemen-pengguna" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <i class="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
            <Link to="/tambah-pengguna" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0 ml-1">
              <p>/</p>
              <p className="text-xs md:text-sm">Tambah Pengguna</p>
            </Link>
          </div>
        </div>
        <div className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="flex-col px-4 items-center">
            <div className="text-left md:text-xl">
              <p>Tambah Pengguna</p>
            </div>
            <div className="pt-8">
                <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col text-right">
                        <label className="block text-gray-700 text-sm md:text-base font-bold mt-2 mb-10 md:mb-9"><span className="text-red-500">*</span> Nama</label>
                        <label className="block text-gray-700 text-sm md:text-base font-bold mb-10 md:mb-8"><span className="text-red-500">*</span> Email</label>
                        <label className="block text-gray-700 text-sm md:text-base font-bold mb-6 md:mb-8"><span className="text-red-500">*</span> Password</label>
                        <label className="block text-gray-700 text-sm md:text-base font-bold"><span className="text-red-500">*</span> Konfirmasi Password</label>
                    </div>
                    <div className="flex flex-col col-span-2">
                        <div className="items-center justify-center mb-4 gap-2">
                            <div className="flex w-full md:w-1/2 items-center border rounded-lg p-2 bg-gray-100">
                              <i className="ri-pencil-fill text-gray-500 mr-2"></i>
                              <input type="text" placeholder="Nama Pengguna" className="w-full bg-transparent focus:outline-none" />
                            </div>
                        </div>
                        <div className="items-center justify-center mb-4 gap-2">
                            <div className="flex w-full md:w-1/2 items-center border rounded-lg p-2 bg-gray-100">
                              <i className="ri-pencil-fill text-gray-500 mr-2"></i>
                              <input type="text" placeholder="Email Pengguna" className="w-full bg-transparent focus:outline-none" />
                            </div>
                        </div>
                        <div className="items-center justify-center mb-4 gap-2">
                            <div className="flex w-full md:w-1/2 items-center border rounded-lg p-2 bg-gray-100">
                              <i className="ri-pencil-fill text-gray-500 mr-2"></i>
                              <input type="password" placeholder="Password" className="w-full bg-transparent focus:outline-none" />
                            </div>
                        </div>
                        <div className="items-center justify-center mb-4 gap-2">
                            <div className="flex w-full md:w-1/2 items-center border rounded-lg p-2 bg-gray-100">
                              <i className="ri-pencil-fill text-gray-500 mr-2"></i>
                              <input type="password" placeholder="Konfirmasi Password" className="w-full bg-transparent focus:outline-none" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center gap-3 m-10">
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg">Reset</button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Submit</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahPengguna