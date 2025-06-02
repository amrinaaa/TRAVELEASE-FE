
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotels } from "../redux/actions/mitraAction"; // Adjust path as needed

const TableHotel = ({ searchQuery }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentHotelList, setCurrentHotelList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    hotelList,
    loadingHotels,
    errorHotels,
  } = useSelector((state) => state.mitra);

  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  useEffect(() => {
    setCurrentHotelList(hotelList || []);
  }, [hotelList]);

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

  const sortedData = [...currentHotelList].sort((a, b) => {
    if (sortConfig.direction === "default" || sortConfig.key === null) return 0;
    const valA = sortConfig.key === 'city' ? a.location?.city : a[sortConfig.key];
    const valB = sortConfig.key === 'city' ? b.location?.city : b[sortConfig.key];

    if (valA === null || valA === undefined) return 1;
    if (valB === null || valB === undefined) return -1;

    if (typeof valA === 'string' && typeof valB === 'string') {
        if (sortConfig.direction === "asc") return valA.localeCompare(valB);
        if (sortConfig.direction === "desc") return valB.localeCompare(valA);
    } else {
        if (sortConfig.direction === "asc") return valA > valB ? 1 : -1;
        if (sortConfig.direction === "desc") return valA < valB ? 1 : -1;
    }
    return 0;
  });

  const filteredData = sortedData.filter((hotel) =>
    hotel.name && hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const confirmDelete = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  const handleDelete = () => {
    setCurrentHotelList((prevData) => prevData.filter((hotel) => hotel.id !== deleteId));
    setModalOpen(false);
    setDeleteId(null);
    // TODO: dispatch(deleteHotelAction(deleteId)); // If you implement delete
  };

  if (loadingHotels) {
    return <div className="p-4 text-center">Loading hotels...</div>;
  }

  if (errorHotels) {
    return <div className="p-4 text-center text-red-500">Error fetching hotels: {errorHotels}</div>;
  }

  return (
    <div className="p-4">
      <div className="overflow-x-auto shadow-md rounded-2xl">
        <table className="min-w-full bg-white border roun border-gray-300">
          <thead>
            <tr className="bg-purple-200 text-gray-700 uppercase text-sm leading-normal">
              {["Name", "Description", "City", "Address"].map((col) => (
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
              filteredData.map((hotel) => (
                <tr key={hotel.id} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-3 border text-center">{hotel.name}</td>
                  <td className="py-2 px-3 border text-center">{hotel.description}</td>
                  <td className="py-2 px-3 border text-center">{hotel.location?.city}</td>
                  <td className="py-2 px-3 border text-center">{hotel.address}</td>
                  <td className="flex py-2 px-3 text-center justify-center">
                    <button onClick={() => navigate(`/manajemen-ruangan/${hotel.id}`)}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 text-blue1" width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><path fill="currentColor" d="M12 3c-1.11 0-2 .89-2 2H3v14H2v2h20v-2h-1V5c0-1.11-.89-2-2-2zm0 2h7v14h-7zm-7 6h2v2H5z"/></svg>
                    </button>
                    <button onClick={() => navigate(`/list-pengguna-hotel/${hotel.id}`)}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="text-ungu7" width="26" height="26" viewBox="0 0 24 24"><path fill="currentColor" d="M6 17c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6m9-9a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3a3 3 0 0 1 3 3M3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2"/></svg>
                    </button>
                    <button onClick={() => navigate(`/edit-hotel/${hotel.id}`)}>
                      <i className="ri-edit-2-line text-2xl"></i>
                    </button>
                    <button className="text-red-500 mx-1" onClick={() => confirmDelete(hotel.id)}>
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
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-gray-200 p-6 rounded-md shadow-md">
            <p className="text-xs md:text-lg font-semibold mb-4">
              Are you sure you want to delete this hotel record?
            </p>
            <div className="flex justify-center text-xs md:text-base">
              <button className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2" onClick={() => setModalOpen(false)}>
                No
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={handleDelete}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableHotel;



// import React, { useState, useEffect, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchHotels } from "../redux/actions/mitraAction"; // Adjust path as needed

// const TableHotel = ({ searchQuery }) => {
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });
//   const [modalOpen, setModalOpen] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   // currentHotelList tidak lagi diperlukan jika kita menggunakan hotelList dari Redux secara langsung
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const {
//     hotelList,
//     loadingHotels,
//     errorHotels,
//   } = useSelector((state) => state.mitra); // Mengambil hotelList dari state.mitra

//   useEffect(() => {
//     dispatch(fetchHotels()); // Memanggil fetchHotels saat komponen mount
//   }, [dispatch]);

//   // useEffect untuk setCurrentHotelList tidak lagi diperlukan

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

//   const sortedData = useMemo(() => {
//     let sortableItems = [...(hotelList || [])]; // Menggunakan hotelList langsung dari Redux
//     if (sortConfig.key !== null && sortConfig.direction !== "default") {
//       sortableItems.sort((a, b) => {
//         const valA = sortConfig.key === 'city' ? a.location?.city : a[sortConfig.key];
//         const valB = sortConfig.key === 'city' ? b.location?.city : b[sortConfig.key];

//         if (valA === null || valA === undefined) return sortConfig.direction === "asc" ? 1 : -1;
//         if (valB === null || valB === undefined) return sortConfig.direction === "asc" ? -1 : 1;

//         if (typeof valA === 'string' && typeof valB === 'string') {
//             if (sortConfig.direction === "asc") return valA.localeCompare(valB);
//             return valB.localeCompare(valA); 
//         } else {
//             if (sortConfig.direction === "asc") return valA > valB ? 1 : (valA < valB ? -1 : 0);
//             return valA < valB ? 1 : (valA > valB ? -1 : 0);
//         }
//       });
//     }
//     return sortableItems;
//   }, [hotelList, sortConfig]);


//   const filteredData = useMemo(() => {
//     if (!searchQuery) return sortedData;
//     return sortedData.filter((hotel) =>
//       hotel.name && hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }, [sortedData, searchQuery]);

//   const confirmDelete = (id) => {
//     setDeleteId(id);
//     setModalOpen(true);
//   };

//   const handleDelete = () => {
//     // dispatch(deleteHotel(deleteId)); // Panggil action deleteHotel jika sudah diimplementasikan di redux
//     console.log("Delete hotel with ID:", deleteId); // Placeholder
//     setModalOpen(false);
//     setDeleteId(null);
//   };

//   if (loadingHotels) {
//     return <div className="p-4 text-center">Loading hotels...</div>;
//   }

//   if (errorHotels) {
//     return <div className="p-4 text-center text-red-500">Error fetching hotels: {typeof errorHotels === 'object' ? JSON.stringify(errorHotels) : errorHotels}</div>;
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
//                   <td className="py-2 px-3 border text-center">{hotel.location?.city || 'N/A'}</td>
//                   <td className="py-2 px-3 border text-center">{hotel.address}</td>
//                   <td className="flex py-2 px-3 text-center justify-center items-center">
//                     <button onClick={() => navigate(`/manajemen-ruangan/${hotel.id}`)} title="Manage Rooms"> {/* Navigasi ke manajemen ruangan dengan hotel.id */}
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