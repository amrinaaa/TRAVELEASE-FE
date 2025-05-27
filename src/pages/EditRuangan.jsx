import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from 'react-router-dom';
import Button from "../components/Button";
import dataRuangan from "../utils/dataRuangan.json";

const EditRuangan = ({ isSidebarOpen }) => {
  const { roomId } = useParams();
  const fileInputRef = useRef(null);
  
  // States sederhana
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [roomImage, setRoomImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  
  const [types, setTypes] = useState([]);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showFacilityModal, setShowFacilityModal] = useState(false);
  const [isEditingType, setIsEditingType] = useState(false);
  
  const [newType, setNewType] = useState({ 
    name: '', 
    facilities: [],
    capacity: 0,
    price: ''
  });
  const [newFacility, setNewFacility] = useState({ name: '', amount: 1 });

  // Load data room saat mount
  useEffect(() => {
    const selectedRoom = dataRuangan.find((r) => r.id === parseInt(roomId));
    if (selectedRoom) {
      setName(selectedRoom.name || '');
      setDescription(selectedRoom.description || '');
      setSelectedType(selectedRoom.type || '');
      setCurrentImage(selectedRoom.image || '');
      
      // Set types dari data ruangan
      const existingTypes = dataRuangan.reduce((acc, roomData) => {
        const existingType = acc.find(t => t.name === roomData.type);
        if (!existingType) {
          acc.push({
            name: roomData.type,
            facilities: roomData.facilities || [],
            capacity: roomData.capacity || 0,
            price: roomData.price || ''
          });
        }
        return acc;
      }, []);
      setTypes(existingTypes);
    }
  }, [roomId]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    }
  };

  const handleTypeInputChange = (e) => {
    const { name, value } = e.target;
    setNewType({ ...newType, [name]: value });
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  // Handle capacity
  const handleCapacityChange = (operation) => {
    setNewType({
      ...newType,
      capacity: operation === 'increment' 
        ? newType.capacity + 1 
        : Math.max(0, newType.capacity - 1)
    });
  };

  // Handle facilities
  const handleRemoveFacility = (indexToRemove) => {
    setNewType({
      ...newType,
      facilities: newType.facilities.filter((_, index) => index !== indexToRemove)
    });
  };

  const handleAddFacilityToType = () => {
    setShowFacilityModal(true);
  };

  const handleAddFacilityFromModal = () => {
    if (!newFacility.name.trim()) {
      alert("Facility name cannot be empty!");
      return;
    }
    
    const facilityString = `${newFacility.name} (${newFacility.amount})`;
    setNewType({
      ...newType,
      facilities: [...newType.facilities, facilityString]
    });
    
    setNewFacility({ name: '', amount: 1 });
    setShowFacilityModal(false);
  };

  // Handle type operations
  const handleAddType = () => {
    if (!newType.name.trim()) {
      alert("Please fill in the type name.");
      return;
    }
    
    if (isEditingType) {
      setTypes(types.map(type => 
        type.name === selectedType ? newType : type
      ));
    } else {
      setTypes([...types, newType]);
    }
    
    setSelectedType(newType.name);
    setNewType({ name: '', facilities: [], capacity: 0, price: '' });
    setIsEditingType(false);
    setShowTypeModal(false);
  };

  const handleEditType = () => {
    if (selectedType) {
      const typeToEdit = types.find(t => t.name === selectedType);
      if (typeToEdit) {
        setNewType({...typeToEdit});
      } else {
        setNewType({
          name: selectedType,
          facilities: [],
          capacity: 0,
          price: ''
        });
      }
      setIsEditingType(true);
    } else {
      setNewType({ name: '', facilities: [], capacity: 0, price: '' });
      setIsEditingType(false);
    }
    setShowTypeModal(true);
  };

  // Handle Reset - berdasarkan TambahRuangan
  const handleReset = () => {
    setName('');
    setDescription('');
    setSelectedType('');
    setRoomImage(null);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // Reset modal states
    setShowTypeModal(false);
    setShowFacilityModal(false);
    setIsEditingType(false);
    setNewType({ name: '', facilities: [], capacity: 0, price: '' });
    setNewFacility({ name: '', amount: 1 });
  };

  // Handle Submit
  const handleSubmit = () => {
    if (!name || !selectedType) {
      alert("Please fill in all required fields.");
      return;
    }
    
    const updatedRoom = {
      id: parseInt(roomId),
      name: name,
      type: selectedType,
      description: description,
      image: roomImage ? roomImage.name : currentImage
    };
    
    console.log("Updated room data:", updatedRoom);
    alert("Room updated successfully!");
  };

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-full transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">Hotel Management</p>
            <p className="text-xs pt-2 text-gray-600">Edit Room</p>
          </div>
          <div className="flex flex-row justify-end">
            <Link to="/manajemen-hotel" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <i className="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
            <Link to={roomId ? `/manajemen-ruangan/${roomId}` : "/manajemen-pesawat"} className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0 ml-1">
              <p>/</p>
              <p className="text-xs md:text-sm">Room List</p>
            </Link>
            <Link to={`/edit-ruangan/${roomId}`} className="flex items-center gap-1 text-black pt-9 md:pt-0 ml-1">
              <p>/</p>
              <p className="text-xs md:text-sm">Edit Room</p>
            </Link>
          </div>
        </div>
        
        <div className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="flex-col px-4 items-center">
            <div className="text-left md:text-xl mb-6 md:mb-12">
              <p>Edit Room</p>
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
                      placeholder="Name room"
                      className="w-full bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Description input */}
            <div className="flex flex-col mb-2 md:mb-4 items-center">
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700">
                  <span className="text-red-700 mr-1">*</span>Description
                </label>
                <div className="md:w-96 w-64">
                  <textarea
                    className="w-full bg-transparent focus:outline-none p-2 rounded-lg border border-gray-300"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description of the room"
                  />
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
                      onClick={handleEditType}
                      className="ml-2 bg-white p-2 rounded-full shadow-md"
                      title={selectedType ? "Edit Type" : "Add Type"}
                    >
                      <i className={`fas ${selectedType ? 'fa-edit' : 'fa-plus'} text-gray-500`}></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Room Image input */}
            <div className="flex flex-col mb-2 md:mb-4 items-center">
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700">
                  <span className="text-red-700 mr-1">*</span>Room Image
                </label>
                <div className="md:w-96 w-64">
                  <div className="flex w-full items-center border rounded-lg p-2 bg-gray-100">
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={(e) => setRoomImage(e.target.files[0])}
                      className="w-full bg-transparent focus:outline-none"
                    />
                  </div>
                  {currentImage && !roomImage && (
                    <p className="text-sm mt-1 text-gray-600">Current: {currentImage}</p>
                  )}
                  {roomImage && (
                    <p className="text-sm mt-1 text-gray-600">New File: {roomImage.name}</p>
                  )}
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
      
      {/* Type Modal */}
      {showTypeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-purple-50 p-6 rounded-lg w-80">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{isEditingType ? 'Edit Type' : 'Add Type'}</h2>
              <button
                onClick={() => {
                  setShowTypeModal(false);
                  setIsEditingType(false);
                  setNewType({ name: '', facilities: [], capacity: 0, price: '' });
                }}
                className="text-gray-500"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Type Name</label>
              <input
                type="text"
                name="name"
                value={newType.name}
                onChange={handleTypeInputChange}
                placeholder="e.g. Superior Room"
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Select Facility</label>
              <div className="border rounded-lg p-2 bg-gray-50 min-h-[80px]">
                <div className="flex flex-wrap gap-2 mb-2">
                  {newType.facilities.map((facility, index) => (
                    <div key={index} className="bg-white px-3 py-1 rounded-full border flex items-center gap-2">
                      <span className="text-sm">{facility}</span>
                      <button 
                        onClick={() => handleRemoveFacility(index)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <i className="fas fa-times text-xs"></i>
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleAddFacilityToType}
                  className="bg-ungu10 p-2 pl-3 pr-3 rounded-full shadow-md border"
                >
                  <i className="fas fa-plus text-gray-500"></i>
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Capacity</label>
              <div className="flex items-center">
                <button
                  onClick={() => handleCapacityChange('decrement')}
                  className="bg-gray-200 px-3 py-1 rounded-l border"
                >
                  -
                </button>
                <span className="bg-white px-4 py-1 border-t border-b min-w-[50px] text-center">
                  {newType.capacity}
                </span>
                <button
                  onClick={() => handleCapacityChange('increment')}
                  className="bg-gray-200 px-3 py-1 rounded-r border"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Price</label>
              <input
                type="text"
                name="price"
                value={newType.price}
                onChange={handleTypeInputChange}
                placeholder="Rp 815.000,-"
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleAddType}
                className="bg-purple-700 text-white px-6 py-2 rounded"
              >
                {isEditingType ? 'Update' : 'Oke'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Facility Modal */}
      {showFacilityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-purple-300 p-6 rounded-lg w-80">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Facility</h2>
              <button
                onClick={() => setShowFacilityModal(false)}
                className="text-gray-500"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={newFacility.name}
                onChange={(e) => setNewFacility({ ...newFacility, name: e.target.value })}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter facility name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Amount</label>
              <input
                type="number"
                min="1"
                value={newFacility.amount}
                onChange={(e) => setNewFacility({ ...newFacility, amount: parseInt(e.target.value) || 1 })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleAddFacilityFromModal}
                className="bg-purple-700 text-white px-4 py-2 rounded"
              >
                Oke
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditRuangan