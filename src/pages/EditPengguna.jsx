import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Pencil, Trash2 } from "lucide-react";
import { getUserByEmail, updateUser, uploadProfilePicture, deleteProfilePicture } from '../redux/actions/adminActions';
import Button from "../components/Button";

const EditPengguna = ({ isSidebarOpen }) => {
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

  const [name, setName] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  useEffect(() => {
    if (email) {
      const encodedEmail = encodeURIComponent(email);
      dispatch(getUserByEmail(encodedEmail));
    }
  }, [dispatch, email]);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmailInput(currentUser.email);
      setImagePreview(currentUser.profilePicture);
    }
  }, [currentUser]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setSelectedImageFile(file);
    }
  };

  const handleImageUpload = () => {
    if (selectedImageFile && currentUser) {
      dispatch(uploadProfilePicture(currentUser.id, selectedImageFile))
        .then(() => {
          alert("Profile picture updated!");
          dispatch(getUserByEmail(currentUser.email));
        })
        .catch((error) => {
          alert(`Upload failed: ${error.message}`);
        });
    } else {
      alert("No image selected.");
    }
  };

  const handleImageDelete = () => {
    if (currentUser) {
      dispatch(deleteProfilePicture(currentUser.id))
        .then(() => {
          alert("Profile picture deleted!");
          dispatch(getUserByEmail(currentUser.email));
        })
        .catch((error) => {
          alert(`Delete failed: ${error.message}`);
        });
    }
  };

  const handleSubmit = () => {
    dispatch(updateUser(currentUser.id, name, emailInput))
      .then(() => {
        alert("Profile updated successfully!");
        navigate('/manajemen-pengguna');
      })
      .catch((error) => {
        alert(`Update failed: ${error.message}`);
      });
  };

  const handleReset = () => {
    setName(currentUser.name);
    setEmailInput(currentUser.email);
  };

  if (loadingFetchSingle) {
    return <div className="flex justify-center items-center h-screen"><div className="text-ungu1">Loading user data...</div></div>;
  }

  if (errorFetchSingle) {
    return <div className="flex justify-center items-center h-screen"><div className="text-red-500">{errorFetchSingle}</div></div>;
  }

  if (!currentUser) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">User not found</p>
        {email && <p className="text-sm text-gray-600 mt-2">Email: {email}</p>}
      </div>
    );
  }

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-full transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">User Management</p>
            <p className="text-xs pt-2 text-gray-600">Edit Profile</p>
          </div>
          <div className="flex flex-row justify-end">
            <Link to="/manajemen-pengguna" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <i className="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
            <Link to={`/edit-pengguna/${email}`} className="flex items-center gap-1 text-black pt-9 md:pt-0 ml-1">
              <p>/</p>
              <p className="text-xs md:text-sm">Edit Profile</p>
            </Link>
          </div>
        </div>

        <div className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="flex-col px-4 items-center">
            <div className="text-left md:text-xl mb-6 md:mb-12"><p>Edit Profile</p></div>

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

              <div className="w-full max-w-md">
                <div className="flex flex-col mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <span className="text-red-700 mr-1">*</span>User ID
                  </label>
                  <input
                    type="text"
                    value={currentUser.id}
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
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    disabled={loadingUpdate}
                  />
                </div>

                {errorUpdate && (
                  <div className="mb-4 text-red-500 text-sm">{errorUpdate}</div>
                )}
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

            <div className="flex flex-row justify-center gap-6 text-white font-bold mt-4 mb-10">
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

