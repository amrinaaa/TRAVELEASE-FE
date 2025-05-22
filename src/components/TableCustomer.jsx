import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dataCustomer from "../utils/dataCustomer.json";


const Tablecustomer = ({ searchQuery }) => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setData(dataCustomer); // Use the dummy data
  }, []);

  // Function to handle sorting
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === "default") return { key, direction: "asc" };
        if (prev.direction === "asc") return { key, direction: "desc" };
        return { key: null, direction: "default" }; // Reset to default order
      }
      return { key, direction: "asc" }; // If changing columns, start from ascending
    });
  };

  // Sort data according to config
  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.direction === "default" || sortConfig.key === null) return 0;
    if (sortConfig.direction === "asc") return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    if (sortConfig.direction === "desc") return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    return 0;
  });

  const filteredData = sortedData.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to confirm deletion
  const confirmDelete = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  // Handle deletion of data
  const handleDelete = () => {
    setData((prevData) => prevData.filter((customer) => customer.id !== deleteId));
    setModalOpen(false);
    setDeleteId(null);
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto shadow-md">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              {["Name", "NIK", "Gender", "Age Category", "Class", "Seat"].map((col) => (
                <th
                  key={col}
                  className="py-2 px-3 border cursor-pointer"
                  onClick={() => handleSort(col.toLowerCase())}
                >
                  {col.charAt(0).toUpperCase() + col.slice(1)}{" "}
                  <i className="ml-1 ri-arrow-up-down-line"></i>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredData.length > 0 ? (
              filteredData.map((customer) => (
                <tr key={customer.id} className="border-b hover:bg-gray-100">

                  <td className="py-2 px-3 border text-center">{customer.name}</td>
                  <td className="py-2 px-3 border text-center">{customer.nik}</td>
                  <td className="py-2 px-3 border text-center">{customer.gender}</td>
                  <td className="py-2 px-3 border text-center">{customer.ageCategory}</td>
                  <td className="py-2 px-3 border text-center">{customer.class}</td>
                  <td className="py-2 px-3 border text-center">{customer.seat}</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tablecustomer