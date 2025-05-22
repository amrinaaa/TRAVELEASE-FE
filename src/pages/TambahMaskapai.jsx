import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Button from "../components/Button";
import dataAirlines from "../utils/dataAirlines.json"; // Assuming you have the hotel data

const TambahMaskapai = ({ isSidebarOpen }) => {
  // State to store the input values for the new airline
  const [name, setName] = useState('');
  const [description, setDescription] = useState(''); // Added state for description
  const [airlines, setAirlines] = useState(dataAirlines); // Use state to manage airline data

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "description") {  // Added condition for description field
      setDescription(value);
    }
  };

  // Handle Reset button click - clear all inputs
  const handleReset = () => {
    setName('');
    setDescription(''); // Reset description as well
  };

  // Handle Submit button click - add new airline to state
  const handleSubmit = () => {
    // Check if fields are empty
    if (!name || !description) {
      alert("Please fill in both fields.");
      return;
    }

    // Create new airline object
    const newAirline = {
      id: `AL${(airlines.length + 1).toString().padStart(3, '0')}`, // Generating a new airline ID
      name: name,
      description: description, // Include description in the new airline object
    };

    // Add the new airline to the state
    setAirlines((prevAirlines) => [...prevAirlines, newAirline]);

    // Reset fields after submitting
    handleReset();
    alert("Airline added successfully!");
  };

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-screen transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">Airline Management</p>
            <p className="text-xs pt-2  text-gray-600">Add Airline</p>
          </div>
          <div className="flex flex-row justify-end">
            <Link to="/manajemen-maskapai" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <i className="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
            <Link to="/tambah-maskapai" className="flex items-center gap-1 text-black pt-9 md:pt-0 ml-1">
              <p>/</p>
              <p className="text-xs md:text-sm">Add Airline</p>
            </Link>
          </div>
        </div>
        <div className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="flex-col px-4 items-center">
            <div className="text-left md:text-xl mb-6 md:mb-12">
              <p>Add New Airline</p>
            </div>
            <div className="flex flex-col mb-2 md:mb-4 items-center">
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700">
                  <label className="text-red-700 mr-1">*</label>Name
                </label>
                <div className="md:w-96 w-64">
                  <div className="flex w-full items-center border rounded-lg p-2 bg-gray-100">
                    <i className="ri-pencil-fill text-gray-500 mr-2"></i>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleInputChange}
                      placeholder="Name airline"
                      className="w-full bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col mb-2 md:mb-4 items-center">
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700">
                  <label className="text-red-700 mr-1">*</label>Description
                </label>
                <div className="md:w-96 w-64">
                  <textarea
                    name="description"
                    value={description}
                    onChange={handleInputChange}
                    placeholder="Description of the airline"
                    className="w-full bg-transparent focus:outline-none p-2 rounded-lg border border-gray-300"
                    rows="5"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center gap-6 text-white font-bold mt-12 mb-10">
              <Button text="Reset" bgColor="bg-yellow1" onClick={handleReset} />
              <Button text="Submit" bgColor="bg-blue1" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahMaskapai