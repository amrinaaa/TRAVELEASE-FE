import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import Button from "../components/Button";
import {
  fetchPlaneTypesRequest,
  createPlaneType,
  createPlane,
} from "../redux/actions/mitraAction";

const TambahPesawat = ({ isSidebarOpen }) => {
  const { airlineId } = useParams(); // Menggunakan airlineId
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- Redux State ---
  const {
    planeTypeList,
    loadingPlaneTypes,
    // errorPlaneTypes, // Uncomment if needed for error display
    loadingCreatePlaneType,
    errorCreatePlaneType,
    createdPlaneType, // To know when a new type is added
    loadingCreatePlane,
    errorCreatePlane,
    createdPlane, // To know when a new plane is added
  } = useSelector((state) => state.mitra);

  // --- Local State ---
  const [name, setName] = useState('');
  const [selectedTypeId, setSelectedTypeId] = useState('');
  const [seatCategories, setSeatCategories] = useState([]); // Menyimpan [{ name: '...', price: ... }]

  // Modals and Input for new Type/Class
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showClassModal, setShowClassModal] = useState(false);
  const [newType, setNewType] = useState({ name: '', manufacture: '' });
  const [newClass, setNewClass] = useState({ name: '', price: '' });

  // --- Effects ---

  // Fetch plane types on mount
  useEffect(() => {
    dispatch(fetchPlaneTypesRequest());
  }, [dispatch]);

  // Handle successful plane type creation
  useEffect(() => {
    if (createdPlaneType && !loadingCreatePlaneType && !errorCreatePlaneType) {
        alert("New plane type added successfully!");
        setShowTypeModal(false);
        setNewType({ name: '', manufacture: '' });
        dispatch(fetchPlaneTypesRequest()); // Refetch types to update dropdown
        // Set the newly created type as selected (optional, needs careful handling if ID isn't immediately known)
        // setSelectedTypeId(createdPlaneType.id); // This might need adjustment based on how createdPlaneType is handled
    } else if (errorCreatePlaneType && !loadingCreatePlaneType) {
        alert(`Error adding plane type: ${errorCreatePlaneType}`);
    }
  }, [createdPlaneType, loadingCreatePlaneType, errorCreatePlaneType, dispatch]);

    // Handle successful plane creation
  useEffect(() => {
      if (createdPlane && !loadingCreatePlane && !errorCreatePlane) {
          alert("New plane added successfully!");
          handleReset();
          navigate(`/manajemen-pesawat/${airlineId}`); // Navigate back to plane list
      } else if (errorCreatePlane && !loadingCreatePlane) {
          alert(`Error adding plane: ${errorCreatePlane}`);
      }
  }, [createdPlane, loadingCreatePlane, errorCreatePlane, navigate, airlineId]);


  // --- Handlers ---

  const handleInputChange = (e) => setName(e.target.value);
  const handleTypeSelect = (e) => setSelectedTypeId(e.target.value);

  const handleTypeInputChange = (e) => {
    const { name, value } = e.target;
    setNewType({ ...newType, [name]: value });
  };

  const handleClassInputChange = (e) => {
    const { name, value } = e.target;
    setNewClass({ ...newClass, [name]: value });
  };

  // Dispatch createPlaneType action
  const handleAddType = () => {
    if (!newType.name || !newType.manufacture) {
      alert("Please fill in all fields for the new type.");
      return;
    }
    dispatch(createPlaneType(newType));
  };

  // Add class to local state (seatCategories)
  const handleAddClass = () => {
    if (!newClass.name || !newClass.price) {
      alert("Please fill in all fields for the new class.");
      return;
    }
    const priceAsNumber = parseFloat(newClass.price.replace(/[^0-9]/g, '')); // Ensure price is a number
    if (isNaN(priceAsNumber)) {
        alert("Please enter a valid number for the price.");
        return;
    }
    setSeatCategories([...seatCategories, { name: newClass.name, price: priceAsNumber }]);
    setNewClass({ name: '', price: '' });
    setShowClassModal(false);
  };

   // Remove a class from the local list
  const handleRemoveClass = (indexToRemove) => {
    setSeatCategories(seatCategories.filter((_, index) => index !== indexToRemove));
  };

  const handleReset = () => {
    setName('');
    setSelectedTypeId('');
    setSeatCategories([]);
  };

  // Dispatch createPlane action
  const handleSubmit = () => {
    if (!name || !selectedTypeId || seatCategories.length === 0) {
      alert("Please fill in Name, Type, and add at least one Class.");
      return;
    }
    if (!airlineId) {
        alert("Airline ID is missing. Cannot add plane.");
        return;
    }

    const planeData = {
      planeTypeId: selectedTypeId,
      airlineId: airlineId,
      name: name,
      seatCategories: seatCategories,
    };

    dispatch(createPlane(planeData));
  };

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-screen transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        {/* Breadcrumbs */}
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">Airline Management</p>
            <p className="text-xs pt-2 text-gray-600">Add Plane</p>
          </div>
          <div className="flex flex-row justify-end">
            <Link to="/manajemen-maskapai" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <i className="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
            <Link to={`/manajemen-pesawat/${airlineId}`} className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0 ml-1">
              <p>/</p>
              <p className="text-xs md:text-sm">Plane List</p>
            </Link>
            <Link to={`/tambah-pesawat/${airlineId}`} className="flex items-center gap-1 text-black pt-9 md:pt-0 ml-1">
              <p>/</p>
              <p className="text-xs md:text-sm">Add Plane</p>
            </Link>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="flex-col px-4 items-center">
            <div className="text-left md:text-xl mb-6 md:mb-12">
              <p>Add New Plane</p>
            </div>

            {/* Name input */}
            <div className="flex flex-col mb-2 md:mb-4 items-center">
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700">
                  <span className="text-red-700 mr-1">*</span>Name
                </label>
                <div className="md:w-96 w-64">
                  <div className="flex w-full items-center border rounded-lg p-2 bg-gray-100">
                    <i className="ri-pencil-fill text-gray-500 mr-2"></i>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleInputChange}
                      placeholder="Name plane"
                      className="w-full bg-transparent focus:outline-none"
                      disabled={loadingCreatePlane}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Type dropdown */}
            <div className="flex flex-col mb-2 md:mb-4 items-center">
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700">
                  <span className="text-red-700 mr-1">*</span>Type
                </label>
                <div className="md:w-96 w-64">
                  <div className="flex items-center">
                    <div className="relative w-full">
                      <select
                        value={selectedTypeId}
                        onChange={handleTypeSelect}
                        className="w-full p-2 border rounded-lg bg-gray-100 focus:outline-none appearance-none"
                        style={{ minHeight: "42px" }}
                        disabled={loadingPlaneTypes || loadingCreatePlane}
                      >
                        <option value="">{loadingPlaneTypes ? "Loading..." : "Select Type"}</option>
                        {planeTypeList.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.name} ({type.manufacture})
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <i className="fas fa-chevron-down text-gray-500"></i>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowTypeModal(true)}
                      className="ml-2 bg-white p-2 rounded-full shadow-md disabled:opacity-50"
                      disabled={loadingCreatePlane}
                    >
                      <i className="fas fa-plus text-gray-500"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Class section */}
            <div className="flex flex-col mb-2 md:mb-4 items-center">
              <div className="text-left">
                 <label className="block text-sm font-semibold text-gray-700">
                    <span className="text-red-700 mr-1">*</span>Class
                 </label>
                 <div className="md:w-96 w-64">
                    <div className="flex items-start">
                       <div className="relative w-full border rounded-lg bg-gray-100 p-2 min-h-10">
                          {seatCategories.length === 0 ? (
                             <span className="text-gray-400">No classes added yet.</span>
                          ) : (
                             <div className="flex flex-wrap gap-2">
                                {seatCategories.map((cls, index) => (
                                   <div key={index} className="bg-gray-300 rounded px-3 py-1 flex items-center text-sm">
                                      {cls.name} (Rp {cls.price.toLocaleString()})
                                      <button
                                         onClick={() => handleRemoveClass(index)}
                                         className="ml-2 text-red-500 hover:text-red-700 disabled:opacity-50"
                                         disabled={loadingCreatePlane}
                                      >
                                         <i className="fas fa-times-circle"></i>
                                      </button>
                                   </div>
                                ))}
                             </div>
                          )}
                       </div>
                       <button
                          onClick={() => setShowClassModal(true)}
                          className="ml-2 bg-white p-2 rounded-full shadow-md disabled:opacity-50"
                          disabled={loadingCreatePlane}
                       >
                          <i className="fas fa-plus text-gray-500"></i>
                       </button>
                    </div>
                 </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row justify-center gap-6 text-white font-bold mt-12 mb-10">
              <Button
                text="Reset"
                bgColor="bg-yellow1"
                onClick={handleReset}
                disabled={loadingCreatePlane}
              />
              <Button
                text={loadingCreatePlane ? "Submitting..." : "Submit"}
                bgColor="bg-blue1"
                onClick={handleSubmit}
                disabled={loadingCreatePlane}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal for adding a new type */}
      {showTypeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-purple-50 p-6 rounded-lg w-80">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Type</h2>
              <button onClick={() => setShowTypeModal(false)} className="text-gray-500" disabled={loadingCreatePlaneType}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Type Name</label>
              <input
                type="text"
                name="name"
                value={newType.name}
                onChange={handleTypeInputChange}
                placeholder="e.g., Airbus A380"
                className="w-full p-2 border rounded-lg"
                disabled={loadingCreatePlaneType}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Manufacture</label>
              <input
                type="text"
                name="manufacture"
                value={newType.manufacture}
                onChange={handleTypeInputChange}
                placeholder="e.g., Airbus"
                className="w-full p-2 border rounded-lg"
                disabled={loadingCreatePlaneType}
              />
            </div>
            <div className="flex justify-end">
              <button onClick={handleAddType} className="bg-purple-700 text-white px-4 py-2 rounded" disabled={loadingCreatePlaneType}>
                {loadingCreatePlaneType ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for adding a new class */}
      {showClassModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-purple-50 p-6 rounded-lg w-80">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Class</h2>
              <button onClick={() => setShowClassModal(false)} className="text-gray-500">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Class Name</label>
              <input
                type="text"
                name="name"
                value={newClass.name}
                onChange={handleClassInputChange}
                placeholder="e.g., Economy"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Price</label>
              <input
                type="text" // Keep as text to allow formatting, but parse as number
                name="price"
                value={newClass.price}
                onChange={handleClassInputChange}
                placeholder="e.g., 200000"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="flex justify-end">
              <button onClick={handleAddClass} className="bg-purple-700 text-white px-4 py-2 rounded">
                Add Class
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TambahPesawat;