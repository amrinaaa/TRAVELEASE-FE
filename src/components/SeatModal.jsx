import React, { useState, useEffect } from "react";

const SeatModal = ({ onClose, existingSeats, onSave }) => {
  const seatLines = ['A', 'B', 'C', 'D', 'E', 'F'];
  const [seatConfig, setSeatConfig] = useState({});

  useEffect(() => {
    const config = {};
    seatLines.forEach(line => {
      const seatsInLine = existingSeats
        .filter(seat => seat.name.startsWith(line))
        .map(seat => parseInt(seat.name.slice(1)))
        .sort((a, b) => b - a);

      const nextStart = seatsInLine.length > 0 ? Math.max(...seatsInLine) + 1 : 1;
      config[line] = { start: nextStart, end: nextStart + 5 };
    });
    setSeatConfig(config);
  }, [existingSeats]);

  const handleInputChange = (line, field, value) => {
    setSeatConfig(prev => ({
      ...prev,
      [line]: {
        ...prev[line],
        [field]: parseInt(value) || 0,
      },
    }));
  };

  const handleSubmit = () => {
    const newSeats = [];
    Object.keys(seatConfig).forEach(line => {
      const { start, end } = seatConfig[line];
      for (let i = start; i <= end; i++) {
        newSeats.push({
          id: `${line}${i}`,
          name: `${line}${i}`,
          className: "Business Class", // default
        });
      }
    });

    onSave(newSeats); // Kirim ke EditPesawat
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-purple-100 p-6 rounded-lg w-full max-w-md shadow-lg relative">
        <h2 className="text-lg font-bold text-center mb-4">Add Seat</h2>

        <label className="block font-semibold mb-2">Class Name</label>
        <select className="w-full mb-4 p-2 border rounded">
          <option>Business Class</option>
        </select>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="font-bold">Seat Line</div>
          <div className="font-bold">Start</div>
          <div className="font-bold">End</div>

          {seatLines.map(line => (
            <React.Fragment key={line}>
              <div className="pt-2">{line}</div>
              <input
                type="number"
                value={seatConfig[line]?.start || 0}
                onChange={(e) => handleInputChange(line, 'start', e.target.value)}
                className="p-1 border rounded"
              />
              <input
                type="number"
                value={seatConfig[line]?.end || 0}
                onChange={(e) => handleInputChange(line, 'end', e.target.value)}
                className="p-1 border rounded"
              />
            </React.Fragment>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-400 text-white px-4 py-1 rounded">Cancel</button>
          <button onClick={handleSubmit} className="bg-purple-600 text-white px-4 py-1 rounded">Oke</button>
        </div>
      </div>
    </div>
  );
};

export default SeatModal