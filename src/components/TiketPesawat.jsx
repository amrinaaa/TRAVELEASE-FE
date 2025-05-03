import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import tiketData from '../utils/dataTiketPesawat.json';

const TiketPesawat = () => {
  const location = useLocation();
  const isDetailPage = location.pathname === '/detail-pesawat';

  return (
    <>
      {tiketData.map((ticket, idx) => (
        <div 
          key={idx}
          className="flex md:flex-row flex-col mb-4"
        >
          <div 
            className={`w-full bg-ungu10 ${
              isDetailPage
                ? 'rounded-3xl'
                : 'md:rounded-l-3xl rounded-t-3xl md:rounded-tr-none'
            } shadow-lg md:p-8 p-2 flex md:grid md:grid-cols-6 items-center justify-between`}
          >
            {/* Maskapai */}
            <div className="flex flex-col">
              <span className="md:font-bold font-semibold md:text-xl text-sm text-black">
                Maskapai
              </span>
              <span className="md:font-semibold md:text-lg text-xs text-black">
                {ticket.maskapai}
              </span>
              <span className="md:font-semibold md:text-lg text-xs text-black invisible">.</span>
            </div>

            {/* Departure */}
            <div className="flex flex-col text-center">
              <span className="md:font-bold font-semibold md:text-xl text-sm text-black">
                Departure
              </span>
              <span className="md:font-semibold md:text-lg text-xs text-black">
                {ticket.departure.tempat}
              </span>
              <span className="md:font-semibold md:text-lg text-xs text-black">
                {ticket.departure.jam}
              </span>
            </div>

            {/* Panah */}
            <div className="flex items-center justify-center">
              <span className="md:text-6xl text-xl font-bold text-purple-500">
                &gt;
              </span>
            </div>

            {/* Arrival */}
            <div className="flex flex-col text-center">
              <span className="md:font-bold font-semibold md:text-xl text-sm text-black">
                Arrival
              </span>
              <span className="md:font-semibold md:text-lg text-xs text-black">
                {ticket.arrival.tempat}
              </span>
              <span className="md:font-semibold md:text-lg text-xs text-black">
                {ticket.arrival.jam}
              </span>
            </div>

            {/* Class (hardcode jika belum ada di JSON) */}
            <div className="flex flex-col text-center">
              <span className="md:font-bold font-semibold md:text-xl text-sm text-black">
                Class
              </span>
              <span className="md:font-semibold md:text-lg text-xs text-black">
                Economy
              </span>
              <span className="md:font-semibold md:text-lg text-xs text-black invisible">.</span>
            </div>

            {/* Price */}
            <div className="flex flex-col text-center">
              <span className="md:font-bold font-semibold md:text-xl text-sm text-black">
                Price
              </span>
              <span className="md:font-semibold md:text-lg text-xs text-black">
                Rp {ticket.price.toLocaleString('id-ID')}
              </span>
              <span className="md:font-semibold md:text-lg text-xs text-black invisible">.</span>
            </div>
          </div>

          {/* Tombol Choose */}
          {!isDetailPage && (
            <div>
              <Link to={`/detail-pesawat/${ticket.id}`}>
                <button className="bg-ungu4 text-white text-md md:text-base md:py-2 md:px-4 py-1 px-40 md:rounded-r-3xl rounded-br-3xl rounded-bl-3xl md:rounded-bl-none h-full flex justify-center items-center">
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

export default TiketPesawat