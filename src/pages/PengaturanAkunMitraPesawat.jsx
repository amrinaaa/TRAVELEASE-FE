import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { Pencil } from "lucide-react";
import Button from "../components/Button";
import dataPengguna from "../utils/dataPengguna.json"; 

const PengaturanAkunMitraPesawat = ({ isSidebarOpen }) => {
  const [user, setUser] = useState({
    id: '',
    nama: '',
    email: '',
    password: '',
  });
  const [image, setImage] = useState("https://via.placeholder.com/100");
  const [data, setData] = useState(dataPengguna); // Untuk menyimpan data pengguna
  const [showPassword, setShowPassword] = useState(false); // State untuk toggle password visibility
  const { userId } = useParams(); 

  useEffect(() => {
    // Find the user based on the ID from the URL
    const selectedUser = data.find((user) => user.id === userId);
    if (selectedUser) {
      setUser({
        id: selectedUser.id,
        nama: selectedUser.nama,
        email: selectedUser.email,
        password: selectedUser.password,
      });
    }
  }, [userId, data]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Function to handle reset (clear the "nama" input)
  const handleReset = () => {
    setUser((prevUser) => ({
      ...prevUser,
      nama: '',  // Reset "nama" input to empty string
    }));
  };

  // Function to handle submit and update the name in the data
  const handleSubmit = () => {
    const updatedData = data.map((item) =>
      item.id === user.id ? { ...item, nama: user.nama } : item
    );
    setData(updatedData);  // Update the data with the new name
    alert("Profile updated successfully!"); // Display success message
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-white pt-24 h-full transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        <div className="grid grid-cols-2 px-4">
        </div>
          <div className="flex-col px-4 items-center">
            <div className="text-center md:text-xl mb-6 md:mb-12 font-bold">
              <p>Edit Profile Pesawat</p>
            </div>
            <div className="flex flex-col md:flex-row items-center md:gap-12 gap-6 justify-center">
              <div className="relative md:w-64 w-32 md:h-64 h-32">
                <img
                  src={image}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-2 border-gray-300 shadow-md"
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
                    <label className="block text-sm font-semibold text-gray-700"><label className="text-red-700 mr-1">*</label>Name</label>
                  </div>
                  <div className="md:w-72 w-64">
                    <input
                      type="text"
                      name="nama"
                      value={user.nama}
                      className="w-full md:text-base text-sm mt-1 p-2 border border-gray-300 text-gray-600 rounded-lg"
                      onChange={handleInputChange}
                    /> 
                  </div>
                </div>
                <div className="flex flex-col mb-2 md:mb-4">
                  <div className="text-left">
                    <label className="block text-sm font-semibold text-gray-700"><label className="text-red-700 mr-1">*</label>Email</label>
                  </div> 
                  <div className="md:w-72 w-64">
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      className="w-full md:text-base text-sm mt-1 p-2 border font-bold border-gray-300 text-gray-600 bg-gray-300 rounded-lg"
                      disabled
                    /> 
                  </div>
                </div>
                <div className="flex flex-col mb-2 md:mb-4">
                  <div className="text-left">
                    <label className="block text-sm font-semibold text-gray-700"><label className="text-red-700 mr-1">*</label>Password</label>
                  </div>
                  <div className="md:w-72 w-64">
                    <input
                      type={showPassword ? "text" : "password"}  // Toggle between text and password
                      name="password"
                      value={user.password}
                      className="w-full md:text-base text-sm mt-1 p-2 border border-gray-300 text-gray-600 bg-gray-300 rounded-lg"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center gap-6 text-white font-bold mt-12 mb-10">
              <Button text="Reset" bgColor="bg-yellow1" onClick={handleReset} />
              <Button text="Submit" bgColor="bg-blue1" onClick={handleSubmit} />
            </div>
          </div>
      </div>
    </div>
  );
};

export default PengaturanAkunMitraPesawat