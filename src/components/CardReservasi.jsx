import React from 'react';
import { Link } from 'react-router-dom';

const CardReservasi = ({ hotels }) => {
  if (!hotels || hotels.length === 0) {
    return <div className="text-center py-8">No hotels available at the moment.</div>;
  }

  return (
    <div>
      {hotels.map((hotel) => (
        <div className="flex md:flex-row flex-col md:p-0 p-6 md:mb-4" key={hotel.id}>
          <div className="flex-col md:grid md:grid-cols-3 w-full bg-ungu10 md:rounded-l-3xl md:rounded-tr-none rounded-tr-3xl rounded-tl-3xl shadow-lg p-8 flex items-center text-justify justify-between gap-4">
            <div className="col-span-1 w-full h-full">
              {/* Use hotelImages from API and provide a fallback if no image */}
              <img 
                src={hotel.hotelImages && hotel.hotelImages.length > 0 ? hotel.hotelImages[0].imageUrl : 'https://via.placeholder.com/300x200?text=No+Image'} 
                alt={hotel.name} 
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
            <div className="flex flex-col col-span-2 text-justify gap-2">
              <div>
                <span className="font-bold text-black text-2xl">{hotel.name}</span>
              </div>
              <div>
                {/* Use location.city from API */}
                <span className="font-bold text-black">{hotel.location?.city || 'N/A'}</span>
              </div>
              <div className="flex flex-col mt-2 mb-2">
                <span className="font-bold text-black">Description</span>
                <span>{hotel.description || 'No description available.'}</span>
              </div>
              <div className="flex flex-col mt-1 mb-1">
                <span className="font-bold text-black">Address</span>
                <span>{hotel.address || 'N/A'}</span>
              </div>
              <div className="flex flex-col mt-1 mb-1">
                <span className="font-bold text-black">Contact</span>
                <span>{hotel.contact || 'N/A'}</span>
              </div>
            </div>
          </div>
          <div>
            <Link to={`/detail-hotel/${hotel.id}`}>
              <button className="bg-ungu4 text-white py-2 md:px-4 px-36 md:rounded-r-3xl md:rounded-none rounded-b-3xl h-full flex justify-center items-center">
                Choose
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardReservasi;