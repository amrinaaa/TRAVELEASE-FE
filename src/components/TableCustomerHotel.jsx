import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dataCustomerHotel from "../utils/dataCustomerHotel.json";


const TableCustomerHotel = ({ searchQuery }) => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setData(dataCustomerHotel); // Use the dummy data
  }, []);

  // Function to handle sorting
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === "default") return { key, direction: "asc" };
        if (prev.direction === "asc") return { key, direction: "desc" };
        return { key: null, direction: "default" }; // Reset to default order
      }
      return { key, direction: "asc" }; // If changing columns, start from ascending
    });
  };

  // Sort data according to config
  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.direction === "default" || sortConfig.key === null) return 0;
    if (sortConfig.direction === "asc") return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    if (sortConfig.direction === "desc") return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    return 0;
  });

  const filteredData = sortedData.filter((customerHotel) =>
    customerHotel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to confirm deletion
  const confirmDelete = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  // Handle deletion of data
  const handleDelete = () => {
    setData((prevData) => prevData.filter((customerHotel) => customerHotel.id !== deleteId));
    setModalOpen(false);
    setDeleteId(null);
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto shadow-md rounded-2xl">
        <table className="min-w-full bg-white border roun border-gray-300">
          <thead>
            <tr className="bg-purple-200  text-gray-700 uppercase text-sm leading-normal">
              {["Name", "ID Room", "Room Type", "Start Date", "End Date", "Price"].map((col) => (
                <th
                  key={col}
                  className="py-2 px-3 border cursor-pointer"
                  onClick={() => handleSort(col.toLowerCase())}
                >
                  {col.charAt(0).toUpperCase() + col.slice(1)}{" "}
                  <i className="ml-1 ri-arrow-up-down-line"></i>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredData.length > 0 ? (
              filteredData.map((customerHotel) => (
                <tr key={customerHotel.id} className="border-b hover:bg-gray-100">

                  <td className="py-2 px-3 border text-center">{customerHotel.name}</td>
                  <td className="py-2 px-3 border text-center">{customerHotel.id_room}</td>
                  <td className="py-2 px-3 border text-center">{customerHotel.room_type}</td>
                  <td className="py-2 px-3 border text-center">{customerHotel.start_date}</td>
                  <td className="py-2 px-3 border text-center">{customerHotel.end_date}</td>
                  <td className="py-2 px-3 border text-center">{customerHotel.price}</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableCustomerHotel

// import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom"; // Hapus jika tidak digunakan untuk navigasi dari tabel ini

// // Tidak lagi menggunakan data dummy
// // import dataCustomerHotel from "../utils/dataCustomerHotel.json";

// const TableCustomerHotel = ({
//   searchQuery,
//   customers, // Data customer dari props
//   loading,   // Status loading dari props
//   error,     // Status error dari props
//   // hotelId, // Mungkin tidak lagi diperlukan jika 'customers' sudah spesifik untuk hotel ini
// }) => {
//   // const [data, setData] = useState([]); // Tidak lagi menggunakan state data lokal, langsung dari props
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });
//   // Fungsi modal dan delete akan saya komentari dulu karena belum ada action delete customer
//   // const [modalOpen, setModalOpen] = useState(false);
//   // const [deleteId, setDeleteId] = useState(null);
//   // const navigate = useNavigate();

//   // Tidak perlu useEffect untuk setData dari data dummy lagi

//   const tableHeaders = [
//     { label: "Name", key: "name" },
//     { label: "Email", key: "email" },
//     { label: "Phone Number", key: "phoneNumber" }, // Asumsi nama field, sesuaikan jika perlu
//     // Tambahkan header lain sesuai data customer Anda
//     // Contoh: { label: "Member Since", key: "memberSince" },
//   ];

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

//   // Gunakan 'customers' dari props untuk sorting dan filtering
//   const sortedData = React.useMemo(() => {
//     if (!customers || customers.length === 0) return [];
//     let sortableItems = [...customers];
//     if (sortConfig.key !== null && sortConfig.direction !== "default") {
//       sortableItems.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === "asc" ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === "asc" ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return sortableItems;
//   }, [customers, sortConfig]);

//   const filteredData = React.useMemo(() => {
//     if (!searchQuery) {
//       return sortedData;
//     }
//     return sortedData.filter((customer) => {
//       // Sesuaikan field yang ingin dicari
//       const name = customer.name || '';
//       const email = customer.email || '';
//       const phoneNumber = customer.phoneNumber || ''; // Sesuaikan dengan field Anda

//       return (
//         name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         phoneNumber.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     });
//   }, [sortedData, searchQuery]);

//   // const confirmDelete = (id) => {
//   //   setDeleteId(id);
//   //   setModalOpen(true);
//   // };

//   // const handleDelete = () => {
//   //   // Jika menggunakan Redux, dispatch action di sini
//   //   // setData((prevData) => prevData.filter((customer) => customer.id !== deleteId));
//   //   setModalOpen(false);
//   //   setDeleteId(null);
//   // };

//   if (loading) {
//     return <div className="p-4 text-center">Loading customers...</div>;
//   }

//   if (error) {
//     return <div className="p-4 text-center text-red-500">Error fetching customers: {typeof error === 'string' ? error : JSON.stringify(error)}</div>;
//   }

//   if (!customers || customers.length === 0) {
//     return <div className="p-4 text-center text-gray-500">No customers found for this hotel.</div>;
//   }

//   return (
//     <div className="p-4">
//       <div className="overflow-x-auto shadow-md rounded-2xl">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr className="bg-purple-200 text-gray-700 uppercase text-sm leading-normal">
//               {tableHeaders.map((col) => (
//                 <th
//                   key={col.key}
//                   className="py-2 px-3 border cursor-pointer"
//                   onClick={() => handleSort(col.key)} // Gunakan col.key untuk sorting
//                 >
//                   {col.label}{" "}
//                   <i className={`ml-1 ri-arrow-up-down-line ${sortConfig.key === col.key ? (sortConfig.direction === 'asc' ? 'ri-sort-asc' : (sortConfig.direction === 'desc' ? 'ri-sort-desc' : '')) : ''}`}></i>
//                 </th>
//               ))}
//               {/* Kolom Action bisa ditambahkan jika ada aksi per customer */}
//               {/* <th className="py-2 px-3 border">Action</th> */}
//             </tr>
//           </thead>
//           <tbody className="text-gray-700">
//             {filteredData.length > 0 ? (
//               filteredData.map((customer) => (
//                 <tr key={customer.id} className="border-b hover:bg-gray-100">
//                   {/* Sesuaikan customer.field dengan data Anda */}
//                   <td className="py-2 px-3 border text-center">{customer.name || "-"}</td>
//                   <td className="py-2 px-3 border text-center">{customer.email || "-"}</td>
//                   <td className="py-2 px-3 border text-center">{customer.phoneNumber || customer.phone || "-"}</td>
//                   {/* Tambahkan cell lain sesuai tableHeaders */}
//                   {/* <td>{customer.memberSince || "-"}</td> */}

//                   {/* Contoh kolom Action jika diperlukan */}
//                   {/* <td className="py-2 px-3 border text-center">
//                     <button className="text-blue-500 hover:text-blue-700">View</button>
//                   </td> */}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={tableHeaders.length} className="text-center py-4 text-gray-500">
//                   No results found for "{searchQuery}".
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal Delete (dikomentari) */}
//       {/* {modalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//           <div className="bg-gray-200 p-6 rounded-md shadow-md">
//             <p className="text-xs md:text-lg font-semibold mb-4">
//               Are you sure you want to delete this customer record?
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
//       )} */}
//     </div>
//   );
// };

// export default TableCustomerHotel;