// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import dataKursi from "../utils/dataKursi.json";
// import SeatModal from "./SeatModal"; // pastikan path benar

// const TableSeat = ({ searchQuery, data, setData }) => {
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });
//   const [modalOpen, setModalOpen] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

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
//     if (sortConfig.direction === "default" || sortConfig.key === null) return 0;
//     if (sortConfig.direction === "asc") return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
//     if (sortConfig.direction === "desc") return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
//     return 0;
//   });

//   const filteredData = sortedData.filter((seat) =>
//     seat.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const confirmDelete = (id) => {
//     setDeleteId(id);
//     setModalOpen(true);
//   };

//   const handleDelete = () => {
//     setData((prevData) => prevData.filter((seat) => seat.id !== deleteId));
//     setModalOpen(false);
//     setDeleteId(null);
//   };

//   return (
//     <div className="p-4">
//       <div className="overflow-x-auto shadow-md">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//               {["Name", "Class Name"].map((col) => (
//                 <th
//                   key={col}
//                   className="py-2 px-3 border cursor-pointer"
//                   onClick={() => handleSort(col.toLowerCase())}
//                 >
//                   {col} <i className="ml-1 ri-arrow-up-down-line"></i>
//                 </th>
//               ))}
//               <th className="py-2 px-3 border">Action</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-700">
//             {filteredData.length > 0 ? (
//               filteredData.map((seat) => (
//                 <tr key={seat.id} className="border-b hover:bg-gray-100">
//                   <td className="py-2 px-3 border text-center">{seat.name}</td>
//                   <td className="py-2 px-3 border text-center">{seat.className}</td>
//                   <td className="flex py-2 px-3 text-center justify-center">
//                     <button className="text-red-500 mx-1" onClick={() => confirmDelete(seat.id)}>
//                       <i className="ri-delete-bin-5-line text-2xl"></i>
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center py-4 text-gray-500">
//                   No results found.
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
//               Are you sure you want to delete {deleteId}?
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

// export default TableSeat;

import React, { useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom"; // Tidak digunakan saat ini
// import SeatModal from "./SeatModal"; // Tidak digunakan di sini

// Komponen ini sekarang menerima 'seatCategories' dari Redux melalui props
const TableSeat = ({ searchQuery, seatCategories }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  // const navigate = useNavigate(); // Tidak digunakan

  // --- Flattening Data ---
  // Mengubah data dari [ { categoryName, seats: [...] } ]
  // menjadi [ { id, name, className, ... } ]
  const flattenedSeats = useMemo(() => {
    if (!seatCategories || !Array.isArray(seatCategories)) return [];
    return seatCategories.flatMap(category =>
        (category.seats || []).map(seat => ({
            ...seat, // Mengambil id dan name dari seat
            className: category.categoryName, // Menambahkan nama kategori
            categoryId: category.categoryId,
            price: category.price,
        }))
    );
  }, [seatCategories]);

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
  const confirmDelete = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  const handleDelete = () => {
    // TODO: Implementasi DELETE /seat (belum ada)
    // dispatch(deleteSeatAction(deleteId));
    console.log("Menghapus kursi dengan ID:", deleteId);
    // Untuk sementara, kita tidak bisa update state Redux dari sini tanpa action
    // setData((prevData) => prevData.filter((seat) => seat.id !== deleteId));
    setModalOpen(false);
    setDeleteId(null);
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto shadow-md">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              {["Name", "className"].map((col) => ( // Menggunakan "className" sebagai key
                <th
                  key={col}
                  className="py-2 px-3 border cursor-pointer"
                  onClick={() => handleSort(col)} // Menggunakan key langsung
                >
                  {col === "className" ? "Class Name" : col} {/* Tampilan Header */}
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
                    {/* Tombol Hapus: Perlu action Redux untuk berfungsi penuh */}
                    <button className="text-red-500 mx-1" onClick={() => confirmDelete(seat.id)}>
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
              Are you sure you want to delete seat {deleteId}?
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

export default TableSeat;