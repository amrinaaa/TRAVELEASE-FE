// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { Pencil } from "lucide-react";
// import Button from "../components/Button";
// import { getHotelDetail, editHotelPartner } from "../redux/actions/adminPesawatActions";
// import { resetHotelState } from "../redux/reducers/adminPesawatReducer";

// const EditMitraPesawat = ({ isSidebarOpen }) => {
//   const { mitraName } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   const { hotelDetail, loadingFetch, errorFetch, successEdit, errorEdit, loadingEdit } = useSelector(state => state.adminPesawat);
  
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [image, setImage] = useState("https://via.placeholder.com/100");
  
//   useEffect(() => {
//     if (mitraName) {
//       dispatch(getHotelDetail(mitraName));
//     }
//   }, [mitraName, dispatch]);

//   useEffect(() => {
//     if (hotelDetail) {
//       setName(hotelDetail.name);
//       setEmail(hotelDetail.email);
//       setImage(hotelDetail.profilePicture || "https://via.placeholder.com/100");
//     }
//   }, [hotelDetail]);

//   useEffect(() => {
//     if (successEdit) {
//       alert("Pesawat profile updated successfully!");
//       dispatch(resetHotelState());
//       navigate("/manajemen-mitra-pesawat");
//     }
//     if (errorEdit) {
//       alert(`Error: ${errorEdit}`);
//       dispatch(resetHotelState());
//     }
//   }, [successEdit, errorEdit, dispatch, navigate]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (name.trim() === "" || email.trim() === "") {
//       alert("Please fill in all fields");
//       return;
//     }
//     const uid = hotelDetail.id;
//     dispatch(editHotelPartner(uid, name, email, image));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(URL.createObjectURL(file));
//     }
//   };

//   if (loadingFetch) return <div className="text-center p-4">Loading...</div>;
//   if (errorFetch) return <div className="text-center p-4 text-red-500">Error: {errorFetch}</div>;

//   return (
//     <div className="flex transition-all duration-300">
//       <div className={`bg-ungu10 pt-20 h-full transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
//         <div className="grid grid-cols-2 px-4">
//           <div className="flex flex-col md:flex-row text-left md:gap-1">
//             <p className="text-xl">Partner Management</p>
//             <p className="text-xs pt-2 text-gray-600">Edit Profile</p>
//           </div>
//           <div className="flex flex-row justify-end">
//             <Link to="/manajemen-mitra-pesawat" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
//               <i className="fa-solid fa-house-chimney text-xs"></i>
//               <p className="text-xs md:text-sm">Home</p>
//             </Link>
//             <Link to={`/edit-mitra-pesawat/${mitraName}`} className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0 ml-1">
//               <p>/</p>
//               <p className="text-xs md:text-sm">Edit Profile</p>
//             </Link>
//           </div>
//         </div>
        
//         <div className="bg-white m-4 py-4 rounded-lg shadow-md">
//           <div className="flex-col px-4 items-center">
//             <div className="text-left md:text-xl mb-6 md:mb-12">
//               <p>Edit Profile</p>
//             </div>
            
//             <form onSubmit={handleSubmit}>
//               <div className="flex flex-col md:flex-row items-center md:gap-12 gap-6 justify-center">
//                 <div className="relative md:w-64 w-32 md:h-64 h-32">
//                   <img
//                     src={image}
//                     alt="Profile"
//                     className="w-full h-full rounded-full object-cover border-2 border-gray-300 shadow-md"
//                   />
//                   <label className="absolute bottom-0 md:right-12 right-2 bg-green-500 p-2 rounded-full border-2 border-white cursor-pointer">
//                     <Pencil size={16} color="white" />
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="hidden"
//                       onChange={handleImageChange}
//                     />
//                   </label>
//                 </div>
                
//                 <div>
//                   <div className="flex flex-col mb-2 md:mb-4">
//                     <div className="text-left">
//                       <label className="block text-sm font-semibold text-gray-700">
//                         <span className="text-red-700 mr-1">*</span>User ID
//                       </label>
//                     </div>
//                     <div className="md:w-72 w-64">
//                       <input
//                         type="text"
//                         value={hotelDetail?.id || ""}
//                         className="w-full md:text-base text-sm mt-1 p-2 border border-gray-300 text-gray-600 bg-gray-300 rounded-lg"
//                         disabled
//                       />
//                     </div>
//                   </div>

//                   <div className="flex flex-col mb-2 md:mb-4">
//                     <div className="text-left">
//                       <label className="block text-sm font-semibold text-gray-700">
//                         <span className="text-red-700 mr-1">*</span>Name
//                       </label>
//                     </div>
//                     <div className="md:w-72 w-64">
//                       <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         className="w-full md:text-base text-sm mt-1 p-2 border border-gray-300 text-gray-600 rounded-lg"
//                         placeholder="Enter pesawat name"
//                       />
//                     </div>
//                   </div>

//                   <div className="flex flex-col mb-2 md:mb-4">
//                     <div className="text-left">
//                       <label className="block text-sm font-semibold text-gray-700">
//                         <span className="text-red-700 mr-1">*</span>Email
//                       </label>
//                     </div>
//                     <div className="md:w-72 w-64">
//                       <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="w-full md:text-base text-sm mt-1 p-2 border border-gray-300 text-gray-600 rounded-lg"
//                         placeholder="Enter pesawat email"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-row justify-center gap-6 text-white font-bold mt-12 mb-10">
//                 <Button 
//                   type="submit"
//                   text={loadingEdit ? "Saving..." : "Save Changes"}
//                   bgColor="bg-blue1"
//                   disabled={loadingEdit}
//                 />
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditMitraPesawat;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import Button from "../components/Button";
import { getHotelDetail, editHotelPartner } from "../redux/actions/adminPesawatActions";
import { resetHotelState } from "../redux/reducers/adminPesawatReducer";
import { uploadProfilePicture, deleteProfilePicture } from '../redux/actions/adminActions';

const EditMitraPesawat = ({ isSidebarOpen }) => {
  const { mitraName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { hotelDetail, loadingFetch, errorFetch, successEdit, errorEdit, loadingEdit } = useSelector(state => state.adminPesawat);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  useEffect(() => {
    if (mitraName) {
      dispatch(getHotelDetail(mitraName));
    }
  }, [mitraName, dispatch]);

  useEffect(() => {
    if (hotelDetail) {
      setName(hotelDetail.name);
      setEmail(hotelDetail.email);
      setImagePreview(hotelDetail.profilePicture || "https://via.placeholder.com/100");
    }
  }, [hotelDetail]);

  useEffect(() => {
    if (successEdit) {
      alert("Pesawat profile updated successfully!");
      dispatch(resetHotelState());
      navigate("/manajemen-mitra-pesawat");
    }
    if (errorEdit) {
      alert(`Error: ${errorEdit}`);
      dispatch(resetHotelState());
    }
  }, [successEdit, errorEdit, dispatch, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setSelectedImageFile(file);
    }
  };

  const handleImageUpload = () => {
    if (selectedImageFile && hotelDetail) {
      dispatch(uploadProfilePicture(hotelDetail.id, selectedImageFile))
        .then(() => {
          alert("Profile picture updated!");
          dispatch(getHotelDetail(hotelDetail.name));
        })
        .catch((error) => {
          alert(`Upload failed: ${error.message}`);
        });
    } else {
      alert("No image selected.");
    }
  };

  const handleImageDelete = () => {
    if (hotelDetail) {
      dispatch(deleteProfilePicture(hotelDetail.id))
        .then(() => {
          alert("Profile picture deleted!");
          dispatch(getHotelDetail(hotelDetail.name));
        })
        .catch((error) => {
          alert(`Delete failed: ${error.message}`);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "" || email.trim() === "") {
      alert("Please fill in all fields");
      return;
    }
    const uid = hotelDetail.id;
    dispatch(editHotelPartner(uid, name, email));
  };

  if (loadingFetch) return <div className="text-center p-4">Loading...</div>;
  if (errorFetch) return <div className="text-center p-4 text-red-500">Error: {errorFetch}</div>;

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-full transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">Partner Management</p>
            <p className="text-xs pt-2 text-gray-600">Edit Profile</p>
          </div>
          <div className="flex flex-row justify-end">
            <Link to="/manajemen-mitra-pesawat" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <i className="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
            <Link to={`/edit-mitra-pesawat/${mitraName}`} className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0 ml-1">
              <p>/</p>
              <p className="text-xs md:text-sm">Edit Profile</p>
            </Link>
          </div>
        </div>
        
        <div className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="flex-col px-4 items-center">
            <div className="text-left md:text-xl mb-6 md:mb-12">
              <p>Edit Profile</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row items-center md:gap-12 gap-6 justify-center">
                <div className="relative md:w-64 w-32 md:h-64 h-32">
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border-2 border-gray-300 shadow-md"
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2VlZWVlZSIvPgo8L3N2Zz4=";
                    }}
                  />
                  <label className="absolute bottom-0 md:right-12 right-2 bg-green-500 p-2 rounded-full border-2 border-white cursor-pointer">
                    <Pencil size={16} color="white" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                
                <div>
                  <div className="flex flex-col mb-2 md:mb-4">
                    <div className="text-left">
                      <label className="block text-sm font-semibold text-gray-700">
                        <span className="text-red-700 mr-1">*</span>User ID
                      </label>
                    </div>
                    <div className="md:w-72 w-64">
                      <input
                        type="text"
                        value={hotelDetail?.id || ""}
                        className="w-full md:text-base text-sm mt-1 p-2 border border-gray-300 text-gray-600 bg-gray-300 rounded-lg"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="flex flex-col mb-2 md:mb-4">
                    <div className="text-left">
                      <label className="block text-sm font-semibold text-gray-700">
                        <span className="text-red-700 mr-1">*</span>Name
                      </label>
                    </div>
                    <div className="md:w-72 w-64">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full md:text-base text-sm mt-1 p-2 border border-gray-300 text-gray-600 rounded-lg"
                        placeholder="Enter pesawat name"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col mb-2 md:mb-4">
                    <div className="text-left">
                      <label className="block text-sm font-semibold text-gray-700">
                        <span className="text-red-700 mr-1">*</span>Email
                      </label>
                    </div>
                    <div className="md:w-72 w-64">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full md:text-base text-sm mt-1 p-2 border border-gray-300 text-gray-600 rounded-lg"
                        placeholder="Enter pesawat email"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row justify-center gap-4 mt-6 mb-8">
                <Button
                  text="Upload Image"
                  bgColor="bg-green-500"
                  onClick={handleImageUpload}
                />
                <Button
                  text="Delete Image"
                  bgColor="bg-red-500"
                  onClick={handleImageDelete}
                />
              </div>

              <div className="flex flex-row justify-center gap-6 text-white font-bold mt-12 mb-10">
                <Button 
                  type="submit"
                  text={loadingEdit ? "Saving..." : "Save Changes"}
                  bgColor="bg-blue1"
                  disabled={loadingEdit}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMitraPesawat;