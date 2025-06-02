// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import dataRuangan from "../utils/dataRuangan.json";

// const TableRoom = ({ searchQuery }) => {
//   const [data, setData] = useState([]);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });
//   const [modalOpen, setModalOpen] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setData(dataRuangan);
//   }, []);

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

//   const sortedData = [...data].sort((a, b) => {
//     const key = sortConfig.key;
//     if (sortConfig.direction === "default" || !key) return 0;
//     const aVal = a[key]?.toString().toLowerCase();
//     const bVal = b[key]?.toString().toLowerCase();
//     if (sortConfig.direction === "asc") return aVal > bVal ? 1 : -1;
//     if (sortConfig.direction === "desc") return aVal < bVal ? 1 : -1;
//     return 0;
//   });

//   const filteredData = sortedData.filter((room) =>
//     room.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const confirmDelete = (id) => {
//     setDeleteId(id);
//     setModalOpen(true);
//   };

//   const handleStatusChange = (id, newStatus) => {
//     const updatedData = data.map((room) =>
//       room.id === id ? { ...room, status: newStatus } : room
//     );
//     setData(updatedData);
//   };

//   const handleDelete = () => {
//     setData((prev) => prev.filter((room) => room.id !== deleteId));
//     setModalOpen(false);
//     setDeleteId(null);
//   };

//   return (
//     <div className="p-4">
//       <div className="overflow-x-auto shadow-md rounded-2xl">
//         <table className="min-w-full bg-white border roun border-gray-300">
//           <thead>
//             <tr className="bg-purple-200  text-gray-700 uppercase text-sm leading-normal">
//               {["ID", "Name", "Type", "Price", "Facilities", "Status"].map((col) => (
//                 <th
//                   key={col}
//                   className="py-2 px-3 border cursor-pointer"
//                   onClick={() => handleSort(col.toLowerCase())}
//                 >
//                   {col}
//                   <i className="ml-1 ri-arrow-up-down-line"></i>
//                 </th>
//               ))}
//               <th className="py-2 px-3 border">Action</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-700 text-sm">
//             {filteredData.length > 0 ? (
//               filteredData.map((room) => (
//                 <tr key={room.id} className="border-b hover:bg-gray-100">
//                   <td className="py-2 px-3 border text-center">{room.id}</td>
//                   <td className="py-2 px-3 border text-center">{room.name}</td>
//                   <td className="py-2 px-3 border text-center">{room.type}</td>
//                   <td className="py-2 px-3 border text-center">{room.price}</td>
//                   <td className="py-2 px-3 border text-center truncate max-w-xs" title={room.facilities?.join(", ")}>
//                     {room.facilities?.slice(0, 3).join(", ") + (room.facilities?.length > 3 ? ", ..." : "")}
//                   </td>
//                   <td className="py-2 px-3 border text-center">
//                     <select
//                       value={room.status}
//                       onChange={(e) => handleStatusChange(room.id, e.target.value)}
//                       className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                         room.status === "Available"
//                           ? "bg-green-500 text-white"
//                           : "bg-red-600 text-white"
//                       }`}
//                     >
//                       <option value="Available">Available</option>
//                       <option value="Not Available">Not Available</option>
//                     </select>
//                   </td>
//                   <td className="flex justify-center py-2 px-3 gap-2">
//                     <button onClick={() => navigate(`/edit-ruangan/${room.id}`)} title="Edit">
//                       <i className="ri-edit-2-line text-xl"></i>
//                     </button>
//                     <button className="text-red-500" onClick={() => confirmDelete(room.id)} title="Delete">
//                       <i className="ri-delete-bin-5-line text-xl"></i>
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-center py-4 text-gray-500">
//                   No results found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal Delete Confirmation */}
//       {modalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
//           <div className="bg-white p-6 rounded shadow-md text-center">
//             <p className="text-sm md:text-base font-semibold mb-4">
//               Are you sure you want to delete ID {deleteId}?
//             </p>
//             <div className="flex justify-center space-x-4">
//               <button onClick={() => setModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded">
//                 Cancel
//               </button>
//               <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TableRoom

// // TableRoom.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchRooms } from "../redux/actions/mitraAction"; // Adjust path as needed

// const TableRoom = ({ searchQuery }) => {
//   // const [data, setData] = useState([]); // Will be replaced by Redux state
//   const [currentRoomList, setCurrentRoomList] = useState([]);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });
//   const [modalOpen, setModalOpen] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { hotelId } = useParams(); // Get hotelId from URL, e.g., /manajemen-ruangan/:hotelId

//   const {
//     roomList,
//     loadingRooms,
//     errorRooms,
//   } = useSelector((state) => state.mitra);

//   useEffect(() => {
//     // The prompt specified a static ID, but using hotelId from params is more dynamic
//     // For the specific request: dispatch(fetchRooms("cmacig97c0002up7k1lzhpyx4"));
//     if (hotelId) {
//       dispatch(fetchRooms(hotelId));
//     }
//   }, [dispatch, hotelId]);

//   useEffect(() => {
//     setCurrentRoomList(roomList || []);
//   }, [roomList]);

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

//   const sortedData = [...currentRoomList].sort((a, b) => {
//     const key = sortConfig.key;
//     if (sortConfig.direction === "default" || !key) return 0;

//     // Handle nested properties or direct properties
//     let aVal = a[key];
//     let bVal = b[key];

//     // If key is 'type', use 'roomType' from data
//     if (key === 'type') {
//         aVal = a.roomType;
//         bVal = b.roomType;
//     }


//     if (aVal === null || aVal === undefined) return 1; // or -1 depending on desired null sort order
//     if (bVal === null || bVal === undefined) return -1; // or 1

//     const strAVal = String(aVal).toLowerCase();
//     const strBVal = String(bVal).toLowerCase();

//     if (sortConfig.direction === "asc") return strAVal.localeCompare(strBVal);
//     if (sortConfig.direction === "desc") return strBVal.localeCompare(strAVal);
//     return 0;
//   });


//   const filteredData = sortedData.filter((room) =>
//     room.name && room.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const confirmDelete = (id) => {
//     setDeleteId(id);
//     setModalOpen(true);
//   };

//   // TODO: Implement API call for status change if needed
//   const handleStatusChange = (id, newStatus) => {
//     setCurrentRoomList((prevData) =>
//       prevData.map((room) =>
//         room.id === id ? { ...room, status: newStatus } : room
//       )
//     );
//     // dispatch(updateRoomStatusAction(id, newStatus)); // Example for future API call
//   };

//   // TODO: Implement API call for delete if needed
//   const handleDelete = () => {
//     setCurrentRoomList((prevData) => prevData.filter((room) => room.id !== deleteId));
//     setModalOpen(false);
//     setDeleteId(null);
//     // dispatch(deleteRoomAction(deleteId)); // Example for future API call
//   };

//   if (loadingRooms) {
//     return <div className="p-4 text-center">Loading rooms...</div>;
//   }

//   if (errorRooms) {
//     return <div className="p-4 text-center text-red-500">Error fetching rooms: {errorRooms}</div>;
//   }

//   return (
//     <div className="p-4">
//       <div className="overflow-x-auto shadow-md rounded-2xl">
//         <table className="min-w-full bg-white border roun border-gray-300">
//           <thead>
//             <tr className="bg-purple-200  text-gray-700 uppercase text-sm leading-normal">
//               {["ID", "Name", "Type", "Price", "Facilities", "Status"].map((col) => (
//                 <th
//                   key={col}
//                   className="py-2 px-3 border cursor-pointer"
//                   // For "Type", we sort by "roomType" in the data
//                   onClick={() => handleSort(col.toLowerCase() === 'type' ? 'roomType' : col.toLowerCase())}
//                 >
//                   {col}
//                   <i className="ml-1 ri-arrow-up-down-line"></i>
//                 </th>
//               ))}
//               <th className="py-2 px-3 border">Action</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-700 text-sm">
//             {filteredData.length > 0 ? (
//               filteredData.map((room) => (
//                 <tr key={room.id} className="border-b hover:bg-gray-100">
//                   <td className="py-2 px-3 border text-center">{room.id}</td>
//                   <td className="py-2 px-3 border text-center">{room.name}</td>
//                   <td className="py-2 px-3 border text-center">{room.roomType}</td>
//                   <td className="py-2 px-3 border text-center">
//                     {/* Formatting price, assuming it's a number */}
//                     {typeof room.price === 'number' ? room.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }) : room.price}
//                   </td>
//                   <td className="py-2 px-3 border text-center truncate max-w-xs" title={Array.isArray(room.facilities) ? room.facilities.join(", ") : ""}>
//                     {Array.isArray(room.facilities) ? (room.facilities.slice(0, 3).join(", ") + (room.facilities.length > 3 ? ", ..." : "")) : "N/A"}
//                   </td>
//                   <td className="py-2 px-3 border text-center">
//                     <select
//                       value={room.status}
//                       onChange={(e) => handleStatusChange(room.id, e.target.value)}
//                       className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                         room.status === "Available"
//                           ? "bg-green-500 text-white"
//                           : "bg-red-600 text-white" // Or any other color for non-available
//                       }`}
//                     >
//                       <option value="Available">Available</option>
//                       <option value="Not Available">Not Available</option>
//                       {/* Add other statuses if API provides more */}
//                     </select>
//                   </td>
//                   <td className="flex justify-center py-2 px-3 gap-2">
//                     <button onClick={() => navigate(`/edit-ruangan/${hotelId}/${room.id}`)} title="Edit"> {/* Adjusted navigation for editing a specific room */}
//                       <i className="ri-edit-2-line text-xl"></i>
//                     </button>
//                     <button className="text-red-500" onClick={() => confirmDelete(room.id)} title="Delete">
//                       <i className="ri-delete-bin-5-line text-xl"></i>
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-center py-4 text-gray-500">
//                   No rooms found or no rooms available for this hotel.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal Delete Confirmation */}
//       {modalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
//           <div className="bg-white p-6 rounded shadow-md text-center">
//             <p className="text-sm md:text-base font-semibold mb-4">
//               Are you sure you want to delete Room ID {deleteId}?
//             </p>
//             <div className="flex justify-center space-x-4">
//               <button onClick={() => setModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded">
//                 Cancel
//               </button>
//               <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TableRoom;


// // TableRoom.jsx (Saran Modifikasi)
// import React, { useState, useEffect, useMemo } from "react"; // useMemo ditambahkan
// import { useNavigate } from "react-router-dom"; // useParams dihapus jika hotelId tidak lagi digunakan untuk fetch di sini
// import { useSelector } from "react-redux"; // useDispatch dihapus jika tidak ada dispatch lagi
// // fetchRooms dihapus dari impor jika tidak digunakan lagi di sini

// const TableRoom = ({ searchQuery }) => { // rooms sekarang di-pass sebagai prop
//   const [currentRoomList, setCurrentRoomList] = useState([]);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });
//   const [modalOpen, setModalOpen] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const navigate = useNavigate();

//   // Ambil roomList langsung dari Redux state yang sudah diisi oleh ManajemenRuangan
//   const {
//     roomList, // Ini sudah berisi kamar untuk hotel yang dipilih
//     loadingRooms,
//     errorRooms,
//   } = useSelector((state) => state.mitra);

//   // Tidak perlu lagi useEffect untuk dispatch fetchRooms di sini
//   // useEffect(() => {
//   //   if (hotelId) { // hotelId tidak lagi diambil dari useParams untuk fetch di sini
//   //     dispatch(fetchRooms(hotelId));
//   //   }
//   // }, [dispatch, hotelId]);

//   useEffect(() => {
//     console.log("TableRoom - useEffect [roomList]: Menerima roomList baru:", roomList);
//     setCurrentRoomList(roomList || []); // Atau langsung gunakan roomList di useMemo
//   }, [roomList]);

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

//   // Gunakan useMemo untuk sortedData dan filteredData agar lebih efisien
//   const sortedData = useMemo(() => {
//     console.log("TableRoom - useMemo [currentRoomList, sortConfig]: Mengurutkan data");
//     let sortableItems = [...currentRoomList]; // atau [...(roomList || [])] jika tidak pakai currentRoomList
//     const key = sortConfig.key;
//     if (sortConfig.direction === "default" || !key) return sortableItems; // Kembalikan data asli jika tidak ada sort

//     sortableItems.sort((a, b) => {
//       let aVal = a[key];
//       let bVal = b[key];

//       if (key === 'type') { // Sesuaikan dengan nama properti di data Anda, misal 'roomType'
//           aVal = a.roomType;
//           bVal = b.roomType;
//       }

//       if (aVal === null || aVal === undefined) return sortConfig.direction === "asc" ? 1 : -1;
//       if (bVal === null || bVal === undefined) return sortConfig.direction === "asc" ? -1 : 1;

//       const strAVal = String(aVal).toLowerCase();
//       const strBVal = String(bVal).toLowerCase();

//       if (sortConfig.direction === "asc") return strAVal.localeCompare(strBVal);
//       if (sortConfig.direction === "desc") return strBVal.localeCompare(strAVal);
//       return 0;
//     });
//     return sortableItems;
//   }, [currentRoomList, sortConfig]); // atau [roomList, sortConfig]

//   const filteredData = useMemo(() => {
//     console.log("TableRoom - useMemo [sortedData, searchQuery]: Memfilter data");
//     if (!searchQuery) return sortedData;
//     return sortedData.filter((room) =>
//       room.name && room.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }, [sortedData, searchQuery]);


//   const confirmDelete = (id) => {
//     setDeleteId(id);
//     setModalOpen(true);
//   };

//   const handleStatusChange = (id, newStatus) => {
//     // TODO: Idealnya, ini akan dispatch action ke Redux, yang kemudian memanggil API
//     console.log(`TableRoom: Ubah status room ${id} menjadi ${newStatus} (implementasi API diperlukan)`);
//     // Untuk sementara, update state lokal jika masih menggunakan currentRoomList
//     // setCurrentRoomList((prevData) =>
//     //   prevData.map((room) =>
//     //     room.id === id ? { ...room, status: newStatus } : room
//     //   )
//     // );
//   };

//   const handleDelete = () => {
//     // TODO: Idealnya, ini akan dispatch action ke Redux, yang kemudian memanggil API
//     console.log(`TableRoom: Hapus room ${deleteId} (implementasi API diperlukan)`);
//     // Untuk sementara, update state lokal jika masih menggunakan currentRoomList
//     // setCurrentRoomList((prevData) => prevData.filter((room) => room.id !== deleteId));
//     setModalOpen(false);
//     setDeleteId(null);
//   };

//   // Loading dan error state sudah ditangani di ManajemenRuangan.jsx
//   // TableRoom hanya akan dirender jika ada data.
//   // Namun, jika Anda ingin penanganan internal (misalnya, jika rooms prop tiba-tiba kosong), bisa ditambahkan di sini.

//   // Log saat render
//   console.log("TableRoom: Merender dengan filteredData length:", filteredData.length);

//   return (
//     <div className="p-4">
//       <div className="overflow-x-auto shadow-md rounded-2xl">
//         <table className="min-w-full bg-white border roun border-gray-300">
//           <thead>
//             <tr className="bg-purple-200  text-gray-700 uppercase text-sm leading-normal">
//               {["ID", "Name", "Type", "Price", "Facilities", "Status"].map((col) => (
//                 <th
//                   key={col}
//                   className="py-2 px-3 border cursor-pointer"
//                   onClick={() => handleSort(col.toLowerCase() === 'type' ? 'roomType' : col.toLowerCase())}
//                 >
//                   {col}
//                   <i className="ml-1 ri-arrow-up-down-line"></i>
//                 </th>
//               ))}
//               <th className="py-2 px-3 border">Action</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-700 text-sm">
//             {filteredData.length > 0 ? (
//               filteredData.map((room) => (
//                 <tr key={room.id} className="border-b hover:bg-gray-100">
//                   <td className="py-2 px-3 border text-center">{room.id}</td>
//                   <td className="py-2 px-3 border text-center">{room.name}</td>
//                   <td className="py-2 px-3 border text-center">{room.roomType}</td>
//                   <td className="py-2 px-3 border text-center">
//                     {typeof room.price === 'number' ? room.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }) : room.price}
//                   </td>
//                   <td className="py-2 px-3 border text-center truncate max-w-xs" title={Array.isArray(room.facilities) ? room.facilities.join(", ") : ""}>
//                     {Array.isArray(room.facilities) ? (room.facilities.slice(0, 3).join(", ") + (room.facilities.length > 3 ? ", ..." : "")) : "N/A"}
//                   </td>
          
