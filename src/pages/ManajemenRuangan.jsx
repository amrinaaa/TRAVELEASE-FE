import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from 'react-router-dom';
import Searchbar from "../components/Searchbar";
import TableRoom from "../components/TableRoom";
import dataHotel from "../utils/dataHotel.json"; // Import the hotels data

const ManajemenRuangan = ({ isSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const { hotelId } = useParams(); // Get the hotel ID from URL parameters
  const location = useLocation();

  useEffect(() => {
    // Check if there's state passed from navigation
    if (location.state && location.state.hotel) {
      setSelectedHotel(location.state.hotel);
      console.log("Hotel from state:", location.state.hotel.name);
      return;
    }
    
    // Check if there's an ID in the URL parameters
    if (hotelId) {
      console.log("Looking for hotel with ID:", hotelId);
      const hotel = dataHotel.find(a => 
        a.id === parseInt(hotelId) || 
        a.id.toString() === hotelId.toString()
      );
      
      if (hotel) {
        console.log("Found hotel by ID:", hotel.name);
        setSelectedHotel(hotel);
      }
    }
    
    // Check if we should load from localStorage (persisted selection)
    else {
      const savedHotel = localStorage.getItem('selectedHotel');
      if (savedHotel) {
        try {
          const parsedHotel = JSON.parse(savedHotel);
          console.log("Loaded hotel from storage:", parsedHotel.name);
          setSelectedHotel(parsedHotel);
        } catch (e) {
          console.error("Error parsing saved hotel:", e);
        }
      }
    }
  }, [hotelId, location.state]);

  // Handler for when an hotel is selected from the table
  const handleHotelSelect = (hotel) => {
    console.log("Hotel selected:", hotel.name);
    setSelectedHotel(hotel);
    
    // Persist the selection to localStorage
    localStorage.setItem('selectedHotel', JSON.stringify(hotel));
  };

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-full transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">Hotel Management</p>
            <p className="text-xs pt-2 text-gray-600">Room List</p>
          </div>
          <div className="flex flex-row justify-end gap-1">
            <Link to="/manajemen-hotel" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <i className="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
            <Link 
              to={selectedHotel ? `/manajemen-ruangan/${selectedHotel.id}` : "/manajemen-ruangan"} 
              className="flex items-center gap-1 text-black pt-9 md:pt-0"
            >
              <p>/</p>
              <p className="text-xs md:text-sm">Room List</p>
            </Link>
          </div>
        </div>
        <div className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="grid grid-cols-2 px-4 items-center">
            <div className="flex md:flex-row flex-col text-left md:items-center md:gap-2">
              <div className="md:text-2xl text-lg text-ungu7">
                <p>{selectedHotel ? selectedHotel.name : "Nama hotel"}</p>
              </div>
              <div className="md:text-xl md:mt-1">
                <p>Room List</p>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <Searchbar forWhat="room" onSearch={setSearchQuery} />
              {/* <Link to="/tambah-ruangan"> */}
              <Link to={selectedHotel ? `/tambah-ruangan/${selectedHotel.id}` : "/tambah-ruangan"}>
                <button className="bg-ungu7 text-white rounded-xl px-2 py-1 hidden md:inline">
                  <i className="ri-add-line mr-1"></i>
                  <span>Room</span>
                </button>
                <button className="bg-ungu7 text-white rounded-3xl md:rounded-xl px-2 py-2 items-center md:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4.5 20v-1h2V4h8v1h3v14h2v1h-3V6h-2v14zm7-7.23q.31 0 .54-.23t.23-.54t-.23-.54t-.54-.23t-.54.23t-.23.54t.23.54t.54.23"/></svg>
                </button>
              </Link>
            </div>
          </div>
          <div>
            <TableRoom 
              searchQuery={searchQuery} 
              onHotelSelect={handleHotelSelect}
              selectedHotelId={selectedHotel?.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManajemenRuangan