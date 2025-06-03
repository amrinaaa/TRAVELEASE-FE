import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateRoomStatus, deleteRoom, clearDeleteRoomError } from "../redux/actions/mitraAction"; // Assuming clearDeleteRoomError exists

const TableRoom = ({ searchQuery }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "default" });
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");

  // State for success modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { hotelId } = useParams();

  const {
    roomList,
    loadingUpdateRoomStatus,
    errorUpdateRoomStatus,
    loadingDeleteRoom,
    errorDeleteRoom,
  } = useSelector((state) => state.mitra);

  // To track previous loading state for delete
  const prevLoadingDeleteRoomRef = useRef(loadingDeleteRoom);

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
    let sortableItems = [...(roomList || [])];
    const key = sortConfig.key;
    if (sortConfig.direction === "default" || !key) return sortableItems;
    sortableItems.sort((a, b) => {
      let aVal = a[key];
      let bVal = b[key];
      if (key === 'type') { aVal = a.roomType; bVal = b.roomType; }
      else if (key === 'facilities') { aVal = Array.isArray(a.facilities) ? a.facilities.join(", ") : ""; bVal = Array.isArray(b.facilities) ? b.facilities.join(", ") : "";}
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
    if (!searchQuery) return sortedData;
    return sortedData.filter((room) =>
      room.name && room.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [sortedData, searchQuery]);

  const confirmDelete = (id) => {
    const roomToDelete = filteredData.find(room => room.id === id);
    if (roomToDelete) {
      setDeleteId(id);
      setDeleteName(roomToDelete.name || `Room ID ${id}`);
      setModalOpen(true);
    } else {
      setDeleteId(id);
      setDeleteName(`Room ID ${id}`);
      setModalOpen(true);
    }
  };

  const handleStatusChange = (roomId, currentHotelId, newStatus) => {
    dispatch(updateRoomStatus(roomId, currentHotelId, newStatus));
  };

  const handleDelete = () => {
    if (deleteId) {
      dispatch(deleteRoom(deleteId));
      // Confirmation modal will be closed by useEffect when loadingDeleteRoom changes
    }
  };

  const handleCancelDelete = () => {
    setModalOpen(false);
    setDeleteId(null);
    setDeleteName("");
  }

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setSuccessMessage("");
    setDeleteId(null); // Clear deleteId after success modal is closed
    setDeleteName(""); // Clear deleteName
  }

  useEffect(() => {
    // Effect for handling the result of a delete operation
    if (prevLoadingDeleteRoomRef.current && !loadingDeleteRoom && deleteId) {
      setModalOpen(false); // Close the confirmation modal regardless of outcome once loading is done
      if (!errorDeleteRoom) {
        // Success
        setSuccessMessage(`Room "${deleteName}" has been successfully deleted.`);
        setShowSuccessModal(true);
        // deleteId and deleteName are kept for the success message, reset on success modal close
      } else {
        // Error (handled by the alert in the next useEffect, but confirmation modal is closed here)
        // Optionally, if you don't want the alert AND a modal, you could set an error modal here.
      }
    }
    prevLoadingDeleteRoomRef.current = loadingDeleteRoom;
  }, [loadingDeleteRoom, errorDeleteRoom, deleteId, deleteName]);

  useEffect(() => {
    // Effect for alerting error messages
    if (errorDeleteRoom && !prevLoadingDeleteRoomRef.current && !loadingDeleteRoom) { // Ensure it shows only after loading finishes
      alert(`Error deleting room: ${errorDeleteRoom}`);
      dispatch(clearDeleteRoomError()); // Dispatch action to clear the error from Redux state
    }
  }, [errorDeleteRoom, loadingDeleteRoom, dispatch]);


  const isRoomUpdating = (roomId) => loadingUpdateRoomStatus && loadingUpdateRoomStatus[roomId];
  const getRoomUpdateError = (roomId) => errorUpdateRoomStatus && errorUpdateRoomStatus[roomId];

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
                  onClick={() => handleSort(col.toLowerCase())}
                >
                  {col}
                  <i className="ml-1 ri-arrow-up-down-line"></i>
                </th>
              ))}
              <th className="py-2 px-3 border">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {filteredData && filteredData.length > 0 ? (
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
                  <td className="py-2 border text-center">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        room.status === "Available"
                          ? "bg-green-500 text-white px-5"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {room.status || 'N/A'}
                    </span>
                    {isRoomUpdating(room.id) && <p className="text-xs text-blue-500 mt-1">Updating...</p>}
                    {getRoomUpdateError(room.id) && <p className="text-xs text-red-500 mt-1">Error: {getRoomUpdateError(room.id)}</p>}
                  </td>
                  <td className="flex justify-center py-2 px-3 gap-2">
                    <button onClick={() => navigate(`/edit-ruangan-admin/${hotelId}/${room.id}`)} title="Edit">
                      <i className="ri-edit-2-line text-xl"></i>
                    </button>
                    <button className="text-red-500" onClick={() => confirmDelete(room.id)} title="Delete" disabled={loadingDeleteRoom && deleteId === room.id}>
                      {loadingDeleteRoom && deleteId === room.id ? <i className="ri-loader-4-line text-xl animate-spin"></i> : <i className="ri-delete-bin-5-line text-xl"></i>}
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

      {/* Confirmation Delete Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center transform transition-all sm:max-w-xs sm:w-full">
            <div className="mb-4">
              <i className="ri-error-warning-line text-5xl text-red-500"></i>
            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
              Confirm Deletion
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete room "{deleteName}"?
            </p>
            <p className="text-xs text-red-600 mb-4">
              This action cannot be undone
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={handleCancelDelete} 
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" 
                disabled={loadingDeleteRoom}
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete} 
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" 
                disabled={loadingDeleteRoom}
              >
                {loadingDeleteRoom ? (
                    <>
                        <i className="ri-loader-4-line animate-spin mr-2"></i>
                        Deleting...
                    </>
                ) : (
                    "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center transform transition-all sm:max-w-xs sm:w-full">
            <div className="mb-4">
                <i className="ri-checkbox-circle-line text-5xl text-green-500"></i>
            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
              Success!
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              {successMessage}
            </p>
            <div className="flex justify-center">
              <button 
                onClick={closeSuccessModal} 
                className="px-6 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableRoom;