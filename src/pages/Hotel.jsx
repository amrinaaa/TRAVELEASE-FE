import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableSearchHotel from '../components/TableSearchHotel'; // Corrected import
import CardReservasi from '../components/CardReservasi';
import { getGuestHotels } from '../redux/actions/guestHotelActions'; // Adjust path if your store structure is different

const Hotel = () => {
  const dispatch = useDispatch();
  const { hotels, loading, error } = useSelector(state => state.guestHotel); // Assuming 'guestHotel' is the slice name in your rootReducer

  useEffect(() => {
    dispatch(getGuestHotels());
  }, [dispatch]);

  return (
    <div>
      <section
        className="relative bg-cover bg-center pt-24 min-h-[90vh] flex flex-col justify-center"
        style={{ backgroundImage: `url('src/assets/img/Hotel.png')` }} // Ensure this path is correct
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 z-0"></div>

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

        {/* TableSearchHotel di bawah teks */}
        <div className="relative z-10 mt-6 mx-4 md:mx-80 text-left pb-12">
          <TableSearchHotel />
        </div>
      </section>

      {/* Second Section for List Hotels */}
      <section className='py-8'>
        <div className='text-center mb-12'>
          <p className='text-xl font-semibold'>Hotels</p>
        </div>
        <div className='md:ml-48 md:mr-48'>
          {loading && <div className="text-center">Loading hotels...</div>}
          {error && <div className="text-center text-red-500">Error: {error}</div>}
          {!loading && !error && <CardReservasi hotels={hotels} />}
        </div>
      </section>
    </div>
  );
};

export default Hotel;