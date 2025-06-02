import React, { useEffect, useState } from 'react'

const RiwayatPemesanan = () => {
  const [riwayat, setRiwayat] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/riwayat-pemesanan') // Ganti sesuai endpoint kamu
        const data = await response.json()
        setRiwayat(data)
      } catch (error) {
        console.error('Gagal mengambil data riwayat:', error)
      }
    }

    fetchData()
  }, [])

  const handleCancel = async (id) => {
    const konfirmasi = confirm("Apakah Anda yakin ingin membatalkan pemesanan ini?")
    if (!konfirmasi) return

    try {
      const response = await fetch(`/api/riwayat-pemesanan/${id}/cancel`, {
        method: 'POST',
      })
      if (response.ok) {
        alert('Pemesanan berhasil dibatalkan.')
        // Update data lokal setelah pembatalan
        setRiwayat((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: 'canceled' } : item
          )
        )
      } else {
        alert('Gagal membatalkan pemesanan.')
      }
    } catch (error) {
      console.error('Error saat membatalkan:', error)
    }
  }

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount)

  const formatDate = (datetime) => new Date(datetime).toLocaleString('id-ID')

  return (
    <div className="p-40">
      <h2 className="text-xl font-bold mb-4">Riwayat Pemesanan</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Tipe Transaksi</th>
              <th className="border px-4 py-2">Harga</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Terakhir Diperbarui</th>
              <th className="border px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {riwayat.length > 0 ? (
              riwayat.map((item) => (
                <tr key={item.id} className="text-center">
                  <td className="border px-4 py-2 capitalize">{item.transaction_type}</td>
                  <td className="border px-4 py-2">{formatCurrency(item.price)}</td>
                  <td
                    className={`border px-4 py-2 capitalize ${
                      item.status === 'canceled'
                        ? 'text-red-500'
                        : item.status === 'paid'
                        ? 'text-green-500'
                        : 'text-yellow-600'
                    }`}
                  >
                    {item.status}
                  </td>
                  <td className="border px-4 py-2">{formatDate(item.updated_at)}</td>
                  <td className="border px-4 py-2">
                    {item.status === 'ordered' ? (
                      <button
                        onClick={() => handleCancel(item.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Cancel
                      </button>
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Tidak ada riwayat pemesanan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RiwayatPemesanan
