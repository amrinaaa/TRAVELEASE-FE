import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from 'react-router-dom';
import Searchbar from "../components/Searchbar";
import TablePlaneAdmin from "../components/TablePlaneAdmin";

const ManajemenPesawat = ({ isSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAirline, setSelectedAirline] = useState(null);
  const { airlineId } = useParams(); // Get the airline ID from URL parameters
  const location = useLocation();

  useEffect(() => {
    // Check if there's state passed from navigation
    if (location.state && location.state.airline) {
      setSelectedAirline(location.state.airline);
      console.log("Airline from state:", location.state.airline.name);
      return;
    }
    
    // Check if there's an ID in the URL parameters
    if (airlineId) {
      console.log("Looking for airline with ID:", airlineId);
      const airline = dataAirlines.find(a => 
        a.id === parseInt(airlineId) || 
        a.id.toString() === airlineId.toString()
      );
      
      if (airline) {
        console.log("Found airline by ID:", airline.name);
        setSelectedAirline(airline);
      }
    }
    
    // Check if we should load from localStorage (persisted selection)
    else {
      const savedAirline = localStorage.getItem('selectedAirline');
      if (savedAirline) {
        try {
          const parsedAirline = JSON.parse(savedAirline);
          console.log("Loaded airline from storage:", parsedAirline.name);
          setSelectedAirline(parsedAirline);
        } catch (e) {
          console.error("Error parsing saved airline:", e);
        }
      }
    }
  }, [airlineId, location.state]);

  // Handler for when an airline is selected from the table
  const handleAirlineSelect = (airline) => {
    console.log("Airline selected:", airline.name);
    setSelectedAirline(airline);
    
    // Persist the selection to localStorage
    localStorage.setItem('selectedAirline', JSON.stringify(airline));
  };

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-full transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">Partner Management</p>
            <p className="text-xs pt-2 text-gray-600">Plane List</p>
          </div>
          <div className="flex flex-row justify-end gap-1">
            <Link to="/manajemen-mitra-pesawat" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <i className="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
            <Link 
              to={selectedAirline ? `/mitra-pesawat-admin/${selectedAirline.id}` : "/mitra-pesawat-admin"} 
              className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0"
            >
              <p>/</p>
              <p className="text-xs md:text-sm">Airline List</p>
            </Link>
            <Link 
              to={selectedAirline ? `/manajemen-pesawat-admin/${selectedAirline.id}` : "/manajemen-pesawat-admin"} 
              className="flex items-center gap-1 text-black pt-9 md:pt-0"
            >
              <p>/</p>
              <p className="text-xs md:text-sm">Plane List</p>
            </Link>
          </div>
        </div>
        <div className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="grid grid-cols-2 px-4 items-center">
            <div className="flex md:flex-row flex-col text-left md:items-center md:gap-2">
              <div className="md:text-2xl text-lg text-ungu7">
                <p>{selectedAirline ? selectedAirline.name : "Nama pesawat"}</p>
              </div>
              <div className="md:text-xl md:mt-1">
                <p>Plane List</p>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <Searchbar forWhat="plane" onSearch={setSearchQuery} />
            </div>
          </div>
          <div>
            <TablePlaneAdmin 
              searchQuery={searchQuery} 
              onAirlineSelect={handleAirlineSelect}
              selectedAirlineId={selectedAirline?.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManajemenPesawat