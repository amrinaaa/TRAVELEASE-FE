import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import {
  fetchAirportsRequest,
  createFlight
} from "../redux/actions/mitraAction";
import { resetCreateFlightStatus } from "../redux/reducers/mitraReducer"

const TambahPenerbangan = ({ isSidebarOpen }) => {
  const { planeId } = useParams(); // Menggunakan planeId dari URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- Redux State ---
  const {
    airportList,
    loadingAirports,
    // errorAirports, // Uncomment jika perlu menampilkan error fetching airports
    loadingCreateFlight,
    errorCreateFlight,
    createdFlight,
  } = useSelector((state) => state.mitra);

  // --- Local State for Form ---
  const [departureAirportId, setDepartureAirportId] = useState('');
  const [arrivalAirportId, setArrivalAirportId] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [price, setPrice] = useState('');
  const [hasHandledResult, setHasHandledResult] = useState(false);

  // --- Effects ---

  // 1. Fetch Airports on component mount
  useEffect(() => {
    dispatch(fetchAirportsRequest());
  }, [dispatch]);

  // 2. Handle Flight Creation Result
  useEffect(() => {
    if (!loadingCreateFlight && (createdFlight || errorCreateFlight) && !hasHandledResult) {
      if (errorCreateFlight) {
        alert(`Error adding flight: ${errorCreateFlight}`);
      } else if (createdFlight) {
        alert(`Flight ${createdFlight.flightCode} added successfully!`);
        handleReset();
        // Navigasi kembali ke halaman detail/seat pesawat setelah berhasil
        navigate(`/edit-pesawat/${planeId}`);
      }
      dispatch(resetCreateFlightStatus()); // Reset status setelah ditangani
      setHasHandledResult(true);
    }
  }, [loadingCreateFlight, createdFlight, errorCreateFlight, dispatch, navigate, planeId, hasHandledResult]);

  // --- Handlers ---
  const handleReset = () => {
    setDepartureAirportId('');
    setArrivalAirportId('');
    setDepartureTime('');
    setArrivalTime('');
    setPrice('');
    setHasHandledResult(false); // Reset flag saat form di-reset
  };

  const handleSubmit = () => {
    if (!planeId || !departureAirportId || !arrivalAirportId || !departureTime || !arrivalTime || !price) {
      alert("Please fill in all fields.");
      return;
    }

    // Validasi waktu
    const depTime = new Date(departureTime);
    const arrTime = new Date(arrivalTime);

    if (arrTime <= depTime) {
        alert("Arrival time must be after departure time.");
        return;
    }
    if (parseFloat(price) <= 0) {
        alert("Price must be greater than 0.");
        return;
    }


    const flightData = {
      planeId: planeId,
      departureAirportId: departureAirportId,
      arrivalAirportId: arrivalAirportId,
      departureTime: depTime.toISOString(), // Format ke ISO String
      arrivalTime: arrTime.toISOString(),   // Format ke ISO String
      price: Number(price), // Pastikan harga adalah angka
    };

    setHasHandledResult(false); // Reset flag sebelum submit baru
    dispatch(createFlight(flightData));
  };

  const isLoading = loadingAirports || loadingCreateFlight;

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-screen transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        {/* Header & Breadcrumbs */}
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">Airline Management</p>
            <p className="text-xs pt-2 text-gray-600">Add Flight</p>
          </div>
          <div className="flex flex-row justify-end">
            <Link to="/manajemen-maskapai" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <i className="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
            {/* Link ke halaman detail/seat pesawat saat ini */}
            <Link to={`/edit-pesawat/${planeId || ''}`} className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0 ml-1">
              <p>/</p><p className="text-xs md:text-sm">Seat List</p>
            </Link>
            <Link to={`/tambah-penerbangan/${planeId || ''}`} className="flex items-center gap-1 text-black pt-9 md:pt-0 ml-1">
              <p>/</p><p className="text-xs md:text-sm">Add Flight</p>
            </Link>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="flex-col px-4 items-center">
            <p className="text-left md:text-xl mb-6 md:mb-12">Add New Flight for Plane ID: {planeId}</p>
            <div className="flex flex-col items-center">
                {/* Departure Airport */}
                <div className="mb-4 w-full max-w-md">
                <label className="block text-sm font-semibold text-gray-700 text-left">
                    <span className="text-red-700 mr-1">*</span>Departure Airport
                </label>
                <select
                    value={departureAirportId}
                    onChange={(e) => setDepartureAirportId(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-gray-100 focus:outline-none"
                    disabled={isLoading}
                >
                    <option value="">{loadingAirports ? "Loading Airports..." : "Select Airport"}</option>
                    {airportList.map((airport) => (
                    <option key={airport.id} value={airport.id}>
                        {airport.name} ({airport.code}) - {airport.city}
                    </option>
                    ))}
                </select>
                </div>

                {/* Arrival Airport */}
                <div className="mb-4 w-full max-w-md">
                <label className="block text-sm font-semibold text-gray-700 text-left">
                    <span className="text-red-700 mr-1">*</span>Arrival Airport
                </label>
                <select
                    value={arrivalAirportId}
                    onChange={(e) => setArrivalAirportId(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-gray-100 focus:outline-none"
                    disabled={isLoading}
                >
                    <option value="">{loadingAirports ? "Loading Airports..." : "Select Airport"}</option>
                    {airportList.map((airport) => (
                    <option key={airport.id} value={airport.id}>
                        {airport.name} ({airport.code}) - {airport.city}
                    </option>
                    ))}
                </select>
                </div>

                {/* Departure Time */}
                <div className="mb-4 w-full max-w-md">
                <label className="block text-sm font-semibold text-gray-700 text-left">
                    <span className="text-red-700 mr-1">*</span>Departure Time
                </label>
                <input
                    type="datetime-local"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-gray-100 focus:outline-none"
                    disabled={isLoading}
                />
                </div>

                {/* Arrival Time */}
                <div className="mb-4 w-full max-w-md">
                <label className="block text-sm font-semibold text-gray-700 text-left">
                    <span className="text-red-700 mr-1">*</span>Arrival Time
                </label>
                <input
                    type="datetime-local"
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-gray-100 focus:outline-none"
                    disabled={isLoading}
                />
                </div>

                {/* Price */}
                <div className="mb-4 w-full max-w-md">
                <label className="block text-sm font-semibold text-gray-700 text-left">
                    <span className="text-red-700 mr-1">*</span>Price (IDR)
                </label>
                <input
                    type="number"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-gray-100 focus:outline-none"
                    placeholder="e.g., 1500000"
                    disabled={isLoading}
                />
                </div>
            </div>
            <div className="flex justify-center gap-6 mt-10 mb-6">
              <Button
                text="Reset"
                bgColor="bg-yellow1"
                onClick={handleReset}
                disabled={isLoading}
              />
              <Button
                text={loadingCreateFlight ? "Submitting..." : "Submit"}
                bgColor="bg-blue1"
                onClick={handleSubmit}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahPenerbangan;