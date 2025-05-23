import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSeat } from "../redux/actions/mitraAction"; // Import action deleteSeat

const TableSeat = ({ searchQuery, seatCategories }) => {
  const dispatch = useDispatch();
  const { loadingDeleteSeat, errorDeleteSeat } = useSelector((state) => state.mitra);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // ID kursi yang akan dihapus
  const [seatNameToDelete, setSeatNameToDelete] = useState(''); // Nama kursi untuk alert
  const [isDeleting, setIsDeleting] = useState(false); // Status untuk tracking

  // --- Flattening Data ---
  const flattenedSeats = useMemo(() => {
    if (!seatCategories || !Array.isArray(seatCategories)) return [];
    return seatCategories.flatMap(category =>
        (category.seats || []).map(seat => ({
            ...seat,
            className: category.categoryName,
            categoryId: category.categoryId,
            price: category.price,
        }))
    );
  }, [seatCategories]); // Bergantung pada seatCategories dari Redux

  // --- Effect untuk Menangani Hasil Delete ---
  useEffect(() => {
      if (isDeleting && !loadingDeleteSeat) {
          if (errorDeleteSeat) {
              alert(`Error deleting seat: ${errorDeleteSeat}`);
          } else {
              alert(`Seat ${seatNameToDelete} (ID: ${deleteId}) deleted successfully!`);
          }
          setIsDeleting(false);
          setDeleteId(null);
          setSeatNameToDelete('');
      }
  }, [loadingDeleteSeat, errorDeleteSeat, isDeleting, deleteId, seatNameToDelete]);


  // --- Sorting ---
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

  const sortedData = [...flattenedSeats].sort((a, b) => {
    if (sortConfig.direction === "default" || sortConfig.key === null) return 0;
    const valA = a[sortConfig.key]?.toString().toLowerCase();
    const valB = b[sortConfig.key]?.toString().toLowerCase();
    if (sortConfig.direction === "asc") return valA > valB ? 1 : -1;
    if (sortConfig.direction === "desc") return valA < valB ? 1 : -1;
    return 0;
  });

  // --- Filtering ---
  const filteredData = sortedData.filter((seat) =>
    seat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    seat.className.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- Deleting ---
  const confirmDelete = (id, name) => {
    setDeleteId(id);
    setSeatNameToDelete(name); // Simpan nama untuk alert
    setModalOpen(true);
  };

  const handleDelete = () => {
    if (deleteId) {
        setIsDeleting(true); // Mulai tracking
        dispatch(deleteSeat(deleteId)); // Dispatch action deleteSeat
        setModalOpen(false);
    }
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto shadow-md">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              {["Name", "className"].map((col) => (
                <th
                  key={col}
                  className="py-2 px-3 border cursor-pointer"
                  onClick={() => handleSort(col)}
                >
                  {col === "className" ? "Class Name" : col}
                  <i className="ml-1 ri-arrow-up-down-line"></i>
                </th>
              ))}
              <th className="py-2 px-3 border">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredData.length > 0 ? (
              filteredData.map((seat) => (
                <tr key={seat.id} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-3 border text-center">{seat.name}</td>
                  <td className="py-2 px-3 border text-center">{seat.className}</td>
                  <td className="flex py-2 px-3 text-center justify-center">
                    {/* Tombol Hapus: Dinonaktifkan saat sedang menghapus */}
                    <button
                        className="text-red-500 mx-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => confirmDelete(seat.id, seat.name)} // Kirim ID dan Nama
                        disabled={loadingDeleteSeat}
                    >
                      <i className="ri-delete-bin-5-line text-2xl"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  {searchQuery ? "No results found." : "No seats found for this plane."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Konfirmasi Hapus */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-gray-200 p-6 rounded-md shadow-md">
            <p className="text-xs md:text-lg font-semibold mb-4">
              Are you sure you want to delete seat {seatNameToDelete} ({deleteId})?
            </p>
            <div className="flex justify-center text-xs md:text-base gap-2">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setModalOpen(false)}
                disabled={loadingDeleteSeat}
              >
                No
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleDelete}
                disabled={loadingDeleteSeat}
              >
                {loadingDeleteSeat ? "Deleting..." : "Yes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableSeat;