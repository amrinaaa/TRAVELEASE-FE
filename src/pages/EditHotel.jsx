// import React, { useState, useEffect } from "react";
// import { Link, useParams } from 'react-router-dom';
// import Button from "../components/Button";
// import dataHotel from "../utils/dataHotel.json";

// const EditHotel = ({ isSidebarOpen }) => {
//   const { userId } = useParams();
//   const [user, setUser] = useState({
//     id: '',
//     name: '',
//     description: '',
//     city: '',
//     address: '',
//     contact: '',
//     image: ''
//   });
//   const [imageFile, setImageFile] = useState(null);

//   useEffect(() => {
//     const selectedHotel = dataHotel.find((hotel) => hotel.id === Number(userId));
//     if (selectedHotel) {
//       setUser({
//         ...selectedHotel,
//         contact: selectedHotel.contact || ''  // Tambahan
//       });
//     }
//   }, [userId]);

//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image") {
//       setImageFile(files[0]);
//     } else {
//       setUser((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleReset = () => {
//     setUser({
//       id: '',
//       name: '',
//       description: '',
//       city: '',
//       address: '',
//       contact: '',
//       image: ''
//     });
//     setImageFile(null);
//   };

//   const handleSubmit = () => {
//     const updatedHotel = {
//       ...user,
//       image: imageFile ? imageFile.name : user.image
//     };
//     console.log("Updated hotel data:", updatedHotel);
//     alert("Hotel updated successfully!");
//   };

//   return (
//     <div className="flex transition-all duration-300">
//       <div className={`bg-ungu10 pt-20 h-full transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
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
//             <Link to={`/edit-hotel/${user.id}`} className="flex items-center gap-1 text-black pt-9 md:pt-0 ml-1">
//               <p>/</p>
//               <p className="text-xs md:text-sm">Edit Hotel</p>
//             </Link>
//           </div>
//         </div>

//         <div className="bg-white m-4 py-4 rounded-lg shadow-md">
//           <div className="flex-col px-4 items-center">
//             <div className="text-left md:text-xl mb-6 md:mb-12">
//               <p>Edit Hotel</p>
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
//                     value={user.name}
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
//                   value={user.description}
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
//                   value={user.city}
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
//                   value={user.address}
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
//                     value={user.contact}
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
//                 {user.image && !imageFile && (
//                   <p className="text-sm mt-1 text-gray-600">Current: {user.image}</p>
//                 )}
//                 {imageFile && (
//                   <p className="text-sm mt-1 text-gray-600">New File: {imageFile.name}</p>
//                 )}
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

// export default EditHotel

import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { updateHotel } from "../redux/actions/mitraAction"; // Adjust path as needed
import Button from "../components/Button"; // Assuming Button component exists

const EditHotel = ({ isSidebarOpen }) => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { hotelList, loadingUpdateHotel, errorUpdateHotel, updatedHotelData } = useSelector(
    (state) => state.mitra
  );

  const [hotelDetails, setHotelDetails] = useState({
    id: '',
    name: '',
    description: '',
    city: '',
    locationId: '',
    address: '',
    contact: '',
    currentImageUrl: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [initialLocationId, setInitialLocationId] = useState('');

  useEffect(() => {
    if (hotelList && hotelList.length > 0) {
      const selectedHotel = hotelList.find((hotel) => hotel.id === hotelId);
      if (selectedHotel) {
        setHotelDetails({
          id: selectedHotel.id,
          name: selectedHotel.name || '',
          description: selectedHotel.description || '',
          city: selectedHotel.location?.city || selectedHotel.city || '', //
          locationId: selectedHotel.locationId || selectedHotel.location?.id || '', //
          address: selectedHotel.address || '',
          contact: selectedHotel.contact || '', //
          currentImageUrl: selectedHotel.imageUrl || selectedHotel.image || '' //
        });
        setInitialLocationId(selectedHotel.locationId || selectedHotel.location?.id || '');
      } else {
        console.error("Hotel not found in Redux store with ID:", hotelId);
      }
    }
  }, [hotelId, hotelList]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file" && name === "image") {
      setImageFile(files[0]); //
    } else {
      setHotelDetails((prev) => ({ ...prev, [name]: value })); //
    }
  };

  const handleReset = () => {
    if (hotelList && hotelList.length > 0) {
      const selectedHotel = hotelList.find((hotel) => hotel.id === hotelId);
      if (selectedHotel) {
        setHotelDetails({
          id: selectedHotel.id,
          name: selectedHotel.name || '',
          description: selectedHotel.description || '',
          city: selectedHotel.location?.city || selectedHotel.city || '',
          locationId: selectedHotel.locationId || selectedHotel.location?.id || '',
          address: selectedHotel.address || '',
          contact: selectedHotel.contact || '',
          currentImageUrl: selectedHotel.imageUrl || selectedHotel.image || ''
        });
        setInitialLocationId(selectedHotel.locationId || selectedHotel.location?.id || '');
      }
    }
    setImageFile(null); //
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('hotelId', hotelDetails.id);
    formData.append('name', hotelDetails.name);
    formData.append('description', hotelDetails.description);
    formData.append('address', hotelDetails.address);
    formData.append('contact', hotelDetails.contact);

    if (hotelDetails.locationId) {
        formData.append('locationId', hotelDetails.locationId);
    } else if (initialLocationId) {
        formData.append('locationId', initialLocationId);
    }

    if (imageFile) {
      formData.append('files', imageFile);
    }

    dispatch(updateHotel(formData));
  };

  useEffect(() => {
    if (updatedHotelData && !loadingUpdateHotel && !errorUpdateHotel) {
      alert("Hotel updated successfully!"); //
      navigate("/manajemen-hotel");
    }
  }, [updatedHotelData, loadingUpdateHotel, errorUpdateHotel, navigate, dispatch]);


  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-full min-h-screen transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}> {/* */}
        <div className="grid grid-cols-2 px-4"> {/* */}
          <div className="flex flex-col md:flex-row text-left md:gap-1"> {/* */}
            <p className="text-xl">Hotel Management</p> {/* */}
            <p className="text-xs pt-2 text-gray-600">Edit Hotel</p> {/* */}
          </div>
          <div className="flex flex-row justify-end"> {/* */}
            <Link to="/manajemen-hotel" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0"> {/* */}
              <i className="fa-solid fa-house-chimney text-xs"></i> {/* */}
              <p className="text-xs md:text-sm">Home</p> {/* */}
            </Link>
            <Link to={`/edit-hotel/${hotelDetails.id}`} className="flex items-center gap-1 text-black pt-9 md:pt-0 ml-1"> {/* */}
              <p>/</p> {/* */}
              <p className="text-xs md:text-sm">Edit Hotel</p> {/* */}
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white m-4 py-4 rounded-lg shadow-md"> {/* */}
          <div className="flex-col px-4 items-center"> {/* */}
            <div className="text-left md:text-xl mb-6 md:mb-12"> {/* */}
              <p>Edit Hotel: {hotelDetails.name || 'Loading...'}</p> {/* */}
            </div>

            {errorUpdateHotel && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                Error: {errorUpdateHotel}
              </div>
            )}

            <div className="flex flex-col gap-4 items-center"> {/* */}

              {/* Name */}
              <div className="text-left w-64 md:w-96"> {/* */}
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700"> {/* */}
                  <span className="text-red-700 mr-1">*</span>Name {/* */}
                </label>
                <div className="flex w-full items-center border rounded-lg p-2 bg-gray-100"> {/* */}
                  <i className="ri-pencil-fill text-gray-500 mr-2"></i> {/* */}
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={hotelDetails.name}
                    onChange={handleInputChange}
                    placeholder="Hotel name"
                    className="w-full bg-transparent focus:outline-none" //
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="text-left w-64 md:w-96"> {/* */}
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700"> {/* */}
                  <span className="text-red-700 mr-1">*</span>Description {/* */}
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={hotelDetails.description}
                  onChange={handleInputChange}
                  placeholder="Hotel description"
                  className="w-full bg-transparent focus:outline-none p-2 rounded-lg border border-gray-300" //
                  rows="4" //
                  required
                />
              </div>

              {/* City - This is for display. Ensure locationId is handled for submission. */}
              <div className="text-left w-64 md:w-96"> {/* */}
                <label htmlFor="city" className="block text-sm font-semibold text-gray-700"> {/* */}
                  <span className="text-red-700 mr-1">*</span>City (Display) {/* */}
                </label>
                <select
                  id="city"
                  name="city"
                  value={hotelDetails.city}
                  onChange={handleInputChange}
                  className="w-full bg-gray-100 border rounded p-2" //
                  required
                >
                  <option value="">Select a city</option> {/* */}
                  <option value="Balikpapan">Balikpapan</option> {/* */}
                  <option value="Jakarta">Jakarta</option> {/* */}
                  <option value="Surabaya">Surabaya</option> {/* */}
                  <option value="Semarang">Semarang</option> {/* */}
                  <option value="Bandung">Bandung</option> {/* */}
                </select>
                {hotelDetails.locationId && <p className="text-xs text-gray-500 mt-1">Location ID: {hotelDetails.locationId}</p>}
              </div>


              {/* Address */}
              <div className="text-left w-64 md:w-96"> {/* */}
                <label htmlFor="address" className="block text-sm font-semibold text-gray-700"> {/* */}
                  <span className="text-red-700 mr-1">*</span>Address {/* */}
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={hotelDetails.address}
                  onChange={handleInputChange}
                  className="w-full bg-transparent focus:outline-none p-2 rounded-lg border border-gray-300" //
                  rows="2" //
                  required
                />
              </div>

              {/* Contact */}
              <div className="text-left w-64 md:w-96"> {/* */}
                <label htmlFor="contact" className="block text-sm font-semibold text-gray-700"> {/* */}
                    <span className="text-red-700 mr-1">*</span>Contact {/* */}
                </label>
                <input
                    id="contact"
                    type="text"
                    name="contact"
                    value={hotelDetails.contact}
                    onChange={handleInputChange}
                    placeholder="0853xxxxxxxx" //
                    className="w-full bg-transparent focus:outline-none p-2 rounded-lg border border-gray-300" //
                    required
                />
                <p className="text-xs text-gray-500 mt-1">Exp: 0853xxxxxxxx</p> {/* */}
              </div>

              {/* Image */}
              <div className="text-left w-64 md:w-96"> {/* */}
                <label htmlFor="image" className="block text-sm font-semibold text-gray-700"> {/* */}
                  Hotel Image
                </label>
                <input
                  id="image"
                  type="file"
                  name="image" //
                  accept="image/*"
                  onChange={handleInputChange} //
                  className="w-full bg-gray-100 p-2 rounded border" //
                />
                {hotelDetails.currentImageUrl && !imageFile && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Current Image:</p>
                    <img src={hotelDetails.currentImageUrl} alt="Current hotel" className="max-w-xs max-h-32 mt-1 border"/>
                  </div>
                )}
                {imageFile && (
                  <p className="text-sm mt-1 text-gray-600">New File Selected: {imageFile.name}</p> //
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-row justify-center gap-6 text-white font-bold mt-12 mb-10"> {/* */}
                <Button type="button" text="Reset" bgColor="bg-yellow1" onClick={handleReset} /> {/* */}
                <Button type="submit" text={loadingUpdateHotel ? "Updating..." : "Submit"} bgColor="bg-blue1" disabled={loadingUpdateHotel} /> {/* */}
              </div>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHotel;