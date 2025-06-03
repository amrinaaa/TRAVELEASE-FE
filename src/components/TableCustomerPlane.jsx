import React, { useState, useEffect } from "react";

const TableCustomerPlane = ({ searchQuery, passengersData = [], passengerStats = {} }) => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });

  useEffect(() => {
    setData(passengersData);
  }, [passengersData]);

  // Helper function to get value from object, supports nested keys like 'seat.name'
  const getNestedValue = (obj, path) => {
    if (!path) return undefined;
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

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

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.direction === "default" || sortConfig.key === null) return 0;

    const valA = getNestedValue(a, sortConfig.key) || '';
    const valB = getNestedValue(b, sortConfig.key) || '';

    // Handle numeric sorting for NIK if desired, otherwise treat as string
    // For simplicity, all are treated as strings here. Add specific type checks if needed.
    if (String(valA).toLowerCase() < String(valB).toLowerCase()) return sortConfig.direction === "asc" ? -1 : 1;
    if (String(valA).toLowerCase() > String(valB).toLowerCase()) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredData = sortedData.filter((customerPlane) => {
    // Filter berdasarkan passengerName
    const name = customerPlane?.passengerName || '';
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

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

  const displayColumns = ["Name", "NIK", "Gender", "Age Category", "Class", "Seat"];
  // Mapping ke kunci data dari API
  const dataKeys = {
    "Name": "passengerName",
    "NIK": "passengerNIK",
    "Gender": "gender",
    "Age Category": "type", // API menggunakan 'type' (e.g., 'ADULT')
    "Class": "seat.category", // Properti bersarang
    "Seat": "seat.name" // Properti bersarang
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
                  onClick={() => handleSort(dataKeys[colName])}
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
                // Menggunakan ticketId sebagai key unik
                <tr key={customerPlane.ticketId || `passenger-${index}`} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-3 border text-center">{customerPlane.passengerName}</td>
                  <td className="py-2 px-3 border text-center">{customerPlane.passengerNIK}</td>
                  <td className="py-2 px-3 border text-center">{customerPlane.gender}</td>
                  <td className="py-2 px-3 border text-center">{customerPlane.type}</td> {/* Sesuai dengan 'type' dari API */}
                  <td className="py-2 px-3 border text-center">{customerPlane.seat?.category}</td> {/* Akses properti bersarang */}
                  <td className="py-2 px-3 border text-center">{customerPlane.seat?.name}</td> {/* Akses properti bersarang */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={displayColumns.length} className="text-center py-4 text-gray-500">
                  {searchQuery ? "No results found for your search." : "No passenger data available."}
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