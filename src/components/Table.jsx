import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Table = ({ searchQuery, users = [] }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const navigate = useNavigate();

  // Sorting logic
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: 
        prev.key === key ? 
        prev.direction === 'asc' ? 'desc' : 'default' : 
        'asc'
    }));
  };

  // Sort data
  const sortedData = [...users].sort((a, b) => {
    if (!sortConfig.key || sortConfig.direction === "default") return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    return sortConfig.direction === 'asc' ? 
      aValue.localeCompare?.(bValue) ?? aValue - bValue :
      bValue.localeCompare?.(aValue) ?? bValue - aValue;
  });

  // Filter data
  const filteredData = sortedData.filter(user =>
    `${user.name} ${user.email}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Row editing handlers
  const handleEditToggle = (email) => {
    setEditingRow(editingRow === email ? null : email);
  };

  const handleNameClick = (email) => {
    if (editingRow === email) {
      navigate(`/edit-pengguna/${encodeURIComponent(email)}`);
      setEditingRow(null);
    }
  };

  // const handleAmountClick = (id, email) => {
  //   if (editingRow === email) {
  //     navigate(`/edit-saldo-pengguna/${id}`);
  //   }
  // };

  const handleAmountClick = (id, email, currentAmount) => {
    if (editingRow === email) {
      navigate(`/edit-saldo-pengguna/${id}`, {
        state: { currentAmount } // Pass current amount via navigation state
      });
    }
  };

  // Delete handlers
  const confirmDelete = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  const handleDelete = () => {
    // Add actual delete implementation
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
              filteredData.map((user) => {
                const isEditing = editingRow === user.email;
                return (
                  <tr key={user.id} className="border-b hover:bg-gray-100">
                    <td 
                      className={`py-2 px-3 border ${
                        isEditing ? "text-blue-500 cursor-pointer underline" : ""
                      }`}
                      onClick={() => handleNameClick(user.email)}
                    >
                      {user.name}
                    </td>
                    
                    <td className="py-2 px-3 border">{user.email}</td>
                    
                    <td className="py-2 px-3 border">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    <td
                      className={`py-2 px-3 border ${
                        isEditing ? "text-blue-500 cursor-pointer underline" : ""
                      }`}
                      onClick={() => handleAmountClick(user.id, user.email, user.currentAmount)}
                    >
                      Rp.{user.currentAmount.toLocaleString()}
                    </td>
                    
                    <td className="flex py-2 px-3 text-center justify-center">
                      <button 
                        onClick={() => handleEditToggle(user.email)}
                        className={`hover:text-ungu7 transition-colors ${
                          isEditing ? "text-green-500" : ""
                        }`}
                      >
                        <i className="ri-edit-2-line text-2xl"></i>
                      </button>
                      <button 
                        className="text-red-500 mx-1 hover:text-red-700 transition-colors"
                        onClick={() => confirmDelete(user.id)}
                      >
                        <i className="ri-delete-bin-5-line text-2xl"></i>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  {searchQuery 
                    ? `Tidak ada hasil untuk "${searchQuery}"`
                    : "Tidak ada pengguna"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete confirmation modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-gray-200 p-6 rounded-md shadow-md">
            <p className="text-xs md:text-lg font-semibold mb-4">
              Anda yakin ingin menghapus pengguna ini?
            </p>
            <div className="flex justify-center text-xs md:text-base">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-500 transition-colors"
                onClick={() => setModalOpen(false)}
              >
                Batal
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
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