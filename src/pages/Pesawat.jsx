import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import TableSearch from '../components/TableSearch';
import TiketPesawat from '../components/TiketPesawat';
import { getFlights } from '../redux/actions/guestActions';

const Pesawat = () => {
  const [activeTab, setActiveTab] = useState('flight');
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { flights, loadingFlights, errorFlights } = useSelector((state) => state.guest);

  useEffect(() => {
    console.log("[Pesawat.jsx] Dispatching getFlights action on mount.");
    dispatch(getFlights());
  }, [dispatch]);

  // Check if there's search data from navigation state
  useEffect(() => {
    if (location.state?.flightSearchData) {
      const searchData = location.state.flightSearchData;
      setSearchCriteria(searchData);
      setIsFiltered(true);
      console.log('Flight search data from navigation:', searchData);
    }
  }, [location.state]);

  // Apply filter when flights data or search criteria changes
  useEffect(() => {
    if (flights && flights.length > 0) {
      if (searchCriteria && isFiltered) {
        applyFlightFilter(searchCriteria);
      } else {
        setFilteredFlights(flights);
      }
    }
  }, [flights, searchCriteria, isFiltered]);

  const applyFlightFilter = (flightFormData) => {
    console.log('Applying flight filter with data:', flightFormData);
    
    if (!flights || flights.length === 0) {
      console.log('No flights data available for filtering');
      setFilteredFlights([]);
      return;
    }

    const filtered = flights.filter(flight => {
      // Filter berdasarkan kota keberangkatan (from)
      const departureMatch = flight.departureAirport?.city && 
        flight.departureAirport.city.toLowerCase().includes(flightFormData.from.toLowerCase());
      
      // Filter berdasarkan kota tujuan (to)
      const arrivalMatch = flight.arrivalAirport?.city && 
        flight.arrivalAirport.city.toLowerCase().includes(flightFormData.to.toLowerCase());
      
      // Filter berdasarkan tanggal keberangkatan
      let dateMatch = true;
      if (flightFormData.departureDate) {
        const searchDate = new Date(flightFormData.departureDate);
        const flightDate = new Date(flight.departureTime);
        dateMatch = searchDate.toDateString() === flightDate.toDateString();
      }
      
      // Filter berdasarkan kelas kursi (opsional, tergantung struktur data)
      let classMatch = true;
      if (flightFormData.seatClass) {
        const availableClasses = flight.plane?.seatCategories?.map(cat => cat.name) || [];
        classMatch = availableClasses.some(className => 
          className.toLowerCase().includes(flightFormData.seatClass.toLowerCase())
        );
      }

      return departureMatch && arrivalMatch && dateMatch && classMatch;
    });

    console.log('Filtered flights result:', filtered);
    setFilteredFlights(filtered);
  };

  // Handler untuk pencarian flight dari TableSearch component
  const handleFlightSearch = (flightFormData) => {
    console.log('Flight search triggered:', flightFormData);
    setSearchCriteria(flightFormData);
    setIsFiltered(true);
    applyFlightFilter(flightFormData);
    
    // Scroll ke bagian hasil pencarian
    setTimeout(() => {
      const resultsSection = document.querySelector('#flight-results');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Reset filter function
  const resetFilter = () => {
    setFilteredFlights(flights);
    setIsFiltered(false);
    setSearchCriteria(null);
    // Clear navigation state
    navigate('/pesawat', { replace: true, state: {} });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <section
        className="relative bg-cover bg-center pt-24 min-h-[90vh] flex flex-col justify-center"
        style={{ backgroundImage: `url('src/assets/img/Pesawat.png')` }}
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

        {/* TableSearch dengan props untuk flight search */}
        <div className="relative z-10 mt-6 mx-4 md:mx-80 text-left pb-12">
          <TableSearch 
            activeTab={activeTab} 
            onTabChange={handleTabChange} 
            onFlightSearch={handleFlightSearch}
            initialSearchData={searchCriteria}
          />
        </div>
      </section>

      {/* Second Section for List Flights */}
      <section className='py-8' id="flight-results">
        <div className='text-center mb-12'>
          <div className="flex justify-center items-center gap-4">
            <p className='text-xl font-semibold'>
              {isFiltered ? 'Flight Search Results' : 'Available Flights'}
            </p>
            {isFiltered && (
              <button
                onClick={resetFilter}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition duration-200"
              >
                Show All Flights
              </button>
            )}
          </div>
          {isFiltered && searchCriteria && (
            <div className="mt-2 text-gray-600">
              <p>
                {searchCriteria.from} → {searchCriteria.to} | {searchCriteria.passengers} passenger(s) | {searchCriteria.seatClass}
              </p>
              <p className="text-sm">
                Found {filteredFlights.length} flight(s)
              </p>
            </div>
          )}
        </div>
        
        <div className='md:ml-48 md:mr-48 ml-2 mr-2'>
          {loadingFlights && (
            <div className="text-center">
              <p className="text-lg">Loading flights...</p>
            </div>
          )}
          {errorFlights && (
            <div className="text-center text-red-500">
              <p className="text-lg">Error fetching flights: {errorFlights}</p>
            </div>
          )}
          {!loadingFlights && !errorFlights && (
            <>
              {filteredFlights.length > 0 ? (
                <TiketPesawat flights={filteredFlights} />
              ) : isFiltered ? (
                <div className="text-center py-8">
                  <p className="text-lg text-gray-500">
                    No flights found matching your search criteria.
                  </p>
                  <button
                    onClick={resetFilter}
                    className="mt-4 bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition duration-200"
                  >
                    View All Flights
                  </button>
                </div>
              ) : (
                <TiketPesawat flights={filteredFlights} />
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Pesawat