import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Pastikan path ini benar menuju file actions Anda, sesuaikan jika perlu.
// Contoh: import { getRoomDetailById } from '../../store/actions/userHotelActions';
import { getRoomDetailById } from '../redux/actions/userHotelActions';

const DetailRuangan = () => {
  // Mengambil roomId dari parameter URL. 'id' di sini adalah alias untuk roomId.
  const { id: roomId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Mengambil state yang relevan dari Redux store (userHotel slice)
  const {
    currentRoomDetails,    // Akan berisi detail ruangan dari API
    loadingRoomDetails,    // Status loading untuk pengambilan detail ruangan
    errorRoomDetails       // Pesan error jika terjadi masalah
  } = useSelector(state => state.userHotel);

  // State lokal untuk fungsionalitas halaman (tanggal check-in/out, harga, modal)
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderCode, setOrderCode] = useState('');

  // useEffect untuk melakukan scroll ke atas dan mengambil data detail ruangan saat komponen dimuat atau roomId berubah
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (roomId) {
      // Dispatch action untuk mengambil detail ruangan berdasarkan roomId
      dispatch(getRoomDetailById(roomId));
    }
    generateOrderCode(); // Generate kode order saat komponen dimuat
  }, [dispatch, roomId]);

  // useEffect untuk menghitung total harga berdasarkan tanggal check-in/out dan harga ruangan dari API
  useEffect(() => {
    if (checkIn && checkOut && currentRoomDetails?.roomPrice) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      // Menghitung jumlah hari
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      if (days > 0) {
        // Menggunakan currentRoomDetails.roomPrice dari API (yang seharusnya berupa angka)
        setTotalPrice(days * currentRoomDetails.roomPrice);
      } else {
        setTotalPrice(0);
      }
    } else {
      setTotalPrice(0); // Reset jika tanggal atau harga tidak valid
    }
  }, [checkIn, checkOut, currentRoomDetails?.roomPrice]);

  // Fungsi untuk generate kode order
  const generateOrderCode = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const code = `TTE${timestamp}${random}`;
    setOrderCode(code);
  };

  // Fungsi untuk format mata uang
  const formatCurrency = (number) => {
    if (typeof number !== 'number') {
      return 'Rp 0';
    }
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  // Fungsi untuk generate PDF (data diambil dari currentRoomDetails)
  const generatePDF = () => {
    const bookingDate = new Date().toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' });
    // CATATAN: Informasi hotel (hotelNameFromAPI) tidak tersedia dari endpoint /user/detail-room/:roomId
    // Anda mungkin perlu mengambilnya secara terpisah atau melewatkannya sebagai props.
    const hotelNameFromAPI = 'Informasi Hotel Tidak Tersedia dari API';
    const roomNameFromAPI = currentRoomDetails?.roomName || 'N/A';
    const roomTypeFromAPI = currentRoomDetails?.roomTypeName || 'N/A';
    // CATATAN: Kapasitas (capacityFromAPI) tidak tersedia dari endpoint /user/detail-room/:roomId saat ini.
    const capacityFromAPI = 'N/A';
    const facilitiesFromAPI = currentRoomDetails?.facilities?.join(', ') || 'Tidak ada fasilitas tercatat';

    // Konten HTML untuk PDF
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
          <div class="field"><div class="field-label">Order Code:</div><div class="field-value">${orderCode}</div></div>
          <div class="field"><div class="field-label">Hotel:</div><div class="field-value">${hotelNameFromAPI}</div></div>
          <div class="field"><div class="field-label">Room:</div><div class="field-value">${roomNameFromAPI} - ${roomTypeFromAPI}</div></div>
          <div class="field"><div class="field-label">Customer:</div><div class="field-value">Budi</div></div> {/* Nama Customer masih hardcoded */}
          <div class="field"><div class="field-label">Check-In:</div><div class="field-value">${checkIn}</div></div>
          <div class="field"><div class="field-label">Check-Out:</div><div class="field-value">${checkOut}</div></div>
          <div class="field"><div class="field-label">Capacity:</div><div class="field-value">${capacityFromAPI}</div></div>
          <div class="field"><div class="field-label">Facilities:</div><div class="field-value">${facilitiesFromAPI}</div></div>
          <div class="total-price">Total Price: ${formatCurrency(totalPrice)}</div>
        </div>
        <div class="footer"><p>Thank you for choosing TravelEase!</p><p>Please keep this confirmation for your records.</p></div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  // Penanganan kondisi loading dan error
  if (loadingRoomDetails) return <div className="text-center py-20">Loading room details...</div>;
  if (errorRoomDetails) return <div className="text-center py-20 text-red-500">Error: {errorRoomDetails}</div>;
  // Jika setelah loading selesai dan tidak ada error, namun currentRoomDetails masih null
  if (!currentRoomDetails) return <div className="text-center py-20">Room not found or details could not be loaded.</div>;

  // Placeholder untuk nama hotel karena tidak ada di API detail ruangan
  const displayHotelName = 'Informasi Hotel Tidak Tersedia';

  // Render JSX
  return (
    <div>
      {/* Bagian header dengan gambar-gambar ruangan */}
      <section
        className="relative bg-cover bg-center pt-16 h-full flex flex-col justify-center"
        style={{ backgroundImage: `url('/assets/img/bgHome.png')` }} // Pastikan path ini benar
      >
        <div className="absolute inset-0 bg-black bg-opacity-30 z-0"></div>
        <div className="mx-auto relative z-10 text-center p-8 max-w-6xl">
          {currentRoomDetails.roomImages && currentRoomDetails.roomImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {currentRoomDetails.roomImages.map((imageURL, index) => (
                <div
                  key={index}
                  className="rounded-3xl overflow-hidden shadow-md border border-gray-200 bg-white"
                >
                  <img
                    src={imageURL}
                    alt={`${currentRoomDetails.roomName || 'Room'} image ${index + 1}`}
                    className="w-full h-60 object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-white bg-gray-700 p-10 rounded-3xl">No images available for this room.</div>
          )}
        </div>
      </section>

      {/* Bagian detail informasi ruangan dan form reservasi */}
      <section className='pt-8'>
        <div className='md:ml-48 md:mr-48 mx-8'>
          <div className='flex flex-col text-left pb-8'>
            {/* Informasi Nama Ruangan, Tipe, dan Hotel */}
            <div className='flex flex-col'>
              <span className='font-bold text-3xl'>{currentRoomDetails.roomName || 'N/A'}</span>
              <span className='text-lg'>{currentRoomDetails.roomTypeName || 'N/A'}</span>
              <span className='text-gray-600 mt-2'>Hotel: {displayHotelName}</span>
            </div>
            {/* Deskripsi Ruangan */}
            <div className='flex flex-col mt-8 mb-2'>
              <span className='font-bold text-xl'>Description</span>
              <span className='text-justify'>{currentRoomDetails.roomDescription || 'No description available.'}</span>
            </div>
            {/* Fasilitas */}
            <div className='flex flex-col mt-2 mb-2'>
              <span className='font-bold text-xl'>Facilities</span>
              <span>
                {currentRoomDetails.facilities && currentRoomDetails.facilities.length > 0
                  ? currentRoomDetails.facilities.join(", ")
                  : 'No specific facilities listed.'}
              </span>
            </div>
            {/* Kapasitas (Tidak tersedia dari API) */}
            <div className='flex flex-col mt-2 mb-2'>
              <span className='font-bold text-xl'>Capacity</span>
              <span>Informasi Kapasitas Tidak Tersedia</span>
            </div>
            {/* Harga per Malam */}
            <div className='flex flex-col mt-2 mb-2'>
              <span className='font-bold text-xl'>Price per Night</span>
              <span>{formatCurrency(currentRoomDetails.roomPrice)}</span>
            </div>
            {/* Peraturan */}
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
            {/* Input Tanggal Check-in dan Check-out */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-8">
              <div className="flex flex-col">
                <label className="font-bold text-xl mb-1">Check in</label>
                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-ungu4" />
              </div>
              <div className="flex flex-col">
                <label className="font-bold text-xl mb-1">Check out</label>
                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-ungu4" />
              </div>
            </div>
            {/* Total Harga dan Tombol Reservasi */}
            <div className="flex justify-between text-left md:text-lg font-semibold mb-4 mt-4">
              <div className='flex flex-col'>
                <span className='font-bold text-xl'>Total Price</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex flex-col text-right">
                <span className='font-bold text-xl'>Your Money</span>
                <span className="text-black">Rp 0</span> {/* Fungsi "Your Money" belum diimplementasikan */}
              </div>
            </div>
            <button
              onClick={() => {
                if (!checkIn || !checkOut) {
                  alert("Silakan pilih tanggal Check-in dan Check-out terlebih dahulu.");
                  return;
                }
                if (new Date(checkOut) <= new Date(checkIn)) {
                  alert("Tanggal Check-out harus setelah tanggal Check-in.");
                  return;
                }
                setShowConfirmation(true);
              }}
              className="bg-purple-500 text-white px-6 py-3 rounded-full w-fit self-center mt-4 hover:bg-purple-600 transition-colors text-lg"
              disabled={loadingRoomDetails}
            >
              Reservasi
            </button>
          </div>
        </div>
      </section>

      {/* Modal Konfirmasi Reservasi */}
      {showConfirmation && currentRoomDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-ungu10 rounded-[30px] p-8 w-full max-w-md text-black shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-6">Confirmation</h2>
            <div className="text-left text-sm mb-4 space-y-2">
              <p><strong>Hotel</strong><br />{displayHotelName}</p>
              <p><strong>Room</strong><br />{currentRoomDetails.roomName} ({currentRoomDetails.roomTypeName})</p>
              <p><strong>Name</strong><br />Budi</p> {/* Nama Customer masih hardcoded */}
              <p><strong>Check-in</strong><br />{new Date(checkIn).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p><strong>Check-out</strong><br />{new Date(checkOut).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p><strong>Total Price</strong><br />{formatCurrency(totalPrice)}</p>
            </div>
            <div className="flex justify-around mt-6">
              <button
                onClick={() => {
                  setShowConfirmation(false);
                  setShowSuccess(true);
                }}
                className="bg-green-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-green-600 transition-colors"
              >
                Purchase
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-red-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-red-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Sukses Reservasi */}
      {showSuccess && currentRoomDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-ungu10 rounded-[30px] p-6 w-full max-w-md text-black shadow-lg text-center">
            <h2 className="text-xl font-bold mb-1">TravelEase</h2>
            <p className="text-sm mb-4">Tanggal Pemesanan: {new Date().toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })}</p>
            <div className="text-5xl text-center mb-4 text-green-500">✔</div>
            <div className="text-left text-sm space-y-2">
              <p><strong>Order Code:</strong><br />{orderCode}</p>
              <p><strong>Hotel:</strong><br />{displayHotelName}</p>
              <p><strong>Room:</strong><br />{currentRoomDetails.roomName} ({currentRoomDetails.roomTypeName})</p>
              <p><strong>Name:</strong><br />Budi</p> {/* Nama Customer masih hardcoded */}
              <p><strong>Check-in:</strong><br />{new Date(checkIn).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p><strong>Check-out:</strong><br />{new Date(checkOut).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p><strong>Total Price:</strong><br />{formatCurrency(totalPrice)}</p>
            </div>
            <div className="flex flex-col gap-3 mt-6">
              <button
                onClick={generatePDF}
                className="bg-ungu4 text-white font-semibold py-2 px-4 rounded-full hover:bg-purple-700 transition-colors"
              >
                Print PDF
              </button>
              <button
                title="Kembali ke halaman utama"
                onClick={() => navigate("/")}
                className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-gray-600 transition-colors"
              >
                Back to Home
              </button>
              <button
                onClick={() => setShowSuccess(false)}
                className="bg-red-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-red-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailRuangan;