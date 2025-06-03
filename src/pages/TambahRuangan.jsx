import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
// Import actions from your mitraAction.js & mitraReducer.js
import {
  createRoom,
  fetchRoomTypes,
  createRoomType, // New action for creating room type
  createFacility, // New action for creating facility
} from "../redux/actions/mitraAction";
import {
  resetCreateRoomStatus,
  resetCreateRoomTypeStatus, // New reset for room type
  resetCreateFacilityStatus, // New reset for facility
} from "../redux/reducers/mitraReducer";

const TambahRuangan = ({ isSidebarOpen }) => {
  const { hotelId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- Redux State ---
  const {
    loadingCreateRoom,
    errorCreateRoom,
    createdRoomData,
    roomTypeList,
    loadingRoomTypes,
    errorRoomTypes,
    // States for Create Room Type
    loadingCreateRoomType,
    errorCreateRoomType,
    createdRoomTypeData,
    // States for Create Facility
    loadingCreateFacility,
    errorCreateFacility,
    createdFacilityData,
  } = useSelector((state) => state.mitra);

  // --- Component State for Main Form ---
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState('');
  const [roomImages, setRoomImages] = useState([]);
  const [roomImagePreviews, setRoomImagePreviews] = useState([]);

  // --- Component State for "Add Room Type" Modal ---
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [newType, setNewType] = useState({
    name: '', // Will be 'typeName' for API
    facilities: [], // Array of objects: { facilityName: string, amount: number }
    capacity: 0,
    price: ''
  });

  // --- Component State for "Add Facility" Modal (within "Add Room Type" modal) ---
  const [showFacilityModal, setShowFacilityModal] = useState(false);
  const [newFacility, setNewFacility] = useState({ name: '', amount: 1 }); // 'name' is facilityName for API

  // --- Effects ---

  // Fetch room types on component mount or when hotelId changes
  useEffect(() => {
    if (hotelId) {
      dispatch(fetchRoomTypes(hotelId));
    }
  }, [dispatch, hotelId]);

  // Effect for main room creation
  useEffect(() => {
    if (createdRoomData) {
      alert("Room added successfully!");
      dispatch(resetCreateRoomStatus());
      navigate(`/manajemen-ruangan/${hotelId}`);
    }
    if (errorCreateRoom) {
      alert(`Error creating room: ${errorCreateRoom}`);
      dispatch(resetCreateRoomStatus());
    }
  }, [createdRoomData, errorCreateRoom, dispatch, navigate, hotelId]);

  // Effect for room type creation
  useEffect(() => {
    if (createdRoomTypeData) {
      alert("Room Type created successfully!");
      setShowTypeModal(false);
      setNewType({ name: '', facilities: [], capacity: 0, price: '' }); // Reset form
      dispatch(fetchRoomTypes(hotelId)); // Refresh room type list
      dispatch(resetCreateRoomTypeStatus());
      // Optionally, select the newly created room type
      // setSelectedRoomTypeId(createdRoomTypeData.id);
    }
    if (errorCreateRoomType) {
      alert(`Error creating room type: ${errorCreateRoomType}`);
      dispatch(resetCreateRoomTypeStatus());
    }
  }, [createdRoomTypeData, errorCreateRoomType, dispatch, hotelId]);

  // Effect for facility creation (global facility)
  useEffect(() => {
    if (createdFacilityData) {
      alert(`Facility "${createdFacilityData.facilityName}" created successfully as a global facility! Now add it to the room type.`);
      // Add the facility (that was just globally created) to the current newType's facility list
      setNewType(prevType => ({
        ...prevType,
        facilities: [...prevType.facilities, { facilityName: createdFacilityData.facilityName, amount: newFacility.amount }]
      }));
      setNewFacility({ name: '', amount: 1 }); // Reset facility form
      setShowFacilityModal(false); // Close facility modal
      dispatch(resetCreateFacilityStatus());
    }
    if (errorCreateFacility) {
      alert(`Error creating facility: ${errorCreateFacility}`);
      dispatch(resetCreateFacilityStatus());
    }
  }, [createdFacilityData, errorCreateFacility, dispatch, newFacility.amount]); // Added newFacility.amount to dependencies

  // --- Handlers for Main Form ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    else if (name === "description") setDescription(value);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setRoomImages(prevImages => [...prevImages, ...filesArray]);
      setRoomImagePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    URL.revokeObjectURL(roomImagePreviews[indexToRemove]);
    setRoomImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
    setRoomImagePreviews(prevPreviews => prevPreviews.filter((_, index) => index !== indexToRemove));
  };

  const handleReset = () => {
    setName('');
    setDescription('');
    setSelectedRoomTypeId('');
    roomImagePreviews.forEach(url => URL.revokeObjectURL(url));
    setRoomImages([]);
    setRoomImagePreviews([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !selectedRoomTypeId || !hotelId || !description || roomImages.length === 0) {
      alert("Please fill in all required fields and select at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('roomTypeId', selectedRoomTypeId);
    formData.append('hotelId', hotelId);
    roomImages.forEach((imageFile) => {
      formData.append('files', imageFile);
    });

    dispatch(createRoom(formData));
  };

  // --- Handlers for "Add Room Type" Modal ---
  const handleTypeModalInputChange = (e) => {
    const { name, value } = e.target;
    setNewType({ ...newType, [name]: value });
  };

  const handleCapacityChange = (operation) => {
    setNewType(prev => ({
      ...prev,
      capacity: operation === 'increment'
        ? prev.capacity + 1
        : Math.max(0, prev.capacity - 1)
    }));
  };

  const handleAddFacilityToTypeModal = () => {
    // This will just open the "Add Facility" modal
    setShowFacilityModal(true);
  };

  const handleRemoveFacilityFromNewType = (indexToRemove) => {
    setNewType(prev => ({
      ...prev,
      facilities: prev.facilities.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSaveNewType = () => { // Renamed from handleAddType
    if (!newType.name.trim() || !newType.price || newType.capacity <= 0) {
      alert("Please fill in type name, price, and ensure capacity is greater than 0.");
      return;
    }
    if (!hotelId) {
        alert("Hotel ID is missing. Cannot create room type.");
        return;
    }

    const priceValue = parseFloat(String(newType.price).replace(/[^0-9.-]+/g, ""));
    if (isNaN(priceValue) || priceValue <=0) {
        alert("Please enter a valid price.");
        return;
    }


    const roomTypePayload = {
      hotelId: hotelId,
      typeName: newType.name,
      capacity: parseInt(newType.capacity, 10),
      price: priceValue,
      facilities: newType.facilities, // Already an array of objects { facilityName, amount }
    };
    dispatch(createRoomType(roomTypePayload));
  };

  // --- Handlers for "Add Facility" Modal (within "Add Room Type" modal) ---
  const handleFacilityModalInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "facilityName") {
        setNewFacility(prev => ({ ...prev, name: value }));
    } else if (name === "facilityAmount") {
        setNewFacility(prev => ({ ...prev, amount: parseInt(value, 10) || 1 }));
    }
  };

  const handleSaveNewFacilityAndAddToType = () => { // Renamed from handleAddFacilityFromModal
    if (!newFacility.name.trim()) {
      alert("Facility name cannot be empty!");
      return;
    }
    // Dispatch action to create facility globally
    dispatch(createFacility({ facilityName: newFacility.name }));
    // The useEffect for createdFacilityData will handle adding it to newType.facilities
  };


  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-full min-h-screen transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">Hotel Management</p>
            <p className="text-xs pt-2 text-gray-600">Add Room</p>
          </div>
          <div className="flex flex-row justify-end">
            <Link to="/manajemen-hotel" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <i className="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
            <Link to={hotelId ? `/manajemen-ruangan/${hotelId}` : "/manajemen-pesawat"} className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0 ml-1">
              <p>/</p>
              <p className="text-xs md:text-sm">Room List</p>
            </Link>
            <Link to={hotelId ? `/tambah-ruangan/${hotelId}` : "/tambah-pesawat"} className="flex items-center gap-1 text-black pt-9 md:pt-0 ml-1">
              <p>/</p>
              <p className="text-xs md:text-sm">Add Room</p>
            </Link>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="flex-col px-4 items-center">
            <div className="text-left md:text-xl mb-6 md:mb-12">
              <p>Add New Room</p>
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
                      required
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
                <div className="md:w-96 w-64 ">
                    <textarea
                    name="description"
                    className="w-full bg-transparent focus:outline-none p-2 rounded-lg border border-gray-300 "
                    rows={4}
                    value={description}
                    onChange={handleInputChange}
                    placeholder="Description of the room"
                    required
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
                        value={selectedRoomTypeId}
                        onChange={(e) => setSelectedRoomTypeId(e.target.value)}
                        className="w-full p-2 border rounded-lg bg-gray-100 focus:outline-none appearance-none"
                        style={{ minHeight: "42px" }}
                        required
                      >
                        <option value="">Select Type</option>
                        {loadingRoomTypes && <option disabled>Loading types...</option>}
                        {errorRoomTypes && <option disabled>Error loading types: {errorRoomTypes}</option>}
                        {roomTypeList && roomTypeList.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.typeName}
                          </option>
                        ))}
                        {/* Local types are removed as we now save to backend */}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <i className="fas fa-chevron-down text-gray-500"></i>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowTypeModal(true)}
                      className="ml-2 bg-white p-2 rounded-full shadow-md"
                    >
                      <i className="fas fa-plus text-gray-500"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Room Images input - Multiple images */}
            <div className="flex flex-col mb-2 md:mb-4 items-center">
              <div className="text-left">
                  <label className="block text-sm font-semibold text-gray-700">
                    <span className="text-red-700 mr-1">*</span>Room Images
                  </label>
                  <div className="md:w-96 w-64">
                    <div className="flex w-full items-center border rounded-lg p-2 bg-gray-100">
                        <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="w-full bg-transparent focus:outline-none"
                        />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {roomImagePreviews.map((previewUrl, index) => (
                        <div key={index} className="relative">
                            <img
                                src={previewUrl}
                                alt={`Preview ${index + 1}`}
                                className="h-24 w-24 object-cover rounded"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                                style={{ lineHeight: '1' }}
                            > &times;
                            </button>
                        </div>
                        ))}
                    </div>
                  </div>
              </div>
            </div>

            <div className="flex flex-row justify-center gap-6 text-white font-bold mt-12 mb-10">
              <Button type="button" text="Reset" bgColor="bg-yellow1" onClick={handleReset} />
              <Button type="submit" text={loadingCreateRoom ? "Submitting..." : "Submit"} bgColor="bg-blue1" disabled={loadingCreateRoom} />
            </div>
          </div>
        </form>
      </div>

      {/* Type Modal - For creating a new Room Type via API */}
      {showTypeModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-purple-50 p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto"> {/* Increased width */}
          <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Room Type</h2>
              <button type="button" onClick={() => { setShowTypeModal(false); setNewType({ name: '', facilities: [], capacity: 0, price: '' }); }} className="text-gray-500" >
                <i className="fas fa-times"></i>
              </button>
          </div>

          <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Type Name <span className="text-red-500">*</span></label>
              <input type="text" name="name" value={newType.name} onChange={handleTypeModalInputChange} placeholder="e.g. Superior Room" className="w-full p-2 border rounded-lg" />
          </div>

          <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Facilities</label>
              <div className="border rounded-lg p-2 bg-gray-50 min-h-[80px]">
                <div className="flex flex-wrap gap-2 mb-2">
                  {newType.facilities.map((facility, index) => ( // facility is now an object
                    <div key={index} className="bg-white px-3 py-1 rounded-full border flex items-center gap-2">
                      <span className="text-sm">{facility.facilityName} ({facility.amount})</span>
                      <button type="button" onClick={() => handleRemoveFacilityFromNewType(index)} className="text-gray-500 hover:text-red-500">
                        <i className="fas fa-times text-xs"></i>
                      </button>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={handleAddFacilityToTypeModal} className="bg-ungu10 p-2 pl-3 pr-3 rounded-full shadow-md border" >
                  <i className="fas fa-plus text-gray-500"></i> Add Facility
                </button>
              </div>
          </div>

          <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Capacity <span className="text-red-500">*</span></label>
              <div className="flex items-center">
                <button type="button" onClick={() => handleCapacityChange('decrement')} className="bg-gray-200 px-3 py-1 rounded-l border" >-</button>
                <span className="bg-white px-4 py-1 border-t border-b min-w-[50px] text-center">{newType.capacity}</span>
                <button type="button" onClick={() => handleCapacityChange('increment')} className="bg-gray-200 px-3 py-1 rounded-r border" >+</button>
              </div>
          </div>

          <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Price (IDR) <span className="text-red-500">*</span></label>
              <input type="text" name="price" value={newType.price} onChange={handleTypeModalInputChange} placeholder="e.g., 815000" className="w-full p-2 border rounded-lg" />
          </div>

          <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSaveNewType}
                className="bg-purple-700 text-white px-6 py-2 rounded"
                disabled={loadingCreateRoomType}
              >
                {loadingCreateRoomType ? 'Saving...' : 'Save Room Type'}
              </button>
          </div>
          </div>
      </div>
      )}

      {/* Facility Modal - For creating a new Global Facility via API */}
      {showFacilityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"> {/* Ensure this z-index is higher or same as Type Modal if nested */}
            <div className="bg-purple-300 p-6 rounded-lg w-80">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Add Facility</h2>
                <button type="button" onClick={() => { setShowFacilityModal(false); setNewFacility({ name: '', amount: 1 }); }} className="text-gray-500" >
                  <i className="fas fa-times"></i>
                </button>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Facility Name <span className="text-red-500">*</span></label>
                <input type="text" name="facilityName" value={newFacility.name} onChange={handleFacilityModalInputChange} className="w-full p-2 border rounded-lg" placeholder="Enter facility name" />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Amount <span className="text-red-500">*</span></label>
                <input type="number" min="1" name="facilityAmount" value={newFacility.amount} onChange={handleFacilityModalInputChange} className="w-full p-2 border rounded-lg" />
            </div>
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={handleSaveNewFacilityAndAddToType}
                    className="bg-purple-700 text-white px-4 py-2 rounded"
                    disabled={loadingCreateFacility}
                >
                    {loadingCreateFacility ? 'Saving...' : 'Add'}
                </button>
            </div>
            <p className="text-xs mt-2 text-gray-600">This will create new facility if it doesn't exist and then add it to the current room type being defined.</p>
            </div>
        </div>
        )}
    </div>
  );
};

export default TambahRuangan;