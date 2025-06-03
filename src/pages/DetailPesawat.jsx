import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFlightSeats,
  bookFlight,
  payFlight,
  cancelPayment,
  getUserSaldo,
  clearUserPlaneState,
  getFlightDetail,
} from '../redux/actions/userPlaneActions';
import { 
  resetBookingStatus,
  resetPaymentStatus,
  resetCancelStatus,
  resetFlightDetailStatus
} from '../redux/reducers/userPlaneReducer';
import LoadingSpinner from '../components/LoadingSpinner';

// Fungsi untuk memformat tanggal dan waktu
const formatDateTime = (dateTimeString, type = 'time') => {
  if (!dateTimeString) return 'N/A';
  const date = new Date(dateTimeString);
  if (type === 'time') {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false });
  }
  if (type === 'date') {
    return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  }
  return date.toLocaleString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};


const DetailPesawat = () => {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    flightDetail,
    loadingFlightDetail,
    errorFlightDetail,
    flightSeats,
    loadingSeats,
    errorSeats,
    userSaldo,
    loadingSaldo,
    bookingResult,
    loadingBooking,
    errorBooking,
    successBooking,
    paymentResult,
    loadingPayment,
    errorPayment,
    successPayment,
    loadingCancel,
    errorCancel,
    successCancel,
  } = useSelector((state) => state.userPlane);

  const [selectedSeatsApi, setSelectedSeatsApi] = useState([]);
  const [passengerData, setPassengerData] = useState({});
  
  const [showBookingConfirmationPopup, setShowBookingConfirmationPopup] = useState(false);
  const [showPaymentSuccessPopup, setShowPaymentSuccessPopup] = useState(false);
  const [showPaymentCancelledPopup, setShowPaymentCancelledPopup] = useState(false);
  const [currentTransactionId, setCurrentTransactionId] = useState(null);
  const [currentBookingDetailsForPopup, setCurrentBookingDetailsForPopup] = useState(null);

  useEffect(() => {
    if (flightId) {
      dispatch(getFlightDetail(flightId));
      dispatch(getFlightSeats(flightId));
      dispatch(getUserSaldo());
    }
    window.scrollTo(0, 0);
    return () => {
      dispatch(clearUserPlaneState());
      dispatch(resetFlightDetailStatus());
    }
  }, [dispatch, flightId]);

  useEffect(() => {
    if (successBooking && bookingResult) {
      setCurrentTransactionId(bookingResult.transaction?.id);
      setCurrentBookingDetailsForPopup(bookingResult); // Simpan detail booking untuk PDF
      setShowBookingConfirmationPopup(true);
      dispatch(resetBookingStatus());
    }
  }, [successBooking, bookingResult, dispatch]);

  useEffect(() => {
    if (successPayment && paymentResult) {
      setShowBookingConfirmationPopup(false);
      setShowPaymentSuccessPopup(true);
      dispatch(getUserSaldo());
    }
  }, [successPayment, paymentResult, dispatch]);

  useEffect(() => {
    if (successCancel) {
      setShowBookingConfirmationPopup(false);
      setShowPaymentCancelledPopup(true);
      dispatch(getUserSaldo());
    }
  }, [successCancel, dispatch]);

  const handleSeatSelection = (seatFromApi, category) => {
    const seatKey = seatFromApi.id;
    if (!seatFromApi.isAvailable && !selectedSeatsApi.find(s => s.id === seatKey)) {
        alert(`Kursi ${seatFromApi.name} tidak tersedia.`);
        return;
    }

    setSelectedSeatsApi((prevSeats) => {
      const isSelected = prevSeats.find(s => s.id === seatKey);
      if (isSelected) {
        const newPassengerData = { ...passengerData };
        delete newPassengerData[seatKey];
        setPassengerData(newPassengerData);
        return prevSeats.filter((s) => s.id !== seatKey);
      } else {
        setPassengerData(prev => ({
            ...prev,
            [seatKey]: { name: '', nik: '', gender: 'MALE', type: 'ADULT' }
        }));
        return [...prevSeats, { ...seatFromApi, categoryId: category.categoryId, categoryName: category.categoryName, price: category.price }];
      }
    });
  };

  const handlePassengerChange = (seatId, field, value) => {
    setPassengerData((prevData) => ({
      ...prevData,
      [seatId]: {
        ...prevData[seatId],
        [field]: value,
      },
    }));
  };

  const calculateTotalPrice = () => {
    return selectedSeatsApi.reduce((total, seat) => {
      return total + (seat.price || 0);
    }, 0);
  };

  const handleOrderTicket = () => {
    if (selectedSeatsApi.length === 0) {
      alert('Silakan pilih minimal satu kursi.');
      return;
    }

    const passengers = selectedSeatsApi.map(seat => {
      const pData = passengerData[seat.id];
      if (!pData?.name?.trim() || !pData?.nik?.trim() || !pData?.gender || !pData?.type) {
        return null; 
      }
      if (!/^\d{16}$/.test(pData.nik.trim())) {
        return 'invalid_nik';
      }
      return {
        name: pData.name,
        nik: pData.nik,
        gender: pData.gender,
        type: pData.type,
        seatId: seat.id,
      };
    });

    if (passengers.some(p => p === null)) {
      alert('Data penumpang tidak lengkap untuk semua kursi yang dipilih.');
      return;
    }
    if (passengers.some(p => p === 'invalid_nik')) {
      alert('NIK tidak valid. Pastikan NIK terdiri dari 16 digit angka untuk semua penumpang.');
      return;
    }

    dispatch(bookFlight(flightId, passengers));
  };
  
  const GENDER_OPTIONS = { MALE: 'Laki-laki', FEMALE: 'Perempuan' };
  const TYPE_OPTIONS = { ADULT: 'Dewasa', CHILD: 'Anak-anak', INFANT: 'Bayi' };

  // Fungsi untuk generate PDF
  const generatePDF = () => {
    if (!paymentResult || !flightDetail || !currentBookingDetailsForPopup) {
      alert("Detail pemesanan tidak lengkap untuk mencetak PDF.");
      return;
    }

    const bookingDate = new Date().toLocaleString('id-ID', { 
      dateStyle: 'long', 
      timeStyle: 'short' 
    });
    
    const transactionDetails = paymentResult.transaction || currentBookingDetailsForPopup.transaction;
    const tickets = currentBookingDetailsForPopup.tickets || [];

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>TravelEase - Booking Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; color: #333; line-height: 1.6; }
          .container { max-width: 800px; margin: auto; padding: 20px; border: 1px solid #eee; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #8B5CF6; padding-bottom: 15px; }
          .company-name { font-size: 26px; font-weight: bold; color: #8B5CF6; margin-bottom: 3px; }
          .booking-date { font-size: 13px; color: #666; }
          .success-icon { font-size: 40px; color: #10B981; margin: 15px 0; }
          .content { margin: 20px 0; }
          .field { margin-bottom: 12px; }
          .field-label { font-weight: bold; color: #333; display: block; margin-bottom: 3px; font-size: 14px; }
          .field-value { color: #555; margin-left: 5px; font-size: 14px; }
          .passenger-list { margin-left: 0; padding-left: 0; }
          .passenger-item { margin-bottom: 6px; padding: 8px; border: 1px solid #f0f0f0; border-radius: 4px; background-color: #f9f9f9; }
          .passenger-item strong { color: #4A5568; }
          .total-price { font-size: 17px; font-weight: bold; color: #8B5CF6; margin-top: 15px; padding: 12px; background-color: #f3f4f6; border-radius: 6px; text-align: right; }
          .footer { margin-top: 30px; text-align: center; font-size: 11px; color: #777; border-top: 1px solid #eee; padding-top: 15px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 13px; }
          th { background-color: #f2f2f2; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="company-name">TravelEase</div>
            <div class="booking-date">Tanggal Pemesanan: ${bookingDate}</div>
            <div class="success-icon">✓</div>
            <div>Pemesanan Berhasil!</div>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="field-label">ID Transaksi (Booking ID):</div>
              <div class="field-value">${transactionDetails?.id || 'N/A'}</div>
            </div>
            
            <table>
              <tr>
                <th>Maskapai</th>
                <th>Kode Penerbangan</th>
              </tr>
              <tr>
                <td>${flightDetail.plane?.airline?.name || 'N/A'}</td>
                <td>${flightDetail.flightCode || 'N/A'}</td>
              </tr>
            </table>

            <table>
              <tr>
                <th>Keberangkatan</th>
                <th>Waktu</th>
                <th>Tanggal</th>
              </tr>
              <tr>
                <td>${flightDetail.departureAirport?.name || 'N/A'} (${flightDetail.departureAirport?.code || 'N/A'})</td>
                <td>${formatDateTime(flightDetail.departureTime, 'time')}</td>
                <td>${formatDateTime(flightDetail.departureTime, 'date')}</td>
              </tr>
            </table>

            <table>
              <tr>
                <th>Kedatangan</th>
                <th>Waktu</th>
                <th>Tanggal</th>
              </tr>
              <tr>
                <td>${flightDetail.arrivalAirport?.name || 'N/A'} (${flightDetail.arrivalAirport?.code || 'N/A'})</td>
                <td>${formatDateTime(flightDetail.arrivalTime, 'time')}</td>
                <td>${formatDateTime(flightDetail.arrivalTime, 'date')}</td>
              </tr>
            </table>
            
            <div class="field">
              <div class="field-label">Detail Penumpang:</div>
              <div class="passenger-list">
                ${tickets.map(ticket => {
                  const seatDetail = selectedSeatsApi.find(s => s.id === ticket.seatId);
                  const pData = passengerData[ticket.seatId] || {};
                  return `
                    <div class="passenger-item">
                      <strong>Kursi: ${seatDetail?.name || 'N/A'} (${seatDetail?.categoryName || 'N/A'})</strong><br>
                      Nama: ${ticket.name || pData.name || 'N/A'}<br>
                      NIK: ${ticket.nik || pData.nik || 'N/A'}<br>
                      Gender: ${GENDER_OPTIONS[pData.gender] || 'N/A'}<br>
                      Tipe: ${TYPE_OPTIONS[pData.type] || 'N/A'}
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
            
            <div class="total-price">
              Total Harga: Rp. ${(transactionDetails?.price || transactionDetails?.totalPrice || 0).toLocaleString('id-ID')}
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
      printWindow.focus(); // Fokus ke window baru untuk beberapa browser
      // Tunggu konten dimuat, lalu print
      // Untuk beberapa browser, onload mungkin tidak selalu terpicu dengan benar untuk document.write
      // Memberikan sedikit delay bisa membantu, atau menggunakan cara yang lebih robust jika ini sering gagal
      setTimeout(() => {
        printWindow.print();
        // Opsi: printWindow.close(); setelah print, tapi beberapa browser mungkin menutup sebelum dialog print muncul
      }, 500); // Delay 500ms
    } else {
      alert("Gagal membuka jendela print. Pastikan pop-up tidak diblokir.");
    }
  };


  const renderBookingConfirmationPopup = () => {
    if (!showBookingConfirmationPopup || !currentBookingDetailsForPopup) return null;
    const { transaction, flight, tickets } = currentBookingDetailsForPopup;

    const airlineName = flight?.airlineName || flightDetail?.plane?.airline?.name || 'N/A';
    const flightCodeToDisplay = flight?.flightCode || flightDetail?.flightCode || 'N/A';
    const departureAirportName = flight?.departureAirport || flightDetail?.departureAirport?.name || 'N/A';
    const arrivalAirportName = flight?.arrivalAirport || flightDetail?.arrivalAirport?.name || 'N/A';
    const departureTimeToDisplay = flight?.departureTime || flightDetail?.departureTime;
    const arrivalTimeToDisplay = flight?.arrivalTime || flightDetail?.arrivalTime;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
        <div className="bg-ungu10 rounded-[30px] p-6 md:p-8 w-full max-w-md text-black shadow-lg text-center max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Konfirmasi Pemesanan</h2>
          {loadingPayment && <p className="text-blue-600">Memproses pembayaran...</p>}
          {errorPayment && <p className="text-red-500">Error pembayaran: {errorPayment}</p>}
          {loadingCancel && <p className="text-blue-600">Memproses pembatalan...</p>}
          {errorCancel && <p className="text-red-500">Error pembatalan: {errorCancel}</p>}
          
          <div className="text-left text-sm mb-4">
            <p><strong>ID Transaksi:</strong> {transaction?.id}</p>
            <p className="mt-1"><strong>Maskapai:</strong> {airlineName} ({flightCodeToDisplay})</p>
            <p className="mt-1"><strong>Rute:</strong> {departureAirportName} &rarr; {arrivalAirportName}</p>
            <p className="mt-1"><strong>Waktu:</strong> {new Date(departureTimeToDisplay).toLocaleString('id-ID')} - {new Date(arrivalTimeToDisplay).toLocaleString('id-ID')}</p>
            
            <p className="mt-2 font-semibold">Penumpang:</p>
            {tickets?.map(ticket => (
              <div key={ticket.seatId} className="ml-2">
                Kursi {selectedSeatsApi.find(s => s.id === ticket.seatId)?.name || ticket.seatId}: {ticket.name} ({ticket.nik})
              </div>
            ))}
            
            <p className="mt-2"><strong>Total Harga:</strong> Rp. {transaction?.totalPrice?.toLocaleString('id-ID')}</p>
          </div>
          <div className="flex justify-between mt-6">
            <button 
              onClick={() => {
                if (currentTransactionId) dispatch(cancelPayment(currentTransactionId));
              }} 
              disabled={loadingPayment || loadingCancel}
              className="bg-red-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-red-600 disabled:opacity-50"
            >
              {loadingCancel ? <LoadingSpinner size="sm"/> : 'Batalkan'}
            </button>
            <button 
              onClick={() => {
                if (currentTransactionId) dispatch(payFlight(currentTransactionId));
              }} 
              disabled={loadingPayment || loadingCancel}
              className="bg-green-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-green-600 disabled:opacity-50"
            >
              {loadingPayment ? <LoadingSpinner size="sm"/> : 'Bayar'}
            </button>
          </div>
           <button 
            onClick={() => {
                setShowBookingConfirmationPopup(false);
                dispatch(resetBookingStatus());
            }}
            className="mt-4 text-sm text-gray-600 hover:text-gray-800"
            hidden={loadingPayment || loadingCancel}
           >
            Tutup
           </button>
        </div>
      </div>
    );
  };

  const renderPaymentSuccessPopup = () => {
    if (!showPaymentSuccessPopup || !paymentResult) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
        <div className="bg-ungu10 rounded-[30px] p-6 md:p-8 w-full max-w-md text-black shadow-lg text-center">
          <h2 className="text-2xl font-bold text-green-600">Pembayaran Berhasil!</h2>
          <div className="text-6xl text-green-700 my-4">✔️</div>
          <p className="text-sm mb-1"><strong>ID Transaksi:</strong> {paymentResult.transaction?.id}</p>
          <p className="text-sm mb-1"><strong>Status:</strong> {paymentResult.transaction?.status}</p>
          <p className="text-sm mb-1"><strong>Total Dibayar:</strong> Rp. {paymentResult.transaction?.price?.toLocaleString('id-ID')}</p>
          <p className="text-sm mb-4"><strong>Saldo Tersisa:</strong> Rp. {paymentResult.user?.currentBalance?.toLocaleString('id-ID')}</p>
          
          <div className="flex flex-col gap-2 mt-6">
            <button 
              onClick={generatePDF} // Tombol Print PDF ditambahkan di sini
              className="bg-blue-500 text-white font-semibold py-2 px-8 rounded-full hover:bg-blue-600 transition-colors"
            >
              Cetak Bukti (PDF)
            </button>
            <button 
              onClick={() => {
                setShowPaymentSuccessPopup(false);
                dispatch(resetPaymentStatus());
                navigate('/');
              }} 
              className="bg-ungu4 text-white font-semibold py-2 px-8 rounded-full hover:bg-purple-700 transition-colors"
            >
              Selesai
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderPaymentCancelledPopup = () => {
    if (!showPaymentCancelledPopup) return null;
    const originalBookingData = currentBookingDetailsForPopup || bookingResult; 
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
        <div className="bg-ungu10 rounded-[30px] p-6 md:p-8 w-full max-w-md text-black shadow-lg text-center">
          <h2 className="text-2xl font-bold text-orange-600">Pemesanan Dibatalkan</h2>
          <div className="text-6xl text-orange-600 my-4">ℹ️</div>
          <p className="text-sm mb-1">Transaksi dengan ID <span className="font-semibold">{currentTransactionId || originalBookingData?.transaction?.id}</span> telah dibatalkan.</p>
          {originalBookingData?.transaction?.totalPrice && (
            <p className="text-sm mb-1">Dana sebesar Rp. {originalBookingData.transaction.totalPrice.toLocaleString('id-ID')} akan dikembalikan ke saldo Anda.</p>
          )}
          <p className="text-sm mb-4"><strong>Saldo Anda saat ini:</strong> Rp. {userSaldo?.currentAmount?.toLocaleString('id-ID') || 'Memuat...'}</p>
          <button 
            onClick={() => {
              setShowPaymentCancelledPopup(false);
              dispatch(resetCancelStatus());
              navigate('/');
            }} 
            className="bg-ungu4 text-white font-semibold py-2 px-8 rounded-full hover:bg-purple-700 transition-colors"
          >
            Mengerti
          </button>
        </div>
      </div>
    );
  };

  if (loadingFlightDetail || (loadingSeats && !flightSeats) || (loadingSaldo && !userSaldo)) {
    return <div className="container mx-auto p-4 pt-24 text-center"><LoadingSpinner /><p className="mt-2">Loading flight data...</p></div>;
  }

  if (errorFlightDetail) {
    return <div className="container mx-auto p-4 pt-24 text-center text-red-500">Error fetching flight details: {errorFlightDetail}</div>;
  }
  
  if (!flightDetail) {
    return <div className="container mx-auto p-4 pt-24 text-center">Detail penerbangan tidak ditemukan.</div>;
  }

  const totalPrice = calculateTotalPrice();

  return (
    <div>
      <section
        className="bg-cover bg-center pt-24"
        style={{ backgroundImage: `url('/src/assets/img/bgDetail.png')` }}
      >
        <div className="md:ml-12 md:mr-12 lg:ml-32 lg:mr-32 xl:ml-52 xl:mr-52">
          <div className="mt-4 ml-4 mr-4 text-left mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-white">Detail Penerbangan</h2>
            {flightDetail && (
              <div
                className={`w-full bg-ungu10 rounded-3xl shadow-lg md:p-8 p-4 flex flex-col md:flex-row md:grid md:grid-cols-6 items-center justify-between gap-4 md:gap-0`}
              >
                <div className="flex flex-col text-center md:text-left">
                  <span className="md:font-bold font-semibold md:text-xl text-sm text-black">
                    Airline
                  </span>
                  <span className="md:font-semibold md:text-lg text-xs text-black">
                    {flightDetail.plane?.airline?.name || 'N/A'}
                  </span>
                  <span className="md:font-semibold md:text-lg text-xs text-black">
                    {flightDetail.flightCode || 'N/A'}
                  </span>
                </div>
                <div className="flex flex-col text-center">
                  <span className="md:font-bold font-semibold md:text-xl text-sm text-black">
                    Departure
                  </span>
                  <span className="md:font-semibold md:text-lg text-xs text-black">
                    {flightDetail.departureAirport?.city || flightDetail.departureAirport?.name || 'N/A'} ({flightDetail.departureAirport?.code || 'N/A'})
                  </span>
                  <span className="md:font-semibold md:text-lg text-xs text-black">
                    {formatDateTime(flightDetail.departureTime, 'time')}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDateTime(flightDetail.departureTime, 'date')}
                  </span>
                </div>
                <div className="flex items-center justify-center transform md:rotate-0 rotate-90">
                  <span className="md:text-6xl text-3xl font-bold text-purple-500">
                    &rarr;
                  </span>
                </div>
                <div className="flex flex-col text-center">
                  <span className="md:font-bold font-semibold md:text-xl text-sm text-black">
                    Arrival
                  </span>
                  <span className="md:font-semibold md:text-lg text-xs text-black">
                    {flightDetail.arrivalAirport?.city || flightDetail.arrivalAirport?.name || 'N/A'} ({flightDetail.arrivalAirport?.code || 'N/A'})
                  </span>
                  <span className="md:font-semibold md:text-lg text-xs text-black">
                    {formatDateTime(flightDetail.arrivalTime, 'time')}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDateTime(flightDetail.arrivalTime, 'date')}
                  </span>
                </div>
                <div className="flex flex-col text-center">
                  <span className="md:font-bold font-semibold md:text-xl text-sm text-black">
                    Class
                  </span>
                  <span className="md:font-semibold md:text-lg text-xs text-black">
                    {flightDetail.plane?.seatCategories?.[0]?.name || 'N/A'}
                  </span>
                  <span className="md:font-semibold md:text-lg text-xs text-black invisible">.</span>
                </div>
                <div className="flex flex-col text-center">
                  <span className="md:font-bold font-semibold md:text-xl text-sm text-black">
                    Price Range
                  </span>
                  <span className="md:font-semibold md:text-lg text-xs text-black">
                    {flightDetail.priceRange ? `Rp ${flightDetail.priceRange.replace(/\s*-\s*/, ' - Rp ')}` : (flightDetail.basePrice ? `Mulai Rp ${flightDetail.basePrice.toLocaleString('id-ID')}` : 'N/A')}
                  </span>
                  <span className="text-xs text-gray-500">
                    (Details per class)
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 grid-rows-1 pb-12">
            <div className="w-full col-span-1 md:pl-4 md:ml-4 px-2 mb-12 md:mb-0">
              <img src="/src/assets/img/head.png" alt="kepala-pesawat" className="pl-8 md:pl-0" />
              {loadingSeats && <div className="text-center p-4 bg-white rounded shadow"><LoadingSpinner size="sm" /><p className="text-sm">Memuat kursi...</p></div>}
              {errorSeats && <p className="text-red-500 text-center p-4 bg-white rounded shadow">Error memuat kursi: {errorSeats}</p>}
              {!loadingSeats && flightSeats && flightSeats.seatCategories && flightSeats.seatCategories.map(category => (
                <div key={category.categoryId} className=" bg-white p-3 shadow">
                  <h4 className="font-semibold text-md mb-1">{category.categoryName}</h4>
                  <div className="grid grid-cols-4 gap-1 md:grid-cols-6 md:gap-2">
                    {category.seats.map(seat => (
                      <button
                        key={seat.id}
                        onClick={() => handleSeatSelection(seat, category)}
                        disabled={!seat.isAvailable && !selectedSeatsApi.find(s => s.id === seat.id)}
                        className={`p-2 border rounded text-xs text-center
                          ${selectedSeatsApi.find(s => s.id === seat.id) ? 'bg-blue-900 text-white' :
                          seat.isAvailable ? 'bg-white ring-1 ring-blue-900 hover:bg-gray-300' : 'bg-red-300 text-gray-500 cursor-not-allowed line-through'}`}
                        title={seat.isAvailable ? `Pilih kursi ${seat.name}` : `Kursi ${seat.name} tidak tersedia`}
                      >
                        {seat.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {!loadingSeats && (!flightSeats || !flightSeats.seatCategories || flightSeats.seatCategories.length === 0) && !errorSeats && (
                <div className="text-center p-4 bg-white rounded shadow"><p>Tidak ada kategori kursi tersedia.</p></div>
              )}
              <img src="/src/assets/img/tail.png" alt="ekor-pesawat" className="pl-8 md:pl-0 md:pr-0" />
            </div>

            {selectedSeatsApi.length > 0 && (
              <div className="col-span-2 md:pl-8 md:pr-4 px-2">
                <div className="w-full bg-ungu10 p-6 rounded-t-3xl shadow-xl text-left">
                  <h3 className="font-semibold text-lg mb-4">Rules</h3>
                  <ul className="list-decimal pl-8 mb-4 text-left">
                    <li>Dilarang merokok di dalam pesawat</li>
                    <li>Gunakan sabuk pengaman selama duduk</li>
                    <li>Gunakan airplane mode</li>
                    <li>Dilarang membuka pintu darurat kecuali darurat</li>
                    <li>Ikuti instruksi awak kabin</li>
                    <li>Dilarang membawa barang ilegal</li>
                  </ul>
                  <h3 className="font-semibold text-lg mb-2">Data Penumpang:</h3>
                  {selectedSeatsApi.map((seat) => (
                    <div key={seat.id} className="p-3 rounded">
                      <p className="font-semibold text-sm">Kursi: {seat.name} ({seat.categoryName}) - Rp {seat.price.toLocaleString('id-ID')}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-1">
                        <input
                          type="text"
                          placeholder="Nama Lengkap"
                          className="p-2 text-sm border border-gray-300 rounded-lg w-full"
                          value={passengerData[seat.id]?.name || ''}
                          onChange={(e) => handlePassengerChange(seat.id, 'name', e.target.value)}
                        />
                        <input
                          type="text"
                          placeholder="NIK (16 digit)"
                          maxLength="16"
                          pattern="\d{16}"
                          title="NIK harus 16 digit angka"
                          className="p-2 text-sm border border-gray-300 rounded-lg w-full"
                          value={passengerData[seat.id]?.nik || ''}
                          onChange={(e) => handlePassengerChange(seat.id, 'nik', e.target.value.replace(/\D/g, ''))}
                        />
                        <select
                          className="p-2 text-sm border border-gray-300 rounded-lg w-full"
                          value={passengerData[seat.id]?.gender || 'MALE'}
                          onChange={(e) => handlePassengerChange(seat.id, 'gender', e.target.value)}
                        >
                          {Object.entries(GENDER_OPTIONS).map(([key, value]) => (
                            <option key={key} value={key}>{value}</option>
                          ))}
                        </select>
                         <select
                          className="p-2 text-sm border border-gray-300 rounded-lg w-full"
                          value={passengerData[seat.id]?.type || 'ADULT'}
                          onChange={(e) => handlePassengerChange(seat.id, 'type', e.target.value)}
                        >
                          {Object.entries(TYPE_OPTIONS).map(([key, value]) => (
                            <option key={key} value={key}>{value}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}

                  <div className="grid grid-cols-2 mt-6">
                    <div className="flex flex-col text-left">
                      <h3 className="font-semibold text-lg">Total Harga</h3>
                      <span>Rp. {totalPrice.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <h3 className="font-semibold text-lg">Saldo Anda</h3>
                      <span className="text-right">
                        {loadingSaldo && !userSaldo?.currentAmount ? 'Memuat...' : `Rp. ${userSaldo?.currentAmount?.toLocaleString('id-ID') || '0'}`}
                      </span>
                    </div>
                  </div>
                   {errorBooking && <p className="text-red-500 text-sm mt-2 text-center">Error Booking: {errorBooking}</p>}
                </div>
                <button 
                    onClick={handleOrderTicket} 
                    disabled={loadingBooking || selectedSeatsApi.length === 0}
                    className="w-full py-3 bg-ungu4 text-white font-semibold rounded-b-3xl hover:bg-ungu1 transition-colors disabled:opacity-60"
                >
                  {loadingBooking ? <LoadingSpinner size="sm"/> : 'Pesan Tiket Sekarang'}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {renderBookingConfirmationPopup()}
      {renderPaymentSuccessPopup()}
      {renderPaymentCancelledPopup()}
    </div>
  );
};

export default DetailPesawat;