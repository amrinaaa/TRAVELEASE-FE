import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMitraRequest, deleteMitra } from "../redux/actions/mitraAction"; // Import deleteMitra
import { useNavigate } from "react-router-dom";

const TableAirline = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mitraList, loadingFetch, errorFetch, loadingDelete, errorDelete } = useSelector((state) => state.mitra); // Get loadingDelete and errorDelete
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(fetchMitraRequest());
  }, [dispatch]);

  // Effect to handle success or error after deleting mitra
  useEffect(() => {
    if (!loadingDelete && !errorDelete && deleteId && !modalOpen) { // Check if delete was successful and modal is closed
      alert("Airline deleted successfully!");
      setDeleteId(null); // Clear deleteId after successful deletion
    }
    if (errorDelete) {
      alert(`Error deleting airline: ${errorDelete}`);
      setDeleteId(null); // Clear deleteId even on error
    }
  }, [loadingDelete, errorDelete, deleteId, modalOpen]);


  const mitraData = Array.isArray(mitraList) ? mitraList : [];

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

  const confirmDelete = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  const handleDelete = () => {
    dispatch(deleteMitra(deleteId)); // Dispatch the deleteMitra action with the airline ID
    setModalOpen(false); // Close the modal immediately after dispatching
  };

  const handleAirplaneClick = (airline) => {
    console.log("Navigating to planes for airline:", airline.name);

    // Store the selected airline in localStorage for persistence
    localStorage.setItem('selectedAirline', JSON.stringify(airline));

    // Navigate to the plane management page with the airline ID
    // Pass the airline object in state for immediate access
    navigate(`/manajemen-pesawat/${airline.id}`, {
      state: { airline: airline }
    });
  };

  if (loadingFetch) return <p className="p-4 text-center">Loading airlines...</p>;
  if (errorFetch) return <p className="p-4 text-center text-red-600">Error: {errorFetch}</p>;

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
                    <button
                      title="Edit"
                      onClick={() => navigate(`/edit-maskapai/${airline.id}`)}
                    >
                      <i className="ri-edit-2-line text-2xl"></i>
                    </button>
                    <button
                      title="Delete"
                      className="text-red-500"
                      onClick={() => confirmDelete(airline.id)}
                      disabled={loadingDelete} // Disable delete button when loading
                    >
                      <i className="ri-delete-bin-5-line text-2xl"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-gray-200 p-6 rounded-md shadow-md">
            <p className="text-xs md:text-lg font-semibold mb-4">
              Are you sure you want to delete {deleteId}?
            </p>
            <div className="flex justify-center text-xs md:text-base gap-2">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
                onClick={() => setModalOpen(false)}
              >
                No
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleDelete}
                disabled={loadingDelete} // Disable delete button in modal when loading
              >
                {loadingDelete ? "Deleting..." : "Yes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableAirline;