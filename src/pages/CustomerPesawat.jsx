import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Searchbar from "../components/Searchbar"; // Adjust path if needed
import TableCustomerPlane from "../components/TableCustomerPlane"; // Adjust path if needed
import { getPassengersByFlight } from "../redux/actions/mitraPlaneScheduleActions"; // Adjust path as needed
import { getMitraFlights } from "../redux/actions/mitraPlaneScheduleActions"; // To get flight name

const CustomerPesawat = ({ isSidebarOpen }) => {
  const { flightId } = useParams();
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [flightName, setFlightName] = useState("");

  const { flights, loading: loadingFlightsError } = useSelector((state) => state.mitraPlaneSchedule);
  const { 
    currentFlightPassengers, 
    loadingPassengers, 
    errorPassengers 
  } = useSelector((state) => state.mitraPlaneSchedule);

  useEffect(() => {
    if (flightId) {
      dispatch(getPassengersByFlight(flightId));
    }
    // Fetch all flights if not already in store, to find the flight name
    if (!flights || flights.length === 0) {
      dispatch(getMitraFlights());
    }
  }, [dispatch, flightId, flights]);

  useEffect(() => {
    // Find the flight name from the store after flights are loaded
    if (flights && flights.length > 0) {
      const selectedFlight = flights.find(flight => flight["Flight ID"] === flightId);
      if (selectedFlight) {
        setFlightName(selectedFlight["Plane Name"]);
      } else {
        setFlightName("Flight details not found");
      }
    }
  }, [flights, flightId]);


  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-screen overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
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
              <p className="text-xs md:text-sm">Plane Customer List</p>
            </Link>
          </div>
        </div>

        <div className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="grid grid-cols-2 px-4 items-center">
            <div className="flex md:flex-row flex-col text-left md:items-center md:gap-2">
              <div className="md:text-2xl text-lg text-ungu7">
                <p>{flightName || "Loading flight name..."}</p>
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
            {loadingPassengers && <p className="text-center p-4">Loading passengers...</p>}
            {errorPassengers && <p className="text-center p-4 text-red-500">Error loading passengers: {errorPassengers}</p>}
            {!loadingPassengers && !errorPassengers && currentFlightPassengers && (
              <TableCustomerPlane 
                searchQuery={searchQuery} 
                passengersData={currentFlightPassengers.passengers || []}
                passengerStats={currentFlightPassengers.stats || {}}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPesawat;