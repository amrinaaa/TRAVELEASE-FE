// import React, { useState } from 'react';

// const TableSearch = () => {
//   const [activeTab, setActiveTab] = useState('hotel');

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   return (
//     <div className="bg-ungu10 rounded-3xl shadow-lg overflow-hidden max-w-[800px] mx-auto">
//       {/* Tabs */}
//       <div className="flex bg-ungu4 text-white font-semibold">
//         <button
//           onClick={() => handleTabClick('hotel')}
//           className={`w-1/2 py-3 transition duration-200 ${
//             activeTab === 'hotel'
//               ? 'border-b-4 border-black bg-[radial-gradient(circle,_#7F56D9,_#9F6DFD)]'
//               : 'hover:bg-ungu3'
//           }`}
//         >
//           Hotels
//         </button>
//         <button
//           onClick={() => handleTabClick('flight')}
//           className={`w-1/2 py-3 transition duration-200 ${
//             activeTab === 'flight'
//               ? 'border-b-4 border-black bg-[radial-gradient(circle,_#7F56D9,_#9F6DFD)]'
//               : 'hover:bg-ungu3'
//           }`}
//         >
//           Flights
//         </button>
//       </div>



//       {/* Content */}
//       <div className="p-6">
//         {activeTab === 'hotel' ? (
//           <form className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label htmlFor="city" className="block font-medium text-gray-700 mb-1">
//                   City or Hotel Name
//                 </label>
//                 <input
//                   type="text"
//                   id="city"
//                   className="w-full p-2 border border-gray-300 rounded-3xl"
//                   placeholder="City or hotel name"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="checkinDate" className="block font-medium text-gray-700 mb-1">
//                   Check-in Date
//                 </label>
//                 <input
//                   type="date"
//                   id="checkinDate"
//                   className="w-full p-2 border border-gray-300 rounded-3xl"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="checkoutDate" className="block font-medium text-gray-700 mb-1">
//                   Check-out Date
//                 </label>
//                 <input
//                   type="date"
//                   id="checkoutDate"
//                   className="w-full p-2 border border-gray-300 rounded-3xl"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="guests" className="block font-medium text-gray-700 mb-1">
//                   Guests
//                 </label>
//                 <input
//                   type="number"
//                   id="guests"
//                   className="w-full p-2 border border-gray-300 rounded-3xl"
//                   placeholder="Guests"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="rooms" className="block font-medium text-gray-700 mb-1">
//                   Rooms
//                 </label>
//                 <input
//                   type="number"
//                   id="rooms"
//                   className="w-full p-2 border border-gray-300 rounded-3xl"
//                   placeholder="Rooms"
//                 />
//               </div>
//             </div>

//             <div className="text-center">
//               <button
//                 type="submit"
//                 className="bg-ungu4 text-white py-2 px-6 rounded-3xl hover:bg-ungu3 transition duration-200"
//               >
//                 <i className="ri-search-line mr-1" /> Search
//               </button>
//             </div>
//           </form>
//         ) : (
//           <form className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label htmlFor="from" className="block font-medium text-gray-700 mb-1">
//                   From
//                 </label>
//                 <input
//                   type="text"
//                   id="from"
//                   className="w-full p-2 border border-gray-300 rounded-3xl"
//                   placeholder="Departure city"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="to" className="block font-medium text-gray-700 mb-1">
//                   To
//                 </label>
//                 <input
//                   type="text"
//                   id="to"
//                   className="w-full p-2 border border-gray-300 rounded-3xl"
//                   placeholder="Destination city"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="passengers" className="block font-medium text-gray-700 mb-1">
//                   No. of Passengers
//                 </label>
//                 <input
//                   type="number"
//                   id="passengers"
//                   className="w-full p-2 border border-gray-300 rounded-3xl"
//                   placeholder="e.g. 2"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="departureDate" className="block font-medium text-gray-700 mb-1">
//                   Departure Date
//                 </label>
//                 <input
//                   type="date"
//                   id="departureDate"
//                   className="w-full p-2 border border-gray-300 rounded-3xl"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="seatClass" className="block font-medium text-gray-700 mb-1">
//                   Seat Class
//                 </label>
//                 <input
//                   type="text"
//                   id="seatClass"
//                   className="w-full p-2 border border-gray-300 rounded-3xl"
//                   placeholder="e.g. Economy"
//                 />
//               </div>
//             </div>

//             <div className="text-center">
//               <button
//                 type="submit"
//                 className="bg-ungu4 text-white py-2 px-6 rounded-3xl hover:bg-ungu3 transition duration-200"
//               >
//                 <i className="ri-search-line mr-1" /> Search
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TableSearch;

import React from 'react'; // useState tidak lagi digunakan di sini

const TableSearch = ({ activeTab, onTabChange }) => { // Menerima props
  return (
    <div className="bg-ungu10 rounded-3xl shadow-lg overflow-hidden max-w-[800px] mx-auto">
      {/* Tabs */}
      <div className="flex bg-ungu4 text-white font-semibold">
        <button
          onClick={() => onTabChange('hotel')} // Menggunakan onTabChange dari props
          className={`w-1/2 py-3 transition duration-200 ${
            activeTab === 'hotel'
              ? 'border-b-4 border-black bg-[radial-gradient(circle,_#7F56D9,_#9F6DFD)]'
              : 'hover:bg-ungu3'
          }`}
        >
          Hotels
        </button>
        <button
          onClick={() => onTabChange('flight')} // Menggunakan onTabChange dari props
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
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block font-medium text-gray-700 mb-1">
                  City or Hotel Name
                </label>
                <input
                  type="text"
                  id="city"
                  className="w-full p-2 border border-gray-300 rounded-3xl"
                  placeholder="City or hotel name"
                />
              </div>
              <div>
                <label htmlFor="checkinDate" className="block font-medium text-gray-700 mb-1">
                  Check-in Date
                </label>
                <input
                  type="date"
                  id="checkinDate"
                  className="w-full p-2 border border-gray-300 rounded-3xl"
                />
              </div>
              <div>
                <label htmlFor="checkoutDate" className="block font-medium text-gray-700 mb-1">
                  Check-out Date
                </label>
                <input
                  type="date"
                  id="checkoutDate"
                  className="w-full p-2 border border-gray-300 rounded-3xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="guests" className="block font-medium text-gray-700 mb-1">
                  Guests
                </label>
                <input
                  type="number"
                  id="guests"
                  className="w-full p-2 border border-gray-300 rounded-3xl"
                  placeholder="Guests"
                />
              </div>
              <div>
                <label htmlFor="rooms" className="block font-medium text-gray-700 mb-1">
                  Rooms
                </label>
                <input
                  type="number"
                  id="rooms"
                  className="w-full p-2 border border-gray-300 rounded-3xl"
                  placeholder="Rooms"
                />
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-ungu4 text-white py-2 px-6 rounded-3xl hover:bg-ungu3 transition duration-200"
              >
                <i className="ri-search-line mr-1" /> Search
              </button>
            </div>
          </form>
        ) : (
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="from" className="block font-medium text-gray-700 mb-1">
                  From
                </label>
                <input
                  type="text"
                  id="from"
                  className="w-full p-2 border border-gray-300 rounded-3xl"
                  placeholder="Departure city"
                />
              </div>
              <div>
                <label htmlFor="to" className="block font-medium text-gray-700 mb-1">
                  To
                </label>
                <input
                  type="text"
                  id="to"
                  className="w-full p-2 border border-gray-300 rounded-3xl"
                  placeholder="Destination city"
                />
              </div>
              <div>
                <label htmlFor="passengers" className="block font-medium text-gray-700 mb-1">
                  No. of Passengers
                </label>
                <input
                  type="number"
                  id="passengers"
                  className="w-full p-2 border border-gray-300 rounded-3xl"
                  placeholder="e.g. 2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="departureDate" className="block font-medium text-gray-700 mb-1">
                  Departure Date
                </label>
                <input
                  type="date"
                  id="departureDate"
                  className="w-full p-2 border border-gray-300 rounded-3xl"
                />
              </div>
              <div>
                <label htmlFor="seatClass" className="block font-medium text-gray-700 mb-1">
                  Seat Class
                </label>
                <input
                  type="text"
                  id="seatClass"
                  className="w-full p-2 border border-gray-300 rounded-3xl"
                  placeholder="e.g. Economy"
                />
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-ungu4 text-white py-2 px-6 rounded-3xl hover:bg-ungu3 transition duration-200"
              >
                <i className="ri-search-line mr-1" /> Search
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TableSearch;