// import React, { useState, useEffect } from "react";
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
// import { updateHotel, fetchLocations, fetchHotelById } from "../redux/actions/mitraAction"; // Added fetchHotelById
// import Button from "../components/Button";

// const EditHotel = ({ isSidebarOpen }) => {
//   const { hotelId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const {
//     // hotelList, // We'll primarily use hotelDetail for populating the edit form
//     loadingUpdateHotel,
//     errorUpdateHotel,
//     updatedHotelData,
//     locationList,
//     loadingLocations,
//     errorLocations,
//     hotelDetail, // State for the fetched hotel by ID
//     loadingHotelDetail, // Loading state for fetching hotel by ID
//     errorHotelDetail, // Error state for fetching hotel by ID
//   } = useSelector((state) => state.mitra);

//   const [hotelDetails, setHotelDetails] = useState({
//     id: hotelId,
//     name: '',
//     description: '',
//     locationId: '',
//     address: '',
//     contact: '',
//     currentImageUrl: ''
//   });
//   const [imageFile, setImageFile] = useState(null);
//   const [selectedCityName, setSelectedCityName] = useState('');

//   useEffect(() => {
//     // Fetch the specific hotel's details when the component mounts or hotelId changes
//     if (hotelId) {
//       dispatch(fetchHotelById(hotelId));
//     }
//     // Fetch locations if not already available, as they are needed for the dropdown
//     if (!locationList || locationList.length === 0) {
//       dispatch(fetchLocations());
//     }
//   }, [dispatch, hotelId, locationList]); // locationList dependency to re-trigger if it was initially empty

//   useEffect(() => {
//     // This effect populates the form once hotelDetail and locationList are available
//     if (hotelDetail && hotelDetail.id === hotelId) { // Ensure a fresh hotelDetail is used
//       const hotelOriginalCityName = hotelDetail.location?.city;
//       let derivedLocationId = '';
//       let cityDisplayNameForDropdown = 'Select a city';

//       if (hotelOriginalCityName) {
//         if (locationList && locationList.length > 0) {
//           const matchedLocation = locationList.find(
//             (loc) => loc.city.toLowerCase() === hotelOriginalCityName.toLowerCase()
//           );
//           if (matchedLocation) {
//             derivedLocationId = matchedLocation.id;
//             cityDisplayNameForDropdown = matchedLocation.city;
//           } else {
//             cityDisplayNameForDropdown = `City '${hotelOriginalCityName}' not in locations`;
//             console.warn(`EDIT HOTEL - City '${hotelOriginalCityName}' (from hotel detail) was not found in your locationList.`);
//           }
//         } else if (loadingLocations) {
//           cityDisplayNameForDropdown = `Loading locations to find '${hotelOriginalCityName}'...`;
//         } else {
//           cityDisplayNameForDropdown = `Cannot match '${hotelOriginalCityName}', location list empty.`;
//           console.warn(`EDIT HOTEL - Cannot match city, locationList is empty and not loading.`);
//         }
//       } else {
//         cityDisplayNameForDropdown = 'No location assigned to hotel';
//         console.warn("EDIT HOTEL - No city name (hotelDetail.location.city) found in fetched hotel data.");
//       }

//       setHotelDetails({
//         id: hotelDetail.id,
//         name: hotelDetail.name || '',
//         description: hotelDetail.description || '',
//         locationId: derivedLocationId,
//         address: hotelDetail.address || '',
//         contact: hotelDetail.contact || '',
//         // Prefer hotelImages array if available, otherwise fallback
//         currentImageUrl: hotelDetail.hotelImages && hotelDetail.hotelImages.length > 0
//                          ? hotelDetail.hotelImages[0].imageUrl
//                          : (hotelDetail.imageUrl || hotelDetail.image || '')
//       });
//       setSelectedCityName(cityDisplayNameForDropdown);

//     } else if (!loadingHotelDetail && hotelId && !hotelDetail) {
//         // This case might indicate the hotel wasn't found or an issue with fetchHotelById
//         console.error("Hotel details not found for ID:", hotelId, "after attempting fetch.");
//         setSelectedCityName('Hotel data not found');
//         setHotelDetails(prev => ({
//             ...prev,
//             id: hotelId, // keep hotelId
//             name: 'Error: Hotel not found',
//             description: '',
//             locationId: '',
//             address: '',
//             contact: '',
//             currentImageUrl: ''
//         }));
//     }
//   }, [hotelId, hotelDetail, locationList, loadingLocations, loadingHotelDetail]); // Dependencies for form population

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setHotelDetails((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleLocationChange = (e) => {
//     const selectedLocationId = e.target.value;
//     const selectedLocationObject = locationList.find(loc => loc.id === selectedLocationId);
//     setHotelDetails(prev => ({
//         ...prev,
//         locationId: selectedLocationId
//     }));
//     setSelectedCityName(selectedLocationObject ? selectedLocationObject.city : '');
//   };

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setImageFile(e.target.files[0]);
//       // Optionally clear currentImageUrl or show preview logic will handle it
//       // setHotelDetails(prev => ({ ...prev, currentImageUrl: '' }));
//     } else {
//       setImageFile(null);
//     }
//   };

//   const handleReset = () => {
//     // Reset logic should re-populate based on the initially fetched hotelDetail
//     if (hotelDetail && hotelDetail.id === hotelId) {
//         const hotelOriginalCityName = hotelDetail.location?.city;
//         let derivedLocationId = '';
//         let cityDisplayNameForDropdown = 'Select a city';

//         if (hotelOriginalCityName && locationList && locationList.length > 0) {
//             const matchedLocation = locationList.find(
//                 (loc) => loc.city.toLowerCase() === hotelOriginalCityName.toLowerCase()
//             );
//             if (matchedLocation) {
//                 derivedLocationId = matchedLocation.id;
//                 cityDisplayNameForDropdown = matchedLocation.city;
//             } else {
//                 cityDisplayNameForDropdown = `City '${hotelOriginalCityName}' not in locations`;
//             }
//         } else if (hotelOriginalCityName) {
//              cityDisplayNameForDropdown = loadingLocations ? `Loading locations...` : `Cannot match '${hotelOriginalCityName}', location list empty.`;
//         } else {
//             cityDisplayNameForDropdown = 'No location assigned to hotel';
//         }

//         setHotelDetails({
//             id: hotelDetail.id,
//             name: hotelDetail.name || '',
//             description: hotelDetail.description || '',
//             locationId: derivedLocationId,
//             address: hotelDetail.address || '',
//             contact: hotelDetail.contact || '',
//             currentImageUrl: hotelDetail.hotelImages && hotelDetail.hotelImages.length > 0
//                          ? hotelDetail.hotelImages[0].imageUrl
//                          : (hotelDetail.imageUrl || hotelDetail.image || '')
//         });
//         setSelectedCityName(cityDisplayNameForDropdown);
//     } else {
//         // Fallback if hotelDetail is not available (e.g., error during initial fetch)
//         setHotelDetails({
//             id: hotelId, name: '', description: '', locationId: '', address: '', contact: '', currentImageUrl: ''
//         });
//         setSelectedCityName('Select a city');
//     }
//     setImageFile(null);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!hotelDetails.locationId) {
//         alert("Please select a valid city. The city determines the Location ID required for an update.");
//         return;
//     }

//     const formData = new FormData();
//     formData.append('hotelId', hotelDetails.id);
//     formData.append('name', hotelDetails.name);
//     formData.append('description', hotelDetails.description);
//     formData.append('address', hotelDetails.address);
//     formData.append('contact', hotelDetails.contact);
//     formData.append('locationId', hotelDetails.locationId);

//     if (imageFile) {
//       formData.append('files', imageFile); // API expects 'files' (plural)
//     }
//     dispatch(updateHotel(formData));
//   };

//   useEffect(() => {
//     // Navigate after successful update
//     if (updatedHotelData && !loadingUpdateHotel && !errorUpdateHotel) {
//       // Ensure the success message is for the hotel being edited
//       if (updatedHotelData.id === hotelId) {
//         alert("Hotel updated successfully!");
//         navigate("/manajemen-hotel");
//         // Consider dispatching an action to clear updatedHotelData status here
//         // to prevent re-triggering on subsequent visits if needed.
//       }
//     }
//   }, [updatedHotelData, loadingUpdateHotel, errorUpdateHotel, navigate, hotelId]);


//   if (loadingHotelDetail && !hotelDetail) { // Show main loading only if hotelDetail is not yet set
//       return (
//         <div className={`flex transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
//             <div className="bg-ungu10 pt-20 h-full min-h-screen w-full flex justify-center items-center">
//                 <p className="text-xl">Loading hotel data...</p>
//             </div>
//         </div>
//       );
//   }

//   return (
//     <div className="flex transition-all duration-300">
//       <div className={`bg-ungu10 pt-20 h-full min-h-screen transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
//         <div className="grid grid-cols-2 px-4">
//           <div className="flex flex-col md:flex-row text-left md:gap-1">
//             <p className="text-xl">Hotel Management</p>
//             <p className="text-xs pt-2 text-gray-600">Edit Hotel</p>
//           </div>
//           <div className="flex flex-row justify-end">
//             <Link to="/manajemen-hotel" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
//               <i className="fa-solid fa-house-chimney text-xs"></i>
//               <p className="text-xs md:text-sm">Home</p>
//             </Link>
//             <span className="flex items-center gap-1 text-black pt-9 md:pt-0 ml-1"> {/* Changed Link to span for non-navigable breadcrumb part */}
//               <p>/</p>
//               <p className="text-xs md:text-sm">Edit Hotel</p>
//             </span>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="bg-white m-4 py-4 rounded-lg shadow-md">
//           <div className="flex-col px-4 items-center">
//             <div className="text-left md:text-xl mb-6 md:mb-12">
//               <p>Edit Hotel: {hotelDetails.name || (loadingHotelDetail ? 'Loading name...' : 'Hotel Not Found')}</p>
//             </div>

//             {errorHotelDetail && ( // Display error if fetching hotel by ID failed
//               <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center">
//                 Error fetching hotel details: {typeof errorHotelDetail === 'string' ? errorHotelDetail : JSON.stringify(errorHotelDetail)}
//               </div>
//             )}
//             {errorUpdateHotel && (
//               <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center">
//                 Error updating hotel: {typeof errorUpdateHotel === 'string' ? errorUpdateHotel : JSON.stringify(errorUpdateHotel)}
//               </div>
//             )}
//             {errorLocations && (
//                 <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center">
//                     Error fetching locations: {typeof errorLocations === 'string' ? errorLocations : JSON.stringify(errorLocations)}
//                 </div>
//             )}

//             <div className="flex flex-col gap-4 items-center">
//               {/* Name */}
//               <div className="text-left w-64 md:w-96">
//                 <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
//                   <span className="text-red-700 mr-1">*</span>Name
//                 </label>
//                 <input
//                   id="name"
//                   type="text"
//                   name="name"
//                   value={hotelDetails.name}
//                   onChange={handleInputChange}
//                   placeholder="Hotel name"
//                   className="w-full bg-gray-100 border rounded-lg p-2 focus:outline-none"
//                   required
//                   disabled={loadingHotelDetail}
//                 />
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
//                   className="w-full bg-gray-100 focus:outline-none p-2 rounded-lg border border-gray-300"
//                   rows="4"
//                   required
//                   disabled={loadingHotelDetail}
//                 />
//               </div>

//              {/* City Dropdown (Location) */}
//               <div className="text-left w-64 md:w-96">
//                 <label htmlFor="locationId" className="block text-sm font-semibold text-gray-700">
//                   <span className="text-red-700 mr-1">*</span>City
//                 </label>
//                 <select
//                   id="locationId"
//                   name="locationId"
//                   value={hotelDetails.locationId}
//                   onChange={handleLocationChange}
//                   className="w-full bg-gray-100 border rounded p-2"
//                   required
//                   disabled={loadingLocations || loadingHotelDetail || !locationList || locationList.length === 0}
//                 >
//                   <option value="">
//                     {loadingLocations ? "Loading cities..." : (!locationList || locationList.length === 0 ? "No locations available" : (selectedCityName || "Select a city"))}
//                   </option>
//                   {locationList && locationList.length > 0 && locationList.map((location) => (
//                     <option key={location.id} value={location.id}>
//                       {location.city}
//                     </option>
//                   ))}
//                 </select>
//                  {hotelDetails.locationId && selectedCityName && !selectedCityName.startsWith("Loading") && !selectedCityName.startsWith("City ") && !selectedCityName.startsWith("Cannot match") && !selectedCityName.startsWith("No location assigned") && (
//                     <p className="text-xs text-gray-500 mt-1">Selected: {selectedCityName}</p>
//                  )}
//                  {(!hotelDetails.locationId || selectedCityName.startsWith("City ") || selectedCityName.startsWith("Cannot match") || selectedCityName.startsWith("No location assigned")) && !loadingLocations && !loadingHotelDetail && (
//                     <p className="text-xs text-yellow-600 mt-1">{selectedCityName === "Select a city" && !hotelDetails.locationId ? "Please select a city." : selectedCityName}</p>
//                  )}
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
//                   className="w-full bg-gray-100 focus:outline-none p-2 rounded-lg border border-gray-300"
//                   rows="2"
//                   required
//                   disabled={loadingHotelDetail}
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
//                     className="w-full bg-gray-100 focus:outline-none p-2 rounded-lg border border-gray-300"
//                     required
//                     disabled={loadingHotelDetail}
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Exp: 0853xxxxxxxx</p>
//               </div>

//               {/* Image Upload */}
//               <div className="text-left w-64 md:w-96">
//                 <label htmlFor="image" className="block text-sm font-semibold text-gray-700">
//                   <span className="text-red-700 mr-1">*</span>Hotel Image (Optional: Upload to change)
//                 </label>
//                 <input
//                   id="image"
//                   type="file"
//                   name="image" // Name attribute is important for FormData if you were to handle it directly, but onChange uses e.target.files
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="w-full bg-gray-100 p-2 rounded border"
//                   disabled={loadingHotelDetail}
//                 />
//                 {hotelDetails.currentImageUrl && !imageFile && ( // Show current image if no new file is selected
//                   <div className="mt-2">
//                     <p className="text-sm text-gray-600">Current Image:</p>
//                     <img src={hotelDetails.currentImageUrl} alt="Current hotel" className="max-w-xs max-h-32 mt-1 border rounded"/>
//                   </div>
//                 )}
//                 {imageFile && ( // Show preview of the new file if selected
//                   <div className="mt-2">
//                     <p className="text-sm text-gray-600">New Image Preview:</p>
//                     <img src={URL.createObjectURL(imageFile)} alt="New preview" className="max-w-xs max-h-32 mt-1 border rounded"/>
//                     <p className="text-xs text-gray-500 mt-1">{imageFile.name}</p>
//                   </div>
//                 )}
//                  <p className="text-xs text-gray-500 mt-1">Maximum file size is 5 MB</p>
//               </div>

//               {/* Buttons */}
//               <div className="flex flex-row justify-center gap-6 text-white font-bold mt-12 mb-10">
//                 <Button type="button" text="Reset" bgColor="bg-yellow1" onClick={handleReset} disabled={loadingUpdateHotel || loadingHotelDetail}/>
//                 <Button type="submit" text={loadingUpdateHotel ? "Updating..." : "Update Hotel"} bgColor="bg-blue1" disabled={loadingUpdateHotel || loadingHotelDetail || loadingLocations} />
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditHotel;


import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { updateHotel, fetchLocations, fetchHotelById } from "../redux/actions/mitraAction";
import Button from "../components/Button";

const EditHotel = ({ isSidebarOpen }) => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    loadingUpdateHotel,
    errorUpdateHotel,
    updatedHotelData,
    locationList,
    loadingLocations,
    errorLocations,
    hotelDetail,
    loadingHotelDetail,
    errorHotelDetail,
  } = useSelector((state) => state.mitra);

  const [hotelDetails, setHotelDetails] = useState({
    id: hotelId,
    name: '',
    description: '',
    locationId: '',
    address: '',
    contact: '',
    currentImages: []
  });

  const [newImageFiles, setNewImageFiles] = useState([]);
  const [selectedCityName, setSelectedCityName] = useState('');
  const MAX_IMAGES = 10;

  // State for the success popup
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (hotelId) {
      dispatch(fetchHotelById(hotelId));
    }
    if (!locationList || locationList.length === 0) {
      dispatch(fetchLocations());
    }
  }, [dispatch, hotelId, locationList]);

  useEffect(() => {
    if (hotelDetail && hotelDetail.id === hotelId) {
      const hotelOriginalCityName = hotelDetail.location?.city;
      let derivedLocationId = '';
      let cityDisplayNameForDropdown = 'Select a city';

      if (hotelOriginalCityName) {
        if (locationList && locationList.length > 0) {
          const matchedLocation = locationList.find(
            (loc) => loc.city.toLowerCase() === hotelOriginalCityName.toLowerCase()
          );
          if (matchedLocation) {
            derivedLocationId = matchedLocation.id;
            cityDisplayNameForDropdown = matchedLocation.city;
          } else {
            cityDisplayNameForDropdown = `City '${hotelOriginalCityName}' not in locations`;
            console.warn(`EDIT HOTEL - City '${hotelOriginalCityName}' (from hotel detail) was not found in your locationList.`);
          }
        } else if (loadingLocations) {
          cityDisplayNameForDropdown = `Loading locations to find '${hotelOriginalCityName}'...`;
        } else {
          cityDisplayNameForDropdown = `Cannot match '${hotelOriginalCityName}', location list empty.`;
          console.warn(`EDIT HOTEL - Cannot match city, locationList is empty and not loading.`);
        }
      } else {
        cityDisplayNameForDropdown = 'No location assigned to hotel';
        console.warn("EDIT HOTEL - No city name (hotelDetail.location.city) found in fetched hotel data.");
      }

      let existingImages = [];
      if (hotelDetail.hotelImages && Array.isArray(hotelDetail.hotelImages) && hotelDetail.hotelImages.length > 0) {
        existingImages = hotelDetail.hotelImages.map((img, index) => ({
          id: img.id || `existing-${hotelDetail.id}-${index}-${Date.now()}`,
          url: img.imageUrl || img.url,
          name: img.name || `Existing Image ${index + 1}`
        }));
      } else if (hotelDetail.imageUrl || hotelDetail.image) {
        existingImages = [{
          id: `existing-${hotelDetail.id}-0-${Date.now()}`,
          url: hotelDetail.imageUrl || hotelDetail.image,
          name: 'Existing Image'
        }];
      }

      setHotelDetails({
        id: hotelDetail.id,
        name: hotelDetail.name || '',
        description: hotelDetail.description || '',
        locationId: derivedLocationId,
        address: hotelDetail.address || '',
        contact: hotelDetail.contact || '',
        currentImages: existingImages
      });
      setSelectedCityName(cityDisplayNameForDropdown);

    } else if (!loadingHotelDetail && hotelId && !hotelDetail) {
        console.error("Hotel details not found for ID:", hotelId, "after attempting fetch.");
        setSelectedCityName('Hotel data not found');
        setHotelDetails(prev => ({
            ...prev,
            id: hotelId,
            name: 'Error: Hotel not found',
            description: '',
            locationId: '',
            address: '',
            contact: '',
            currentImages: []
        }));
    }
  }, [hotelId, hotelDetail, locationList, loadingLocations, loadingHotelDetail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHotelDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (e) => {
    const selectedLocationId = e.target.value;
    const selectedLocationObject = locationList.find(loc => loc.id === selectedLocationId);
    setHotelDetails(prev => ({
        ...prev,
        locationId: selectedLocationId
    }));
    setSelectedCityName(selectedLocationObject ? selectedLocationObject.city : 'Select a city');
  };

  const handleNewImagesChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      const totalExistingAndStagedNewImages = hotelDetails.currentImages.length + newImageFiles.length;

      if (totalExistingAndStagedNewImages + selectedFiles.length > MAX_IMAGES) {
        alert(`You can only have a maximum of ${MAX_IMAGES} images. You currently have ${totalExistingAndStagedNewImages} and tried to add ${selectedFiles.length}.`);
        e.target.value = null;
        return;
      }

      const oversizedFiles = selectedFiles.filter(file => file.size > 5 * 1024 * 1024);
      if (oversizedFiles.length > 0) {
        alert(`Some files are larger than 5MB: ${oversizedFiles.map(f => f.name).join(', ')}`);
        e.target.value = null;
        return;
      }
      setNewImageFiles(prev => [...prev, ...selectedFiles]);
      e.target.value = null;
    }
  };

  const handleRemoveExistingImage = (imageIdToRemove) => {
    if ((hotelDetails.currentImages.length - 1 + newImageFiles.length) < 1 && hotelDetails.currentImages.length <=1 ) {
        alert("You must have at least one image (either existing or new).");
        return;
    }
    setHotelDetails(prev => ({
      ...prev,
      currentImages: prev.currentImages.filter(img => img.id !== imageIdToRemove)
    }));
  };

  const handleRemoveNewImage = (indexToRemove) => {
     if ((hotelDetails.currentImages.length + newImageFiles.length - 1) < 1 && newImageFiles.length <= 1) {
        alert("You must have at least one image (either existing or new).");
        return;
    }
    setNewImageFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleClearNewImages = () => {
    if (hotelDetails.currentImages.length === 0 && newImageFiles.length > 0) {
        alert("You must have at least one image. Clearing all new images would leave no images.");
        return;
    }
    setNewImageFiles([]);
  };

  const handleReset = () => {
    if (hotelDetail && hotelDetail.id === hotelId) {
        const hotelOriginalCityName = hotelDetail.location?.city;
        let derivedLocationId = '';
        let cityDisplayNameForDropdown = 'Select a city';

        if (hotelOriginalCityName && locationList && locationList.length > 0) {
            const matchedLocation = locationList.find(
                (loc) => loc.city.toLowerCase() === hotelOriginalCityName.toLowerCase()
            );
            if (matchedLocation) {
                derivedLocationId = matchedLocation.id;
                cityDisplayNameForDropdown = matchedLocation.city;
            } else {
                cityDisplayNameForDropdown = `City '${hotelOriginalCityName}' not in locations`;
            }
        } else if (hotelOriginalCityName) {
             cityDisplayNameForDropdown = loadingLocations ? `Loading locations...` : `Cannot match '${hotelOriginalCityName}', location list empty.`;
        } else {
            cityDisplayNameForDropdown = 'No location assigned to hotel';
        }

        let existingImages = [];
        if (hotelDetail.hotelImages && Array.isArray(hotelDetail.hotelImages) && hotelDetail.hotelImages.length > 0) {
            existingImages = hotelDetail.hotelImages.map((img, index) => ({
              id: img.id || `existing-${hotelDetail.id}-${index}-${Date.now()}`,
              url: img.imageUrl || img.url,
              name: img.name || `Existing Image ${index + 1}`
            }));
        } else if (hotelDetail.imageUrl || hotelDetail.image) {
            existingImages = [{
              id: `existing-${hotelDetail.id}-0-${Date.now()}`,
              url: hotelDetail.imageUrl || hotelDetail.image,
              name: 'Existing Image'
            }];
        }

        setHotelDetails({
            id: hotelDetail.id,
            name: hotelDetail.name || '',
            description: hotelDetail.description || '',
            locationId: derivedLocationId,
            address: hotelDetail.address || '',
            contact: hotelDetail.contact || '',
            currentImages: existingImages
        });
        setSelectedCityName(cityDisplayNameForDropdown);
    } else {
        setHotelDetails({
            id: hotelId, name: '', description: '', locationId: '', address: '', contact: '', currentImages: []
        });
        setSelectedCityName('Select a city');
    }
    setNewImageFiles([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hotelDetails.locationId) {
        alert("Please select a valid city. The city determines the Location ID required for an update.");
        return;
    }
    if (hotelDetails.currentImages.length === 0 && newImageFiles.length === 0) {
      alert("Please keep at least one existing image or add new images for the hotel.");
      return;
    }

    const formData = new FormData();
    formData.append('hotelId', hotelDetails.id);
    formData.append('name', hotelDetails.name);
    formData.append('description', hotelDetails.description);
    formData.append('address', hotelDetails.address);
    formData.append('contact', hotelDetails.contact);
    formData.append('locationId', hotelDetails.locationId);

    const backendImageIdsToKeep = hotelDetails.currentImages
                                    .map(img => img.id)
                                    .filter(id => !id.toString().startsWith('existing-'));
    if (backendImageIdsToKeep.length > 0) {
        formData.append('keepImageIds', JSON.stringify(backendImageIdsToKeep));
    } else if (hotelDetails.currentImages.length > 0 && backendImageIdsToKeep.length === 0){
        formData.append('keepImageIds', JSON.stringify([]));
    }
    if (hotelDetails.currentImages.length === 0) {
        formData.append('keepImageIds', JSON.stringify([]));
    }

    newImageFiles.forEach((file) => {
      formData.append('files', file);
    });
    dispatch(updateHotel(formData));
  };

  // Functions to handle the success popup
  const openSuccessPopup = (message) => {
    setSuccessMessage(message);
    setShowSuccessPopup(true);
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
    setSuccessMessage('');
    navigate("/manajemen-hotel"); // Navigate after closing popup
  };

  useEffect(() => {
    if (updatedHotelData && !loadingUpdateHotel && !errorUpdateHotel) {
      if (updatedHotelData.id === hotelId) {
        openSuccessPopup("Hotel updated successfully!");
        // Optional: dispatch an action to clear updatedHotelData from Redux store
        // to prevent the popup from re-appearing if the user navigates back to this page
        // without a full refresh or if the component re-mounts with old state.
        // dispatch(clearUpdatedHotelDataStatus()); 
      }
    }
  }, [updatedHotelData, loadingUpdateHotel, errorUpdateHotel, hotelId]); // Removed navigate from here


  const totalImages = hotelDetails.currentImages.length + newImageFiles.length;

  if (loadingHotelDetail && !hotelDetail) {
      return (
        <div className={`flex transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
            <div className="bg-ungu10 pt-20 h-full min-h-screen w-full flex justify-center items-center">
                <p className="text-xl">Loading hotel data...</p>
            </div>
        </div>
      );
  }

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-full min-h-screen transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">Hotel Management</p>
            <p className="text-xs pt-2 text-gray-600">Edit Hotel</p>
          </div>
          <div className="flex flex-row justify-end">
            <Link to="/manajemen-hotel" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <i className="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
            <span className="flex items-center gap-1 text-black pt-9 md:pt-0 ml-1">
              <p>/</p>
              <p className="text-xs md:text-sm">Edit Hotel</p>
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="flex-col px-4 items-center">
            <div className="text-left md:text-xl mb-6 md:mb-12">
              <p>Edit Hotel: {hotelDetails.name || (loadingHotelDetail ? 'Loading name...' : (hotelDetail ? hotelDetails.name : 'Hotel Not Found'))}</p>
            </div>

            {errorHotelDetail && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center">
                Error fetching hotel details: {typeof errorHotelDetail === 'string' ? errorHotelDetail : JSON.stringify(errorHotelDetail)}
              </div>
            )}
            {errorUpdateHotel && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center">
                Error updating hotel: {typeof errorUpdateHotel === 'string' ? errorUpdateHotel : JSON.stringify(errorUpdateHotel)}
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
                <input
                  id="name" type="text" name="name"
                  value={hotelDetails.name} onChange={handleInputChange}
                  placeholder="Hotel name"
                  className="w-full bg-gray-100 border rounded-lg p-2 focus:outline-none"
                  required disabled={loadingHotelDetail}
                />
              </div>

              {/* Description */}
              <div className="text-left w-64 md:w-96">
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                  <span className="text-red-700 mr-1">*</span>Description
                </label>
                <textarea
                  id="description" name="description"
                  value={hotelDetails.description} onChange={handleInputChange}
                  placeholder="Hotel description"
                  className="w-full bg-gray-100 focus:outline-none p-2 rounded-lg border border-gray-300"
                  rows="4" required disabled={loadingHotelDetail}
                />
              </div>

             {/* City Dropdown (Location) */}
              <div className="text-left w-64 md:w-96">
                <label htmlFor="locationId" className="block text-sm font-semibold text-gray-700">
                  <span className="text-red-700 mr-1">*</span>City
                </label>
                <select
                  id="locationId" name="locationId"
                  value={hotelDetails.locationId} onChange={handleLocationChange}
                  className="w-full bg-gray-100 border rounded p-2"
                  required disabled={loadingLocations || loadingHotelDetail || (!locationList && !loadingLocations) || (locationList && locationList.length === 0 && !loadingLocations) }
                >
                  <option value="">
                    {loadingLocations ? "Loading cities..." : (!locationList || locationList.length === 0 ? "No locations available" : (selectedCityName || "Select a city"))}
                  </option>
                  {locationList && locationList.length > 0 && locationList.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.city}
                    </option>
                  ))}
                </select>
                 {hotelDetails.locationId && selectedCityName && !selectedCityName.startsWith("Loading") && !selectedCityName.startsWith("City ") && !selectedCityName.startsWith("Cannot match") && !selectedCityName.startsWith("No location assigned") && selectedCityName !== "Select a city" && (
                    <p className="text-xs text-gray-500 mt-1">Selected: {selectedCityName}</p>
                 )}
                 {(!hotelDetails.locationId || selectedCityName.startsWith("City ") || selectedCityName.startsWith("Cannot match") || selectedCityName.startsWith("No location assigned") || (selectedCityName === "Select a city" && !hotelDetails.locationId) ) && !loadingLocations && !loadingHotelDetail && (
                    <p className="text-xs text-yellow-600 mt-1">
                        {selectedCityName === "Select a city" && !hotelDetails.locationId ? "Please select a city." : selectedCityName}
                    </p>
                 )}
              </div>

              {/* Address */}
              <div className="text-left w-64 md:w-96">
                <label htmlFor="address" className="block text-sm font-semibold text-gray-700">
                  <span className="text-red-700 mr-1">*</span>Address
                </label>
                <textarea
                  id="address" name="address"
                  value={hotelDetails.address} onChange={handleInputChange}
                  className="w-full bg-gray-100 focus:outline-none p-2 rounded-lg border border-gray-300"
                  rows="2" required disabled={loadingHotelDetail}
                />
              </div>

              {/* Contact */}
              <div className="text-left w-64 md:w-96">
                <label htmlFor="contact" className="block text-sm font-semibold text-gray-700">
                    <span className="text-red-700 mr-1">*</span>Contact
                </label>
                <input
                    id="contact" type="text" name="contact"
                    value={hotelDetails.contact} onChange={handleInputChange}
                    placeholder="0853xxxxxxxx"
                    className="w-full bg-gray-100 focus:outline-none p-2 rounded-lg border border-gray-300"
                    required disabled={loadingHotelDetail}
                />
                <p className="text-xs text-gray-500 mt-1">Exp: 0853xxxxxxxx</p>
              </div>

              {/* Multiple Images Management */}
              <div className="text-left w-64 md:w-96">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-red-700 mr-1">*</span>Hotel Images
                </label>

                <div className="mb-2">
                  <div className="flex justify-between items-center mb-1">
                     <p className="text-sm text-gray-600">Add New Images ({newImageFiles.length}):</p>
                    {newImageFiles.length > 0 && (
                      <button type="button" onClick={handleClearNewImages} className="text-xs text-red-600 hover:text-red-800 underline" disabled={loadingHotelDetail}> Clear New </button>
                    )}
                  </div>
                  <input
                    id="newHotelImages" type="file"
                    multiple accept="image/*"
                    onChange={handleNewImagesChange}
                    className="w-full bg-gray-100 p-2 rounded border"
                    disabled={loadingHotelDetail || totalImages >= MAX_IMAGES}
                  />
                   <p className="text-xs text-gray-500 mt-1">Max {MAX_IMAGES} total images, 5MB each. ({totalImages}/{MAX_IMAGES} selected)</p>
                </div>

                {newImageFiles.length > 0 && (
                  <div className="mb-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {newImageFiles.map((file, index) => (
                        <div key={`new-${index}`} className="relative group border rounded">
                          <img src={URL.createObjectURL(file)} alt={`New ${index + 1}`} className="w-full h-24 object-cover rounded-t"/>
                           <p className="text-xs text-gray-500 p-1 truncate" title={file.name}>{file.name}</p>
                          <button
                            type="button"
                            onClick={() => handleRemoveNewImage(index)}
                            className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-70 group-hover:opacity-100 transition-opacity"
                            title="Remove new image"
                            disabled={loadingHotelDetail}
                          > × </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {totalImages >= MAX_IMAGES && (
                  <p className="text-xs text-orange-600 mt-1">Maximum number of images reached.</p>
                )}
                {totalImages === 0 && !loadingHotelDetail && (
                     <p className="text-xs text-red-600 mt-1">Please add at least one image for the hotel.</p>
                )}
              </div>

                              {hotelDetails.currentImages.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Current Images ({hotelDetails.currentImages.length}):</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {hotelDetails.currentImages.map((image) => (
                        <div key={image.id} className="relative group border rounded">
                          <img src={image.url} alt={image.name || 'Existing image'} className="w-full h-24 object-cover rounded-t"/>
                          <p className="text-xs text-gray-500 p-1 truncate" title={image.name}>{image.name || 'Existing'}</p>
                          <button
                            type="button"
                            onClick={() => handleRemoveExistingImage(image.id)}
                            className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-70 group-hover:opacity-100 transition-opacity"
                            title="Remove existing image"
                            disabled={loadingHotelDetail}
                          > × </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              <div className="flex flex-row justify-center gap-6 text-white font-bold mt-12 mb-10">
                <Button type="button" text="Reset" bgColor="bg-yellow1" onClick={handleReset} disabled={loadingUpdateHotel || loadingHotelDetail}/>
                <Button type="submit" text={loadingUpdateHotel ? "Updating..." : "Update Hotel"} bgColor="bg-blue1" disabled={loadingUpdateHotel || loadingHotelDetail || loadingLocations || totalImages === 0 || totalImages > MAX_IMAGES} />
              </div>
            </div>
          </div>
        </form>

        {/* Success Popup Modal */}
        {showSuccessPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center transform transition-all sm:max-w-xs sm:w-full">
              <div className="mb-4">
                {/* Ensure Remix Icon is available or replace with another icon solution e.g. FontAwesome */}
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

      </div>
    </div>
  );
};

export default EditHotel;
