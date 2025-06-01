import React, { useState, useEffect } from "react";
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
    city: '', // Ini akan menyimpan nama kota yang dipilih untuk tampilan
    locationId: '', // Ini akan menyimpan ID lokasi yang dipilih untuk dikirim ke API
    address: '',
    contact: '',
  });
  const [imageFile, setImageFile] = useState(null);

  const {
    loadingCreateHotel,
    errorCreateHotel,
    createdHotelData,
    locationList, // Ambil locationList dari state Redux
    loadingLocations, // Opsional: untuk menampilkan status loading dropdown
    errorLocations, // Opsional: untuk menampilkan error fetch lokasi
  } = useSelector((state) => state.mitra);

  // Fetch locations when the component mounts
  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "city") {
      // Value dari select option sekarang adalah locationId
      const selectedLocationId = value;
      const selectedLocationObject = locationList.find(loc => loc.id === selectedLocationId);
      const cityName = selectedLocationObject ? selectedLocationObject.city : '';

      setHotelDetails((prev) => ({
        ...prev,
        city: cityName, // Simpan nama kota untuk display di input/select
        locationId: selectedLocationId, // Simpan ID lokasi
      }));
    } else {
      setHotelDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
    // dispatch(clearCreateHotelStatus()); // Jika diimplementasikan
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hotelDetails.name || !hotelDetails.description || !hotelDetails.locationId || !hotelDetails.address || !hotelDetails.contact || !imageFile) {
      alert("Please fill in all required fields, select a city, and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append('name', hotelDetails.name);
    formData.append('description', hotelDetails.description);
    formData.append('locationId', hotelDetails.locationId); // Kirim locationId
    formData.append('address', hotelDetails.address);
    formData.append('contact', hotelDetails.contact);
    if (imageFile) {
      formData.append('files', imageFile);
    }

    dispatch(createHotel(formData));
  };

  useEffect(() => {
    if (createdHotelData && !loadingCreateHotel && !errorCreateHotel) {
      alert("Hotel added successfully!");
      handleReset();
      navigate("/manajemen-hotel");
      // dispatch(clearCreateHotelStatus()); // Jika diimplementasikan
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
                  name="city" // Tetap 'city' untuk handleInputChange, tapi value-nya adalah locationId
                  value={hotelDetails.locationId} // value dari select adalah locationId
                  onChange={handleInputChange}
                  className="w-full bg-gray-100 border rounded p-2"
                  required
                  disabled={loadingLocations} // Disable saat loading
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
                 {!hotelDetails.locationId && hotelDetails.city && !loadingLocations && ( // Tampilkan jika kota dipilih tapi tidak ada ID (seharusnya tidak terjadi jika mapping benar)
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
                  name="imageFile"
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
                <p className="text-xs text-gray-500 mt-1">Maximum file size is 5 MB</p>
              </div>

              {/* Buttons */}
              <div className="flex flex-row justify-center gap-6 text-white font-bold mt-12 mb-10">
                <Button type="button" text="Reset" bgColor="bg-yellow1" onClick={handleReset} disabled={loadingCreateHotel}/>
                <Button type="submit" text={loadingCreateHotel ? "Submitting..." : "Submit"} bgColor="bg-blue1" disabled={loadingCreateHotel || loadingLocations} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahHotel;


