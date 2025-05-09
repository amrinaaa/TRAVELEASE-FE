import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import { createUser } from "../redux/actions/adminActions";

const TambahPengguna = ({ isSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { 
    loadingCreate, 
    errorCreate,
    successCreate  // Add success state from Redux
  } = useSelector((state) => state.admin);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setShowSuccess(false);
  };

  useEffect(() => {
    if (successCreate) {
      const timer = setTimeout(() => {
        dispatch({ type: "RESET_CREATE_STATE" });
        navigate("/manajemen-pengguna");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successCreate, navigate, dispatch]);


  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill all required fields!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await dispatch(createUser(
        formData.name,
        formData.email,
        formData.password
      ));
      

      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/manajemen-pengguna");
      }, 3000);

      handleReset();

    } catch (error) {
      // Error handled by reducer
    }
  };

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-screen transition-all duration-300 ${
        isSidebarOpen 
          ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" 
          : "ml-0 w-full"
      }`}>
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">User Management</p>
            <p className="text-xs pt-2 text-gray-600">Add User</p>
          </div>
          <div className="flex flex-row justify-end">
            <Link to="/manajemen-pengguna" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <i className="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
            <Link to="/tambah-pengguna" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0 ml-1">
              <p>/</p>
              <p className="text-xs md:text-sm">Add User</p>
            </Link>
          </div>
        </div>

        <div className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="flex-col px-4 items-center">
          {successCreate && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
              ✓ User created successfully! Redirecting...
            </div>
          )}
            {errorCreate && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                ⚠️ Error: {errorCreate}
              </div>
            )}

            <div className="text-left md:text-xl mb-6 md:mb-12">
              <p>Add New User</p>
            </div>

            <div className="space-y-4 max-w-md mx-auto">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                  <span className="text-red-600">*</span> Full Name
                </label>
                <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-100">
                  <i className="ri-user-3-line text-gray-500 mr-2"></i>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className="w-full bg-transparent focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                  <span className="text-red-600">*</span> Email Address
                </label>
                <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-100">
                  <i className="ri-mail-line text-gray-500 mr-2"></i>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className="w-full bg-transparent focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                  <span className="text-red-600">*</span> Password
                </label>
                <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-100">
                  <i className="ri-lock-password-line text-gray-500 mr-2"></i>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter password"
                    className="w-full bg-transparent focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                  <span className="text-red-600">*</span> Confirm Password
                </label>
                <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-100">
                  <i className="ri-lock-password-line text-gray-500 mr-2"></i>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm password"
                    className="w-full bg-transparent focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-center gap-4 md:pt-4 pt-2">
                <Button
                  text="Reset Form"
                  bgColor="bg-yellow1 hover:bg-yellow-400"
                  onClick={handleReset}
                  disabled={loadingCreate}
                />
                <Button
                  text={loadingCreate ? "Creating User..." : "Submit"}
                  bgColor="bg-blue1 hover:bg-blue-500"
                  onClick={handleSubmit}
                  disabled={loadingCreate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahPengguna;