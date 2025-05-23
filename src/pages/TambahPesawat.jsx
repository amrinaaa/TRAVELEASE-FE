import React, { useState } from "react";
import { Link, useParams } from 'react-router-dom';
import Button from "../components/Button";
import dataPesawat from "../utils/dataPesawat.json";

const TambahPesawat = ({ isSidebarOpen }) => {
  // Ambil ID dari URL parameters (jika ada)
  const { userId } = useParams();
  
  // State to store the input values for the new plane
  const [name, setName] = useState('');
  const [planes, setPlanes] = useState(dataPesawat);
  const [selectedType, setSelectedType] = useState('');
  const [selectedClass, setSelectedClass] = useState([]);
  
  // State for dropdown open/close
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  
  // State for the modals
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showClassModal, setShowClassModal] = useState(false);
  
  // States for the types and classes
  const [types, setTypes] = useState([]);
  const [classes, setClasses] = useState([]);
  
  // States for new type and class input
  const [newType, setNewType] = useState({ name: '', manufacture: '' });
  const [newClass, setNewClass] = useState({ name: '', price: '' });
  
  // Handle input changes for the main form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    }
  };
  
  // Handle input changes for the type modal
  const handleTypeInputChange = (e) => {
    const { name, value } = e.target;
    setNewType({
      ...newType,
      [name]: value
    });
  };
  
  // Handle input changes for the class modal
  const handleClassInputChange = (e) => {
    const { name, value } = e.target;
    setNewClass({
      ...newClass,
      [name]: value
    });
  };
  
  // Handle type selection
  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };
  
  // Handle class selection (multiple selection)
  const handleClassSelect = (className) => {
    if (selectedClass.includes(className)) {
      setSelectedClass(selectedClass.filter(cls => cls !== className));
    } else {
      setSelectedClass([...selectedClass, className]);
    }
  };
  
  // Handle adding a new type
  const handleAddType = () => {
    if (!newType.name || !newType.manufacture) {
      alert("Please fill in all fields for the new type.");
      return;
    }
    
    setTypes([...types, newType]);
    setSelectedType(newType.name);
    setNewType({ name: '', manufacture: '' });
    setShowTypeModal(false);
  };
  
  // Handle adding a new class
  const handleAddClass = () => {
    if (!newClass.name || !newClass.price) {
      alert("Please fill in all fields for the new class.");
      return;
    }
    
    setClasses([...classes, newClass]);
    setSelectedClass([...selectedClass, newClass.name]);
    setNewClass({ name: '', price: '' });
    setShowClassModal(false);
  };
  
  // Handle Reset button click - clear all inputs
  const handleReset = () => {
    setName('');
    setSelectedType('');
    setSelectedClass([]);
  };
  
  // Handle Submit button click - add new plane to state
  const handleSubmit = () => {
    // Check if fields are empty
    if (!name || !selectedType || selectedClass.length === 0) {
      alert("Please fill in all fields.");
      return;
    }
    
    // Create new plane object
    const newPlane = {
      id: `AL${(planes.length + 1).toString().padStart(3, '0')}`,
      name: name,
      type: selectedType,
      class: selectedClass,
    };
    
    // Add the new plane to the state
    setPlanes((prevPlanes) => [...prevPlanes, newPlane]);
    
    // Reset fields after submitting
    handleReset();
    alert("Plane added successfully!");
  };
  
  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-screen transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">Airline Management</p>
            <p className="text-xs pt-2 text-gray-600">Add Plane</p>
          </div>
          <div className="flex flex-row justify-end">
            <Link to="/manajemen-maskapai" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <i className="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
            {/* Perbaikan: Tambahkan ID ke link Plane List */}
            <Link to={userId ? `/manajemen-pesawat/${userId}` : "/manajemen-pesawat"} className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0 ml-1">
              <p>/</p>
              <p className="text-xs md:text-sm">Plane List</p>
            </Link>
            <Link to={userId ? `/tambah-pesawat/${userId}` : "/tambah-pesawat"} className="flex items-center gap-1 text-black pt-9 md:pt-0 ml-1">
              <p>/</p>
              <p className="text-xs md:text-sm">Add Plane</p>
            </Link>
          </div>
        </div>
        <div className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="flex-col px-4 items-center">
            <div className="text-left md:text-xl mb-6 md:mb-12">
              <p>Add New Plane</p>
            </div>
            
            {/* Name input */}
            <div className="flex flex-col mb-2 md:mb-4 items-center">
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700">
                  <span className="text-red-700 mr-1">*</span>Name
                </label>
                <div className="md:w-96 w-64">
                  <div className="flex w-full items-center border rounded-lg p-2 bg-gray-100">
                    <i className="ri-pencil-fill text-gray-500 mr-2"></i>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleInputChange}
                      placeholder="Name plane"
                      className="w-full bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Type dropdown */}
            <div className="flex flex-col mb-2 md:mb-4 items-center">
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700">
                  <span className="text-red-700 mr-1">*</span>Type
                </label>
                <div className="md:w-96 w-64">
                  <div className="flex items-center">
                    <div className="relative w-full">
                      <select
                        value={selectedType}
                        onChange={(e) => handleTypeSelect(e.target.value)}
                        className="w-full p-2 border rounded-lg bg-gray-100 focus:outline-none appearance-none"
                        style={{ minHeight: "42px" }}
                      >
                        <option value="">Select Type</option>
                        {types.map((type, index) => (
                          <option key={index} value={type.name}>
                            {type.name}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <i className="fas fa-chevron-down text-gray-500"></i>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowTypeModal(true)}
                      className="ml-2 bg-white p-2 rounded-full shadow-md"
                    >
                      <i className="fas fa-plus text-gray-500"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Class dropdown with multiple selection */}
            <div className="flex flex-col mb-2 md:mb-4 items-center">
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700">
                  <span className="text-red-700 mr-1">*</span>Class
                </label>
                <div className="md:w-96 w-64">
                  <div className="flex items-center">
                    <div className="relative w-full class-dropdown-container">
                      <div 
                        className="w-full p-2 border rounded-lg bg-gray-100 min-h-10 flex items-center justify-between cursor-pointer"
                        onClick={() => setIsClassDropdownOpen(!isClassDropdownOpen)}
                        style={{ minHeight: "42px" }}
                      >
                        <div className="flex flex-wrap gap-1">
                          {selectedClass.length > 0 ? (
                            selectedClass.map((cls, index) => (
                              <div key={index} className="bg-gray-200 rounded px-2 py-1 flex items-center">
                                {cls}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleClassSelect(cls);
                                  }}
                                  className="ml-1 text-gray-500"
                                >
                                  <i className="fas fa-times"></i>
                                </button>
                              </div>
                            ))
                          ) : (
                            <span className="text-gray-400">Select Classes</span>
                          )}
                        </div>
                        <i className="fas fa-chevron-down text-gray-500"></i>
                      </div>
                      {isClassDropdownOpen && classes.length > 0 && (
                        <div className="absolute top-full left-0 w-full bg-white border rounded-lg mt-1 z-10 max-h-40 overflow-y-auto shadow-md">
                          {classes.length > 0 ? (
                            classes.map((cls, index) => (
                              <div
                                key={index}
                                className={`p-3 cursor-pointer hover:bg-gray-100 ${
                                  selectedClass.includes(cls.name) ? 'bg-gray-200' : ''
                                }`}
                                onClick={() => {
                                  handleClassSelect(cls.name);
                                }}
                              >
                                {cls.name}
                              </div>
                            ))
                          ) : (
                            <div className="p-3 text-gray-500 text-center">No classes available</div>
                          )}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => setShowClassModal(true)}
                      className="ml-2 bg-white p-2 rounded-full shadow-md"
                    >
                      <i className="fas fa-plus text-gray-500"></i>
                    </button>
                  </div>
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
      
      {/* Modal for adding a new type */}
      {showTypeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-purple-50 p-6 rounded-lg w-80">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Type</h2>
              <button
                onClick={() => setShowTypeModal(false)}
                className="text-gray-500"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Type Name
              </label>
              <input
                type="text"
                name="name"
                value={newType.name}
                onChange={handleTypeInputChange}
                placeholder="Boeing"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Manufacture
              </label>
              <input
                type="text"
                name="manufacture"
                value={newType.manufacture}
                onChange={handleTypeInputChange}
                placeholder="bossstte"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleAddType}
                className="bg-purple-700 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal for adding a new class */}
      {showClassModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-purple-50 p-6 rounded-lg w-80">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Class</h2>
              <button
                onClick={() => setShowClassModal(false)}
                className="text-gray-500"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Class Name
              </label>
              <input
                type="text"
                name="name"
                value={newClass.name}
                onChange={handleClassInputChange}
                placeholder="Business"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Price
              </label>
              <input
                type="text"
                name="price"
                value={newClass.price}
                onChange={handleClassInputChange}
                placeholder="Rp. 200.000"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleAddClass}
                className="bg-purple-700 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TambahPesawat