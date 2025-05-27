import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import Searchbar from "../components/Searchbar";
import TableCustomerHotel from "../components/TableCustomerHotel";
import dataHotel from "../utils/dataHotel.json"; // ⬅️ Import data Hotel

const CustomerPesawat = ({ isSidebarOpen }) => {
  const { hotelId } = useParams(); // ⬅️ Ambil id dari URL
  const [searchQuery, setSearchQuery] = useState("");
  const [hotelName, setHotelName] = useState("");

  useEffect(() => {
    const selectedHotel = dataHotel.find(hotel => hotel.id.toString() === hotelId);
    if (selectedHotel) {
      setHotelName(selectedHotel.name);
    }
  }, [hotelId]);

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-full transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">Hotel Management</p>
            <p className="text-xs pt-2 text-gray-600">Customer List</p>
          </div>
          <div className="flex flex-row justify-end">
            <Link to="/manajemen-hotel" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <i className="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
            <Link to={`/list-pengguna-hotel/${hotelId}`} className="flex items-center gap-1 text-black pt-9 md:pt-0 ml-1">
              <p>/</p>
              <p className="text-xs md:text-sm">Customer List</p>
            </Link>
          </div>
        </div>

        <div className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="grid grid-cols-2 px-4 items-center">
            <div className="flex md:flex-row flex-col text-left md:items-center md:gap-2">
              <div className="md:text-2xl text-lg text-ungu7">
                <p>{hotelName}</p> 
              </div>
              <div className="md:text-xl md:mt-1">
                <p>Customer List</p>
              </div>
            </div>
            <div className="text-right">
              <Searchbar forWhat="customer" onSearch={setSearchQuery} />
            </div>
          </div>
          <div>
            <TableCustomerHotel searchQuery={searchQuery} hotelId={hotelId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPesawat