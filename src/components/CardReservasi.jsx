import React from 'react';

const CardReservasi = () => {
  return (
    <div className="flex flex-row">
        <div className='grid-cols-3 w-full bg-ungu10 rounded-l-3xl shadow-lg p-8 flex items-center justify-between gap-4'>
            <div className='col-span-1 w-full h-full'>
                <img src="src/assets/img/FotoHotel.png" alt="hotel" />
            </div>
            <div className='flex flex-col col-span-2 text-left gap-2'>
                <div>
                    <span className="font-bold text-black">
                        Hotel Platinum
                    </span>
                </div>
                <div>
                    <span className="font-bold text-black">
                        Kota Balikpapan
                    </span>
                </div>
                <div className='flex flex-col mt-2 mb-2'>
                    <span className="font-bold text-black">
                        Description
                    </span>
                    <span className=''>
                        Platinum Hotel & Convention Hall Balikpapan adalah pilihan tepat bagi Anda yang ingin menghabiskan waktu dengan berbagai fasilitas mewah. Nikmati kualitas layanan terbaik dan pengalaman mengesankan selama menginap di hotel ini.
                    </span>
                </div>
                <div className='flex flex-col'>
                    <span className='font-bold text-black'>
                        Price
                    </span>
                    <span className=''>
                        Rp. 1.000.000
                    </span>
                </div>
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

export default CardReservasi
