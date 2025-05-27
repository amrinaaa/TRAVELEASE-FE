import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import Button from "../components/Button";
import dataAirlines from "../utils/dataAirlines.json"; // Assuming you have the airline data

const EditMaskapai = ({ isSidebarOpen }) => {
  const [user, setUser] = useState({
    id: '',
    name: '',
    description: '',
  });

  const { userId } = useParams();  // Get the airline ID from URL params

  useEffect(() => {
    // Find the airline based on the ID from the URL
    const selectedAirline = dataAirlines.find((airline) => airline.id === userId);
    if (selectedAirline) {
      setUser({
        id: selectedAirline.id,
        name: selectedAirline.name,
        description: selectedAirline.description,
      });
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setUser({
      id: '',
      name: '',
      description: '',
    });
  };

  const handleSubmit = () => {
    // Here, you would save the changes in your data or backend
    alert("Airline data updated successfully!");
    console.log("Updated airline data:", user);
  };

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-full transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">Airline Management</p>
            <p className="text-xs pt-2 text-gray-600">Edit Airline</p>
          </div>
          <div className="flex flex-row justify-end">
            <Link to="/manajemen-maskapai" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <i className="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
            <Link to={`/edit-maskapai/${user.id}`} className="flex items-center gap-1 text-black pt-9 md:pt-0 ml-1">
              <p>/</p>
              <p className="text-xs md:text-sm">Edit Airline</p>
            </Link>
          </div>
        </div>

        {/* Airline Edit Form */}
        <div className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="flex-col px-4 items-center">
            <div className="text-left md:text-xl mb-6 md:mb-12">
              <p>Edit Airline</p>
            </div>

            <div className="flex flex-col mb-2 md:mb-4 items-center">
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700">
                  <label className="text-red-700 mr-1">*</label>Name
                </label>
                <div className="md:w-96 w-64">
                  <div className="flex w-full items-center border rounded-lg p-2 bg-gray-100">
                    <input
                      type="text"
                      name="name"
                      value={user.name} // Bind to user.name
                      className="w-full bg-transparent focus:outline-none"
                      onChange={handleInputChange}
                      placeholder="Name airline"
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
                    value={user.description} // Bind to user.description
                    onChange={handleInputChange}
                    placeholder="Description of the airline"
                    className="w-full bg-transparent focus:outline-none p-2 rounded-lg border border-gray-300"
                    rows="5"
                  />
                </div>
              </div>
            </div>

            {/* Submit and Reset Buttons */}
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

export default EditMaskapai