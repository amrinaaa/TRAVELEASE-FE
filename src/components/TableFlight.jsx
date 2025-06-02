import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import dataPenerbangan from "../utils/dataPenerbangan.json"; // Removed dummy data import
import { useDispatch, useSelector } from "react-redux";
import { getMitraFlights, deleteMitraFlight } from "../redux/actions/mitraPlaneScheduleActions"; // Adjust path as needed
import { resetDeleteFlightStatus } from "../redux/reducers/mitraPlaneScheduleReducer";
// Helper function to render cell content
const renderCellContent = (value) => {
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    // Check for the specific structure from the error, or commonly used 'name' property
    if (value.hasOwnProperty('name')) {
      return value.name;
    }
    if (value.hasOwnProperty('price')) { // From the error keys {id, name, category, price}
        return String(value.price); // Ensure price is stringified if it's a number
    }
    // As a fallback for other objects, or to see the structure for debugging
    return JSON.stringify(value);
  }
  return value; // Return as is if string, number, boolean, null, undefined
};

const TableFlight = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    flights,
    loadingFlights,
    errorFlights,
    loadingDeleteFlight,
    errorDeleteFlight,
    deleteFlightSuccess
  } = useSelector((state) => state.mitraPlaneSchedule);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(getMitraFlights());
  }, [dispatch]);

  useEffect(() => {
    if (deleteFlightSuccess) {
      setModalOpen(false);
      setDeleteId(null);
      dispatch(resetDeleteFlightStatus());
    }
  }, [deleteFlightSuccess, dispatch]);

  const columnMapping = [
    { displayName: "Plane Name", apiKey: "Plane Name" },
    { displayName: "Airline", apiKey: "Airline"},
    { displayName: "Departure Time", apiKey: "Departure Time" },
    { displayName: "Departure Airport", apiKey: "Departure Airport" },
    { displayName: "Arrival Time", apiKey: "Arrival Time" },
    { displayName: "Arrival Airport", apiKey: "Arrival Airport" },
    { displayName: "Price Range", apiKey: "Price Range" },
    { displayName: "Seats Available", apiKey: "Seats Available" },
    { displayName: "Flight Status", apiKey: "Flight Status"}
  ];

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

  const sortedData = React.useMemo(() => {
    if (!flights) return [];
    let sortableItems = [...flights];
    if (sortConfig.key !== null && sortConfig.direction !== "default") {
      sortableItems.sort((a, b) => {
        const valA = renderCellContent(a[sortConfig.key]); // Use rendered content for sorting if it was an object
        const valB = renderCellContent(b[sortConfig.key]);
        if (valA < valB) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (valA > valB) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [flights, sortConfig]);

  const filteredData = React.useMemo(() => {
    if (!searchQuery) return sortedData;
    return sortedData.filter((flight) =>
      String(flight["Plane Name"])?.toLowerCase().includes(searchQuery.toLowerCase()) || // Ensure string for safety
      String(flight["Airline"])?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(flight["Departure Airport"])?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(flight["Arrival Airport"])?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [sortedData, searchQuery]);

  const confirmDelete = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  const handleDelete = () => {
    if (deleteId) {
      dispatch(deleteMitraFlight(deleteId));
    }
  };

  if (loadingFlights) {
    return <div className="p-4 text-center">Loading flight data...</div>;
  }

  if (errorFlights) {
    return <div className="p-4 text-center text-red-500">Error fetching flights: {errorFlights}</div>;
  }

  return (
    <div className="p-4">
      <div className="overflow-x-auto shadow-md rounded-2xl">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-purple-200 text-gray-700 uppercase text-sm leading-normal">
              {columnMapping.map((col) => (
                <th
                  key={col.apiKey}
                  className="py-2 px-3 border cursor-pointer"
                  onClick={() => handleSort(col.apiKey)}
                >
                  {col.displayName}{" "}
                  <i className={`ml-1 ri-arrow-up-down-line ${sortConfig.key === col.apiKey ? (sortConfig.direction === 'asc' ? 'ri-sort-asc' : sortConfig.direction === 'desc' ? 'ri-sort-desc' : '') : ''}`}></i>
                </th>
              ))}
              <th className="py-2 px-3 border">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredData.length > 0 ? (
              filteredData.map((flight) => (
                <tr key={flight["Flight ID"]} className="border-b hover:bg-gray-100">
                  {columnMapping.map(col => (
                    <td key={`${flight["Flight ID"]}-${col.apiKey}`} className="py-2 px-3 border text-center">
                      {renderCellContent(flight[col.apiKey])}
                    </td>
                  ))}
                  <td className="flex py-2 px-3 text-center justify-center items-center">
                    <button onClick={() => navigate(`/list-pengguna-pesawat/${flight["Flight ID"]}`)} title="View Passengers">
                      <svg xmlns="http://www.w3.org/2000/svg" className="text-ungu7" width="27" height="27" viewBox="0 0 24 24"><path fill="currentColor" d="M6 17c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6m9-9a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3a3 3 0 0 1 3 3M3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2"/></svg>
                    </button>
                    <button className="text-red-500 mx-1" onClick={() => confirmDelete(flight["Flight ID"])} title="Delete Flight" disabled={loadingDeleteFlight}>
                      {loadingDeleteFlight && deleteId === flight["Flight ID"] ? <i className="ri-loader-4-line animate-spin text-2xl"></i> : <i className="ri-delete-bin-5-line text-2xl"></i>}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columnMapping.length + 1} className="text-center py-4 text-gray-500">
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
              Are you sure you want to delete flight ID: {deleteId}?
            </p>
            {errorDeleteFlight && <p className="text-red-500 text-sm mb-2">Error: {errorDeleteFlight}</p>}
            <div className="flex justify-center text-xs md:text-base">
              <button className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2" onClick={() => setModalOpen(false)} disabled={loadingDeleteFlight}>
                No
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={handleDelete} disabled={loadingDeleteFlight}>
                {loadingDeleteFlight ? 'Deleting...' : 'Yes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableFlight;