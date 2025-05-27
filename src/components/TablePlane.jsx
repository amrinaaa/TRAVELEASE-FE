import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dataPesawat from "../utils/dataPesawat.json";


const TablePlane = ({ searchQuery }) => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setData(dataPesawat); // Use the dummy data
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

  const filteredData = sortedData.filter((plane) =>
    plane.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to confirm deletion
  const confirmDelete = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  // Handle deletion of data
  const handleDelete = () => {
    setData((prevData) => prevData.filter((plane) => plane.id !== deleteId));
    setModalOpen(false);
    setDeleteId(null);
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto shadow-md rounded-2xl">
        <table className="min-w-full bg-white border roun border-gray-300">
          <thead>
            <tr className="bg-purple-200  text-gray-700 uppercase text-sm leading-normal">
              {["Name", "Type", "Class"].map((col) => (
                <th
                  key={col}
                  className="py-2 px-3 border cursor-pointer"
                  onClick={() => handleSort(col.toLowerCase())}
                >
                  {col.charAt(0).toUpperCase() + col.slice(1)}{" "}
                  <i className="ml-1 ri-arrow-up-down-line"></i>
                </th>
              ))}
              <th className="py-2 px-3 border">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredData.length > 0 ? (
              filteredData.map((plane) => (
                <tr key={plane.id} className="border-b hover:bg-gray-100">

                  <td className="py-2 px-3 border text-center">{plane.name}</td>

                  <td className="py-2 px-3 border text-center">{plane.type}</td>

                  <td className="py-2 px-3 border text-center">{plane.class}</td>

                  <td className="flex py-2 px-3 text-center justify-center">
                    <button onClick={() => navigate(`/tambah-penerbangan/${plane.id}`)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M16 9c-.91 0-1.77.18-2.57.5l-.7-3.05l3.89-3.89c.58-.56.58-1.53 0-2.12s-1.54-.586-2.12 0l-3.89 3.89l-9.2-2.12L0 3.62L7.43 7.5l-3.89 3.9l-2.48-.35L0 12.11l3.18 1.76l1.77 3.19L6 16l-.34-2.5l3.89-3.87l1.02 1.96A6.995 6.995 0 0 0 16 23c3.87 0 7-3.13 7-7s-3.13-7-7-7m0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5m.5-4.75V12H15v5l3.61 2.16l.75-1.22z"></path></svg>
                    </button>
                    <button onClick={() => navigate(`/edit-pesawat/${plane.id}`)}>
                      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=chair_alt" />
                      <span class="material-symbols-outlined mt-1 ml-1">chair_alt</span>
                    </button>
                    <button className="text-red-500 mx-1" onClick={() => confirmDelete(plane.id)}>
                      <i className="ri-delete-bin-5-line text-2xl"></i>
                    </button>
                  </td>
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
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-gray-200 p-6 rounded-md shadow-md">
            <p className="text-xs md:text-lg font-semibold mb-4">
              Are you sure you want to delete {deleteId}?
            </p>
            <div className="flex justify-center text-xs md:text-base">
              <button className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2" onClick={() => setModalOpen(false)}>
                No
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={handleDelete}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TablePlane