// EditHotel.jsx
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { updateHotel, fetchLocations, fetchHotelById, deleteHotelImage } from "../redux/actions/mitraAction";
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
    hotelDetail, // Ini state yang kita pantau
    loadingHotelDetail,
    errorHotelDetail,
    loadingDeleteHotelImage,
    errorDeleteHotelImage,
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

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    console.log("[EditHotel] Component mounted/hotelId changed. hotelId:", hotelId);
    if (hotelId) {
      dispatch(fetchHotelById(hotelId));
    }
    if (!locationList || locationList.length === 0) {
      console.log("[EditHotel] Fetching locations as list is empty.");
      dispatch(fetchLocations());
    }
  }, [dispatch, hotelId]); // Hanya hotelId dan dispatch, locationList akan dihandle oleh effect selanjutnya

  useEffect(() => {
    console.log("[EditHotel] useEffect for hotelDetail processing triggered. Dependencies changed.");
    console.log("[EditHotel] Current states: ", {
        hotelIdFromParams: hotelId,
        hotelDetailFromStore: JSON.parse(JSON.stringify(hotelDetail)), // Log deep copy
        loadingHotelDetailFromStore: loadingHotelDetail,
        errorHotelDetailFromStore: errorHotelDetail,
        locationListLength: locationList ? locationList.length : 0,
        loadingLocationsFromStore: loadingLocations
    });

    if (hotelDetail && hotelDetail.id === hotelId) {
      console.log("[EditHotel] hotelDetail is VALID and matches hotelId. Populating form.", JSON.parse(JSON.stringify(hotelDetail)));
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
          }
        } else if (loadingLocations) {
          cityDisplayNameForDropdown = `Loading locations to find '${hotelOriginalCityName}'...`;
        } else {
          cityDisplayNameForDropdown = `Cannot match '${hotelOriginalCityName}', location list empty.`;
        }
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
      console.log("[EditHotel] Populated existingImages:", existingImages);

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

    } else if (!loadingHotelDetail && hotelId && !hotelDetail && !errorHotelDetail) {
      console.error(
          "[EditHotel] CONDITION MET: Hotel details not found for ID (or data mismatch):", hotelId,
          "Current hotelDetail from Redux (should be null/undefined here):", hotelDetail,
          "Current loadingHotelDetail:", loadingHotelDetail,
          "Current errorHotelDetail:", errorHotelDetail
      );
      setSelectedCityName('Hotel data not found');
      setHotelDetails(prev => ({
          ...prev,
          id: hotelId,
          name: 'Error: Hotel not found or data mismatch',
          description: '',
          locationId: '',
          address: '',
          contact: '',
          currentImages: []
      }));
    } else if (errorHotelDetail) {
      console.error("[EditHotel] CONDITION MET: Error fetching hotel details for ID:", hotelId, errorHotelDetail);
      setSelectedCityName('Error loading hotel data');
      setHotelDetails(prev => ({
          ...prev,
          id: hotelId,
          name: 'Error: Could not load hotel data',
          description: '',
          locationId: '',
          address: '',
          contact: '',
          currentImages: []
      }));
    } else if (loadingHotelDetail) {
        console.log("[EditHotel] Still loading hotel details...");
    } else {
        console.log("[EditHotel] hotelDetail might be present but ID mismatch, or other unhandled state. hotelDetail.id:", hotelDetail?.id, "hotelId (param):", hotelId);
    }
  }, [hotelId, hotelDetail, locationList, loadingLocations, loadingHotelDetail, errorHotelDetail, dispatch]); // Tambahkan dispatch jika digunakan di dalam effect (meskipun tidak secara langsung di sini, tapi baik untuk konsistensi)

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
    console.log("[EditHotel] handleRemoveExistingImage - Attempting to delete image with ID:", imageIdToRemove);
    console.log("[EditHotel] handleRemoveExistingImage - Current Hotel ID:", hotelId);

    if (!hotelId) {
      console.error("[EditHotel] handleRemoveExistingImage - Hotel ID is not available to delete image.");
      alert("Cannot delete image: Hotel ID is missing.");
      return;
    }
    if (hotelDetails.currentImages.length === 1 && newImageFiles.length === 0) {
      alert("You must have at least one image. Cannot delete the last remaining image.");
      return;
    }
    dispatch(deleteHotelImage(imageIdToRemove, hotelId));
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
    console.log("[EditHotel] Resetting form by re-fetching hotel data for ID:", hotelId);
    if (hotelId) {
        dispatch(fetchHotelById(hotelId)); // Ini akan memicu update hotelDetail dan useEffect akan jalan lagi
    }
    setNewImageFiles([]); // Hapus gambar baru yang belum di-submit
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
                                .filter(id => id && !id.toString().startsWith('existing-'));
    formData.append('keepImageIds', JSON.stringify(backendImageIdsToKeep));

    newImageFiles.forEach((file) => {
      formData.append('files', file);
    });
    console.log("[EditHotel] Submitting form data:", Object.fromEntries(formData)); // Log data form sebelum dikirim
    dispatch(updateHotel(formData));
  };

  const openSuccessPopup = (message) => {
    setSuccessMessage(message);
    setShowSuccessPopup(true);
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
    setSuccessMessage('');
    navigate("/manajemen-hotel");
  };

  useEffect(() => {
    if (updatedHotelData && !loadingUpdateHotel && !errorUpdateHotel) {
      if (updatedHotelData.id === hotelId) {
        console.log("[EditHotel] Hotel update successful, showing popup.");
        openSuccessPopup("Hotel updated successfully!");
      }
    }
  }, [updatedHotelData, loadingUpdateHotel, errorUpdateHotel, hotelId, navigate]);


  const totalImages = hotelDetails.currentImages.length + newImageFiles.length;

  // --- Tampilan Loading Awal ---
  if (loadingHotelDetail && !hotelDetail && !errorHotelDetail) { // Lebih spesifik: loading, belum ada detail, dan belum ada error
      console.log("[EditHotel] Showing main loading screen for hotel data...");
      return (
        <div className={`flex transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
            <div className="bg-ungu10 pt-20 h-full min-h-screen w-full flex justify-center items-center">
                <p className="text-xl">Loading hotel data...</p>
            </div>
        </div>
      );
  }
  // --- Akhir Tampilan Loading Awal ---

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
              <p>Edit Hotel: {hotelDetails.name || (loadingHotelDetail ? 'Loading name...' : (errorHotelDetail || (!hotelDetail && !loadingHotelDetail) ? 'Hotel Not Found / Error Loading' : ''))}</p>
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
            {errorDeleteHotelImage && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center">
                Error deleting image: {typeof errorDeleteHotelImage === 'string' ? errorDeleteHotelImage : JSON.stringify(errorDeleteHotelImage)}
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
                  required disabled={loadingHotelDetail || !!errorHotelDetail || (!hotelDetail && !loadingHotelDetail)}
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
                  rows="4" required disabled={loadingHotelDetail || !!errorHotelDetail || (!hotelDetail && !loadingHotelDetail)}
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
                  required disabled={loadingLocations || loadingHotelDetail || !!errorHotelDetail || (!hotelDetail && !loadingHotelDetail) || (!locationList && !loadingLocations) || (locationList && locationList.length === 0 && !loadingLocations) }
                >
                  <option value="">
                    {loadingLocations ? "Loading cities..." : (!locationList || locationList.length === 0 ? "No locations available" : (selectedCityName && selectedCityName !== "Select a city" ? selectedCityName : "Select a city"))}
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
                  rows="2" required disabled={loadingHotelDetail || !!errorHotelDetail || (!hotelDetail && !loadingHotelDetail)}
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
                    required disabled={loadingHotelDetail || !!errorHotelDetail || (!hotelDetail && !loadingHotelDetail)}
                />
                <p className="text-xs text-gray-500 mt-1">Exp: 0853xxxxxxxx</p>
              </div>

              {/* Multiple Images Management */}
              <div className="text-left w-64 md:w-96">
                <label htmlFor="newHotelImages" className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-red-700 mr-1">*</span>Hotel Images
                </label>

                <div className="mb-2">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm text-gray-600">Add New Images ({newImageFiles.length}):</p>
                      {newImageFiles.length > 0 && (
                        <button type="button" onClick={handleClearNewImages} className="text-xs text-red-600 hover:text-red-800 underline" disabled={loadingHotelDetail || loadingDeleteHotelImage || !!errorHotelDetail || (!hotelDetail && !loadingHotelDetail)}> Clear New </button>
                      )}
                    </div>
                    <input
                      id="newHotelImages" type="file"
                      multiple accept="image/*"
                      onChange={handleNewImagesChange}
                      className="w-full bg-gray-100 p-2 rounded border"
                      disabled={loadingHotelDetail || loadingDeleteHotelImage || !!errorHotelDetail || (!hotelDetail && !loadingHotelDetail) || totalImages >= MAX_IMAGES}
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
                            disabled={loadingHotelDetail || loadingDeleteHotelImage || !!errorHotelDetail || (!hotelDetail && !loadingHotelDetail)}
                          > × </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                 {totalImages >= MAX_IMAGES && !loadingHotelDetail && !errorHotelDetail && hotelDetail &&(
                    <p className="text-xs text-orange-600 mt-1">Maximum number of images reached.</p>
                )}
                {totalImages === 0 && !loadingHotelDetail && !errorHotelDetail && hotelDetail && (
                        <p className="text-xs text-red-600 mt-1">Please add at least one image for the hotel.</p>
                )}
              </div>

                {hotelDetails.currentImages.length > 0 && (
                  <div className="text-left w-64 md:w-96">
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
                              disabled={loadingHotelDetail || loadingDeleteHotelImage || !!errorHotelDetail || (!hotelDetail && !loadingHotelDetail) || (image.id && image.id.toString().startsWith('existing-'))}
                            > × </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}


              <div className="flex flex-row justify-center gap-6 text-white font-bold mt-12 mb-10">
                <Button type="button" text="Reset" bgColor="bg-yellow1" onClick={handleReset} disabled={loadingUpdateHotel || loadingHotelDetail || loadingDeleteHotelImage}/>
                <Button type="submit" text={loadingUpdateHotel ? "Updating..." : "Update Hotel"} bgColor="bg-blue1" disabled={loadingUpdateHotel || loadingHotelDetail || loadingLocations || loadingDeleteHotelImage || !!errorHotelDetail || (!hotelDetail && !loadingHotelDetail) || totalImages === 0 || totalImages > MAX_IMAGES} />
              </div>
            </div>
          </div>
        </form>

        {showSuccessPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center transform transition-all sm:max-w-xs sm:w-full">
              <div className="mb-4">
                <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
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