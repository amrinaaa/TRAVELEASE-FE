import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import tiketData from '../utils/dataTiketPesawat.json';

const DetailPesawat = () => {
  const { id } = useParams();  // Ambil id dari URL params
  const ticket = tiketData.find((t) => t.id === id); 

  if (!ticket) {
    return <p className="text-center mt-8">Tiket dengan ID <strong>{id}</strong> tidak ditemukan.</p>;
  }

  const seats = [
    ['A1', 'B1', 'C1', 'D1', 'F1'],
    ['A2', 'B2', 'C2', 'D2', 'F2'],
    ['A3', 'B3', 'C3', 'D3', 'F3'],
    ['A4', 'B4', 'C4', 'D4', 'F4'],
    ['A5', 'B5', 'C5', 'D5', 'F5'],
    ['A6', 'B6', 'C6', 'D6', 'F6'],
    ['A7', 'B7', 'C7', 'D7', 'F7'],
    ['A8', 'B8', 'C8', 'D8', 'F8'],
    ['A9', 'B9', 'C9', 'D9', 'F9'],
    ['A10', 'B10', 'C10', 'D10', 'F10'],
    ['A11', 'B11', 'C11', 'D11', 'F11'],
    ['A12', 'B12', 'C12', 'D12', 'F12'],
  ];

  // State untuk menyimpan kursi yang dipilih
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Menggunakan useEffect untuk scroll otomatis ke atas saat halaman dimuat
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll ke posisi atas halaman
  }, []); 

  // Fungsi untuk menangani pemilihan kursi
  const handleSeatSelection = (seat) => {
    // Jika kursi sudah dipilih, batalkan pemilihan kursi tersebut
    setSelectedSeats((prevSeats) => 
      prevSeats.includes(seat) ? prevSeats.filter((s) => s !== seat) : [...prevSeats, seat]
    );
  };

    // Enum untuk Gender dan Age
  const GENDER = {
    MALE: 'Male',
    FEMALE: 'Female'
  };
    
  const AGE = {
    ADULT: 'Adult',
    CHILDREN: 'Children'
  };

  return (
    <div>
      <section className="bg-cover bg-center pt-24" style={{ backgroundImage: `url('/src/assets/img/bgDetail.png')` }}>
        <div className="md:ml-52 md:mr-52">
          <div className="mt-4 ml-4 mr-4 text-left mb-12">
            <div className="w-full bg-ungu10 rounded-3xl shadow-lg md:p-8 p-2 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="md:font-bold font-semibold md:text-xl text-sm text-black">Maskapai</span>
                <span className="md:font-semibold md:text-lg text-xs text-black">{ticket.maskapai}</span>
                <span className="md:font-semibold md:text-lg text-xs text-black invisible">.</span>
              </div>

              <div className="flex flex-col text-center">
                <span className="md:font-bold font-semibold md:text-xl text-sm text-black">Departure</span>
                <span className="md:font-semibold md:text-lg text-xs text-black">{ticket.departure.tempat}</span>
                <span className="md:font-semibold md:text-lg text-xs text-black">{ticket.departure.jam}</span>
              </div>

              <div className="flex items-center justify-center">
                <span className="md:text-6xl text-xl font-bold text-purple-500">&gt;</span>
              </div>

              <div className="flex flex-col text-center">
                <span className="md:font-bold font-semibold md:text-xl text-sm text-black">Arrival</span>
                <span className="md:font-semibold md:text-lg text-xs text-black">{ticket.arrival.tempat}</span>
                <span className="md:font-semibold md:text-lg text-xs text-black">{ticket.arrival.jam}</span>
              </div>

              <div className="flex flex-col text-center">
                <span className="md:font-bold font-semibold md:text-xl text-sm text-black">Class</span>
                <span className="md:font-semibold md:text-lg text-xs text-black">Economy</span>
                <span className="md:font-semibold md:text-lg text-xs text-black invisible">.</span>
              </div>

              <div className="flex flex-col text-center">
                <span className="md:font-bold font-semibold md:text-xl text-sm text-black">Price</span>
                <span className="md:font-semibold md:text-lg text-xs text-black">Rp {ticket.price.toLocaleString('id-ID')}</span>
                <span className="md:font-semibold md:text-lg text-xs text-black invisible">.</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 grid-rows-1 pb-12">
            <div className="w-full col-span-1 md:pl-14 md:ml-8 ml-9 mb-12 md:mb-0">
              <div>
                <img src="/src/assets/img/head.png" alt="kepala-pesawat" className="pl-8 md:pl-0" />
              </div>
              <div className="pl-8 md:pl-0 md:pr-0">
                <div className="bg-[#F9F9F9] p-4">
                  <div className="text-center mb-4">
                    <h4 className="font-semibold text-lg mb-2">First Class</h4>
                    <div className="grid grid-cols-5 gap-2">
                      {seats.slice(0, 3).map((row, rowIndex) => (
                        <React.Fragment key={rowIndex}>
                          {row.map((seat, index) => (
                            <div
                              key={index}
                              onClick={() => handleSeatSelection(seat)} // Menangani pemilihan kursi
                              className={`bg-gray-300 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-400 ${selectedSeats.includes(seat) ? 'bg-green-300' : ''}`}
                            >
                              {seat}
                            </div>
                          ))}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div className="text-center mb-4">
                    <h4 className="font-semibold text-lg mb-2">Business Class</h4>
                    <div className="grid grid-cols-5 gap-2">
                      {seats.slice(3, 8).map((row, rowIndex) => (
                        <React.Fragment key={rowIndex + 3}>
                          {row.map((seat, index) => (
                            <div
                              key={index}
                              onClick={() => handleSeatSelection(seat)} // Menangani pemilihan kursi
                              className={`bg-gray-300 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-400 ${selectedSeats.includes(seat) ? 'bg-green-300' : ''}`}
                            >
                              {seat}
                            </div>
                          ))}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div className="text-center mb-4">
                    <h4 className="font-semibold text-lg mb-2">Economy Class</h4>
                    <div className="grid grid-cols-5 gap-2">
                      {seats.slice(8, 12).map((row, rowIndex) => (
                        <React.Fragment key={rowIndex + 3}>
                          {row.map((seat, index) => (
                            <div
                              key={index}
                              onClick={() => handleSeatSelection(seat)} // Menangani pemilihan kursi
                              className={`bg-gray-300 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-400 ${selectedSeats.includes(seat) ? 'bg-green-300' : ''}`}
                            >
                              {seat}
                            </div>
                          ))}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img src="/src/assets/img/tail.png" alt="ekor-pesawat" className="pl-8 md:pl-0 md:pr-0" />
              </div>
            </div>

            {/* Menampilkan rules dan form seats hanya jika ada kursi yang dipilih */}
            {selectedSeats.length > 0 && (
              <div className="col-span-2 md:pl-40 md:pr-0 pl-4 pr-4">
                <div className="w-full md:max-w-lg bg-ungu10 p-8 rounded-t-3xl shadow-xl">
                  <div className="flex flex-col text-left mb-4">
                    <h3 className="font-semibold text-lg">Rules</h3>
                    <ul className="list-decimal pl-8">
                      <li>No Smoking</li>
                      <li>No Judi</li>
                      <li>No Drugs</li>
                      <li>No Drinking</li>
                      <li>No Twin Tower</li>
                    </ul>
                  </div>

                  <div className="flex flex-col text-left mb-4">
                    <h3 className="font-semibold text-lg">Seats</h3>
                    {selectedSeats.map((seat, index) => (
                      <div key={index} className="flex pl-4 gap-4 items-center pb-2">
                        <span>{seat}</span>
                        <input type="text" placeholder="Name" className="p-2 w-1/2 border border-gray-300 rounded-lg" />
                        <select className="p-2 w-1/2 border border-gray-300 rounded-lg">
                          <option value={GENDER.MALE}>{GENDER.MALE}</option>
                          <option value={GENDER.FEMALE}>{GENDER.FEMALE}</option>
                        </select>
                        <select className="p-2 w-1/2 border border-gray-300 rounded-lg">
                          <option value={AGE.ADULT}>{AGE.ADULT}</option>
                          <option value={AGE.CHILDREN}>{AGE.CHILDREN}</option>
                        </select>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2">
                    <div className="flex flex-col text-left">
                      <h3 className="font-semibold text-lg">Price</h3>
                      <span>Rp. {ticket.price.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <h3 className="font-semibold text-lg">Your Money</h3>
                      <span className="pr-14">Rp. 0</span>
                    </div>
                  </div>
                </div>
                <div className="w-full max-w-lg py-2 bg-ungu4 text-white font-semibold rounded-b-3xl hover:bg-ungu1 transition-colors">
                  <button className="">Order Ticket</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailPesawat