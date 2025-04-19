import React, { useState } from 'react';

const TableSearch = () => {
  const [activeTab, setActiveTab] = useState('flight');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-ungu10 rounded-3xl shadow-lg">
      <div className="flex mb-6 bg-ungu4 rounded-tr-3xl rounded-tl-3xl">
        <button
          className={`flex-1 py-2 text-center font-semibold text-white ${
            activeTab === 'flight' ? 'border-b-4 border-black' : ''
          } ${activeTab === 'flight' ? 'bg-transparent' : 'bg-transparent'} rounded-tl-3xl`}
          onClick={() => handleTabClick('flight')}
        >
          Flights
        </button>
        <button
          className={`flex-1 py-2 text-center font-semibold text-white ${
            activeTab === 'hotel' ? 'border-b-4 border-black' : ''
          } ${activeTab === 'hotel' ? 'bg-transparent' : 'bg-transparent'} rounded-tr-3xl`}
          onClick={() => handleTabClick('hotel')}
        >
          Hotels
        </button>
      </div>

      {activeTab === 'flight' ? (
        <div className="flex flex-col space-y-4 pl-4 pr-4 pb-6">
            <div className="flex space-x-4">
                <div className="flex-1">
                    <label htmlFor="from" className="font-medium text-gray-700">
                        From:
                    </label>
                    <input
                        type="text"
                        id="from"
                        className="w-full p-2 border border-gray-300 rounded-3xl"
                        placeholder="From"
                    />
                </div>

                <div className="flex-1">
                    <label htmlFor="to" className="font-medium text-gray-700">
                        To:
                    </label>
                    <input
                        type="text"
                        id="to"
                        className="w-full p-2 border border-gray-300 rounded-3xl "
                        placeholder="To"
                    />
                </div>

                <div className="flex-1">
                    <label htmlFor="noOfPassengers" className="font-medium text-gray-700">
                        No. of Passengers:
                    </label>
                    <input
                        type="number"
                        id="noOfPassengers"
                        className="w-full p-2 border border-gray-300 rounded-3xl "
                        placeholder="No. of Passengers"
                    />
                </div>
            </div>
            <div className="flex space-x-4 pb-2">
                <div className="flex-1">
                    <label htmlFor="departureDate" className="font-medium text-gray-700">
                        Departure Date:
                    </label>
                    <input
                        type="date"
                        id="departureDate"
                        className="w-full p-2 border border-gray-300 rounded-3xl"
                    />
                </div>

                <div className="flex-1">
                    <label htmlFor="returnDate" className="font-medium text-gray-700">
                        Return Date:
                    </label>
                    <input
                        type="date"
                        id="returnDate"
                        className="w-full p-2 border border-gray-300 rounded-3xl"
                    />
                </div>

                <div className="flex-1">
                    <label htmlFor="seatClass" className="font-medium text-gray-700">
                        Seat Class:
                    </label>
                    <input
                        type="text"
                        id="seatClass"
                        className="w-full p-2 border border-gray-300 rounded-3xl"
                        placeholder="Seat Class"
                    />
                </div>
            </div>
            <button className="bg-ungu4 text-white py-2 rounded-3xl md:ml-56 md:mr-56">
                Search
            </button>
        </div>
      ) : (
        <div className="flex flex-col space-y-4 pl-4 pr-4 pb-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="city" className="font-medium text-gray-700">
                City or hotel name:
              </label>
              <input
                type="text"
                id="city"
                className="w-full p-2 border border-gray-300 rounded-3xl"
                placeholder="City or hotel name"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="checkinDate" className="font-medium text-gray-700">
                Check-in Date:
              </label>
              <input
                type="date"
                id="checkinDate"
                className="w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="checkoutDate" className="font-medium text-gray-700">
                Check-out Date:
              </label>
              <input
                type="date"
                id="checkoutDate"
                className="w-full p-2 border border-gray-300 rounded-3xl"
              />
            </div>
          </div>

          <div className="flex space-x-4 ml-24 mr-24 pb-2">
            <div className="flex-1">
              <label htmlFor="guests" className="font-medium text-gray-700">
                Guests:
              </label>
              <input
                type="number"
                id="guests"
                className="w-full p-2 border border-gray-300 rounded-3xl"
                placeholder="Guests"
              />
            </div>

            <div className="flex-1">
              <label htmlFor="rooms" className="font-medium text-gray-700">
                Rooms:
              </label>
              <input
                type="number"
                id="rooms"
                className="w-full p-2 border border-gray-300 rounded-3xl"
                placeholder="Rooms"
              />
            </div>
          </div>
          <button className="bg-ungu4 text-white py-2 rounded-3xl md:ml-56 md:mr-56">
            Search
          </button>
        </div>
      )}
    </div>
  );
};

export default TableSearch