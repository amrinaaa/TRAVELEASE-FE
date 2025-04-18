import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Table = ({ searchQuery, users = [] }) => {
  const [editableRow, setEditableRow] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

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

  const sortedData = [...users].sort((a, b) => {
    if (!sortConfig.key || sortConfig.direction === "default") return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (sortConfig.direction === "asc") {
      return aValue.localeCompare?.(bValue) ?? aValue - bValue;
    }
    return bValue.localeCompare?.(aValue) ?? bValue - aValue;
  });

  const filteredData = sortedData.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // These would be connected to Redux actions in a real implementation
  const confirmDelete = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  const handleDelete = () => {
    // Dispatch delete action here
    setModalOpen(false);
    setDeleteId(null);
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto shadow-md">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              {["name", "email", "createdAt", "currentAmount"].map((col) => (
                <th 
                  key={col} 
                  className="py-2 px-1 border cursor-pointer"
                  onClick={() => handleSort(col)}
                >
                  {col.charAt(0).toUpperCase() + col.slice(1).replace(/([A-Z])/g, ' $1')}
                  <i className="ml-1 ri-arrow-up-down-line"></i>
                </th>
              ))}
              <th className="py-2 px-3 border">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredData.length > 0 ? (
              filteredData.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-100">
                  <td 
                    className={`py-2 px-3 border ${editableRow === user.id ? "text-blue-500 cursor-pointer underline" : ""}`}
                    onClick={() => {
                      if (editableRow === user.id) {
                        navigate(`/edit-pengguna/${user.id}`);
                      }
                    }}
                  >
                    {user.name}
                  </td>

                  <td className="py-2 px-3 border">{user.email}</td>

                  <td className="py-2 px-3 border">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  <td 
                    className={`py-2 px-3 border ${editableRow === user.id ? "text-blue-500 cursor-pointer underline" : ""}`}
                    onClick={() => {
                      if (editableRow === user.id) {
                        navigate(`/edit-saldo-pengguna/${user.id}`);
                      }
                    }}
                  >
                    Rp.{user.currentAmount.toLocaleString()}
                  </td>

                  <td className="flex py-2 px-3 text-center justify-center">
                    <button onClick={() => setEditableRow(user.id)}>
                      <i className="ri-edit-2-line text-2xl"></i>
                    </button>
                    <button 
                      className="text-red-500 mx-1" 
                      onClick={() => confirmDelete(user.id)}
                    >
                      <i className="ri-delete-bin-5-line text-2xl"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  {searchQuery ? `Tidak ada hasil untuk "${searchQuery}"` : "Tidak ada pengguna"}
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
              Anda yakin ingin menghapus pengguna ini?
            </p>
            <div className="flex justify-center text-xs md:text-base">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => setModalOpen(false)}
              >
                Batal
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleDelete}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;