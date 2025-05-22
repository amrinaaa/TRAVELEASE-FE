import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import Searchbar from "../components/Searchbar";
import TableCustomer from "../components/TableCustomer";
import dataPenerbangan from "../utils/dataPenerbangan.json"; // ⬅️ Import data penerbangan

const ListPenggunaPesawat = ({ isSidebarOpen }) => {
  const { flightId } = useParams(); // ⬅️ Ambil id dari URL
  const [searchQuery, setSearchQuery] = useState("");
  const [flightName, setFlightName] = useState("");

  useEffect(() => {
    const selectedFlight = dataPenerbangan.find(flight => flight.id.toString() === flightId);
    if (selectedFlight) {
      setFlightName(selectedFlight.name);
    }
  }, [flightId]);

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-full transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">Flight Schedule</p>
            <p className="text-xs pt-2 text-gray-600">Customer List</p>
          </div>
          <div className="flex flex-row justify-end">
            <Link to="/jadwal-penerbangan" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <i className="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
            <Link to={`/list-pengguna-pesawat/${flightId}`} className="flex items-center gap-1 text-black pt-9 md:pt-0 ml-1">
              <p>/</p>
              <p className="text-xs md:text-sm">Plane List</p>
            </Link>
          </div>
        </div>

        <div className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="grid grid-cols-2 px-4 items-center">
            <div className="flex md:flex-row flex-col text-left md:items-center md:gap-2">
              <div className="md:text-2xl text-lg text-ungu7">
                <p>{flightName}</p> {/* ⬅️ Nama pesawat tampil di sini */}
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
            <TableCustomer searchQuery={searchQuery} flightId={flightId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListPenggunaPesawat