 import React from 'react';
import { Link } from 'react-router-dom';

const CardRoom = ({ rooms }) => {
  if (!rooms || rooms.length === 0) {
    return <div className="text-center py-8">No rooms available for this hotel at the moment.</div>;
  }

  return (
    <div>
      {rooms.map((room, index) => (
        <div className="flex md:flex-row flex-col md:p-0 p-6 md:mb-4" key={index}> {/* Using index as key due to missing room.id from API */}
          <div className="flex-col md:grid md:grid-cols-3 w-full bg-ungu10 md:rounded-l-3xl md:rounded-tr-none rounded-tr-3xl rounded-tl-3xl shadow-lg p-8 flex items-center text-justify justify-between gap-4">
            <div className="col-span-1 w-full h-full">
              <img
                src={room.roomImages && room.roomImages.length > 0 ? room.roomImages[0] : 'https://via.placeholder.com/300x200?text=No+Room+Image'}
                alt={room.roomName || 'Room image'}
                className="object-cover w-full h-48 md:h-full rounded-lg" // Added fixed height for consistency
              />
            </div>
            <div className="flex flex-col col-span-2 text-justify gap-2">
              <div>
                <span className="font-bold text-black text-2xl">{room.roomName || 'N/A'}</span>
              </div>
              {/* 'type' is not available in the provided API response for rooms */}
              {/* <div >
                <span className="font-bold text-black">{room.type}</span>
              </div> */}
              <div className="flex flex-col mt-2 mb-2">
                <span className="font-bold text-black">Description</span>
                <span>{room.roomDescription || 'No description available.'}</span>
              </div>
              {/* 'facilities' is not available in the provided API response for rooms */}
              {/* <div className="flex flex-col mt-1 mb-1">
                <span className="font-bold text-black">Facilities</span>
                <span>{room.facilities ? room.facilities.join(", ") : 'N/A'}</span>
              </div> */}
              {/* 'capacity' is not available in the provided API response for rooms */}
              {/* <div className="flex flex-col mt-1 mb-1">
                <span className="font-bold text-black">Capacity : {room.capacity || 'N/A'}</span>
              </div> */}
              <div className="flex flex-col mt-1 mb-1">
                <span className="font-bold text-black">Status : {room.status || 'N/A'}</span>
              </div>
              <div className="flex flex-col mt-2 mb-2">
                <span className="font-bold text-black">Price</span>
                <span>Rp {room.price ? room.price.toLocaleString('id-ID') : 'N/A'} / night</span>
              </div>
            </div>
          </div>
          <div>
            {/* Link functionality depends on having a unique room.id from the API */}
            {/* If room.id is not available, this link needs adjustment or removal. */}
            <Link to={`/detail-ruangan/${room.roomId}`} > {/* Placeholder Link */}
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

export default CardRoom;