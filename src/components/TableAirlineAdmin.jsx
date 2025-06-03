import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMitraRequest, deleteMitra } from "../redux/actions/mitraAction"; // Import deleteMitra
import { useNavigate, useParams } from "react-router-dom";

const TableAirlineAdmin = ({ searchQuery, onMitraSelect, selectedMitraId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mitraId } = useParams(); // Get mitraId from URL parameters

  // Mengambil data dan status loading/error dari Redux store
  const { mitraList, loadingFetch, errorFetch, loadingDelete, errorDelete } = useSelector((state) => state.mitra);
  
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // ID yang akan dihapus
  const [isDeleting, setIsDeleting] = useState(false); // Status untuk tracking delete

  // Fetch data airlines berdasarkan mitraId
  useEffect(() => {
    if (mitraId) {
      dispatch(fetchMitraRequest(mitraId));
    }
  }, [dispatch, mitraId]);

  // Effect untuk menangani hasil delete (sukses atau error)
  useEffect(() => {
    // Cek jika proses delete baru saja selesai (loading berubah dari true ke false)
    if (isDeleting && !loadingDelete) {
      if (errorDelete) {
        alert(`Error deleting airline: ${errorDelete}`);
      } else {
        alert(`Airline with ID ${deleteId} deleted successfully!`);
        // Reset ID setelah berhasil
        setDeleteId(null);
      }
      // Reset status tracking
      setIsDeleting(false);
    }
  }, [loadingDelete, errorDelete, isDeleting, deleteId]);

  const mitraData = Array.isArray(mitraList) ? mitraList : [];

  // Fungsi sorting
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

  const sortedData = [...mitraData].sort((a, b) => {
    if (sortConfig.direction === "default" || sortConfig.key === null) return 0;
    const valA = a[sortConfig.key]?.toString().toLowerCase();
    const valB = b[sortConfig.key]?.toString().toLowerCase();
    if (sortConfig.direction === "asc") return valA > valB ? 1 : -1;
    if (sortConfig.direction === "desc") return valA < valB ? 1 : -1;
    return 0;
  });

  const filteredData = sortedData.filter((airline) =>
    airline.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fungsi konfirmasi hapus
  const confirmDelete = (id) => {
    setDeleteId(id); // Set ID yang akan dihapus
    setModalOpen(true);
  };

  // Handle hapus data
  const handleDelete = () => {
    if (deleteId) {
      setIsDeleting(true); // Mulai tracking proses delete
      dispatch(deleteMitra(deleteId)); // Panggil action deleteMitra dengan airlineId
      setModalOpen(false); // Tutup modal
    }
  };

  const handleAirplaneClick = (airline) => {
    console.log("Navigating to planes for airline:", airline.name);

    // Store the selected airline in localStorage for persistence
    localStorage.setItem('selectedAirline', JSON.stringify(airline));

    // Call onMitraSelect callback if provided
    if (onMitraSelect) {
      onMitraSelect(airline);
    }

    // Navigate to the plane management page with the airline ID
    // Pass the airline object in state for immediate access
    navigate(`/manajemen-pesawat-admin/${airline.id}`, {
      state: { airline: airline }
    });
  };

  if (loadingFetch) return <p className="p-4 text-center">Loading airlines...</p>;
  if (errorFetch) return <p className="p-4 text-center text-red-600">Error: {errorFetch}</p>;

  if (!mitraId) {
    return <p className="p-4 text-center">Please select a mitra first to see its airlines.</p>;
  }

  return (
    <div className="p-4">
      <div className="overflow-x-auto shadow-md rounded-2xl">
        <table className="min-w-full bg-white border roun border-gray-300">
          <thead>
            <tr className="bg-purple-200  text-gray-700 uppercase text-sm leading-normal">
              {["Name", "Description"].map((col) => (
                <th
                  key={col}
                  className="py-2 px-3 border cursor-pointer"
                  onClick={() => handleSort(col.toLowerCase())}
                >
                  {col} <i className="ml-1 ri-arrow-up-down-line"></i>
                </th>
              ))}
              <th className="py-2 px-3 border">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredData.length > 0 ? (
              filteredData.map((airline) => (
                <tr key={airline.id} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-3 border text-center">{airline.name}</td>
                  <td className="py-2 px-3 border text-center">{airline.description}</td>
                  <td className="flex py-2 px-3 justify-center gap-2">
                    <button title="Detail" onClick={() => handleAirplaneClick(airline)}>
                      <svg className="text-blue-400" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M20.56 3.91c.59.59.59 1.54 0 2.12l-3.89 3.89l2.12 9.19l-1.41 1.42l-3.88-7.43L9.6 17l.36 2.47l-1.07 1.06l-1.76-3.18l-3.19-1.77L5 14.5l2.5.37L11.37 11L3.94 7.09l1.42-1.41l9.19 2.12l3.89-3.89c.56-.58 1.56-.58 2.12 0"></path></svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No airlines found for this mitra.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableAirlineAdmin