import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Pencil } from "lucide-react";

const EditPengguna = ({ isSidebarOpen }) => {
  const [image, setImage] = useState("https://via.placeholder.com/100"); // Default avatar

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-screen transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">User Management</p>
            <p className="text-xs pt-2  text-gray-600">Edit Pengguna</p>
          </div>
          <div className="flex flex-row justify-end">
            <Link to="/manajemen-pengguna" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <i class="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
            <Link to="/edit-pengguna" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0 ml-1">
              <p>/</p>
              <p className="text-xs md:text-sm">Edit Pengguna</p>
            </Link>
          </div>
        </div>
        <div className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="flex-col px-4 items-center">
            <div className="text-left md:text-xl">
              <p>Edit Pengguna</p>
            </div>
            <div className="grid grid-cols-2 items-center">
                <div className="relative w-24 h-24">
                    <img
                        src={image}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover border-2 border-gray-300 shadow-md"
                    />
                    <label className="absolute bottom-0 right-0 bg-green-500 p-2 rounded-full border-2 border-white cursor-pointer">
                        <Pencil size={16} color="white" />
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                    </div>
                <div className="flex flex-col">
                    <div>
                        User ID
                    </div>
                    <div>
                        Nama
                    </div>
                    <div>
                        Email
                    </div>
                    <div>
                        password
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPengguna