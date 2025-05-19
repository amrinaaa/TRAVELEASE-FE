// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import dataAirlines from "../utils/dataAirlines.json";

// const TableAirline = ({ searchQuery }) => {
//   const [data, setData] = useState([]);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });
//   const [modalOpen, setModalOpen] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setData(dataAirlines); // Use the dummy data
//   }, []);

//   // Function to handle sorting
//   const handleSort = (key) => {
//     setSortConfig((prev) => {
//       if (prev.key === key) {
//         if (prev.direction === "default") return { key, direction: "asc" };
//         if (prev.direction === "asc") return { key, direction: "desc" };
//         return { key: null, direction: "default" }; // Reset to default order
//       }
//       return { key, direction: "asc" }; // If changing columns, start from ascending
//     });
//   };

//   // Sort data according to config
//   const sortedData = [...data].sort((a, b) => {
//     if (sortConfig.direction === "default" || sortConfig.key === null) return 0;
//     if (sortConfig.direction === "asc") return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
//     if (sortConfig.direction === "desc") return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
//     return 0;
//   });

//   const filteredData = sortedData.filter((airline) =>
//     airline.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Function to confirm deletion
//   const confirmDelete = (id) => {
//     setDeleteId(id);
//     setModalOpen(true);
//   };

//   // Handle deletion of data
//   const handleDelete = () => {
//     setData((prevData) => prevData.filter((airline) => airline.id !== deleteId));
//     setModalOpen(false);
//     setDeleteId(null);
//   };

//   return (
//     <div className="p-4">
//       <div className="overflow-x-auto shadow-md">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//               {["ID", "Name", "Description"].map((col) => (
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
//               filteredData.map((airline) => (
//                 <tr key={airline.id} className="border-b hover:bg-gray-100">
//                   <td className="py-2 px-3 border text-center">{airline.id}</td>

//                   <td className="py-2 px-3 border text-center">{airline.name}</td>

//                   <td className="py-2 px-3 border text-center">{airline.description}</td>

//                   <td className="flex py-2 px-3 text-center justify-center">
//                     <button>
//                       <i className="ri-plane-line text-2xl text-blue-400"></i>
//                     </button>
//                     <button onClick={() => navigate(`/edit-airline/${airline.id}`)}>
//                       <i className="ri-edit-2-line text-2xl"></i>
//                     </button>
//                     <button className="text-red-500 mx-1" onClick={() => confirmDelete(airline.id)}>
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

// export default TableAirline

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMitraRequest } from "../redux/actions/mitraAction";
import { useNavigate } from "react-router-dom";

const TableAirline = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mitraList, loadingFetch, errorFetch } = useSelector((state) => state.mitra);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(fetchMitraRequest());
  }, [dispatch]);

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
    alert(`Delete function triggered for id: ${deleteId}`);
    setModalOpen(false);
    setDeleteId(null);
  };

  if (loadingFetch) return <p className="p-4 text-center">Loading airlines...</p>;
  if (errorFetch) return <p className="p-4 text-center text-red-600">Error: {errorFetch}</p>;

  return (
    <div className="p-4">
      <div className="overflow-x-auto shadow-md">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              {["ID", "Name", "Description"].map((col) => (
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
                  <td className="py-2 px-3 border text-center">{airline.id}</td>
                  <td className="py-2 px-3 border text-center">{airline.name}</td>
                  <td className="py-2 px-3 border text-center">{airline.description}</td>
                  <td className="flex py-2 px-3 justify-center gap-2">
                    <button title="Detail">
                      <i className="ri-plane-line text-2xl text-blue-400"></i>
                    </button>
                    <button
                      title="Edit"
                      onClick={() => navigate(`/edit-airline/${airline.id}`)}
                    >
                      <i className="ri-edit-2-line text-2xl"></i>
                    </button>
                    <button
                      title="Delete"
                      className="text-red-500"
                      onClick={() => confirmDelete(airline.id)}
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
              Are you sure you want to delete ID {deleteId}?
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
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableAirline;
