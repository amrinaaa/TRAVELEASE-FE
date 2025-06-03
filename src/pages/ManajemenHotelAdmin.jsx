import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from 'react-router-dom';
import Searchbar from "../components/Searchbar";
import TableHotelAdmin from "../components/TableHotelAdmin";

const ManajemenHotelAdmin = ({ isSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMitra, setSelectedMitra] = useState(null);
  const { mitraId } = useParams(); // Get the mitra ID from URL parameters
  const location = useLocation();

  useEffect(() => {
    // Check if there's state passed from navigation
    if (location.state && location.state.mitra) {
      setSelectedMitra(location.state.mitra);
      console.log("Mitra from state:", location.state.mitra.name);
      return;
    }
    
    // Check if there's an ID in the URL parameters
    if (mitraId) {
      console.log("Looking for mitra with ID:", mitraId);
      // Note: You'll need to replace this with actual data source or API call
      // const mitra = dataMitras.find(m => 
      //   m.id === parseInt(mitraId) || 
      //   m.id.toString() === mitraId.toString()
      // );
      
      // For now, create a placeholder mitra object
      const mitra = { id: mitraId, name: `Mitra ${mitraId}` };
      
      if (mitra) {
        console.log("Found mitra by ID:", mitra.name);
        setSelectedMitra(mitra);
      }
    }
    
    // Check if we should load from localStorage (persisted selection)
    else {
      const savedMitra = localStorage.getItem('selectedMitra');
      if (savedMitra) {
        try {
          const parsedMitra = JSON.parse(savedMitra);
          console.log("Loaded mitra from storage:", parsedMitra.name);
          setSelectedMitra(parsedMitra);
        } catch (e) {
          console.error("Error parsing saved mitra:", e);
        }
      }
    }
  }, [mitraId, location.state]);

  // Handler for when a mitra is selected from the table
  const handleMitraSelect = (mitra) => {
    console.log("Mitra selected:", mitra.name);
    setSelectedMitra(mitra);
    
    // Persist the selection to localStorage
    localStorage.setItem('selectedMitra', JSON.stringify(mitra));
  };

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-full transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">Partner Management</p>
            <p className="text-xs pt-2 text-gray-600">Hotel List</p>
          </div>
          <div className="flex flex-row justify-end gap-1">
            <Link to="/manajemen-mitra-hotel" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <i className="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
            <Link 
              to={selectedMitra ? `/mitra-hotel-admin/${selectedMitra.id}` : "/mitra-hotel-admin"} 
              className="flex items-center gap-1 text-black pt-9 md:pt-0"
            >
              <p>/</p>
              <p className="text-xs md:text-sm">Hotel List</p>
            </Link>
          </div>
        </div>
        <div className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="grid grid-cols-2 px-4 items-center">
            <div className="flex md:flex-row flex-col text-left md:items-center md:gap-2">
              <div className="md:text-xl md:mt-1">
                <p>Hotel List</p>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <Searchbar forWhat="hotel" onSearch={setSearchQuery} />
            </div>
          </div>
          <div>
            <TableHotelAdmin 
              searchQuery={searchQuery} 
              onMitraSelect={handleMitraSelect}
              selectedMitraId={selectedMitra?.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManajemenHotelAdmin