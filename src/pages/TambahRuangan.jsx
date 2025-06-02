// import React, { useState } from "react";
// import { Link, useParams } from 'react-router-dom';
// import Button from "../components/Button";
// import dataRuangan from "../utils/dataRuangan.json";

// const TambahRuangan = ({ isSidebarOpen }) => {
//   // Ambil ID dari URL parameters (jika ada)
//   const { userId } = useParams();
  
//   // State to store the input values for the new room
//   const [name, setName] = useState('');
//   const [rooms, setrooms] = useState(dataRuangan);
//   const [selectedType, setSelectedType] = useState('');
//   const [description, setDescription] = useState('');
//   const [roomImage, setRoomImage] = useState(null);
//   const [capacity, setCapacity] = useState(0); // Changed to simple number
//   const [price, setPrice] = useState('');
//   const [facilities, setFacilities] = useState([]);
//   const [showFacilityModal, setShowFacilityModal] = useState(false);
//   const [newFacility, setNewFacility] = useState({ name: '', amount: 1 });

  
//   // State for dropdown open/close
//   const [isClassDropdownOpen] = useState(false);
  
//   // State for the modals
//   const [showTypeModal, setShowTypeModal] = useState(false);
  
//   // States for the types and classes
//   const [types, setTypes] = useState([]);
  
//   // States for new type and class input
//   const [newType, setNewType] = useState({ 
//     name: '', 
//     facilities: [],
//     capacity: 0,
//     price: ''
//   });
  
