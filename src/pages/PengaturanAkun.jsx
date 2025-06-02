// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Pencil, Trash2, ImageUp, RotateCcw } from "lucide-react";
// import Button from "../components/Button"; // Asumsi path ini benar
// import {
//   getUserProfile,
//   updateUserProfile,
//   uploadUserProfilePicture,
//   deleteUserProfilePicture,
// } from "../redux/actions/userAccountActions"; // Sesuaikan path jika perlu

// const PengaturanAkun = ({ isSidebarOpen }) => {
//   const dispatch = useDispatch();
//   const {
//     profile,
//     loadingGetProfile,
//     errorGetProfile,
//     loadingUpdateProfile,
//     errorUpdateProfile,
//     updateProfileMessage,
//     loadingUploadPicture,
//     errorUploadPicture,
//     uploadPictureMessage,
//     loadingDeletePicture,
//     errorDeletePicture,
//     deletePictureMessage,
//   } = useSelector((state) => state.userAccount);

//   const [nameInput, setNameInput] = useState("");
//   const [currentEmail, setCurrentEmail] = useState("");
//   const [imagePreview, setImagePreview] = useState("https://via.placeholder.com/150");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const fileInputRef = useRef(null);

//   // Fetch user profile on component mount
//   useEffect(() => {
//     dispatch(getUserProfile());
//   }, [dispatch]);

//   // Update local state when profile data is loaded or changed
//   useEffect(() => {
//     if (profile) {
//       setNameInput(profile.name || "");
//       setCurrentEmail(profile.email || "");
//       setImagePreview(profile.profilePicture || "https://via.placeholder.com/150");
//     }
//   }, [profile]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleInputChange = (e) => {
//     setNameInput(e.target.value);
//   };

//   const handleResetName = () => {
//     if (profile) {
//       setNameInput(profile.name || "");
//     }
//   };

//   const handleSubmitName = () => {
//     if (nameInput.trim() === "") {
//       alert("Name cannot be empty."); // Atau tampilkan pesan error yang lebih baik
//       return;
//     }
//     dispatch(updateUserProfile(nameInput));
//   };

//   const handleUploadPicture = () => {
//     if (selectedFile) {
//       dispatch(uploadUserProfilePicture(selectedFile));
//     } else {
//       alert("Please select an image file first."); // Atau tampilkan pesan error
//     }
//   };

//   const handleDeletePicture = () => {
//     if (profile && profile.profilePicture) {
//       // eslint-disable-next-line no-restricted-globals
//       if (confirm("Are you sure you want to delete your profile picture?")) {
//         dispatch(deleteUserProfilePicture());
//       }
//     } else {
//       alert("No profile picture to delete.");
//     }
//   };

//   // Clear selected file and reset preview if upload was successful
//   useEffect(() => {
//     if (uploadPictureMessage && !errorUploadPicture) {
//       setSelectedFile(null);
//       if (fileInputRef.current) {
//         fileInputRef.current.value = ""; // Reset file input
//       }
//       // Image preview will be updated by the profile refetch
//     }
//   }, [uploadPictureMessage, errorUploadPicture]);


//   if (loadingGetProfile) {
//     return (
//       <div className={`flex transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"} pt-24 h-screen items-center justify-center`}>
//         <p className="text-xl">Loading profile...</p>
//       </div>
//     );
//   }

//   if (errorGetProfile) {
//     return (
//       <div className={`flex transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"} pt-24 h-screen items-center justify-center`}>
//         <p className="text-xl text-red-500">Error loading profile: {errorGetProfile}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex transition-all duration-300">
//       <div className={`bg-white pt-24 pb-12 min-h-screen transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
//         <div className="flex-col px-4 items-center">
//           <div className="text-center md:text-2xl mb-6 md:mb-10 font-bold text-gray-800">
//             <p>Edit Profile</p>
//           </div>

//           {/* Display Messages */}
//           {errorUpdateProfile && <p className="text-red-500 text-center mb-4">{errorUpdateProfile}</p>}
//           {updateProfileMessage && <p className="text-green-500 text-center mb-4">{updateProfileMessage}</p>}
//           {errorUploadPicture && <p className="text-red-500 text-center mb-4">{errorUploadPicture}</p>}
//           {uploadPictureMessage && <p className="text-green-500 text-center mb-4">{uploadPictureMessage}</p>}
//           {errorDeletePicture && <p className="text-red-500 text-center mb-4">{errorDeletePicture}</p>}
//           {deletePictureMessage && <p className="text-green-500 text-center mb-4">{deletePictureMessage}</p>}


//           <div className="flex flex-col md:flex-row items-center md:gap-12 gap-6 justify-center">
//             {/* Profile Picture Section */}
//             <div className="relative md:w-64 w-40 md:h-64 h-40">
//               <img
//                 src={imagePreview}
//                 alt="Profile"
//                 className="w-full h-full rounded-full object-cover border-4 border-gray-300 shadow-lg"
//                 onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/150"; }} // Fallback for broken image
//               />
//               <label
//                 className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-blue-500 hover:bg-blue-600 p-3 rounded-full border-2 border-white cursor-pointer shadow-md"
//                 title="Change Profile Picture"
//               >
//                 <Pencil size={18} color="white" />
//                 <input
//                   type="file"
//                   accept="image/jpeg, image/png, image/jpg"
//                   className="hidden"
//                   onChange={handleImageChange}
//                   ref={fileInputRef}
//                 />
//               </label>
//             </div>

//             {/* User Details Section */}
//             <div className="md:w-auto w-full px-4 md:px-0">
//               <div className="flex flex-col mb-4">
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   <span className="text-red-700 mr-1">*</span>Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={nameInput}
//                   className="w-full md:max-w-md text-base p-2 border border-gray-300 text-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="flex flex-col mb-4">
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   <span className="text-red-700 mr-1">*</span>Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={currentEmail}
//                   className="w-full md:max-w-md text-base p-2 border border-gray-300 text-gray-500 bg-gray-200 rounded-lg"
//                   disabled
//                 />
//               </div>
//               {/* Password field removed as it's not part of GET /profile and update is usually separate */}
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col items-center justify-center gap-4 mt-8 md:mt-12">
//             {/* Name Update Buttons */}
//             <div className="flex flex-row justify-center gap-4">
//               <Button
//                 text="Reset Name"
//                 bgColor="bg-yellow-500 hover:bg-yellow-600"
//                 onClick={handleResetName}
//                 disabled={loadingUpdateProfile || (profile && nameInput === profile.name)}
//                 icon={<RotateCcw size={18} className="mr-2"/>}
//               />
//               <Button
//                 text={loadingUpdateProfile ? "Saving..." : "Save Name"}
//                 bgColor="bg-blue-600 hover:bg-blue-700"
//                 onClick={handleSubmitName}
//                 disabled={loadingUpdateProfile || (profile && nameInput === profile.name) || nameInput.trim() === ""}
//                 icon={<Pencil size={18} className="mr-2"/>}
//               />
//             </div>

//             {/* Profile Picture Action Buttons */}
//             <div className="flex flex-row justify-center gap-4 mt-4">
//               <Button
//                 text={loadingUploadPicture ? "Uploading..." : "Upload Picture"}
//                 bgColor="bg-green-500 hover:bg-green-600"
//                 onClick={handleUploadPicture}
//                 disabled={!selectedFile || loadingUploadPicture || loadingGetProfile}
//                 icon={<ImageUp size={18} className="mr-2"/>}
//               />
//               <Button
//                 text={loadingDeletePicture ? "Deleting..." : "Delete Picture"}
//                 bgColor="bg-red-500 hover:bg-red-600"
//                 onClick={handleDeletePicture}
//                 disabled={!(profile && profile.profilePicture) || loadingDeletePicture || loadingGetProfile}
//                 icon={<Trash2 size={18} className="mr-2"/>}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PengaturanAkun;

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, Trash2, ImageUp, RotateCcw } from "lucide-react";
import Button from "../components/Button"; // Asumsi path ini benar
import {
  getUserProfile,
  updateUserProfile,
  uploadUserProfilePicture,
  deleteUserProfilePicture,
} from "../redux/actions/userAccountActions"; // Sesuaikan path jika perlu

const PengaturanAkun = ({ isSidebarOpen }) => {
  const dispatch = useDispatch();
  const {
    profile,
    loadingGetProfile,
    errorGetProfile,
    loadingUpdateProfile,
    errorUpdateProfile,
    updateProfileMessage,
    loadingUploadPicture,
    errorUploadPicture,
    uploadPictureMessage,
    loadingDeletePicture,
    errorDeletePicture,
    deletePictureMessage,
  } = useSelector((state) => state.userAccount);

  const [nameInput, setNameInput] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  // Mengganti URL placeholder default
  const placeholderUrl = "https://placehold.co/150/EFEFEF/AAAAAA&text=No+Image";
  const [imagePreview, setImagePreview] = useState(placeholderUrl);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch user profile on component mount
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  // Update local state when profile data is loaded or changed
  useEffect(() => {
    if (profile) {
      setNameInput(profile.name || "");
      setCurrentEmail(profile.email || "");
      // Gunakan placeholderUrl jika profile.profilePicture tidak ada
      setImagePreview(profile.profilePicture || placeholderUrl);
    } else {
      // Jika profile null (misalnya saat logout atau error awal), reset ke placeholder
      setImagePreview(placeholderUrl);
    }
  }, [profile, placeholderUrl]); // Tambahkan placeholderUrl sebagai dependensi

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    setNameInput(e.target.value);
  };

  const handleResetName = () => {
    if (profile) {
      setNameInput(profile.name || "");
    }
  };

  const handleSubmitName = () => {
    if (nameInput.trim() === "") {
      alert("Name cannot be empty."); // Atau tampilkan pesan error yang lebih baik
      return;
    }
    dispatch(updateUserProfile(nameInput));
  };

  const handleUploadPicture = () => {
    if (selectedFile) {
      dispatch(uploadUserProfilePicture(selectedFile));
    } else {
      alert("Please select an image file first."); // Atau tampilkan pesan error
    }
  };

  const handleDeletePicture = () => {
    if (profile && profile.profilePicture) {
      // eslint-disable-next-line no-restricted-globals
      if (confirm("Are you sure you want to delete your profile picture?")) {
        dispatch(deleteUserProfilePicture());
      }
    } else {
      alert("No profile picture to delete.");
    }
  };

  // Clear selected file and reset preview if upload was successful
  useEffect(() => {
    if (uploadPictureMessage && !errorUploadPicture) {
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset file input
      }
      // Image preview akan diupdate oleh profile refetch, atau jika tidak, pastikan
      // setImagePreview(profile?.profilePicture || placeholderUrl) di useEffect [profile] menanganinya
    }
  }, [uploadPictureMessage, errorUploadPicture, placeholderUrl]); // Tambahkan placeholderUrl

  // Reset image preview jika profile picture dihapus
  useEffect(() => {
    if (deletePictureMessage && !errorDeletePicture && profile && !profile.profilePicture) {
        setImagePreview(placeholderUrl);
    }
  }, [deletePictureMessage, errorDeletePicture, profile, placeholderUrl]);


  if (loadingGetProfile) {
    return (
      <div className={`flex transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"} pt-24 h-screen items-center justify-center`}>
        <p className="text-xl">Loading profile...</p>
      </div>
    );
  }

  if (errorGetProfile && !profile) { // Hanya tampilkan error besar jika profil gagal total dimuat
    return (
      <div className={`flex transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"} pt-24 h-screen items-center justify-center`}>
        <p className="text-xl text-red-500">Error loading profile: {errorGetProfile}</p>
        <Button text="Retry" bgColor="bg-blue-500" onClick={() => dispatch(getUserProfile())} />
      </div>
    );
  }

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-white pt-24 pb-12 min-h-screen transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        <div className="flex-col px-4 items-center">
          <div className="text-center md:text-2xl mb-6 md:mb-10 font-bold text-gray-800">
            <p>Edit Profile</p>
          </div>

          {/* Display General Error for Profile if exists after initial load attempt */}
          {errorGetProfile && profile && <p className="text-red-500 text-center mb-4">Could not refresh profile: {errorGetProfile}</p>}

          {/* Display Action Specific Messages */}
          {errorUpdateProfile && <p className="text-red-500 text-center mb-4">{errorUpdateProfile}</p>}
          {updateProfileMessage && <p className="text-green-500 text-center mb-4">{updateProfileMessage}</p>}
          {errorUploadPicture && <p className="text-red-500 text-center mb-4">{errorUploadPicture}</p>}
          {uploadPictureMessage && <p className="text-green-500 text-center mb-4">{uploadPictureMessage}</p>}
          {errorDeletePicture && <p className="text-red-500 text-center mb-4">{errorDeletePicture}</p>}
          {deletePictureMessage && <p className="text-green-500 text-center mb-4">{deletePictureMessage}</p>}


          <div className="flex flex-col md:flex-row items-center md:gap-12 gap-6 justify-center">
            {/* Profile Picture Section */}
            <div className="relative md:w-64 w-40 md:h-64 h-40">
              <img
                src={imagePreview}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-4 border-gray-300 shadow-lg"
                onError={(e) => { e.target.onerror = null; e.target.src = placeholderUrl; }} // Fallback for broken image
              />
              <label
                className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-blue-500 hover:bg-blue-600 p-3 rounded-full border-2 border-white cursor-pointer shadow-md"
                title="Change Profile Picture"
              >
                <Pencil size={18} color="white" />
                <input
                  type="file"
                  accept="image/jpeg, image/png, image/jpg"
                  className="hidden"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                />
              </label>
            </div>

            {/* User Details Section */}
            <div className="md:w-auto w-full px-4 md:px-0">
              <div className="flex flex-col mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  <span className="text-red-700 mr-1">*</span>Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={nameInput}
                  className="w-full md:max-w-md text-base p-2 border border-gray-300 text-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  onChange={handleInputChange}
                  disabled={loadingGetProfile && !profile} // Disable if initial load ongoing
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  <span className="text-red-700 mr-1">*</span>Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={currentEmail}
                  className="w-full md:max-w-md text-base p-2 border border-gray-300 text-gray-500 bg-gray-200 rounded-lg"
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 mt-8 md:mt-12">
            {/* Name Update Buttons */}
            <div className="flex flex-row justify-center gap-4">
              <Button
                text="Reset Name"
                bgColor="bg-yellow-500 hover:bg-yellow-600"
                onClick={handleResetName}
                disabled={loadingUpdateProfile || (profile && nameInput === profile.name) || (loadingGetProfile && !profile) }
                icon={<RotateCcw size={18} className="mr-2"/>}
              />
              <Button
                text={loadingUpdateProfile ? "Saving..." : "Save Name"}
                bgColor="bg-blue-600 hover:bg-blue-700"
                onClick={handleSubmitName}
                disabled={loadingUpdateProfile || (profile && nameInput === profile.name) || nameInput.trim() === "" || (loadingGetProfile && !profile)}
                icon={<Pencil size={18} className="mr-2"/>}
              />
            </div>

            {/* Profile Picture Action Buttons */}
            <div className="flex flex-row justify-center gap-4 mt-4">
              <Button
                text={loadingUploadPicture ? "Uploading..." : "Upload Picture"}
                bgColor="bg-green-500 hover:bg-green-600"
                onClick={handleUploadPicture}
                disabled={!selectedFile || loadingUploadPicture || (loadingGetProfile && !profile)}
                icon={<ImageUp size={18} className="mr-2"/>}
              />
              <Button
                text={loadingDeletePicture ? "Deleting..." : "Delete Picture"}
                bgColor="bg-red-500 hover:bg-red-600"
                onClick={handleDeletePicture}
                disabled={!(profile && profile.profilePicture) || loadingDeletePicture || (loadingGetProfile && !profile)}
                icon={<Trash2 size={18} className="mr-2"/>}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PengaturanAkun;