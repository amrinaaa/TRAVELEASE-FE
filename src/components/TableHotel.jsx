
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchHotels } from "../redux/actions/mitraAction"; // Adjust path as needed

// const TableHotel = ({ searchQuery }) => {
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });
//   const [modalOpen, setModalOpen] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const [currentHotelList, setCurrentHotelList] = useState([]);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const {
//     hotelList,
//     loadingHotels,
//     errorHotels,
//   } = useSelector((state) => state.mitra);

//   useEffect(() => {
//     dispatch(fetchHotels());
//   }, [dispatch]);

//   useEffect(() => {
//     setCurrentHotelList(hotelList || []);
//   }, [hotelList]);

//   const handleSort = (key) => {
//     setSortConfig((prev) => {
//       if (prev.key === key) {
//         if (prev.direction === "default") return { key, direction: "asc" };
//         if (prev.direction === "asc") return { key, direction: "desc" };
//         return { key: null, direction: "default" };
//       }
//       return { key, direction: "asc" };
//     });
//   };

//   const sortedData = [...currentHotelList].sort((a, b) => {
//     if (sortConfig.direction === "default" || sortConfig.key === null) return 0;
//     const valA = sortConfig.key === 'city' ? a.location?.city : a[sortConfig.key];
//     const valB = sortConfig.key === 'city' ? b.location?.city : b[sortConfig.key];

//     if (valA === null || valA === undefined) return 1;
//     if (valB === null || valB === undefined) return -1;

//     if (typeof valA === 'string' && typeof valB === 'string') {
//         if (sortConfig.direction === "asc") return valA.localeCompare(valB);
//         if (sortConfig.direction === "desc") return valB.localeCompare(valA);
//     } else {
//         if (sortConfig.direction === "asc") return valA > valB ? 1 : -1;
//         if (sortConfig.direction === "desc") return valA < valB ? 1 : -1;
//     }
//     return 0;
//   });

//   const filteredData = sortedData.filter((hotel) =>
//     hotel.name && hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const confirmDelete = (id) => {
//     setDeleteId(id);
//     setModalOpen(true);
//   };

//   const handleDelete = () => {
//     setCurrentHotelList((prevData) => prevData.filter((hotel) => hotel.id !== deleteId));
//     setModalOpen(false);
//     setDeleteId(null);
//     // TODO: dispatch(deleteHotelAction(deleteId)); // If you implement delete
//   };

//   if (loadingHotels) {
//     return <div className="p-4 text-center">Loading hotels...</div>;
//   }

//   if (errorHotels) {
//     return <div className="p-4 text-center text-red-500">Error fetching hotels: {errorHotels}</div>;
//   }

//   return (
//     <div className="p-4">
//       <div className="overflow-x-auto shadow-md rounded-2xl">
//         <table className="min-w-full bg-white border roun border-gray-300">
//           <thead>
//             <tr className="bg-purple-200 text-gray-700 uppercase text-sm leading-normal">
//               {["Name", "Description", "City", "Address"].map((col) => (
//                 <th
//                   key={col}
//                   className="py-2 px-3 border cursor-pointer"
//                   onClick={() => handleSort(col.toLowerCase())}
//                 >
//                   {col.charAt(0).toUpperCase() + col.slice(1)}{" "}
//                   <i className="ml-1 ri-arrow-up-down-line"></i>
//                 </th>
//               ))}
//               <th className="py-2 px-3 border">Action</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-700">
//             {filteredData.length > 0 ? (
//               filteredData.map((hotel) => (
//                 <tr key={hotel.id} className="border-b hover:bg-gray-100">
//                   <td className="py-2 px-3 border text-center">{hotel.name}</td>
//                   <td className="py-2 px-3 border text-center">{hotel.description}</td>
//                   <td className="py-2 px-3 border text-center">{hotel.location?.city}</td>
//                   <td className="py-2 px-3 border text-center">{hotel.address}</td>
//                   <td className="flex py-2 px-3 text-center justify-center">
//                     <button onClick={() => navigate(`/manajemen-ruangan/${hotel.id}`)}>
//                       <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 text-blue1" width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><path fill="currentColor" d="M12 3c-1.11 0-2 .89-2 2H3v14H2v2h20v-2h-1V5c0-1.11-.89-2-2-2zm0 2h7v14h-7zm-7 6h2v2H5z"/></svg>
//                     </button>
//                     <button onClick={() => navigate(`/list-pengguna-hotel/${hotel.id}`)}>
//                       <svg xmlns="http://www.w3.org/2000/svg" className="text-ungu7" width="26" height="26" viewBox="0 0 24 24"><path fill="currentColor" d="M6 17c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6m9-9a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3a3 3 0 0 1 3 3M3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2"/></svg>
//                     </button>
//                     <button onClick={() => navigate(`/edit-hotel/${hotel.id}`)}>
//                       <i className="ri-edit-2-line text-2xl"></i>
//                     </button>
//                     <button className="text-red-500 mx-1" onClick={() => confirmDelete(hotel.id)}>
//                       <i className="ri-delete-bin-5-line text-2xl"></i>
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="text-center py-4 text-gray-500">
//                   No results found or no hotels available.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       {modalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//           <div className="bg-gray-200 p-6 rounded-md shadow-md">
//             <p className="text-xs md:text-lg font-semibold mb-4">
//               Are you sure you want to delete this hotel record?
//             </p>
//             <div className="flex justify-center text-xs md:text-base">
//               <button className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2" onClick={() => setModalOpen(false)}>
//                 No
//               </button>
//               <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={handleDelete}>
//                 Yes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TableHotel;
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotels, deleteHotel, clearDeleteHotelError } from "../redux/actions/mitraAction";

const TableHotel = ({ searchQuery }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    hotelList,
    loadingHotels,
    errorHotels,
    loadingDeleteHotel,
    errorDeleteHotel,
  } = useSelector((state) => state.mitra);

  // Fetch hotels saat komponen pertama kali dimuat
  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

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
                    <button onClick={() => navigate(`/manajemen-ruangan/${hotel.id}`)} title="Manage Rooms" className="text-blue1 hover:text-blue-700">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><path fill="currentColor" d="M12 3c-1.11 0-2 .89-2 2H3v14H2v2h20v-2h-1V5c0-1.11-.89-2-2-2zm0 2h7v14h-7zm-7 6h2v2H5z"/></svg>
                    </button>
                    <button onClick={() => navigate(`/list-pengguna-hotel/${hotel.id}`)} title="List Users" className="text-ungu7 hover:text-ungu5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 17c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6m9-9a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3a3 3 0 0 1 3 3M3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2"/></svg>
                    </button>
                    <button onClick={() => navigate(`/edit-hotel/${hotel.id}`)} title="Edit Hotel" className="text-blue1 hover:text-blue-700">
                      <i className="ri-edit-2-line text-2xl"></i>
                    </button>
                    <button className="text-red-500 hover:text-red-700" onClick={() => openDeleteModal(hotel.id)} title="Delete Hotel">
                      <i className="ri-delete-bin-5-line text-2xl"></i>
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

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 transition-opacity duration-300 ease-in-out">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-auto transform transition-all duration-300 ease-in-out scale-100">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Confirm Deletion</h3>
                <button onClick={closeDeleteModal} className="text-gray-400 hover:text-gray-600">
                    <i className="ri-close-line text-2xl"></i>
                </button>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Are you sure you want to delete <br/>
              <strong className="font-semibold text-gray-700">{currentHotelToDisplay?.name || 'this hotel'}</strong>?
            </p>
            <p className="text-xs text-red-600 mb-4">This action cannot be undone.</p>

            {errorDeleteHotel && (
              <div className="my-3 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
                <p className="font-medium">Deletion Failed:</p>
                <p>{typeof errorDeleteHotel === 'string' ? errorDeleteHotel : JSON.stringify(errorDeleteHotel)}</p>
                <p className="mt-1 text-xs">Please check your connection or contact support if the problem persists. The backend might be experiencing issues (CORS or Timeout).</p>
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                className="px-4 py-2 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
                onClick={closeDeleteModal}
                disabled={loadingDeleteHotel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-50 transition-colors"
                onClick={handleDeleteConfirm}
                disabled={loadingDeleteHotel}
              >
                {loadingDeleteHotel ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </div>
                ) : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableHotel;