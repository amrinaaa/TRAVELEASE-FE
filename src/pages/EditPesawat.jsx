// import React, { useState, useEffect } from "react";
// import { Link, useParams } from 'react-router-dom';
// import Searchbar from "../components/Searchbar";
// import dataPesawat from "../utils/dataPesawat.json";
// import dataKursi from "../utils/dataKursi.json";
// import TableSeat from "../components/TableSeat";
// import SeatModal from "../components/SeatModal";

// const EditPesawat = ({ isSidebarOpen }) => {
//   const [user, setUser] = useState({ id: '', name: '', description: '' });
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isSeatModalOpen, setIsSeatModalOpen] = useState(false);
//   const [seatData, setSeatData] = useState([]);
//   const { userId } = useParams();

//   useEffect(() => {
//   const selectedPlane = dataPesawat.find((plane) => plane.id === userId);
//   if (selectedPlane) {
//     setUser({ id: selectedPlane.id, name: selectedPlane.name, description: selectedPlane.type });
//   }

//     setSeatData(dataKursi); // dummy seat data
//   }, [userId]);

//   const handleAddSeats = (newSeats) => {
//     setSeatData((prev) => [...prev, ...newSeats]);
//   };

//   return (
//     <div className="flex transition-all duration-300">
//       <div className={`bg-ungu10 pt-20 h-full transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
//         <div className="grid grid-cols-2 px-4">
//           <div className="flex flex-col md:flex-row text-left md:gap-1">
//             <p className="text-xl">Airline Management</p>
//             <p className="text-xs pt-2 text-gray-600">Seat List</p>
//           </div>
//           <div className="flex flex-row justify-end">
//             <Link to="/manajemen-maskapai" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
//               <i className="fa-solid fa-house-chimney text-xs"></i>
//               <p className="text-xs md:text-sm">Home</p>
//             </Link>
//             <Link to={`/manajemen-pesawat/${user.id}`} className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0 ml-1">
//               <p>/</p>
//               <p className="text-xs md:text-sm">Plane List</p>
//             </Link>
//             <Link to={`/edit-pesawat/${user.id}`} className="flex items-center gap-1 text-black pt-9 md:pt-0 ml-1">
//               <p>/</p>
//               <p className="text-xs md:text-sm">Seat List</p>
//             </Link>
//           </div>
//         </div>

//         <div className="bg-white m-4 py-4 rounded-lg shadow-md">
//           <div className="grid grid-cols-2 px-4 items-center">
//             <div className="flex md:flex-row flex-col text-left md:items-center md:gap-2">
//               <div className="md:text-2xl text-lg text-ungu7">
//                 <p>{user.name}</p>
//               </div>
//               <div className="md:text-xl md:mt-1">
//                 <p>Seat List</p>
//               </div>
//             </div>

//             <div className="flex gap-3 items-center">
//               <Searchbar forWhat="plane" onSearch={setSearchQuery} />
//               <button 
//                 className="bg-ungu7 text-white rounded-xl px-2 py-1 hidden md:inline"
//                 onClick={() => setIsSeatModalOpen(true)}
//               >
//                 <i className="ri-add-line mr-1"></i>
//                 <span>Seat</span>
//               </button>

//               <button 
//                 className="bg-ungu7 text-white rounded-3xl md:rounded-xl px-2 py-2 items-center md:hidden"
//                 onClick={() => setIsSeatModalOpen(true)}
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
//                   <path fill="currentColor" d="M15.97 13.83A5.9 5.9 0 0 0 13.82 16l-2.27-4.37l-3.89 3.87L8 18l-1.05 1.06l-1.77-3.19L2 14.11l1.06-1.06l2.48.35l3.89-3.9L2 5.62l1.41-1.41l9.2 2.12l3.89-3.89a1.49 1.49 0 0 1 2.12 0c.58.59.58 1.56 0 2.12l-3.89 3.89zM20 18v-3h-2v3h-3v2h3v3h2v-3h3v-2z"></path>
//                 </svg>
//               </button>
//             </div>
//           </div>

//           <TableSeat searchQuery={searchQuery} data={seatData} setData={setSeatData} />
//         </div>
//       </div>

//       {isSeatModalOpen && (
//         <SeatModal
//           onClose={() => setIsSeatModalOpen(false)}
//           existingSeats={seatData}
//           onSave={handleAddSeats}
//         />
//       )}
//     </div>
//   );
// };

// export default EditPesawat

import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import Searchbar from "../components/Searchbar";
import TableSeat from "../components/TableSeat";
import SeatModal from "../components/SeatModal"; // Diasumsikan komponen ini ada
import { fetchSeatsRequest } from "../redux/actions/mitraAction";
import { fetchPlanesRequest } from "../redux/actions/mitraAction"; // Untuk mendapatkan nama pesawat

const EditPesawat = ({ isSidebarOpen }) => {
  const { planeId } = useParams(); // Menggunakan planeId
  const dispatch = useDispatch();

  // --- Redux State ---
  const {
    seatList,
    loadingSeats,
    errorSeats,
    planeList // Ambil planeList untuk mencari nama pesawat
  } = useSelector((state) => state.mitra);

  // --- Local State ---
  const [planeName, setPlaneName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSeatModalOpen, setIsSeatModalOpen] = useState(false);
  // data kursi akan diambil dari Redux (seatList), state lokal tidak diperlukan lagi
  // const [seatData, setSeatData] = useState([]);

  // --- Effects ---

  // Fetch seats data based on planeId
  useEffect(() => {
    if (planeId) {
      dispatch(fetchSeatsRequest(planeId));
      // Jika planeList belum ada, fetch. Jika sudah, cari nama pesawat.
      // Anda mungkin perlu logika yang lebih baik jika planeList besar atau belum tentu ada.
      // Atau, buat endpoint baru untuk get /plane/{id}
      if (!planeList || planeList.length === 0) {
          // Cari airlineId dari URL atau state lain jika diperlukan untuk fetchPlanesRequest
          // Untuk saat ini, kita tidak bisa fetch planes tanpa airlineId, jadi kita coba cari.
      }
    }
  }, [dispatch, planeId]);

  // Find plane name once planeList is available
  useEffect(() => {
      const selectedPlane = planeList.find(plane => plane.id === planeId);
      if (selectedPlane) {
          setPlaneName(selectedPlane.name);
      } else {
          // Jika tidak ditemukan, setidaknya tampilkan ID
          setPlaneName(`Plane ID: ${planeId}`);
      }
  }, [planeList, planeId]);


  // Handler untuk menambah kursi (jika SeatModal digunakan)
  const handleAddSeats = (newSeats) => {
    // TODO: Implementasi POST /seat (belum ada)
    console.log("Menambah kursi baru:", newSeats);
    // Untuk sementara, mungkin perlu refetch atau update state lokal (tidak ideal)
    // dispatch(fetchSeatsRequest(planeId)); // Refetch setelah menambah
  };

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-full min-h-screen transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        {/* Breadcrumbs */}
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">Airline Management</p>
            <p className="text-xs pt-2 text-gray-600">Seat List</p>
          </div>
          <div className="flex flex-row justify-end">
            <Link to="/manajemen-maskapai" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <i className="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
            {/* Navigasi kembali mungkin perlu airlineId, ini perlu penyesuaian */}
            <Link to={`/manajemen-pesawat/${planeId}`} className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0 ml-1">
              <p>/</p>
              <p className="text-xs md:text-sm">Plane List</p>
            </Link>
            <Link to={`/edit-pesawat/${planeId}`} className="flex items-center gap-1 text-black pt-9 md:pt-0 ml-1">
              <p>/</p>
              <p className="text-xs md:text-sm">Seat List</p>
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="grid grid-cols-2 px-4 items-center">
            <div className="flex md:flex-row flex-col text-left md:items-center md:gap-2">
              <div className="md:text-2xl text-lg text-ungu7">
                <p>{planeName}</p>
              </div>
              <div className="md:text-xl md:mt-1">
                <p>Seat List</p>
              </div>
            </div>

            <div className="flex gap-3 items-center justify-end">
              <Searchbar forWhat="seat" onSearch={setSearchQuery} />
              <button
                className="bg-ungu7 text-white rounded-xl px-2 py-1 hidden md:inline"
                onClick={() => setIsSeatModalOpen(true)}
              >
                <i className="ri-add-line mr-1"></i>
                <span>Seat</span>
              </button>
              <button
                className="bg-ungu7 text-white rounded-3xl md:rounded-xl px-2 py-2 items-center md:hidden"
                onClick={() => setIsSeatModalOpen(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M15.97 13.83A5.9 5.9 0 0 0 13.82 16l-2.27-4.37l-3.89 3.87L8 18l-1.05 1.06l-1.77-3.19L2 14.11l1.06-1.06l2.48.35l3.89-3.9L2 5.62l1.41-1.41l9.2 2.12l3.89-3.89a1.49 1.49 0 0 1 2.12 0c.58.59.58 1.56 0 2.12l-3.89 3.89zM20 18v-3h-2v3h-3v2h3v3h2v-3h3v-2z"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Menampilkan TableSeat dengan data dari Redux */}
          {loadingSeats && <p className="text-center p-4">Loading seats...</p>}
          {errorSeats && <p className="text-center p-4 text-red-600">Error: {errorSeats}</p>}
          {!loadingSeats && !errorSeats && (
            <TableSeat
              searchQuery={searchQuery}
              seatCategories={seatList} // Mengirim seatList (kategori)
              // setData tidak diperlukan lagi jika delete ditangani Redux
            />
          )}
        </div>
      </div>

      {/* Modal Tambah Kursi */}
      {isSeatModalOpen && (
        <SeatModal
          onClose={() => setIsSeatModalOpen(false)}
          existingSeats={seatList} // Mengirim data yang ada ke modal
          onSave={handleAddSeats}
          planeId={planeId} // Mengirim planeId jika diperlukan modal
          categories={seatList} // Mengirim kategori ke modal
        />
      )}
    </div>
  );
};

export default EditPesawat;