import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../redux/actions/mitraAction"; // Assuming mitraAction now has fetchCustomers
import { useParams } // To get hotelId if it's in the URL, or expect as prop
from "react-router-dom";

const TableCustomerHotel = ({ searchQuery, hotelId: propHotelId }) => {
  const dispatch = useDispatch();
  const { hotelId: paramHotelId } = useParams(); // Get hotelId from URL params as a fallback or primary source

  const hotelId = propHotelId || paramHotelId; // Use prop hotelId if available, else use paramHotelId

  const {
    customerList,
    loadingCustomers,
    errorCustomers
  } = useSelector((state) => state.mitra); // Assuming customer states are in mitraReducer

  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "default" });

  useEffect(() => {
    if (hotelId) {
      dispatch(fetchCustomers(hotelId));
    }
  }, [dispatch, hotelId]);

  const tableHeaders = [
    { label: "Reservation ID", key: "idReservation", sortable: true },
    { label: "Customer Name", key: "name", sortable: true },
    { label: "Room ID", key: "idRoom", sortable: true },
    { label: "Room Type", key: "roomType", sortable: true },
    { label: "Start Date", key: "startDate", sortable: true },
    { label: "End Date", key: "endDate", sortable: true },
    { label: "Price", key: "price", sortable: true },
  ];

  const handleSort = (key) => {
    if (!tableHeaders.find(h => h.key === key)?.sortable) return;
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === "default") return { key, direction: "asc" };
        if (prev.direction === "asc") return { key, direction: "desc" };
        return { key: "name", direction: "default" }; // Reset to default
      }
      return { key, direction: "asc" };
    });
  };

  const sortedData = useMemo(() => {
    if (!customerList || customerList.length === 0) return [];
    let sortableItems = [...customerList];
    if (sortConfig.key && sortConfig.direction !== "default") {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === null || aValue === undefined) return sortConfig.direction === "asc" ? -1 : 1;
        if (bValue === null || bValue === undefined) return sortConfig.direction === "asc" ? 1 : -1;

        if (sortConfig.key === "startDate" || sortConfig.key === "endDate") {
          return sortConfig.direction === "asc"
            ? new Date(aValue) - new Date(bValue)
            : new Date(bValue) - new Date(aValue);
        }
        if (typeof aValue === "number" && typeof bValue === "number") {
            return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
        }
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        return 0;
      });
    }
    return sortableItems;
  }, [customerList, sortConfig]);

  const filteredData = useMemo(() => {
    if (!searchQuery) {
      return sortedData;
    }
    return sortedData.filter((customer) =>
      (customer.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (customer.roomType?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (customer.idReservation?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    );
  }, [sortedData, searchQuery]);

  if (!hotelId) {
    return <div className="p-4 text-center text-orange-500">Hotel ID is missing. Cannot fetch customer data.</div>;
  }

  if (loadingCustomers) {
    return <div className="p-4 text-center">Loading customer data...</div>;
  }

  if (errorCustomers) {
    return <div className="p-4 text-center text-red-500">Error: {errorCustomers}</div>;
  }

  return (
    <div className="p-4">
      <div className="overflow-x-auto shadow-md rounded-2xl">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-purple-200 text-gray-700 uppercase text-sm leading-normal">
              {tableHeaders.map((col) => (
                <th
                  key={col.key}
                  className={`py-2 px-3 border ${col.sortable ? 'cursor-pointer' : ''}`}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  {col.label}
                  {col.sortable && <i className={`ml-1 ri-arrow-up-down-line ${sortConfig.key === col.key ? (sortConfig.direction === 'asc' ? 'ri-sort-asc' : (sortConfig.direction === 'desc' ? 'ri-sort-desc' : '')) : ''}`}></i>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredData.length > 0 ? (
              filteredData.map((customer) => (
                <tr key={customer.idReservation} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-3 border text-center">{customer.idReservation || "-"}</td>
                  <td className="py-2 px-3 border text-center">{customer.name || "-"}</td>
                  <td className="py-2 px-3 border text-center">{customer.idRoom || "-"}</td>
                  <td className="py-2 px-3 border text-center">{customer.roomType || "-"}</td>
                  <td className="py-2 px-3 border text-center">
                    {customer.startDate ? new Date(customer.startDate).toLocaleDateString() : "-"}
                  </td>
                  <td className="py-2 px-3 border text-center">
                    {customer.endDate ? new Date(customer.endDate).toLocaleDateString() : "-"}
                  </td>
                  <td className="py-2 px-3 border text-center">
                    {typeof customer.price === 'number' ? `Rp ${customer.price.toLocaleString()}` : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={tableHeaders.length} className="text-center py-4 text-gray-500">
                  {searchQuery ? `No results found for "${searchQuery}".` : "No customer data found for this hotel."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableCustomerHotel;