import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionHistory } from '../redux/actions/userAccountActions'; // Sesuaikan path jika berbeda
import { cancelPayment } from '../redux/actions/userPlaneActions'; // Sesuaikan path jika berbeda
import { resetCancelStatus } from '../redux/reducers/userPlaneReducer'; // Sesuaikan path jika berbeda
import { toast } from 'react-toastify'; // Asumsi Anda menggunakan react-toastify untuk notifikasi

const RiwayatPemesanan = () => {
  const dispatch = useDispatch();
  const {
    transactionHistory,
    loadingGetTransactionHistory,
    errorGetTransactionHistory,
  } = useSelector((state) => state.userAccount); // Sesuaikan dengan nama reducer Anda

  const {
    loadingCancel,
    errorCancel,
    successCancel,
    // cancelResult, // Bisa digunakan jika perlu data spesifik dari hasil cancel
  } = useSelector((state) => state.userPlane); // Sesuaikan dengan nama reducer Anda

  // State lokal untuk mengelola item mana yang sedang proses cancel, opsional
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    dispatch(getTransactionHistory());
  }, [dispatch]);

  useEffect(() => {
    if (successCancel) {
      toast.success('Pemesanan berhasil dibatalkan.');
      dispatch(getTransactionHistory()); // Refresh data riwayat
      dispatch(resetCancelStatus()); // Reset status cancel agar tidak trigger ulang
      setCancellingId(null); // Reset ID yang sedang dicancel
    }
    if (errorCancel) {
      toast.error(errorCancel || 'Gagal membatalkan pemesanan.');
      dispatch(resetCancelStatus());
      setCancellingId(null);
    }
  }, [successCancel, errorCancel, dispatch]);

  const handleCancel = async (transactionId) => {
    const konfirmasi = window.confirm("Apakah Anda yakin ingin membatalkan pemesanan ini?");
    if (!konfirmasi) return;

    setCancellingId(transactionId); // Tandai item ini sedang dalam proses cancel
    dispatch(cancelPayment(transactionId));
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0, // Menghilangkan desimal jika tidak diperlukan
    }).format(amount);

  // Gunakan createdAt dari transaksi jika tersedia, atau dari reservasi/tiket pertama.
  // Untuk contoh ini, kita asumsikan ada item.createdAt atau item.updatedAt pada objek transaksi
  // Jika tidak ada, Anda mungkin perlu menyesuaikan field ini atau menghapus kolomnya.
  // Dalam contoh API response, tidak ada timestamp di level transaksi.
  // Saya akan menggunakan item.id sebagai placeholder jika tidak ada timestamp yang jelas
  // atau Anda bisa mencoba mengambil dari item.reservations[0]?.createdAt atau item.tickets[0]?.createdAt
  const formatDate = (datetime) => {
    if (!datetime) return '-'; // Fallback jika datetime tidak ada
    // Coba parse tanggal, jika gagal karena format tak dikenal atau value tak valid, tampilkan strip
    const date = new Date(datetime);
    if (isNaN(date.getTime())) {
        return '-';
    }
    return date.toLocaleString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
  }

  if (loadingGetTransactionHistory && !transactionHistory.length) {
    return <div className="p-5 md:p-10 text-center">Memuat riwayat pemesanan...</div>;
  }

  if (errorGetTransactionHistory) {
    return <div className="p-5 md:p-10 text-center text-red-500">Error: {errorGetTransactionHistory}</div>;
  }

  return (
    <div className="p-5 md:p-20"> {/* Mengurangi padding agar lebih umum */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Riwayat Pemesanan</h2>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full border border-gray-200 text-sm bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="border-b px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Transaksi</th>
              <th className="border-b px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipe Transaksi</th>
              <th className="border-b px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
              <th className="border-b px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="border-b px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Dibuat/Diperbarui</th>
              <th className="border-b px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactionHistory.length > 0 ? (
              transactionHistory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="border-b border-gray-200 px-4 py-3 text-gray-700">{item.id}</td>
                  <td className="border-b border-gray-200 px-4 py-3 capitalize text-gray-700">{item.transactionType?.toLowerCase() || '-'}</td>
                  <td className="border-b border-gray-200 px-4 py-3 text-gray-700">{formatCurrency(item.price)}</td>
                  <td
                    className={`border-b border-gray-200 px-4 py-3 capitalize font-semibold ${
                      item.status === 'CANCELED' // Sesuaikan dengan value dari API
                        ? 'text-red-600'
                        : item.status === 'PAID'
                        ? 'text-green-600'
                        : item.status === 'PENDING' // Contoh status lain
                        ? 'text-yellow-600'
                        : 'text-gray-600'
                    }`}
                  >
                    {item.status?.toLowerCase() || '-'}
                  </td>
                  {/* Pilih timestamp yang paling relevan. 
                    Misal, jika ada `updatedAt` di root transaksi, gunakan itu.
                    Jika tidak, mungkin `createdAt` di root, atau dari item pertama di `reservations` atau `tickets`.
                    Contoh data Anda tidak memiliki timestamp di root.
                    Saya akan coba menggunakan `item.reservations[0]?.createdAt` atau `item.tickets[0]?.createdAt` jika ada.
                    Jika tidak, kolom ini akan menampilkan '-'.
                  */}
                  <td className="border-b border-gray-200 px-4 py-3 text-gray-700">
                    {formatDate(item.updatedAt || item.createdAt || item.reservations?.[0]?.createdAt || item.tickets?.[0]?.createdAt)}
                  </td>
                  <td className="border-b border-gray-200 px-4 py-3">
                    {item.status === 'PAID' ? ( // Tombol cancel hanya untuk status PAID (sesuaikan jika perlu)
                      <button
                        onClick={() => handleCancel(item.id)}
                        disabled={loadingCancel && cancellingId === item.id} // Disable tombol jika sedang proses cancel untuk item ini
                        className={`bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition-colors duration-150 text-xs font-medium
                                      ${(loadingCancel && cancellingId === item.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {loadingCancel && cancellingId === item.id ? 'Membatalkan...' : 'Batalkan'}
                      </button>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  Tidak ada riwayat pemesanan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiwayatPemesanan;