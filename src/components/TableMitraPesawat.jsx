import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteHotelPartner } from "../redux/actions/adminPesawatActions"; // Import delete action

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
      if (prev.key === key) {
        if (prev.direction === "default") return { key, direction: "asc" };
        if (prev.direction === "asc") return { key, direction: "desc" };
        return { key: null, direction: "default" };
      }
      return { key, direction: "asc" };
    });
  };

  const sortedData = [...hotels].sort((a, b) => {
    if (sortConfig.direction === "default" || sortConfig.key === null) return 0;
    if (sortConfig.direction === "asc") return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    if (sortConfig.direction === "desc") return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    return 0;
  });

  const filteredData = sortedData.filter((mitra) =>
    mitra.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mitra.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const confirmDelete = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  const handleDelete = () => {
    if (deleteId) {
      dispatch(deleteHotelPartner(deleteId)); // Dispatch the delete action
      setModalOpen(false);
      setDeleteId(null);
    }
  };

  const handleEditNavigation = (mitra) => {
    if (editableRow === mitra.id) {
      navigate(`/edit-mitra-pesawat/${mitra.name}`);
    }
  };

  const handleSaldoNavigation = (mitra) => {
    if (editableRow === mitra.id) {
      navigate(`/edit-saldo-mitra-pesawat/${mitra.id}`);
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
              {["id", "name", "email", "Sign-up date", "saldo", "status"].map((col) => (
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
                  <td className="py-2 px-3 border text-center">{mitra.id}</td>
                  <td
                    className={`py-2 px-3 border ${editableRow === mitra.id ? "text-blue-500 cursor-pointer underline" : ""}`}
                    onClick={() => handleEditNavigation(mitra)}
                  >
                    {mitra.name}
                  </td>
                  <td className="py-2 px-3 border">{mitra.email}</td>
                  <td className="py-2 px-3 border">{new Date(mitra.createdAt).toLocaleDateString()}</td>
                  <td
                     className={`py-2 px-3 border ${editableRow === mitra.id ? "text-blue-500 cursor-pointer underline" : ""}`}
                     onClick={() => handleSaldoNavigation(mitra)}
                   >
                     Rp.{mitra.currentAmount}
                   </td>
                  <td className="py-2 px-3 border">Active</td>
                  <td className="flex py-2 px-3 text-center justify-center">
                    <button onClick={() => handleEditClick(mitra.id)}>
                      <i className="ri-edit-2-line text-2xl"></i>
                    </button>
                    <button className="text-red-500 mx-1" onClick={() => confirmDelete(mitra.id)}>
                      <i className="ri-delete-bin-5-line text-2xl"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  Tidak ada hasil ditemukan.
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
              Anda yakin ingin menghapus {deleteId}?
            </p>
            <div className="flex justify-center text-xs md:text-base">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => setModalOpen(false)}
              >
                No
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleDelete}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableMitraPesawat;
