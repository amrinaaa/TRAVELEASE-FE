// import React from 'react'
// import TableSearch from '../components/TableSearch'
// import TiketPesawat from '../components/TiketPesawat'

// const Pesawat = () => {
//   return (
//     <div>
//       <section
//         className="relative bg-cover bg-center pt-24 min-h-[90vh] flex flex-col justify-center"
//         style={{ backgroundImage: `url('src/assets/img/bgHome.png')` }}
//       >
//         {/* Overlay */}
//         <div className="absolute inset-0 bg-black bg-opacity-30 z-0"></div>

//         {/* Content */}
//         <div className="relative z-10 text-center p-8">
//           <h1 className="text-white text-5xl md:text-6xl font-bold mb-4 animate-fadeIn">
//             TravelEase
//           </h1>
//           <p className="text-white text-lg md:text-xl">
//             Pesan Tiket & Hotel dengan
//           </p>
//           <p className="text-white text-lg md:text-xl font-medium">
//             Mudah, Cepat dan Praktis!
//           </p>
//         </div>

//         {/* TableSearch di bawah teks */}
//         <div className="relative z-10 mt-6 mx-4 md:mx-80 text-left pb-12">
//           <TableSearch />
//         </div>
//       </section>

//       {/* Second Section for List Tikets */}
//       <section className='py-8'>
//         <div className='text-center mb-12'>
//           <p className='text-xl font-semibold'>Tickets</p>
//         </div>
//         <div className='md:ml-48 md:mr-48 ml-2 mr-2'>
//           <TiketPesawat />
//         </div>
//       </section>
//     </div>
//   )
// }

// export default Pesawat

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableSearch from '../components/TableSearch';
import TiketPesawat from '../components/TiketPesawat';
import { getFlights } from '../redux/actions/guestActions';

const Pesawat = () => {
  const [activeTab, setActiveTab] = useState('flight'); // Default tab adalah 'flight'
  const dispatch = useDispatch();
  const { flights, loadingFlights, errorFlights } = useSelector((state) => state.guest);

  useEffect(() => {
    // Ambil data penerbangan saat komponen dimuat
    console.log("[Pesawat.jsx] Dispatching getFlights action on mount.");
    dispatch(getFlights());
  }, [dispatch]); // Berjalan sekali setelah mount

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <section
        className="relative bg-cover bg-center pt-24 min-h-[90vh] flex flex-col justify-center"
        style={{ backgroundImage: `url('src/assets/img/bgHome.png')` }} // Pastikan path gambar ini benar
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 z-0"></div>

        {/* Content */}
        <div className="relative z-10 text-center p-8">
          <h1 className="text-white text-5xl md:text-6xl font-bold mb-4 animate-fadeIn">
            TravelEase
          </h1>
          <p className="text-white text-lg md:text-xl">
            Pesan Tiket & Hotel dengan
          </p>
          <p className="text-white text-lg md:text-xl font-medium">
            Mudah, Cepat dan Praktis!
          </p>
        </div>

        {/* TableSearch di bawah teks */}
        <div className="relative z-10 mt-6 mx-4 md:mx-80 text-left pb-12">
          <TableSearch activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
      </section>

      {/* Second Section for List Tikets */}
      <section className='py-8'>
        <div className='text-center mb-12'>
          <p className='text-xl font-semibold'>Available Flights</p> {/* Judul disesuaikan */}
        </div>
        <div className='md:ml-48 md:mr-48 ml-2 mr-2'>
          {loadingFlights && (
            <div className="text-center">
              <p className="text-lg">Loading flights...</p>
              {/* Anda bisa menambahkan spinner atau animasi loading di sini */}
            </div>
          )}
          {errorFlights && (
            <div className="text-center text-red-500">
              <p className="text-lg">Error fetching flights: {errorFlights}</p>
            </div>
          )}
          {!loadingFlights && !errorFlights && (
            <TiketPesawat flights={flights} /> // Mengirim data flights ke TiketPesawat
          )}
        </div>
      </section>
    </div>
  );
};

export default Pesawat;