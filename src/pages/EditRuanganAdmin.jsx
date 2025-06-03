import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import dataRuangan from "../utils/dataRuangan.json";

// Placeholder: Ganti dengan path yang benar ke action Redux Anda
// import { fetchRoomsByHotel, updateRoom } from "../redux/actions/roomAction"; // Example

const EditRuanganAdmin = ({ isSidebarOpen }) => {
  const { hotelId, roomId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  // Placeholder for Redux actions if not fully integrated yet
  const fetchRoomsByHotel = (currentHotelId) => ({ type: 'FETCH_ROOMS_PLACEHOLDER', payload: currentHotelId });
  const updateRoom = (formData) => ({ type: 'UPDATE_ROOM_PLACEHOLDER', payload: formData });

  // Attempt to get room-specific state, default to empty object if 'room' slice doesn't exist
  const {
    roomList = [], // Default to empty array
    loadingUpdateRoom = false, // Default to false
    errorUpdateRoom = null,    // Default to null
    updatedRoomData = null,    // Default to null
    loadingRooms = false,      // Default to false
  } = useSelector((state) => state.room || {}); // Ensure state.room exists or provide a fallback

  const [roomDetails, setRoomDetails] = useState({
    id: roomId,
    name: '',
    description: '',
    type: '',
    currentImages: []
  });

  const [newImageFiles, setNewImageFiles] = useState([]);
  const MAX_IMAGES = 10;

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

  useEffect(() => {
    // Fetch rooms for the specific hotel if not available or if hotelId changes
    if (hotelId && typeof fetchRoomsByHotel === 'function' && dispatch) {
        // Assuming fetchRoomsByHotel is the action to get rooms for a hotel
        // dispatch(fetchRoomsByHotel(hotelId)); 
        // Using placeholder if not connected to actual Redux
        console.log("Placeholder: dispatch(fetchRoomsByHotel(hotelId)) with hotelId:", hotelId);
    }
  }, [dispatch, hotelId]);


  useEffect(() => {
    let selectedRoom = null;
    const currentRoomList = (roomList && roomList.length > 0 && roomList.some(r => r.hotelId === hotelId)) ? roomList.filter(r => r.hotelId === hotelId) : dataRuangan;

    if (roomId) {
        selectedRoom = currentRoomList.find((r) => String(r.id) === String(roomId));
    }

    if (selectedRoom) {
      let existingImages = [];
      if (selectedRoom.images && Array.isArray(selectedRoom.images)) {
        existingImages = selectedRoom.images.map((img, index) => ({
          id: img.id || `existing-${selectedRoom.id}-${index}`,
          url: img.imageUrl || img.url,
          name: img.name || `Existing Image ${index + 1}`
        }));
      } else if (selectedRoom.imageUrl || selectedRoom.image) {
        existingImages = [{
          id: `existing-${selectedRoom.id}-0`,
          url: selectedRoom.imageUrl || selectedRoom.image,
          name: 'Existing Image'
        }];
      }

      setRoomDetails({
        id: selectedRoom.id,
        name: selectedRoom.name || '',
        description: selectedRoom.description || '',
        type: selectedRoom.type || '',
        currentImages: existingImages
      });

      const uniqueTypesFromData = [...new Set(currentRoomList.map(r => r.type).filter(Boolean))];
      const detailedTypes = uniqueTypesFromData.map(typeName => {
          const roomOfType = currentRoomList.find(r => r.type === typeName);
          return {
              name: typeName,
              facilities: roomOfType?.facilities || [],
              capacity: roomOfType?.capacity || 0,
              price: roomOfType?.price || ''
          };
      });
      setTypes(detailedTypes);

    } else if (!loadingRooms) {
        console.warn(`Room with ID ${roomId} not found for hotel ${hotelId}.`);
        // Optionally navigate back or show error
    }
  }, [roomId, hotelId, roomList, loadingRooms]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleNewImagesChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      const totalCurrentImages = roomDetails.currentImages.length + newImageFiles.length;

      if (totalCurrentImages + selectedFiles.length > MAX_IMAGES) {
        alert(`You can only have a maximum of ${MAX_IMAGES} images total. Currently you have ${totalCurrentImages} images.`);
        e.target.value = null; // Clear file input
        return;
      }

      const oversizedFiles = selectedFiles.filter(file => file.size > 5 * 1024 * 1024); // 5MB
      if (oversizedFiles.length > 0) {
        alert(`Some files are larger than 5MB: ${oversizedFiles.map(f => f.name).join(', ')}`);
        e.target.value = null; // Clear file input
        return;
      }
      setNewImageFiles(prev => [...prev, ...selectedFiles]);
      e.target.value = null; // Allow re-selecting the same file if removed
    }
  };

  const handleRemoveExistingImage = (imageId) => {
     if ((roomDetails.currentImages.length - 1 + newImageFiles.length) < 1 && roomDetails.currentImages.length <=1 ) {
        alert("You must have at least one image (either existing or new).");
        return;
    }
    setRoomDetails(prev => ({
      ...prev,
      currentImages: prev.currentImages.filter(img => img.id !== imageId)
    }));
  };

  const handleRemoveNewImage = (indexToRemove) => {
    if ((roomDetails.currentImages.length + newImageFiles.length - 1) < 1 && newImageFiles.length <= 1) {
        alert("You must have at least one image (either existing or new).");
        return;
    }
    setNewImageFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleClearNewImages = () => {
    if (roomDetails.currentImages.length === 0 && newImageFiles.length > 0) {
        alert("You must have at least one image. Clearing all new images would leave no images.");
        return;
    }
    setNewImageFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTypeInputChange = (e) => {
    const { name, value } = e.target;
    setNewType({ ...newType, [name]: value });
  };

  const handleTypeSelect = (e) => {
    const selectedTypeName = e.target.value;
    setRoomDetails(prev => ({ ...prev, type: selectedTypeName }));
  };

  const handleCapacityChange = (operation) => {
    setNewType(prev => ({
      ...prev,
      capacity: operation === 'increment'
        ? prev.capacity + 1
        : Math.max(0, prev.capacity - 1)
    }));
  };

  const handleRemoveFacility = (indexToRemove) => {
    setNewType(prev => ({
      ...prev,
      facilities: prev.facilities.filter((_, index) => index !== indexToRemove)
    }));
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
    setNewType(prev => ({
      ...prev,
      facilities: [...prev.facilities, facilityString]
    }));
    setNewFacility({ name: '', amount: 1 });
    setShowFacilityModal(false);
  };

  const handleAddType = () => {
    if (!newType.name.trim()) {
      alert("Please fill in the type name.");
      return;
    }
    let updatedTypes;
    if (isEditingType) {
      updatedTypes = types.map(type =>
        type.name === roomDetails.type ? { ...newType, name: newType.name } : type // Ensure name updates if changed
      );
    } else {
      if (types.find(t => t.name.toLowerCase() === newType.name.toLowerCase())) {
        alert("A type with this name already exists.");
        return;
      }
      updatedTypes = [...types, newType];
    }
    setTypes(updatedTypes);
    setRoomDetails(prev => ({ ...prev, type: newType.name })); // Update selected type in roomDetails
    setNewType({ name: '', facilities: [], capacity: 0, price: '' });
    setIsEditingType(false);
    setShowTypeModal(false);
  };

  const handleEditType = () => {
    if (roomDetails.type) {
      const typeToEdit = types.find(t => t.name === roomDetails.type);
      if (typeToEdit) {
        setNewType({ ...typeToEdit });
      } else {
        // If the selected type somehow isn't in the 'types' list, initialize with its name
        setNewType({ name: roomDetails.type, facilities: [], capacity: 0, price: '' });
      }
      setIsEditingType(true);
    } else {
      // Adding a new type
      setNewType({ name: '', facilities: [], capacity: 0, price: '' });
      setIsEditingType(false);
    }
    setShowTypeModal(true);
  };

  const handleReset = () => {
     // Re-fetch or re-filter the original room data to reset form fields
    let selectedRoom = null;
    const currentRoomList = (roomList && roomList.length > 0 && roomList.some(r => r.hotelId === hotelId)) ? roomList.filter(r => r.hotelId === hotelId) : dataRuangan;

    if (roomId) {
        selectedRoom = currentRoomList.find((r) => String(r.id) === String(roomId));
    }

    if (selectedRoom) {
        let existingImages = [];
        if (selectedRoom.images && Array.isArray(selectedRoom.images)) {
            existingImages = selectedRoom.images.map((img, index) => ({
            id: img.id || `existing-${selectedRoom.id}-${index}`,
            url: img.imageUrl || img.url,
            name: img.name || `Existing Image ${index + 1}`
            }));
        } else if (selectedRoom.imageUrl || selectedRoom.image) {
            existingImages = [{
            id: `existing-${selectedRoom.id}-0`,
            url: selectedRoom.imageUrl || selectedRoom.image,
            name: 'Existing Image'
            }];
        }
        setRoomDetails({
            id: selectedRoom.id,
            name: selectedRoom.name || '',
            description: selectedRoom.description || '',
            type: selectedRoom.type || '',
            currentImages: existingImages
        });
    } else {
        // Fallback if room not found - clear form
        setRoomDetails({ id: roomId, name: '', description: '', type: '', currentImages: [] });
    }

    setNewImageFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setShowTypeModal(false);
    setShowFacilityModal(false);
    setIsEditingType(false);
    setNewType({ name: '', facilities: [], capacity: 0, price: '' });
    setNewFacility({ name: '', amount: 1 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!roomDetails.name || !roomDetails.type) {
      alert("Please fill in Room Name and Type.");
      return;
    }
    if (roomDetails.currentImages.length === 0 && newImageFiles.length === 0) {
      alert("Please ensure there is at least one image for the room.");
      return;
    }

    const formData = new FormData();
    formData.append('roomId', roomDetails.id);
    if (hotelId) { // Include hotelId if available and required by backend
      formData.append('hotelId', hotelId);
    }
    formData.append('name', roomDetails.name);
    formData.append('type', roomDetails.type);
    formData.append('description', roomDetails.description);

    const selectedTypeDetails = types.find(t => t.name === roomDetails.type);
    if (selectedTypeDetails) {
      formData.append('facilities', JSON.stringify(selectedTypeDetails.facilities || []));
      formData.append('capacity', selectedTypeDetails.capacity || 0);
      formData.append('price', selectedTypeDetails.price || '');
    }

    if (roomDetails.currentImages.length > 0) {
      const keepImageIds = roomDetails.currentImages
        .map(img => img.id)
        .filter(id => id && !String(id).startsWith('existing-')); // Only keep actual backend IDs
      formData.append('keepImageIds', JSON.stringify(keepImageIds));
    } else {
      formData.append('keepImageIds', JSON.stringify([])); // Explicitly send empty if no existing images are kept
    }


    newImageFiles.forEach((file) => {
      formData.append('files', file); // 'files' for new uploads
    });

    if (dispatch && typeof updateRoom === 'function') {
      // dispatch(updateRoom(formData)); // Uncomment when Redux action is ready
      console.log("Dispatching updateRoom with FormData (details below). hotelId:", hotelId);
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      alert("Room update dispatched (Placeholder for actual API call)!");
      navigate(hotelId ? `/manajemen-ruangan/${hotelId}` : "/manajemen-hotel");
    } else {
      console.log("Updated room data (FormData - details below). hotelId:", hotelId);
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      alert("Room updated successfully (Demo mode)!");
      navigate(hotelId ? `/manajemen-ruangan/${hotelId}` : "/manajemen-hotel");
    }
  };

  useEffect(() => {
    if (updatedRoomData && !loadingUpdateRoom && !errorUpdateRoom) {
      if (String(updatedRoomData.id) === String(roomDetails.id)) {
        alert("Room updated successfully via Redux!");
        navigate(hotelId ? `/manajemen-ruangan/${hotelId}` : "/manajemen-hotel");
      }
    }
  }, [updatedRoomData, loadingUpdateRoom, errorUpdateRoom, navigate, roomDetails.id, hotelId]);

  if (loadingRooms && (!roomList || roomList.length === 0)) {
    return <div className="p-4 text-center">Loading room data...</div>;
  }
  if (!loadingRooms && !roomDetails.name && roomId) { // If done loading and still no name for a given roomId
    // return <div className="p-4 text-center">Room with ID {roomId} not found.</div>;
  }

  const totalImages = roomDetails.currentImages.length + newImageFiles.length;

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-full min-h-screen transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">Partner Management</p>
            <p className="text-xs pt-2 text-gray-600">Edit Room</p>
          </div>
          <div className="flex flex-row justify-end">
            <Link to="/manajemen-mitra-hotel" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <i className="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
            <Link
              to={hotelId ? `/mitra-hotel-admin/${hotelId}` : "/manajemen-hotel"}
              className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0 ml-1"
            >
              <p>/</p>
              <p className="text-xs md:text-sm">Hotel List</p>
            </Link>
            <Link
              to={hotelId ? `/manajemen-ruangan-admin/${hotelId}` : "/manajemen-hotel"}
              className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0 ml-1"
            >
              <p>/</p>
              <p className="text-xs md:text-sm">Room List</p>
            </Link>
            <Link
              to={roomId ? `/edit-ruangan-admin/${roomId}` : "/manajemen-hotel"}
              className="flex items-center gap-1 text-black pt-9 md:pt-0 ml-1"
            >
              <p>/</p>
              <p className="text-xs md:text-sm">Edit Room</p>
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="flex-col px-4 items-center">
            <div className="text-left md:text-xl mb-6 md:mb-12">
              <p>Edit Room: {roomDetails.name || (loadingRooms && !roomDetails.name ? 'Loading room name...' : 'Room Details')}</p>
            </div>

            {errorUpdateRoom && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center">
                Error updating room: {typeof errorUpdateRoom === 'string' ? errorUpdateRoom : JSON.stringify(errorUpdateRoom)}
              </div>
            )}

            <div className="flex flex-col gap-4 items-center">
              <div className="text-left w-64 md:w-96">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                  <span className="text-red-700 mr-1">*</span>Name
                </label>
                <div className="flex w-full items-center border rounded-lg p-2 bg-gray-100">
                  <i className="ri-pencil-fill text-gray-500 mr-2"></i>
                  <input
                    id="name" type="text" name="name"
                    value={roomDetails.name} onChange={handleInputChange}
                    placeholder="Name room"
                    className="w-full bg-transparent focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="text-left w-64 md:w-96">
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  id="description" name="description"
                  className="w-full bg-gray-100 focus:outline-none p-2 rounded-lg border border-gray-300"
                  rows={4} value={roomDetails.description} onChange={handleInputChange}
                  placeholder="Description of the room"
                />
              </div>

              <div className="text-left w-64 md:w-96">
                <label htmlFor="type" className="block text-sm font-semibold text-gray-700">
                  <span className="text-red-700 mr-1">*</span>Type
                </label>
                <div className="flex items-center">
                  <div className="relative w-full">
                    <select
                      id="type" name="type" value={roomDetails.type} onChange={handleTypeSelect}
                      className="w-full p-2 border rounded-lg bg-gray-100 focus:outline-none appearance-none"
                      style={{ minHeight: "42px" }} required
                    >
                      <option value="">Select Type</option>
                      {types.map((typeOpt, index) => (
                        <option key={index} value={typeOpt.name}>
                          {typeOpt.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <i className="fas fa-chevron-down text-gray-500"></i>
                    </div>
                  </div>
                  <button
                    type="button" onClick={handleEditType}
                    className="ml-2 bg-white p-2 rounded-full shadow-md"
                    title={roomDetails.type ? "Edit Type" : "Add Type"}
                  >
                    <i className={`fas ${roomDetails.type ? 'fa-edit' : 'fa-plus'} text-gray-500`}></i>
                  </button>
                </div>
              </div>

              <div className="text-left w-64 md:w-96">
                <label htmlFor="newImages" className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-red-700 mr-1">*</span>Room Images
                </label>
                {roomDetails.currentImages.length > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm text-gray-600">Current Images ({roomDetails.currentImages.length}):</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {roomDetails.currentImages.map((image) => (
                        <div key={image.id} className="relative group">
                          <img src={image.url} alt={image.name || 'Existing image'}
                            className="w-full h-24 object-cover border rounded" />
                          <button type="button" onClick={() => handleRemoveExistingImage(image.id)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remove existing image" > × </button>
                          <p className="text-xs text-gray-500 mt-1 truncate"> Existing </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-600">Add New Images ({newImageFiles.length}):</p>
                    {newImageFiles.length > 0 && (
                      <button type="button" onClick={handleClearNewImages}
                        className="text-xs text-red-600 hover:text-red-800 underline" > Clear New </button>
                    )}
                  </div>
                  <input ref={fileInputRef} id="newImages" type="file" onChange={handleNewImagesChange}
                    className="w-full bg-gray-100 p-2 rounded border" multiple accept="image/*"
                    disabled={totalImages >= MAX_IMAGES} />
                  <p className="text-xs text-gray-500 mt-1">
                    Maximum {MAX_IMAGES} images total, 5MB each ({totalImages}/{MAX_IMAGES} selected)
                  </p>
                  {newImageFiles.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 mb-2">New Images Preview ({newImageFiles.length}):</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {newImageFiles.map((file, index) => (
                          <div key={`new-${index}`} className="relative group">
                            <img src={URL.createObjectURL(file)} alt={`New Preview ${index + 1}`}
                              className="w-full h-24 object-cover border rounded" />
                            <button type="button" onClick={() => handleRemoveNewImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Remove new image" > × </button>
                            <p className="text-xs text-gray-500 mt-1 truncate" title={file.name}> {file.name} </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {totalImages >= MAX_IMAGES && (
                    <p className="text-xs text-orange-600 mt-1">
                      Maximum number of images reached. Remove some images to add more.
                    </p>
                  )}
                   {totalImages === 0 && ( // Show only if no images at all
                    <p className="text-xs text-red-600 mt-1">
                      Please add at least one image for the room.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-row justify-center gap-6 text-white font-bold mt-12 mb-10">
                <Button type="button" text="Reset" bgColor="bg-yellow1" onClick={handleReset} disabled={loadingUpdateRoom} />
                <Button type="submit" text={loadingUpdateRoom ? "Updating..." : "Update Room"} bgColor="bg-blue1" 
                        disabled={loadingUpdateRoom || totalImages === 0 || totalImages > MAX_IMAGES} />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Type Modal */}
      {showTypeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-purple-50 p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{isEditingType ? 'Edit Type' : 'Add Type'}</h2>
              <button type="button" onClick={() => {
                setShowTypeModal(false);
                setIsEditingType(false);
                setNewType({ name: '', facilities: [], capacity: 0, price: '' });
              }} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="mb-4">
              <label htmlFor="typeNameModal" className="block text-sm font-semibold text-gray-700 mb-1">Type Name</label>
              <input id="typeNameModal" type="text" name="name" value={newType.name} onChange={handleTypeInputChange}
                placeholder="e.g. Superior Room" className="w-full p-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Facilities</label>
              <div className="border rounded-lg p-2 bg-gray-50 min-h-[80px]">
                <div className="flex flex-wrap gap-2 mb-2">
                  {newType.facilities.map((facility, index) => (
                    <div key={index} className="bg-white px-3 py-1 rounded-full border flex items-center gap-2 text-sm">
                      <span>{facility}</span>
                      <button type="button" onClick={() => handleRemoveFacility(index)}
                        className="text-gray-500 hover:text-red-500">
                        <i className="fas fa-times text-xs"></i>
                      </button>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={handleAddFacilityToType}
                  className="bg-ungu10 hover:bg-ungu20 p-2 w-10 h-10 rounded-full shadow-md border flex items-center justify-center">
                  <i className="fas fa-plus text-gray-500"></i>
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="capacityModal" className="block text-sm font-semibold text-gray-700 mb-1">Capacity</label>
              <div className="flex items-center">
                <button type="button" onClick={() => handleCapacityChange('decrement')}
                  className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-l border text-gray-700"> - </button>
                <span id="capacityModal" className="bg-white px-4 py-1 border-t border-b min-w-[50px] text-center">
                  {newType.capacity}
                </span>
                <button type="button" onClick={() => handleCapacityChange('increment')}
                  className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-r border text-gray-700"> + </button>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="priceModal" className="block text-sm font-semibold text-gray-700 mb-1">Price</label>
              <input id="priceModal" type="text" name="price" value={newType.price} onChange={handleTypeInputChange}
                placeholder="Rp 815.000,-" className="w-full p-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500" />
            </div>
            <div className="flex justify-end">
              <Button
                text={isEditingType ? 'Update Type' : 'Add Type'}
                onClick={handleAddType}
                bgColor="bg-purple-600 hover:bg-purple-700"
              />
            </div>
          </div>
        </div>
      )}

      {/* Facility Modal */}
      {showFacilityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-purple-100 p-6 rounded-lg w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-purple-800">Add Facility</h2>
              <button type="button" onClick={() => setShowFacilityModal(false)} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="mb-4">
              <label htmlFor="facilityNameModal" className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
              <input id="facilityNameModal" type="text" value={newFacility.name}
                onChange={(e) => setNewFacility({ ...newFacility, name: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500" placeholder="Enter facility name" />
            </div>
            <div className="mb-4">
              <label htmlFor="facilityAmountModal" className="block text-sm font-semibold text-gray-700 mb-1">Amount</label>
              <input id="facilityAmountModal" type="number" min="1" value={newFacility.amount}
                onChange={(e) => setNewFacility({ ...newFacility, amount: parseInt(e.target.value) || 1 })}
                className="w-full p-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500" />
            </div>
            <div className="flex justify-end">
               <Button
                text="Add Facility"
                onClick={handleAddFacilityFromModal}
                bgColor="bg-purple-600 hover:bg-purple-700"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditRuanganAdmin