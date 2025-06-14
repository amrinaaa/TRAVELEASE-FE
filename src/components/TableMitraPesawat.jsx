import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteHotelPartner } from "../redux/actions/adminPesawatActions";

const TableMitraPesawat = ({ searchQuery, dataType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hotels, loadingFetch, errorFetch, loadingDelete, errorDelete } = useSelector((state) => state.adminPesawat);

  const [editableRow, setEditableRow] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleEditClick = (id) => {
    setEditableRow((prev) => (prev === id ? null : id));
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      let direction = "asc";
      if (prev.key === key) {
        if (prev.direction === "asc") {
          direction = "desc";
        } else if (prev.direction === "desc") {
          direction = "default";
          key = null; // Reset key saat kembali ke default
        }
      }
      return { key, direction };
    });
  };

  const sortedData = [...hotels].sort((a, b) => {
      if (!sortConfig.key || sortConfig.direction === "default") return 0;

      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue == null) return sortConfig.direction === 'asc' ? -1 : 1;
      if (bValue == null) return sortConfig.direction === 'asc' ? 1 : -1;

      // Handle sorting for 'createdAt' (date)
      if (sortConfig.key === 'createdAt') {
          return sortConfig.direction === 'asc'
              ? new Date(aValue) - new Date(bValue)
              : new Date(bValue) - new Date(aValue);
      }

      // Handle sorting for string and number
      if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc'
              ? aValue.localeCompare(bValue)
              : bValue.localeCompare(aValue);
      } else {
          return sortConfig.direction === 'asc'
              ? aValue - bValue
              : bValue - aValue;
      }
  });


  const filteredData = sortedData.filter((mitra) =>
    (mitra.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (mitra.email?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  const confirmDelete = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  const handleDelete = () => {
    if (deleteId) {
      dispatch(deleteHotelPartner(deleteId)); // Gunakan action delete yang sesuai
      setModalOpen(false);
      setDeleteId(null);
    }
  };

  const handleEditNavigation = (mitra) => {
    if (editableRow === mitra.id) {
      // Navigasi ke edit mitra pesawat menggunakan nama
      navigate(`/edit-mitra-pesawat/${mitra.name}`);
    }
  };

  const handleSaldoNavigation = (mitra) => {
    if (editableRow === mitra.id) {
      navigate(`/edit-saldo-mitra-pesawat/${mitra.id}`, {
        // Kirim currentAmount melalui state
        state: { currentAmount: mitra.currentAmount }
      });
    }
  };

  if (loadingFetch) {
    return <div className="p-4 text-center">Loading data...</div>;
  }

  if (errorFetch) {
    return <div className="p-4 text-center text-red-500">Error: {errorFetch}</div>;
  }

  return (
    <div className="p-4">
      <div className="overflow-x-auto shadow-md rounded-2xl">
        <table className="min-w-full bg-white border roun border-gray-300">
          <thead>
            <tr className="bg-purple-200  text-gray-700 uppercase text-sm leading-normal">
              {["name", "email", "Sign-up date", "saldo"].map((col) => (
                <th key={col} className="py-2 px-1 border cursor-pointer" onClick={() => handleSort(col)}>
                  {col.charAt(0).toUpperCase() + col.slice(1)}
                  <i className="ml-1 ri-arrow-up-down-line"></i>
                </th>
              ))}
              <th className="py-2 px-3 border">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredData.length > 0 ? (
              filteredData.map((mitra) => (
                <tr key={mitra.id} className="border-b hover:bg-gray-100">
                  <td
                    className={`py-2 px-3 border ${editableRow === mitra.id ? "text-blue-500 cursor-pointer underline" : ""}`}
                    onClick={() => handleEditNavigation(mitra)}
                  >
                    {mitra.name || 'N/A'}
                  </td>
                  <td className="py-2 px-3 border">{mitra.email || 'N/A'}</td>
                  <td className="py-2 px-3 border">
                    {mitra.createdAt ? new Date(mitra.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td
                     className={`py-2 px-3 border ${editableRow === mitra.id ? "text-blue-500 cursor-pointer underline" : ""}`}
                     onClick={() => handleSaldoNavigation(mitra)}
                   >
                     Rp.{(mitra.currentAmount || 0).toLocaleString()}
                   </td>
                  <td className="flex py-2 px-3 text-center justify-center">
                    <button
                        onClick={() => handleEditClick(mitra.id)}
                        className={`hover:text-ungu7 transition-colors ${
                          editableRow === mitra.id ? "text-green-500" : ""
                        }`}
                    >
                      <i className="ri-edit-2-line text-2xl"></i>
                    </button>
                    <button
                      className="ml-1 text-blue1 hover:text-blue-400"
                      onClick={() => navigate(`/mitra-pesawat-admin/${mitra.id}`)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                          <path d="m11 17l2 2a1 1 0 1 0 3-3"/>
                          <path d="m14 14l2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/>
                          <path d="m21 3l1 11h-2M3 3L2 14l6.5 6.5a1 1 0 1 0 3-3M3 4h8"/>
                        </g>
                      </svg>
                    </button>
                    <button
                        className="text-red-500 mx-1 hover:text-red-700 transition-colors"
                        onClick={() => confirmDelete(mitra.id)}
                    >
                      <i className="ri-delete-bin-5-line text-2xl"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  {searchQuery
                    ? `Tidak ada hasil untuk "${searchQuery}"`
                    : "Tidak ada data mitra pesawat"} {/* FIX: Teks diubah */}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Konfirmasi Hapus */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-gray-200 p-6 rounded-md shadow-md">
            <p className="text-xs md:text-lg font-semibold mb-4">
              Anda yakin ingin menghapus mitra dengan ID {deleteId}?
            </p>

            {errorDelete && (
                <div className="text-red-500 text-sm mb-4 text-center">
                    Error: {errorDelete}
                </div>
            )}

            <div className="flex justify-center text-xs md:text-base">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-500 transition-colors"
                onClick={() => setModalOpen(false)}
                disabled={loadingDelete}
              >
                Batal
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors disabled:bg-red-300"
                onClick={handleDelete}
                disabled={loadingDelete}
              >
                {loadingDelete ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableMitraPesawat;