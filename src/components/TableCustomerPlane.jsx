import React, { useState, useEffect } from "react";
// import dataCustomerPlane from "../utils/dataCustomerPlane.json"; // Data dummy tidak lagi diimpor langsung

// Komponen akan menerima passengersData dan passengerStats dari props (dari CustomerPesawat.jsx)
const TableCustomerPlane = ({ searchQuery, passengersData = [], passengerStats = {} }) => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });
  // useNavigate tidak digunakan di versi ini karena tidak ada navigasi atau aksi delete
  // const navigate = useNavigate();

  // Menggunakan data penumpang dari props (yang berasal dari Redux)
  useEffect(() => {
    setData(passengersData);
  }, [passengersData]);

  // Fungsi untuk sorting
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === "default") return { key, direction: "asc" };
        if (prev.direction === "asc") return { key, direction: "desc" };
        return { key: null, direction: "default" }; // Reset ke urutan default
      }
      return { key, direction: "asc" }; // Jika ganti kolom, mulai dari ascending
    });
  };

  // Mengurutkan data sesuai konfigurasi
  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.direction === "default" || sortConfig.key === null) return 0;
    // Pastikan properti ada sebelum diakses untuk sorting
    const valA = a[sortConfig.key] || '';
    const valB = b[sortConfig.key] || '';
    if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Filter data berdasarkan searchQuery
  // Pastikan customerPlane.name ada dan merupakan string
  const filteredData = sortedData.filter((customerPlane) =>
    customerPlane && typeof customerPlane.name === 'string' &&
    customerPlane.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fungsi untuk menampilkan statistik penumpang (seperti sebelumnya)
  const renderStats = () => {
    if (!passengerStats || Object.keys(passengerStats).length === 0) return null;
    return (
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4 text-sm text-gray-700">
            <div className="bg-blue-100 p-3 rounded-lg shadow"><strong>Total Passengers:</strong> {passengerStats.totalPassengers}</div>
            <div className="bg-green-100 p-3 rounded-lg shadow"><strong>Adults:</strong> {passengerStats.adultCount}</div>
            <div className="bg-yellow-100 p-3 rounded-lg shadow"><strong>Children:</strong> {passengerStats.childrenCount}</div>
            <div className="bg-indigo-100 p-3 rounded-lg shadow"><strong>Paid Tickets:</strong> {passengerStats.paidTickets}</div>
            <div className="bg-red-100 p-3 rounded-lg shadow"><strong>Unpaid Tickets:</strong> {passengerStats.unpaidTickets}</div>
        </div>
    );
  };

  // Kolom yang akan ditampilkan, sesuai dengan struktur asli dan data yang diharapkan
  const displayColumns = ["Name", "NIK", "Gender", "Age Category", "Class", "Seat"];
  // Mapping ke kunci data (asumsi sama dengan nama kolom dalam huruf kecil)
  const dataKeys = {
    "Name": "name",
    "NIK": "nik",
    "Gender": "gender",
    "Age Category": "ageCategory",
    "Class": "class",
    "Seat": "seat"
  };


  return (
    <div className="p-4">
      {renderStats()}
      <div className="overflow-x-auto shadow-md rounded-2xl">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-purple-200 text-gray-700 uppercase text-sm leading-normal">
              {displayColumns.map((colName) => (
                <th
                  key={colName}
                  className="py-2 px-3 border cursor-pointer"
                  onClick={() => handleSort(dataKeys[colName])} // Menggunakan dataKey untuk sorting
                >
                  {colName}{" "}
                  <i className={`ml-1 ri-arrow-up-down-line ${sortConfig.key === dataKeys[colName] ? (sortConfig.direction === 'asc' ? 'ri-sort-asc' : sortConfig.direction === 'desc' ? 'ri-sort-desc' : '') : ''}`}></i>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredData.length > 0 ? (
              filteredData.map((customerPlane, index) => (
                // Menggunakan ID unik dari customerPlane jika ada, jika tidak, gunakan index
                <tr key={customerPlane.id || `passenger-${index}`} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-3 border text-center">{customerPlane.name}</td>
                  <td className="py-2 px-3 border text-center">{customerPlane.nik}</td>
                  <td className="py-2 px-3 border text-center">{customerPlane.gender}</td>
                  <td className="py-2 px-3 border text-center">{customerPlane.ageCategory}</td>
                  <td className="py-2 px-3 border text-center">{customerPlane.class}</td>
                  <td className="py-2 px-3 border text-center">{customerPlane.seat}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={displayColumns.length} className="text-center py-4 text-gray-500">
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

export default TableCustomerPlane;