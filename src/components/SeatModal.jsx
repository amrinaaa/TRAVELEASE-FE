import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSeatCategoriesRequest, createSeats } from "../redux/actions/mitraAction";

// Pindahkan seatLines ke luar komponen agar menjadi konstanta
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

  // 1. Fetch Kategori Kursi
  useEffect(() => {
    if (planeId) {
      dispatch(fetchSeatCategoriesRequest(planeId));
    }
  }, [dispatch, planeId]);

  // 2. Set Kategori Default saat daftar kategori berubah
  useEffect(() => {
    if (seatCategoryList.length > 0 && !selectedCategoryId) {
      setSelectedCategoryId(seatCategoryList[0].id);
    }
  }, [seatCategoryList, selectedCategoryId]); // Hanya jalankan saat daftar berubah

  // 3. Hitung 'start' saat Kategori atau Kursi yang Ada berubah
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
      // Set nilai HANYA jika berbeda dari yang ada atau jika belum ada
      // Ini mencegah pembaruan yang tidak perlu, tetapi untuk input, kita biarkan di-set
      config[line] = seatConfig[line] || { start: nextStart, end: nextStart + 5 };
      // Jika start default lebih besar dari end yang ada, update end
      if(config[line].start > config[line].end) {
          config[line].end = config[line].start + 5;
      }
      // Jika start default berbeda dari yang ada, set ulang
       if (!seatConfig[line] || seatConfig[line].start !== nextStart) {
           config[line] = { start: nextStart, end: nextStart + 5 };
       }

    });
     // Hanya set jika config benar-benar baru atau berbeda (shallow compare)
     // Untuk kasus ini, kita set saja, tapi loop harusnya sudah teratasi dengan memindahkan seatLines
    setSeatConfig(config);

  }, [selectedCategoryId, categories]); // Hapus seatLines dari dependensi

  // 4. Tangani Hasil Penambahan Kursi
  useEffect(() => {
      if (!loadingCreateSeats && (createdSeatsInfo || errorCreateSeats)) {
          if (errorCreateSeats) {
              alert(`Error adding seats: ${errorCreateSeats}`);
          } else if (createdSeatsInfo) {
              alert(`Successfully added ${createdSeatsInfo.seatCount} seats!`);
              onClose();
          }
          // Reset status? Tergantung bagaimana Redux diatur,
          // Mungkin perlu action `resetCreateSeatsStatus`.
      }
  }, [loadingCreateSeats, createdSeatsInfo, errorCreateSeats, onClose]);

  // Handler input dengan useCallback agar lebih stabil
  const handleInputChange = useCallback((line, field, value) => {
      const numValue = parseInt(value);
      setSeatConfig(prev => ({
          ...prev,
          [line]: {
              ...prev[line],
              // Pastikan nilai minimal adalah 1 atau nilai start (untuk end)
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

          {SEAT_LINES.map(line => ( // Gunakan konstanta SEAT_LINES
            <React.Fragment key={line}>
              <div className="pt-2">{line}</div>
              <input
                type="number"
                min="1"
                value={seatConfig[line]?.start || 1} // Beri nilai default jika belum ada
                onChange={(e) => handleInputChange(line, 'start', e.target.value)}
                className="p-1 border rounded disabled:bg-gray-200"
                disabled={isLoading}
              />
              <input
                type="number"
                min={seatConfig[line]?.start || 1}
                value={seatConfig[line]?.end || seatConfig[line]?.start || 1} // Beri nilai default
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