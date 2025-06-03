import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import TableSearchHotel from '../components/TableSearchHotel';
import CardReservasi from '../components/CardReservasi';
import { getGuestHotels } from '../redux/actions/guestHotelActions';

const Hotel = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { hotels, loading, error } = useSelector(state => state.guestHotel);
  
  // State untuk menyimpan hotel yang sudah difilter
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState(null);

  useEffect(() => {
    dispatch(getGuestHotels());
  }, [dispatch]);

  // Check if there's search data from navigation state (from TableSearch)
  useEffect(() => {
    if (location.state?.hotelSearchData) {
      const searchData = location.state.hotelSearchData;
      setSearchCriteria(searchData);
      setIsFiltered(true);
      console.log('Hotel search data from navigation:', searchData);
    }
  }, [location.state]);

  // Apply filter when hotels data or search criteria changes
  useEffect(() => {
    if (hotels && hotels.length > 0) {
      if (searchCriteria && isFiltered) {
        applyHotelFilter(searchCriteria);
      } else {
        setFilteredHotels(hotels);
      }
    }
  }, [hotels, searchCriteria, isFiltered]);

  const applyHotelFilter = (hotelFormData) => {
    console.log('Applying hotel filter with data:', hotelFormData);
    
    if (!hotels || hotels.length === 0) {
      console.log('No hotels data available for filtering');
      setFilteredHotels([]);
      return;
    }

    // Filter hotel berdasarkan city atau hotel name
    const filtered = hotels.filter(hotel => {
      const cityMatch = hotel.city && 
        hotel.city.toLowerCase().includes(hotelFormData.city.toLowerCase());
      
      const nameMatch = hotel.name && 
        hotel.name.toLowerCase().includes(hotelFormData.city.toLowerCase());
      
      return cityMatch || nameMatch;
    });

    console.log('Filtered hotels result:', filtered);
    setFilteredHotels(filtered);
  };

  // Fungsi untuk handle filter hotel dari TableSearchHotel component
  const handleHotelFilter = (hotelFormData) => {
    console.log('Hotel search data:', hotelFormData);
    setSearchCriteria(hotelFormData);
    setIsFiltered(true);
    applyHotelFilter(hotelFormData);

    // Scroll ke section hasil pencarian
    setTimeout(() => {
      const hotelSection = document.querySelector('#hotel-results');
      if (hotelSection) {
        hotelSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Fungsi untuk reset filter
  const resetFilter = () => {
    setFilteredHotels(hotels);
    setIsFiltered(false);
    setSearchCriteria(null);
    // Clear navigation state
    window.history.replaceState({}, document.title);
  };

  return (
    <div>
      <section
        className="relative bg-cover bg-center pt-24 min-h-[90vh] flex flex-col justify-center"
        style={{ backgroundImage: `url('src/assets/img/Hotel.png')` }}
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

        {/* TableSearchHotel dengan props onHotelFilter */}
        <div className="relative z-10 mt-6 mx-4 md:mx-80 text-left pb-12">
          <TableSearchHotel 
            onHotelFilter={handleHotelFilter} 
            initialSearchData={searchCriteria}
          />
        </div>
      </section>

      {/* Second Section for List Hotels */}
      <section className='py-8' id="hotel-results">
        <div className='text-center mb-12'>
          <div className="flex justify-center items-center gap-4">
            <p className='text-xl font-semibold'>
              {isFiltered ? 'Hotel Search Results' : 'Hotels'}
            </p>
            {isFiltered && (
              <button
                onClick={resetFilter}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition duration-200"
              >
                Show All Hotels
              </button>
            )}
          </div>
          {isFiltered && searchCriteria && (
            <div className="mt-2 text-gray-600">
              <p>
                Search for: "{searchCriteria.city}" | {searchCriteria.guests} guest(s) | {searchCriteria.rooms} room(s)
              </p>
              <p className="text-sm">
                Check-in: {searchCriteria.checkinDate} | Check-out: {searchCriteria.checkoutDate}
              </p>
              <p className="text-sm">
                Found {filteredHotels.length} hotel(s)
              </p>
            </div>
          )}
        </div>
        
        <div className='md:ml-48 md:mr-48'>
          {loading && <div className="text-center">Loading hotels...</div>}
          {error && <div className="text-center text-red-500">Error: {error}</div>}
          {!loading && !error && (
            <>
              {filteredHotels.length > 0 ? (
                <CardReservasi hotels={filteredHotels} />
              ) : isFiltered ? (
                <div className="text-center py-8">
                  <p className="text-lg text-gray-500">
                    No hotels found matching your search criteria.
                  </p>
                  <button
                    onClick={resetFilter}
                    className="mt-4 bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition duration-200"
                  >
                    View All Hotels
                  </button>
                </div>
              ) : (
                <CardReservasi hotels={filteredHotels} />
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Hotel