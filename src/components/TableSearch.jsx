import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TableSearch = ({ onHotelFilter, onFlightFilter, activeTab: propActiveTab, onTabChange, initialSearchData }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(propActiveTab || 'hotel');
  
  // State untuk hotel form
  const [hotelForm, setHotelForm] = useState({
    city: '',
    checkinDate: '',
    checkoutDate: '',
    guests: '',
    rooms: ''
  });

  // State untuk flight form
  const [flightForm, setFlightForm] = useState({
    from: '',
    to: '',
    passengers: '',
    departureDate: '',
    seatClass: ''
  });

  // Load initial search data if provided (for pre-filling form)
  useEffect(() => {
    if (initialSearchData) {
      if (activeTab === 'flight') {
        setFlightForm(initialSearchData);
      } else if (activeTab === 'hotel') {
        setHotelForm(initialSearchData);
      }
    }
  }, [initialSearchData, activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const handleHotelInputChange = (e) => {
    const { name, value } = e.target;
    setHotelForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFlightInputChange = (e) => {
    const { name, value } = e.target;
    setFlightForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateHotelForm = () => {
    return hotelForm.city && hotelForm.checkinDate && hotelForm.checkoutDate && 
           hotelForm.guests && hotelForm.rooms;
  };

  const validateFlightForm = () => {
    return flightForm.from && flightForm.to && flightForm.passengers && 
           flightForm.departureDate && flightForm.seatClass;
  };

  const handleHotelSubmit = (e) => {
    e.preventDefault();
    
    if (!validateHotelForm()) {
      alert('Please fill in all fields before searching');
      return;
    }

    // Validasi tanggal check-in dan check-out
    const checkinDate = new Date(hotelForm.checkinDate);
    const checkoutDate = new Date(hotelForm.checkoutDate);
    
    if (checkoutDate <= checkinDate) {
      alert('Check-out date must be after check-in date');
      return;
    }

    // Jika onHotelFilter ada (untuk halaman yang sama), gunakan itu
    if (onHotelFilter) {
      onHotelFilter(hotelForm);
    } else {
      // Jika tidak ada onHotelFilter, navigasi ke halaman hotel dengan data pencarian
      navigate('/hotel', {
        state: {
          hotelSearchData: hotelForm
        }
      });
    }
  };

  const handleFlightSubmit = (e) => {
    e.preventDefault();
    
    if (!validateFlightForm()) {
      alert('Please fill in all fields before searching');
      return;
    }

    // Validasi tanggal keberangkatan tidak boleh di masa lalu
    const departureDate = new Date(flightForm.departureDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (departureDate < today) {
      alert('Departure date cannot be in the past');
      return;
    }

    // Jika onFlightFilter ada (untuk halaman yang sama), gunakan itu
    if (onFlightFilter) {
      onFlightFilter(flightForm);
    } else {
      // Jika tidak ada onFlightFilter, navigasi ke halaman pesawat dengan data pencarian
      navigate('/pesawat', {
        state: {
          flightSearchData: flightForm
        }
      });
    }
  };

  return (
    <div className="bg-ungu10 rounded-3xl shadow-lg overflow-hidden max-w-[800px] mx-auto">
      {/* Tabs */}
      <div className="flex bg-ungu4 text-white font-semibold">
        <button
          onClick={() => handleTabClick('hotel')}
          className={`w-1/2 py-3 transition duration-200 ${
            activeTab === 'hotel'
              ? 'border-b-4 border-black bg-[radial-gradient(circle,_#7F56D9,_#9F6DFD)]'
              : 'hover:bg-ungu3'
          }`}
        >
          Hotels
        </button>
        <button
          onClick={() => handleTabClick('flight')}
          className={`w-1/2 py-3 transition duration-200 ${
            activeTab === 'flight'
              ? 'border-b-4 border-black bg-[radial-gradient(circle,_#7F56D9,_#9F6DFD)]'
              : 'hover:bg-ungu3'
          }`}
        >
          Flights  
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'hotel' ? (
          <form onSubmit={handleHotelSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block font-medium text-gray-700 mb-1">
                  City or Hotel Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={hotelForm.city}
                  onChange={handleHotelInputChange}
                  className="w-full p-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="City or hotel name"
                  required
                />
              </div>
              <div>
                <label htmlFor="checkinDate" className="block font-medium text-gray-700 mb-1">
                  Check-in Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="checkinDate"
                  name="checkinDate"
                  value={hotelForm.checkinDate}
                  onChange={handleHotelInputChange}
                  className="w-full p-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div>
                <label htmlFor="checkoutDate" className="block font-medium text-gray-700 mb-1">
                  Check-out Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="checkoutDate"
                  name="checkoutDate"
                  value={hotelForm.checkoutDate}
                  onChange={handleHotelInputChange}
                  className="w-full p-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  min={hotelForm.checkinDate || new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="guests" className="block font-medium text-gray-700 mb-1">
                  Guests <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  value={hotelForm.guests}
                  onChange={handleHotelInputChange}
                  className="w-full p-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Number of guests"
                  min="1"
                  required
                />
              </div>
              <div>
                <label htmlFor="rooms" className="block font-medium text-gray-700 mb-1">
                  Rooms <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="rooms"
                  name="rooms"
                  value={hotelForm.rooms}
                  onChange={handleHotelInputChange}
                  className="w-full p-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Number of rooms"
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className={`py-2 px-6 rounded-3xl transition duration-200 ${
                  validateHotelForm() 
                    ? 'bg-ungu4 text-white hover:bg-ungu3' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!validateHotelForm()}
              >
                <i className="ri-search-line mr-2" />
                Search
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleFlightSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="from" className="block font-medium text-gray-700 mb-1">
                  From <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="from"
                  name="from"
                  value={flightForm.from}
                  onChange={handleFlightInputChange}
                  className="w-full p-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Departure city"
                  required
                />
              </div>
              <div>
                <label htmlFor="to" className="block font-medium text-gray-700 mb-1">
                  To <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="to"
                  name="to"
                  value={flightForm.to}
                  onChange={handleFlightInputChange}
                  className="w-full p-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Destination city"
                  required
                />
              </div>
              <div>
                <label htmlFor="passengers" className="block font-medium text-gray-700 mb-1">
                  No. of Passengers <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="passengers"
                  name="passengers"
                  value={flightForm.passengers}
                  onChange={handleFlightInputChange}
                  className="w-full p-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g. 2"
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="departureDate" className="block font-medium text-gray-700 mb-1">
                  Departure Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="departureDate"
                  name="departureDate"
                  value={flightForm.departureDate}
                  onChange={handleFlightInputChange}
                  className="w-full p-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div>
                <label htmlFor="seatClass" className="block font-medium text-gray-700 mb-1">
                  Seat Class <span className="text-red-500">*</span>
                </label>
                <select
                  id="seatClass"
                  name="seatClass"
                  value={flightForm.seatClass}
                  onChange={handleFlightInputChange}
                  className="w-full p-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Select seat class</option>
                  <option value="Economy">Economy</option>
                  <option value="Premium Economy">Premium Economy</option>
                  <option value="Business">Business</option>
                  <option value="First Class">First Class</option>
                </select>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className={`py-2 px-6 rounded-3xl transition duration-200 ${
                  validateFlightForm() 
                    ? 'bg-ungu4 text-white hover:bg-ungu3' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!validateFlightForm()}
              >
                <i className="ri-search-line mr-2" />
                Search 
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TableSearch