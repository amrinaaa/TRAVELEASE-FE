import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from "../components/Button";
import { createHotelPartner, resetCreateHotel } from "../redux/actions/adminHotelActions";

const TambahMitraHotel = ({ isSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ambil state dari Redux
  const { loadingCreate, successCreate, errorCreate } = useSelector((state) => state.adminHotel);

  // State lokal untuk input form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  // Reset all fields
  const handleReset = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  // Handle form submit
  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const newPartnerData = {
      name,
      email,
      password,
      role: "MITRA_HOTEL", // Role tetap fixed untuk mitra hotel
    };

    dispatch(createHotelPartner(newPartnerData));
  };

  // Watch successCreate and errorCreate
  useEffect(() => {
    if (successCreate) {
      alert("Hotel partner added successfully!");
      handleReset();
      dispatch(resetCreateHotel());
      navigate("/manajemen-mitra-hotel"); // Redirect setelah sukses
    }

    if (errorCreate) {
      alert(`Error: ${errorCreate}`);
      dispatch(resetCreateHotel());
    }
  }, [successCreate, errorCreate, dispatch, navigate]);

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-screen transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">Partner Management</p>
            <p className="text-xs pt-2 text-gray-600">Add Hotel Partner</p>
          </div>
          <div className="flex flex-row justify-end">
            <Link to="/manajemen-mitra-hotel" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <i className="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
            <Link to="/tambah-mitra-hotel" className="flex items-center gap-1 text-black pt-9 md:pt-0 ml-1">
              <p>/</p>
              <p className="text-xs md:text-sm">Add Hotel Partner</p>
            </Link>
          </div>
        </div>

        <div className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="flex-col px-4 items-center">
            <div className="text-left md:text-xl mb-6 md:mb-12">
              <p>Add Hotel Partner</p>
            </div>

            {/* Input Nama */}
            <div className="flex flex-col mb-2 md:mb-4 items-center">
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700">
                  <label className="text-red-700 mr-1">*</label>Name
                </label>
                <div className="md:w-96 w-64">
                  <div className="flex w-full items-center border rounded-lg p-2 bg-gray-100">
                    <i className="ri-pencil-fill text-gray-500 mr-2"></i>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleInputChange}
                      placeholder="Partner's name"
                      className="w-full bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Input Email */}
            <div className="flex flex-col mb-2 md:mb-4 items-center">
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700">
                  <label className="text-red-700 mr-1">*</label>Email
                </label>
                <div className="md:w-96 w-64">
                  <div className="flex w-full items-center border rounded-lg p-2 bg-gray-100">
                    <i className="ri-pencil-fill text-gray-500 mr-2"></i>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleInputChange}
                      placeholder="Partner's email"
                      className="w-full bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Input Password */}
            <div className="flex flex-col mb-2 md:mb-4 items-center">
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700">
                  <label className="text-red-700 mr-1">*</label>Password
                </label>
                <div className="md:w-96 w-64">
                  <div className="flex w-full items-center border rounded-lg p-2 bg-gray-100">
                    <i className="ri-lock-2-line text-gray-500 mr-2"></i>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleInputChange}
                      placeholder="Password"
                      className="w-full bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Input Confirm Password */}
            <div className="flex flex-col mb-2 md:mb-4 items-center">
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700">
                  <label className="text-red-700 mr-1">*</label>Confirm Password
                </label>
                <div className="md:w-96 w-64">
                  <div className="flex w-full items-center border rounded-lg p-2 bg-gray-100">
                    <i className="ri-lock-2-line text-gray-500 mr-2"></i>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm Password"
                      className="w-full bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Tombol Submit dan Reset */}
            <div className="flex flex-row justify-center gap-6 text-white font-bold mt-12 mb-10">
              <Button text="Reset" bgColor="bg-yellow1" onClick={handleReset} />
              <Button text="Submit" bgColor="bg-blue1" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahMitraHotel;
