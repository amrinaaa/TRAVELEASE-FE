import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlanesRequest, deletePlane } from "../redux/actions/mitraAction"; // Import deletePlane

const TablePlane = ({ searchQuery }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { airlineId } = useParams();

  // Mengambil data dan status loading/error dari Redux store
  const { planeList, loadingPlanes, errorPlanes, loadingDeletePlane, errorDeletePlane } = useSelector(
    (state) => state.mitra
  );

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // ID yang akan dihapus
  const [isDeleting, setIsDeleting] = useState(false); // Status untuk tracking delete

  // Fetch data pesawat
  useEffect(() => {
    if (airlineId) {
      dispatch(fetchPlanesRequest(airlineId));
    }
  }, [dispatch, airlineId]);

  // Effect untuk menangani hasil delete (sukses atau error)
  useEffect(() => {
    // Cek jika proses delete baru saja selesai (loading berubah dari true ke false)
    if (isDeleting && !loadingDeletePlane) {
      if (errorDeletePlane) {
        alert(`Error deleting plane: ${errorDeletePlane}`);
      } else {
        alert(`Plane with ID ${deleteId} deleted successfully!`);
        // Reset ID setelah berhasil
        setDeleteId(null);
      }
      // Reset status tracking
      setIsDeleting(false);
    }
  }, [loadingDeletePlane, errorDeletePlane, isDeleting, deleteId]);


  const data = Array.isArray(planeList) ? planeList : [];

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

  const getSortValue = (item, key) => {
      if (key === 'type') {
          return item.planeType?.name?.toLowerCase() || '';
      }
      return item[key]?.toString().toLowerCase() || '';
  }

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.direction === "default" || sortConfig.key === null) return 0;
    const valA = getSortValue(a, sortConfig.key);
    const valB = getSortValue(b, sortConfig.key);
    if (sortConfig.direction === "asc") return valA > valB ? 1 : -1;
    if (sortConfig.direction === "desc") return valA < valB ? 1 : -1;
    return 0;
  });

  const filteredData = sortedData.filter((plane) =>
    plane.name.toLowerCase().includes(searchQuery.toLowerCase())
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
      dispatch(deletePlane(deleteId)); // Panggil action deletePlane dengan planeId
      setModalOpen(false); // Tutup modal
    }
  };

  if (loadingPlanes) {
    return <p className="p-4 text-center">Loading planes...</p>;
  }

  if (errorPlanes) {
    return <p className="p-4 text-center text-red-600">Error: {errorPlanes}</p>;
  }

  if (!airlineId) {
      return <p className="p-4 text-center">Please select an airline first to see its planes.</p>;
  }


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
                  <td className="py-2 px-3 border text-center">{plane.planeType?.name || 'N/A'}</td>
                  <td className="py-2 px-3 border text-center">
                    {plane.seatCategories?.map(cat => cat.name).join(', ') || 'N/A'}
                  </td>
                  <td className="flex py-2 px-3 text-center justify-center gap-2">
                    <button title="Tambah Penerbangan" onClick={() => navigate(`/tambah-penerbangan/${plane.id}`)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M16 9c-.91 0-1.77.18-2.57.5l-.7-3.05l3.89-3.89c.58-.56.58-1.53 0-2.12s-1.54-.586-2.12 0l-3.89 3.89l-9.2-2.12L0 3.62L7.43 7.5l-3.89 3.9l-2.48-.35L0 12.11l3.18 1.76l1.77 3.19L6 16l-.34-2.5l3.89-3.87l1.02 1.96A6.995 6.995 0 0 0 16 23c3.87 0 7-3.13 7-7s-3.13-7-7-7m0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5m.5-4.75V12H15v5l3.61 2.16l.75-1.22z"></path></svg>
                    </button>
                    <button title="Edit Pesawat" onClick={() => navigate(`/edit-pesawat/${plane.id}`)}>
                      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=chair_alt" />
                      <span className="material-symbols-outlined mt-1 ml-1">chair_alt</span>
                    </button>
                    {/* Tombol Hapus: Dinonaktifkan saat sedang menghapus */}
                    <button
                        title="Hapus Pesawat"
                        className="text-red-500 mx-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => confirmDelete(plane.id)}
                        disabled={loadingDeletePlane}
                    >
                      <i className="ri-delete-bin-5-line text-2xl"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No planes found for this airline.
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
              Are you sure you want to delete plane {deleteId}?
            </p>
            <div className="flex justify-center text-xs md:text-base gap-2">
              {/* Tombol No: Dinonaktifkan saat sedang menghapus */}
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setModalOpen(false)}
                disabled={loadingDeletePlane}
              >
                No
              </button>
              {/* Tombol Yes: Dinonaktifkan saat sedang menghapus & menampilkan teks "Deleting..." */}
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleDelete}
                disabled={loadingDeletePlane}
              >
                {loadingDeletePlane ? "Deleting..." : "Yes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TablePlane;