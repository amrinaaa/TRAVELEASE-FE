import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dataRuangan from '../utils/dataRuangan.json';
import dataHotel from '../utils/dataHotel.json';

const DetailRuangan = () => {
  const { id } = useParams();
  const room = dataRuangan.find((item) => item.id === parseInt(id));
  const navigate = useNavigate();

  // Tambahkan state untuk hotel
  const [hotel, setHotel] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderCode, setOrderCode] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Cari hotel berdasarkan hotelId dari room data
    if (room && room.hotelId) {
      const foundHotel = dataHotel.find(h => h.id === room.hotelId);
      setHotel(foundHotel);
    }

    // Generate order code saat komponen dimuat
    generateOrderCode();
  }, [room]);

  useEffect(() => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      if (days > 0) {
        setTotalPrice(days * parseInt(room.price.replace(/\D/g, '')));
      } else {
        setTotalPrice(0);
      }
    }
  }, [checkIn, checkOut, room.price]);

  const generateOrderCode = () => {
    // Generate order code dengan format: TE + timestamp + random 3 digit
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const code = `TTE${timestamp}${random}`;
    setOrderCode(code);
  };

  const generatePDF = () => {
    const bookingDate = new Date().toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' });
    const hotelName = hotel ? hotel.name : 'Hotel tidak ditemukan';
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>TravelEase - Booking Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; color: #333; line-height: 1.6; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #8B5CF6; padding-bottom: 20px; }
          .company-name { font-size: 28px; font-weight: bold; color: #8B5CF6; margin-bottom: 5px; }
          .booking-date { font-size: 14px; color: #666; }
          .success-icon { font-size: 48px; color: #10B981; margin: 20px 0; }
          .content { margin: 30px 0; }
          .field { margin-bottom: 15px; }
          .field-label { font-weight: bold; color: #333; margin-bottom: 5px; }
          .field-value { color: #555; margin-left: 10px; }
          .total-price { font-size: 18px; font-weight: bold; color: #8B5CF6; margin-top: 20px; padding: 15px; background-color: #f8f9ff; border-radius: 8px; }
          .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #ddd; padding-top: 20px; }
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
            <div class="field-label">Hotel:</div>
            <div class="field-value">${hotelName}</div>
          </div>
          <div class="field">
            <div class="field-label">Room:</div>
            <div class="field-value">${room.name} - ${room.type}</div>
          </div>
          <div class="field">
            <div class="field-label">Customer:</div>
            <div class="field-value">Budi</div>
          </div>
          <div class="field">
            <div class="field-label">Check-In:</div>
            <div class="field-value">${checkIn}</div>
          </div>
          <div class="field">
            <div class="field-label">Check-Out:</div>
            <div class="field-value">${checkOut}</div>
          </div>
          <div class="field">
            <div class="field-label">Capacity:</div>
            <div class="field-value">${room.capacity} orang</div>
          </div>
          <div class="field">
            <div class="field-label">Facilities:</div>
            <div class="field-value">${room.facilities.join(', ')}</div>
          </div>
          <div class="total-price">
            Total Price: Rp. ${totalPrice.toLocaleString('id-ID')}
          </div>
        </div>
        
        <div class="footer">
          <p>Thank you for choosing TravelEase!</p>
          <p>Please keep this confirmation for your records.</p>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  const formatCurrency = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  if (!room) return <div>Room not found</div>;

  const hotelName = hotel ? hotel.name : 'Loading...';

  return (
    <div>
      <section
        className="relative bg-cover bg-center pt-16 h-full flex flex-col justify-center"
        style={{ backgroundImage: `url('/src/assets/img/bgHome.png')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30 z-0"></div>
        <div className="mx-auto relative z-10 text-center p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {room.image.map((image, index) => (
              <div
                key={index}
                className="rounded-3xl overflow-hidden shadow-md border border-gray-200"
              >
                <img
                  src={image}
                  alt={`Room image ${index}`}
                  className="w-full h-60 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='pt-8'>
        <div className='md:ml-48 md:mr-48 mx-8'>
          <div className='flex flex-col text-left pb-8'>
            <div className='flex flex-col'>
              <span className='font-bold text-3xl'>{room.name}</span>
              <span>{room.type}</span>
              <span className='text-gray-600 mt-2'>Hotel: {hotelName}</span>
            </div>
            <div className='flex flex-col mt-8 mb-2'>
              <span className='font-bold text-xl'>Description</span>
              <span className='text-justify'>{room.description}</span>
            </div>
            <div className='flex flex-col mt-2 mb-2'>
              <span className='font-bold text-xl'>Facilities</span>
              <span>{room.facilities.join(", ")}</span>
            </div>
            <div className='flex flex-col mt-2 mb-2'>
              <span className='font-bold text-xl'>Capacity</span>
              <span>{room.capacity} Human</span>
            </div>
            <div className='flex flex-col mt-2 mb-2'>
              <span className='font-bold text-xl'>Price</span>
              <span>{room.price}</span>
            </div>
            <div>
              <h2 className="font-bold text-xl mt-8 mb-4">Rules</h2>
              <ul className="list-disc list-inside space-y-2 text-justify">
                <li><strong>Dilarang merokok</strong> di dalam kamar, denda akan dikenakan.</li>
                <li><strong>Hewan peliharaan tidak diperbolehkan.</strong></li>
                <li>Gunakan brankas untuk barang berharga.</li>
                <li>Kerusakan fasilitas akan dikenakan biaya.</li>
                <li>Jaga ketenangan, terutama setelah pukul <strong>22.00</strong>.</li>
                <li>Kamar tidak boleh digunakan untuk aktivitas ilegal.</li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4 mt-8">
              <div className="flex flex-col">
                <label className="font-bold text-xl">Check in</label>
                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-ungu4" />
              </div>
              <div className="flex flex-col">
                <label className="font-bold text-xl">Check out</label>
                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-ungu4" />
              </div>
            </div>
            <div className="flex justify-between text-left md:text-lg font-semibold mb-4 mt-4">
              <div className='flex flex-col'>
                <span className='font-bold text-xl'>Total Price</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex flex-col text-right">
                <span className='font-bold text-xl'>Your Money</span>
                <span className="text-black">Rp. 0</span>
              </div>
            </div>
            <button onClick={() => setShowConfirmation(true)} className="bg-purple-500 text-white px-6 py-2 rounded-full w-fit self-center mt-4">Reservasi</button>
          </div>
        </div>
      </section>

      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-ungu10 rounded-[30px] p-8 w-[360px] text-black shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-6">Confirmation</h2>
            <div className="text-left text-sm mb-4">
              <p><strong>Hotel</strong><br />{hotelName}</p>
              <p className="mt-2"><strong>Room</strong><br />{room.name}</p>
              <p className="mt-2"><strong>Name</strong><br />Budi</p>
              <p className="mt-2"><strong>Start</strong><br />{checkIn}</p>
              <p className="mt-2"><strong>End</strong><br />{checkOut}</p>
              <p className="mt-2"><strong>Price</strong><br />{formatCurrency(totalPrice)}</p>
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={() => {
                  setShowConfirmation(false);
                  setShowSuccess(true);
                }}
                className="bg-ungu4 text-white font-semibold py-2 px-6 rounded-full hover:bg-purple-700"
              >
                Purchase
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-ungu4 text-white font-semibold py-2 px-6 rounded-full hover:bg-purple-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-ungu10 rounded-[30px] p-6 w-[360px] text-black shadow-lg text-center">
            <h2 className="text-xl font-bold mb-1">TravelEase</h2>
            <p className="text-sm mb-4">Tanggal Pemesanan {new Date().toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })}</p>
            <div className="text-5xl text-center mb-4 text-green-600">✔</div>
            <div className="text-left text-sm">
              <p><strong>Order Code</strong><br />{orderCode}</p>
              <p className="mt-2"><strong>Hotel</strong><br />{hotelName}</p>
              <p className="mt-2"><strong>Room</strong><br />{room.name}</p>
              <p className="mt-2"><strong>Name</strong><br />Budi</p>
              <p className="mt-2"><strong>Start</strong><br />{checkIn}</p>
              <p className="mt-2"><strong>End</strong><br />{checkOut}</p>
              <p className="mt-2"><strong>Price</strong><br />{formatCurrency(totalPrice)}</p>
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
                onClick={() => setShowSuccess(false)}
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

export default DetailRuangan