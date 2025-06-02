// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getRoomDetailById, getUserBalance } from '../redux/actions/userHotelActions';

// const DetailRuangan = () => {
//   const { id: roomId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const {
//     currentRoomDetails,
//     loadingRoomDetails,
//     errorRoomDetails
//   } = useSelector(state => state.userHotel);

//   const {
//     userBalance,          
//     loadingUserBalance,   
//     errorUserBalance      
//   } = useSelector(state => state.userHotel || {}); 

//   const [checkIn, setCheckIn] = useState('');
//   const [checkOut, setCheckOut] = useState('');
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [orderCode, setOrderCode] = useState('');

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     if (roomId) {
//       dispatch(getRoomDetailById(roomId));
//     }
//     dispatch(getUserBalance()); 
//     generateOrderCode(); 
//   }, [dispatch, roomId]);

//   useEffect(() => {
//     if (checkIn && checkOut && currentRoomDetails?.roomPrice) {
//       const start = new Date(checkIn);
//       const end = new Date(checkOut);
//       const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
//       if (days > 0) {
//         setTotalPrice(days * currentRoomDetails.roomPrice);
//       } else {
//         setTotalPrice(0);
//       }
//     } else {
//       setTotalPrice(0);
//     }
//   }, [checkIn, checkOut, currentRoomDetails?.roomPrice]);

//   // Fungsi untuk generate kode order
//   const generateOrderCode = () => {
//     const timestamp = Date.now().toString().slice(-6);
//     const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
//     const code = `TTE${timestamp}${random}`;
//     setOrderCode(code);
//   };

//   // Fungsi untuk format mata uang
//   const formatCurrency = (number) => {
//     if (typeof number !== 'number' || isNaN(number)) { // Tambahan pengecekan isNaN
//       return 'Rp 0';
//     }
//     return new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       minimumFractionDigits: 0
//     }).format(number);
//   };

//   // Fungsi untuk memformat fasilitas menjadi string yang rapi
//   const formatFacilities = (facilitiesArray) => {
//     if (!facilitiesArray || facilitiesArray.length === 0) {
//       return 'Tidak ada fasilitas tercatat';
//     }
//     return facilitiesArray.map(facility => `${facility.name} (${facility.amount})`).join(', ');
//   };

//   // Fungsi untuk generate PDF (data diambil dari currentRoomDetails)
//   const generatePDF = () => {
//     const bookingDate = new Date().toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' });
//     // Menggunakan hotelName dari currentRoomDetails jika ada
//     const hotelNameFromAPI = currentRoomDetails?.hotelName || 'Informasi Hotel Tidak Tersedia';
//     const roomNameFromAPI = currentRoomDetails?.roomName || 'N/A';
//     const roomTypeFromAPI = currentRoomDetails?.roomTypeName || 'N/A';
//     const capacityFromAPI = currentRoomDetails?.capacity ? `${currentRoomDetails.capacity} orang` : 'N/A';
//     const facilitiesFromAPI = formatFacilities(currentRoomDetails?.facilities);
//     const customerName = userBalance?.name || 'Budi';


//     const htmlContent = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="utf-8">
//         <title>TravelEase - Booking Confirmation</title>
//         <style>
//           body { font-family: Arial, sans-serif; margin: 40px; color: #333; line-height: 1.6; }
//           .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #8B5CF6; padding-bottom: 20px; }
//           .company-name { font-size: 28px; font-weight: bold; color: #8B5CF6; margin-bottom: 5px; }
//           .booking-date { font-size: 14px; color: #666; }
//           .success-icon { font-size: 48px; color: #10B981; margin: 20px 0; }
//           .content { margin: 30px 0; }
//           .field { margin-bottom: 15px; }
//           .field-label { font-weight: bold; color: #333; margin-bottom: 5px; }
//           .field-value { color: #555; margin-left: 10px; }
//           .total-price { font-size: 18px; font-weight: bold; color: #8B5CF6; margin-top: 20px; padding: 15px; background-color: #f8f9ff; border-radius: 8px; }
//           .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #ddd; padding-top: 20px; }
//         </style>
//       </head>
//       <body>
//         <div class="header">
//           <div class="company-name">TravelEase</div>
//           <div class="booking-date">Tanggal Pemesanan: ${bookingDate}</div>
//           <div class="success-icon">✓</div>
//         </div>
//         <div class="content">
//           <div class="field"><div class="field-label">Order Code:</div><div class="field-value">${orderCode}</div></div>
//           <div class="field"><div class="field-label">Hotel:</div><div class="field-value">${hotelNameFromAPI}</div></div>
//           <div class="field"><div class="field-label">Room:</div><div class="field-value">${roomNameFromAPI} - ${roomTypeFromAPI}</div></div>
//           <div class="field"><div class="field-label">Customer:</div><div class="field-value">${customerName}</div></div>
//           <div class="field"><div class="field-label">Check-In:</div><div class="field-value">${checkIn ? new Date(checkIn).toLocaleDateString('id-ID') : 'N/A'}</div></div>
//           <div class="field"><div class="field-label">Check-Out:</div><div class="field-value">${checkOut ? new Date(checkOut).toLocaleDateString('id-ID') : 'N/A'}</div></div>
//           <div class="field"><div class="field-label">Capacity:</div><div class="field-value">${capacityFromAPI}</div></div>
//           <div class="field"><div class="field-label">Facilities:</div><div class="field-value">${facilitiesFromAPI}</div></div>
//           <div class="total-price">Total Price: ${formatCurrency(totalPrice)}</div>
//         </div>
//         <div class="footer"><p>Thank you for choosing TravelEase!</p><p>Please keep this confirmation for your records.</p></div>
//       </body>
//       </html>
//     `;

//     const printWindow = window.open('', '_blank');
//     if (printWindow) {
//       printWindow.document.write(htmlContent);
//       printWindow.document.close();
//       printWindow.focus();
//       setTimeout(() => {
//         printWindow.print();
//       }, 500);
//     } else {
//       console.error("Failed to open print window. Please check your pop-up blocker settings.");
//       alert("Gagal membuka jendela cetak. Mohon periksa pengaturan pemblokir pop-up Anda dan coba lagi.");
//     }
//   };

//   // Penanganan kondisi loading dan error
//   if (loadingRoomDetails || loadingUserBalance) return <div className="text-center py-20">Loading details...</div>;
//   if (errorRoomDetails) return <div className="text-center py-20 text-red-500">Error loading room: {errorRoomDetails}</div>;
//   if (errorUserBalance) return <div className="text-center py-20 text-red-500">Error loading balance: {errorUserBalance}</div>;
//   if (!currentRoomDetails || Object.keys(currentRoomDetails).length === 0) {
//     return <div className="text-center py-20">Room not found or details could not be loaded.</div>;
//   }

//   // Menggunakan hotelName dari currentRoomDetails jika ada, jika tidak, tampilkan placeholder
//   const displayHotelName = currentRoomDetails?.hotelName || 'Informasi Hotel Tidak Tersedia';
//   const customerNameToDisplay = userBalance?.name || 'Budi';

//   // Render JSX
//   return (
//     <div>
//       {/* Bagian header dengan gambar-gambar ruangan */}
//       <section
//         className="relative bg-cover bg-center pt-16 h-full flex flex-col justify-center"
//         style={{ backgroundImage: `url('/assets/img/bgHome.png')` }}
//       >
//         <div className="absolute inset-0 bg-black bg-opacity-30 z-0"></div>
//         <div className="mx-auto relative z-10 text-center p-8 max-w-6xl">
//           {currentRoomDetails.roomImages && currentRoomDetails.roomImages.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {currentRoomDetails.roomImages.map((imageURL, index) => (
//                 <div
//                   key={index}
//                   className="rounded-3xl overflow-hidden shadow-md border border-gray-200 bg-white"
//                 >
//                   <img
//                     src={imageURL}
//                     alt={`${currentRoomDetails.roomName || 'Room'} image ${index + 1}`}
//                     className="w-full h-60 object-cover"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src="https://placehold.co/600x400/E2E8F0/AAAAAA?text=Image+Not+Available";
//                     }}
//                   />
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-white bg-gray-700 p-10 rounded-3xl">No images available for this room.</div>
//           )}
//         </div>
//       </section>

//       {/* Bagian detail informasi ruangan dan form reservasi */}
//       <section className='pt-8'>
//         <div className='md:ml-48 md:mr-48 mx-8'>
//           <div className='flex flex-col text-left pb-8'>
//             <div className='flex flex-col'>
//               <span className='font-bold text-3xl'>{currentRoomDetails.roomName || 'N/A'}</span>
//               <span className='text-lg'>{currentRoomDetails.roomTypeName || 'N/A'}</span>
//               {/* Menampilkan nama hotel dari API */}
//               <span className='text-gray-600 mt-2'>Hotel: {displayHotelName}</span>
//             </div>
//             <div className='flex flex-col mt-8 mb-2'>
//               <span className='font-bold text-xl'>Description</span>
//               <span className='text-justify'>{currentRoomDetails.roomDescription || 'No description available.'}</span>
//             </div>
//             <div className='flex flex-col mt-2 mb-2'>
//               <span className='font-bold text-xl'>Facilities</span>
//               <span>
//                 {formatFacilities(currentRoomDetails.facilities)}
//               </span>
//             </div>
//             <div className='flex flex-col mt-2 mb-2'>
//               <span className='font-bold text-xl'>Capacity</span>
//               <span>{currentRoomDetails.capacity ? `${currentRoomDetails.capacity} orang` : 'Informasi tidak tersedia'}</span>
//             </div>
//             <div className='flex flex-col mt-2 mb-2'>
//               <span className='font-bold text-xl'>Price per Night</span>
//               <span>{formatCurrency(currentRoomDetails.roomPrice)}</span>
//             </div>
//             <div>
//               <h2 className="font-bold text-xl mt-8 mb-4">Rules</h2>
//               <ul className="list-disc list-inside space-y-2 text-justify">
//                 <li><strong>Dilarang merokok</strong> di dalam kamar, denda akan dikenakan.</li>
//                 <li><strong>Hewan peliharaan tidak diperbolehkan.</strong></li>
//                 <li>Gunakan brankas untuk barang berharga.</li>
//                 <li>Kerusakan fasilitas akan dikenakan biaya.</li>
//                 <li>Jaga ketenangan, terutama setelah pukul <strong>22.00</strong>.</li>
//                 <li>Kamar tidak boleh digunakan untuk aktivitas ilegal.</li>
//               </ul>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-8">
//               <div className="flex flex-col">
//                 <label className="font-bold text-xl mb-1">Check in</label>
//                 <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-purple-500" />
//               </div>
//               <div className="flex flex-col">
//                 <label className="font-bold text-xl mb-1">Check out</label>
//                 <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-purple-500" />
//               </div>
//             </div>
//             <div className="flex justify-between text-left md:text-lg font-semibold mb-4 mt-4">
//               <div className='flex flex-col'>
//                 <span className='font-bold text-xl'>Total Price</span>
//                 <span>{formatCurrency(totalPrice)}</span>
//               </div>
//               <div className="flex flex-col text-right">
//                 <span className='font-bold text-xl'>Your Money</span>
//                 <span className="text-black">
//                   {userBalance?.currentAmount !== undefined ? formatCurrency(userBalance.currentAmount) : 'Loading saldo...'}
//                 </span>
//               </div>
//             </div>
//             <button
//               onClick={() => {
//                 if (!checkIn || !checkOut) {
//                   console.warn("Silakan pilih tanggal Check-in dan Check-out terlebih dahulu.");
//                   alert("Silakan pilih tanggal Check-in dan Check-out terlebih dahulu.");
//                   return;
//                 }
//                 if (new Date(checkOut) <= new Date(checkIn)) {
//                    console.warn("Tanggal Check-out harus setelah tanggal Check-in.");
//                    alert("Tanggal Check-out harus setelah tanggal Check-in.");
//                   return;
//                 }
//                 if (userBalance?.currentAmount === undefined) {
//                     alert("Informasi saldo belum termuat. Mohon tunggu sebentar.");
//                     return;
//                 }
//                 if (totalPrice > userBalance.currentAmount) {
//                     alert("Saldo Anda tidak mencukupi untuk melakukan reservasi ini.");
//                     return;
//                 }
//                 setShowConfirmation(true);
//               }}
//               className="bg-purple-500 text-white px-6 py-3 rounded-full w-fit self-center mt-4 hover:bg-purple-600 transition-colors text-lg"
//               disabled={loadingRoomDetails || loadingUserBalance || totalPrice <= 0}
//             >
//               Reservasi
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Modal Konfirmasi Reservasi */}
//       {showConfirmation && currentRoomDetails && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
//           <div className="bg-white rounded-[30px] p-8 w-full max-w-md text-black shadow-lg text-center">
//             <h2 className="text-2xl font-bold mb-6 text-purple-600">Confirmation</h2>
//             <div className="text-left text-sm mb-4 space-y-2">
//               {/* Menampilkan nama hotel dari API */}
//               <p><strong>Hotel</strong><br />{displayHotelName}</p>
//               <p><strong>Room</strong><br />{currentRoomDetails.roomName} ({currentRoomDetails.roomTypeName})</p>
//               <p><strong>Name</strong><br />{customerNameToDisplay}</p>
//               <p><strong>Check-in</strong><br />{checkIn ? new Date(checkIn).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</p>
//               <p><strong>Check-out</strong><br />{checkOut ? new Date(checkOut).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</p>
//               <p><strong>Total Price</strong><br />{formatCurrency(totalPrice)}</p>
//               <p><strong>Your Balance After Purchase</strong><br />
//                 {userBalance?.currentAmount !== undefined ? formatCurrency(userBalance.currentAmount - totalPrice) : 'N/A'}
//               </p>
//             </div>
//             <div className="flex justify-around mt-6">
//               <button
//                 onClick={() => {
//                   if (userBalance?.currentAmount === undefined) {
//                       alert("Informasi saldo belum termuat. Mohon tunggu dan coba lagi.");
//                       return;
//                   }
//                   if (totalPrice > userBalance.currentAmount) {
//                       alert("Transaksi tidak dapat dilanjutkan. Saldo Anda tidak mencukupi.");
//                       setShowConfirmation(false);
//                       return;
//                   }
//                   setShowConfirmation(false);
//                   setShowSuccess(true);
//                 }}
//                 className="bg-green-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-green-600 transition-colors"
//               >
//                 Purchase
//               </button>
//               <button
//                 onClick={() => setShowConfirmation(false)}
//                 className="bg-red-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-red-600 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modal Sukses Reservasi */}
//       {showSuccess && currentRoomDetails && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
//           <div className="bg-white rounded-[30px] p-6 w-full max-w-md text-black shadow-lg text-center">
//             <h2 className="text-xl font-bold mb-1 text-purple-600">TravelEase</h2>
//             <p className="text-sm mb-4">Tanggal Pemesanan: {new Date().toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })}</p>
//             <div className="text-5xl text-center mb-4 text-green-500">✔</div>
//             <div className="text-left text-sm space-y-2">
//               <p><strong>Order Code:</strong><br />{orderCode}</p>
//               {/* Menampilkan nama hotel dari API */}
//               <p><strong>Hotel:</strong><br />{displayHotelName}</p>
//               <p><strong>Room:</strong><br />{currentRoomDetails.roomName} ({currentRoomDetails.roomTypeName})</p>
//               <p><strong>Name:</strong><br />{customerNameToDisplay}</p>
//               <p><strong>Check-in:</strong><br />{checkIn ? new Date(checkIn).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</p>
//               <p><strong>Check-out:</strong><br />{checkOut ? new Date(checkOut).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</p>
//               <p><strong>Total Price:</strong><br />{formatCurrency(totalPrice)}</p>
//             </div>
//             <div className="flex flex-col gap-3 mt-6">
//               <button
//                 onClick={generatePDF}
//                 className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-purple-700 transition-colors"
//               >
//                 Print PDF
//               </button>
//               <button
//                 title="Kembali ke halaman utama"
//                 onClick={() => navigate("/")}
//                 className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-gray-600 transition-colors"
//               >
//                 Back to Home
//               </button>
//               <button
//                 onClick={() => setShowSuccess(false)}
//                 className="bg-red-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-red-600 transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DetailRuangan;

// src/pages/DetailRuangan.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRoomDetailById,
  getUserBalance,
  bookRoom,
  processRoomPayment,
  cancelPayment,
} from '../redux/actions/userHotelActions';
// Impor reset actions jika diperlukan, misalnya resetBookingStatusHotel, dll.
// import { resetBookingStatusHotel, resetPaymentStatusHotel, resetCancellationStatusHotel } from '../redux/reducers/userHotelReducer';


// Fungsi untuk memformat tanggal dan waktu (agar konsisten dengan DetailPesawat.jsx)
const formatDateTimeForPdf = (dateTimeString, type = 'full') => {
  if (!dateTimeString) return 'N/A';
  const date = new Date(dateTimeString);
  if (type === 'time') {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false });
  }
  if (type === 'date_short') { // Format tanggal pendek seperti DD Mon YYYY
    return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  }
  if (type === 'date_full') { // Format tanggal panjang
    return date.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }
  // Fallback untuk format lengkap (tanggal dan waktu)
  return date.toLocaleString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};


const DetailRuangan = () => {
  const { id: roomId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    currentRoomDetails,
    loadingRoomDetails,
    errorRoomDetails,
    userBalance,
    loadingUserBalance,
    errorUserBalance,
    booking, 
    loadingBooking, 
    errorBooking, 
    paymentDetails, 
    loadingPayment, 
    errorPayment, 
    cancellationDetails, 
    loadingCancellation, 
    errorCancellation, 
  } = useSelector(state => state.userHotel || {});

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [clientOrderCode, setClientOrderCode] = useState(''); 
  const [currentTransactionId, setCurrentTransactionId] = useState(null); 
  const [paymentErrorMessage, setPaymentErrorMessage] = useState('');
  const [cancellationErrorMessage, setCancellationErrorMessage] = useState('');
  const [bookingErrorMessage, setBookingErrorMessage] = useState('');
  const [calculatedNights, setCalculatedNights] = useState(0);


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (roomId) {
      dispatch(getRoomDetailById(roomId));
    }
    dispatch(getUserBalance());
    generateClientOrderCode();
  }, [dispatch, roomId]);

  useEffect(() => {
    if (checkIn && checkOut && currentRoomDetails?.roomPrice) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      // Pastikan tanggal valid sebelum kalkulasi
      if (start instanceof Date && !isNaN(start) && end instanceof Date && !isNaN(end)) {
          const diffTime = end.getTime() - start.getTime();
          if (diffTime > 0) {
            const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setCalculatedNights(days);
            setTotalPrice(days * currentRoomDetails.roomPrice);
          } else {
            setCalculatedNights(0);
            setTotalPrice(0);
          }
      } else {
          setCalculatedNights(0);
          setTotalPrice(0);
      }
    } else {
      setCalculatedNights(0);
      setTotalPrice(0);
    }
  }, [checkIn, checkOut, currentRoomDetails?.roomPrice]);

  useEffect(() => {
    if (booking && booking.id && !loadingBooking && !errorBooking) {
      setCurrentTransactionId(booking.id);
      setShowConfirmation(true); 
      setBookingErrorMessage('');
      // dispatch(resetBookingStatusHotel()); // Jika ada action resetnya
    }
    if (errorBooking && !loadingBooking) {
      setBookingErrorMessage(errorBooking === "Saldo Anda tidak mencukupi." ? "Booking gagal: Saldo tidak mencukupi." : `Booking Error: ${errorBooking}`);
      setShowConfirmation(false); 
    }
  }, [booking, loadingBooking, errorBooking]);

  useEffect(() => {
    if (paymentDetails && paymentDetails.transaction?.id && !loadingPayment && !errorPayment) {
      setShowConfirmation(false);
      setShowSuccess(true); 
      setPaymentErrorMessage('');
      // dispatch(resetPaymentStatusHotel()); // Jika ada action resetnya
    }
    if (errorPayment && !loadingPayment) {
      setPaymentErrorMessage(`Payment Error: ${errorPayment}`);
    }
  }, [paymentDetails, loadingPayment, errorPayment]);

  useEffect(() => {
    if (cancellationDetails && cancellationDetails.status === "CANCELED" && !loadingCancellation && !errorCancellation) {
      alert("Transaksi berhasil dibatalkan."); 
      setShowConfirmation(false);
      setCurrentTransactionId(null); 
      dispatch(getUserBalance()); 
      setCancellationErrorMessage('');
      // dispatch(resetCancellationStatusHotel()); // Jika ada action resetnya
    }
    if (errorCancellation && !loadingCancellation) {
      setCancellationErrorMessage(`Cancellation Error: ${errorCancellation}`);
    }
  }, [cancellationDetails, loadingCancellation, errorCancellation, dispatch]);


  const generateClientOrderCode = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const code = `HTL${timestamp}${random}`; // Ubah prefix untuk hotel
    setClientOrderCode(code);
  };

  const formatCurrency = (number) => {
    if (typeof number !== 'number' || isNaN(number)) {
      return 'Rp 0';
    }
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  const formatFacilities = (facilitiesArray) => {
    if (!facilitiesArray || facilitiesArray.length === 0) {
      return 'Tidak ada fasilitas tercatat';
    }
    return facilitiesArray.map(facility => `${facility.name} (${facility.amount})`).join(', ');
  };

  const handleReservation = () => {
    if (!checkIn || !checkOut) {
      alert("Silakan pilih tanggal Check-in dan Check-out terlebih dahulu.");
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      alert("Tanggal Check-out harus setelah tanggal Check-in.");
      return;
    }
    if (userBalance?.currentAmount === undefined) {
      alert("Informasi saldo belum termuat. Mohon tunggu sebentar.");
      return;
    }
    if (totalPrice <= 0) {
        alert("Total harga tidak valid. Silakan periksa tanggal menginap Anda.");
        return;
    }
    if (totalPrice > userBalance.currentAmount) {
        setBookingErrorMessage("Saldo Anda tidak mencukupi untuk melakukan reservasi ini.");
        return;
    }
    setBookingErrorMessage(''); 

    const startDateISO = `${checkIn}T14:00:00.000Z`; 
    const endDateISO = `${checkOut}T12:00:00.000Z`;

    const bookingData = {
      roomId: [roomId], 
      startDate: startDateISO,
      endDate: endDateISO,
    };
    dispatch(bookRoom(bookingData));
  };

  const handlePurchase = () => {
    if (!currentTransactionId) {
      alert("Transaction ID not found. Booking might have failed.");
      return;
    }
    if (userBalance?.currentAmount === undefined) {
        alert("Informasi saldo belum termuat. Mohon tunggu dan coba lagi.");
        return;
    }
    if (totalPrice > userBalance.currentAmount) {
        setPaymentErrorMessage("Transaksi tidak dapat dilanjutkan. Saldo Anda tidak mencukupi.");
        return;
    }
    setPaymentErrorMessage('');
    dispatch(processRoomPayment(currentTransactionId));
  };

  const handleCancelBooking = () => {
    if (!currentTransactionId) {
      alert("Transaction ID not found. Nothing to cancel.");
      return;
    }
    setCancellationErrorMessage('');
    dispatch(cancelPayment(currentTransactionId));
  };

  const generatePDF = () => {
    const bookingDate = new Date().toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' });
    const hotelNameFromAPI = currentRoomDetails?.hotelName || 'Informasi Hotel Tidak Tersedia';
    const roomNameFromAPI = currentRoomDetails?.roomName || 'N/A';
    const roomTypeFromAPI = currentRoomDetails?.roomTypeName || 'N/A';
    const capacityFromAPI = currentRoomDetails?.capacity ? `${currentRoomDetails.capacity} orang` : 'N/A';
    const facilitiesFromAPI = formatFacilities(currentRoomDetails?.facilities);
    const customerName = userBalance?.name || 'Pelanggan Yth.';
    const orderIdToDisplay = paymentDetails?.transaction?.id || booking?.id || currentTransactionId || clientOrderCode;
    const finalPrice = paymentDetails?.transaction?.price || totalPrice;

    // CSS Styles disamakan dengan PDF DetailPesawat.jsx
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>TravelEase - Hotel Booking Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; color: #333; line-height: 1.6; }
          .container { max-width: 800px; margin: auto; padding: 20px; border: 1px solid #eee; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #8B5CF6; padding-bottom: 15px; }
          .company-name { font-size: 26px; font-weight: bold; color: #8B5CF6; margin-bottom: 3px; }
          .booking-date { font-size: 13px; color: #666; }
          .success-icon { font-size: 40px; color: #10B981; margin: 15px 0; }
          .content { margin: 20px 0; }
          .field { margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px dotted #eee; }
          .field:last-of-type { border-bottom: none; } /* Perbaikan: last-of-type untuk field terakhir */
          .field-label { font-weight: bold; color: #333; display: block; margin-bottom: 3px; font-size: 14px; }
          .field-value { color: #555; margin-left: 10px; font-size: 14px; }
          /* passenger-details-container & passenger-item tidak relevan untuk hotel, bisa dihilangkan atau diadaptasi jika ada data tamu */
          .total-price { font-size: 17px; font-weight: bold; color: #8B5CF6; margin-top: 15px; padding: 12px; background-color: #f3f4f6; border-radius: 6px; text-align: right; }
          .footer { margin-top: 30px; text-align: center; font-size: 11px; color: #777; border-top: 1px solid #eee; padding-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="company-name">TravelEase</div>
            <div class="booking-date">Tanggal Pemesanan: ${bookingDate}</div>
            <div class="success-icon">✓</div>
            <div>Pemesanan Hotel Berhasil!</div>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="field-label">Kode Booking (ID Transaksi):</div>
              <div class="field-value">${orderIdToDisplay}</div>
            </div>
            <div class="field">
              <div class="field-label">Dipesan Oleh:</div>
              <div class="field-value">${customerName}</div>
            </div>
            <div class="field">
              <div class="field-label">Hotel:</div>
              <div class="field-value">${hotelNameFromAPI}</div>
            </div>
            <div class="field">
              <div class="field-label">Ruangan:</div>
              <div class="field-value">${roomNameFromAPI} (${roomTypeFromAPI})</div>
            </div>
            <div class="field">
              <div class="field-label">Check-In:</div>
              <div class="field-value">${checkIn ? formatDateTimeForPdf(checkIn, 'date_full') : 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Check-Out:</div>
              <div class="field-value">${checkOut ? formatDateTimeForPdf(checkOut, 'date_full') : 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Durasi Menginap:</div>
              <div class="field-value">${calculatedNights > 0 ? `${calculatedNights} malam` : 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Kapasitas Ruangan:</div>
              <div class="field-value">${capacityFromAPI}</div>
            </div>
            <div class="field">
              <div class="field-label">Fasilitas Utama:</div>
              <div class="field-value">${facilitiesFromAPI}</div>
            </div>
            
            <div class="total-price">
              Total Harga: ${formatCurrency(finalPrice)}
            </div>
          </div>
          
          <div class="footer">
            <p>Terima kasih telah memilih TravelEase!</p>
            <p>Harap simpan konfirmasi ini untuk catatan Anda.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 500);
    } else {
      console.error("Failed to open print window. Please check your pop-up blocker settings.");
      alert("Gagal membuka jendela cetak. Mohon periksa pengaturan pemblokir pop-up Anda dan coba lagi.");
    }
  };

  if (loadingRoomDetails || (loadingUserBalance && userBalance === null)) return <div className="text-center py-20">Loading details...</div>;
  if (errorRoomDetails) return <div className="text-center py-20 text-red-500">Error loading room: {errorRoomDetails}</div>;
  if (errorUserBalance && userBalance === null) return <div className="text-center py-20 text-red-500">Error loading balance: {errorUserBalance}</div>;
  if (!currentRoomDetails || Object.keys(currentRoomDetails).length === 0) {
    return <div className="text-center py-20">Room not found or details could not be loaded.</div>;
  }

  const displayHotelName = currentRoomDetails?.hotelName || 'Informasi Hotel Tidak Tersedia';
  const customerNameToDisplay = userBalance?.name || 'Budi';
  const successOrderCode = paymentDetails?.transaction?.id || booking?.id || currentTransactionId || clientOrderCode;


  return (
    <div>
      <section
        className="relative bg-cover bg-center pt-16 h-full flex flex-col justify-center"
        style={{ backgroundImage: `url('/assets/img/bgHome.png')` }}
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
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src="https://placehold.co/600x400/E2E8F0/AAAAAA?text=Image+Not+Available";
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-white bg-gray-700 p-10 rounded-3xl">No images available for this room.</div>
          )}
        </div>
      </section>

      <section className='pt-8'>
        <div className='md:ml-48 md:mr-48 mx-8'>
          <div className='flex flex-col text-left pb-8'>
            <div className='flex flex-col'>
              <span className='font-bold text-3xl'>{currentRoomDetails.roomName || 'N/A'}</span>
              <span className='text-lg'>{currentRoomDetails.roomTypeName || 'N/A'}</span>
              <span className='text-gray-600 mt-2'>Hotel: {displayHotelName}</span>
            </div>
            <div className='flex flex-col mt-8 mb-2'>
              <span className='font-bold text-xl'>Description</span>
              <span className='text-justify'>{currentRoomDetails.roomDescription || 'No description available.'}</span>
            </div>
            <div className='flex flex-col mt-2 mb-2'>
              <span className='font-bold text-xl'>Facilities</span>
              <span>{formatFacilities(currentRoomDetails.facilities)}</span>
            </div>
            <div className='flex flex-col mt-2 mb-2'>
              <span className='font-bold text-xl'>Capacity</span>
              <span>{currentRoomDetails.capacity ? `${currentRoomDetails.capacity} orang` : 'Informasi tidak tersedia'}</span>
            </div>
            <div className='flex flex-col mt-2 mb-2'>
              <span className='font-bold text-xl'>Price per Night</span>
              <span>{formatCurrency(currentRoomDetails.roomPrice)}</span>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-8">
              <div className="flex flex-col">
                <label className="font-bold text-xl mb-1">Check in</label>
                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <div className="flex flex-col">
                <label className="font-bold text-xl mb-1">Check out</label>
                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
            </div>
            {calculatedNights > 0 && (
                <p className="text-sm text-gray-600 mb-2">Durasi menginap: {calculatedNights} malam</p>
            )}
            <div className="flex justify-between text-left md:text-lg font-semibold mb-4 mt-4">
              <div className='flex flex-col'>
                <span className='font-bold text-xl'>Total Price</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex flex-col text-right">
                <span className='font-bold text-xl'>Your Money</span>
                <span className="text-black">
                  {loadingUserBalance && userBalance === null ? 'Loading saldo...' : userBalance?.currentAmount !== undefined ? formatCurrency(userBalance.currentAmount) : 'Gagal memuat saldo'}
                </span>
              </div>
            </div>
            {bookingErrorMessage && <p className="text-red-500 text-center mb-4">{bookingErrorMessage}</p>}
            <button
              onClick={handleReservation}
              className="bg-purple-500 text-white px-6 py-3 rounded-full w-fit self-center mt-4 hover:bg-purple-600 transition-colors text-lg disabled:opacity-50"
              disabled={loadingRoomDetails || (loadingUserBalance && userBalance === null) || totalPrice <= 0 || loadingBooking}
            >
              {loadingBooking ? 'Processing...' : 'Reservasi'}
            </button>
          </div>
        </div>
      </section>

      {showConfirmation && currentRoomDetails && currentTransactionId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-[30px] p-8 w-full max-w-md text-black shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-6 text-purple-600">Confirmation</h2>
            <div className="text-left text-sm mb-4 space-y-2">
              <p><strong>Hotel</strong><br />{displayHotelName}</p>
              <p><strong>Room</strong><br />{currentRoomDetails.roomName} ({currentRoomDetails.roomTypeName})</p>
              <p><strong>Name</strong><br />{customerNameToDisplay}</p>
              <p><strong>Check-in</strong><br />{checkIn ? new Date(checkIn).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</p>
              <p><strong>Check-out</strong><br />{checkOut ? new Date(checkOut).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</p>
              <p><strong>Durasi Menginap:</strong><br />{calculatedNights > 0 ? `${calculatedNights} malam` : 'N/A'}</p>
              <p><strong>Total Price</strong><br />{formatCurrency(totalPrice)}</p>
              <p><strong>Your Balance After Purchase (Estimate)</strong><br />
                {userBalance?.currentAmount !== undefined ? formatCurrency(userBalance.currentAmount - totalPrice) : 'N/A'}
              </p>
            </div>
            {paymentErrorMessage && <p className="text-red-500 text-center mb-2">{paymentErrorMessage}</p>}
            {cancellationErrorMessage && <p className="text-red-500 text-center mb-2">{cancellationErrorMessage}</p>}
            <div className="flex justify-around mt-6">
              <button
                onClick={handlePurchase}
                className="bg-green-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-green-600 transition-colors disabled:opacity-50"
                disabled={loadingPayment || loadingCancellation}
              >
                {loadingPayment ? 'Processing...' : 'Purchase'}
              </button>
              <button
                onClick={handleCancelBooking}
                className="bg-red-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-red-600 transition-colors disabled:opacity-50"
                disabled={loadingPayment || loadingCancellation}
              >
                {loadingCancellation ? 'Cancelling...' : 'Cancel Booking'}
              </button>
            </div>
             <button
                onClick={() => {
                    setShowConfirmation(false);
                    setPaymentErrorMessage('');
                    setCancellationErrorMessage('');
                }}
                className="mt-4 bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-full hover:bg-gray-400 transition-colors"
                disabled={loadingPayment || loadingCancellation}
              >
                Close
            </button>
          </div>
        </div>
      )}

      {showSuccess && currentRoomDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-[30px] p-6 w-full max-w-md text-black shadow-lg text-center">
            <h2 className="text-xl font-bold mb-1 text-purple-600">TravelEase</h2>
            <p className="text-sm mb-4">Tanggal Pemesanan: {new Date().toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })}</p>
            <div className="text-5xl text-center mb-4 text-green-500">✔</div>
            <div className="text-left text-sm space-y-2">
              <p><strong>Order Code:</strong><br />{successOrderCode}</p>
              <p><strong>Hotel:</strong><br />{displayHotelName}</p>
              <p><strong>Room:</strong><br />{currentRoomDetails.roomName} ({currentRoomDetails.roomTypeName})</p>
              <p><strong>Name:</strong><br />{customerNameToDisplay}</p>
              <p><strong>Check-in:</strong><br />{checkIn ? new Date(checkIn).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</p>
              <p><strong>Check-out:</strong><br />{checkOut ? new Date(checkOut).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</p>
              <p><strong>Durasi Menginap:</strong><br />{calculatedNights > 0 ? `${calculatedNights} malam` : 'N/A'}</p>
              <p><strong>Total Price:</strong><br />{formatCurrency(totalPrice)}</p>
            </div>
            <div className="flex flex-col gap-3 mt-6">
              <button
                onClick={generatePDF}
                className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-purple-700 transition-colors"
              >
                Print PDF
              </button>
              <button
                title="Kembali ke halaman utama"
                onClick={() => {
                  setShowSuccess(false);
                  setCurrentTransactionId(null); 
                  navigate("/");
                }}
                className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-gray-600 transition-colors"
              >
                Back to Home
              </button>
              <button
                onClick={() => {
                  setShowSuccess(false);
                  setCurrentTransactionId(null); 
                }}
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