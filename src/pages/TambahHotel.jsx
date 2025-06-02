// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
// import Button from "../components/Button"; // Sesuaikan path jika perlu
// import { createHotel, fetchLocations } from "../redux/actions/mitraAction"; // Import fetchLocations
// // import { clearCreateHotelStatus } from "../redux/actions/mitraAction"; // Opsional

// const TambahHotel = ({ isSidebarOpen }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [hotelDetails, setHotelDetails] = useState({
//     name: '',
//     description: '',
//     city: '', // Ini akan menyimpan nama kota yang dipilih untuk tampilan
//     locationId: '', // Ini akan menyimpan ID lokasi yang dipilih untuk dikirim ke API
//     address: '',
//     contact: '',
//   });
  
//   // Ubah dari single file menjadi array untuk multiple files
//   const [imageFiles, setImageFiles] = useState([]);
//   const MAX_IMAGES = 10; // Sesuai dengan info "Max: 10 gambar"

//   const {
//     loadingCreateHotel,
//     errorCreateHotel,
//     createdHotelData,
//     locationList, // Ambil locationList dari state Redux
//     loadingLocations, // Opsional: untuk menampilkan status loading dropdown
//     errorLocations, // Opsional: untuk menampilkan error fetch lokasi
//   } = useSelector((state) => state.mitra);

//   // Fetch locations when the component mounts
//   useEffect(() => {
//     dispatch(fetchLocations());
//   }, [dispatch]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "city") {
//       // Value dari select option sekarang adalah locationId
//       const selectedLocationId = value;
//       const selectedLocationObject = locationList.find(loc => loc.id === selectedLocationId);
//       const cityName = selectedLocationObject ? selectedLocationObject.city : '';

//       setHotelDetails((prev) => ({
//         ...prev,
//         city: cityName, // Simpan nama kota untuk display di input/select
//         locationId: selectedLocationId, // Simpan ID lokasi
//       }));
//     } else {
//       setHotelDetails((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   // Handle multiple image selection
//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const selectedFiles = Array.from(e.target.files);
      
//       // Check if total images exceed maximum
//       if (imageFiles.length + selectedFiles.length > MAX_IMAGES) {
//         alert(`You can only upload a maximum of ${MAX_IMAGES} images. You currently have ${imageFiles.length} selected, trying to add ${selectedFiles.length}.`);
//         // Clear the file input to allow re-selection if desired
//         e.target.value = null; 
//         return;
//       }
      
//       // Validate file sizes (5MB each)
//       const oversizedFiles = selectedFiles.filter(file => file.size > 5 * 1024 * 1024);
//       if (oversizedFiles.length > 0) {
//         alert(`Some files are larger than 5MB: ${oversizedFiles.map(f => f.name).join(', ')}. Please select files under 5MB.`);
//         e.target.value = null;
//         return;
//       }
      
//       // Add new files to existing array
//       setImageFiles(prev => [...prev, ...selectedFiles]);
//       e.target.value = null; // Clear the file input after selection to allow selecting the same file again if removed
//     }
//   };

//   // Remove specific image by index
//   const handleRemoveImage = (indexToRemove) => {
//     setImageFiles(prev => prev.filter((_, index) => index !== indexToRemove));
//   };

//   // Clear all selected images
//   const handleClearAllImages = () => {
//     setImageFiles([]);
//   };

//   const handleReset = () => {
//     setHotelDetails({
//       name: '',
//       description: '',
//       city: '',
//       locationId: '',
//       address: '',
//       contact: '',
//     });
//     setImageFiles([]); // Reset to empty array
//     // dispatch(clearCreateHotelStatus()); // Jika diimplementasikan
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!hotelDetails.name || !hotelDetails.description || !hotelDetails.locationId || !hotelDetails.address || !hotelDetails.contact || imageFiles.length === 0) {
//       alert("Please fill in all required fields, select a city, and select at least one image (up to 10 images).");
//       return;
//     }
//     if (imageFiles.length > MAX_IMAGES) {
//         alert(`You have selected ${imageFiles.length} images. Please select a maximum of ${MAX_IMAGES} images.`);
//         return;
//     }

//     const formData = new FormData();
//     formData.append('name', hotelDetails.name);
//     formData.append('description', hotelDetails.description);
//     formData.append('locationId', hotelDetails.locationId); // Kirim locationId
//     formData.append('address', hotelDetails.address);
//     formData.append('contact', hotelDetails.contact);
    
//     // Append all image files under the key 'files'
//     imageFiles.forEach((file) => {
//       formData.append('files', file); // API expects an array of files under this key
//     });

//     dispatch(createHotel(formData));
//   };

//   useEffect(() => {
//     if (createdHotelData && !loadingCreateHotel && !errorCreateHotel) {
//       alert("Hotel added successfully!");
//       handleReset();
//       navigate("/manajemen-hotel");
//       // dispatch(clearCreateHotelStatus()); // Jika diimplementasikan
//     }
//   }, [createdHotelData, loadingCreateHotel, errorCreateHotel, navigate, dispatch]);

//   return (
//     <div className="flex transition-all duration-300">
//       <div className={`bg-ungu10 pt-20 h-full min-h-screen transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
//         <div className="grid grid-cols-2 px-4">
//           <div className="flex flex-col md:flex-row text-left md:gap-1">
//             <p className="text-xl">Hotel Management</p>
//             <p className="text-xs pt-2 text-gray-600">Add Hotel</p>
//           </div>
//           <div className="flex flex-row justify-end">
//             <Link to="/manajemen-hotel" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
//               <i className="fa-solid fa-house-chimney text-xs"></i>
//               <p className="text-xs md:text-sm">Home</p>
//             </Link>
//             <span className="flex items-center gap-1 text-black pt-9 md:pt-0 ml-1">
//               <p>/</p>
//               <p className="text-xs md:text-sm">Add Hotel</p>
//             </span>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="bg-white m-4 py-4 rounded-lg shadow-md">
//           <div className="flex-col px-4 items-center">
//             <div className="text-left md:text-xl mb-6 md:mb-12">
//               <p>Add New Hotel</p>
//             </div>

//             {errorCreateHotel && (
//               <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center">
//                 Error adding hotel: {typeof errorCreateHotel === 'string' ? errorCreateHotel : JSON.stringify(errorCreateHotel)}
//               </div>
//             )}

//             {errorLocations && (
//               <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center">
//                 Error fetching locations: {typeof errorLocations === 'string' ? errorLocations : JSON.stringify(errorLocations)}
//               </div>
//             )}

//             <div className="flex flex-col gap-4 items-center">
//               {/* Name */}
//               <div className="text-left w-64 md:w-96">
//                 <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
//                   <span className="text-red-700 mr-1">*</span>Name
//                 </label>
//                 <div className="flex w-full items-center border rounded-lg p-2 bg-gray-100">
//                   <i className="ri-pencil-fill text-gray-500 mr-2"></i>
//                   <input
//                     id="name"
//                     type="text"
//                     name="name"
//                     value={hotelDetails.name}
//                     onChange={handleInputChange}
//                     placeholder="Hotel name"
//                     className="w-full bg-transparent focus:outline-none"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Description */}
//               <div className="text-left w-64 md:w-96">
//                 <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
//                   <span className="text-red-700 mr-1">*</span>Description
//                 </label>
//                 <textarea
//                   id="description"
//                   name="description"
//                   value={hotelDetails.description}
//                   onChange={handleInputChange}
//                   placeholder="Hotel description"
//                   className="w-full bg-transparent focus:outline-none p-2 rounded-lg border border-gray-300"
//                   rows="4"
//                   required
//                 />
//               </div>

//               {/* City */}
//               <div className="text-left w-64 md:w-96">
//                 <label htmlFor="city" className="block text-sm font-semibold text-gray-700">
//                   <span className="text-red-700 mr-1">*</span>City
//                 </label>
//                 <select
//                   id="city"
//                   name="city" // Tetap 'city' untuk handleInputChange, tapi value-nya adalah locationId
//                   value={hotelDetails.locationId} // value dari select adalah locationId
//                   onChange={handleInputChange}
//                   className="w-full bg-gray-100 border rounded p-2"
//                   required
//                   disabled={loadingLocations} // Disable saat loading
//                 >
//                   <option value="">{loadingLocations ? "Loading cities..." : "Select a city"}</option>
//                   {locationList && locationList.length > 0 && locationList.map((location) => (
//                     <option key={location.id} value={location.id}>
//                       {location.city}
//                     </option>
//                   ))}
//                 </select>
//                 {hotelDetails.locationId && hotelDetails.city && (
//                     <p className="text-xs text-gray-500 mt-1">Selected City: {hotelDetails.city} (ID: {hotelDetails.locationId})</p>
//                 )}
//               </div>

//               {/* Address */}
//               <div className="text-left w-64 md:w-96">
//                 <label htmlFor="address" className="block text-sm font-semibold text-gray-700">
//                   <span className="text-red-700 mr-1">*</span>Address
//                 </label>
//                 <textarea
//                   id="address"
//                   name="address"
//                   value={hotelDetails.address}
//                   onChange={handleInputChange}
//                   className="w-full bg-transparent focus:outline-none p-2 rounded-lg border border-gray-300"
//                   rows="2"
//                   required
//                 />
//               </div>

//               {/* Contact */}
//               <div className="text-left w-64 md:w-96">
//                 <label htmlFor="contact" className="block text-sm font-semibold text-gray-700">
//                     <span className="text-red-700 mr-1">*</span>Contact
//                 </label>
//                 <input
//                     id="contact"
//                     type="text"
//                     name="contact"
//                     value={hotelDetails.contact}
//                     onChange={handleInputChange}
//                     placeholder="0853xxxxxxxx"
//                     className="w-full bg-transparent focus:outline-none p-2 rounded-lg border border-gray-300"
//                     required
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Exp: 0853xxxxxxxx</p>
//               </div>

//               {/* Multiple Images */}
//               <div className="text-left w-64 md:w-96">
//                 <label htmlFor="imageFiles" className="block text-sm font-semibold text-gray-700">
//                   <span className="text-red-700 mr-1">*</span>Hotel Images (Max {MAX_IMAGES})
//                 </label>
                
//                 <input
//                   id="imageFiles"
//                   type="file"
//                   name="imageFiles" // This name is for the input element itself, not directly for FormData key
//                   onChange={handleImageChange}
//                   className="w-full bg-gray-100 p-2 rounded border"
//                   multiple // Allow multiple file selection
//                   accept="image/*" // Accept only image files
//                   disabled={imageFiles.length >= MAX_IMAGES} // Disable if max files reached
//                 />
                
//                 <div className="flex justify-between items-center mt-1">
//                     <p className="text-xs text-gray-500">
//                         {imageFiles.length} / {MAX_IMAGES} images selected. Max 5MB each.
//                     </p>
//                     {imageFiles.length > 0 && (
//                         <button
//                         type="button"
//                         onClick={handleClearAllImages}
//                         className="text-xs text-red-600 hover:text-red-800 underline"
//                         >
//                         Clear All Images
//                         </button>
//                     )}
//                 </div>


//                 {/* Image Preview Grid */}
//                 {imageFiles.length > 0 && (
//                   <div className="mt-3">
//                     <p className="text-sm text-gray-600 mb-2">Image Previews:</p>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
//                       {imageFiles.map((file, index) => (
//                         <div key={index} className="relative group border rounded p-1">
//                           <img 
//                             src={URL.createObjectURL(file)} 
//                             alt={`Preview ${index + 1}`} 
//                             className="w-full h-24 object-cover rounded"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => handleRemoveImage(index)}
//                             className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-75 group-hover:opacity-100 transition-opacity"
//                             title="Remove image"
//                           >
//                             ×
//                           </button>
//                           <p className="text-xs text-gray-500 mt-1 truncate" title={file.name}>
//                             {file.name}
//                           </p>
//                            <p className="text-xs text-gray-400">
//                             {(file.size / 1024 / 1024).toFixed(2)} MB
//                           </p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//                 {imageFiles.length >= MAX_IMAGES && (
//                   <p className="text-xs text-orange-600 mt-1">
//                     Maximum number of images ({MAX_IMAGES}) reached. Remove some to add new ones.
//                   </p>
//                 )}
//               </div>

//               {/* Buttons */}
//               <div className="flex flex-row justify-center gap-6 text-white font-bold mt-12 mb-10">
//                 <Button type="button" text="Reset" bgColor="bg-yellow1" onClick={handleReset} disabled={loadingCreateHotel}/>
//                 <Button type="submit" text={loadingCreateHotel ? "Submitting..." : "Submit"} bgColor="bg-blue1" disabled={loadingCreateHotel || loadingLocations || (imageFiles.length > MAX_IMAGES)} />
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TambahHotel;


import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button"; // Sesuaikan path jika perlu
import { createHotel, fetchLocations } from "../redux/actions/mitraAction"; // Import fetchLocations
// import { clearCreateHotelStatus } from "../redux/actions/mitraAction"; // Opsional

const TambahHotel = ({ isSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [hotelDetails, setHotelDetails] = useState({
    name: '',
    description: '',
    city: '',
    locationId: '',
    address: '',
    contact: '',
  });
  
  const [imageFiles, setImageFiles] = useState([]);
  const MAX_IMAGES = 10;
  
  // State for success popup
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); 
  const [successMessage, setSuccessMessage] = useState(""); // State for the success message

  const {
    loadingCreateHotel,
    errorCreateHotel,
    createdHotelData,
    locationList, 
    loadingLocations, 
    errorLocations, 
  } = useSelector((state) => state.mitra);

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "city") {
      const selectedLocationId = value;
      const selectedLocationObject = locationList.find(loc => loc.id === selectedLocationId);
      const cityName = selectedLocationObject ? selectedLocationObject.city : '';

      setHotelDetails((prev) => ({
        ...prev,
        city: cityName, 
        locationId: selectedLocationId, 
      }));
    } else {
      setHotelDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle multiple image selection
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      
      if (imageFiles.length + selectedFiles.length > MAX_IMAGES) {
        alert(`You can only upload a maximum of ${MAX_IMAGES} images. Currently you have ${imageFiles.length} images.`);
        e.target.value = null; 
        return;
      }
      
      const oversizedFiles = selectedFiles.filter(file => file.size > 5 * 1024 * 1024);
      if (oversizedFiles.length > 0) {
        alert(`Some files are larger than 5MB: ${oversizedFiles.map(f => f.name).join(', ')}`);
        e.target.value = null; 
        return;
      }
      
      setImageFiles(prev => [...prev, ...selectedFiles]);
      e.target.value = null; 
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setImageFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleClearAllImages = () => {
    setImageFiles([]);
  };

  const handleReset = useCallback(() => {
    setHotelDetails({
      name: '',
      description: '',
      city: '',
      locationId: '',
      address: '',
      contact: '',
    });
    setImageFiles([]);
    // if (dispatch && clearCreateHotelStatus) {
    //   dispatch(clearCreateHotelStatus()); 
    // }
  }, []); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hotelDetails.name || !hotelDetails.description || !hotelDetails.locationId || !hotelDetails.address || !hotelDetails.contact || imageFiles.length === 0) {
      alert("Please fill in all required fields, select a city, and select at least one image.");
      return;
    }
    if (imageFiles.length > MAX_IMAGES) {
        alert(`You have selected ${imageFiles.length} images. Please select a maximum of ${MAX_IMAGES} images.`);
        return;
    }

    const formData = new FormData();
    formData.append('name', hotelDetails.name);
    formData.append('description', hotelDetails.description);
    formData.append('locationId', hotelDetails.locationId);
    formData.append('address', hotelDetails.address);
    formData.append('contact', hotelDetails.contact);
    
    imageFiles.forEach((file) => {
      formData.append('files', file);
    });

    dispatch(createHotel(formData));
  };

  // Success Popup logic
  useEffect(() => {
    if (createdHotelData && !loadingCreateHotel && !errorCreateHotel) {
      setSuccessMessage("Hotel has been successfully added and the details are saved."); // Set the success message
      setShowSuccessPopup(true);
    }
  }, [createdHotelData, loadingCreateHotel, errorCreateHotel]);

  const closeSuccessPopup = useCallback(() => {
    setShowSuccessPopup(false);
    handleReset();
    navigate("/manajemen-hotel");
  }, [navigate, handleReset]);


  return (
    <> 
      <div className="flex transition-all duration-300">
        <div className={`bg-ungu10 pt-20 h-full min-h-screen transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
          <div className="grid grid-cols-2 px-4">
            <div className="flex flex-col md:flex-row text-left md:gap-1">
              <p className="text-xl">Hotel Management</p>
              <p className="text-xs pt-2 text-gray-600">Add Hotel</p>
            </div>
            <div className="flex flex-row justify-end">
              <Link to="/manajemen-hotel" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
                <i className="fa-solid fa-house-chimney text-xs"></i>
                <p className="text-xs md:text-sm">Home</p>
              </Link>
              <span className="flex items-center gap-1 text-black pt-9 md:pt-0 ml-1">
                <p>/</p>
                <p className="text-xs md:text-sm">Add Hotel</p>
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white m-4 py-4 rounded-lg shadow-md">
            <div className="flex-col px-4 items-center">
              <div className="text-left md:text-xl mb-6 md:mb-12">
                <p>Add New Hotel</p>
              </div>

              {errorCreateHotel && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center">
                  Error adding hotel: {typeof errorCreateHotel === 'string' ? errorCreateHotel : JSON.stringify(errorCreateHotel)}
                </div>
              )}

              {errorLocations && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center">
                  Error fetching locations: {typeof errorLocations === 'string' ? errorLocations : JSON.stringify(errorLocations)}
                </div>
              )}

              <div className="flex flex-col gap-4 items-center">
                {/* Name */}
                <div className="text-left w-64 md:w-96">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                    <span className="text-red-700 mr-1">*</span>Name
                  </label>
                  <div className="flex w-full items-center border rounded-lg p-2 bg-gray-100">
                    <i className="ri-pencil-fill text-gray-500 mr-2"></i>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={hotelDetails.name}
                      onChange={handleInputChange}
                      placeholder="Hotel name"
                      className="w-full bg-transparent focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="text-left w-64 md:w-96">
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                    <span className="text-red-700 mr-1">*</span>Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={hotelDetails.description}
                    onChange={handleInputChange}
                    placeholder="Hotel description"
                    className="w-full bg-transparent focus:outline-none p-2 rounded-lg border border-gray-300"
                    rows="4"
                    required
                  />
                </div>

                {/* City */}
                <div className="text-left w-64 md:w-96">
                  <label htmlFor="city" className="block text-sm font-semibold text-gray-700">
                    <span className="text-red-700 mr-1">*</span>City
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={hotelDetails.locationId}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 border rounded p-2"
                    required
                    disabled={loadingLocations}
                  >
                    <option value="">{loadingLocations ? "Loading cities..." : "Select a city"}</option>
                    {locationList && locationList.length > 0 && locationList.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.city}
                      </option>
                    ))}
                  </select>
                  {hotelDetails.locationId && hotelDetails.city && (
                      <p className="text-xs text-gray-500 mt-1">Selected City: {hotelDetails.city}</p>
                  )}
                   {!hotelDetails.locationId && hotelDetails.city && !loadingLocations && (
                      <p className="text-xs text-red-500 mt-1">Warning: No Location ID mapped for this city. Please check configuration.</p>
                  )}
                </div>

                {/* Address */}
                <div className="text-left w-64 md:w-96">
                  <label htmlFor="address" className="block text-sm font-semibold text-gray-700">
                    <span className="text-red-700 mr-1">*</span>Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={hotelDetails.address}
                    onChange={handleInputChange}
                    className="w-full bg-transparent focus:outline-none p-2 rounded-lg border border-gray-300"
                    rows="2"
                    required
                  />
                </div>

                {/* Contact */}
                <div className="text-left w-64 md:w-96">
                  <label htmlFor="contact" className="block text-sm font-semibold text-gray-700">
                      <span className="text-red-700 mr-1">*</span>Contact
                  </label>
                  <input
                      id="contact"
                      type="text"
                      name="contact"
                      value={hotelDetails.contact}
                      onChange={handleInputChange}
                      placeholder="0853xxxxxxxx"
                      className="w-full bg-transparent focus:outline-none p-2 rounded-lg border border-gray-300"
                      required
                  />
                  <p className="text-xs text-gray-500 mt-1">Exp: 0853xxxxxxxx</p>
                </div>

                {/* Multiple Images */}
                <div className="text-left w-64 md:w-96">
                  <label htmlFor="imageFiles" className="block text-sm font-semibold text-gray-700">
                    <span className="text-red-700 mr-1">*</span>Hotel Images
                  </label>
                  
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

                  {imageFiles.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 mb-2">Image Previews:</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {imageFiles.map((file, index) => (
                          <div key={index} className="relative group border p-1 rounded-md"> 
                            <img 
                              src={URL.createObjectURL(file)} 
                              alt={`Preview ${index + 1}`} 
                              className="w-full h-24 object-cover border rounded"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-75 group-hover:opacity-100 transition-opacity focus:outline-none"
                              title="Remove image"
                            >
                              ×
                            </button>
                            <p className="text-xs text-gray-500 mt-1 truncate" title={file.name}>
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {imageFiles.length >= MAX_IMAGES && (
                    <p className="text-xs text-orange-600 mt-1">
                      Maximum number of images reached. Remove some images to add more.
                    </p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex flex-row justify-center gap-6 text-white font-bold mt-12 mb-10">
                  <Button type="button" text="Reset" bgColor="bg-yellow1" onClick={handleReset} disabled={loadingCreateHotel}/>
                  <Button type="submit" text={loadingCreateHotel ? "Submitting..." : "Submit"} bgColor="bg-blue1" disabled={loadingCreateHotel || loadingLocations || (imageFiles.length > MAX_IMAGES)} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Success Popup Modal (User's new design) */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4"> {/* Added p-4 for small screen padding */}
          <div className="bg-white p-6 rounded-lg shadow-xl text-center transform transition-all sm:max-w-xs sm:w-full">
            <div className="mb-4">
                {/* Assuming Remix Icon is available in your project */}
                <i className="ri-checkbox-circle-line text-5xl text-green-500"></i>
            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
              Success!
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              {successMessage}
            </p>
            <div className="flex justify-center">
              <button 
                onClick={closeSuccessPopup} 
                className="px-6 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TambahHotel;
