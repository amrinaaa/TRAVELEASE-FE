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
import ManajemenPesawat from './pages/ManajemenPesawat';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
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
  const showNavbar = ['/', '/hotels', '/flights'].includes(location.pathname);
  const showFooter = ['/', '/hotels', '/flights'].includes(location.pathname);

  // Determine role based on the route path
  let role = null;

  // Check if the current path matches the admin or mitra paths
  if (location.pathname.match(/^\/(admin|manajemen-pengguna|tambah-pengguna|edit-pengguna\/.+|edit-saldo-pengguna\/.+|manajemen-mitra-hotel|tambah-mitra-hotel|edit-mitra-hotel\/.+|edit-saldo-mitra-hotel\/.+|manajemen-mitra-pesawat|tambah-mitra-pesawat|edit-mitra-pesawat\/.+|edit-saldo-mitra-pesawat\/.+)$/)) {
    role = 'admin';
  } else if (location.pathname.match(/^\/mitra-hotel|\/manajemen-hotel/)) {
    role = 'mitra-hotel';
  } else if (location.pathname.match(/^\/mitra-pesawat|\/manajemen-pesawat/)) {
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

        {/* Admin Routes */}
        <Route path="/admin" element={<DashboardAdmin isSidebarOpen={isSidebarOpen} />} />
        <Route path="/manajemen-pengguna" element={<ManajemenPengguna isSidebarOpen={isSidebarOpen} />} />
        <Route path="/tambah-pengguna" element={<TambahPengguna isSidebarOpen={isSidebarOpen} />} />
        <Route path="/edit-pengguna/:userId" element={<EditPengguna isSidebarOpen={isSidebarOpen} />} />
        <Route path="/edit-saldo-pengguna/:userId" element={<EditSaldoPengguna isSidebarOpen={isSidebarOpen} />} />
        <Route path="/manajemen-mitra-hotel" element={<ManajemenMitraHotel isSidebarOpen={isSidebarOpen} />} />
        <Route path="/tambah-mitra-hotel" element={<TambahMitraHotel isSidebarOpen={isSidebarOpen} />} />
        <Route path="/edit-mitra-hotel/:userId" element={<EditMitraHotel isSidebarOpen={isSidebarOpen} />} />
        <Route path="/edit-saldo-mitra-hotel/:userId" element={<EditSaldoMitraHotel isSidebarOpen={isSidebarOpen} />} />
        <Route path="/manajemen-mitra-pesawat" element={<ManajemenMitraPesawat isSidebarOpen={isSidebarOpen} />} />
        <Route path="/tambah-mitra-pesawat" element={<TambahMitraPesawat isSidebarOpen={isSidebarOpen} />} />
        <Route path="/edit-mitra-pesawat/:userId" element={<EditMitraPesawat isSidebarOpen={isSidebarOpen} />} />
        <Route path="/edit-saldo-mitra-pesawat/:userId" element={<EditSaldoMitraPesawat isSidebarOpen={isSidebarOpen} />} />

        {/* Mitra Routes */}
        <Route path="/mitra-hotel" element={<DashboardMitraHotel isSidebarOpen={isSidebarOpen} />} />
        <Route path="/manajemen-hotel" element={<ManajemenHotel isSidebarOpen={isSidebarOpen} />} />

        <Route path="/mitra-pesawat" element={<DashboardMitraPesawat isSidebarOpen={isSidebarOpen} />} />
        <Route path="/manajemen-pesawat" element={<ManajemenPesawat isSidebarOpen={isSidebarOpen} />} />
      </Routes>

      {showFooter && <Footer />}
    </div>
  );
};

export default App;