//   // Handle input changes for the main form
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "name") {
//       setName(value);
//     }
//   };
  
//   // Handle input changes for the type modal
//   const handleTypeInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewType({
//       ...newType,
//       [name]: value
//     });
//   };
  
//   // Handle type selection
//   const handleTypeSelect = (type) => {
//     setSelectedType(type);
//   };

//   // Handle capacity increment/decrement for type modal
//   const handleCapacityChange = (operation) => {
//     setNewType({
//       ...newType,
//       capacity: operation === 'increment' 
//         ? newType.capacity + 1 
//         : Math.max(0, newType.capacity - 1)
//     });
//   };

//   // Handle removing facility from selected facilities
//   const handleRemoveFacility = (indexToRemove) => {
//     setNewType({
//       ...newType,
//       facilities: newType.facilities.filter((_, index) => index !== indexToRemove)
//     });
//   };

//   // Handle adding facility to selected facilities
//   const handleAddFacilityToType = () => {
//     setShowFacilityModal(true);
//   };

//   // Handle adding facility from facility modal
//   const handleAddFacilityFromModal = () => {
//     if (!newFacility.name.trim()) {
//       alert("Facility name cannot be empty!");
//       return;
//     }
    
//     const facilityString = `${newFacility.name} (${newFacility.amount})`;
    
//     // Add to global facilities list if not already exists
//     const existingFacility = facilities.find(f => f.name === newFacility.name);
//     if (!existingFacility) {
//       setFacilities(prev => [...prev, newFacility]);
//     }
    
//     // Add to current type's facilities
//     setNewType({
//       ...newType,
//       facilities: [...newType.facilities, facilityString]
//     });
    
//     // Reset and close modal
//     setNewFacility({ name: '', amount: 1 });
//     setShowFacilityModal(false);
//   };
  
//   // Handle adding a new type
//   const handleAddType = () => {
//     if (!newType.name.trim()) {
//       alert("Please fill in the type name.");
//       return;
//     }
    
//     setTypes([...types, newType]);
//     setSelectedType(newType.name);
//     setNewType({ 
//       name: '', 
//       facilities: [],
//       capacity: 0,
//       price: ''
//     });
//     setShowTypeModal(false);
//   };
  
//   // Handle Reset button click - clear all inputs
//   const handleReset = () => {
//     setName('');
//     setDescription('');
//     setSelectedType('');
//   };
  
//   // Handle Submit button click - add new room to state
//   const handleSubmit = () => {
//     // Check if fields are empty
//     if (!name || !selectedType ) {
//       alert("Please fill in all fields.");
//       return;
//     }
    
//     // Create new room object
//     const newRoom = {
//       id: `R${(rooms.length + 1).toString().padStart(3, '0')}`,
//       name: name,
//       type: selectedType,
//     };
    
//     // Add the new room to the state
//     setrooms((prevrooms) => [...prevrooms, newRoom]);
    
//     // Reset fields after submitting
//     handleReset();
//     alert("Room added successfully!");
//   };
  
//   return (
//     <div className="flex transition-all duration-300">
//       <div className={`bg-ungu10 pt-20 h-full transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
//         <div className="grid grid-cols-2 px-4">
//           <div className="flex flex-col md:flex-row text-left md:gap-1">
//             <p className="text-xl">Hotel Management</p>
//             <p className="text-xs pt-2 text-gray-600">Add Room</p>
//           </div>
//           <div className="flex flex-row justify-end">
//             <Link to="/manajemen-hotel" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
//               <i className="fa-solid fa-house-chimney text-xs"></i>
//               <p className="text-xs md:text-sm">Home</p>
//             </Link>
//             {/* Perbaikan: Tambahkan ID ke link Home List */}
//             <Link to={userId ? `/manajemen-ruangan/${userId}` : "/manajemen-pesawat"} className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0 ml-1">
//               <p>/</p>
//               <p className="text-xs md:text-sm">Room List</p>
//             </Link>
//             <Link to={userId ? `/tambah-ruangan/${userId}` : "/tambah-pesawat"} className="flex items-center gap-1 text-black pt-9 md:pt-0 ml-1">
//               <p>/</p>
//               <p className="text-xs md:text-sm">Add Room</p>
//             </Link>
//           </div>
//         </div>
//         <div className="bg-white m-4 py-4 rounded-lg shadow-md">
//           <div className="flex-col px-4 items-center">
//             <div className="text-left md:text-xl mb-6 md:mb-12">
//               <p>Add New Room</p>
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
//                 <div className="md:w-96 w-64 ">
//                     <textarea
//                     className="w-full bg-transparent focus:outline-none p-2 rounded-lg border border-gray-300 "
//                     rows={4}
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     placeholder="Description of the room"
//                     />
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
//                       onClick={() => setShowTypeModal(true)}
//                       className="ml-2 bg-white p-2 rounded-full shadow-md"
//                     >
//                       <i className="fas fa-plus text-gray-500"></i>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Room Image input */}
//             <div className="flex flex-col mb-2 md:mb-4 items-center">
//             <div className="text-left">
//                 <label className="block text-sm font-semibold text-gray-700">
//                   <span className="text-red-700 mr-1">*</span>Room Image
//                 </label>
//                 <div className="md:w-96 w-64">
//                 <div className="flex w-full items-center border rounded-lg p-2 bg-gray-100">
//                     <input
//                     type="file"
//                     onChange={(e) => setRoomImage(e.target.files[0])}
//                     className="w-full bg-transparent focus:outline-none"
//                     />
//                 </div>
//                 </div>
//             </div>
//             </div>
        
//             <div className="flex flex-row justify-center gap-6 text-white font-bold mt-12 mb-10">
//               <Button text="Reset" bgColor="bg-yellow1" onClick={handleReset} />
//               <Button text="Submit" bgColor="bg-blue1" onClick={handleSubmit} />
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {showTypeModal && (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-purple-50 p-6 rounded-lg w-80">
//           <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">Add Type</h2>
//               <button
//               onClick={() => setShowTypeModal(false)}
//               className="text-gray-500"
//               >
//               <i className="fas fa-times"></i>
//               </button>
//           </div>

//           {/* Type Name */}
//           <div className="mb-4">
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Type Name
//               </label>
//               <input
//               type="text"
//               name="name"
//               value={newType.name}
//               onChange={handleTypeInputChange}
//               placeholder="e.g. Superior Room"
//               className="w-full p-2 border rounded-lg"
//               />
//           </div>

//           {/* Select Facility */}
//           <div className="mb-4">
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
//           </div>

//           {/* Capacity */}
//           <div className="mb-4">
//               <label className="block text-sm font-semibold text-gray-700 mb-1">Capacity</label>
//               <div className="flex items-center">
//                 <button
//                   onClick={() => handleCapacityChange('decrement')}
//                   className="bg-gray-200 px-3 py-1 rounded-l border"
//                 >
//                   -
//                 </button>
//                 <span className="bg-white px-4 py-1 border-t border-b min-w-[50px] text-centerr">
//                   {newType.capacity} 
//                 </span>
//                 <button
//                   onClick={() => handleCapacityChange('increment')}
//                   className="bg-gray-200 px-3 py-1 rounded-r border"
//                 >
//                   +
//                 </button>
//               </div>
//           </div>

//           {/* Price */}
//           <div className="mb-4">
//               <label className="block text-sm font-semibold text-gray-700 mb-1">Price</label>
//               <input
//               type="text"
//               name="price"
//               value={newType.price}
//               onChange={handleTypeInputChange}
//               placeholder="Rp 815.000,-"
//               className="w-full p-2 border rounded-lg"
//               />
//           </div>

//           <div className="flex justify-end">
//               <button
//               onClick={handleAddType}
//               className="bg-purple-700 text-white px-6 py-2 rounded"
//               >
//               Oke
//               </button>
//           </div>
//           </div>
//       </div>
//       )}

//       {showFacilityModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-purple-300 p-6 rounded-lg w-80">
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold">Add Facility</h2>
//                 <button
//                 onClick={() => setShowFacilityModal(false)}
//                 className="text-gray-500"
//                 >
//                 <i className="fas fa-times"></i>
//                 </button>
//             </div>

//             <div className="mb-4">
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
//                 <input
//                 type="text"
//                 value={newFacility.name}
//                 onChange={(e) => setNewFacility({ ...newFacility, name: e.target.value })}
//                 className="w-full p-2 border rounded-lg"
//                 placeholder="Enter facility name"
//                 />
//             </div>
//             <div className="mb-4">
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">Amount</label>
//                 <input
//                 type="number"
//                 min="1"
//                 value={newFacility.amount}
//                 onChange={(e) => setNewFacility({ ...newFacility, amount: parseInt(e.target.value) || 1 })}
//                 className="w-full p-2 border rounded-lg"
//                 />
//             </div>
//             <div className="flex justify-end">
//                 <button
//                 onClick={handleAddFacilityFromModal}
//                 className="bg-purple-700 text-white px-4 py-2 rounded"
//                 >
//                 Oke
//                 </button>
//             </div>
//             </div>
//         </div>
//         )}
//     </div>
//   );
// };

// export default TambahRuangan

import React, { useState } from "react";
import { Link, useParams } from 'react-router-dom';
import Button from "../components/Button";
import dataRuangan from "../utils/dataRuangan.json";

const TambahRuangan = ({ isSidebarOpen }) => {
  // Ambil ID dari URL parameters (jika ada)
  const { userId } = useParams();
  
  // State to store the input values for the new room
  const [name, setName] = useState('');
  const [rooms, setrooms] = useState(dataRuangan);
  const [selectedType, setSelectedType] = useState('');
  const [description, setDescription] = useState('');
  // PERUBAHAN: Ganti roomImage menjadi array untuk multiple images (sesuai referensi TambahHotel)
  const [imageFiles, setImageFiles] = useState([]);
  const MAX_IMAGES = 10;
  const [capacity, setCapacity] = useState(0);
  const [price, setPrice] = useState('');
  const [facilities, setFacilities] = useState([]);
  const [showFacilityModal, setShowFacilityModal] = useState(false);
  const [newFacility, setNewFacility] = useState({ name: '', amount: 1 });

  
  // State for dropdown open/close
  const [isClassDropdownOpen] = useState(false);
  
  // State for the modals
  const [showTypeModal, setShowTypeModal] = useState(false);
  
  // States for the types and classes
  const [types, setTypes] = useState([]);
  
  // States for new type and class input
  const [newType, setNewType] = useState({ 
    name: '', 
    facilities: [],
    capacity: 0,
    price: ''
  });
  
  // Handle input changes for the main form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    }
  };
  
  // PERUBAHAN: Handler untuk multiple image upload (sesuai referensi TambahHotel)
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      
      // Check if total images exceed maximum
      if (imageFiles.length + selectedFiles.length > MAX_IMAGES) {
        alert(`You can only upload a maximum of ${MAX_IMAGES} images. Currently you have ${imageFiles.length} images.`);
        return;
      }
      
      // Validate file sizes (5MB each)
      const oversizedFiles = selectedFiles.filter(file => file.size > 5 * 1024 * 1024);
      if (oversizedFiles.length > 0) {
        alert(`Some files are larger than 5MB: ${oversizedFiles.map(f => f.name).join(', ')}`);
        return;
      }
      
      // Add new files to existing array
      setImageFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  // Remove specific image (sesuai referensi TambahHotel)
  const handleRemoveImage = (indexToRemove) => {
    setImageFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  // Clear all images (sesuai referensi TambahHotel)
  const handleClearAllImages = () => {
    setImageFiles([]);
  };
  
  // Handle input changes for the type modal
  const handleTypeInputChange = (e) => {
    const { name, value } = e.target;
    setNewType({
      ...newType,
      [name]: value
    });
  };
  
  // Handle type selection
  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  // Handle capacity increment/decrement for type modal
  const handleCapacityChange = (operation) => {
    setNewType({
      ...newType,
      capacity: operation === 'increment' 
        ? newType.capacity + 1 
        : Math.max(0, newType.capacity - 1)
    });
  };

  // Handle removing facility from selected facilities
  const handleRemoveFacility = (indexToRemove) => {
    setNewType({
      ...newType,
      facilities: newType.facilities.filter((_, index) => index !== indexToRemove)
    });
  };

  // Handle adding facility to selected facilities
  const handleAddFacilityToType = () => {
    setShowFacilityModal(true);
  };

  // Handle adding facility from facility modal
  const handleAddFacilityFromModal = () => {
    if (!newFacility.name.trim()) {
      alert("Facility name cannot be empty!");
      return;
    }
    
    const facilityString = `${newFacility.name} (${newFacility.amount})`;
    
    // Add to global facilities list if not already exists
    const existingFacility = facilities.find(f => f.name === newFacility.name);
    if (!existingFacility) {
      setFacilities(prev => [...prev, newFacility]);
    }
    
    // Add to current type's facilities
    setNewType({
      ...newType,
      facilities: [...newType.facilities, facilityString]
    });
    
    // Reset and close modal
    setNewFacility({ name: '', amount: 1 });
    setShowFacilityModal(false);
  };
  
  // Handle adding a new type
  const handleAddType = () => {
    if (!newType.name.trim()) {
      alert("Please fill in the type name.");
      return;
    }
    
    setTypes([...types, newType]);
    setSelectedType(newType.name);
    setNewType({ 
      name: '', 
      facilities: [],
      capacity: 0,
      price: ''
    });
    setShowTypeModal(false);
  };
  
  // Handle Reset button click - clear all inputs
  const handleReset = () => {
    setName('');
    setDescription('');
    setSelectedType('');
    // PERUBAHAN: Reset juga array gambar (sesuai referensi TambahHotel)
    setImageFiles([]);
  };
  
  // Handle Submit button click - add new room to state
  const handleSubmit = () => {
    // Check if fields are empty
    if (!name || !selectedType) {
      alert("Please fill in all fields.");
      return;
    }
    
    // PERUBAHAN: Validasi minimal 1 gambar (sesuai referensi TambahHotel)
    if (imageFiles.length === 0) {
      alert("Please upload at least one room image.");
      return;
    }
    
    // Create new room object
    const newRoom = {
      id: `R${(rooms.length + 1).toString().padStart(3, '0')}`,
      name: name,
      type: selectedType,
      // PERUBAHAN: Simpan array gambar (sesuai referensi TambahHotel)
      images: imageFiles
    };
    
    // Add the new room to the state
    setrooms((prevrooms) => [...prevrooms, newRoom]);
    
    // Reset fields after submitting
    handleReset();
    alert("Room added successfully!");
  };
  
  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-full transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
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
            <Link to={userId ? `/manajemen-ruangan/${userId}` : "/manajemen-pesawat"} className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0 ml-1">
              <p>/</p>
              <p className="text-xs md:text-sm">Room List</p>
            </Link>
            <Link to={userId ? `/tambah-ruangan/${userId}` : "/tambah-pesawat"} className="flex items-center gap-1 text-black pt-9 md:pt-0 ml-1">
              <p>/</p>
              <p className="text-xs md:text-sm">Add Room</p>
            </Link>
          </div>
        </div>
        <div className="bg-white m-4 py-4 rounded-lg shadow-md">
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
                    className="w-full bg-transparent focus:outline-none p-2 rounded-lg border border-gray-300 "
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
                      onClick={() => setShowTypeModal(true)}
                      className="ml-2 bg-white p-2 rounded-full shadow-md"
                    >
                      <i className="fas fa-plus text-gray-500"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* PERUBAHAN: Room Images input - Multiple images (sesuai referensi TambahHotel) */}
            <div className="flex flex-col mb-2 md:mb-4 items-center">
              <div className="text-left w-64 md:w-96">
                <label htmlFor="imageFiles" className="block text-sm font-semibold text-gray-700">
                  <span className="text-red-700 mr-1">*</span>Room Images
                </label>
                
                {/* File Input */}
                <input
                  id="imageFiles"
                  type="file"
                  name="imageFiles"
                  onChange={handleImageChange}
                  className="w-full bg-gray-100 p-2 rounded border"
                  multiple
                  accept="image/*"
                  disabled={imageFiles.length >= MAX_IMAGES}
                />
                
                {/* Info Text */}
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-500">
                    Maximum {MAX_IMAGES} images, 5MB each ({imageFiles.length}/{MAX_IMAGES} selected)
                  </p>
                  {imageFiles.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearAllImages}
                      className="text-xs text-red-600 hover:text-red-800 underline"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Image Preview Grid */}
                {imageFiles.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">Image Previews:</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {imageFiles.map((file, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={URL.createObjectURL(file)} 
                            alt={`Preview ${index + 1}`} 
                            className="w-full h-24 object-cover border rounded"
                          />
                          
                          {/* Remove button overlay */}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remove image"
                          >
                            ×
                          </button>
                          
                          {/* File name */}
                          <p className="text-xs text-gray-500 mt-1 truncate" title={file.name}>
                            {file.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Warning when max reached */}
                {imageFiles.length >= MAX_IMAGES && (
                  <p className="text-xs text-orange-600 mt-1">
                    Maximum number of images reached. Remove some images to add more.
                  </p>
                )}
              </div>
            </div>
        
            <div className="flex flex-row justify-center gap-6 text-white font-bold mt-12 mb-10">
              <Button text="Reset" bgColor="bg-yellow1" onClick={handleReset} />
              <Button text="Submit" bgColor="bg-blue1" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
      
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

          {/* Type Name */}
          <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
              Type Name
              </label>
              <input
              type="text"
              name="name"
              value={newType.name}
              onChange={handleTypeInputChange}
              placeholder="e.g. Superior Room"
              className="w-full p-2 border rounded-lg"
              />
          </div>

          {/* Select Facility */}
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

          {/* Capacity */}
          <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Capacity</label>
              <div className="flex items-center">
                <button
                  onClick={() => handleCapacityChange('decrement')}
                  className="bg-gray-200 px-3 py-1 rounded-l border"
                >
                  -
                </button>
                <span className="bg-white px-4 py-1 border-t border-b min-w-[50px] text-centerr">
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

          {/* Price */}
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
              Oke
              </button>
          </div>
          </div>
      </div>
      )}

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

export default TambahRuangan