//                   <td className="py-2 px-3 border text-center">
//                     <select
//                       value={room.status}
//                       onChange={(e) => handleStatusChange(room.id, e.target.value)}
//                       className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                         room.status === "Available"
//                           ? "bg-green-500 text-white"
//                           : "bg-red-600 text-white" // Or any other color for non-available
//                       }`}
//                     >
//                       <option value="Available">Available</option>
//                       <option value="Not Available">Not Available</option>
//                       {/* Add other statuses if API provides more */}
//                     </select>
//                   </td>
//                   <td className="flex justify-center py-2 px-3 gap-2">
//                     {/* hotelId mungkin tidak lagi diperlukan jika path edit tidak membutuhkannya secara eksplisit dari sini */}
//                     <button onClick={() => navigate(`/edit-ruangan/${room.id}`)} title="Edit"> {/* Path mungkin perlu hotelId jika struktur rute Anda demikian /edit-ruangan/:hotelId/:roomId */}
//                       <i className="ri-edit-2-line text-xl"></i>
//                     </button>
//                     <button className="text-red-500" onClick={() => confirmDelete(room.id)} title="Delete">
//                       <i className="ri-delete-bin-5-line text-xl"></i>
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-center py-4 text-gray-500">
//                   No rooms data to display.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {modalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
//           <div className="bg-white p-6 rounded shadow-md text-center">
//             <p className="text-sm md:text-base font-semibold mb-4">
//               Are you sure you want to delete Room ID {deleteId}?
//             </p>
//             <div className="flex justify-center space-x-4">
//               <button onClick={() => setModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded">
//                 Cancel
//               </button>
//               <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TableRoom;


// TableRoom.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateRoomStatus } from "../redux/actions/mitraAction"; // Impor aksi baru

const TableRoom = ({ searchQuery }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { hotelId } = useParams(); // hotelId dari URL (parent route)

  const {
    roomList, // Gunakan roomList langsung dari Redux
    loadingUpdateRoomStatus, // State loading untuk update spesifik
    errorUpdateRoomStatus,   // State error untuk update spesifik
  } = useSelector((state) => state.mitra);

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

  const sortedData = useMemo(() => {
    console.log("TableRoom - useMemo [roomList, sortConfig]: Mengurutkan data dari roomList Redux. roomList length:", roomList?.length);
    let sortableItems = [...(roomList || [])]; // Pastikan roomList tidak undefined
    const key = sortConfig.key;
    if (sortConfig.direction === "default" || !key) return sortableItems;

    sortableItems.sort((a, b) => {
      let aVal = a[key];
      let bVal = b[key];
      if (key === 'type') { // 'type' adalah header kolom, 'roomType' adalah properti data
          aVal = a.roomType;
          bVal = b.roomType;
      } else if (key === 'facilities') { // Fasilitas adalah array, ubah jadi string untuk sort
          aVal = Array.isArray(a.facilities) ? a.facilities.join(", ") : "";
          bVal = Array.isArray(b.facilities) ? b.facilities.join(", ") : "";
      }


      if (aVal === null || aVal === undefined) return sortConfig.direction === "asc" ? 1 : -1;
      if (bVal === null || bVal === undefined) return sortConfig.direction === "asc" ? -1 : 1;

      const strAVal = String(aVal).toLowerCase();
      const strBVal = String(bVal).toLowerCase();

      if (sortConfig.direction === "asc") return strAVal.localeCompare(strBVal);
      if (sortConfig.direction === "desc") return strBVal.localeCompare(strAVal);
      return 0;
    });
    return sortableItems;
  }, [roomList, sortConfig]);

  const filteredData = useMemo(() => {
    console.log("TableRoom - useMemo [sortedData, searchQuery]: Memfilter data. sortedData length:", sortedData?.length);
    if (!searchQuery) return sortedData;
    return sortedData.filter((room) =>
      room.name && room.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [sortedData, searchQuery]);

  const confirmDelete = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  const handleStatusChange = (roomId, currentHotelId, newStatus) => {
    console.log(`TableRoom: handleStatusChange - Dispatching updateRoomStatus. roomId: ${roomId}, hotelId: ${currentHotelId}, newStatus: ${newStatus}`);
    dispatch(updateRoomStatus(roomId, currentHotelId, newStatus));
  };

  const handleDelete = () => {
    console.log(`TableRoom: Hapus room ${deleteId} (implementasi API & Redux delete room diperlukan)`);
    // dispatch(deleteRoomAction(deleteId)); // Anda perlu membuat aksi deleteRoom
    setModalOpen(false);
    setDeleteId(null);
  };

  // Fungsi helper untuk mendapatkan status loading/error per kamar
  const isRoomUpdating = (roomId) => loadingUpdateRoomStatus && loadingUpdateRoomStatus[roomId];
  const getRoomUpdateError = (roomId) => errorUpdateRoomStatus && errorUpdateRoomStatus[roomId];

  // Log saat render
  useEffect(() => {
      console.log("TableRoom: Render. roomList length:", roomList?.length, "filteredData length:", filteredData?.length);
  });


  return (
    <div className="p-4">
      <div className="overflow-x-auto shadow-md rounded-2xl">
        <table className="min-w-full bg-white border roun border-gray-300">
          <thead>
            <tr className="bg-purple-200  text-gray-700 uppercase text-sm leading-normal">
              {["Name", "Type", "Price", "Facilities", "Status"].map((col) => (
                <th
                  key={col}
                  className="py-2 px-3 border cursor-pointer"
                  onClick={() => handleSort(col.toLowerCase())} // key di sini harus sesuai dengan properti data atau dihandle di logika sort
                >
                  {col}
                  <i className="ml-1 ri-arrow-up-down-line"></i>
                </th>
              ))}
              <th className="py-2 px-3 border">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {filteredData && filteredData.length > 0 ? ( // Tambahkan pengecekan filteredData
              filteredData.map((room) => (
                <tr key={room.id} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-3 border text-center">{room.name}</td>
                  <td className="py-2 px-3 border text-center">{room.roomType}</td>
                  <td className="py-2 px-3 border text-center">
                    {typeof room.price === 'number' ? room.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }) : room.price}
                  </td>
                  <td className="py-2 px-3 border text-center truncate max-w-xs" title={Array.isArray(room.facilities) ? room.facilities.join(", ") : ""}>
                    {Array.isArray(room.facilities) ? (room.facilities.slice(0, 3).join(", ") + (room.facilities.length > 3 ? ", ..." : "")) : "N/A"}
                  </td>
                  <td className="py-2 px-3 border text-center">
                    <select
                      value={room.status || ''} // Default ke string kosong jika room.status undefined
                      onChange={(e) => handleStatusChange(room.id, hotelId, e.target.value)}
                      disabled={isRoomUpdating(room.id)}
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        room.status === "Available"
                          ? "bg-green-500 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      <option value="Available">Available</option>
                      <option value="Not Available">Not Available</option>
                    </select>
                    {isRoomUpdating(room.id) && <p className="text-xs text-blue-500 mt-1">Updating...</p>}
                    {getRoomUpdateError(room.id) && <p className="text-xs text-red-500 mt-1">Error: {getRoomUpdateError(room.id)}</p>}
                  </td>
                  <td className="flex justify-center py-2 px-3 gap-2">
                    <button onClick={() => navigate(`/edit-ruangan/${hotelId}/${room.id}`)} title="Edit">
                      <i className="ri-edit-2-line text-xl"></i>
                    </button>
                    <button className="text-red-500" onClick={() => confirmDelete(room.id)} title="Delete">
                      <i className="ri-delete-bin-5-line text-xl"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No rooms data to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <p className="text-sm md:text-base font-semibold mb-4">
              Are you sure you want to delete Room ID {deleteId}?
            </p>
            <div className="flex justify-center space-x-4">
              <button onClick={() => setModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded">
                Cancel
              </button>
              <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableRoom;