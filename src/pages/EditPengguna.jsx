// import React, { useState, useEffect } from "react";
// import { Link, useParams } from 'react-router-dom';
// import { Pencil } from "lucide-react";
// import Button from "../components/Button";
// import dataPengguna from "../utils/dataPengguna.json"; 

// const EditPengguna = ({ isSidebarOpen }) => {
//   const [user, setUser] = useState({
//     id: '',
//     nama: '',
//     email: '',
//     password: '',
//   });
//   const [image, setImage] = useState("https://via.placeholder.com/100");
//   const [data, setData] = useState(dataPengguna); // Untuk menyimpan data pengguna
//   const [showPassword, setShowPassword] = useState(false); // State untuk toggle password visibility
//   const { userId } = useParams(); 

//   useEffect(() => {
//     // Find the user based on the ID from the URL
//     const selectedUser = data.find((user) => user.id === userId);
//     if (selectedUser) {
//       setUser({
//         id: selectedUser.id,
//         nama: selectedUser.nama,
//         email: selectedUser.email,
//         password: selectedUser.password,
//       });
//     }
//   }, [userId, data]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(URL.createObjectURL(file));
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prevUser) => ({
//       ...prevUser,
//       [name]: value,
//     }));
//   };

//   // Function to handle reset (clear the "nama" input)
//   const handleReset = () => {
//     setUser((prevUser) => ({
//       ...prevUser,
//       nama: '',  // Reset "nama" input to empty string
//     }));
//   };

//   // Function to handle submit and update the name in the data
//   const handleSubmit = () => {
//     const updatedData = data.map((item) =>
//       item.id === user.id ? { ...item, nama: user.nama } : item
//     );
//     setData(updatedData);  // Update the data with the new name
//     alert("Profile updated successfully!"); // Display success message
//   };

//   // Function to toggle password visibility
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="flex transition-all duration-300">
//       <div className={`bg-ungu10 pt-20 h-full transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
//         <div className="grid grid-cols-2 px-4">
//           <div className="flex flex-col md:flex-row text-left md:gap-1">
//             <p className="text-xl">User Management</p>
//             <p className="text-xs pt-2 text-gray-600">Edit Profile</p>
//           </div>
//           <div className="flex flex-row justify-end">
//             <Link to="/manajemen-pengguna" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
//               <i className="fa-solid fa-house-chimney text-xs"></i>
//               <p className="text-xs md:text-sm">Home</p>
//             </Link>
//             <Link to={`/edit-pengguna/${user.id}`} className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0 ml-1">
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
//             <div className="flex flex-col md:flex-row items-center md:gap-12 gap-6 justify-center">
//               <div className="relative md:w-64 w-32 md:h-64 h-32">
//                 <img
//                   src={image}
//                   alt="Profile"
//                   className="w-full h-full rounded-full object-cover border-2 border-gray-300 shadow-md"
//                 />
//                 <label className="absolute bottom-0 md:right-12 right-2 bg-green-500 p-2 rounded-full border-2 border-white cursor-pointer">
//                   <Pencil size={16} color="white" />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={handleImageChange}
//                   />
//                 </label>
//               </div>
//               <div>
//                 <div className="flex flex-col mb-2 md:mb-4">
//                   <div className="text-left">
//                     <label className="block text-sm font-semibold text-gray-700"><label className="text-red-700 mr-1">*</label>User ID</label>
//                   </div>
//                   <div className="md:w-72 w-64">
//                     <input
//                       type="text"
//                       value={user.id}
//                       className="w-full md:text-base text-sm mt-1 p-2 border border-gray-300 text-gray-600 bg-gray-300 rounded-lg"
//                       disabled
//                     /> 
//                   </div>
//                 </div>
//                 <div className="flex flex-col mb-2 md:mb-4">
//                   <div className="text-left">
//                     <label className="block text-sm font-semibold text-gray-700"><label className="text-red-700 mr-1">*</label>Name</label>
//                   </div>
//                   <div className="md:w-72 w-64">
//                     <input
//                       type="text"
//                       name="nama"
//                       value={user.nama}
//                       className="w-full md:text-base text-sm mt-1 p-2 border border-gray-300 text-gray-600 rounded-lg"
//                       onChange={handleInputChange}
//                     /> 
//                   </div>
//                 </div>
//                 <div className="flex flex-col mb-2 md:mb-4">
//                   <div className="text-left">
//                     <label className="block text-sm font-semibold text-gray-700"><label className="text-red-700 mr-1">*</label>Email</label>
//                   </div> 
//                   <div className="md:w-72 w-64">
//                     <input
//                       type="text"
//                       name="email"
//                       value={user.email}
//                       className="w-full md:text-base text-sm mt-1 p-2 border font-bold border-gray-300 text-gray-600 bg-gray-300 rounded-lg"
//                       disabled
//                     /> 
//                   </div>
//                 </div>
//                 <div className="flex flex-col mb-2 md:mb-4">
//                   <div className="text-left">
//                     <label className="block text-sm font-semibold text-gray-700"><label className="text-red-700 mr-1">*</label>Password</label>
//                   </div>
//                   <div className="md:w-72 w-64">
//                     <input
//                       type={showPassword ? "text" : "password"}  // Toggle between text and password
//                       name="password"
//                       value={user.password}
//                       className="w-full md:text-base text-sm mt-1 p-2 border border-gray-300 text-gray-600 bg-gray-300 rounded-lg"
//                       disabled
//                     />
//                     {/* Button to toggle password visibility */}
//                     {/* <button type="button" onClick={togglePasswordVisibility} className="mt-2 text-blue-500">
//                       {showPassword ? "Hide" : "Show"} Password
//                     </button> */}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-row justify-center gap-6 text-white font-bold mt-12 mb-10">
//               <Button text="Reset" bgColor="bg-yellow1" onClick={handleReset} />
//               <Button text="Submit" bgColor="bg-blue1" onClick={handleSubmit} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditPengguna

import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Pencil } from "lucide-react";
import { getUserByEmail, updateUser } from '../redux/actions/adminActions';
import Button from "../components/Button";

const EditPengguna = ({ isSidebarOpen }) => {
  // Hooks called unconditionally first
  const { email } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { 
    currentUser,
    loadingFetchSingle,
    errorFetchSingle,
    loadingUpdate,
    errorUpdate
  } = useSelector((state) => state.admin);

  // State hooks
  const [name, setName] = useState('');
  const [image, setImage] = useState("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2VlZWVlZSIvPgo8L3N2Zz4=");

  // Effect hooks
  useEffect(() => {
    if (email) {
      const encodedEmail = encodeURIComponent(email);
      dispatch(getUserByEmail(encodedEmail));
    }
  }, [dispatch, email]);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setImage(currentUser.profilePicture || "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2VlZWVlZSIvPgo8L3N2Zz4=");
    }
  }, [currentUser]);

  // Conditional returns moved after all hooks
  if (loadingFetchSingle) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-ungu1">Loading user data...</div>
      </div>
    );
  }

  if (errorFetchSingle) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{errorFetchSingle}</div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">User not found</p>
        {email && (
          <p className="text-sm text-gray-600 mt-2">
            Email: {email}
          </p>
        )}
      </div>
    );
  }

  // Event handlers
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    dispatch(updateUser(currentUser.id, name, currentUser.email))
      .unwrap()
      .then(() => {
        alert("Profile updated successfully!");
        navigate('/manajemen-pengguna');
      })
      .catch((error) => {
        alert(`Update failed: ${error}`);
      });
  };

  const handleReset = () => {
    setName(currentUser.name);
  };

  // Main component return
  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-full transition-all duration-300 ${
        isSidebarOpen 
          ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" 
          : "ml-0 w-full"
      }`}>
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">User Management</p>
            <p className="text-xs pt-2 text-gray-600">Edit Profile</p>
          </div>
          <div className="flex flex-row justify-end">
            <Link 
              to="/manajemen-pengguna" 
              className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0"
            >
              <i className="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
            <Link 
              to={`/edit-pengguna/${email}`} 
              className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0 ml-1"
            >
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
            
            <div className="flex flex-col md:flex-row items-center md:gap-12 gap-6 justify-center">
              <div className="relative md:w-64 w-32 md:h-64 h-32">
                <img
                  src={image}
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

              <div className="w-full max-w-md">
                <div className="flex flex-col mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <span className="text-red-700 mr-1">*</span>User ID
                  </label>
                  <input
                    type="text"
                    value={currentUser?.id || ''}
                    className="w-full p-2 border border-gray-300 bg-gray-100 rounded-lg"
                    disabled
                  />
                </div>

                <div className="flex flex-col mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <span className="text-red-700 mr-1">*</span>Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    disabled={loadingUpdate}
                  />
                </div>

                <div className="flex flex-col mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <span className="text-red-700 mr-1">*</span>Email
                  </label>
                  <input
                    type="email"
                    value={currentUser?.email || ''}
                    className="w-full p-2 border border-gray-300 bg-gray-100 rounded-lg"
                    disabled
                  />
                </div>

                {errorUpdate && (
                  <div className="mb-4 text-red-500 text-sm">{errorUpdate}</div>
                )}
              </div>
            </div>

            <div className="flex flex-row justify-center gap-6 text-white font-bold mt-12 mb-10">
              <Button
                text="Reset"
                bgColor="bg-yellow1"
                onClick={handleReset}
                disabled={loadingUpdate}
              />
              <Button
                text={loadingUpdate ? "Updating..." : "Submit"}
                bgColor="bg-blue1"
                onClick={handleSubmit}
                disabled={loadingUpdate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default EditPengguna;