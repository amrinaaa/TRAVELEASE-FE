// import React, { useState } from "react";
// import { Link } from 'react-router-dom';
// import Button from "../components/Button";
// import dataHotel from "../utils/dataHotel.json";

// const TambahHotel = ({ isSidebarOpen }) => {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [city, setCity] = useState('');
//   const [address, setAddress] = useState('');
//   const [contact, setContact] = useState('');
//   const [image, setImage] = useState(null);
//   const [hotels, setHotels] = useState(dataHotel);

//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image") {
//       setImage(files[0]);
//     } else if (name === "name") {
//       setName(value);
//     } else if (name === "description") {
//       setDescription(value);
//     } else if (name === "city") {
//       setCity(value);
//     } else if (name === "address") {
//       setAddress(value);
//     } else if (name === "contact") {
//       setContact(value);
//     }
//   };

//   const handleReset = () => {
//     setName('');
//     setDescription('');
//     setCity('');
//     setAddress('');
//     setContact('');
//     setImage(null);
//   };

//   const handleSubmit = () => {
//     if (!name || !description || !city || !address || !image) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     const newHotel = {
//       id: `HT${(hotels.length + 1).toString().padStart(3, '0')}`,
//       name,
//       description,
//       city,
//       address,
//       contact,
//       image: image?.name || ''
//     };

//     setHotels([...hotels, newHotel]);
//     handleReset();
//     alert("Hotel added successfully!");
//   };

//   return (
//     <div className="flex transition-all duration-300">
//       <div className={`bg-ungu10 pt-20 h-full transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
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
//             <Link to="/tambah-hotel" className="flex items-center gap-1 text-black pt-9 md:pt-0 ml-1">
//               <p>/</p>
//               <p className="text-xs md:text-sm">Add Hotel</p>
//             </Link>
//           </div>
//         </div>

//         <div className="bg-white m-4 py-4 rounded-lg shadow-md">
//           <div className="flex-col px-4 items-center">
//             <div className="text-left md:text-xl mb-6 md:mb-12">
//               <p>Add New Hotel</p>
//             </div>
//             <div className="flex flex-col gap-4 items-center">
//               {/* Name */}
//               <div className="text-left w-64 md:w-96">
//                 <label className="block text-sm font-semibold text-gray-700">
//                   <span className="text-red-700 mr-1">*</span>Name
//                 </label>
//                 <div className="flex w-full items-center border rounded-lg p-2 bg-gray-100">
//                   <i className="ri-pencil-fill text-gray-500 mr-2"></i>
//                   <input
//                     type="text"
//                     name="name"
//                     value={name}
//                     onChange={handleInputChange}
//                     placeholder="Hotel name"
//                     className="w-full bg-transparent focus:outline-none"
//                   />
//                 </div>
//               </div>

//               {/* Description */}
//               <div className="text-left w-64 md:w-96">
//                 <label className="block text-sm font-semibold text-gray-700">
//                   <span className="text-red-700 mr-1">*</span>Description
//                 </label>
//                 <textarea
//                   name="description"
//                   value={description}
//                   onChange={handleInputChange}
//                   placeholder="Hotel description"
//                   className="w-full bg-transparent focus:outline-none p-2 rounded-lg border border-gray-300"
//                   rows="4"
//                 />
//               </div>

//               {/* City */}
//               <div className="text-left w-64 md:w-96">
//                 <label className="block text-sm font-semibold text-gray-700">
//                   <span className="text-red-700 mr-1">*</span>City
//                 </label>
//                 <select
//                   name="city"
//                   value={city}
//                   onChange={handleInputChange}
//                   className="w-full bg-gray-100 border rounded p-2"
                  
//                 >
//                   <option value="">Select a city</option>
//                   <option value="Balikpapan">Balikpapan</option>
//                   <option value="Jakarta">Jakarta</option>
//                   <option value="Surabaya">Surabaya</option>
//                   <option value="Semarang">Semarang</option>
//                   <option value="Bandung">Bandung</option>
//                 </select>
//               </div>

//               {/* Address */}
//               <div className="text-left w-64 md:w-96">
//                 <label className="block text-sm font-semibold text-gray-700">
//                   <span className="text-red-700 mr-1">*</span>Address
//                 </label>
//                 <textarea
//                   name="address"
//                   value={address}
//                   onChange={handleInputChange}
//                   className="w-full bg-transparent focus:outline-none p-2 rounded-lg border border-gray-300"
//                   rows="2"
//                 />
//               </div>

//               {/* Contact */}
//               <div className="text-left w-64 md:w-96">
//                 <label className="block text-sm font-semibold text-gray-700">
//                     <span className="text-red-700 mr-1">*</span>Contact
//                 </label>
//                 <input
//                     type="text"
//                     name="contact"
//                     value={contact}
//                     onChange={handleInputChange}
//                     placeholder="0853xxxxxxxx"
//                     className="w-full bg-transparent focus:outline-none p-2 rounded-lg border border-gray-300"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Exp: 0853xxxxxxxx</p>
//               </div>


//               {/* Image */}
//               <div className="text-left w-64 md:w-96">
//                 <label className="block text-sm font-semibold text-gray-700">
//                   <span className="text-red-700 mr-1">*</span>Hotel Image
//                 </label>
//                 <input
//                   type="file"
//                   name="image"
//                   onChange={handleInputChange}
//                   className="w-full bg-gray-100 p-2 rounded border"
//                 />
//               </div>

//               {/* Buttons */}
//               <div className="flex flex-row justify-center gap-6 text-white font-bold mt-12 mb-10">
//                 <Button text="Reset" bgColor="bg-yellow1" onClick={handleReset} />
//                 <Button text="Submit" bgColor="bg-blue1" onClick={handleSubmit} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TambahHotel

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button"; // Sesuaikan path jika perlu
import { createHotel } from "../redux/actions/mitraAction"; 
import { clearCreateHotelStatus } from "../redux/actions/mitraAction"; // Opsional, jika Anda membuat aksi ini

const TambahHotel = ({ isSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [hotelDetails, setHotelDetails] = useState({
    name: '',
    description: '',
    city: '', // Untuk dropdown
    locationId: '', // Penting untuk API POST
    address: '',
    contact: '',
  });
  const [imageFile, setImageFile] = useState(null); // Mengganti 'image' menjadi 'imageFile' agar lebih jelas

  const { loadingCreateHotel, errorCreateHotel, createdHotelData } = useSelector(
    (state) => state.mitra
  );

  // Contoh mapping sederhana city ke locationId (Anda HARUS menyesuaikan ini dengan ID lokasi Anda yang sebenarnya)
  // Ini hanya placeholder, idealnya data lokasi (city & locationId) diambil dari API atau konfigurasi
  const cityToLocationIdMap = {
    "Balikpapan": "cmacicrv20000up7ko6olp13s", // Ganti dengan ID lokasi Balikpapan yang valid
    "Jakarta": "jakarta_location_id_example",    // Ganti dengan ID lokasi Jakarta yang valid
    "Surabaya": "surabaya_location_id_example",   // Ganti dengan ID lokasi Surabaya yang valid
    "Semarang": "semarang_location_id_example",   // Ganti dengan ID lokasi Semarang yang valid
    "Bandung": "bandung_location_id_example",    // Ganti dengan ID lokasi Bandung yang valid
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newLocationId = hotelDetails.locationId;

    if (name === "city") {
      newLocationId = cityToLocationIdMap[value] || ''; // Set locationId berdasarkan kota yang dipilih
    }

    setHotelDetails((prev) => ({
      ...prev,
      [name]: value,
      locationId: name === "city" ? newLocationId : prev.locationId // Update locationId jika city berubah
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    } else {
      setImageFile(null);
    }
  };

  const handleReset = () => {
    setHotelDetails({
      name: '',
      description: '',
      city: '',
      locationId: '',
      address: '',
      contact: '',
    });
    setImageFile(null);
    // Jika ada error, Anda mungkin juga ingin membersihkannya dari state Redux
    // dispatch(clearCreateHotelErrorAction()); // Buat aksi ini jika perlu
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi dasar
    if (!hotelDetails.name || !hotelDetails.description || !hotelDetails.city || !hotelDetails.address || !hotelDetails.contact || !imageFile) {
      alert("Please fill in all required fields and select an image.");
      return;
    }
    if (!hotelDetails.locationId) {
      alert("Location ID is missing. Please select a city that has a corresponding Location ID or ensure it's set.");
      return;
    }

    const formData = new FormData();
    formData.append('name', hotelDetails.name);
    formData.append('description', hotelDetails.description);
    formData.append('locationId', hotelDetails.locationId); // Kirim locationId
    formData.append('address', hotelDetails.address);
    formData.append('contact', hotelDetails.contact);
    if (imageFile) {
      formData.append('files', imageFile); // API mengharapkan key 'files'
    }

    dispatch(createHotel(formData));
  };

  useEffect(() => {
    // Tangani setelah hotel berhasil dibuat
    if (createdHotelData && !loadingCreateHotel && !errorCreateHotel) {
      alert("Hotel added successfully!");
      handleReset(); // Reset form setelah sukses
      navigate("/manajemen-hotel"); // Navigasi ke daftar hotel
      // Opsional: dispatch aksi untuk membersihkan createdHotelData dari state Redux
      // dispatch(clearCreateHotelStatus());
    }
  }, [createdHotelData, loadingCreateHotel, errorCreateHotel, navigate, dispatch]);

  return (
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
                  value={hotelDetails.city}
                  onChange={handleInputChange}
                  className="w-full bg-gray-100 border rounded p-2"
                  required
                >
                  <option value="">Select a city</option>
                  <option value="Balikpapan">Balikpapan</option>
                  <option value="Jakarta">Jakarta</option>
                  <option value="Surabaya">Surabaya</option>
                  <option value="Semarang">Semarang</option>
                  <option value="Bandung">Bandung</option>
                </select>
                {/* Menampilkan locationId yang ter-generate (atau bisa disembunyikan) */}
                {hotelDetails.locationId && (
                    <p className="text-xs text-gray-500 mt-1">Selected Location ID: {hotelDetails.locationId}</p>
                )}
                 {!hotelDetails.locationId && hotelDetails.city && (
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


              {/* Image */}
              <div className="text-left w-64 md:w-96">
                <label htmlFor="imageFile" className="block text-sm font-semibold text-gray-700">
                  <span className="text-red-700 mr-1">*</span>Hotel Image
                </label>
                <input
                  id="imageFile"
                  type="file"
                  name="imageFile" // Tidak digunakan langsung di state hotelDetails, tapi oleh imageFile
                  onChange={handleImageChange}
                  className="w-full bg-gray-100 p-2 rounded border"
                  required
                />
                 {imageFile && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Image Preview:</p>
                    <img src={URL.createObjectURL(imageFile)} alt="Preview" className="max-w-xs max-h-32 mt-1 border rounded"/>
                    <p className="text-xs text-gray-500 mt-1">{imageFile.name}</p>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-row justify-center gap-6 text-white font-bold mt-12 mb-10">
                <Button type="button" text="Reset" bgColor="bg-yellow1" onClick={handleReset} disabled={loadingCreateHotel}/>
                <Button type="submit" text={loadingCreateHotel ? "Submitting..." : "Submit"} bgColor="bg-blue1" disabled={loadingCreateHotel} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahHotel;