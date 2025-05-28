import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import tiketData from '../utils/dataTiketPesawat.json';

const DetailPesawat = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [orderCode, setOrderCode] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const ticket = tiketData.find((t) => t.id === id);

  const seats = [
    ['A1', 'B1', 'C1', 'D1', 'F1'],
    ['A2', 'B2', 'C2', 'D2', 'F2'],
    ['A3', 'B3', 'C3', 'D3', 'F3'],
    ['A4', 'B4', 'C4', 'D4', 'F4'],
    ['A5', 'B5', 'C5', 'D5', 'F5'],
    ['A6', 'B6', 'C6', 'D6', 'F6'],
    ['A7', 'B7', 'C7', 'D7', 'F7'],
    ['A8', 'B8', 'C8', 'D8', 'F8'],
    ['A9', 'B9', 'C9', 'D9', 'F9'],
    ['A10', 'B10', 'C10', 'D10', 'F10'],
    ['A11', 'B11', 'C11', 'D11', 'F11'],
    ['A12', 'B12', 'C12', 'D12', 'F12'],
  ];

  const [selectedSeats, setSelectedSeats] = useState([]);

  const GENDER = {
    MALE: 'Male',
    FEMALE: 'Female',
  };

  const AGE = {
    ADULT: 'Adult',
    CHILDREN: 'Children',
  };

  const seatPrices = {
    First: 2000000,
    Business: 1500000,
    Economy: 1000000,
  };

  const getClassBySeat = (seat) => {
    const rowNumber = parseInt(seat.match(/\d+/)?.[0], 10);
    if (rowNumber >= 1 && rowNumber <= 3) return 'First';
    if (rowNumber >= 4 && rowNumber <= 8) return 'Business';
    return 'Economy';
  };

  const calculateTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => {
      const seatClass = getClassBySeat(seat);
      return total + (seatPrices[seatClass] || 0);
    }, 0);
  };

  const handleSeatSelection = (seat) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seat)
        ? prevSeats.filter((s) => s !== seat)
        : [...prevSeats, seat]
    );
  };

  const [passengerData, setPassengerData] = useState({});

  const handlePassengerChange = (seat, field, value) => {
    setPassengerData((prevData) => ({
      ...prevData,
      [seat]: {
        ...prevData[seat],
        [field]: value,
      },
    }));
  };

  // Function to generate and download PDF
  const generatePDF = () => {
    const bookingDate = new Date().toLocaleString('id-ID', { 
      dateStyle: 'long', 
      timeStyle: 'short' 
    });
    
    // Create HTML content for PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>TravelEase - Booking Confirmation</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 40px;
            color: #333;
            line-height: 1.6;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #8B5CF6;
            padding-bottom: 20px;
          }
          .company-name {
            font-size: 28px;
            font-weight: bold;
            color: #8B5CF6;
            margin-bottom: 5px;
          }
          .booking-date {
            font-size: 14px;
            color: #666;
          }
          .success-icon {
            font-size: 48px;
            color: #10B981;
            margin: 20px 0;
          }
          .content {
            margin: 30px 0;
          }
          .field {
            margin-bottom: 15px;
          }
          .field-label {
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
          }
          .field-value {
            color: #555;
            margin-left: 10px;
          }
          .passenger-list {
            margin-left: 20px;
          }
          .passenger-item {
            margin-bottom: 8px;
            padding: 5px 0;
            border-bottom: 1px dotted #ddd;
          }
          .total-price {
            font-size: 18px;
            font-weight: bold;
            color: #8B5CF6;
            margin-top: 20px;
            padding: 15px;
            background-color: #f8f9ff;
            border-radius: 8px;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #ddd;
            padding-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="company-name">TravelEase</div>
          <div class="booking-date">Tanggal Pemesanan: ${bookingDate}</div>
          <div class="success-icon">✓</div>
        </div>
        
        <div class="content">
          <div class="field">
            <div class="field-label">Order Code:</div>
            <div class="field-value">${orderCode}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Maskapai:</div>
            <div class="field-value">${ticket.maskapai}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Departure:</div>
            <div class="field-value">${ticket.departure.tempat}<br>${ticket.departure.jam}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Arrival:</div>
            <div class="field-value">${ticket.arrival.tempat}<br>${ticket.arrival.jam}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Passenger Details:</div>
            <div class="passenger-list">
              ${selectedSeats.map(seat => `
                <div class="passenger-item">
                  <strong>Seat ${seat}:</strong> 
                  ${passengerData[seat]?.name || '-'}, 
                  ${passengerData[seat]?.gender || '-'}, 
                  ${passengerData[seat]?.age || '-'}
                </div>
              `).join('')}
            </div>
          </div>
          
          <div class="total-price">
            Total Price: Rp. ${calculateTotalPrice().toLocaleString('id-ID')}
          </div>
        </div>
        
        <div class="footer">
          <p>Thank you for choosing TravelEase!</p>
          <p>Please keep this confirmation for your records.</p>
        </div>
      </body>
      </html>
    `;

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load, then print
    printWindow.onload = function() {
      printWindow.print();
      // Close the window after printing dialog
      printWindow.onafterprint = function() {
        printWindow.close();
      };
    };
  };

  // Generate order code when success popup is shown
  useEffect(() => {
    if (showSuccessPopup && !orderCode) {
      setOrderCode(Math.floor(Math.random() * 1000000).toString());
    }
  }, [showSuccessPopup, orderCode]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!ticket) {
    return (
      <p className="text-center mt-8">
        Tiket dengan ID <strong>{id}</strong> tidak ditemukan.
      </p>
    );
  }

  const totalPrice = calculateTotalPrice();

  return (
    <div>
      <section
        className="bg-cover bg-center pt-24"
        style={{ backgroundImage: `url('/src/assets/img/bgDetail.png')` }}
      >
        <div className="md:ml-52 md:mr-52">
          {/* Tiket Info */}
          <div className="mt-4 ml-4 mr-4 text-left mb-12">
            <div className="w-full bg-ungu10 rounded-3xl shadow-lg md:p-8 p-2 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="md:font-bold font-semibold md:text-xl text-sm text-black">Maskapai</span>
                <span className="md:font-semibold md:text-lg text-xs text-black">{ticket.maskapai}</span>
                <span className="md:font-semibold md:text-lg text-xs text-black invisible">.</span>
              </div>

              <div className="flex flex-col text-center">
                <span className="md:font-bold font-semibold md:text-xl text-sm text-black">Departure</span>
                <span className="md:font-semibold md:text-lg text-xs text-black">{ticket.departure.tempat}</span>
                <span className="md:font-semibold md:text-lg text-xs text-black">{ticket.departure.jam}</span>
              </div>

              <div className="flex items-center justify-center">
                <span className="md:text-6xl text-xl font-bold text-purple-500">&gt;</span>
              </div>

              <div className="flex flex-col text-center">
                <span className="md:font-bold font-semibold md:text-xl text-sm text-black">Arrival</span>
                <span className="md:font-semibold md:text-lg text-xs text-black">{ticket.arrival.tempat}</span>
                <span className="md:font-semibold md:text-lg text-xs text-black">{ticket.arrival.jam}</span>
              </div>

              <div className="flex flex-col text-center">
                <span className="md:font-bold font-semibold md:text-xl text-sm text-black">Class</span>
                <span className="md:font-semibold md:text-lg text-xs text-black">Economy</span>
                <span className="md:font-semibold md:text-lg text-xs text-black invisible">.</span>
              </div>

              <div className="flex flex-col text-center">
                <span className="md:font-bold font-semibold md:text-xl text-sm text-black">Price</span>
                <span className="md:font-semibold md:text-lg text-xs text-black">Rp {ticket.price.toLocaleString('id-ID')}</span>
                <span className="md:font-semibold md:text-lg text-xs text-black invisible">.</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 grid-rows-1 pb-12">
            {/* Kursi */}
            <div className="w-full col-span-1 md:pl-14 md:ml-8 ml-9 mb-12 md:mb-0">
              <img src="/src/assets/img/head.png" alt="kepala-pesawat" className="pl-8 md:pl-0" />
              <div className="pl-8 md:pl-0 md:pr-0">
                <div className="bg-ungu10 p-4">
                  {['First', 'Business', 'Economy'].map((classType, i) => {
                    const start = i === 0 ? 0 : i === 1 ? 3 : 8;
                    const end = i === 0 ? 3 : i === 1 ? 8 : 12;
                    return (
                      <div className="text-center mb-4" key={classType}>
                        <h4 className="font-semibold text-lg mb-2">{classType} Class</h4>
                        <div className="grid grid-cols-5 gap-2">
                          {seats.slice(start, end).flat().map((seat, index) => (
                            <div
                              key={index}
                              onClick={() => handleSeatSelection(seat)}
                              className={`bg-gray-300 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-400 ${
                                selectedSeats.includes(seat) ? 'bg-green-300' : ''
                              }`}
                            >
                              {seat}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <img src="/src/assets/img/tail.png" alt="ekor-pesawat" className="pl-8 md:pl-0 md:pr-0" />
            </div>

            {/* Form Rules dan Penumpang */}
            {selectedSeats.length > 0 && (
              <div className="col-span-2 md:pl-40 md:pr-0 pl-4 pr-4">
                <div className="w-full md:max-w-lg bg-ungu10 p-8 rounded-t-3xl shadow-xl text-left">
                  <h3 className="font-semibold text-lg mb-4">Rules</h3>
                  <ul className="list-decimal pl-8 mb-4 text-left">
                    <li>Dilarang merokok di dalam pesawat</li>
                    <li>Gunakan sabuk pengaman selama duduk</li>
                    <li>Gunakan airplane mode</li>
                    <li>Dilarang membuka pintu darurat kecuali darurat</li>
                    <li>Ikuti instruksi awak kabin</li>
                    <li>Dilarang membawa barang ilegal</li>
                  </ul>

                  <h3 className="font-semibold text-lg mb-2">Seats</h3>
                  {selectedSeats.map((seat, index) => (
                    <div key={index} className="flex pl-4 gap-4 items-center pb-2 flex-wrap">
                      <span className="md:w-12 w-4">{seat}</span>
                      <input
                        type="text"
                        placeholder="Name"
                        className="p-2 w-[25%] border border-gray-300 rounded-lg"
                        onChange={(e) => handlePassengerChange(seat, 'name', e.target.value)}
                      />
                      <select
                        className="p-2 w-[25%] border border-gray-300 rounded-lg"
                        onChange={(e) => handlePassengerChange(seat, 'gender', e.target.value)}
                      >
                        <option value="">Choose</option>
                        <option value={GENDER.MALE}>{GENDER.MALE}</option>
                        <option value={GENDER.FEMALE}>{GENDER.FEMALE}</option>
                      </select>
                      <select
                        className="p-2 w-[25%] border border-gray-300 rounded-lg"
                        onChange={(e) => handlePassengerChange(seat, 'age', e.target.value)}
                      >
                        <option value="">Choose</option>
                        <option value={AGE.ADULT}>{AGE.ADULT}</option>
                        <option value={AGE.CHILDREN}>{AGE.CHILDREN}</option>
                      </select>
                    </div>
                  ))}

                  <div className="grid grid-cols-2 mt-6">
                    <div className="flex flex-col text-left">
                      <h3 className="font-semibold text-lg">Price</h3>
                      <span>Rp. {totalPrice.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <h3 className="font-semibold text-lg">Your Money</h3>
                      <span className="pr-14">Rp. 0</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setShowModal(true)} className="w-full max-w-lg py-2 bg-ungu4 text-white font-semibold rounded-b-3xl hover:bg-ungu1 transition-colors">Order Ticket</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-ungu10 rounded-[30px] p-8 w-[360px] text-black shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-6">Confirmation</h2>
            <div className="text-left text-sm mb-4">
              <p><strong>Maskapai</strong><br />{ticket.maskapai}</p>
              <p className="mt-2"><strong>Departure</strong><br />{ticket.departure.tempat}<br />{ticket.departure.jam}</p>
              <p className="mt-2"><strong>Arrival</strong><br />{ticket.arrival.tempat}<br />{ticket.arrival.jam}</p>
              <p className="mt-2"><strong>Seat Number</strong><br />{selectedSeats.join(', ')}</p>
              <p className="mt-2"><strong>Name</strong><br />{selectedSeats.map((seat) => passengerData[seat]?.name || '-').join(', ')}</p>
              <p className="mt-2"><strong>Gender</strong><br />{selectedSeats.map((seat) => passengerData[seat]?.gender || '-').join(', ')}</p>
              <p className="mt-2"><strong>Age Category</strong><br />{selectedSeats.map((seat) => passengerData[seat]?.age || '-').join(', ')}</p>

              <p className="mt-2"><strong>Price</strong><br />Rp. {totalPrice.toLocaleString('id-ID')}</p>
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={() => {setShowModal(false);setShowSuccessPopup(true);}} className="bg-ungu4 text-white font-semibold py-2 px-6 rounded-full hover:bg-purple-700">
                Purchase
              </button>
              <button onClick={() => setShowModal(false)} className="bg-ungu4 text-white font-semibold py-2 px-6 rounded-full hover:bg-purple-700">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-ungu10 rounded-[30px] p-6 w-[360px] text-black shadow-lg text-center">
            <h2 className="text-2xl font-bold">TravelEase</h2>
            <p className="text-sm mb-4">Tanggal Pemesanan {new Date().toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })}</p>
            <div className="text-6xl text-green-700 mb-4">✔️</div>

            <div className="text-left text-sm mb-4">
              <p><strong>Order Code</strong><br />{orderCode}</p>
              <p className="mt-2"><strong>Maskapai</strong><br />{ticket.maskapai}</p>
              <p className="mt-2"><strong>Departure</strong><br />{ticket.departure.tempat}<br />{ticket.departure.jam}</p>
              <p className="mt-2"><strong>Arrival</strong><br />{ticket.arrival.tempat}<br />{ticket.arrival.jam}</p>
              <p className="mt-2"><strong>Seat(s)</strong></p>
              <ul className="list-disc list-inside">
                {selectedSeats.map((seat) => (
                  <li key={seat}>
                    <strong>{seat}</strong> - {passengerData[seat]?.name || '-'}, {passengerData[seat]?.gender || '-'}, {passengerData[seat]?.age || '-'}
                  </li>
                ))}
              </ul>
              <p className="mt-2"><strong>Total Price</strong><br />Rp. {totalPrice.toLocaleString('id-ID')}</p>
            </div>

            <div className="flex flex-col gap-2 ml-16 mr-16">
              <button 
                onClick={generatePDF}
                className="bg-ungu4 text-white font-semibold pt-1 pb-1 rounded-full hover:bg-purple-700 transition-colors"
              >
                Print PDF
              </button>
              <button 
                title="Kembali ke halaman utama" 
                onClick={() => navigate("/")} 
                className="bg-ungu4 text-white font-semibold pt-1 pb-1 rounded-full hover:bg-purple-700 transition-colors"
              >
                Back to Home
              </button>
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="bg-ungu4 text-white font-semibold pt-1 pb-1 rounded-full hover:bg-purple-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPesawat