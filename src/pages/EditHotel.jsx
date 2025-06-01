// import React, { useState, useEffect } from "react";
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
// import { updateHotel } from "../redux/actions/mitraAction"; // Adjust path as needed
// import Button from "../components/Button"; // Assuming Button component exists

// const EditHotel = ({ isSidebarOpen }) => {
//   const { hotelId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { hotelList, loadingUpdateHotel, errorUpdateHotel, updatedHotelData } = useSelector(
//     (state) => state.mitra
//   );

//   const [hotelDetails, setHotelDetails] = useState({
//     id: '',
//     name: '',
//     description: '',
//     city: '',
//     locationId: '',
//     address: '',
//     contact: '',
//     currentImageUrl: ''
//   });
//   const [imageFile, setImageFile] = useState(null);
//   const [initialLocationId, setInitialLocationId] = useState('');

//   useEffect(() => {
//     if (hotelList && hotelList.length > 0) {
//       const selectedHotel = hotelList.find((hotel) => hotel.id === hotelId);
//       if (selectedHotel) {
//         setHotelDetails({
//           id: selectedHotel.id,
//           name: selectedHotel.name || '',
//           description: selectedHotel.description || '',
//           city: selectedHotel.location?.city || selectedHotel.city || '', //
//           locationId: selectedHotel.locationId || selectedHotel.location?.id || '', //
//           address: selectedHotel.address || '',
//           contact: selectedHotel.contact || '', //
//           currentImageUrl: selectedHotel.imageUrl || selectedHotel.image || '' //
//         });
//         setInitialLocationId(selectedHotel.locationId || selectedHotel.location?.id || '');
//       } else {
//         console.error("Hotel not found in Redux store with ID:", hotelId);
//       }
//     }
//   }, [hotelId, hotelList]);

//   const handleInputChange = (e) => {
//     const { name, value, type, files } = e.target;
//     if (type === "file" && name === "image") {
//       setImageFile(files[0]); //
//     } else {
//       setHotelDetails((prev) => ({ ...prev, [name]: value })); //
//     }
//   };

//   const handleReset = () => {
//     if (hotelList && hotelList.length > 0) {
//       const selectedHotel = hotelList.find((hotel) => hotel.id === hotelId);
//       if (selectedHotel) {
//         setHotelDetails({
//           id: selectedHotel.id,
//           name: selectedHotel.name || '',
//           description: selectedHotel.description || '',
//           city: selectedHotel.location?.city || selectedHotel.city || '',
//           locationId: selectedHotel.locationId || selectedHotel.location?.id || '',
//           address: selectedHotel.address || '',
//           contact: selectedHotel.contact || '',
//           currentImageUrl: selectedHotel.imageUrl || selectedHotel.image || ''
//         });
//         setInitialLocationId(selectedHotel.locationId || selectedHotel.location?.id || '');
//       }
//     }
//     setImageFile(null); //
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('hotelId', hotelDetails.id);
//     formData.append('name', hotelDetails.name);
//     formData.append('description', hotelDetails.description);
//     formData.append('address', hotelDetails.address);
//     formData.append('contact', hotelDetails.contact);

//     if (hotelDetails.locationId) {
//         formData.append('locationId', hotelDetails.locationId);
//     } else if (initialLocationId) {
//         formData.append('locationId', initialLocationId);
//     }

//     if (imageFile) {
//       formData.append('files', imageFile);
//     }

//     dispatch(updateHotel(formData));
//   };

//   useEffect(() => {
//     if (updatedHotelData && !loadingUpdateHotel && !errorUpdateHotel) {
//       alert("Hotel updated successfully!"); //
//       navigate("/manajemen-hotel");
//     }
//   }, [updatedHotelData, loadingUpdateHotel, errorUpdateHotel, navigate, dispatch]);


//   return (
//     <div className="flex transition-all duration-300">
//       <div className={`bg-ungu10 pt-20 h-full min-h-screen transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}> {/* */}
//         <div className="grid grid-cols-2 px-4"> {/* */}
//           <div className="flex flex-col md:flex-row text-left md:gap-1"> {/* */}
//             <p className="text-xl">Hotel Management</p> {/* */}
//             <p className="text-xs pt-2 text-gray-600">Edit Hotel</p> {/* */}
//           </div>
//           <div className="flex flex-row justify-end"> {/* */}
//             <Link to="/manajemen-hotel" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0"> {/* */}
//               <i className="fa-solid fa-house-chimney text-xs"></i> {/* */}
//               <p className="text-xs md:text-sm">Home</p> {/* */}
//             </Link>
//             <Link to={`/edit-hotel/${hotelDetails.id}`} className="flex items-center gap-1 text-black pt-9 md:pt-0 ml-1"> {/* */}
//               <p>/</p> {/* */}
//               <p className="text-xs md:text-sm">Edit Hotel</p> {/* */}
//             </Link>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="bg-white m-4 py-4 rounded-lg shadow-md"> {/* */}
//           <div className="flex-col px-4 items-center"> {/* */}
//             <div className="text-left md:text-xl mb-6 md:mb-12"> {/* */}
//               <p>Edit Hotel: {hotelDetails.name || 'Loading...'}</p> {/* */}
//             </div>

//             {errorUpdateHotel && (
//               <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
//                 Error: {errorUpdateHotel}
//               </div>
//             )}

//             <div className="flex flex-col gap-4 items-center"> {/* */}

//               {/* Name */}
//               <div className="text-left w-64 md:w-96"> {/* */}
//                 <label htmlFor="name" className="block text-sm font-semibold text-gray-700"> {/* */}
//                   <span className="text-red-700 mr-1">*</span>Name {/* */}
//                 </label>
//                 <div className="flex w-full items-center border rounded-lg p-2 bg-gray-100"> {/* */}
//                   <i className="ri-pencil-fill text-gray-500 mr-2"></i> {/* */}
//                   <input
//                     id="name"
//                     type="text"
//                     name="name"
//                     value={hotelDetails.name}
//                     onChange={handleInputChange}
//                     placeholder="Hotel name"
//                     className="w-full bg-transparent focus:outline-none" //
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Description */}
//               <div className="text-left w-64 md:w-96"> {/* */}
//                 <label htmlFor="description" className="block text-sm font-semibold text-gray-700"> {/* */}
//                   <span className="text-red-700 mr-1">*</span>Description {/* */}
//                 </label>
//                 <textarea
//                   id="description"
//                   name="description"
//                   value={hotelDetails.description}
//                   onChange={handleInputChange}
//                   placeholder="Hotel description"
//                   className="w-full bg-transparent focus:outline-none p-2 rounded-lg border border-gray-300" //
//                   rows="4" //
//                   required
//                 />
//               </div>

//               {/* City - This is for display. Ensure locationId is handled for submission. */}
//               <div className="text-left w-64 md:w-96"> {/* */}
//                 <label htmlFor="city" className="block text-sm font-semibold text-gray-700"> {/* */}
//                   <span className="text-red-700 mr-1">*</span>City (Display) {/* */}
//                 </label>
//                 <select
//                   id="city"
//                   name="city"
//                   value={hotelDetails.city}
//                   onChange={handleInputChange}
//                   className="w-full bg-gray-100 border rounded p-2" //
//                   required
//                 >
//                   <option value="">Select a city</option> {/* */}
//                   <option value="Balikpapan">Balikpapan</option> {/* */}
//                   <option value="Jakarta">Jakarta</option> {/* */}
//                   <option value="Surabaya">Surabaya</option> {/* */}
//                   <option value="Semarang">Semarang</option> {/* */}
//                   <option value="Bandung">Bandung</option> {/* */}
//                 </select>
//                 {hotelDetails.locationId && <p className="text-xs text-gray-500 mt-1">Location ID: {hotelDetails.locationId}</p>}
//               </div>


//               {/* Address */}
//               <div className="text-left w-64 md:w-96"> {/* */}
//                 <label htmlFor="address" className="block text-sm font-semibold text-gray-700"> {/* */}
//                   <span className="text-red-700 mr-1">*</span>Address {/* */}
//                 </label>
//                 <textarea
//                   id="address"
//                   name="address"
//                   value={hotelDetails.address}
//                   onChange={handleInputChange}
//                   className="w-full bg-transparent focus:outline-none p-2 rounded-lg border border-gray-300" //
//                   rows="2" //
//                   required
//                 />
//               </div>

//               {/* Contact */}
//               <div className="text-left w-64 md:w-96"> {/* */}
//                 <label htmlFor="contact" className="block text-sm font-semibold text-gray-700"> {/* */}
//                     <span className="text-red-700 mr-1">*</span>Contact {/* */}
//                 </label>
//                 <input
//                     id="contact"
//                     type="text"
//                     name="contact"
//                     value={hotelDetails.contact}
//                     onChange={handleInputChange}
//                     placeholder="0853xxxxxxxx" //
//                     className="w-full bg-transparent focus:outline-none p-2 rounded-lg border border-gray-300" //
//                     required
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Exp: 0853xxxxxxxx</p> {/* */}
//               </div>

//               {/* Image */}
//               <div className="text-left w-64 md:w-96"> {/* */}
//                 <label htmlFor="image" className="block text-sm font-semibold text-gray-700"> {/* */}
//                   Hotel Image
//                 </label>
//                 <input
//                   id="image"
//                   type="file"
//                   name="image" //
//                   accept="image/*"
//                   onChange={handleInputChange} //
//                   className="w-full bg-gray-100 p-2 rounded border" //
//                 />
//                 {hotelDetails.currentImageUrl && !imageFile && (
//                   <div className="mt-2">
//                     <p className="text-sm text-gray-600">Current Image:</p>
//                     <img src={hotelDetails.currentImageUrl} alt="Current hotel" className="max-w-xs max-h-32 mt-1 border"/>
//                   </div>
//                 )}
//                 {imageFile && (
//                   <p className="text-sm mt-1 text-gray-600">New File Selected: {imageFile.name}</p> //
//                 )}
//               </div>

//               {/* Buttons */}
//               <div className="flex flex-row justify-center gap-6 text-white font-bold mt-12 mb-10"> {/* */}
//                 <Button type="button" text="Reset" bgColor="bg-yellow1" onClick={handleReset} /> {/* */}
//                 <Button type="submit" text={loadingUpdateHotel ? "Updating..." : "Submit"} bgColor="bg-blue1" disabled={loadingUpdateHotel} /> {/* */}
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
import { updateHotel, fetchLocations, fetchHotels } from "../redux/actions/mitraAction";
import Button from "../components/Button";

const EditHotel = ({ isSidebarOpen }) => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    hotelList,
    loadingUpdateHotel,
    errorUpdateHotel,
    updatedHotelData,
    locationList,
    loadingLocations,
    errorLocations,
    loadingHotels,
  } = useSelector((state) => state.mitra);

  const [hotelDetails, setHotelDetails] = useState({
    id: hotelId,
    name: '',
    description: '',
    locationId: '', // Akan diisi dengan ID lokasi yang cocok
    address: '',
    contact: '',
    currentImageUrl: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [selectedCityName, setSelectedCityName] = useState(''); // Untuk tampilan di dropdown

  useEffect(() => {
    // Selalu fetch lokasi jika belum ada atau kosong, karena penting untuk pencocokan
    if (!locationList || locationList.length === 0) {
      dispatch(fetchLocations());
    }
    // Fetch hotel jika hotelList kosong (misalnya direct access ke halaman edit)
    if (!hotelList || hotelList.length === 0) {
        dispatch(fetchHotels());
    }
  }, [dispatch, locationList, hotelList]);

  useEffect(() => {
    // Proses pengisian form HANYA jika hotelList sudah ada isinya.
    // locationList akan dicek kemudian di dalam untuk pencocokan nama kota.
    if (hotelList && hotelList.length > 0) {
      const currentHotel = hotelList.find((hotel) => hotel.id === hotelId);
      if (currentHotel) {
        // console.log("EDIT HOTEL - Current Hotel Data from hotelList:", JSON.stringify(currentHotel, null, 2)); // Untuk debug

        const hotelOriginalCityName = currentHotel.location?.city; // Nama kota dari data hotel
        let derivedLocationId = ''; // ID lokasi yang akan dicari
        let cityDisplayNameForDropdown = 'Select a city'; // Teks default untuk dropdown

        if (hotelOriginalCityName) {
            // Hanya lakukan pencocokan jika locationList sudah siap
            if (locationList && locationList.length > 0) {
                const matchedLocation = locationList.find(
                    (loc) => loc.city.toLowerCase() === hotelOriginalCityName.toLowerCase()
                );
                if (matchedLocation) {
                    derivedLocationId = matchedLocation.id;
                    cityDisplayNameForDropdown = matchedLocation.city; // Gunakan nama kota dari locationList untuk konsistensi
                    // console.log("EDIT HOTEL - Matched Location:", matchedLocation); // Untuk debug
                } else {
                    cityDisplayNameForDropdown = `City '${hotelOriginalCityName}' not in locations`;
                    console.warn(`EDIT HOTEL - City '${hotelOriginalCityName}' (from hotel data) was not found in your locationList. LocationID will be empty.`);
                }
            } else if (loadingLocations) {
                // locationList sedang dimuat, tunggu dan useEffect akan berjalan lagi
                cityDisplayNameForDropdown = `Loading locations to find '${hotelOriginalCityName}'...`;
            } else {
                // locationList kosong dan tidak sedang loading (mungkin error fetchLocations)
                cityDisplayNameForDropdown = `Cannot match '${hotelOriginalCityName}', location list empty.`;
                console.warn(`EDIT HOTEL - Cannot match city, locationList is empty and not loading.`);
            }
        } else {
          cityDisplayNameForDropdown = 'No location assigned to hotel';
          console.warn("EDIT HOTEL - No city name (currentHotel.location.city) found in current hotel data.");
        }

        setHotelDetails({
          id: currentHotel.id,
          name: currentHotel.name || '',
          description: currentHotel.description || '',
          locationId: derivedLocationId, // Gunakan ID lokasi yang berhasil dicocokkan/ditemukan
          address: currentHotel.address || '',
          contact: currentHotel.contact || '',
          currentImageUrl: currentHotel.imageUrl || currentHotel.image || (currentHotel.images && currentHotel.images.length > 0 ? currentHotel.images[0].imageUrl : '')
        });
        setSelectedCityName(cityDisplayNameForDropdown); // Ini untuk teks yang tampil di opsi default dropdown

      } else {
        console.error("Hotel not found in Redux store with ID:", hotelId);
        setSelectedCityName('Hotel data not found');
        setHotelDetails(prev => ({ ...prev, locationId: '' }));
      }
    }
  }, [hotelId, hotelList, locationList, loadingLocations]); // Tambahkan loadingLocations sebagai dependency

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
    setSelectedCityName(selectedLocationObject ? selectedLocationObject.city : '');
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setHotelDetails(prev => ({ ...prev, currentImageUrl: '' }));
    } else {
      setImageFile(null);
    }
  };

  const handleReset = () => {
    // Logika reset akan memuat ulang dari hotelList, jadi seharusnya sudah benar
    if (hotelList && hotelList.length > 0) {
      const currentHotel = hotelList.find((hotel) => hotel.id === hotelId);
      if (currentHotel) {
        const hotelOriginalCityName = currentHotel.location?.city;
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
            cityDisplayNameForDropdown = `Loading locations to find '${hotelOriginalCityName}'...`;
        } else {
            cityDisplayNameForDropdown = 'No location assigned to hotel';
        }

        setHotelDetails({
          id: currentHotel.id,
          name: currentHotel.name || '',
          description: currentHotel.description || '',
          locationId: derivedLocationId,
          address: currentHotel.address || '',
          contact: currentHotel.contact || '',
          currentImageUrl: currentHotel.imageUrl || currentHotel.image || (currentHotel.images && currentHotel.images.length > 0 ? currentHotel.images[0].imageUrl : '')
        });
        setSelectedCityName(cityDisplayNameForDropdown);
      }
    }
    setImageFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hotelDetails.locationId) { // Validasi utama sekarang pada locationId
        alert("Please select a valid city from the list, or ensure the hotel's city can be matched to a location ID.");
        return;
    }

    const formData = new FormData();
    formData.append('hotelId', hotelDetails.id);
    formData.append('name', hotelDetails.name);
    formData.append('description', hotelDetails.description);
    formData.append('address', hotelDetails.address);
    formData.append('contact', hotelDetails.contact);
    formData.append('locationId', hotelDetails.locationId);

    if (imageFile) {
      formData.append('files', imageFile);
    }
    dispatch(updateHotel(formData));
  };

  useEffect(() => {
    if (updatedHotelData && !loadingUpdateHotel && !errorUpdateHotel) {
      if (updatedHotelData.id === hotelId) {
        alert("Hotel updated successfully!");
        navigate("/manajemen-hotel");
      }
    }
  }, [updatedHotelData, loadingUpdateHotel, errorUpdateHotel, navigate, dispatch, hotelId]);

  if ((!hotelList || hotelList.length === 0) && loadingHotels) {
      return <div className="p-4 text-center">Loading hotel data...</div>;
  }
  // Tidak perlu loading state khusus untuk locationList di sini karena form bisa ditampilkan sebagian
  // dan dropdown akan terisi/memperbarui teksnya saat locationList siap.

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
              <p>Edit Hotel: {hotelDetails.name || 'Loading...'}</p>
            </div>

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
                  id="name"
                  type="text"
                  name="name"
                  value={hotelDetails.name}
                  onChange={handleInputChange}
                  placeholder="Hotel name"
                  className="w-full bg-gray-100 border rounded-lg p-2 focus:outline-none"
                  required
                />
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
                  className="w-full bg-gray-100 focus:outline-none p-2 rounded-lg border border-gray-300"
                  rows="4"
                  required
                />
              </div>

             {/* City Dropdown (Location) */}
              <div className="text-left w-64 md:w-96">
                <label htmlFor="locationId" className="block text-sm font-semibold text-gray-700">
                  <span className="text-red-700 mr-1">*</span>City
                </label>
                <select
                  id="locationId"
                  name="locationId" // Nama input harus locationId untuk handleLocationChange yang benar
                  value={hotelDetails.locationId} // Value select diikat ke ID lokasi
                  onChange={handleLocationChange}
                  className="w-full bg-gray-100 border rounded p-2"
                  required
                  disabled={loadingLocations}
                >
                  {/* Teks opsi default disesuaikan dengan selectedCityName */}
                  <option value="">
                    {loadingLocations ? "Loading cities..." : (selectedCityName || "Select a city")}
                  </option>
                  {locationList && locationList.length > 0 && locationList.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.city}
                    </option>
                  ))}
                </select>
                 {/* Menampilkan nama kota dan ID yang terpilih untuk konfirmasi */}
                 {hotelDetails.locationId && selectedCityName && !selectedCityName.startsWith("Loading") && !selectedCityName.startsWith("City ") && !selectedCityName.startsWith("Cannot match") && !selectedCityName.startsWith("No location assigned") && (
                    <p className="text-xs text-gray-500 mt-1">Selected: {selectedCityName}</p>
                 )}
                 {/* Pesan jika pencocokan gagal atau data tidak ada */}
                 {(!hotelDetails.locationId || selectedCityName.startsWith("City ") || selectedCityName.startsWith("Cannot match") || selectedCityName.startsWith("No location assigned")) && !loadingLocations && (
                    <p className="text-xs text-yellow-600 mt-1">{selectedCityName}</p>
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
                  className="w-full bg-gray-100 focus:outline-none p-2 rounded-lg border border-gray-300"
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
                    className="w-full bg-gray-100 focus:outline-none p-2 rounded-lg border border-gray-300"
                    required
                />
                <p className="text-xs text-gray-500 mt-1">Exp: 0853xxxxxxxx</p>
              </div>

              {/* Image Upload */}
              <div className="text-left w-64 md:w-96">
                <label htmlFor="image" className="block text-sm font-semibold text-gray-700">
                  Hotel Image (Optional: Upload to change)
                </label>
                <input
                  id="image"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full bg-gray-100 p-2 rounded border"
                />
                {hotelDetails.currentImageUrl && !imageFile && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Current Image:</p>
                    <img src={hotelDetails.currentImageUrl} alt="Current hotel" className="max-w-xs max-h-32 mt-1 border rounded"/>
                  </div>
                )}
                {imageFile && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">New Image Preview:</p>
                    <img src={URL.createObjectURL(imageFile)} alt="New preview" className="max-w-xs max-h-32 mt-1 border rounded"/>
                    <p className="text-xs text-gray-500 mt-1">{imageFile.name}</p>
                  </div>
                )}
                 <p className="text-xs text-gray-500 mt-1">Maximum file size is 5 MB</p>
              </div>

              {/* Buttons */}
              <div className="flex flex-row justify-center gap-6 text-white font-bold mt-12 mb-10">
                <Button type="button" text="Reset" bgColor="bg-yellow1" onClick={handleReset} disabled={loadingUpdateHotel}/>
                <Button type="submit" text={loadingUpdateHotel ? "Updating..." : "Update Hotel"} bgColor="bg-blue1" disabled={loadingUpdateHotel || loadingLocations} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHotel;