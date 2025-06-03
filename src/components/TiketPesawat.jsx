import React from 'react';
import { useLocation, Link } from 'react-router-dom';

// Fungsi untuk memformat tanggal dan waktu
const formatDateTime = (dateTimeString, type = 'time') => {
  if (!dateTimeString) return 'N/A';
  const date = new Date(dateTimeString);
  if (type === 'time') {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false });
  }
  if (type === 'date') {
    return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  }
  return date.toLocaleString('id-ID');
};

const TiketPesawat = ({ flights }) => { // Menerima prop 'flights'
  const location = useLocation();
  // Path detail pesawat mungkin perlu disesuaikan jika ada parameter ID dari API
  const isDetailPage = location.pathname.startsWith('/detail-pesawat');


  if (!flights || flights.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-gray-500">No flights available at the moment.</p>
      </div>
    );
  }

  return (
    <>
      {flights.map((flight) => (
        <div
          key={flight.id} // Menggunakan flight.id dari API
          className="flex md:flex-row flex-col mb-4"
        >
          <div
            className={`w-full bg-ungu10 ${
              isDetailPage
                ? 'rounded-3xl'
                : 'md:rounded-l-3xl rounded-t-3xl md:rounded-tr-none'
            } shadow-lg md:p-8 p-4 flex flex-col md:flex-row md:grid md:grid-cols-6 items-center justify-between gap-4 md:gap-0`}
          >
            {/* Maskapai */}
            <div className="flex flex-col text-center md:text-left">
              <span className="md:font-bold font-semibold md:text-xl text-sm text-black">
                Airline
              </span>
              <span className="md:font-semibold md:text-lg text-xs text-black">
                {flight.plane?.airline?.name || 'N/A'}
              </span>
              <span className="md:font-semibold md:text-lg text-xs text-black">
                {flight.flightCode}
              </span>
            </div>

            {/* Departure */}
            <div className="flex flex-col text-center">
              <span className="md:font-bold font-semibold md:text-xl text-sm text-black">
                Departure
              </span>
              <span className="md:font-semibold md:text-lg text-xs text-black">
                {flight.departureAirport?.city || 'N/A'} ({flight.departureAirport?.code || 'N/A'})
              </span>
              <span className="md:font-semibold md:text-lg text-xs text-black">
                {formatDateTime(flight.departureTime, 'time')}
              </span>
              <span className="text-xs text-gray-500">
                {formatDateTime(flight.departureTime, 'date')}
              </span>
            </div>

            {/* Panah */}
            <div className="flex items-center justify-center transform md:rotate-0 rotate-90">
              <span className="md:text-6xl text-3xl font-bold text-purple-500">
                &rarr;
              </span>
            </div>

            {/* Arrival */}
            <div className="flex flex-col text-center">
              <span className="md:font-bold font-semibold md:text-xl text-sm text-black">
                Arrival
              </span>
              <span className="md:font-semibold md:text-lg text-xs text-black">
                {flight.arrivalAirport?.city || 'N/A'} ({flight.arrivalAirport?.code || 'N/A'})
              </span>
              <span className="md:font-semibold md:text-lg text-xs text-black">
                {formatDateTime(flight.arrivalTime, 'time')}
              </span>
              <span className="text-xs text-gray-500">
                {formatDateTime(flight.arrivalTime, 'date')}
              </span>
            </div>

            {/* Class - Ambil dari kategori kursi pertama jika ada */}
            <div className="flex flex-col text-center">
              <span className="md:font-bold font-semibold md:text-xl text-sm text-black">
                Class
              </span>
              <span className="md:font-semibold md:text-lg text-xs text-black">
                {flight.plane?.seatCategories?.[0]?.name || 'N/A'}
              </span>
              <span className="md:font-semibold md:text-lg text-xs text-black invisible">.</span>
            </div>

            {/* Price - Menampilkan priceRange */}
            <div className="flex flex-col text-center">
              <span className="md:font-bold font-semibold md:text-xl text-sm text-black">
                Price Range
              </span>
              <span className="md:font-semibold md:text-lg text-xs text-black">
                {flight.priceRange ? `Rp ${flight.priceRange.replace(/\s*-\s*/, ' - Rp ')}` : 'N/A'}
              </span>
               <span className="text-xs text-gray-500">
                (Details per class)
              </span>
            </div>
          </div>

          {/* Tombol Choose */}
          {!isDetailPage && (
            <div>
              <Link to={`/detail-pesawat/${flight.id}`}> {/* Menggunakan flight.id dari API */}
                <button className="bg-ungu4 text-white text-md md:text-base md:py-2 md:px-4 py-3 px-0 w-full md:w-auto md:rounded-r-3xl rounded-b-3xl md:rounded-bl-none h-full flex justify-center items-center">
                  Choose
                </button>
              </Link>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default TiketPesawat;