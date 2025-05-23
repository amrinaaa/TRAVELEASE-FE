import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";

const TambahPenerbangan = ({ isSidebarOpen }) => {
  const { userId } = useParams();

  const [departureAirport, setDepartureAirport] = useState('');
  const [arrivalAirport, setArrivalAirport] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [price, setPrice] = useState('');

  const airports = [
    { code: 'CGK', name: 'Soekarno-Hatta (CGK)' },
    { code: 'DPS', name: 'Ngurah Rai (DPS)' },
    { code: 'SUB', name: 'Juanda (SUB)' },
    { code: 'UPG', name: 'Sultan Hasanuddin (UPG)' },
  ];

  const handleReset = () => {
    setDepartureAirport('');
    setArrivalAirport('');
    setDepartureTime('');
    setArrivalTime('');
    setPrice('');
  };

  const handleSubmit = () => {
    if (!departureAirport || !arrivalAirport || !departureTime || !arrivalTime || !price) {
      alert("Please fill in all fields.");
      return;
    }

    const newFlight = {
      departureAirport,
      arrivalAirport,
      departureTime,
      arrivalTime,
      price,
    };

    console.log("Submitted flight:", newFlight);
    alert("Flight added successfully!");
    handleReset();
  };

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-screen transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        {/* Header */}
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">Airline Management</p>
            <p className="text-xs pt-2 text-gray-600">Add Flight</p>
          </div>
          <div className="flex flex-row justify-end">
            <Link to="/manajemen-maskapai" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <i className="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
            <Link to={`/manajemen-pesawat/${userId || ''}`} className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0 ml-1">
              <p>/</p><p className="text-xs md:text-sm">Plane List</p>
            </Link>
            <Link to={`/tambah-pesawat/${userId || ''}`} className="flex items-center gap-1 text-black pt-9 md:pt-0 ml-1">
              <p>/</p><p className="text-xs md:text-sm">Add Flight</p>
            </Link>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="flex-col px-4 items-center">
            <p className="text-left md:text-xl mb-6 md:mb-12">Add New Flight</p>
            <div className="flex flex-col items-center">
                {/* Departure Airport */}
                <div className="mb-4 w-full max-w-md">
                <label className="block text-sm font-semibold text-gray-700 text-left">
                    <span className="text-red-700 mr-1">*</span>Departure Airport
                </label>
                <select
                    value={departureAirport}
                    onChange={(e) => setDepartureAirport(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-gray-100 focus:outline-none"
                >
                    <option value="">Select Airport</option>
                    {airports.map((airport) => (
                    <option key={airport.code} value={airport.code}>
                        {airport.name}
                    </option>
                    ))}
                </select>
                </div>

                {/* Arrival Airport */}
                <div className="mb-4 w-full max-w-md">
                <label className="block text-sm font-semibold text-gray-700 text-left">
                    <span className="text-red-700 mr-1">*</span>Arrival Airport
                </label>
                <select
                    value={arrivalAirport}
                    onChange={(e) => setArrivalAirport(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-gray-100 focus:outline-none"
                >
                    <option value="">Select Airport</option>
                    {airports.map((airport) => (
                    <option key={airport.code} value={airport.code}>
                        {airport.name}
                    </option>
                    ))}
                </select>
                </div>

                {/* Departure Time */}
                <div className="mb-4 w-full max-w-md">
                <label className="block text-sm font-semibold text-gray-700 text-left">
                    <span className="text-red-700 mr-1">*</span>Departure Time
                </label>
                <input
                    type="datetime-local"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-gray-100 focus:outline-none"
                />
                </div>

                {/* Arrival Time */}
                <div className="mb-4 w-full max-w-md">
                <label className="block text-sm font-semibold text-gray-700 text-left">
                    <span className="text-red-700 mr-1">*</span>Arrival Time
                </label>
                <input
                    type="datetime-local"
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-gray-100 focus:outline-none"
                />
                </div>

                {/* Price */}
                <div className="mb-4 w-full max-w-md">
                <label className="block text-sm font-semibold text-gray-700 text-left">
                    <span className="text-red-700 mr-1">*</span>Price (IDR)
                </label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-gray-100 focus:outline-none"
                    placeholder="e.g., 1500000"
                />
                </div>
            </div>
            <div className="flex justify-center gap-6 mt-10">
              <Button text="Reset" bgColor="bg-yellow1" onClick={handleReset} />
              <Button text="Submit" bgColor="bg-blue1" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahPenerbangan