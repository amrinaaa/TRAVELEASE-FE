// import React, { useState, useEffect, useRef } from "react";
// import { Link, useParams } from 'react-router-dom';
// import Button from "../components/Button";
// import dataRuangan from "../utils/dataRuangan.json";

// const EditRuangan = ({ isSidebarOpen }) => {
//   const { roomId } = useParams();
//   const fileInputRef = useRef(null);
  
//   // States sederhana
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [selectedType, setSelectedType] = useState('');
//   const [roomImage, setRoomImage] = useState(null);
//   const [currentImage, setCurrentImage] = useState('');
  
//   const [types, setTypes] = useState([]);
//   const [showTypeModal, setShowTypeModal] = useState(false);
//   const [showFacilityModal, setShowFacilityModal] = useState(false);
//   const [isEditingType, setIsEditingType] = useState(false);
  
//   const [newType, setNewType] = useState({ 
//     name: '', 
//     facilities: [],
//     capacity: 0,
//     price: ''
//   });
//   const [newFacility, setNewFacility] = useState({ name: '', amount: 1 });

//   // Load data room saat mount
//   useEffect(() => {
//     const selectedRoom = dataRuangan.find((r) => r.id === parseInt(roomId));
//     if (selectedRoom) {
//       setName(selectedRoom.name || '');
//       setDescription(selectedRoom.description || '');
//       setSelectedType(selectedRoom.type || '');
//       setCurrentImage(selectedRoom.image || '');
      
//       // Set types dari data ruangan
//       const existingTypes = dataRuangan.reduce((acc, roomData) => {
//         const existingType = acc.find(t => t.name === roomData.type);
//         if (!existingType) {
//           acc.push({
//             name: roomData.type,
//             facilities: roomData.facilities || [],
//             capacity: roomData.capacity || 0,
//             price: roomData.price || ''
//           });
//         }
//         return acc;
//       }, []);
//       setTypes(existingTypes);
//     }
//   }, [roomId]);

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "name") {
//       setName(value);
//     }
//   };

//   const handleTypeInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewType({ ...newType, [name]: value });
//   };

//   const handleTypeSelect = (type) => {
//     setSelectedType(type);
//   };

//   // Handle capacity
//   const handleCapacityChange = (operation) => {
//     setNewType({
//       ...newType,
//       capacity: operation === 'increment' 
//         ? newType.capacity + 1 
//         : Math.max(0, newType.capacity - 1)
//     });
//   };

//   // Handle facilities
//   const handleRemoveFacility = (indexToRemove) => {
//     setNewType({
//       ...newType,
//       facilities: newType.facilities.filter((_, index) => index !== indexToRemove)
//     });
//   };

//   const handleAddFacilityToType = () => {
//     setShowFacilityModal(true);
//   };

//   const handleAddFacilityFromModal = () => {
//     if (!newFacility.name.trim()) {
//       alert("Facility name cannot be empty!");
//       return;
//     }
    
//     const facilityString = `${newFacility.name} (${newFacility.amount})`;
//     setNewType({
//       ...newType,
//       facilities: [...newType.facilities, facilityString]
//     });
    
//     setNewFacility({ name: '', amount: 1 });
//     setShowFacilityModal(false);
//   };

//   // Handle type operations
//   const handleAddType = () => {
//     if (!newType.name.trim()) {
//       alert("Please fill in the type name.");
//       return;
//     }
    
//     if (isEditingType) {
//       setTypes(types.map(type => 
//         type.name === selectedType ? newType : type
//       ));
//     } else {
//       setTypes([...types, newType]);
//     }
    
//     setSelectedType(newType.name);
//     setNewType({ name: '', facilities: [], capacity: 0, price: '' });
//     setIsEditingType(false);
//     setShowTypeModal(false);
//   };

//   const handleEditType = () => {
//     if (selectedType) {
//       const typeToEdit = types.find(t => t.name === selectedType);
//       if (typeToEdit) {
//         setNewType({...typeToEdit});
//       } else {
//         setNewType({
//           name: selectedType,
//           facilities: [],
//           capacity: 0,
//           price: ''
//         });
//       }
//       setIsEditingType(true);
//     } else {
//       setNewType({ name: '', facilities: [], capacity: 0, price: '' });
//       setIsEditingType(false);
//     }
//     setShowTypeModal(true);
//   };

//   // Handle Reset - berdasarkan TambahRuangan
//   const handleReset = () => {
//     setName('');
//     setDescription('');
//     setSelectedType('');
//     setRoomImage(null);
    
//     // Reset file input
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
    
//     // Reset modal states
//     setShowTypeModal(false);
//     setShowFacilityModal(false);
//     setIsEditingType(false);
//     setNewType({ name: '', facilities: [], capacity: 0, price: '' });
//     setNewFacility({ name: '', amount: 1 });
//   };

//   // Handle Submit
//   const handleSubmit = () => {
//     if (!name || !selectedType) {
//       alert("Please fill in all required fields.");
//       return;
//     }
    
//     const updatedRoom = {
//       id: parseInt(roomId),
//       name: name,
//       type: selectedType,
//       description: description,
//       image: roomImage ? roomImage.name : currentImage
//     };
    
//     console.log("Updated room data:", updatedRoom);
//     alert("Room updated successfully!");
//   };

//   return (
//     <div className="flex transition-all duration-300">
//       <div className={`bg-ungu10 pt-20 h-full transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
//         <div className="grid grid-cols-2 px-4">
//           <div className="flex flex-col md:flex-row text-left md:gap-1">
//             <p className="text-xl">Hotel Management</p>
//             <p className="text-xs pt-2 text-gray-600">Edit Room</p>
//           </div>
//           <div className="flex flex-row justify-end">
//             <Link to="/manajemen-hotel" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
//               <i className="fa-solid fa-house-chimney text-xs"></i>
//               <p className="text-xs md:text-sm">Home</p>
//             </Link>
//             <Link to={roomId ? `/manajemen-ruangan/${roomId}` : "/manajemen-pesawat"} className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0 ml-1">
//               <p>/</p>
//               <p className="text-xs md:text-sm">Room List</p>
//             </Link>
//             <Link to={`/edit-ruangan/${roomId}`} className="flex items-center gap-1 text-black pt-9 md:pt-0 ml-1">
//               <p>/</p>
//               <p className="text-xs md:text-sm">Edit Room</p>
//             </Link>
//           </div>
//         </div>
        
//         <div className="bg-white m-4 py-4 rounded-lg shadow-md">
//           <div className="flex-col px-4 items-center">
//             <div className="text-left md:text-xl mb-6 md:mb-12">
//               <p>Edit Room</p>
//             </div>
            
//             {/* Name input */}
//             <div className="flex flex-col mb-2 md:mb-4 items-center">
//               <div className="text-left">
//                 <label className="block text-sm font-semibold text-gray-700">
//                   <span className="text-red-700 mr-1">*</span>Name
//                 </label>
//                 <div className="md:w-96 w-64">
//                   <div className="flex w-full items-center border rounded-lg p-2 bg-gray-100">
//                     <i className="ri-pencil-fill text-gray-500 mr-2"></i>
//                     <input
//                       type="text"
//                       name="name"
//                       value={name}
//                       onChange={handleInputChange}
//                       placeholder="Name room"
//                       className="w-full bg-transparent focus:outline-none"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Description input */}
//             <div className="flex flex-col mb-2 md:mb-4 items-center">
//               <div className="text-left">
//                 <label className="block text-sm font-semibold text-gray-700">
//                   <span className="text-red-700 mr-1">*</span>Description
//                 </label>
//                 <div className="md:w-96 w-64">
//                   <textarea
//                     className="w-full bg-transparent focus:outline-none p-2 rounded-lg border border-gray-300"
//                     rows={4}
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     placeholder="Description of the room"
//                   />
//                 </div>
//               </div>
//             </div>
            
//             {/* Type dropdown */}
//             <div className="flex flex-col mb-2 md:mb-4 items-center">
//               <div className="text-left">
//                 <label className="block text-sm font-semibold text-gray-700">
//                   <span className="text-red-700 mr-1">*</span>Type
//                 </label>
//                 <div className="md:w-96 w-64">
//                   <div className="flex items-center">
//                     <div className="relative w-full">
//                       <select
//                         value={selectedType}
//                         onChange={(e) => handleTypeSelect(e.target.value)}
//                         className="w-full p-2 border rounded-lg bg-gray-100 focus:outline-none appearance-none"
//                         style={{ minHeight: "42px" }}
//                       >
//                         <option value="">Select Type</option>
//                         {types.map((type, index) => (
//                           <option key={index} value={type.name}>
//                             {type.name}
//                           </option>
//                         ))}
//                       </select>
//                       <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                         <i className="fas fa-chevron-down text-gray-500"></i>
//                       </div>
//                     </div>
//                     <button
//                       onClick={handleEditType}
//                       className="ml-2 bg-white p-2 rounded-full shadow-md"
//                       title={selectedType ? "Edit Type" : "Add Type"}
//                     >
//                       <i className={`fas ${selectedType ? 'fa-edit' : 'fa-plus'} text-gray-500`}></i>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Room Image input */}
//             <div className="flex flex-col mb-2 md:mb-4 items-center">
//               <div className="text-left">
//                 <label className="block text-sm font-semibold text-gray-700">
//                   <span className="text-red-700 mr-1">*</span>Room Image
//                 </label>
//                 <div className="md:w-96 w-64">
//                   <div className="flex w-full items-center border rounded-lg p-2 bg-gray-100">
//                     <input
//                       ref={fileInputRef}
//                       type="file"
//                       onChange={(e) => setRoomImage(e.target.files[0])}
//                       className="w-full bg-transparent focus:outline-none"
//                     />
//                   </div>
//                   {currentImage && !roomImage && (
//                     <p className="text-sm mt-1 text-gray-600">Current: {currentImage}</p>
//                   )}
//                   {roomImage && (
//                     <p className="text-sm mt-1 text-gray-600">New File: {roomImage.name}</p>
//                   )}
//                 </div>
//               </div>
//             </div>
        
//             <div className="flex flex-row justify-center gap-6 text-white font-bold mt-12 mb-10">
//               <Button text="Reset" bgColor="bg-yellow1" onClick={handleReset} />
//               <Button text="Submit" bgColor="bg-blue1" onClick={handleSubmit} />
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Type Modal */}
//       {showTypeModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-purple-50 p-6 rounded-lg w-80">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">{isEditingType ? 'Edit Type' : 'Add Type'}</h2>
//               <button
//                 onClick={() => {
//                   setShowTypeModal(false);
//                   setIsEditingType(false);
//                   setNewType({ name: '', facilities: [], capacity: 0, price: '' });
//                 }}
//                 className="text-gray-500"
//               >
//                 <i className="fas fa-times"></i>
//               </button>
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-semibold text-gray-700 mb-1">Type Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={newType.name}
//                 onChange={handleTypeInputChange}
//                 placeholder="e.g. Superior Room"
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-semibold text-gray-700 mb-1">Select Facility</label>
//               <div className="border rounded-lg p-2 bg-gray-50 min-h-[80px]">
//                 <div className="flex flex-wrap gap-2 mb-2">
//                   {newType.facilities.map((facility, index) => (
//                     <div key={index} className="bg-white px-3 py-1 rounded-full border flex items-center gap-2">
//                       <span className="text-sm">{facility}</span>
//                       <button 
//                         onClick={() => handleRemoveFacility(index)}
//                         className="text-gray-500 hover:text-red-500"
//                       >
//                         <i className="fas fa-times text-xs"></i>
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//                 <button
//                   onClick={handleAddFacilityToType}
//                   className="bg-ungu10 p-2 pl-3 pr-3 rounded-full shadow-md border"
//                 >
//                   <i className="fas fa-plus text-gray-500"></i>
//                 </button>
//               </div>
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-semibold text-gray-700 mb-1">Capacity</label>
//               <div className="flex items-center">
//                 <button
//                   onClick={() => handleCapacityChange('decrement')}
//                   className="bg-gray-200 px-3 py-1 rounded-l border"
//                 >
//                   -
//                 </button>
//                 <span className="bg-white px-4 py-1 border-t border-b min-w-[50px] text-center">
//                   {newType.capacity}
//                 </span>
//                 <button
//                   onClick={() => handleCapacityChange('increment')}
//                   className="bg-gray-200 px-3 py-1 rounded-r border"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-semibold text-gray-700 mb-1">Price</label>
//               <input
//                 type="text"
//                 name="price"
//                 value={newType.price}
//                 onChange={handleTypeInputChange}
//                 placeholder="Rp 815.000,-"
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>

//             <div className="flex justify-end">
//               <button
//                 onClick={handleAddType}
//                 className="bg-purple-700 text-white px-6 py-2 rounded"
//               >
//                 {isEditingType ? 'Update' : 'Oke'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Facility Modal */}
//       {showFacilityModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-purple-300 p-6 rounded-lg w-80">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">Add Facility</h2>
//               <button
//                 onClick={() => setShowFacilityModal(false)}
//                 className="text-gray-500"
//               >
//                 <i className="fas fa-times"></i>
//               </button>
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
//               <input
//                 type="text"
//                 value={newFacility.name}
//                 onChange={(e) => setNewFacility({ ...newFacility, name: e.target.value })}
//                 className="w-full p-2 border rounded-lg"
//                 placeholder="Enter facility name"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-semibold text-gray-700 mb-1">Amount</label>
//               <input
//                 type="number"
//                 min="1"
//                 value={newFacility.amount}
//                 onChange={(e) => setNewFacility({ ...newFacility, amount: parseInt(e.target.value) || 1 })}
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>
//             <div className="flex justify-end">
//               <button
//                 onClick={handleAddFacilityFromModal}
//                 className="bg-purple-700 text-white px-4 py-2 rounded"
//               >
//                 Oke
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EditRuangan


import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import dataRuangan from "../utils/dataRuangan.json";

// Placeholder: Ganti dengan path yang benar ke action Redux Anda
// import { fetchRooms, updateRoom } from "../redux/actions/roomAction"; 

const EditRuangan = ({ isSidebarOpen }) => {
  // Mengambil hotelId dan roomId dari parameter URL
  const { hotelId, roomId } = useParams(); // MODIFIED
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  
  // Placeholder untuk Redux actions jika belum diimpor (untuk menghindari error undefined)
  const fetchRooms = () => ({ type: 'FETCH_ROOMS_PLACEHOLDER' }); 
  const updateRoom = (formData) => ({ type: 'UPDATE_ROOM_PLACEHOLDER', payload: formData });

  // Redux state
  const {
    roomList,
    loadingUpdateRoom,
    errorUpdateRoom,
    updatedRoomData,
    loadingRooms,
  } = useSelector((state) => state.room || {}); // state.room mungkin perlu disesuaikan dengan struktur Redux Anda
  
  // Basic room details
  const [roomDetails, setRoomDetails] = useState({
    id: roomId, // Tetap menggunakan roomId untuk ID ruangan yang diedit
    name: '',
    description: '',
    type: '',
    currentImages: [] 
  });
  
  // Image management
  const [newImageFiles, setNewImageFiles] = useState([]);
  const MAX_IMAGES = 10;
  
  // Type management states
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

  // Fetch rooms if not available
  useEffect(() => {
    if (!roomList || roomList.length === 0) {
      // Pastikan Anda telah mengimpor dan mendefinisikan fetchRooms dari actions Redux Anda
      if (typeof fetchRooms === 'function' && dispatch) {
        dispatch(fetchRooms());
      }
    }
  }, [dispatch, roomList]);

  // Load room data when component mounts or roomList/roomId changes
  useEffect(() => {
    let selectedRoom = null;
    
    if (roomList && roomList.length > 0) {
      selectedRoom = roomList.find((r) => r.id === roomId || r.id === parseInt(roomId));
    } else {
      selectedRoom = dataRuangan.find((r) => r.id === parseInt(roomId));
    }
    
    if (selectedRoom) {
      let existingImages = [];
      if (selectedRoom.images && Array.isArray(selectedRoom.images)) {
        existingImages = selectedRoom.images.map(img => ({
          id: img.id || Date.now() + Math.random(),
          url: img.imageUrl || img.url,
          name: img.name || 'Existing Image'
        }));
      } else if (selectedRoom.imageUrl || selectedRoom.image) {
        existingImages = [{
          id: Date.now(),
          url: selectedRoom.imageUrl || selectedRoom.image,
          name: 'Existing Image'
        }];
      }

      setRoomDetails({
        id: selectedRoom.id, // Ini adalah ID ruangan yang sebenarnya
        name: selectedRoom.name || '',
        description: selectedRoom.description || '',
        type: selectedRoom.type || '',
        currentImages: existingImages
      });
      
      const existingTypes = (roomList && roomList.length > 0 ? roomList : dataRuangan).reduce((acc, roomData) => {
        const typeExists = acc.find(t => t.name === roomData.type);
        if (!typeExists && roomData.type) {
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
  }, [roomId, roomList]); // hotelId tidak diperlukan di sini karena data ruangan dicari berdasarkan roomId

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
        return;
      }
      
      const oversizedFiles = selectedFiles.filter(file => file.size > 5 * 1024 * 1024);
      if (oversizedFiles.length > 0) {
        alert(`Some files are larger than 5MB: ${oversizedFiles.map(f => f.name).join(', ')}`);
        return;
      }
      setNewImageFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const handleRemoveExistingImage = (imageId) => {
    setRoomDetails(prev => ({
      ...prev,
      currentImages: prev.currentImages.filter(img => img.id !== imageId)
    }));
  };

  const handleRemoveNewImage = (indexToRemove) => {
    setNewImageFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleClearNewImages = () => {
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
    const selectedType = e.target.value;
    setRoomDetails(prev => ({ ...prev, type: selectedType }));
  };

  const handleCapacityChange = (operation) => {
    setNewType({
      ...newType,
      capacity: operation === 'increment' 
        ? newType.capacity + 1 
        : Math.max(0, newType.capacity - 1)
    });
  };

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

  const handleAddType = () => {
    if (!newType.name.trim()) {
      alert("Please fill in the type name.");
      return;
    }
    if (isEditingType) {
      setTypes(types.map(type => 
        type.name === roomDetails.type ? newType : type
      ));
    } else {
      setTypes([...types, newType]);
    }
    setRoomDetails(prev => ({ ...prev, type: newType.name }));
    setNewType({ name: '', facilities: [], capacity: 0, price: '' });
    setIsEditingType(false);
    setShowTypeModal(false);
  };

  const handleEditType = () => {
    if (roomDetails.type) {
      const typeToEdit = types.find(t => t.name === roomDetails.type);
      if (typeToEdit) {
        setNewType({...typeToEdit});
      } else {
        setNewType({ name: roomDetails.type, facilities: [], capacity: 0, price: '' });
      }
      setIsEditingType(true);
    } else {
      setNewType({ name: '', facilities: [], capacity: 0, price: '' });
      setIsEditingType(false);
    }
    setShowTypeModal(true);
  };

  const handleReset = () => {
    let selectedRoom = null;
    if (roomList && roomList.length > 0) {
      selectedRoom = roomList.find((r) => r.id === roomId || r.id === parseInt(roomId));
    } else {
      selectedRoom = dataRuangan.find((r) => r.id === parseInt(roomId));
    }
    if (selectedRoom) {
      let existingImages = [];
      if (selectedRoom.images && Array.isArray(selectedRoom.images)) {
        existingImages = selectedRoom.images.map(img => ({
          id: img.id || Date.now() + Math.random(),
          url: img.imageUrl || img.url,
          name: img.name || 'Existing Image'
        }));
      } else if (selectedRoom.imageUrl || selectedRoom.image) {
        existingImages = [{
          id: Date.now(),
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
      alert("Please fill in all required fields.");
      return;
    }
    if (roomDetails.currentImages.length === 0 && newImageFiles.length === 0) {
      alert("Please keep at least one existing image or add new images.");
      return;
    }
    
    const formData = new FormData();
    formData.append('roomId', roomDetails.id); // Ini adalah roomId yang sebenarnya
    // Jika API memerlukan hotelId juga, Anda bisa menambahkannya:
    // if (hotelId) {
    //   formData.append('hotelId', hotelId); 
    // }
    formData.append('name', roomDetails.name);
    formData.append('type', roomDetails.type); // Ini adalah nama tipe
    formData.append('description', roomDetails.description);

    // Dapatkan detail tipe (fasilitas, kapasitas, harga) yang dipilih
    const selectedTypeDetails = types.find(t => t.name === roomDetails.type);
    if (selectedTypeDetails) {
        formData.append('facilities', JSON.stringify(selectedTypeDetails.facilities));
        formData.append('capacity', selectedTypeDetails.capacity);
        formData.append('price', selectedTypeDetails.price);
    }


    if (roomDetails.currentImages.length > 0) {
      const keepImageIds = roomDetails.currentImages.map(img => img.id); // Asumsikan img.id adalah ID yang dikenali backend
      formData.append('keepImageIds', JSON.stringify(keepImageIds));
    }

    newImageFiles.forEach((file) => {
      formData.append('files', file);
    });
    
    // Pastikan Anda telah mengimpor dan mendefinisikan updateRoom dari actions Redux Anda
    if (dispatch && typeof updateRoom === 'function') {
      dispatch(updateRoom(formData));
    } else {
      console.log("Updated room data (FormData):", formData); // FormData tidak bisa di-log langsung seperti objek biasa
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      alert("Room updated successfully (Demo mode)!");
      // Navigasi kembali ke daftar ruangan untuk hotel ini
      navigate(hotelId ? `/manajemen-ruangan/${hotelId}` : "/manajemen-hotel"); // MODIFIED
    }
  };

  useEffect(() => {
    if (updatedRoomData && !loadingUpdateRoom && !errorUpdateRoom) {
      // Pastikan ID yang dibandingkan adalah ID ruangan
      if (updatedRoomData.id === roomDetails.id || updatedRoomData.id === parseInt(roomDetails.id)) {
        alert("Room updated successfully!");
        // Navigasi kembali ke daftar ruangan untuk hotel ini
        navigate(hotelId ? `/manajemen-ruangan/${hotelId}` : "/manajemen-hotel"); // MODIFIED
      }
    }
  }, [updatedRoomData, loadingUpdateRoom, errorUpdateRoom, navigate, roomDetails.id, hotelId]); // MODIFIED dependency

  if ((!roomList || roomList.length === 0) && loadingRooms) {
    return <div className="p-4 text-center">Loading room data...</div>;
  }

  const totalImages = roomDetails.currentImages.length + newImageFiles.length;

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-full min-h-screen transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
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
            {/* MODIFIED: Link ke daftar ruangan hotel menggunakan hotelId */}
            <Link 
              to={hotelId ? `/manajemen-ruangan/${hotelId}` : "/manajemen-hotel"} 
              className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0 ml-1"
            >
              <p>/</p>
              <p className="text-xs md:text-sm">Room List</p>
            </Link>
            <span className="flex items-center gap-1 text-black pt-9 md:pt-0 ml-1">
              <p>/</p>
              <p className="text-xs md:text-sm">Edit Room</p>
            </span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="flex-col px-4 items-center">
            <div className="text-left md:text-xl mb-6 md:mb-12">
              <p>Edit Room: {roomDetails.name || 'Loading...'}</p>
            </div>

            {errorUpdateRoom && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center">
                Error updating room: {typeof errorUpdateRoom === 'string' ? errorUpdateRoom : JSON.stringify(errorUpdateRoom)}
              </div>
            )}
            
            <div className="flex flex-col gap-4 items-center">
              <div className="text-left w-64 md:w-96">
                <label className="block text-sm font-semibold text-gray-700">
                  <span className="text-red-700 mr-1">*</span>Name
                </label>
                <div className="flex w-full items-center border rounded-lg p-2 bg-gray-100">
                  <i className="ri-pencil-fill text-gray-500 mr-2"></i>
                  <input
                    type="text" name="name"
                    value={roomDetails.name} onChange={handleInputChange}
                    placeholder="Name room"
                    className="w-full bg-transparent focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="text-left w-64 md:w-96">
                <label className="block text-sm font-semibold text-gray-700">
                  Description {/* Deskripsi bisa opsional */}
                </label>
                <textarea
                  name="description"
                  className="w-full bg-gray-100 focus:outline-none p-2 rounded-lg border border-gray-300"
                  rows={4} value={roomDetails.description} onChange={handleInputChange}
                  placeholder="Description of the room"
                />
              </div>
              
              <div className="text-left w-64 md:w-96">
                <label className="block text-sm font-semibold text-gray-700">
                  <span className="text-red-700 mr-1">*</span>Type
                </label>
                <div className="flex items-center">
                  <div className="relative w-full">
                    <select
                      value={roomDetails.type} onChange={handleTypeSelect}
                      className="w-full p-2 border rounded-lg bg-gray-100 focus:outline-none appearance-none"
                      style={{ minHeight: "42px" }} required
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
                    type="button" onClick={handleEditType}
                    className="ml-2 bg-white p-2 rounded-full shadow-md"
                    title={roomDetails.type ? "Edit Type" : "Add Type"}
                  >
                    <i className={`fas ${roomDetails.type ? 'fa-edit' : 'fa-plus'} text-gray-500`}></i>
                  </button>
                </div>
              </div>

              <div className="text-left w-64 md:w-96">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                          <img src={image.url} alt={image.name}
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
                    <p className="text-sm text-gray-600">Add New Images:</p>
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
                          <div key={index} className="relative group">
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
                  {totalImages === 0 && (
                    <p className="text-xs text-red-600 mt-1">
                      Please keep at least one existing image or add new images.
                    </p>
                  )}
                </div>
              </div>
            
              <div className="flex flex-row justify-center gap-6 text-white font-bold mt-12 mb-10">
                <Button type="button" text="Reset" bgColor="bg-yellow1" onClick={handleReset} disabled={loadingUpdateRoom} />
                <Button type="submit" text={loadingUpdateRoom ? "Updating..." : "Update Room"} bgColor="bg-blue1" disabled={loadingUpdateRoom} />
              </div>
            </div>
          </div>
        </form>
      </div>
      
      {/* Type Modal */}
      {showTypeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-purple-50 p-6 rounded-lg w-80">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{isEditingType ? 'Edit Type' : 'Add Type'}</h2>
              <button type="button" onClick={() => {
                  setShowTypeModal(false);
                  setIsEditingType(false);
                  setNewType({ name: '', facilities: [], capacity: 0, price: '' });
                }} className="text-gray-500" >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Type Name</label>
              <input type="text" name="name" value={newType.name} onChange={handleTypeInputChange}
                placeholder="e.g. Superior Room" className="w-full p-2 border rounded-lg" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Select Facility</label>
              <div className="border rounded-lg p-2 bg-gray-50 min-h-[80px]">
                <div className="flex flex-wrap gap-2 mb-2">
                  {newType.facilities.map((facility, index) => (
                    <div key={index} className="bg-white px-3 py-1 rounded-full border flex items-center gap-2">
                      <span className="text-sm">{facility}</span>
                      <button type="button" onClick={() => handleRemoveFacility(index)}
                        className="text-gray-500 hover:text-red-500" >
                        <i className="fas fa-times text-xs"></i>
                      </button>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={handleAddFacilityToType}
                  className="bg-ungu10 p-2 pl-3 pr-3 rounded-full shadow-md border" >
                  <i className="fas fa-plus text-gray-500"></i>
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Capacity</label>
              <div className="flex items-center">
                <button type="button" onClick={() => handleCapacityChange('decrement')}
                  className="bg-gray-200 px-3 py-1 rounded-l border" > - </button>
                <span className="bg-white px-4 py-1 border-t border-b min-w-[50px] text-center">
                  {newType.capacity}
                </span>
                <button type="button" onClick={() => handleCapacityChange('increment')}
                  className="bg-gray-200 px-3 py-1 rounded-r border" > + </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Price</label>
              <input type="text" name="price" value={newType.price} onChange={handleTypeInputChange}
                placeholder="Rp 815.000,-" className="w-full p-2 border rounded-lg" />
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={handleAddType}
                className="bg-purple-700 text-white px-6 py-2 rounded" >
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
              <button type="button" onClick={() => setShowFacilityModal(false)} className="text-gray-500" >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
              <input type="text" value={newFacility.name}
                onChange={(e) => setNewFacility({ ...newFacility, name: e.target.value })}
                className="w-full p-2 border rounded-lg" placeholder="Enter facility name" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Amount</label>
              <input type="number" min="1" value={newFacility.amount}
                onChange={(e) => setNewFacility({ ...newFacility, amount: parseInt(e.target.value) || 1 })}
                className="w-full p-2 border rounded-lg" />
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={handleAddFacilityFromModal}
                className="bg-purple-700 text-white px-4 py-2 rounded" > Oke </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditRuangan;