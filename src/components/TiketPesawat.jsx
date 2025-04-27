import React from 'react';

const TiketPesawat = () => {
  return (
    <div className="flex flex-row">
        <div className='w-full bg-ungu10 rounded-l-3xl shadow-lg p-8 flex items-center justify-between'>
            {/* Left Section: Flight details */}
            <div className="flex flex-col text-">
                <span className="font-bold text-black">Maskapai</span>
                <span className="font-semibold text-lg text-black">Super Plane</span>
                <span className="font-semibold text-lg text-black invisible">.</span>
            </div>

            <div className='flex flex-col text-center'>
                <span className="font-bold text-black">Departure</span>
                <span className="font-semibold text-lg text-black">Balikpapan</span>
                <span className="font-semibold text-lg text-black">20.00</span>
            </div>

            {/* Arrow Divider */}
            <div className="flex items-center justify-center">
                <span className="text-6xl font-bold text-purple-500">{'>'}</span>
            </div>

            <div className='flex flex-col text-center'>
                <span className="font-bold text-black">Arrival</span>
                <span className="font-semibold text-lg text-black">Bali</span>
                <span className="font-semibold text-lg text-black">22.00</span>
            </div>

            <div className='flex flex-col text-center'>
                <span className="font-bold text-black">Class</span>
                <span className="font-semibold text-lg text-black">Economy</span>
                <span className="font-semibold text-lg text-black invisible">.</span>
            </div>

            {/* Right Section: Price */}
            <div className="flex flex-col text-center">
                <span className="font-bold text-black">Price</span>
                <span className="font-semibold text-lg text-black">Rp 2.000.000</span>
                <span className="font-semibold text-lg text-black invisible">.</span>
            </div>
        </div>
        <div>
            <button className="bg-ungu4 text-white py-2 px-4 rounded-r-3xl h-full flex justify-center items-center">
                Choose
            </button>
        </div>
    </div>
  );
};

export default TiketPesawat;
