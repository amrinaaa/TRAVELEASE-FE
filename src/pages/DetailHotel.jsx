import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dataHotel from '../utils/dataHotel.json';
import CardRoom from '../components/CardRoom';

const DetailHotel = () => {
  const { id } = useParams();
  const hotel = dataHotel.find((item) => item.id === parseInt(id));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!hotel) return <div>Hotel not found</div>;

  return (
    <div>
      <section
        className="relative bg-cover bg-center pt-16 h-full flex flex-col justify-center"
        style={{ backgroundImage: `url('/src/assets/img/bgHome.png')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30 z-0"></div>
        <div className="mx-auto relative z-10 text-center p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {hotel.image.map((image, index) => (
              <div
                key={index}
                className="rounded-3xl overflow-hidden shadow-md border border-gray-200"
              >
                <img
                  src={image}
                  alt={`Hotel image ${index}`}
                  className="w-full h-60 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='pt-8'>
        <div className='md:ml-48 md:mr-48'>
          <div className='flex flex-col text-left pb-8'>
            <div>
              <span className='font-bold text-3xl'>{hotel.name}</span>
            </div>
            <div className='flex flex-col mt-8 mb-2'>
              <span className='font-bold text-xl'>Description</span>
              <span>{hotel.description}</span>
            </div>
            <div className='flex flex-col mt-2 mb-2'>
              <span className='font-bold text-xl'>{hotel.city}</span>
              <span>{hotel.address}</span>
            </div>
            <div className='flex flex-col mt-2 mb-2'>
              <span className='font-bold text-xl'>Contact</span>
              <span>{hotel.contact}</span>
            </div>
          </div>

          <CardRoom />
        </div>
      </section>
    </div>
  );
};

export default DetailHotel