// ManajemenRuangan.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Searchbar from "../components/Searchbar"; // Pastikan path ini benar
import TableRoom from "../components/TableRoom"; // Pastikan path ini benar
import { fetchHotels, fetchRooms } from "../redux/actions/mitraAction"; // Pastikan path ini benar

const ManajemenRuangan = ({ isSidebarOpen }) => {
  const { hotelId } = useParams();
  const dispatch = useDispatch();

  // Mengambil state dari state.mitra sesuai dengan rootReducer
  const {
    hotelList,
    loadingHotels,
    errorHotels,
    roomList,
    loadingRooms,
    errorRooms,
  } = useSelector((state) => state.mitra); // <--- PERBAIKAN UTAMA DI SINI

  // 1. Fetch hotels jika list kosong saat komponen dimuat dengan hotelId tertentu
  useEffect(() => {
    console.log("ManajemenRuangan - useEffect [dispatch, hotelId, hotelList.length]: Memeriksa apakah perlu fetchHotels. hotelId:", hotelId, "hotelList.length:", hotelList.length);
    if (hotelId && hotelList.length === 0) { // Panggil jika hotelId ada dan list masih kosong
        console.log("ManajemenRuangan - useEffect [dispatch, hotelId, hotelList.length]: hotelList kosong, Dispatching fetchHotels()");
        dispatch(fetchHotels()); // fetchHotels() tidak perlu argumen hotelId
    }
  }, [dispatch, hotelId, hotelList.length]);

  const selectedHotel = useMemo(() => {
    console.log("ManajemenRuangan - useMemo [hotelList, hotelId]: Mencari selectedHotel. hotelId:", hotelId, "hotelList length:", hotelList?.length);
    if (!hotelId || !hotelList || hotelList.length === 0) {
        console.log("ManajemenRuangan - useMemo: hotelId atau hotelList kosong, mengembalikan undefined.");
        return undefined;
    }
    const hotel = hotelList.find((h) => h.id === hotelId);
    console.log("ManajemenRuangan - useMemo: selectedHotel ditemukan:", hotel);
    return hotel;
  }, [hotelList, hotelId]);

  // 2. Fetch rooms HANYA jika selectedHotel.id (dari useMemo) berubah dan valid
  useEffect(() => {
    const currentSelectedHotelId = selectedHotel?.id;
    console.log("ManajemenRuangan - useEffect [selectedHotel?.id, dispatch]: Memeriksa apakah perlu fetchRooms. currentSelectedHotelId:", currentSelectedHotelId);
    if (currentSelectedHotelId) {
      console.log("ManajemenRuangan - useEffect [selectedHotel?.id, dispatch]: Dispatching fetchRooms untuk hotelId:", currentSelectedHotelId);
      dispatch(fetchRooms(currentSelectedHotelId));
    } else {
      console.log("ManajemenRuangan - useEffect [selectedHotel?.id, dispatch]: fetchRooms TIDAK di-dispatch. selectedHotel?.id tidak valid atau selectedHotel belum ada.");
    }
  }, [selectedHotel?.id, dispatch]); // Dependensi pada ID hotel yang dipilih dan dispatch

  // Log untuk memantau perubahan state krusial
  useEffect(() => {
    console.log("ManajemenRuangan - useEffect state listener: loadingHotels:", loadingHotels, "selectedHotel:", selectedHotel, "loadingRooms:", loadingRooms, "errorRooms:", errorRooms, "roomList length:", roomList?.length, "hotelList length:", hotelList?.length);
  }, [loadingHotels, selectedHotel, loadingRooms, errorRooms, roomList, hotelList]);

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex transition-all duration-300">
      <div
        className={`bg-ungu10 pt-20 h-full min-h-screen transition-all duration-300 ${
          isSidebarOpen
            ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]"
            : "ml-0 w-full"
        }`}
      >
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">Hotel Management</p>
            <p className="text-xs pt-2 text-gray-600">Room List</p>
          </div>
          <div className="flex flex-row justify-end gap-1">
            <Link to="/manajemen-hotel" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <i className="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
            <Link
              to={selectedHotel ? `/manajemen-ruangan/${selectedHotel.id}` : "/manajemen-ruangan"}
              className="flex items-center gap-1 text-black pt-9 md:pt-0"
            >
              <p>/</p>
              <p className="text-xs md:text-sm">Room List</p>
            </Link>
          </div>
        </div>

        <div className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="grid grid-cols-2 px-4 items-center">
            <div className="flex md:flex-row flex-col text-left md:items-center md:gap-2">
              <div className="md:text-2xl text-lg text-ungu7">
                {loadingHotels && !selectedHotel ? ( // Tampilkan loading jika hotelList sedang diambil DAN selectedHotel belum ada
                  <p>Loading hotel data...</p>
                ) : errorHotels ? (
                  <p className="text-red-500">Error hotel: {typeof errorHotels === 'object' ? JSON.stringify(errorHotels) : errorHotels}</p>
                ) : selectedHotel ? (
                  <p>{selectedHotel.name}</p>
                ) : (
                  hotelId && !loadingHotels ? <p className="text-orange-500">Hotel not found</p> : <p>Nama Hotel</p>
                )}
              </div>
              <div className="md:text-xl md:mt-1">
                <p>Room List</p>
              </div>
            </div>
            <div className="flex gap-3 items-center justify-end"> {/* Pastikan alignment search dan button benar */}
              <Searchbar forWhat="room" onSearch={setSearchQuery} />
              <Link to={selectedHotel ? `/tambah-ruangan/${selectedHotel.id}` : "/tambah-ruangan"}>
                <button className="bg-ungu7 text-white rounded-xl px-2 py-1 hidden md:inline" disabled={!selectedHotel}>
                  <i className="ri-add-line mr-1"></i>
                  <span>Room</span>
                </button>
                <button className="bg-ungu7 text-white rounded-3xl md:rounded-xl px-2 py-2 items-center md:hidden" disabled={!selectedHotel}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M4.5 20v-1h2V4h8v1h3v14h2v1h-3V6h-2v14zm7-7.23q.31 0 .54-.23t.23-.54t-.23-.54t-.54-.23t-.54.23t-.23.54t.23.54t.54.23"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </div>

          <div className="px-4 pt-4">
            {loadingRooms ? (
              <p className="text-center text-gray-500">Loading rooms...</p>
            ) : errorRooms ? (
              <p className="text-center text-red-500">Error rooms: {typeof errorRooms === 'object' ? JSON.stringify(errorRooms) : errorRooms}</p>
            ) : roomList && roomList.length > 0 ? (
              <TableRoom searchQuery={searchQuery} rooms={roomList} />
              // selectedHotelId di TableRoom.jsx sudah diambil dari useParams, jadi tidak perlu di-pass lagi jika tidak ada kebutuhan khusus
            ) : (
              selectedHotel && !loadingRooms && <p className="text-center text-gray-500">No rooms found for this hotel.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManajemenRuangan;