import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dataMitraHotel from "../utils/dataMitraHotel.json";
import dataMitraPesawat from "../utils/dataMitraPesawat.json";

const TableMitra = ({ searchQuery, dataType }) => {
  const [data, setData] = useState([]);
  const [editableRow, setEditableRow] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (dataType === "hotel") {
      setData(dataMitraHotel);  // Set data as hotel data
    } else if (dataType === "pesawat") {
      setData(dataMitraPesawat);  // Set data as airline data
    }
  }, [dataType]);  // Re-run when `dataType` changes

  const handleEditClick = (id) => {
    // Toggle editable row
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

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.direction === "default" || sortConfig.key === null) return 0;
    if (sortConfig.direction === "asc") return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    if (sortConfig.direction === "desc") return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    return 0;
  });

  const filteredData = sortedData.filter((mitra) =>
    mitra.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const confirmDelete = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  const handleDelete = () => {
    setData((prevData) => prevData.filter((mitra) => mitra.id !== deleteId));
    setModalOpen(false);
    setDeleteId(null);
  };

  const handleEditNavigation = (mitra) => {
    if (editableRow === mitra.id) {
      if (dataType === "hotel") {
        navigate(`/edit-mitra-hotel/${mitra.id}`);
      } else if (dataType === "pesawat") {
        navigate(`/edit-mitra-pesawat/${mitra.id}`);
      }
    }
  };

  const handleSaldoNavigation = (mitra) => {
    if (editableRow === mitra.id) {
      if (dataType === "hotel") {
        navigate(`/edit-saldo-mitra-hotel/${mitra.id}`);
      } else if (dataType === "pesawat") {
        navigate(`/edit-saldo-mitra-pesawat/${mitra.id}`);
      }
    }
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto shadow-md">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
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
                    {mitra.nama}
                  </td>
                  <td className="py-2 px-3 border">{mitra.email}</td>
                  <td className="py-2 px-3 border">{mitra.tanggalDaftar}</td>
                  <td
                    className={`py-2 px-3 border ${editableRow === mitra.id ? "text-blue-500 cursor-pointer underline" : ""}`}
                    onClick={() => handleSaldoNavigation(mitra)}
                  >
                    Rp.{mitra.saldo}
                  </td>
                  <td className="py-2 px-3 border">{mitra.status}</td>
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
                <td colSpan="6" className="text-center py-4 text-gray-500">
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

export default TableMitra