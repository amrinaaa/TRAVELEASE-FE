import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getHotelRoomsById } from '../redux/actions/userHotelActions'; // Adjust path if your store structure is different
import CardRoom from '../components/CardRoom';

const DetailHotel = () => {
  const { id: hotelId } = useParams(); // Renamed to hotelId for clarity
  const dispatch = useDispatch();

  const {
    hotelRooms,
    loading,
    error
  } = useSelector(state => state.userHotel); // Assuming 'userHotel' is the slice name

  useEffect(() => {
    if (hotelId) {
      dispatch(getHotelRoomsById(hotelId));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch, hotelId]);

  // Hotel details will be taken from the first room's data, as per API response structure
  const currentHotelDetails = hotelRooms && hotelRooms.length > 0 ? hotelRooms[0] : null;

  if (loading) return <div className="text-center py-20">Loading hotel details and rooms...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  if (!currentHotelDetails && !loading) return <div className="text-center py-20">Hotel details not found or no rooms available.</div>;


  return (
    <div>
      <section
        className="relative bg-cover bg-center pt-16 h-full flex flex-col justify-center"
        style={{ backgroundImage: `url('/src/assets/img/bgHome.png')` }} // Ensure this path is correct for your public assets
      >
        <div className="absolute inset-0 bg-black bg-opacity-30 z-0"></div>
        <div className="mx-auto relative z-10 text-center p-8 max-w-6xl"> {/* Added max-w-6xl for better layout on wider screens */}
          {currentHotelDetails && currentHotelDetails.hotelImages && currentHotelDetails.hotelImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {currentHotelDetails.hotelImages.map((imageURL, index) => (
                <div
                  key={index}
                  className="rounded-3xl overflow-hidden shadow-md border border-gray-200 bg-white" // Added bg-white in case images are transparent
                >
                  <img
                    src={imageURL}
                    alt={`${currentHotelDetails.hotelName || 'Hotel'} image ${index + 1}`}
                    className="w-full h-60 object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-white">No images available for this hotel.</div>
          )}
        </div>
      </section>

      <section className='pt-8'>
        <div className='md:ml-48 md:mr-48'>
          {currentHotelDetails && (
            <div className='flex flex-col text-left pb-8'>
              <div>
                <span className='font-bold text-3xl'>{currentHotelDetails.hotelName || 'Hotel Name N/A'}</span>
              </div>
              <div className='flex flex-col mt-8 mb-2'>
                <span className='font-bold text-xl'>Description</span>
                <span>{currentHotelDetails.hotelDescription || 'No description available.'}</span>
              </div>
              {/* City, Address, and Contact are not directly part of the /user/hotel-rooms/:hotelId response */}
              {/* These would need to come from a different data source or be omitted if not available in currentHotelDetails */}
              {/* For example, if your guestHotel.hotels state has this info, you could fetch it separately */}
              {/* <div className='flex flex-col mt-2 mb-2'>
                <span className='font-bold text-xl'>{currentHotelDetails.city || 'City N/A'}</span>
                <span>{currentHotelDetails.address || 'Address N/A'}</span>
              </div>
              <div className='flex flex-col mt-2 mb-2'>
                <span className='font-bold text-xl'>Contact</span>
                <span>{currentHotelDetails.contact || 'Contact N/A'}</span>
              </div> */}
            </div>
          )}

          <h2 className="text-2xl font-semibold text-center mb-6">Available Rooms</h2>
          <CardRoom rooms={hotelRooms} />
        </div>
      </section>
    </div>
  );
};

export default DetailHotel;