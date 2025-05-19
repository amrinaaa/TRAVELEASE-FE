import React from 'react'
import TableSearch from '../components/TableSearch'
import { Ticket, Hotel } from 'lucide-react'

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center min-h-[90vh] flex flex-col justify-center"
        style={{ backgroundImage: `url('src/assets/img/bgHome.png')` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

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
          <TableSearch />
        </div>
      </section>

      {/* Tickets Section */}
      <section className="py-12 bg-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-800">🎫 Tiket Perjalanan</h2>
          <p className="text-gray-600 mt-2">Temukan dan pesan tiket pesawat, kereta, dan lainnya.</p>
        </div>
        <div className="flex justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-md w-11/12 md:w-2/3 text-center">
            <Ticket className="mx-auto text-blue-500" size={40} />
            <p className="mt-4 text-gray-700">
              Jelajahi berbagai rute dengan harga terbaik dan proses cepat.
            </p>
          </div>
        </div>
      </section>

      {/* Hotels Section */}
      <section className="py-12 bg-white">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-800">🏨 Hotel Nyaman</h2>
          <p className="text-gray-600 mt-2">Cari dan pesan hotel terbaik untuk perjalananmu.</p>
        </div>
        <div className="flex justify-center">
          <div className="bg-gray-100 p-6 rounded-2xl shadow-md w-11/12 md:w-2/3 text-center">
            <Hotel className="mx-auto text-green-500" size={40} />
            <p className="mt-4 text-gray-700">
              Rekomendasi hotel berdasarkan lokasi, rating, dan harga terbaik.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
