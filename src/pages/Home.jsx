import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Ticket, Hotel, Plane } from 'lucide-react'
import dataSwiper from "../utils/dataSwiper.json";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import { Autoplay, Pagination, Navigation, FreeMode,  Thumbs } from 'swiper/modules';

const Home = () => {
  const [isMdScreen, setIsMdScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMdScreen(window.innerWidth >= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleHotelBooking = () => {
    window.location.href = '/hotel';
  };

  const handleFlightTicket = () => {
    window.location.href = '/pesawat';
  };

  return (
    <div>
      {/* Hero Section */}
      <section>
        <div className='w-full h-auto px-4 md:px-0 pt-24 md:pt-0 mb-4 md:mb-0'>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            loop = {true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={isMdScreen}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper w-full h-[200px] md:h-screen rounded-lg md:rounded-none"
          >
            {dataSwiper.map((data) => (
              <SwiperSlide 
              key={data.id}
              className='w-full rounded-lg md:rounded-none relative bg-[#1B1B1B]' 
                style={{backgroundImage: `url(${data.image})`, 
                backgroundSize:"cover", 
                backgroundPosition:"center", 
                backgroundRepeat: "no-repeat"}}>
                  <div className='w-full h-full flex items-center justify-center flex-col z-10 pl-2 pr-2'>
                    <h5 className='lg:text-4xl md:text-3xl sm:text-xl text-sm text-white font-extrabold mb-1 md:mb-2 text-center text-shadow: none md:[text-shadow:_0_6px_0_rgb(0_0_0_/_100%)]'>
                      {data.heading}
                    </h5>
                    <h1 className='lg:text-5xl md:text-4xl sm:text-2xl text-base font-extrabold text-white mb-2 md:mb-4 text-center text-shadow: none md:[text-shadow:_0_6px_0_rgb(0_0_0_/_100%)]'>
                      {data.subheading}
                    </h1>
                    <p className='lg:text-lg md-text-base sm:text-base text-xs text-white font-extrabold text-center mb-4 md:mb-8 text-shadow: none md:[text-shadow:_0_4px_0_rgb(0_0_0_/_100%)]'>
                      {data.description}
                    </p>
                    
                    {/* Booking Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                      <button 
                        onClick={handleHotelBooking}
                        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-xs md:text-base"
                      >
                        <Hotel size={16} className="md:w-5 md:h-5" />
                        Booking Hotel
                      </button>
                      
                      <button 
                        onClick={handleFlightTicket}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-xs md:text-base"
                      >
                        <Plane size={16} className="md:w-5 md:h-5" />
                        Pesan Tiket Pesawat
                      </button>
                    </div>
                  </div>
              </SwiperSlide>
            ))}
          </Swiper>
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