import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotels, deleteHotel, clearDeleteHotelError } from "../redux/actions/mitraAction";

const TableHotelAdmin = ({ searchQuery }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mitraId } = useParams(); // Changed from hotelId to mitraId

  const {
    hotelList,
    loadingHotels,
    errorHotels,
    loadingDeleteHotel,
    errorDeleteHotel,
  } = useSelector((state) => state.mitra);

  // Fetch hotels saat komponen pertama kali dimuat
  useEffect(() => {
    dispatch(fetchHotels(mitraId)); // Pass mitraId to fetchHotels
  }, [dispatch, mitraId]); // Added mitraId to dependency array

  // Effect untuk membersihkan error delete hotel saat modal ditutup atau komponen unmount
  useEffect(() => {
    return () => {
      if (errorDeleteHotel) {
        dispatch(clearDeleteHotelError());
      }
    };
  }, [errorDeleteHotel, dispatch]); // Tambahkan dependency errorDeleteHotel

  // Effect untuk menutup modal jika delete berhasil (errorDeleteHotel menjadi null setelah sukses)
  // dan tidak sedang dalam proses loading delete.
  useEffect(() => {
    if (!loadingDeleteHotel && !errorDeleteHotel && deleteId !== null && modalOpen) {
      // Jika tidak loading, tidak ada error, dan ada deleteId (artinya proses delete baru saja selesai)
      // maka tutup modal. Ini mengasumsikan 'deleteHotelSuccess' akan mengeset errorDeleteHotel jadi null.
      // Jika 'deleteHotelSuccess' tidak mereset errorDeleteHotel, kondisi ini perlu disesuaikan.
      // Atau, kita bisa mengandalkan logika di handleDeleteConfirm jika actionnya mengembalikan status sukses.
      // Untuk saat ini, kita asumsikan errorDeleteHotel akan null jika sukses.
      // Namun, lebih aman untuk tidak menutup modal secara otomatis di sini kecuali ada flag sukses yang jelas.
      // Biarkan penutupan modal dikontrol oleh handleDeleteConfirm atau tombol cancel.
    }
  }, [loadingDeleteHotel, errorDeleteHotel, deleteId, modalOpen]);


  const handleSort = (key) => {
    setSortConfig((prev) => {
      let direction = "asc";
      if (prev.key === key) {
        if (prev.direction === "asc") {
          direction = "desc";
        } else if (prev.direction === "desc") {
          direction = "default"; // Kembali ke default / tidak ada sort
          key = null; // Reset key juga
        }
      }
      return { key, direction };
    });
  };

  const sortedData = useMemo(() => {
    let sortableItems = [...(hotelList || [])];
    if (sortConfig.key !== null && sortConfig.direction !== "default") {
      sortableItems.sort((a, b) => {
        const valA = sortConfig.key === 'city' ? a.location?.city : a[sortConfig.key];
        const valB = sortConfig.key === 'city' ? b.location?.city : b[sortConfig.key];

        if (valA === null || valA === undefined) return sortConfig.direction === "asc" ? 1 : -1;
        if (valB === null || valB === undefined) return sortConfig.direction === "asc" ? -1 : 1;

        if (typeof valA === 'string' && typeof valB === 'string') {
            if (sortConfig.direction === "asc") return valA.localeCompare(valB);
            return valB.localeCompare(valA);
        } else {
            if (sortConfig.direction === "asc") return valA > valB ? 1 : (valA < valB ? -1 : 0);
            return valA < valB ? 1 : (valA > valB ? -1 : 0);
        }
      });
    }
    return sortableItems;
  }, [hotelList, sortConfig]);


  const filteredData = useMemo(() => {
    if (!searchQuery) return sortedData;
    return sortedData.filter((hotel) =>
      hotel.name && hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [sortedData, searchQuery]);

  const openDeleteModal = (id) => {
    if (errorDeleteHotel) {
        dispatch(clearDeleteHotelError()); // Bersihkan error lama sebelum buka modal
    }
    setDeleteId(id);
    setModalOpen(true);
  };

  const closeDeleteModal = () => {
    setModalOpen(false);
    setDeleteId(null);
    // Tidak perlu clear error di sini lagi jika sudah ditangani saat modal dibuka atau komponen unmount
  }

  const handleDeleteConfirm = async () => {
    if (deleteId) {
      // Dispatch action dan tunggu selesainya (jika action mengembalikan promise)
      // Namun, action Redux Thunk biasanya tidak mengembalikan promise yang bisa langsung di-await
      // untuk mendapatkan hasil akhirnya di komponen.
      // State Redux (loadingDeleteHotel, errorDeleteHotel) akan diperbarui oleh action itu sendiri.
      dispatch(deleteHotel(deleteId));

      // Kita akan mengandalkan useEffect untuk memantau errorDeleteHotel
      // atau loadingDeleteHotel untuk menutup modal jika perlu.
      // Untuk sekarang, modal akan tetap terbuka dan menampilkan status loading/error dari Redux.
      // Jika BEBERAPA SAAT KEMUDIAN errorDeleteHotel menjadi null dan loadingDeleteHotel menjadi false,
      // berarti sukses, maka kita bisa tutup modal.
    }
  };

  // Effect untuk memantau hasil dari operasi delete
  useEffect(() => {
    if (modalOpen && !loadingDeleteHotel && !errorDeleteHotel && deleteId !== null && hotelList.findIndex(h => h.id === deleteId) === -1) {
      // Jika modal terbuka, tidak sedang loading, tidak ada error, deleteId pernah diset,
      // DAN hotel dengan deleteId sudah tidak ada di hotelList (berarti berhasil dihapus dari state Redux)
      console.log("Hotel deletion successful, closing modal.");
      closeDeleteModal(); // Tutup modal setelah berhasil
    }
  }, [modalOpen, loadingDeleteHotel, errorDeleteHotel, deleteId, hotelList, dispatch]);


  if (loadingHotels && !hotelList.length) {
    return <div className="p-4 text-center">Loading hotels...</div>;
  }

  if (errorHotels && !hotelList.length) {
    return <div className="p-4 text-center text-red-500">Error fetching hotels: {typeof errorHotels === 'object' ? JSON.stringify(errorHotels) : errorHotels}</div>;
  }

  const currentHotelToDisplay = hotelList.find(h => h.id === deleteId);


  return (
    <div className="p-4">
      <div className="overflow-x-auto shadow-md rounded-2xl">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-purple-200 text-gray-700 uppercase text-sm leading-normal">
              {["Name", "Description", "City", "Address"].map((colKey) => {
                const key = colKey.toLowerCase();
                return (
                    <th
                    key={key}
                    className="py-2 px-3 border cursor-pointer hover:bg-purple-300"
                    onClick={() => handleSort(key)}
                    >
                    {colKey}{" "}
                    {sortConfig.key === key ? (
                        sortConfig.direction === "asc" ? <i className="ml-1 ri-sort-asc"></i> : sortConfig.direction === "desc" ? <i className="ml-1 ri-sort-desc"></i> : <i className="ml-1 ri-arrow-up-down-line"></i>
                    ) : <i className="ml-1 ri-arrow-up-down-line"></i>}
                    </th>
                );
                })}
              <th className="py-2 px-3 border text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredData.length > 0 ? (
              filteredData.map((hotel) => (
                <tr key={hotel.id} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-3 border text-left">{hotel.name}</td>
                  <td className="py-2 px-3 border text-left">{hotel.description}</td>
                  <td className="py-2 px-3 border text-left">{hotel.location?.city || 'N/A'}</td>
                  <td className="py-2 px-3 border text-left">{hotel.address}</td>
                  <td className="flex py-2 px-3 justify-center items-center space-x-1 md:space-x-2">
                    <button onClick={() => navigate(`/manajemen-ruangan-admin/${hotel.id}`)} title="Manage Rooms" className="text-blue1 hover:text-blue-700">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><path fill="currentColor" d="M12 3c-1.11 0-2 .89-2 2H3v14H2v2h20v-2h-1V5c0-1.11-.89-2-2-2zm0 2h7v14h-7zm-7 6h2v2H5z"/></svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No results found or no hotels available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableHotelAdmin