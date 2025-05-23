import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSeatCategoriesRequest,
  createSeats
} from "../redux/actions/mitraAction";

import { resetCreateSeatsStatus } from "../redux/reducers/mitraReducer";

const SEAT_LINES = ['A', 'B', 'C', 'D', 'E', 'F'];

const SeatModal = ({ onClose, existingSeats, planeId, categories }) => {
  const dispatch = useDispatch();
  const {
      seatCategoryList,
      loadingSeatCategories,
      loadingCreateSeats,
      errorCreateSeats,
      createdSeatsInfo
  } = useSelector(state => state.mitra);

  const [seatConfig, setSeatConfig] = useState({});
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [hasHandledResult, setHasHandledResult] = useState(false); // State lokal untuk track

  // 1. Fetch Kategori Kursi
  useEffect(() => {
    if (planeId) {
      dispatch(fetchSeatCategoriesRequest(planeId));
      setHasHandledResult(false); // Reset status handle saat modal dibuka
    }
  }, [dispatch, planeId]);

  // 2. Set Kategori Default
  useEffect(() => {
    if (seatCategoryList.length > 0 && !selectedCategoryId) {
      setSelectedCategoryId(seatCategoryList[0].id);
    }
  }, [seatCategoryList, selectedCategoryId]);

  // 3. Hitung 'start'
  useEffect(() => {
    const config = {};
    const currentCategoryData = categories.find(cat => cat.categoryId === selectedCategoryId);
    const currentSeats = currentCategoryData ? currentCategoryData.seats : [];

    SEAT_LINES.forEach(line => {
      const seatsInLine = currentSeats
        .filter(seat => seat.name.startsWith(line))
        .map(seat => parseInt(seat.name.slice(1)))
        .filter(num => !isNaN(num));

      const nextStart = seatsInLine.length > 0 ? Math.max(...seatsInLine) + 1 : 1;
      // Hanya set jika belum ada atau kategori berubah
      if (!seatConfig[line] || seatConfig[line].categoryId !== selectedCategoryId) {
          config[line] = { start: nextStart, end: nextStart + 5, categoryId: selectedCategoryId };
      } else {
          config[line] = seatConfig[line];
      }
    });
    setSeatConfig(config);

  }, [selectedCategoryId, categories]); // Hapus seatConfig dari dependensi

  // 4. Tangani Hasil Penambahan Kursi (MODIFIKASI DI SINI)
  useEffect(() => {
      // Cek jika proses *tidak* loading, ada hasilnya, DAN belum ditangani
      if (!loadingCreateSeats && (createdSeatsInfo || errorCreateSeats) && !hasHandledResult) {
          if (errorCreateSeats) {
              alert(`Error adding seats: ${errorCreateSeats}`);
          } else if (createdSeatsInfo) {
              alert(`Successfully added ${createdSeatsInfo.seatCount} seats!`);
              onClose(); // Tutup hanya jika sukses
          }
          dispatch(resetCreateSeatsStatus()); // Panggil action reset
          setHasHandledResult(true); // Tandai bahwa hasil sudah ditangani
      }
  }, [loadingCreateSeats, createdSeatsInfo, errorCreateSeats, onClose, dispatch, hasHandledResult]); // Tambah hasHandledResult


  // Handler input
  const handleInputChange = useCallback((line, field, value) => {
      const numValue = parseInt(value);
      setSeatConfig(prev => ({
          ...prev,
          [line]: {
              ...prev[line],
              [field]: isNaN(numValue) ? (field === 'start' ? 1 : prev[line]?.start || 1) : numValue,
          },
      }));
  }, []);

  // Handler Submit
  const handleSubmit = () => {
    if (!selectedCategoryId) {
      alert("Please select a seat class.");
      return;
    }

    const seatArrangement = Object.keys(seatConfig)
      .map(line => ({
        line: line,
        start: String(seatConfig[line].start),
        end: String(seatConfig[line].end),
      }))
      .filter(item => parseInt(item.start) > 0 && parseInt(item.end) > 0 && parseInt(item.start) <= parseInt(item.end));

    if (seatArrangement.length === 0) {
      alert("Please configure at least one seat line with a valid range (Start <= End and > 0).");
      return;
    }

    const seatData = {
      planeId: planeId,
      seatCategoryId: selectedCategoryId,
      seatArrangement: seatArrangement,
    };

    setHasHandledResult(false); // Reset status handle sebelum kirim
    dispatch(createSeats(seatData));
  };

  const isLoading = loadingSeatCategories || loadingCreateSeats;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-purple-100 p-6 rounded-lg w-full max-w-md shadow-lg relative">
        <h2 className="text-lg font-bold text-center mb-4">Add Seat</h2>

        <label className="block font-semibold mb-2">Class Name</label>
        <select
            className="w-full mb-4 p-2 border rounded"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            disabled={isLoading}
        >
          <option value="">{loadingSeatCategories ? "Loading..." : "Select Class"}</option>
          {seatCategoryList.map(category => (
              <option key={category.id} value={category.id}>
                  {category.name}
              </option>
          ))}
        </select>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="font-bold">Seat Line</div>
          <div className="font-bold">Start</div>
          <div className="font-bold">End</div>

          {SEAT_LINES.map(line => (
            <React.Fragment key={line}>
              <div className="pt-2">{line}</div>
              <input
                type="number"
                min="1"
                value={seatConfig[line]?.start || 1}
                onChange={(e) => handleInputChange(line, 'start', e.target.value)}
                className="p-1 border rounded disabled:bg-gray-200"
                disabled={isLoading}
              />
              <input
                type="number"
                min={seatConfig[line]?.start || 1}
                value={seatConfig[line]?.end || seatConfig[line]?.start || 1}
                onChange={(e) => handleInputChange(line, 'end', e.target.value)}
                className="p-1 border rounded disabled:bg-gray-200"
                disabled={isLoading}
              />
            </React.Fragment>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-1 rounded disabled:opacity-50"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white px-4 py-1 rounded disabled:opacity-50"
            disabled={isLoading}
          >
            {loadingCreateSeats ? "Adding..." : "Oke"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatModal;