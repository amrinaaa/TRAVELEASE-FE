import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dataRuangan from "../utils/dataRuangan.json";

const TableRoom = ({ searchQuery }) => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setData(dataRuangan);
  }, []);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === "default") return { key, direction: "asc" };
        if (prev.direction === "asc") return { key, direction: "desc" };
        return { key: null, direction: "default" };
      }
      return { key, direction: "asc" };
    });
  };

  const sortedData = [...data].sort((a, b) => {
    const key = sortConfig.key;
    if (sortConfig.direction === "default" || !key) return 0;
    const aVal = a[key]?.toString().toLowerCase();
    const bVal = b[key]?.toString().toLowerCase();
    if (sortConfig.direction === "asc") return aVal > bVal ? 1 : -1;
    if (sortConfig.direction === "desc") return aVal < bVal ? 1 : -1;
    return 0;
  });

  const filteredData = sortedData.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const confirmDelete = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedData = data.map((room) =>
      room.id === id ? { ...room, status: newStatus } : room
    );
    setData(updatedData);
  };

  const handleDelete = () => {
    setData((prev) => prev.filter((room) => room.id !== deleteId));
    setModalOpen(false);
    setDeleteId(null);
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto shadow-md rounded-2xl">
        <table className="min-w-full bg-white border roun border-gray-300">
          <thead>
            <tr className="bg-purple-200  text-gray-700 uppercase text-sm leading-normal">
              {["ID", "Name", "Type", "Price", "Facilities", "Status"].map((col) => (
                <th
                  key={col}
                  className="py-2 px-3 border cursor-pointer"
                  onClick={() => handleSort(col.toLowerCase())}
                >
                  {col}
                  <i className="ml-1 ri-arrow-up-down-line"></i>
                </th>
              ))}
              <th className="py-2 px-3 border">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {filteredData.length > 0 ? (
              filteredData.map((room) => (
                <tr key={room.id} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-3 border text-center">{room.id}</td>
                  <td className="py-2 px-3 border text-center">{room.name}</td>
                  <td className="py-2 px-3 border text-center">{room.type}</td>
                  <td className="py-2 px-3 border text-center">{room.price}</td>
                  <td className="py-2 px-3 border text-center truncate max-w-xs" title={room.facilities?.join(", ")}>
                    {room.facilities?.slice(0, 3).join(", ") + (room.facilities?.length > 3 ? ", ..." : "")}
                  </td>
                  <td className="py-2 px-3 border text-center">
                    <select
                      value={room.status}
                      onChange={(e) => handleStatusChange(room.id, e.target.value)}
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        room.status === "Available"
                          ? "bg-green-500 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      <option value="Available">Available</option>
                      <option value="Not Available">Not Available</option>
                    </select>
                  </td>
                  <td className="flex justify-center py-2 px-3 gap-2">
                    <button onClick={() => navigate(`/edit-ruangan/${room.id}`)} title="Edit">
                      <i className="ri-edit-2-line text-xl"></i>
                    </button>
                    <button className="text-red-500" onClick={() => confirmDelete(room.id)} title="Delete">
                      <i className="ri-delete-bin-5-line text-xl"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Delete Confirmation */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <p className="text-sm md:text-base font-semibold mb-4">
              Are you sure you want to delete ID {deleteId}?
            </p>
            <div className="flex justify-center space-x-4">
              <button onClick={() => setModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded">
                Cancel
              </button>
              <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableRoom