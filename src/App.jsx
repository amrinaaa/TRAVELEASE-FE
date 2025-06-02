import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Sidebar from './components/Sidebar';
import NavSidebar from './components/NavSidebar';
import DashboardAdmin from './pages/DashboardAdmin';
import ManajemenPengguna from './pages/ManajemenPengguna';
import TambahPengguna from './pages/TambahPengguna';
import EditPengguna from './pages/EditPengguna';
import EditSaldoPengguna from './pages/EditSaldoPengguna';
import ManajemenMitraHotel from './pages/ManajemenMitraHotel';
import TambahMitraHotel from './pages/TambahMitraHotel';
import EditMitraHotel from './pages/EditMitraHotel';
import EditSaldoMitraHotel from './pages/EditSaldoMitraHotel';
import ManajemenMitraPesawat from './pages/ManajemenMitraPesawat';
import EditMitraPesawat from './pages/EditMitraPesawat';
import EditSaldoMitraPesawat from './pages/EditSaldoMitraPesawat';
import TambahMitraPesawat from './pages/TambahMitraPesawat';
import DashboardMitraHotel from './pages/DashboardMitraHotel';
import ManajemenHotel from './pages/ManajemenHotel';
import DashboardMitraPesawat from './pages/DashboardMitraPesawat';
import ManajemenMaskapai from './pages/ManajemenMaskapai';
import TambahMaskapai from './pages/TambahMaskapai';
import EditMaskapai from './pages/EditMaskapai';
import ManajemenPesawat from './pages/ManajemenPesawat';
import TambahPesawat from './pages/TambahPesawat';
import EditPesawat from './pages/EditPesawat';
import TambahPenerbangan from './pages/TambahPenerbangan';
import JadwalPenerbangan from './pages/JadwalPenerbangan';
import CustomerPesawat from './pages/CustomerPesawat';
import TambahHotel from './pages/TambahHotel';
import EditHotel from './pages/EditHotel';
import ManajemenRuangan from './pages/ManajemenRuangan';
import TambahRuangan from './pages/TambahRuangan';
import EditRuangan from './pages/EditRuangan';
import CustomerHotel from './pages/CustomerHotel';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Hotel from './pages/Hotel';
import DetailHotel from './pages/DetailHotel';
import DetailRuangan from './pages/DetailRuangan';
import Pesawat from './pages/Pesawat';
import DetailPesawat from './pages/DetailPesawat';
import PengaturanAkun from './pages/PengaturanAkun';
import RiwayatPemesanan from './pages/RiwayatPemesanan';
import './App.css';

const App = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);

  // Toggle sidebar state
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Show Navbar and Footer only on specific pages
  const showNavbar = ['/', '/hotel', '/pesawat', '/pengaturan-akun', '/riwayat-pemesanan'].includes(location.pathname) || location.pathname.startsWith('/detail-pesawat') || location.pathname.startsWith('/detail-hotel') || location.pathname.startsWith('/detail-ruangan');
  const showFooter = showNavbar;

  // Determine role based on the route path
  let role = null;

  // Check if the current path matches the admin or mitra paths
  if (location.pathname.match(/^\/(admin|manajemen-pengguna|tambah-pengguna|edit-pengguna\/.+|edit-saldo-pengguna\/.+|manajemen-mitra-hotel|tambah-mitra-hotel|edit-mitra-hotel\/.+|edit-saldo-mitra-hotel\/.+|manajemen-mitra-pesawat|tambah-mitra-pesawat|edit-mitra-pesawat\/.+|edit-saldo-mitra-pesawat\/.+)$/)) {
    role = 'admin';
  } else if (location.pathname.match(/^\/mitra-hotel|\/manajemen-hotel|\/tambah-hotel|\/edit-hotel|\/manajemen-ruangan|\/tambah-ruangan|\/edit-ruangan|\/list-pengguna-hotel/)) {
    role = 'mitra-hotel';
  } else if (location.pathname.match(/^\/mitra-pesawat|\/manajemen-maskapai|\/tambah-maskapai|\/edit-maskapai|\/manajemen-pesawat|\/tambah-pesawat|\/edit-pesawat|\/tambah-penerbangan|\/jadwal-penerbangan|\/list-pengguna-pesawat/)) {
    role = 'mitra-pesawat';
  }

  return (
    <div className="App">
      {showNavbar && <Navbar />}
      
      {/* Conditionally render Sidebar and NavSidebar based on the role */}
      {role && <Sidebar isOpen={isSidebarOpen} role={role} />}
      {role && <NavSidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} user={user} />}

      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Guest/User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/hotel" element={<Hotel />} />
        <Route path="/detail-hotel/:id" element={<DetailHotel />} />
        <Route path="/detail-ruangan/:id" element={<DetailRuangan />} />
        <Route path="/pesawat" element={<Pesawat />} />
        <Route path="/detail-pesawat/:id" element={<DetailPesawat />} />
        <Route path="/pengaturan-akun" element={<PengaturanAkun />} />
        <Route path="/riwayat-pemesanan" element={<RiwayatPemesanan />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<DashboardAdmin isSidebarOpen={isSidebarOpen} />} />
        <Route path="/manajemen-pengguna" element={<ManajemenPengguna isSidebarOpen={isSidebarOpen} />} />
        <Route path="/tambah-pengguna" element={<TambahPengguna isSidebarOpen={isSidebarOpen} />} />
        <Route path="/edit-pengguna/:email" element={<EditPengguna isSidebarOpen={isSidebarOpen} />} />
        <Route path="/edit-saldo-pengguna/:userId" element={<EditSaldoPengguna isSidebarOpen={isSidebarOpen} />} />
        <Route path="/manajemen-mitra-hotel" element={<ManajemenMitraHotel isSidebarOpen={isSidebarOpen} />} />
        <Route path="/tambah-mitra-hotel" element={<TambahMitraHotel isSidebarOpen={isSidebarOpen} />} />
        <Route path="/edit-mitra-hotel/:mitraName" element={<EditMitraHotel isSidebarOpen={isSidebarOpen} />} />
        <Route path="/edit-saldo-mitra-hotel/:userId" element={<EditSaldoMitraHotel isSidebarOpen={isSidebarOpen} />} />
        <Route path="/manajemen-mitra-pesawat" element={<ManajemenMitraPesawat isSidebarOpen={isSidebarOpen} />} />
        <Route path="/tambah-mitra-pesawat" element={<TambahMitraPesawat isSidebarOpen={isSidebarOpen} />} />
        <Route path="/edit-mitra-pesawat/:mitraName" element={<EditMitraPesawat isSidebarOpen={isSidebarOpen} />} />
        <Route path="/edit-saldo-mitra-pesawat/:userId" element={<EditSaldoMitraPesawat isSidebarOpen={isSidebarOpen} />} />

        {/* Mitra Routes */}
        <Route path="/mitra-hotel" element={<DashboardMitraHotel isSidebarOpen={isSidebarOpen} />} />
        <Route path="/manajemen-hotel" element={<ManajemenHotel isSidebarOpen={isSidebarOpen} />} />

        <Route path="/mitra-pesawat" element={<DashboardMitraPesawat isSidebarOpen={isSidebarOpen} />} />
        <Route path="/manajemen-maskapai" element={<ManajemenMaskapai isSidebarOpen={isSidebarOpen} />} />
        <Route path="/tambah-maskapai" element={<TambahMaskapai isSidebarOpen={isSidebarOpen} />} />
        <Route path="/edit-maskapai/:userId" element={<EditMaskapai isSidebarOpen={isSidebarOpen} />} />
        <Route path="/manajemen-pesawat/:airlineId" element={<ManajemenPesawat isSidebarOpen={isSidebarOpen} />} />
        <Route path="/tambah-pesawat/:airlineId" element={<TambahPesawat isSidebarOpen={isSidebarOpen} />} />
        <Route path="/edit-pesawat/:planeId" element={<EditPesawat isSidebarOpen={isSidebarOpen} />} />
        <Route path="/tambah-penerbangan/:planeId" element={<TambahPenerbangan isSidebarOpen={isSidebarOpen} />} />
        <Route path="/jadwal-penerbangan" element={<JadwalPenerbangan isSidebarOpen={isSidebarOpen} />} />
        <Route path="/list-pengguna-pesawat/:flightId" element={<CustomerPesawat isSidebarOpen={isSidebarOpen} />} />
        <Route path="/tambah-hotel" element={<TambahHotel isSidebarOpen={isSidebarOpen} />} />
        <Route path="/edit-hotel/:hotelId" element={<EditHotel isSidebarOpen={isSidebarOpen} />} />
        <Route path="/manajemen-ruangan/:hotelId" element={<ManajemenRuangan isSidebarOpen={isSidebarOpen} />} />
        <Route path="/tambah-ruangan/:hotelId" element={<TambahRuangan isSidebarOpen={isSidebarOpen} />} />
        <Route path="/edit-ruangan/:roomId" element={<EditRuangan isSidebarOpen={isSidebarOpen} />} />
        <Route path="/list-pengguna-hotel/:hotelId" element={<CustomerHotel isSidebarOpen={isSidebarOpen} />} />
      </Routes>

      {showFooter && <Footer />}
    </div>
  );
};

export default App;